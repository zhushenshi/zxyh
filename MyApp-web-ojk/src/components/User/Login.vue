<template>
  <div class="container">
    <MyHeader :backIconShow="false" @showActions="showActions" :headerJson="headerJson" ref="header">{{$t('lang.loginView.login')}}</MyHeader>
    <div class="box">
      <div class="imgBox">
        <img :src="logoSrc" alt="">
      </div>
      <div class="user">
        <ul class="user_name" style="border-bottom: 1px solid #DBDBDB">
          <li class="name_l1">
            <i class="iconfont icon-shouji"></i>
          </li>
          <li class="name_l2">
            <input type="tel" v-model="userInfo.phone" :placeholder="$t('lang.regMsg.telLoginPlc')" maxlength="20"/>
          </li>
        </ul>
        <ul class="uesr_paw" v-show="!codeLogin" style="border-bottom: 1px solid #DBDBDB">
          <li class="paw_l1">
            <i class="iconfont icon-suo"></i>
          </li>
          <li class="paw_l2">
            <input  :type="type" v-model="userInfo.password" :placeholder="$t('lang.regMsg.pwdPlc')"  maxlength="16"/>
          </li>
          <li class="paw_l3">
            <i class="iconfont" :class="{'icon-yanjing':type==='text','icon-eye':type==='password'}" @click="showPassword()"></i>
          </li>
        </ul>
        <ul class="uesr_paw" v-show="codeLogin" style="border-bottom: 1px solid #DBDBDB">
          <li class="paw_l1">
            <i class="iconfont icon-jiugongge-copy"></i>
          </li>
          <li class="paw_l2">
            <input type="tel" v-model="userInfo.yzm" :placeholder="$t('lang.regMsg.codePlc')"  maxlength="6"/>
          </li>
          <li :class="{'yzm_l3':true,disSmsBtn:!canClick,'zh':$i18n.locale=='zh-CN'||$i18n.locale=='en-US'?true:false}" style="border-left: 1px solid #CCC;">
            <span @click="getYzm()">{{btnText}}</span>
          </li>
        </ul>
        <div class="forget"><span class="select-lang" @click="codeLogin=!codeLogin">{{codeLogin?$t('lang.loginView.codeLoginPwd'):$t('lang.loginView.codeLogin')}}</span><span v-show="!codeLogin" @click="goPages('/resetPwd')">{{$t('lang.loginView.forget')}}？</span></div>
        <div class="base-btn" @click="doLogin(true)">{{$t('lang.loginView.login')}}</div>
        <div v-show="showRegister" class="prompt">{{$t('lang.loginView.noAccout')}}<span @click="goPages('/register')">&nbsp;{{$t('lang.loginView.registerTips')}}</span></div>
        <cube-popup type="my-popup" ref="popup" :mask="true">
          <div class="poupBox">
            <div class="title"><p>{{$t('lang.loginView.picYzm')}}</p></div>
            <div class="content">
              <div class="yzmInput"><input type="text" :placeholder="$t('lang.loginView.pciPlc')"  v-model="userInfo.yzm" maxlength="4"></div>
              <div class="yzmImg">
                <img :src="yzmSrc" alt="" @click="refresh">
              </div>
            </div>
            <div class="btnBox">
              <a href="javascript:;" class="poup-dialog-btn border-top-1px" @click="hide">{{$t('lang.comm.cancel')}}</a>
              <a href="javascript:;" class="poup-dialog-btn border-top-1px cube-dialog-btn_highlight" @click="confirm">{{$t('lang.comm.confirm')}}</a>
            </div>
          </div>
        </cube-popup>
      </div>
    </div>
    <mt-actionsheet :cancelText="$t('lang.comm.cancel')" :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
const telReg = /^[0-9]*$/
const pwdReg = /^\w{6,16}$/
import axios from 'axios'
import Agreement from '../Common/Agreement.vue';
import Vue from 'vue'
import {createAPI} from 'cube-ui'
createAPI(Vue, Agreement, ['click'], true)
import {companyCode} from '../../common/js/configuration'
export default {
  name: 'Login',
  data () {
    return {
      headerJson:{
        // rightBtn: this.$t('lang.comm.lang'),
        // rightFunc: 'showActions'
      },
      codeLogin: false,
      btnText:this.$t('lang.resetPwdView.send'),
      canClick:true,
      seconds:60,
      logoSrc: require('./img/logo_default.png'),
      showRegister: false,
      userInfo:{
        phone:'',
        password:'',
        companycode:companyCode,
        yzm:''
      },
      iconEye:'icon-yanjing',
      type:'password',
      yzmSrc:'',
      sheetVisible: false,
      actions: [
        {
          name:'中文',
          method: this.changeLangEvent,
          id:0
        },{
          name:'English',
          method: this.changeLangEvent,
          id:1
        },{
          name:'in_ID',
          method: this.changeLangEvent,
          id:2
        }
      ]
    }
  },
  components:{
  },
  created(){
    this.userInfo.phone=localStorage.getItem('phone')
  },
  mounted(){
    let _this=this
    /**
     * 设备信息结果返回
     * */
    window['getDeviceInfoCallback'] = function (msg) {
      _this.getDeviceInfoCallbackFun(msg)
    }
    window['companyCodeCallback'] = (msg) => {
      var arr=[]
      arr=msg?msg.split(','):''
      // alert(arr[0])//companyCode
      // alert(arr[1])//deviceId
      // alert(arr[2])//channelName
      arr[0]?localStorage.setItem('companyCode',arr[0]):localStorage.setItem('companyCode','')
      arr[1]?localStorage.setItem('deviceId',arr[1]):localStorage.setItem('deviceId','')
      arr[2]?localStorage.setItem('channelName',arr[2]):localStorage.setItem('channelName','')
      this.getLogoDefaultInfo(arr[0]);
    }
    process.env.NODE_ENV=='production'?this.getCompanyCode():this.getLogoDefaultInfo()
    // object.companyCodeInfo()/////////////////////////////////////////////////////////
    // this.getLogoDefaultInfo()//
    let sessionShow=sessionStorage.getItem("agreement");
    if(!sessionShow){
      this.showAgreement('1')
    }
  },
  watch:{
    'userInfo.yzm':{
      handler: function(newValue,old) {
        this.userInfo.yzm=this.userInfo.yzm.replace(/\s+/g,'')
      }
    }
  },
  methods:{
    getCompanyCode(){
      if(process.env.NODE_ENV=='production'){
        var ua = navigator.userAgent.toLowerCase();
        try{
          if (/iphone|ipad|ipod/.test(ua)) {
            window.webkit.messageHandlers.companyCodeInfo.postMessage(['1']);
          }else if(/android/.test(ua)){
            object.companyCodeInfo()
          }
        }catch(e){
          console.warn(e)
        }
      }else{
        localStorage.setItem('companyCode','')
      }
    },
    getYzm(){
      let This=this;
      if (!This.canClick) {
        return
      }
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      if(!this.userInfo.phone){
        this.$Toast({message:lang.regMsg.telPlc,position:'bottom'})
        return false
      }else{
        if(this.userInfo.phone.length>2){
          let kt=this.userInfo.phone.substr(0,2);
          if(kt!='08'){
            this.$Toast({message:lang.ojk.telKt,position:'bottom'})
            return false
          }
        }else{
          this.$Toast({message:lang.ojk.telKt,position:'bottom'})
          return false
        }
      }
      if(!telReg.test(this.userInfo.phone)){
        this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
        return false
      }
      This.$ajax('post','/reg/getSmsCode',{
        phone:This.userInfo.phone,
        type:'login'
      },function(data){
        if(data.retData.flag=='1'){//msg: "未注册"
          This.$Toast({
            message: data.retMsg,
            position:'bottom'
          })
          return
        }
        This.canClick = false
        This.$Toast({
          message: data.retMsg,
          position:'bottom'
        })
        This.seconds=parseInt(60)
        // This.seconds=parseInt(data.retData)
        This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
        let start_time = new Date().getTime();//开始倒计时的时间毫秒数
        let timer = window.setInterval(() => {
          let end_time=new Date().getTime()
          let diff_time=((end_time-start_time)/1000).toFixed(0)//时间间隔
          // console.log(diff_time)
          //解决ios切换到主页面时倒计时暂停的bug
          // This.seconds=parseInt(data.retData)-diff_time
          This.seconds=parseInt(60)-diff_time
          // This.seconds--
          This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
          if (This.seconds < 0) {
            window.clearInterval(timer)
            This.btnText = This.$t('lang.resetPwdView.send')
            This.seconds = 60
            This.canClick = true
          }
        }, 1000)
      })
    },
    showActions(){
      this.sheetVisible=!this.sheetVisible
    },
    getDeviceInfoCallbackFun: function (msg) {
      if(typeof(msg)=="string"){
        try{
          msg=eval('('+msg+')');
        }catch(e){
          console.log(e)
        }
      }
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        localStorage['black_box'] = '';
        localStorage['deviceType'] = 'IOS';
        localStorage['lgOnlyCode'] = msg.IMEICode;//唯一识别码
        localStorage['operatingSystem'] = msg.operatingSystem;//操作系统
        localStorage['IMEIIp'] = msg.ipAddress;//ip
        localStorage['registrationID'] = msg.registerId;
      }else if(/android/.test(ua)){
        localStorage['black_box'] = '';
        localStorage['deviceType'] = 'AND';
        localStorage['lgOnlyCode'] = msg.uuid;//唯一识别码
        localStorage['operatingSystem'] = msg.operatingSystem;//操作系统
        localStorage['IMEIIp'] = '';//ip
        localStorage['registrationID'] = msg.registerId;
      }
    },
    getLogoDefaultInfo(companyCode){
      let _this=this;
      let data={};
      if(companyCode){
        data.companyCode=companyCode
      }
      _this.$ajax('post','/getAppSetting',data,function(data){
          var data = data.retData;
          if(data.appSetting){
            _this.logoSrc=data.appSetting.logo144?data.appSetting.logo144:require('./img/logo_default.png');// 登录页logo
            if(data.appSetting.isReg&&data.appSetting.isReg=='0'){// 不显示
              _this.showRegister=true
            }else{
              _this.showRegister=true
            }
            var versionCode=data.appSetting.android_version,
                titleDes=data.appSetting.android_name,
                contDec=data.appSetting.android_desc,
                apkUrl=data.appSetting.android_download_url;
            try{
              object.versionUpdate(versionCode,titleDes,contDec,apkUrl);
            }catch(e){
              console.warn(e)
            }
        }
      },"",true)
    },
    changeLangEvent(index){
      if ( index.id === 1 ) {
        this.$i18n.locale = 'en-US';
      }else if(index.id===0) {
        this.$i18n.locale = 'zh-CN';
      }else if(index.id===2){
        this.$i18n.locale = 'in-ID';
      }
      localStorage.setItem('_lang',this.$i18n.locale)
      this.headerJson.rightBtn=this.$t('lang.comm.lang')
      this.btnText=this.$t('lang.resetPwdView.send')
    },
    goPages(path){
      this.$router.push(path)
    },
    showPassword(){
      if(this.type==='password'){
        this.type='text'
      }else{
        this.type='password'
      }
    },
    checkInfo(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      if(!this.userInfo.phone){
        this.$Toast({message:lang.regMsg.telPlc,position:'bottom'})
        return false
      }else{
        if(this.userInfo.phone.length>2){
          let kt=this.userInfo.phone.substr(0,2);
          if(kt!='08'){
            this.$Toast({message:lang.ojk.telKt,position:'bottom'})
            return false
          }
        }else{
          this.$Toast({message:lang.ojk.telKt,position:'bottom'})
          return false
        }
      }
      if(!telReg.test(this.userInfo.phone)){
        this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
        return false
      }
      if(!this.codeLogin){
        if(!this.userInfo.password){
          this.$Toast({message:lang.regMsg.pwdPlc,position:'bottom'})
          return false
        }
      }else{
        if(!this.userInfo.yzm){
          this.$Toast({message:lang.regMsg.codePlc,position:'bottom'})
          return false
        }
      }

      return true
    },
    remeber(){
      localStorage.setItem('phone',this.userInfo.phone)
      localStorage.setItem('password',this.userInfo.password)
    },
    doLogin(flag){
      if(!this.checkInfo()){
        return
      }
      let _this=this;
      let identyCode = '';
      if(!this.codeLogin){//密码登录
        identyCode=""
      }else{//验证码登录
        identyCode=this.userInfo.yzm
      }
      let deviceId = localStorage['deviceId']?localStorage['deviceId']:'';
      let channelCode = localStorage['channelName']?localStorage['channelName']:'';
      let type = localStorage['deviceType']?localStorage['deviceType']:'';
      let registrationID = localStorage['registrationID']?localStorage['registrationID']:'';
      let black_box = localStorage['black_box']?localStorage['black_box']:'';
      _this.$ajax('post','/login/login',{
        phone:_this.userInfo.phone,
        password:_this.userInfo.password,
        identyCode:identyCode,
        registration_id:registrationID,
        deviceCode:deviceId,
        black_box :black_box,
        type:type,
        location: '',
        channelCode:channelCode
      },function(data){
       if(data.retCode === "SUCCESS"){
          let token = data.retData.token
          _this.$store.commit("token", token)
          _this.$store.commit("tel", data.retData.tel)
          _this.$store.commit('userId',data.retData.userId);
          localStorage.setItem('phone',_this.userInfo.phone);
          _this.$store.commit("tabPage", _this.$t('lang.comm.home'))
          let custId = data.retData.id;
          let sid = data.retData.sid;
          _this.setCookie('JSESSIONID',sid);
          _this.setCookie('SESSION',sid);
          _this.$store.commit("custId",custId);
          _this.$router.replace('/portal');
        }else if(data.retCode === "LOGIN_ERROR"&&data.retData.errorCount>=3&&flag){
            _this.refresh()//获取验证码
            _this.$refs.popup.show()
            _this.userInfo.yzm=''
        }else{
          _this.$Toast({message:data.retMsg,position:'bottom'})
        }
      })
    },
    getCookie(name){
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name){
      return arr[1];
      }
      }
      return "";
    },
    setCookie (name,value) {
      let exp = new Date();
      exp.setTime(exp.getTime() + 10*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    refresh(){
      let _this=this
      _this.$Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
      });
      axios.defaults.withCredentials = false
      axios.defaults.credentials = 'include',
      axios.get(_this.$baseURL+'/patchca?phone='+_this.userInfo.phone+'&r='+new Date().getTime(), {
        responseType: 'arraybuffer'
      }).then((res) => {
        _this.$Indicator.close();
        let codeImg = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        _this.yzmSrc = codeImg
        _this.$store.commit("token", _this.getCookie('code_token'))
        }).catch(function(error){
          _this.$Indicator.close();
          if (error.response) {
            if(error.response.data.message){
              Toast({message:error.response.data.message,position:'bottom'})
            }else{
              Toast({message: '服务器端异常,请联系管理员处理',position:'bottom'})
            }
          } else {
            var str = error + ''
            if (str.search('timeout') !== -1) {   // 超时error捕获
              Toast({message: '网络链接超时,请重试',position:'bottom'})
            }else{
              console.log(error)
              console.log(error.stack)
          }
        }
      })
    },
    confirm(){
      let _this=this
      if(_this.userInfo.yzm==''){
        _this.$Toast({message:'验证码不能为空',position:'bottom'})
        return
      }
      if(!/^\w{4}$/.test(_this.userInfo.yzm)){
        _this.$Toast({message:'验证码格式不正确',position:'bottom'})
        return
      }
      var baseURL='/api/cashloan-api'
      this.$ajax('post','/checkValidateCode',{code:_this.userInfo.yzm},function(data){
        if(data.retData==0){
          _this.$Toast({'message':data.retMsg,position:'bottom'})
        }else if(data.retData=='1'){
          _this.$refs.popup.hide()
          _this.doLogin(false)
        }
      })
    },
    hide(){
      this.$refs.popup.hide()
      this.$emit('hide')
    },
    showAgreement(type){
      const instance=this.$createAgreement({
        $props: {
          loading: true,
          type: type
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).show()
    },
    closeAgreementPopup(e){
      const instance=this.$createAgreement({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).hide();
      let className=e.target.className
      if(className=='base-btn refuse'){
        this.exitApp(0)
      }else{
        this.agree=true
        sessionStorage.setItem("agreement",true)
      }
      instance.remove();
    },
    exitApp(key) {
      var ua = navigator.userAgent.toLowerCase();
      let locale = this.$i18n._vm.locale
      if (/iphone|ipad|ipod/.test(ua)) {
      } else if (/android/.test(ua)) {
        try{
          if(object&&typeof(object.exitApp)=="function"){
            object.exitApp(key,locale)
          }else{}
        }catch(e){
          alert(e)
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
 .container
    color #000
    font-size:14px;
    background #ffffff
  .box
    margin 0 25px
    .imgBox
      margin 40px 0
      min-height :80px
      img
        width 90px
  .user
    width: 100%;
    margin: auto;
    margin-top:25px;
.user_name,.uesr_paw
	width: 100%
	border-bottom: 1px solid #DBDBDB
	box-sizing: border-box
	padding: 2pt 0 5pt
	display: flex
  // display: flex
  position:relative
  margin:20px 0
  line-height:22pt
.user_name .name_l1{
	width: 40pt
	height: 40px
  line-height :40px
	// padding-left:4pt
	box-sizing: border-box
}
.user_name .name_l1 i
  font-size:24px
  color:$color-icon
.user_name .name_l2{
  text-align:left
  padding-left:6px
	width: 360pt
  height: 40px
  line-height: 40px
}
.paw_l1{
  width: 40pt
	height: 100%
	// padding-left:4pt
	box-sizing: border-box
  position:relative
}
.paw_l1 i
  font-size:20px;
  color:$color-icon;
.paw_l2{
  text-align:left;
  padding-left:6px;
	width: 360pt;
}
.paw_l3{
  position absolute
  right 5px
}
.yzm_l3{
  border-left 1px solid #CCC
  padding-left:10px
  position absolute
  right 5px
  width 130px
  line-height: 16px;
  background $color-primary
  border-radius 4px
  color #fff
}
.disSmsBtn{
  background #ddd  
}
.zh{
  line-height: 34px;
}
.paw_l3 i
  font-size:20px;
.name_l2 input,.paw_l2 input{
	font-family: PingFangSC-Regular
	font-size: 14px
	color: #353535
	box-sizing: border-box
  width :100%
  height 100%
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
input::-webkit-input-placeholder {
	color: #999;
  font-size:14px;
  height 40px
  // line-height 40px
}
.forget{
  line-height:50px
  height 50px;
  font-size 14px
  text-align:right
  padding-right:9px;
  color:$color-link
}
.register{
  font-size:16px;
  text-align:center;
  // position:fixed;
  bottom:15px;
  left:0;
  right:0;
  color:#646464;
  margin-top:165px;
}
.prompt
  line-height 70px
  color #999
  span
    color $color-link
.poupBox
  background-color #fff
  width: 270px;
  padding: 0;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  background-color: #fff;
  border-bottom: 1px solid rgb(230, 230, 230)
  line-height 50px
  .title
    color: #333;
    font-size: 16px;
    line-height: 1;
    p
      margin: 20px 16px 0;
      overflow: hidden;
      white-space: nowrap;
  .content
    display flex
    margin 10px 0
    .yzmInput
      flex 2
      input
        height 100%
        width 85%
        font-size 18px
        // letter-spacing 2px
    .yzmImg
      flex 1.3
.btnBox
  display:flex;
  justify-content:space-around;
  line-height:50px;
  .poup-dialog-btn
      display: inline-block;
      width: 100%;
      padding: 17px 10px;
      margin: 0;
      font-size: 16px;
      line-height: 1;
      text-align: center;
      text-decoration: none;
      color: $color-link;
      background-color: #fff;
      background-clip: padding-box;
      box-sizing: border-box;
  a
    border:1px solid #ebebeb
  a:first-child
    border-right none
    color #999
.select-lang{
  float left
}
.smsBtn{
  
}
</style>
