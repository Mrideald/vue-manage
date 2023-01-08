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