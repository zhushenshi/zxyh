
<template>
  <div class="container">
      <MyHeader ref="header">运营商授权</MyHeader>
    <div class="scroll-list-wrap" :style="{height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="bg">
            <img src="./img/mobile_bg.jpg" alt="">
          </div>
          <div class="form">
              <div class="item" style="border:1px solid #cccccc;">
                <img src="./img/icon_yun_phone.png">
                <input type="text" placeholder="请输入手机号" v-model="form.tel" readonly>
              </div>
              <!-- <div class="item" style="border:1px solid #cccccc;">
                <img src="./img/icon_yun_password.png">
                <input type="text" v-model="form.servicePassword" placeholder="请输入服务密码">
              </div>
              <div class="item" style="border:1px solid #cccccc;">
                <img src="./img/icon_yun_yan.png">
                <input class="yzm" type="text" placeholder="验证码" v-model="form.smsCode">
                <span class="yzmBtn" @click="getYzm()">{{btnText}}</span>
              </div> -->
              <!-- 授权 -->
              <!-- <div class="wrapper"><div class="base-btn btn" @click="getAuthorization()">授权</div></div> -->
              <!-- 调用魔蝎 -->
              <div class="wrapper"><div class="base-btn btn" @click="getMoxieAuth()">授权</div></div>
          </div>
          <div class="message">
            <p>温馨提示</p><p>1、登录成功后将收到运营商通知短信，无需回复</p>
            <p>2、忘记服务密码? <span @click="showPopup">找回手机服务密码&gt;</span></p>
          </div>
        </div>
      </cube-scroll>
    </div>
    <cube-popup type="my-popup" v-model="visible">
      <div class="poup_title">
        <div class="title">找回服务密码<i class="iconfont icon-guanbi"  @click="showPopup()"></i></div>
        <cube-scroll ref="scroll" >
          <div class="m-poup">
            <div class="content">
              <p class="pTitle">1.移动找回：</p>
              <p>（1）发送MMCZ到10086；</p>
              <p>（2）登录网上营业厅,点击"忘记密码",凭手机号码和短信发送的动态密码二次登录后,进行密码重置；</p>
              <p>（3）本机登录掌上营业厅,进入"掌上客服"－密码重置；</p>
              <p>（4）拨打10086自助语音服务,进行密码重置。</p>
              <p class="pTitle">2.联通找回：</p>
              <p>（1）电脑登陆中国联通网上营业厅www.10010.com</p>
              <p>（2）发送短信“MMCZ#6位新密码”至10010重置服务密码。</p>
              <p>（3）注意：归属地不同可能会出现不同的情况，有些地区需要发送“MMXC#旧密码#新密码#新密码”至10010重置密码</p>
              <p class="pTitle">3.电信：</p>
              <p>固话、小灵通、手机用户本机拨打10001再按3获取。（星级手机用户拨打10001-1-3-2获取。</p>
              <div style="height:45px;"></div>
            </div>
          </div>
        </cube-scroll>
      </div>
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: 'CarrierOperator',
  data () {
    return {
      height:0,
      canClick:true,
      seconds:60,
      btnText:'获取验证码',
      visible:false,
      form:{
        tel:'',
        servicePassword:'',
        smsCode:''
      }    
    }
  },
  methods:{
    checkPhone(){
      if(!this.form.servicePassword){
        this.$Toast({message:'服务密码不能为空',position:'bottom'})
        return false
      }
      if(!/^\d{6}$/.test(this.form.servicePassword)){
        this.$Toast({message:'服务密码格式不正确',position:'bottom'})
        return false
      }
      if(!this.form.smsCode){
        this.$Toast({message:'短信验证码不能为空',position:'bottom'})
        return false
      }
      if(!/^\d{4,6}$/.test(this.form.smsCode)){
        this.$Toast({message:'短信验证码格式不正确',position:'bottom'})
        return false
      }
      return true
    },
    getAuthorization(){
      let This=this
      if(!This.checkPhone()){
        return
      }
      This.$ajax('post','/authorization/saveAuthorization',This.form,function(data){
        This.$router.go(-1)
        This.$parent.hasAuthorization=true
      })
    },
    getMoxieAuth(){
      let _this=this
      //测试代码
      // alert(device.MoxieAuth)
      // var option = ['carrier', 'userid', '15955133864', '朱星举', '620122198710100619', '#328df2'];
      // device.MoxieAuth(_this.moxieCarrierSuccess,_this.moxieCarrierFail,option);
      // return

      _this.$Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
      });
      _this.$ajax('post','/customer/getCustomerCardInfo','',function(data){
        if(data.retData){
          let custName=data.retData.custName//姓名，
          let cardNum=data.retData.cardNum//身份证号码
          var option = ['carrier', 'userid', _this.form.tel, custName, cardNum, '#328df2'];
          // var option = ['carrier', 'userid', tel, name, card, '#EE2652'];
          if(!_this.$IsIphone){//安卓
            try{
              if(device&&typeof(device.MoxieAuth)=="function"){
                device.MoxieAuth(_this.moxieCarrierSuccess,_this.moxieCarrierFail,option);
              }else{}
            }catch(e){
              alert(e)
            }
          }else{
            try{
              if(device&&typeof(device.MoxieAuth)=="function"){
                device.MoxieAuth(_this.moxieCarrierSuccess,_this.moxieCarrierFail,option);
              }else{}
            }catch(e){
              alert(e)
            }
          }
        }
      })
    },
    moxieCarrierSuccess(msg){
      this.$Indicator.close()//成功
    //      保存授权id
    // http://192.168.1012.23:8080/authorization/saveAuthorization
    //  * @param taskId 魔蝎Id
    //  * @param servicePassword 魔蝎暂无
    let This=this;
    if(typeof(msg) == "string"){
        msg = eval('('+msg+')');
    }
    if(!msg.taskId) {
        return;
    }
    let params={}
    params.taskId=msg.taskId
    params.servicePassword=''
    This.$ajax('post','/authorization/saveAuthorization',params,function(data){
      This.$router.go(-1)
      This.$parent.hasAuthorization=true
    })
    },
    moxieCarrierFail(msg){
      this.$Indicator.close()//失败
      This.$Toast({message:'授权失败,请重试!',position:'bottom'})
      // alert('moxieCarrierFail')
    },
    getYzm(){
      let This=this;
      if(!This.canClick){
        This.$Toast({
          message: '请'+This.seconds + 's重新获取',
          position:'bottom'
        })
        return
      }
      This.canClick = false
      This.btnText = This.seconds + 's重新获取'
      let start_time = new Date().getTime();//开始倒计时的时间毫秒数
      let timer = window.setInterval(() => {
      let end_time=new Date().getTime()
      let diff_time=((end_time-start_time)/1000).toFixed(0)//时间间隔
      // console.log(diff_time)
      //解决ios切换到主页面时倒计时暂停的bug
        This.seconds=60-diff_time
        // This.seconds--
        This.btnText = This.seconds + 's重新获取'
        if (This.seconds < 0) {
          window.clearInterval(timer)
          This.btnText = '获取验证码'
          This.seconds = 60
          This.canClick = true
        }
      }, 1000)
      // This.$ajax('post','/authorization/saveAuthorization',form,function(data){
      //   // console.log(data);
      //   This.$parent.taskId=data.retData.taskId
      //   This.$parent.nextStage=data.retData.nextStage
      //   // This.$Toast({
      //   //   message: data.retMsg,
      //   //   position:'bottom'
      //   // })
      // })
    },
    showPopup(){
      this.visible=this.visible?false:true
      // this.$refs.scroll.refresh()
      setTimeout(() => {
         this.$refs.scroll.refresh()
      }, 500)
    }
  },
  created(){
    this.form.tel=this.$store.state.tel
  },
  mounted (){
    this.height=(window.innerHeight-64)+'px'
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.container
  background-color #F6F6F6
  position absolute 
  bottom 0
  top 0
  left 0
  right 0
.scroll-list-wrap
  background #F6F6F6
  .box
    font-size 14px
   .bg
     img
      width 100%
   .form
     padding 30px 0
     border-radius: 8px;
     box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
     background-color #FFF
     margin -88px 25px 0
     position relative
    .item
      width:90%
      margin:0 auto 20px
      position:relative
      height:40px
      border:1px solid #cccccc
      border-radius: 5px
      text-align:left
      padding:0 0 0 35px
      box-sizing border-box
      img
        position:absolute
        top:10px
        left:6px
        width 20px
      input
        height:100%
        width:90%
      .yzm
        width 60%
      .yzmBtn
        position absolute
        right 0
        top 0
        line-height 40px
        margin auto
        font-size: 13px
        color: #ee2652
        padding: 0 15px
        width 75px
        overflow hidden
        white-space: nowrap;
        &:before 
          content: ""
          position: absolute
          left: 0
          top: 12px
          height: 40%
          width: 1px
          background: #9A9A9A
    .wrapper
      margin: 10px 30px 0px
      .btn
        border-radius: 140px;
    .message
      margin-top:40px
      color:#a7a7a7
      margin-left:15px
      font-size: 12px
      text-align:left
      line-height:20px
      span
        color:#FE8F60
.poup_title
  height:433px
  width:300px
  background-color:#FFF
  border-top-left-radius:10px
  border-top-right-radius:10px
  overflow hidden
  .title
    line-height 45px
    font-size 18px
    background-color $color-primary
    color #FFF
    text-align center
    position relative
    i
      position absolute
      right 15px
      font-size 25px
  .m-poup
    text-align left
    .content
      padding 15px
      font-size 10px
      .pTitle
        font-weight 700
        font-size 16px
        margin-bottom 20px
      p
        margin-bottom 10px
        line-height 22px
</style>
