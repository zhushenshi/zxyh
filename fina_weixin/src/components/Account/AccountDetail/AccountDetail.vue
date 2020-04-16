<template>
  <div class="AccountDetail">
    <MyHeader :title="'账户详情'" v-if="!isWeixin"></MyHeader>
    <div style="height:100%">
      <div class="bg">
        <img class="bgImg" src="../../../assets/images/accountTab/account_detail_bg.png" alt="">
        <p class="all-money">账户总资产(元)</p>
        <h3>{{totalAssets}}</h3>
        <p>账户余额<span class="accoundBlance">{{balance}}</span>元</p>
      </div>
      <div class="wrapper wrapper_top">
        <div class="item">
          <div class="item_l">总借出本金</div>
          <div class="item_r">{{totalloanprincipal ? totalloanprincipal : '0.00'}}元</div>
        </div>
        <div class="item">
          <div class="item_l">昨日收益</div>
          <div class="item_r">{{uncollectedPrincipal ? uncollectedPrincipal : '0.00'}}元</div>
        </div>
        <div class="item">
          <div class="item_l">已收本金</div>
          <div class="item_r">{{receivedPrincipal ? receivedPrincipal : '0.00'}}元</div>
        </div>
      </div>
      <div class="wrapper wrapper_bot">
        <div class="item">
          <div class="item_l">已收利息</div>
          <div class="item_r">{{interestReceived ? interestReceived : '0.00'}}元</div>
        </div>
        <div class="item">
          <div class="item_l">待收利息</div>
          <div class="item_r">{{interestReceivable ? interestReceivable : '0.00'}}元</div>
        </div>
      </div>
      <div class="btn_wrapper">
        <div class="item recharge" @click="gotoPage('/home/accountTab/accountDetail/recharge')">充值</div>
        <div class="item withdraw" @click="gotoPage('/home/accountTab/accountDetail/withdraw')">提现</div>
      </div> 
    </div>
    <activate-dialog :is-show="isShowActivateDialog" @on-close="closeDialog('isShowActivateDialog')"></activate-dialog>
    <transition name="move"><router-view class="pageView"></router-view></transition> 
  </div>
</template>

<script type="text/ecmascript-6">
import {baseURL} from '@/vuex/url'
import sinaPwdImg from '@/assets/images/accountTab/sinaPwd.png'
import sinaAccountImg from '@/assets/images/accountTab/sinaAccount.png'
import ActivateDialog from '@/components/Investment/ActivateDialog.vue';
export default {
  data() {
    return {
      totalAssets: '0.00',//账户总资产
      balance: '0.00',//账户余额
      totalloanprincipal: '0.00',//总借出本金
      uncollectedPrincipal: '0.00',//代收本金
      receivedPrincipal: '0.00',//已收本金
      interestReceived: '0.00',//已收利息
      interestReceivable: '0.00',//代收利息
      paymentAccount: '', // 新浪支付账户激活
      paymentPasswordSet: '', // 新浪支付账户交易密码
      activeBtnText: '',
      popupImg:'',
      popupPath: '',
      openurl: '',//新浪交易密码界面链接
      popupVisible: false,
      isShowActivateDialog: false//是否激活
    }
  },
  components: {
    ActivateDialog
  },
  methods: {
     closeDialog(attr){
      this[attr]=false
    },
    getAccountDetails () {
      let details=this;
      this.$ajax('get',baseURL + '/account/detail','',function(data){
        details.totalAssets=data.totalAssets?data.totalAssets:'0.00';
        details.balance=data.balance?data.balance:'0.00';
        details.totalloanprincipal=data.totalloanprincipal?data.totalloanprincipal:'0.00';
        details.uncollectedPrincipal=data.uncollectedPrincipal?data.uncollectedPrincipal:'0.00';
        details.receivedPrincipal=data.receivedPrincipal?data.receivedPrincipal:'0.00';
        details.interestReceived=data.interestReceived?data.interestReceived:'0.00';
        details.interestReceivable=data.interestReceivable?data.interestReceivable:'0.00';
      })
    },
    gotoPage (url) {
      if(url.indexOf('withdraw')!=-1){
       if(!this.paymentAccount){
					this.isShowActivateDialog=this.isShowActivateDialog?false:true;
					return
				}
        this.$router.push({name: 'Withdraw',params: {balance:this.balance}});
      }else if(url.indexOf('recharge')!=-1){
        if(!this.paymentAccount){
					this.isShowActivateDialog=this.isShowActivateDialog?false:true;
					return
				}
        this.$router.push({name: 'Recharge',params: {balance:this.balance}});
      }
    },
    //账户激活状态
    getAccountStatus(){
      this.$ajax('get', baseURL+'/account/security','',function(data){
          // 新浪账户激活状态
          this.paymentAccount=data.activeSinaPay==1?true:false
          // 新浪支付帐户交易密码设置状态
          this.paymentPasswordSet=data.setSinaPass==1?true:false
          // if(data.setSinaPass==1){
          //   this.getpwdurl();
          // }
        }.bind(this)
      )
    },
    //关闭popup
    closePopup() {
      this.popupVisible = false;
    },
    //弹框点击去激活
    toActive() {
      if(!this.paymentAccount) {
        this.$router.push(this.popupPath);
        return
      }
      // if (!this.paymentPasswordSet) {
      //   window.open(this.openurl);
      // }
    },
    getpwdurl(){
      this.$ajax(
          'post',
          baseURL+'/account/setsinapass',
          '',
          function(data){
            this.openurl=data.redirection;
          }.bind(this)
      )
    }
  },
  created () {
    this.getAccountDetails();
    this.getAccountStatus();
  }
}
</script>

<style scoped lang="stylus">
.AccountDetail
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .bg
    position relative
    width 100%
    height 203px
    // background url(../../../assets/images/accountTab/account_detail_bg.png) no-repeat
    // background-size cover
    color #ffffff
    font-size 14px
    text-align center 
    .bgImg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
    p.all-money
      padding 35px 0 15px 0
      letter-spacing 0.57px
    h3
      font-weight 500
      font-size 35px
      letter-spacing 1.87px
      height 40px
      line-height 40px
      margin-bottom 10px
    p
      .accoundBlance
        font-size 16px
        letter-spacing 0.57px  
  .wrapper
    margin 0 10px
    padding 0 20px
    border-radius 8px
    background #ffffff 
    .item
      display flex
      height 55px
      line-height 55px 
      .item_l
        flex 1
        font-size 16px
        color #a3a3a3
        text-align left  
      .item_r
        flex 1
        font-size 16px
        color #5b5b5b
        text-align right    
        font-weight 400  
        letter-spacing 0.7px
      &.item:first-child
        .item_r
          color #F46A23  
  .wrapper_top
    position relative
    top -40px   
    .item:nth-child(2)
      border-top 1px solid #f1f1f1 
      border-bottom 1px dashed #f1f1f1
  .wrapper_bot
    margin-top -20px 
    .item:first-child
      border-bottom 1px solid #f1f1f1
  .btn_wrapper
    position fixed
    bottom 0
    left 0
    right 0
    display flex
    .item
      flex 1
      height 54px
      text-align center 
      line-height 54px
      font-size 18px
      &.recharge
        background #ffffff
        color #fa7009
      &.withdraw
        background #fa7009
        color #fff   
  .mint-popup        
    top 45%
    width 60%
    background transparent     
    .pop-wrapper
      .btn
        height 40px
        line-height 40px
        text-align center
        background #fff
        border-bottom-left-radius 5px
        border-bottom-right-radius 5px
        font-size 14px
        color #FF7D1B
    .pop-close  
      text-align center
      .line
        display block
        width 1px
        height 30px
        margin 0 auto
        background #fff 
      .icon-btn_close
        font-size 25px  
</style>
