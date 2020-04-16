<template>
  <div id="app" class="app-root">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  // import Home from '@/components/home/home'
  import queryString from 'query-string'
  import $ from "jquery";
  import {baseURL,baseURLVerifyImg} from './vuex/url.js'
	import {Encrypt,Decrypt} from './utils/aes.js'
  
  export default {
  name: 'App',
  created () {
    var query = queryString.parse(location.search)
    if(Object.keys(query).indexOf('shareUrl')>-1){
      console.log("shareurl:", query.shareUrl)
      this.$router.push(query.shareUrl)
    }
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      if(window.webkit&&window.webkit.messageHandlers){
        window.webkit.messageHandlers.verifyGesturePwd.postMessage([123]);
      }else{}
    }else if(/android/.test(ua)){
      if(object&&typeof(object.verifyGesturePwd)=="function"){
        object.verifyGesturePwd()
      }
    }      
  },
  mounted (){
			$('input,textarea').on('blur',function(){
			window.scroll(0,0);
			});   
    setTimeout(()=>{
      var token=sessionStorage.token;
      if ( !token ||  token=="null" || token=='undefined' ){
         //noting to do 

      }else{
           window.Vue.$token=token;
           this.$store.commit("addToken", token);
      }
      
    },0)
        // 监听安卓返回键
    let _this = this
    window['exitAppCaLLBack'] = function () {
      _this.onBackKeyDown()
    }
    window['accountLoginCallback'] = function () {
      _this.$router.push('/login')
    }
    window['accountInfoCallback'] = function (msg) {//手势密码成功调用登录
      var form={}
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        form = JSON.parse(msg)
      }else if(/android/.test(ua)){
        form.phone=msg.useName
        form.password=msg.userPwd
      }
      form.phone=form.phone
      form.password=Decrypt(form.password)
      _this.$ajax('',baseURL+'/login?phone='+form.phone+'&password='+form.password, '', function (data) {
        window.Vue.$token=data.token;
        sessionStorage.setItem('$token', data.token);
        _this.$store.commit("addToken", data.token);			
      }.bind(this))
    },
      window['getGesturePwdStateCallback'] = function (msg) {//获取密码设置状态
        this.$storestore.commit('gesturePwdState', msg==1?true:false)
      }      
      var ua = navigator.userAgent.toLowerCase();//获取手势密码设置状态
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
  methods:{
    onBackKeyDown(){
      let routeName = this.$route.name
      if(routeName ==='Current' ||routeName ==='Product' ||routeName ==='AccountTab'){
        this.exitApp(2)
        // this.exitApp(0)
      }else if(routeName == 'FaceIdentity'){//人脸
        console.log(12312)
      }else{
        this.$router.go(-1)
      }
    },
    // 退出app
    exitApp(key) {
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
      } else if (/android/.test(ua)) {
        try{
          if(object&&typeof(object.exitApp)=="function"){
            object.exitApp(key,'zh-CN')
          }else{}
        }catch(e){
          alert(e)
        }
      }
    },    
  }
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
