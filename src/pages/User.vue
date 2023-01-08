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
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
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
    </div>
    <!-- 数据展示 用element ui table -->
    <el-table :data="tableData" style="width: 100%">
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
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUser, addUser,editUser } from "@/api/index";
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
      tableData: [{}],
      modalType: 0, //0表示新增弹窗 1表示编辑信息
    };
  },

  mounted() {
    this.getList()
  },

  methods: {
    //获取列表数据
    getList() {
      getUser().then(({ data }) => {
        this.tableData = data.list;
      });
    },

    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList()
            });
          } else {
            editUser(this.form).then(()=>{
              this.getList()
            })
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
      this.modalType=1
    },
    //删除行
    handleDelete(row) {},
    //新增
    handleAdd(){
      this.modalType=0
      this.dialogVisible=true
    }
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
