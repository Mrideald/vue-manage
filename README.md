# 开发注意点

~~~
1.关闭eslint语法检查
 lintOnSave:false //关闭eslint校验 vueconfig.js里
2.视口尺寸vh vw
vw: viewport    width                        1vw=1/100视口宽度
vh: viewport   hight                          1vh=1/100视口高度
3.less引入和加载less加载器引入
npm i less npm i less-loader 有时候注意下载版本
4.路由重定向redirect:'地址' 当地址为当前位置的时候默认跳转到重定向的地址
5.call()方法
obj1.call(obj2,argument1,argument2..) 把obj1上的方法给到obj2使用
6.vue小驼峰写法
以下方式都可以：
<HelloWorld></HelloWorld> <=> <hello-world></hello-world>
7.v-for渲染一个对象的话，第一个值是value第二个值是key
8.Object.keys()的使用
作用：遍历对象
返回结果：返回对象中每一项key的数组
比如obj={1:"77",2:"88",3:"99"}
object.keys(obj)//["1","2"]
9.Array.map()
var users = [
      { name: '熊大', email: 'zhang@email.com' },
      { name: '熊二', email: 'jiang@email.com' },
      { name: '光头强', email: 'li@email.com' }
    ];
    // emails => email的数组
    var emails = users.map(user => user.email);
    //["zhang@email.com", "jiang@email.com", "li@email.com"]
10.开启模块命名空间是namespaced 注意后面有个d
写命名空间之后调用vuex里面的方法也要加文件名/方法
例如this.$store.dispatch("tab/selectMenu",menuItem)
11.array.splice函数的使用
//indexOf得到指定索引，后面跟删除元素个数，包括此索引的数
tabsList.splice(tabsList.indexOf(val),1)
console.log(tabsList,val.name)
12.box-sizing理解
盒子模型是指：外边距（margin）+ border（边框） + 内边距（padding）+ content（内容）可以把每一个容器，比如div，都看做是一个盒子模型
比如你给一个div设置宽高为500px，但实际你设置的只是content，之后你又设置了padding:10px;border:1px solid red;
这时div的宽高就会变为544px（content 500px + padding 40px + border 4px）
相当于一个元素的实际宽高是由：　padding + border + content 组成
1、没有设置box-sizing:border-box属性，宽高会加上padding和border的值，需要我们手动去计算，减去padding和border的值，并调整content的值，以免超过给定的宽高
2、加了box-sizing:border-box属性，padding和border的值就不会在影响元素的宽高，相当于把padding和border的值都算在content里
盒子模型会自动根据padding和border的值来调整content的值，就不需要手动调整

13.Cookie或者local storage中存对象注意点
这俩里面只能存字符串 如果存对象就会在游览器里面存成Object和Object 方法：存的时候用JSON.stringify(val)转化对象val  用的时候用JSON.parse(存的名字)

14.页面刷新时vuex里面的数据会渲染不上去，可以将数据存在cookie或者游览器本地存储
~~~

# 错误记录

~~~error
1. relativeURL.replace is not a function
这个错误是api里面地址写的有问题
api里面写请求的方法目前靠这俩项目学到了俩种写法
1.尚硅谷的
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
这个requests就是二次封装的axios 
2.后台管理
export const addUser = (data) => {
  //新增用户
  return mockRequest.post('/user/add',data);
};
这是返回请求的数据,请求方式直接卸载封装的axios后面
3.[vuex]unknown action type: setMenu
因为命名空间导致的路径问题  如果写了命名空间，那么要加文件名/actions下面的方法 这是写dispatch的时候反正就是写方法的时候，使用的时候    ...mapState("tab", ["tabsList"]),
~~~





# 路由创建

首先清楚一点 路由是实现页面跳转的 所以需要路由组件 

下一步创建pages文件夹放置路由组件 

## 编辑router下的index.js

~~~js
//1.创建路由组件
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'

Vue.use(VueRouter)
//2.将路由组件与组件进行映射 即写好path component之类的 后期routes过多可以单独创建一个routes.js文件再import引入单独管理

const routes=[
    {
        path:'/home',
        component:Home
    },
    {
        path:'/User',
        component:User
    }
]
//3.创建router实例
const Router=new VueRouter({
    routes
})

// 4.暴露一个vuerouter的实例
export default Router
~~~



5.创建和挂载根节点实例

在main.js里引入和使用router 引入的router是刚刚创建的router下的index.js



6.配置路由出口 (在哪显示

~~~
在app.vue里添加router-view
~~~



## 二.嵌套路由

```
/user/johnny/profile                     /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

添加子路由

~~~js
 //地址为/即一进去就访问的这个页面
  {
    path: "/",
    component: Main,
    //路由出口要写在父路由里!!
    children: [
      {
        path: "home",
        component: Home,
      },
      {
        path: "User",
        component: User,
      },
    ],
  },
~~~

# 组件的创建

一般在页面中功能单一 没有太多变化的可以设为组件,将一个页面的业务处理逻辑放在一起，处理和维护起来就会很复杂，不利于后续管理和扩展，这个时候就需要使用组件化来分门别类的管理逻辑



# 渲染数据在页面上

~~~
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
~~~



利用computed计算出有children和没有的

~~~js
computed: {
    noChildren() {
      return this.menuData.filter(item=>!item.children)
    },
    hasChildren(){
      return this.menuData.filter(item=>item.children)
    }
  },
~~~

下一步注意区分页面结构 哪些需要哪些要



这俩天学的整理一下思路  路由跳转 less什么的

~~~
路由跳转 点击右侧实现跳转 没什么好说的  
@click点击事件然后this.$router.push({path:''})
~~~



# 路由重复跳转报错

~~~error
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location
~~~

解决方法 重写push和replace 这是最好的 最简易的治标不治本的也有 首先是简易的

~~~
最简易方法：在跳转后面添加跳转成功和失败的回调，不返回东西就好了 治标不治本

clickMenu(menuItem) {
        this.$router.push({ path: menuItem.path },()=>{},()=>{});
 },
~~~

~~~vue
最好的方法 重写push和replace
//重写push和replace
//先把初始的push和replace复制一遍 push和replace方法在router原型上
const originPush=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

//重写push
VueRouter.prototype.push=function(location,resolve,reject){
  if(resolve||reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

//重写replace
VueRouter.prototype.replace=function(location,resolve,reject){
  if(resolve||reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}


~~~



# vuex的使用

~~~
下载 vue2用vuex@3版本
npm i vuex@3
~~~

~~~
创建store文件夹以及index.js  //一下使用模块化编码
store:
import Vue from 'vue'
import Vuex from 'vuex'
import tab from '@/store/tab'

//使用插件vuex
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab
    }
})

tab.js
const actions = {
    //菜单收缩
  changeCollapseMenu(context) {
    context.commit("CHANGECOLLAPSEMENU");
  },
};

const mutations = {
  CHANGECOLLAPSEMENU(state) {
    state.isCollapse = !state.isCollapse;
  },
};

const state = {
  isCollapse: false,
};

const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};


在main.js里注册
~~~



# axios的使用以及二次封装



~~~
//axios二次封装

import axios from 'axios'

//创建一个axios请求实例
const requests=axios.create({
    //通用请求的地址前缀
    baseURL:'/api',
    timeout:5000//超时时间
})

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default requests
~~~



//如果是有后端基础地址的话要在vue.config.js里配置代理

~~~
   devServer: {
    proxy: {
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn',
         changeOrigin: true
      },
    }
  }
})

如果没有配置就是默认的http://localhost:8080
~~~

# mockjs使用

~~~
npm i mockjs
~~~



mock做的是写数据文件已经拦截数据请求两个方面 做完之后就是正常的请求流程 在api里面编写 请求方式还是二次封装之后的mockRequest.js

在工具文件夹utils创建mockRequest.js 代码配置和request一样，就baseUrl：‘/mock’

易于区分和普通请求的区别

第二步创建mock文件夹 编写mock.js 再创建模拟的数据文件夹

mock.js配置

~~~
import Mock from 'mockjs'
import homeApi from './mockServerData/home'

//定义mock请求拦截
//第一个是拦截地址，拦截到这个请求之后返回数据
Mock.mock('/mock/home/getData',homeApi.getStatisticalData)
~~~

//创建mock请求（和axios一样的,在api/index里面）

~~~
import mockRequest from '@/utils/mockRequest'

//请求首页数据

export const getData=()=>{
    //返回一个promise对象
    return mockRequest.get('/home/getData')
}
~~~



接受数据

~~~
  mounted() {
    getData().then((data)=>{
      console.log(data)
    })
  },
~~~

# echarts使用

~~~vue
getData().then(({ data }) => {
  const { tableData } = data.data;
  this.tableData = tableData;
  //基于准备好的dom节点初始化echarts
  const echarts1 = echarts.init(this.$refs.echarts1);
  //指定echarts的配置
  var echarts1Options = {};
  //处理xaxis
  const { orderData } = data.data;
  const xAxis=Object.keys(orderData.data[0])
  echarts1Options.xAxis={data:xAxis}//x轴
  echarts1Options.yAxis={} //y轴
  //图例
  echarts1Options.legend={
    data:xAxis
  }
  echarts1Options.series=[],
  xAxis.forEach(keys=>{
    echarts1Options.series.push({
      name:keys,
      type:'line',
      //返回一个新数组
      data:orderData.data.map(item=>item[keys])
    })
  })
  echarts1.setOption(echarts1Options)
});
~~~

准确的配置：

~~~
      var echarts2 = echarts.init(document.getElementById("echarts2"));
      // 指定图表配置项
      var echarts2Options = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item=>item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [{
          name:'新增用户',
          data:userData.map(item=>item.new),
          type:'bar'
        },{
          name:'活跃用户',
          data:userData.map(item=>item.active),
          type:'bar'
        }],
      };
      echarts2.setOption(echarts2Options);
~~~

# 查找数组中是否存在某元素方法

# 

+ array.[indexOf](https://so.csdn.net/so/search?q=indexOf&spm=1001.2101.3001.7020)(适合直接判断，数组不是由对象组成的)

  > 判断数组中是否存在某个值，如果存在返回[数组元素](https://so.csdn.net/so/search?q=数组元素&spm=1001.2101.3001.7020)的下标，==否则返回-1==

  ```javascript
   let arr = ['something', 'anything', 'nothing', 'anything'];
   let index = arr.indexOf('nothing');
   # 结果：2
  123
  ```

+ array.includes(searchElement[, fromIndex])（这个也适合直接判断）

  > 判断一个数组是否包含一个指定的值，如果存在返回 true，否则返回false。

  > 参数：searchElement
  > 需要查找的元素值。

  > 参数：thisArg（可选）
  > 从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

  ```javascript
  let numbers = [12, 5, 8, 130, 44];
  let result = numbers.includes(8);
  # 结果： true
  result = numbers.includes(118);
  # 结果： false
  12345
  ```

+ array.find(callback[, thisArg])(直接找到满足条件的值)

  > 返回数组中满足条件的第一个元素的值，如果没有，返回undefined

  > 参数：callback
  > element 当前遍历到的元素。
  > index 当前遍历到的索引。
  > array 数组本身。

  > 参数：thisArg（可选）
  > 指定 callback 的 this 参数。

  ```javascript
  // ---------- 元素是普通字面值 ----------
  let numbers = [12, 5, 8, 130, 44];
  let result = numbers.find(item => {
      return item > 8;
  });
  # 结果： 12
  // ---------- 元素是对象 ----------
  let items = [
      {id: 1, name: 'something'},
      {id: 2, name: 'anything'},
      {id: 3, name: 'nothing'},
      {id: 4, name: 'anything'}
  ];
  let item = items.find(item => {
      return item.id == 3;
  });
  # 结果： Object { id: 3, name: "nothing" }
  1234567891011121314151617
  ```

+ array.findIndex(callback[, thisArg])（适合判断，找不到满足条件的返回-1）

  > 返回数组中满足条件的第一个元素的索引（下标）, 如果没有找到，返回-1

  > 参数：callback
  > element 当前遍历到的元素。
  > index 当前遍历到的索引。
  > array 数组本身。

  > 参数：thisArg（可选）
  > 指定 callback 的 this 参数。

  ```javascript
  // ---------- 元素是普通字面值 ----------
  let numbers = [12, 5, 8, 130, 44];
  let result = numbers.findIndex(item => {
      return item > 8;
  });
  # 结果： 0
  // ---------- 元素是对象 ----------
  let items = [
      {id: 1, name: 'something'},
      {id: 2, name: 'anything'},
      {id: 3, name: 'nothing'},
      {id: 4, name: 'anything'}
  ];
  let index = items.findIndex(item => {
      return item.id == 3;
  });
  # 结果： 2
  1234567891011121314151617
  ```

+ $.inArray(searchElement, arr)

  > 使用jquery的inArray方法，该方法返回元素在数组中的下标，如果不存在与数组中，那么返回－１;

  > 参数：searchElement
  > 需要查找的元素值。

  > 参数：arr
  > 需要查找的数组

  ```javascript
   var arr=['aaa','bbb','ccc','ddd','eee'];
  var a= $.inArray('bbb',arr);
  console.log(a);
  #结果： 1
  ```

# /deep/ 深度作用选择器作用及使用

之前在开发中遇到一个问题，vue项目结合 element ui 使用。

但是 element ui 的样式不一定符合我们的需求，这时我们就需要改变它的样式。

综上可以看出.在哪里加的/deep/ ,data属性选择器就会跑到写的上一层去.

若写多个/deep/：

~~~
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
~~~

# 登录页面的路由守卫编写(token)

## 生成随机数

1. uuid生成全球唯一随机数（npm i uuid）

   ~~~
   import (v4 as uuidv4) from 'uuid'
   
   //如果是正常项目一般要封装uuid 这边粗略了
   const token=uuidv4();
   console.log(token) //token:70773b98-e28e-4854-998e-51fb537fd0eb
   ~~~

   

2. Mock.Random.guid()生成随机数

   ~~~
   // 得到一段随机数
   const token=Mock.Random.guid();
   console.log(token) //token:4E8d5c3B-44c3-33FE-63Ed-f0D91BbadBBc
   ~~~

   

## 生成后存储在cookie中 也可以存储在本地local storage或者会话存储什么的

~~~
npm i js-cookie

import Cookie from 'js-cookie'

Cookie.set('token',token)
~~~

## 编写跳转

~~~
// 登录
submit(){
// 得到一段随机数
// const token=Mock.Random.guid();
// console.log(token) //token:4E8d5c3B-44c3-33FE-63Ed-f0D91BbadBBc
//如果是正常项目一般要封装uuid 这边粗略了
const token=uuidv4();
//console.log(token) //token:70773b98-e28e-4854-998e-51fb537fd0eb
//将token信息存入cookie用不不同页面通信
Cookie.set('token',token)
this.$router.push({path:'/home'})}
~~~

## 编写路由守卫

~~~
//全局前置路由守卫
Router.beforeEach((to,from,next)=>{
 //判断token存不存在
 const token=Cookie.get('token')
 //token不存在说明当前用户是未登录，应该跳转至登录页
 if(!token&&to.name!=='login'){
  next({name:'login'})
 }
//  如果token存在 说明已经登录 返回原来的地方
 else if(token&&to.name==='login'){
  next({name:from.name})
 }else{
  // 其他所有情况放行
  next()
 }
})
~~~

这是在route.js的index.js下写的全局守卫



# 编写动态路由 根据业务需求

未完成 网课好像也没实现这个逻辑 代码可参考