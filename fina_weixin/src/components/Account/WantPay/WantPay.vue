<template>
  <div class="wantPay">
    <div class="titleBar">
      <span class="icon-back"></span>
      <span class="title-text">我要还款</span>
    </div>
    <div class="content">
      <p class="title">还款金额(元)</p>
      <p class="value"><span class="icon-rmb"></span><input type="number" placeholder="请输入提现金额" maxlength="10" v-model="balance"></p>
      <p class="accountBalance">账户余额<span class="accountBalanceVal">{{accountBalance}}</span>元</p>
    </div>
    <div class="btn" @click="goRepay">确认还款</div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {baseURL} from '@/vuex/url'
export default {
  data() {
    return {
      balance: '',
      accountBalance: '0.00',
      planId: ''
    }
  },
  created() {
    this.accountBalance=this.$parent.$parent.$parent.$data.balanceToWithdraw;
    this.planId = this.$route.params.planId;
  },
  methods: {
    goRepay() {
      let _this=this;
      let numReg=/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
      if(!_this.balance){
        _this.$Toast({message: '请输入还款金额',position: 'bottom'});
        return;
      }else if(!numReg.test(_this.balance)){
        _this.$Toast({message: '输入的金额格式不正确',position: 'bottom'});
        return;
      }
      this.$ajax('post',baseURL + '/account/repaynow?paycontrolId='+_this.planId,'',function(data){
        window.Vue.$sina=data.redirection;
        _this.$router.push(_this.$router.history.current.path+'/sina');
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.wantPay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .titleBar
    padding 0 10px
    height 44px
    line-height 44px
    background #ffffff
    border-bottom 1px solid #f2f2f2
    text-align center 
    .icon-back
      position absolute
      left 10px
      padding 13px 10px 10px 10px
      font-size 20px
    .title-text
      font-size 17px
      font-weight 500
      color #000 
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
    .value
      padding 15px 20px
      .icon-rmb
        margin-right 5px
        vertical-align middle
        font-size 22px
        color #3D3D3D
      input 
        font-size 22px
        letter-spacing 1.32px
        font-weight 500
        color #fa7009
        &::-webkit-input-placeholder
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
  .btn
    height 44px
    line-height 44px
    margin 35px 20px
    text-align center 
    background #ffc990
    border-radius 5px
    color #ffffff
    font-size 18px      
</style>
