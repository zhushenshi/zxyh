<template>
  <div class="container">
    <MyHeader  ref="header">{{$t('lang.loginView.register')}}</MyHeader>
    <div class="box">
      <div class="imgBox">
        <img :src="logoSrc" alt="">
      </div>
      <div class="user">
        <ul class="user_name" style="border-bottom: 1px solid #DBDBDB;">
          <li class="name_l1">
            <i class="iconfont icon-shouji"></i>
          </li>
          <li class="name_l2">
            <input type="tel" v-model="userInfo.userTel" :placeholder="$t('lang.regMsg.telPlc')" maxlength="20"/>
          </li>				
        </ul>			
        <ul class="uesr_paw" style="border-bottom: 1px solid #DBDBDB;">
          <li class="paw_l1">
            <i class="iconfont icon-suo"></i>
          </li>
          <li class="paw_l2">
            <input  :type="type" v-model="userInfo.userPwd" :placeholder="$t('lang.regMsg.pwdPlc')"   maxlength="16"/>
          </li>
          <li class="paw_l3">
            <i class="iconfont" :class="{'icon-yanjing':type==='text','icon-eye':type==='password'}" @click="showPassword()"></i>
          </li>
        </ul>
        <ul class="uesr_paw" style="border-bottom: 1px solid #DBDBDB;">
          <li class="paw_l1">
            <i class="iconfont icon-jiugongge-copy"></i>
          </li>
          <li class="yzm_l2">
            <input type="text" :placeholder="$t('lang.regMsg.codePlc')"   maxlength="6" v-model="userInfo.yzm"/>
          </li>
          <li  :class="{'yzm_l3':true,'zh':$i18n.locale=='zh-CN'||$i18n.locale=='en-US'?true:false}" style="border-left: 1px solid #CCC;">
            <span @click="getYzm()" :class="{disSmsBtn:!canClick}">{{btnText}}</span>
          </li>
        </ul>
        <!-- <div class="protocol"><i class="iconfont icon-yiyuedu" :class="{'selected':agree}" @click="agreement()"></i><span @click="agreement()" style="color:#9e9e9e;">&nbsp;&nbsp;{{$t('lang.loginView.read')}}</span><span v-if="false" @click="goPages('/register/protocol')">《{{$t('lang.loginView.registrationAgreement')}}》</span><span v-if="false" @click="goPages('/register/protocolUser')">《{{$t('lang.loginView.loginProtocol')}}》</span></div> -->
        <div :class="{'base-btn':true,'base-btn-dis':!agree}" @click='agree&&register()'>{{$t('lang.loginView.register')}}</div>
        <div class="prompt">{{$t('lang.loginView.haveAccount')}}<span @click="goPages('/login')"> {{$t('lang.loginView.login')}}</span></div>
      </div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
const telReg = /^[0-9]*$/
const pwdReg = /^[0-9A-Za-z]{6,16}$/
export default {
  name: 'Register',
  data () {
    return {
      userInfo:{
        userTel:'',
        userPwd:'',
        yzm:''
      },
      iconEye:'icon-yanjing',
      type:'password',
      btnText:this.$t('lang.resetPwdView.send'),
      canClick:true,
      seconds:60,
      agree:true,
      logoSrc: require('./img/logo_default.png'),
      timer:null
    }
  },
  created(){
    window.clearInterval(this.timer)
    this.getLogoDefaultInfo()
  },
  methods:{
    getLogoDefaultInfo(){
      let _this=this;
      _this.$ajax('post','/getAppSetting',{},function(data){
        var data = data.retData;
        if(data.appSetting){
          _this.logoSrc=data.appSetting.logo144?data.appSetting.logo144:require('./img/logo_default.png');// logo
        }
      },"",true)
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
    checkPhone(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      if(!this.userInfo.userTel){
        this.$Toast({message:this.$t('lang.regMsg.telPlc'),position:'bottom'})
        return false
      }else{
        if(this.userInfo.userTel.length>2){
          let kt=this.userInfo.userTel.substr(0,2);
          if(kt!='08'){
            this.$Toast({message:lang.ojk.telKt,position:'bottom'})
            return false
          }
        }else{
          this.$Toast({message:lang.ojk.telKt,position:'bottom'})
          return false
        }
      }
      if(!telReg.test(this.userInfo.userTel)){
        this.$Toast({message:this.$t('lang.regMsg.telReg'),position:'bottom'})
        return false
      }
      return true
    },
    checkInfo(){
      if(!this.checkPhone()){
        return false
      }
      if(!this.userInfo.userPwd){
        this.$Toast({message:this.$t('lang.regMsg.pwdPlc'),position:'bottom'})
        return false
      }
      if(!pwdReg.test(this.userInfo.userPwd)){
        this.$Toast({message:this.$t('lang.regMsg.pwdReg'),position:'bottom'})
        return false
      }
      if(!this.userInfo.yzm){
        this.$Toast({message:this.$t('lang.regMsg.codePlc'),position:'bottom'})
        return false
      }
      if(!/^\d{6}$/.test(this.userInfo.yzm)){
        this.$Toast({message:this.$t('lang.regMsg.codeReg'),position:'bottom'})
        return false
      }
      // if(!this.agree){
      //   this.$Toast({message:'请阅读并同意协议',position:'bottom'})
      //   return false
      // }
      return true
    },
    getYzm(){
      let This=this;
      if (!This.canClick) {
        return
      }
      if(!This.canClick){
        This.$Toast({
          message: This.seconds + 's'+this.$t('lang.comm.re'),
          position:'bottom'
        })
        return
      }else{
        if(!This.checkPhone()){
          return
        }
      }
        This.$ajax('post','/reg/getSmsCode',
        {phone:this.userInfo.userTel,type:'reg'},function(data){
          // console.log(data);
          // This.$parent.taskId=data.retData.taskId
          // This.$parent.nextStage=data.retData.nextStage
          
          This.$Toast({
            message: data.retMsg,
            position:'bottom'
          })
          if(data.retData.flag=='1'){
            return
          }
          This.canClick = false
          This.seconds=parseInt(60)
          This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
          let start_time = new Date().getTime();//开始倒计时的时间毫秒数
          This.timer = window.setInterval(() => {
            let end_time=new Date().getTime()
            let diff_time=((end_time-start_time)/1000).toFixed(0)//时间间隔
            // console.log(diff_time)
            //解决ios切换到主页面时倒计时暂停的bug
            This.seconds=parseInt(60)-diff_time
            // This.seconds--
            This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
            if (This.seconds < 1) {
              window.clearInterval(This.timer)
              This.btnText = This.$t('lang.resetPwdView.send')
              This.seconds = 60
              This.canClick = true
            }
          }, 1000)
        })
    },
    agreement(){
      this.agree=this.agree?false:true
    },
    register(){
      let This=this
      if(!This.checkInfo()){
        return
      }
      let deviceId = localStorage['deviceId']?localStorage['deviceId']:'';
      let channelCode = localStorage['channelName']?localStorage['channelName']:'';      
      This.$ajax('post','/reg/register',{
        phone:This.userInfo.userTel,
        password:This.userInfo.userPwd,
        smsCode:This.userInfo.yzm,
        channelCode:channelCode,
        deviceCode:deviceId,        
      },function(data){
        This.$Toast({
          message: data.retMsg,
          position:'bottom'
        })
        var ua = navigator.userAgent.toLowerCase();
        try{
          if (/iphone|ipad|ipod/.test(ua)) {
            window.webkit.messageHandlers.registerSuccess.postMessage(['1']);
          }else if(/android/.test(ua)){
            object.registerSuccess()
          }
        }catch(e){
          console.warn(e)
        }        
        localStorage.setItem('phone',This.userInfo.userTel)
        setTimeout(() => {
          window.clearInterval(This.timer)
          This.$router.replace('/login')
        }, 1000)
      })
    },
    getCompanyCode(){
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
    },     
  },
  components:{
  },
  mounted(){
    let _this=this
    /**
     * 设备信息结果返回
     * */
    window['companyCodeCallback'] = (msg) => {
      var arr=[]
      arr=msg?msg.split(','):''
      arr[0]?localStorage.setItem('companyCode',arr[0]):localStorage.setItem('companyCode','')
      arr[1]?localStorage.setItem('deviceId',arr[1]):localStorage.setItem('deviceId','')
      arr[2]?localStorage.setItem('channelName',arr[2]):localStorage.setItem('channelName','')
    }
    process.env.NODE_ENV=='production'?this.getCompanyCode():''
    //object.companyCodeInfo()
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
    padding 0 30px
    background #ffffff
    .imgBox
      margin 40px 0
      img
        width 90px
  .user
    width: 100%;
    margin: auto;
    margin-top:25px;
.user_name,.uesr_paw
	width: 100%
	height: 40px
	border-bottom: 1px solid #DBDBDB
	box-sizing: border-box
	padding: 0pt 0 1pt 0
	display: -webkit-flex
  // display: flex;
  position:relative
  margin:20px 0
  line-height:40px  
.user_name .name_l1
	height: 100%
	box-sizing: border-box
.name_l1
  padding-left 4pt
.user_name .name_l1 i
  font-size:20px
  color:$color-home
.user_name .name_l2{
  text-align:left
  padding-left:12px
	width: 360pt
}
.paw_l1{
  // width: 40pt
	height: 100%
	padding-left:4pt
	box-sizing: border-box
  position:relative
}
.paw_l1 i
  font-size:20px;
  color:$color-home;
.paw_l2{
  text-align:left;
  padding-left:12px;
	width: 360pt;
}
.paw_l3{
  position absolute 
  right 5px
}
.yzm_l2{
  text-align:left;
  padding-left:12px;
	width: 80pt;
}
.yzm_l2 input
  height 95%
.yzm_l3{
  border-left 1px solid #CCC
  padding-left:10px
  position absolute 
  right 5px
  width 100px
  line-height: 16px;
}
.zh{
  line-height: 34px
}
.paw_l3 i
  font-size:20px;
.name_l2 input,.paw_l2 input{
	font-family: PingFangSC-Regular
	font-size: 14px
	color: #353535
	letter-spacing: 1.63px
	box-sizing: border-box
  height 95%
  width:100%;
  }
input::-webkit-input-placeholder {
	color: #999;
  font-size:14px;
  // height 40px
  // line-height 40px
}
.protocol{
  line-height:20px 
  font-size 12px
  text-align:left
  padding-left:3px;
  color #9e9e9e
  margin:10px 0
}
.protocol i{
  font-size:18px;
  position:relative;
  bottom:-2px
}
.protocol .selected{
  color $color-home
}
.protocol span{
  color:#000
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
.base-btn-dis
  background #ddd
</style>
