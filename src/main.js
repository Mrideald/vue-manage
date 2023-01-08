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
  router,store,mock
}).$mount('#app')
