// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/base.css'
import $ from "jquery";
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import comm from './vuex/comm'
import { myMixin } from './utils/mixin.js'
Vue.use(Vuex)
Vue.use(MintUI)
Vue.mixin(myMixin)
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
import MyHeader from './components/Header'
Vue.use(MyHeader)
import './common/stylus/index.styl'
/* eslint-disable no-new */
window.Vue=new Vue({
  el: '#app',
  router,
  store,
  comm,
  components: { App },
  template: '<App/>',
})
Vue.filter('moneyToFixed', function (val,num) {
  try { 
    // return parseFloat(val).toFixed(num)
    return Math.floor(parseFloat(val)*Math.pow(10,num))/Math.pow(10,num);
  } catch (e) {
    console.log(e);
    return val
  }
})
Vue.filter('dateTimeToDate', function (val) {
  try { 
    return val.slice(0,10)
  } catch (e) {
    console.log(e);
    return val
  }
})
