<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse?"后台":"通用后台管理系统"}}</h3>
    <el-menu-item
      :index="menuitem.name"
      v-for="(menuitem, index) in noChildren"
      :key="index"
      @click="clickMenu(menuitem)"
    >
      <i :class="`el-icon-${menuitem.icon}`"></i>
      <span slot="title">{{ menuitem.label }}</span>
    </el-menu-item>

    <el-submenu
      :index="menuitemC.label"
      v-for="(menuitemC, index) in hasChildren"
      :key="index + 100"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{ menuitemC.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(itemChildren, index) in menuitemC.children"
        :key="index + 5"
      >
        <el-menu-item
          :index="itemChildren.path"
          >{{ itemChildren.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(menuItem) {
      //路由跳转
        this.$router.push({ path: menuItem.path });
        //更新面包屑数据
        this.$store.dispatch("tab/selectMenu",menuItem)
    },
  },
  computed: {
    menuData(){
      // 判断当前数据，如果缓存中没有，当前store中去获取
       return  JSON.parse(Cookie.get('menuData'))||this.$store.state.tab.menuData
    },
    isCollapse(){
     return this.$store.state.tab.isCollapse
    },
    //普通计算
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },

  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 129vh;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
