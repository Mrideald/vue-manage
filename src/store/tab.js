import Cookie from "js-cookie";
const actions = {
  //菜单收缩
  changeCollapseMenu(context) {
    context.commit("CHANGECOLLAPSEMENU");
  },
  //更新面包屑数据
  selectMenu(context, menuItem) {
    context.commit("SELECTMENU", menuItem);
  },
  //动态获取菜单数据 根据不同的用户登录返回不同的菜单数据
  setMenu(context,menu){
    context.commit("SETMENU",menu)
  },
  //动态路由
  addMenu(context,router){
    context.commit("ADDMENU",router)
  }
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
  },
  SETMENU(state,val){
    state.menuData=val
    Cookie.set('menuData',JSON.stringify(val))
  },
  ADDMENU(state,router){
    //判断缓存是否有数据
    if(!Cookie.get('menuData')) return
    const menu=JSON.parse(Cookie.get('menuData'))
    state.menu=menu
    //组装动态路由的数据
    const menuArray=[]
    menu.forEach(item=>{
      //如果有子路由
      if(item.children){
        item.children.map(item=>{
          item.component=()=>import(`../pages/${item.url}`)
          return item
        })
        menuArray.push(...item.children)
      }else{
        item.component=()=>import(`../pages/${item.url}`)
        menuArray.push(item)
      }
    })
    //路由的动态添加
    menuArray.forEach(item=>{
      //添加路由 ，第一个是主路由
      router.addRoute('Main',item)
    })
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
  menuData:[]
};

const getters = {};

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters,
};
