import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
import Cookie from 'js-cookie'
Vue.use(VueRouter);

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


//3.创建router实例
const Router = new VueRouter({
  routes,
});


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





// 4.暴露一个vuerouter的实例
export default Router;
