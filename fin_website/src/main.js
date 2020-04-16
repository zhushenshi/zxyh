import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/stylus/index.styl'; // global css
import './plugins/element.js'
import './directive/dialogDrag.js'//路径改为自己的，这里不加from ,不use
import './utils/request'
import Router from 'vue-router'
import { mixin } from './mixin/mixin.js'
Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(ElementUI);
Vue.mixin(mixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



Vue.filter('moneyToFixed', function (val,num) {
  try { 
    // return parseFloat(val).toFixed(num)
    return (Math.floor(parseFloat(val)*Math.pow(10,num))/Math.pow(10,num)).toFixed(num);    
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