
import Vue from 'vue'
import { Toast } from 'mint-ui';
// import {$ajax} from './ajax'
const ua=navigator.userAgent.toLowerCase()
const $Header = (function () {
  let headerHeight = 0
  if (/iphone|ipad|ipod/.test(ua)) {
    headerHeight = 68
  } else if (/android/.test(ua)) {
    headerHeight = 68
  }else{
    headerHeight = 68//浏览器
  }
  return headerHeight
})()
const isIphone=(function(){
  if (/iphone|ipad|ipod/.test(ua)) {
    return true
  } else if (/android/.test(ua)) {
    return false
  }
})()
Vue.filter('money', function(val) {
  if(!val){
    val='0'
  }
  val = val.toString().replace(/\$|\,/g,'');
  if(isNaN(val)) {
    val = "0";  
  } 
  let sign = (val == (val = Math.abs(val)));
  val = Math.floor(val*100+0.50000000001);
  let cents = val%100;
  val = Math.floor(val/100).toString();
  if(cents<10) {
    cents = "0" + cents
  }
  for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
    val = val.substring(0,val.length-(4*i+3))+'.' + val.substring(val.length-(4*i+3));
  }
  return (((sign)?'':'-') + val);
})
Vue.filter('dateFormat',function(str){
  if(!str|str==''){
    return '_._'
  }else{
    str+=''
    return str.substr(0,4)+'-'+str.substr(4,2)+'-'+str.substr(6,2)+ ' ' + str.substr(8,2) +':'+ str.substr(10,2) + ':' + str.substr(12,2);
  }
})
Vue.filter('moneyFormat',function(str,index){
  if(!str|str==''){
    return '0.00'
  }else{
    str=parseFloat(str)
    return str.toFixed(index)
  }
})
Vue.filter('toDate', function (str) {
  //contact(连接符号) 默认-
  //type 时间类型 			//默认,年月日时分秒
  //1,2018.07.09，年月日
  //2,月日
  //3,2018.07.09 12:04年月日时分秒
  if(!str) return
  str=str+''
  let res=""
  let contact=arguments[1]?arguments[1]:"-"
  let type=arguments[2]?arguments[2]:1
  if(contact=="."||contact=="-"||contact=="_"||contact=="/"||contact=="\\"){
  res=type==2?"":(str.slice(0,4)+contact)+str.slice(4,6)+contact+str.slice(6,8)
  }else{
    res=type==2?str.slice(4,6)+"月"+str.slice(6,8)+"日":(str.slice(0,4)+"年")+str.slice(4,6)+"月"+str.slice(6,8)+"日"
  }
  switch(type){
    case 1://2018年7月20日
      res+="";
      break;
    case 2://2018年7月20日
      res+="";
      break;
    case 3://2018年7月20日 12:04
      res+=" "+str.slice(8,10)+":"+str.slice(10,12)
      break;
    default://2018年7月20日 12:04:20
      res+=" "+str.slice(8,10)+":"+str.slice(10,12)+":"+str.slice(12,);
  }
  return res
})
export default
Vue.prototype.$Header = $Header//头部的高度
Vue.prototype.$ua = ua
Vue.prototype.$Toast = Toast
Vue.prototype.$IsIphone = isIphone