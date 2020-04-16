// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import Cube from 'cube-ui'
import 'mint-ui/lib/style.css'
import fastclick from 'fastclick'

import store from './vuex/store'
import 'lib-flexible/flexible.js'

import './assets/iconfont/iconfont.css'

import './common/stylus/index.styl'
import common from './common/js/common'
import ajax from './common/js/ajax'
import aes from './common/js/aes'
import MyHeader from './components/Header'
// import VueJsonp from 'vue-jsonp'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
// Vue.use(VueJsonp)
Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(Cube)
Vue.use(MyHeader);

Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: localStorage.getItem('_lang')?localStorage.getItem('_lang'):'in-ID',// 语言标识 这里设置默认语言
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en'),   // 英文语言包
    'in-ID': require('./common/lang/id')    // 印尼语言包
  }
})
/* eslint-disable no-new */
window.Vue=new Vue({
  el: '#app',
  router,
  store,
  common,
  ajax,
  aes,
  i18n,
  components: { App ,MyHeader},
  template: '<App/>'
})
// fastclick.attach(document.body)
