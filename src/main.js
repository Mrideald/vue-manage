import Vue from 'vue'
import App from './App.vue'
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import mock from '@/mock/mock'

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,store,mock,
  //防止刷新之后找不到vuex中的router动态获取 页面刷新之后所有的都要初始化
  created(){
    store.dispatch('tab/addMenu',router)
  }
}).$mount('#app')
