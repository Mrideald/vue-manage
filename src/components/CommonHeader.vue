<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right:20px" icon="el-icon-menu" size="mini" @click="backMenu"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in tabsList" :key="index" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="imgUser" src="@/assets/images/user.png" alt="renwu" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "VueManageCommonHeader",

  data() {
    return {};
  },
  methods: {
    //菜单收缩
    backMenu() {
      this.$store.dispatch("changeCollapseMenu");
    },
  },
  computed:{
    //vuex区

    //获取面包屑数据
    ...mapState("tab",["tabsList"])
  }
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .imgUser {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
    .el-breadcrumb__inner{
      font-weight: normal;
        &.is-link{
          color: #666;
        }
    }
    &:last-child{
      .el-breadcrumb__inner{
        color: #fff;
      }
    }
  }
  }

}
</style>
