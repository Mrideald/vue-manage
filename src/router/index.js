import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
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

// 4.暴露一个vuerouter的实例
export default Router;
