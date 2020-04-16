
<template>
  <div class="container">
      <MyHeader ref="header">{{$t('lang.resetPwdView.title')}}</MyHeader>
      <ul class="retset">
        <li style="border-bottom: 1px solid rgb(230, 230, 230)">
          <div class="lable">{{$t('lang.resetPwdView.tel')}}</div>
          <div class="tel"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="form.phone" class="formItems" maxlength="20" :placeholder="$t('lang.regMsg.telPlc')"></div>
        </li>
        <li style="border-bottom: 1px solid rgb(230, 230, 230)">
          <div class="lable">{{$t('lang.resetPwdView.newPwd')}}</div>
          <div class="tel"><input type="password" v-model="form.password" :clearable=true class="formItems" maxlength="16" :placeholder="$t('lang.regMsg.pwdPlc')"></div>
        </li>
        <li style="border-bottom: 1px solid rgb(230, 230, 230)">
          <div class="lable">{{$t('lang.resetPwdView.picYzm')}}</div>
          <div class="yzm"><input type="text" :placeholder="$t('lang.regMsg.pngPlc')"  v-model="form.imgCode" maxlength="4"></div>
          <div class="yzmBtn">
          <verity-code ref="verityCode"></verity-code>
          </div>
        </li>
        <li style="border-bottom: 1px solid rgb(230, 230, 230)">
          <div class="lable">{{$t('lang.resetPwdView.codeYzm')}}</div>
          <div class="telYzm"><input type="tel" :placeholder="$t('lang.regMsg.codePlc')" maxlength="6" v-model="form.code"></div>
          <div class="telYzmBtn"><div  :class="{btn:true,disSmsBtn:!canClick}" @click="getYzm()">{{btnText}}</div></div>
        </li>
      </ul>
      <div class="margin">
        <div class="base-btn" @click="login()">{{$t('lang.comm.confirm')}}</div>
      </div>
  </div>
</template>

<script>
import VerityCode from '@/components/Common/VerityCode'
const telReg = /^[0-9]*$/
let checkPwd = /^[0-9A-Za-z]{6,16}$/
export default {
  name: 'ResetPwd',
  data () {
    return {
      height:0,
      form: {
        phone: '',
        code: '',
        password:'',
        imgCode:''
      },
      btnText:this.$t('lang.resetPwdView.send'),
      seconds:60,
      canClick:true,
      timer:null
    }
  },
  beforeRouteLeave(to, from, next) {
    let This=this;
    window.clearInterval(This.timer)
    next();
  },
  methods:{
    getYzm(){
      let This=this;
      if(!this.canClick){
        return
      }
      if(!this.checkInfo(false)){
        return
      }
      this.$ajax('post','/forget/getSmsCode',{phone:This.form.phone},function(data){
        This.canClick = false
        This.seconds=parseInt(60)
        This.$Toast({
          message: data.retMsg,
          position:'bottom'
        })
        This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
          let start_time = new Date().getTime();//开始倒计时的时间毫秒数
          This.timer = window.setInterval(() => {
            let end_time=new Date().getTime()
            let diff_time=((end_time-start_time)/1000).toFixed(0)//时间间隔
            //解决ios切换到主页面时倒计时暂停的bug
            // This.seconds=parseInt(data.retData)-diff_time
            This.seconds=parseInt(60)-diff_time
            // This.seconds--
            This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
            if (This.seconds < 0) {
              window.clearInterval(This.timer)
              This.btnText = This.$t('lang.resetPwdView.send')
              This.seconds = 60
              This.canClick = true
            }
          }, 1000)
      })
    },
    // 校验
    checkInfo (flag) {
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      let form = this.form
      let verityCode = this.$refs.verityCode.verifyArray.map(v => v.value).join('')
      if (!this.form.phone) {
        this.$Toast({ message: lang.regMsg.telPlc,position:'bottom', })
        return false
      } else{
        if(this.form.phone.length>2){
          let kt=this.form.phone.substr(0,2);
          if(kt!='08'){
            this.$Toast({message:lang.ojk.telKt,position:'bottom'})
            return false
          }
        }else{
          this.$Toast({message:lang.ojk.telKt,position:'bottom'})
          return false
        }
      }
      if(!telReg.test(this.form.phone)){
        this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
        return false
      }

      if(!form.password){
        this.$Toast({
          message: lang.regMsg.pwdPlc,
          position:'bottom',
        })
        return false
      }
      
      if (!form.imgCode) {
        this.$Toast({ message: lang.regMsg.pngPlc,position:'bottom',})
        return false
      } else if((form.imgCode).toLowerCase() != verityCode) {
        this.$Toast({ message: lang.regMsg.pngCode,position:'bottom', })
        return false
      }
      if(flag){
        if(!form.code){
          this.$Toast({
            message: lang.regMsg.codePlc,
            position:'bottom'
          })
          return false
        }
      }
      return true
    },
    // 下一步
    login () {
      document.activeElement.blur()
      if (this.checkInfo(true)) {
        this.checkCode()
        // this.doNext()
      }
    },
    // 提交
    doNext () {
      let me=this
      this.$ajax('post','/forget/forgetpwd',{
        password:me.form.password,
        smsCode :me.form.code,
        phone:me.form.phone,
        registration_id:''
      },function(data){
        if(data.retCode=='SUCCESS'){
          me.$Toast({
            message: data.retMsg,
            position:'bottom'
          })
          window.clearInterval(me.timer)
          me.$router.push('/login')
        }else if(data.retData==null){
          me.$Toast({
          message: data.retMsg,
          position:'bottom'
        })}else{
          me.$Toast({
            message: data.retData.msg,
            position:'bottom'
          })
        }
      })
    },
    checkCode(){//检验短信
      let me=this
      this.$ajax('post','/forget/check',{
        smsCode :me.form.code,
        phone:me.form.phone
      },function(data){
        me.doNext()
      })
    }
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
    this.$refs.verityCode.refresh()
  },
  components:{
    VerityCode
  }
}
</script>

<style lang="stylus" scoped>
.retset
  font-size 14px
  background #ffffff
  li
    width 100%
    border-bottom: 1px solid rgb(230, 230, 230)
    line-height 50px
    display flex
    .lable
      width 30%
      padding-left 17px
      text-align left
      line-height: 16px;
      margin-top: 16px;
    .tel
      width 70%
    .yzm
      width 40%
    .yzmBtn
      position relative
      width 30%
      .btn
        background #E6E1FF
        width 80px
        letter-spacing 3px
        border-radius 3px
        height 36px
        line-height 16px
        font-size 16px
        font-weight 500
        margin 10px auto 0
    .telYzm
      width 36%
    .telYzmBtn
      width 34%
      .btn
        background rgb(244, 244, 244)
        color #333
        width 105px
        letter-spacing 1px
        font-size 14px
        border-radius 3px
        height 32px
        line-height 16px
        margin 10px auto 0
    input 
      width 100%
      height 98%
      input::-webkit-input-placeholder
        color: #999;
        font-size:15px;
.margin
  margin 30px
.verityCode
  position: absolute;
  top: 8px;
  right: 15px;
  width: 90px;
  height: 35px;
  background: #E4E0FA;
</style>
