import Vue from 'vue'
import axios from 'axios'
import { Toast, Indicator, MessageBox } from 'mint-ui'
var qs = require('qs');
let token='';
const $ajax = function (type,url, params, callback, errorCallback, completeCallback, timeout, indicatorShow) {
  if(type===''){
    type='post'
  }
  if (url.indexOf('?') !== -1) {
    url += '&r=' + new Date().getTime()
  } else {
    url += '?r=' + new Date().getTime()
  }
  if (timeout === null || typeof (timeout) === 'undefined') {
    timeout = 30 * 1000
  }
  if(sessionStorage.getItem('$token')){
    token = sessionStorage.getItem('$token');
  }else{
    token =''
  }
  if(!indicatorShow) {
    Indicator.open()
  }
  return axios({
    method: type,
    url: url,
    data: qs.stringify(params),
    timeout: timeout,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      token: token
    }
  }).then(function (response) {
    Indicator.close();
     console.log(response.data);
    if (response.data.status === '200') {//200成功回掉
      callback(response.data)
    }else if(response.data.status === '300') {//300失败
      // console.log(response,22)
      if(response.data.msg=='手机号码已被注册'){
        window.Vue.$router.push('/login')
      }
      Toast({message:response.data.msg,position: 'bottom'})
    }else if(response.data.status === '401'){//重新登录
      sessionStorage.setItem('$token', '');
      MessageBox.confirm('您尚未登录,点击确定跳转登录页','温馨提示').then(action => {
        window.Vue.$router.push('/login')
      }).catch(() => {
      });
      document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='确定';
    }else{
      Toast({message:response.data.msg,position: 'bottom'})
    }
  }).catch(function (error) {
    // console.log(error)
    if(errorCallback){
      errorCallback(error)
    }
    Indicator.close();
    var str = error + ''
    if (str.search('timeout') !== -1) {   // 超时error捕获
      console.log(error)
      Toast({message: '网络链接超时,请重试',position: 'bottom'})
    }else{
    Toast({message: '网络链接超时,请重试',position: 'bottom'})
      console.log(error)
    }
  })
}
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
export default
Vue.prototype.$ajax = $ajax
Vue.prototype.$Toast = Toast
Vue.prototype.$isWeixin = isWeixin