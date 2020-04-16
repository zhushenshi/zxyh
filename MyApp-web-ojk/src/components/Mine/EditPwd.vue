
<template>
  <div class="container">
      <MyHeader ref="header">{{$t('lang.settingView.pwd')}}</MyHeader>
       <div class="scroll-list-wrap" :style="{top:height}">
          <cube-scroll ref="scroll" >
      <ul class="editPwd">
        <li>
          <div class="lable">{{$t('lang.changePwdview.oldPwd')}}</div>
          <div class="pwd"><input type="password" v-model="formJson.oldPassword" maxlength="16" :placeholder="$t('lang.changePwdview.oldPic')"></div>
        </li>
         <li>
          <div class="lable">{{$t('lang.changePwdview.newPwd')}}</div>
          <div class="pwd"><input type="password" v-model="formJson.newPwd" maxlength="16" :placeholder="$t('lang.changePwdview.newpic')"></div>
        </li>
         <li>
          <div class="lable">{{$t('lang.changePwdview.againPwd')}}</div>
          <div class="pwd"><input type="password" v-model="formJson.password" maxlength="16" :placeholder="$t('lang.changePwdview.again')"></div>
        </li>
      </ul>
      <div class="margin">
        <div class="base-btn" @click="saveInfo">{{$t('lang.comm.confirm')}}</div>
      </div>
       </cube-scroll>
        </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data () {
    return {
      height:0,
      formJson:{
        oldPassword:'',
        newPwd:'',
        password:''
        }
    }
  },
  methods:{
     saveInfo () {
        document.activeElement.blur();
        if(this.checkInfo()){
          this.submitInfo()
        }
     },
        //表单提交
      checkInfo(){
         let locale = this.$i18n._vm.locale
         let lang=this.$i18n._vm.messages[locale].lang
        let checkPwd = /^[0-9A-Za-z]{6,20}$/
       // let checkPwd = /^\w{6,16}$/
        let formData = this.formJson
        if(!formData.oldPassword){
          this.$Toast({
            message: lang.changePwdview.oldTip,
            position:'bottom'
          })
          return false
        }
        else if(!checkPwd.test(formData.oldPassword)){
          this.$Toast({
            message: lang.changePwdview.errPwd,
            position: 'middle'
          })
          return false
        }
        if(!formData.newPwd){
          this.$Toast({
            message: lang.changePwdview.newTip,
            position:'bottom'
          })
          return false
        }else if(!checkPwd.test(formData.newPwd)){
          this.$Toast({
            message: lang.changePwdview.errNewTip,
            position:'bottom'
          })
          return false
        }
            if(formData.oldPassword == formData.newPwd){
                 this.$Toast({
                   message: lang.changePwdview.sameError,
                    position:'bottom'
              })
             return false
        }
         if(!formData.password){
          this.$Toast({
            message: lang.changePwdview.errNeConfirmPwd,
            position:'bottom'
          })
          return false
        }else if(formData.password!=formData.newPwd){
          this.$Toast({
            message: lang.changePwdview.noSame,
            position:'bottom'
          })
          return false
        }
        return true
      },
      submitInfo () {
        let me=this
        this.$ajax('post','/editPw/set',{oldPassword:me.formJson.oldPassword,newPassword:me.formJson.password},function(data){
        
          me.$Toast({
            message: data.retMsg,
            position:'bottom'
          })
          setTimeout(() => {
            me.$router.push('/setting')
          }, 1000);
        })
      } 
    
  },
  mounted(){
      this.height=(this.$Header)/37.5+'rem'
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  background #F6F6F6
.editPwd
  font-size 14px
  li
    width 100%
    border-bottom: 1px solid rgb(230, 230, 230)
    line-height 50px
    display flex
    background #ffffff
    .lable
      width 25%
      padding-left 10px
      text-align left
      line-height: 16px;
      margin-top: 16px;
      color #333
    .pwd
      width 75%
    .yzm
      width 40%
    .yzmBtn
      width 30%
      .btn
        background #E6E1FF
        width 80px
        letter-spacing 3px
        border-radius 3px
        height 36px
        line-height 36px
        font-size 16px
        font-weight 500
        margin 10px auto 0
    input 
      width 100%
      height 95%
      padding-left 4px
      font-size 12px
      input::-webkit-input-placeholder
        color: #999;
        font-size:12px;
.margin
  margin 30px
</style>
