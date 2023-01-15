<template>
  <div class="manage">
    <!-- 新增用户数据弹窗 -->
    <el-dialog
      title="提示"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <!-- 表单 -->
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>
      <!-- from搜素区域 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table和分页器 -->
    <div class="common-tabel">
      <!-- 数据展示 用element ui table -->
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 0 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column>
          <!-- 这个插槽就是获取父组件数据tableData -->
          <template slot-scope="scope">
            <!-- 作用域插槽 -->
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器pagination -->
      <div class="pager">
        <el-pagination
          @current-change="handlePage"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "@/api/index";
export default {
  name: "VueManageUser",

  data() {
    return {
      //是否显示弹窗
      dialogVisible: false,
      //表单默认
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      //表单规则 ，不填无法提交设置
      // required是否必填  没填的话显示message
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗 1表示编辑信息
      total: 0, //当前的总条数  当前总共有多少条消息
      //给服务器发送的获取用户列表的数据
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name:''
      },
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    //获取列表数据
    getList() {
      //getUser接口需要携带参数过去 第一个参数是url地址 第二三个是当前页码和最大限制数
      getUser({ params: {...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list;
          this.total = data.count ? data.count : 0;
        }
      );
    },
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    //弹窗关闭的时候的函数
    handleClose() {
      // 清空表单
      this.$refs.form.resetFields();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    //编辑列表
    handleEdit(row) {
      this.modalType = 1;
      //将数据转化一下 其实不转化也行
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    //删除行
    handleDelete(row) {
      //使用element ui
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用接口
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新列表
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //新增
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //点击分页器页数换页
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 列表的查询
    onSubmit() {
      this.getList();
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .common-tabel {
    position: relative;
    height: calc(100% - 200px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
  .manage-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
