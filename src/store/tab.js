const actions = {
  //菜单收缩
  changeCollapseMenu(context) {
    context.commit("CHANGECOLLAPSEMENU");
  },
  //更新面包屑数据
  selectMenu(context, menuItem) {
    context.commit("SELECTMENU", menuItem);
  },
};

const mutations = {
  CHANGECOLLAPSEMENU(state) {
    state.isCollapse = !state.isCollapse;
  },
  SELECTMENU(state,val){
   //判断添加的数据是否为首页
   if(val.name!=="home"){
    //array.findIndex方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。
    //find返回满足条件的值
    const valMenu=state.tabsList.find(item=>{return item.name===val.name})
    if(!valMenu){
      state.tabsList.push(val)
    }
    //如果存在则不进行任何操作
  }
  }
};

const state = {
  isCollapse: false, //控制左侧下拉
  tabsList: [
    {
      path: "/",
      name: "home",
      label: "首页",
      icon: "s-home",
      url: "Home/Home",
    },
  ], //面包屑
};

const getters = {};

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters,
};
