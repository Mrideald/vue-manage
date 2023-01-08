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
export default {
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
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
  height: 100%;
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
