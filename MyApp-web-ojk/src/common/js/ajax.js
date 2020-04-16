"use strict";
import Vue from 'vue'
import axios from 'axios'

import { Toast, Indicator, MessageBox } from 'mint-ui'
import {baseURL, companyCode} from './configuration'

let qs = require('qs')
let token = ''
let productCompanyCode = ''
let ajax = function (type,url, params, callback, timeout, indicatorShow, errorCallback, completeCallback,errorToast) {
  url=url+(url.indexOf('?') !== -1?'&':'?')+'r='+new Date().getTime()
  if(window.Vue && window.Vue.$store.state.token){
    sessionStorage['token']; // => 这是一个测试的value值
    token = window.Vue.$store.state.token
  }else{
    if(sessionStorage['token']){
      token=sessionStorage['token']
    }else{
      token = ''
    }
  }
  if(!indicatorShow) {
    Indicator.open({
      text: '',
      spinnerType: 'fading-circle'
    });
  }
  if(process.env.NODE_ENV=='production'){
    productCompanyCode=localStorage.getItem('companyCode')
  }
  if(typeof params =='object'){
    if(!('companyCode' in params)){
      params.companyCode=companyCode?companyCode:productCompanyCode;
    }
  }else if(typeof params =='string'){
    params+='&companyCode='+companyCode?companyCode:productCompanyCode
  }
  return axios({
    method: type||'post',
    url: baseURL + url,
    data: qs.stringify(params),
    timeout: parseInt(timeout)||30*1000,//超时时间
    withCredentials : true,//表示跨域请求时是否需要使用凭证
    crossDomain: true,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'companyCode': companyCode?companyCode:productCompanyCode,
      'userId':window.Vue.$store.state.userId
    }
  }).then(function (response) {
    let locale = window.Vue.$i18n._vm.locale
    let lang= window.Vue.$i18n._vm.messages[locale].lang
    if(!indicatorShow) {
      Indicator.close()
    }
    console.log(response.data)
    if (response.data.retCode === 'SUCCESS') {//成功回调
      callback(response.data)
    }else if (response.data.retCode==='FAIL') {//Toast失败信息
      if(errorCallback){
        errorCallback(response.data)
      }else{
        Toast({message:response.data.retMsg,position:'bottom'})
      }
      if(response.data.retMsg==='该号码已注册'&&window.location.hash.search('inviteRegister') !== -1){
        setTimeout(()=>{
          window.Vue.$router.replace('/downLoadPage')
        },800)
      }else if(url.includes('/authorization/authFyZxr')){//授权
        setTimeout(()=>{
          window.Vue.$router.go(-1)
        },1600)
      }
    }else if(response.data.retCode === 'NOLOGIN'){//未登录
      goLogin()
      async function goLogin() {
        MessageBox.alert(lang.comm.loginTimeout,lang.comm.reminderTips).then(action => {
          window.Vue.$router.replace('/login')
        }).catch(() => {
        });
      }
    }else if(response.data.retCode == 'LOGIN_ERROR'){
      callback(response.data)
    }else if(response.data.retCode == 'PAYERROR'){
      Toast({message:response.data.retMsg,position:'bottom'})
      window.Vue.$router.replace('/portal')
    }else if (response.data.retCode == 'SESSIONTIMEOUT'){
      Toast({message:response.data.retMsg,position:'bottom'})
      window.Vue.$router.replace('/login')
    }else{
      if(response.data.retMsg){
        Toast({message:response.data.retMsg,position:'bottom'})
      }else{
        Toast({message: lang.comm.commError,position:'bottom'})
      }
    }
  }).catch(function (error) {
    let locale = window.Vue.$i18n._vm.locale
    let lang= window.Vue.$i18n._vm.messages[locale].lang
    console.log(error)
    if(!errorToast){
      if (error.response) {
        if(error.response.data.message){
          Toast({message:error.response.data.message,position:'bottom'})
        }else{
          Toast({message: lang.comm.severError,position:'bottom'})
        }
        if(url.includes('/authorization/authFyZxr')){//授权
          setTimeout(()=>{
            window.Vue.$router.go(-1)
          },1000)
        }
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      } else {
        if(url.includes('/authorization/authFyZxr')){//授权
          setTimeout(()=>{
            window.Vue.$router.go(-1)
          },1000)
        }
        var str = error + ''
        if (str.search('timeout') !== -1) {   // 超时error捕获
          Toast({message: lang.comm.timeOut,position:'bottom'})
        }else{
          if (str.search('Network Error') !== -1) {
            Toast({message: lang.comm.netError,position:'bottom'})
          }
        }
      }      
    }
    Indicator.close();
  })
}

export default
Vue.prototype.$ajax = ajax
Vue.prototype.$baseURL = baseURL
Vue.prototype.$Indicator = Indicator