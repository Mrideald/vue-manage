<template>
  <div class="login_container">
    <el-form
      ref="form"
      label-width="70px"
      :model="form"
      :inline="true"
      :rules="rules"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          type="primary"
          style="margin-left: 105px; margin-top: 10px"
        >
          登录
        </el-button></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api/index";
export default {
  name: "VueManageLogin",

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        // 失去焦点时出发trigger
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },

  mounted() {

  },

  methods: {
    // 登录
    submit() {
      // 得到一段随机数
      // const token=Mock.Random.guid();
      // console.log(token) //token:4E8d5c3B-44c3-33FE-63Ed-f0D91BbadBBc
      //如果是正常项目一般要封装uuid 这边粗略了

      //console.log(token) //token:70773b98-e28e-4854-998e-51fb537fd0eb

      //将token信息存入cookie用不不同页面通信

      //校验表单
      this.$refs.form.validate((valid) => {
        //如果都填了 向服务器发请求 可以得到token
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code == 20000) {
              Cookie.set("token", data.data.token);
              console.log(data.data)
              //动态获取菜单
              this.$store.dispatch('tab/setMenu',data.data.menu)
              //动态获取路由
              this.$store.dispatch('tab/addMenu',this.$router)
              this.$router.push({ path: "/home" });
            }else{
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>
