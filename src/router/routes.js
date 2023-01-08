import Home from "../pages/Home.vue";
import User from "../pages/User.vue";
import Main from "../pages/Main.vue";
import Mall from "../pages/Mall.vue"
import pageOne from "../pages/pageOne.vue"
import pageTwo from "../pages/pageTwo.vue"


const routes = [
    //地址为/即一进去就访问的这个页面
    {
      path: "/",
      component: Main,
      redirect:'/home',//重定向
      //路由出口要写在父路由里
      children: [
        {
          name:'home',
          path: "/home",
          component: Home,
        },
        {
          name: "user",
          path: "user",
          component: User,
        },
        {
          name: "mall",
          path:"mall",
          component:Mall
        },
        {
          name: "page1",
          path:"page1",
          component:pageOne
        },
        {
          name: "page2",
          path:"page2",
          component:pageTwo
        }
      ],
    },
  ];

  export default routes