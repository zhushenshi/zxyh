<template>
  <div class="settings">
    <MyHeader :title="'设置'" v-if="!isWeixin"></MyHeader>
    <mt-cell class="phone" title="账户手机号" :value="phoneNumber"></mt-cell>
    <mt-cell title="风险能力评估" is-link  :value="assess" @click.native="goIntoPage(url)"></mt-cell>
    <mt-cell title="意见反馈" is-link  :value="'提交'" @click.native="goIntoPage('/home/more/feedback')"></mt-cell>
    <mt-cell title="修改密码" is-link  :value="'修改'" @click.native="goIntoPage('/home/accountTab/security/modifyPassword')"></mt-cell>
    <mt-cell title="手势密码" v-if="!isWeixin"><mt-switch v-model="value" style="float:right;" @change="switchChange"></mt-switch></mt-cell>
    <mt-cell title="修改手势密码" is-link  :value="'修改'" @click.native="setGesturePwd()" v-if="value&&!isWeixin"></mt-cell>
    <button class="marginTop" @click="quitLogin">退出登录</button>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script>
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'

  export default {
    name: 'Settings',
    created () {
      let res=this;
      this.$ajax('get',baseURL + '/account/isriskassess/','', function (data) {
        let tel = data.tel;
        if(tel) {
          res.phoneNumber = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
//        请求风险评估是否已经评估0无1有
        res.assess=data.results===1?'已评估':'未评估';
//        控制跳转链接 已评估跳转到评估结果 未评估跳转到评估页面
        res.url=data.results!==1?'/home/accountTab/settings/assess':'/home/accountTab/settings/assessResult';
      })
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          if(window.webkit&&window.webkit.messageHandlers){
            window.webkit.messageHandlers.getGesturePwdState.postMessage('123');
          }else{}
        }else if(/android/.test(ua)){
          if(object&&typeof(object.getGesturePwdState)=="function"){
            object.getGesturePwdState()////all,photo,album
          }
        }  
    },
    mounted(){
      this.value=this.$store.state.gesturePwdState
      let _this=this
      window['getGesturePwdStateCallback'] = function (msg) {
        _this.value=msg==1?true:false
      }      
    },
    data() {
      return {
        phoneNumber: '',
        assess:'未评估',
        url:'/home/accountTab/settings/assess',
        value:true
      }
    },
    methods: {
      goIntoPage (url) {
        this.$router.push(url);
      },
      quitLogin() {
        sessionStorage.setItem('$token', '');
        window.Vue.$router.replace('/login');
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          if(window.webkit&&window.webkit.messageHandlers){
            window.webkit.messageHandlers.loginOut.postMessage('123');
          }else{}
        }else if(/android/.test(ua)){
          if(object&&typeof(object.loginOut)=="function"){
            object.loginOut()
          }
        }        
      },
      closeGesturePwd() {//关闭手势密码
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
          if(window.webkit&&window.webkit.messageHandlers){
            window.webkit.messageHandlers.closeGesturePwd.postMessage('123');
          }else{}
        }else if(/android/.test(ua)){
          if(object&&typeof(object.closeGesturePwd)=="function"){
            object.closeGesturePwd()////
          }
        }        
      },
      setGesturePwd(){////设置手势密码
          var ua = navigator.userAgent.toLowerCase();
          var phone=this.$store.state.loginName
          var password=this.$store.state.loginPwd        
					if (/iphone|ipad|ipod/.test(ua)) {
						if(window.webkit&&window.webkit.messageHandlers){
							window.webkit.messageHandlers.setGesturePwd.postMessage([phone,password,'0']);
						}else{}
					}else if(/android/.test(ua)){
            if(object&&typeof(object.setGesturePwd)=="function"){
						  object.setGesturePwd(phone,password)////all,photo,album
            }
					}
      },
      switchChange(oVal){
        if(!oVal){//打开
          this.setGesturePwd()//设置手势密码
        }else{
          this.closeGesturePwd()
        }
      }
    },
    watch:{
      value:function(nVal, oVal) {
        console.log(123456)
        // if(nVal){//打开
        //   this.setGesturePwd()//设置手势密码
        // }else{
        //   this.closeGesturePwd()
        // }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .settings{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: #f6f6f6}
  a:hover{color:#333;}
  div{text-align:left;}
  .mint-cell{min-height: 56px}
  span.mint-cell-text{color: #000;font-weight:500;font-size:17px;}
  .mint-cell-value{font-size:17px;color: #979797; letter-spacing: -0.2px;}
  .mint-cell{width:100%;padding:0 15px;}
  .mint-cell-allow-right::after{border:none;}
  .phone{margin-top:-1px;}
  .marginTop{margin-top:40px; }
  button{width:88.5%;letter-spacing: 0.92px;line-height:44px;font-size:17px;border:1px solid #FA7009;color:#FA7009;font-weight:500;background:#fff;border-radius:5px;display:block;margin:0 auto;}
</style>
