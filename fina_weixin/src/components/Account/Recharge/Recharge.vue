//充值
<template>
  <div class="recharge">
    <MyHeader :title="'充值'" v-if="!isWeixin"></MyHeader>
    <div class="content borderTop">
      <p class="title">充值金额(元)</p>
      <p class="value"><span class="icon-rmb"></span><input v-model="chargeMoney" type="number" placeholder="请输入充值金额" @keyup="checkBalance" :readonly="!canChange"></p>
      <p class="rechargeYzm">
        <!-- <span class="icon-tips"></span> -->
        <svg t="1576478328863" class="icon rechargeYzmicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2265" width="18" height="18"><path d="M963.801169 218.170758a72.850542 72.850542 0 0 0-57.513586-63.903984 1357.959666 1357.959666 0 0 1-185.960594-42.815669A690.80207 690.80207 0 0 1 554.17663 14.317049a76.045741 76.045741 0 0 0-88.826539 0 435.825173 435.825173 0 0 1-167.428438 96.495016 624.341926 624.341926 0 0 1-180.848276 44.732789 67.738223 67.738223 0 0 0-56.874546 63.903984S58.281712 379.847839 58.281712 521.075644c0 255.615937 301.626806 502.924356 452.440208 502.924356s406.42934-174.457877 447.32789-499.090117c10.224637-191.711953 3.195199-306.100085 3.195199-306.100085zM799.567929 415.63407l-315.046642 297.153527a42.815669 42.815669 0 0 1-52.401267 5.112318l-8.307518-7.029438L249.993665 530.022202a42.815669 42.815669 0 0 1 63.903984-58.791666L457.042574 621.404899l283.73369-268.396734a42.815669 42.815669 0 1 1 58.791665 63.903984" p-id="2266" fill="#3d3d3d"></path></svg>
        <input v-model="smsCode" placeholder="请输入验证码" @keyup="checkBalance" maxlength="6">
        <span class="rechargeYzmBtn" @click="!enableClick&&getSmsCode()">{{Buttoncontent}}</span>
      </p>
      <p class="accountBalance">账户余额<span class="accountBalanceVal">{{accountBalance}}</span>元</p>
    </div>
    <div class="holdbank" @click="lookHoldBanks">查看支持的银行及限额</div>
    <div class="btn" :class="disableBtn" @click="goToRecharge">确认充值</div>
    <div class="tips">
      <p><span class="icon-tips"></span>温馨提示</p>
      <p>1、快捷充值资金实时到账；</p>
      <p>2、转账充值到账时间以银行处理时间为准；</p>
      <p>3、充值前请先开通新浪支付电子账户；</p>
      <p>4、快捷充值具体限额请参考充值页面的限额表。</p>
    </div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {baseURL} from '@/vuex/url'
var timerT1;
export default {
  name: 'recharge',
  data() {
    return {
      accountBalance: '0.00',
      smsCode:'',
      chargeMoney: '',
      disableBtn:'true',
      Buttoncontent:'获取',
      enableClick:false,
      timer:60,
      canChange:true,
      transId:''
    }
  },
  created () {
    let _this = this;
    //this.accountBalance=this.$route.params.balance;
    this.$ajax('get',baseURL +'/account','',function(data){
      _this.accountBalance=data.balance?data.balance:'0.00';
    })
  },
  methods: {
    //查看支持银行卡
    lookHoldBanks() {
      this.$router.push(this.$router.history.current.path+'/holdBanks')
    },
    goToRecharge () {
      if(this.disableBtn === 'true') {
        return;
      }
      let Self=this;
      let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
      if(!this.chargeMoney){
        this.$Toast({message: '请正确输入充值金额',position: 'bottom'});
        return;
      }else if(!numReg.test(this.chargeMoney)){
        this.$Toast({message: '请正确输入充值金额(最多两位小数)',position: 'bottom'});
        return;
      }
      if(!this.smsCode){
        this.$Toast({message: '请输入短信验证码',position: 'bottom'});
        return;
      }
      this.$ajax('post',baseURL + '/account/rechargeConfirm',{amount:parseFloat(this.chargeMoney),smsCode:this.smsCode,transId:this.transId},function(data){
        console.log(data);
        Self.$router.go(-1);
      })
    },
    checkBalance () {
      if(this.chargeMoney.length > 0&&this.smsCode.length > 0) {
        this.disableBtn = 'false';
      }else {
        this.disableBtn = 'true';
      }
      if(this.chargeMoney.length>=11){
        this.chargeMoney=this.chargeMoney.substring(0,11);
      }
    },
    getSmsCode(){
      let Self=this;
      let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
      if(!this.chargeMoney){
        this.$Toast({message: '请正确输入充值金额',position: 'bottom'});
        return;
      }else if(!numReg.test(this.chargeMoney)){
        this.$Toast({message: '请正确输入充值金额(最多两位小数)',position: 'bottom'});
        return;
      }      
      var _this = this;
      _this.enableClick = true;//enableClick为true的时候禁止点击重发
      this.$ajax('post',baseURL+'/account/recharge?amount='+parseFloat(this.chargeMoney),'',(data)=>{
          if(data.status=='200'){
            console.log(data);
            _this.$Toast({message: '发送成功',position: 'bottom'});
            _this.canChange=false//金额不可 修改
            _this.transId=data.transId
            _this.Buttoncontent =  '60s';
            timerT1 = setInterval(function() {
              _this.timer--;
              _this.Buttoncontent = _this.timer +'s'
              if(_this.timer === 0) {
                _this.timer = 60;
                clearInterval(timerT1);
                _this.Buttoncontent = "重新获取";
                _this.enableClick = false;
              }
            }, 1000)
          }
        },
        (err)=>{
          _this.enableClick = false;
        }
      )
    },    
  },
  components: {

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
    // height 150px
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
      border-bottom 1px solid #f4f4f4 
      .icon-rmb
        margin-right 5px
        position relative
        top 2px
        font-size 18px
        color #3D3D3D
      input 
        width 180px
        font-size 18px
        letter-spacing 1.32px
        color #3d3d3d
        font-weight 500
        &::input-placeholde
          color #dddddd
    .rechargeYzm
      padding 15px 20px
      position relative
      input 
        width 180px
        font-size 18px
        letter-spacing 1.32px
        color #3d3d3d
        font-weight 500
        &::input-placeholde
          color #dddddd
      .rechargeYzmicon
        position relative
        top:4px
        color:#3d3d3d
      .rechargeYzmBtn
        position absolute;
        padding:0 10px;
        right:20px;
        top:0;
        bottom:0;
        margin:auto
        height:30px;
        line-height:30px;
        font-size:16px;
        border : 1px solid rgba(153,153,153,1);
        border-radius: 4px;
        cursor: pointer;
        
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
