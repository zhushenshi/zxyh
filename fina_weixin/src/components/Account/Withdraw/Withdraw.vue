//提现
<template>
  <div class="recharge">
    <MyHeader :title="'提现'" v-if="!isWeixin"></MyHeader>
    <div class="content borderTop">
      <p class="title">提现金额(元)</p>
      <p class="value"><span class="icon-rmb"></span><input type="number" maxlength="6" placeholder="请输入提现金额" @keyup="checkBalance" v-model="balance"></p>
      <p class="accountBalance">账户余额<span class="accountBalanceVal">{{accountBalance}}</span>元</p>
    </div>
    <div class="holdbank" @click="lookHoldBanks">查看支持的银行及限额</div>
    <div class="btn" :class="disableBtn" @click="toWithdraw">确认提现</div>
    <div class="tips">
      <p><span class="icon-tips"></span>温馨提示</p>
      <p>1、提现资金2小时内到账；</p>
      <p>2、提现当日单笔限额5万元，当天累积提现额度50万元；</p>
      <p>3、提现资金默认到新浪支付电子账户开户时绑定的银行卡中。</p>
    </div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
export default {
  data() {
    return {
      accountBalance: '0.00',
      balance: '',
      disableBtn:'true'
    }
  },
  components: {

  },
  created () {
    let _this = this;
    //this.accountBalance=this.$route.params.balance;
    this.$ajax('get',baseURL +'/account','',function(data){
      _this.accountBalance=data.balance?data.balance:'0.00';
    })
  },
  methods:{
     //查看支持银行卡
    lookHoldBanks() {
      this.$router.push(this.$router.history.current.path+'/holdBanks')
    },
    toWithdraw () {
      if(this.disableBtn === 'true') {
        return;
      }
      let Self=this;
      let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
      if(!this.balance){
        this.$Toast({message: '请正确输入提现金额',position: 'bottom'});
        return;
      }else if(!numReg.test(this.balance)){
        this.$Toast({message: '请正确输入提现金额(最多两位小数)',position: 'bottom'});
        return;
      }else if(Number(this.balance) > Number(this.accountBalance)){
        this.$Toast({message: '账户余额不足',position: 'bottom'});
        return;
      }
      this.$ajax('post',baseURL + '/account/withdraw?amount='+parseFloat(this.balance),'',function(data){
        // window.Vue.$sina=data.redirection;
        // Self.$router.push(Self.$router.history.current.path+'/sina');
        // window.location=data.redirection
        if(data.status === '200'){
          Self.$router.go(-1)
          Self.$Toast({message:data.msg,position:'bottom'})          
        }
      })
    },
    checkBalance () {
      if(this.balance.length > 0) {
        this.disableBtn = 'false';
      }else {
        this.disableBtn = 'true';
      }
      if(this.balance.length>=11){
        this.balance=this.balance.substring(0,11);
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.recharge
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .content
    height 150px
    background #ffffff
    text-align left 
    .title
      padding 0 20px
      height 55px
      line-height 55px
      font-size 15px
      color #3d3d3d
      letter-spacing 1.37px
      font-weight bold
    .value
      padding 15px 20px
      .icon-rmb
        position relative
        top 6px
        margin-right 5px
        font-size 22px
        color #3D3D3D
      input 
        width 180px
        font-size 22px
        letter-spacing 1.32px
        font-weight 500
        color #3d3d3d
        &::input-placeholde
          color #dddddd
    .accountBalance
      padding 0 20px
      height 42px
      line-height 42px
      border-top 1px solid #f4f4f4    
      font-size 14px
      color #3f3f3f
      .accountBalanceVal
        color #fa7009
  .holdbank
    height 32px
    line-height 32px
    text-align right 
    padding 0 20px
    font-size 13px
    color #fa7009
    letter-spacing 1.17px        
  .btn
    height 44px
    line-height 44px
    margin 35px 20px
    text-align center 
    background #ffc990
    border-radius 5px
    color #ffffff
    font-size 18px    
    &.true
      background #ffc990
    &.false
      background #FA7009  
  .tips
    padding 0 20px
    text-align left 
    color #5b5b5b
    font-size 11px
    p
      line-height 22px
      .icon-tips
        margin-right 5px
        color #fa7009
        font-size 16px
</style>
