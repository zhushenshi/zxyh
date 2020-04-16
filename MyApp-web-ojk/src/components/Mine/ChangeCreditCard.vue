<template>
  <div class="creditCard">
    <MyHeader ref="header">{{$t('lang.creditCardView.title')}}</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <div class="box">
        <!-- <div class="item">
          <div class="label"><span>{{$t('lang.creditCardView.type')}}</span></div>
          <div class="value"><input type="text" readonly  v-model="form.accountType"/></div>
        </div> -->
        <div class="item">
          <div :class="{label:true,'lineFeed':$i18n.locale=='in-ID'?true:false}"><span>{{$t('lang.creditCardView.name')}}</span></div>
          <div class="value"><input type="text" maxlength="25" :placeholder="$t('lang.creditCardView.name')" v-model="form.name"/></div>
        </div>
        <!-- <div class="item">
          <div class="label"><span>{{$t('lang.creditCardView.idCard')}}</span></div>
          <div class="value"><input type="text" readonly :placeholder="$t('lang.creditCardView.idCard')" v-model="form.idCardNo" maxlength="19"/> </div>
        </div> -->
      </div>
      <div class="bindTitle">{{$t('lang.creditCardView.title')}}</div>
      <div class="bindBox">
        <div class="item">
        <div class="label"><span>{{$t('lang.creditCardView.cardNo')}}</span></div>
        <div class="value"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" :placeholder="$t('lang.creditCardView.cardNo')" v-model="form.cardno" :maxlength="19"/></div>
      </div>
      <div class="item chooseBank" @click="chooseBank">
        <div class="label"><span>{{$t('lang.creditCardView.bank')}}</span></div>
        <div class="value">
          <!-- <textarea :placeholder="$t('lang.creditCardView.bank')" v-model="form.bankName" readonly class="chooseItem cardAddress" ></textarea> -->
          <input v-show="!form.bankName" :placeholder="$t('lang.creditCardView.bank')" v-model="form.bankName" readonly class="chooseItem cardAddress" />
          <div v-show="form.bankName" ref="inputWrapper" class="inputWrapper">
            <div style="white-space:nowrap;display:inline-block;">
              {{form.bankName}}
            </div>
          </div>
          <i class="iconfont icon-previewright"></i>
        </div>
      </div>
      </div>
      <div class="bindBox telBox" v-show="false">
        <div class="item">
          <div class="label"><span>{{$t('lang.creditCardView.tel')}}</span></div>
          <div class="value"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" :placeholder="$t('lang.creditCardView.tel')" maxlength="20" v-model="form.tel"/></div>
        </div>
        <!-- <div class="item">
          <div class="label"><span>{{$t('lang.creditCardView.code')}}</span></div>
          <div class="value"><input type="tel" :placeholder="$t('lang.creditCardView.code')" maxlength="6" v-model="form.smsCode"/> </div>
          <span :class="{code:true,disSmsBtn:!canClick}" @click="getYzm()">{{btnText}}</span>
        </div> -->
      </div>
      <div class="margin">
        <div class="base-btn" @click="openAccount()">Konfirmasi Pengajuan</div>
      </div>
    </div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script>
const asyncSelectedIndex = [0, 0]
const telReg = /^1[3456789]\d{9}$/
const bankReg = /^([1-9]{1})(\d{14,18})$/
const idCardReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
const nameReg = /^[\u4E00-\u9FA5]{2,15}$/
import Withdrawal from '../Common/Withdrawal.vue';
import Vue from 'vue'
import {createAPI} from 'cube-ui'
createAPI(Vue, Withdrawal, ['click'], true)
import BScroll from 'better-scroll'
export default {
  name: 'ChangeCreditCard',
  data () {
    return {
      height:0,
      btnText:this.$t('lang.resetPwdView.send'),
      seconds:60,
      canClick:true,
      isActive: '',
      banks:[],
      form: {
        accountType: '',
        bankBranchName: '',
        cardno:'',
        idCardNo:'',
        name:'',
        tel:'',
        address:'',
        bankName:'',
        bankCode:'',
        pid:'',
        city:'',
        cid:'',
        smsCode:'',
        mchntssn:'',//流水号
        transId: '',
        merUserId: '',
        checkedToken: '',
        IsOpenOrder: '',
        payCode: ''
      },
      canClick: true,
      id:'140000',
      loading: false,
      timer: null,
      productId: '',
      periodsId: '',
      Inputscroll:null
    }
  },
  created () {
    let _this=this;
    window.clearInterval(_this.timer)
    this.getOpenInfo()
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
    this.Inputscroll = new BScroll(this.$refs.inputWrapper, {
      scrollX:true,
      scrollY:false,
      click: true,
      bounce: false     
    })    
  },
  watch: {
    $route (to, from) {
      if(this.$route.params.bankName){
        this.form.bankName=this.$route.params.bankName
        this.form.bankCode=this.$route.params.bankCode
      }
      this.Inputscroll.refresh()
      this.$nextTick(()=>{
        this.Inputscroll.refresh()
      })        
    }
  },
  components: {
    Withdrawal
  },
  methods: {
    closePopup(){
      let _this=this;
      const instance=this.$createWithdrawal({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closePopup
        }
      }).hide();
      window.clearInterval(_this.timer)
      instance.remove()
      this.setOrderback()
    },
    setOrderback(){
      this.$ajax('post','/loanAgreement/orderback',{},function(msg){
        this.$router.push('/portal')
      }.bind(this))
    },
    /** 获取页面绑卡信息 **/
    getOpenInfo(){
      let _this=this
      this.$ajax('post','/payTreasure/getOpenAccount','',function(data){
        this.form.accountType=data.retData.payCodeName;
        this.form.payCode=data.retData.payCode;
        this.form.accountType=data.retData.payCodeName;
        // this.form.name=data.retData.person_name;
        this.form.idCardNo=data.retData.card;//身份证号
        this.form.IsOpenOrder=data.retData.IsOpenOrder;
        this.form.tel=data.retData.tel;
        this.banks=data.retData.bankNameList
      }.bind(this))
    },
    goToPage (path) {
      this.$router.push(path)
    },
    /**校验信息**/
    checkInfo (falg) {
      let form = this.form
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      // 姓名
      if (!form.name) {
        this.$Toast({ message: lang.regMsg.nameEmpty,position:'bottom' })
        return false
      }
      // 身份证号
      // if(!this.form.idCardNo) {
      //   this.$Toast({message: lang.regMsg.idCard,position:'bottom'})
      //   return false
      // } else if (!idCardReg.test(this.form.idCardNo)) {
      //   this.$Toast({message: lang.regMsg.idCardReg,position:'bottom'})
      //   return false
      // }
      // 银行卡号
      if (!form.cardno) {
        this.$Toast({ message: lang.regMsg.bankNo,position:'bottom'})
        return false
      }
      //  else if (!bankReg.test(this.form.cardno)) {
      //   this.$Toast({ message: lang.regMsg.bankNoReg,position:'bottom'})
      //   return false
      // }
      // 开户行
      if (!form.bankName) {
        this.$Toast({ message: lang.regMsg.bankName,position:'bottom' })
        return false
      }
      // 手机号
      // if (!form.tel) {
      //   this.$Toast({ message: lang.regMsg.telPlc,position:'bottom'})
      //   return false
      // } 
      // else if (!telReg.test(this.form.tel)) {
      //   this.$Toast({ message: lang.regMsg.telReg,position:'bottom'})
      //   return false
      // }
      // if(falg){
      //   // 短信验证码
      //   if (!form.smsCode) {
      //     this.$Toast({ message: lang.regMsg.codePlc,position:'bottom'})
      //     return false
      //   }
      // }
      return true
    },
    /**获取手机验证码**/
    getYzm(){
      if (!this.canClick) {
        return
      }
      document.activeElement.blur()
      if (!this.checkInfo(false)) {
        return
      }
      this.firstMethod()
    },
    firstMethod (name,idNo,cardNo,accountBankName,bankCode,tel) {
      let form=this.form;
      let This=this;
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/payTreasure/bindingCard',
        {
          name:form.name,
          idNo:form.idCardNo,
          cardNo:form.cardno,
          bankName:form.bankName,
          bankCode:form.bankCode,
          tel:form.tel,
          payCode:form.payCode
        },
        function (msg) {
          let data=msg.retData;
          if(data.flag){
            this.$Toast({message: lang.comm.hair,position:'bottom'})
            this.canClick = false
            this.btnText = this.seconds + 's'+This.$t('lang.comm.re')
            let start_time = new Date().getTime();//开始倒计时的时间毫秒数
            this.timer = window.setInterval(() => {
              let end_time=new Date().getTime()
              let diff_time=((end_time-start_time)/1000).toFixed(0)//时间间隔
              // console.log(diff_time)
              //解决ios切换到主页面时倒计时暂停的bug
                This.seconds=60-diff_time
              // This.seconds--
              This.btnText = This.seconds + 's'+This.$t('lang.comm.re')
              if (This.seconds <= 0) {
                window.clearInterval(This.timer)
                This.btnText = This.$t('lang.resetPwdView.send')
                This.seconds = 60
                This.canClick = true
              }
            }, 1000)
            this.form.transId=data.transId   
            this.form.merUserId=data.merUserId
            this.form.checkedToken=data.checkedToken
          }else{
            this.$createDialog({type: 'alert',
              content: data.msg,
              confirmBtn:{
                text: lang.comm.confirm
              },
              onConfirm: () => {}
            }).show()
          }
        }.bind(this))
    },
    //开户
    openAccount () {
      if (!this.checkInfo(true)) {
        return
      }
      let _this = this
      let form=this.form;
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/payTreasure/bindingCardConfirm',{
        name:form.name,
        idNo:form.idCardNo,
        cardNo:form.cardno,
        bankName:form.bankName,
        bankCode:form.bankCode,
        tel:form.tel,
        smsCode:form.smsCode,
        transId:form.transId,
        merUserId:form.merUserId,
        payCode: form.payCode,
        checkedToken: form.checkedToken,
        kind: 0 // 0 银行卡支付开通账户 1  信用支付开通账户
      },function(msg){
        let data=msg.retData;
        if(data.flag){
          this.$createToast({
            type: 'correct',
            time: 1000,
            txt: 'Data diterima',
            onTimeout: () => {
              let from=_this.$route.params.from;
              if(from=='face' || from=='home'){
                _this.showWithdrawal()
              }else if(from=='creditCard'){
                window.clearInterval(_this.timer)
                _this.$router.push('/creditCard')
              }else{
                _this.showWithdrawal()
              }
            }
          }).show()
        }else{
          this.$createDialog({type: 'alert',
            content: data.msg,
            confirmBtn:{
              text: lang.comm.confirm
            },
            onConfirm: () => {}
          }).show()
        }
      }.bind(this))
    },
    /** 显示弹框 **/
    showWithdrawal: function () {
      this.productId=this.$store.state.product_id
      this.periodsId=this.$store.state.periods_id
      let _this=this
      this.$createWithdrawal({
        $props: {
          loading: true,
          productId: _this.productId,
          periodsId: _this.periodsId
        },
        $events:{
          closePopup: this.closePopup
        }
      }).show()
    },
    //获取银行信息
    chooseBank(){
      // let _this=this;
      // if (!this.picker) {
      //   this.picker = this.$createPicker({
      //     title: '',
      //     data: [this.banks],
      //     cancelTxt: _this.$t('lang.comm.cancel'),
      //     confirmTxt: _this.$t('lang.comm.confirm'),
      //     onSelect: this.selectHandle,
      //     onCancel: this.cancelHandle
      //   })
      // }
      // this.picker.show()
      let from=this.$route.params.from
      this.$router.push({name:'BankList',params:{from:from}})    
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.form.bankName=selectedText[0]
      this.form.bankCode=selectedVal[0]
    },
    cancelHandle() {}
  }
}
</script>
<style scoped lang="stylus">
@import "~common/stylus/variable"
.scroll-list-wrap
  position absolute
  bottom 0
  left 0
  right 0
  top 0
  background #F4F4F4
  transition all 0.4s ease
  -webkit-transition all .4s ease
  -moz-transition all .4s ease
  .box
    background #ffffff
    font-size 14px
    text-align left
    color #000000
    margin-top 10px
    .item
      border-bottom 1px solid #F5F5F5
      display flex
      height 45px
      line-height 45px
      .cube-input
        height 100%
        width 86%
        position initial
      .label
        flex 2
        padding-left 15px
      .lineFeed{
        line-height: 20px;
        margin-top: 4px;
      }
      .value
        flex 4
        padding-right 15px
        input 
          text-align right 
          height 85%
          width 100%
.bindBox
    background #ffffff
    font-size 14px
    text-align left
    color #000000
    .item
      height:45px
      line-height 45px
      border-bottom 1px solid #F5F5F5
      display flex
      .label
        flex 2
        width 33.33333333%
        padding-left 15px
      .value
        flex 4
        width 66.666666666%
        input
          width 100%
          height 85%
.chooseBank
  position relative
  .iconfont
    font-size 20px
    position absolute
    right 10px
    top 0
  .inputWrapper
    height:100%;
    overflow:hidden;
    margin-right:30px;
.bindTitle
  text-align left 
  font-size 14px
  padding 15px
.telBox
  margin-top 10px
  .code
    position absolute
    right 15px
.chooseItem
  color #333
  width 100%
  height 100%
  resize:none
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
.move-enter-active,
.move-leave-active,
.move-enter-active,
.move-leave-active {
  transition: 0.4s ease;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000; 
}
.move-enter {
  opacity: 1;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
}
.move-active {
  opacity: 1;
  transform: translateY(-100%);
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
}
.move-leave-active {
  opacity: 1;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
}
</style>
