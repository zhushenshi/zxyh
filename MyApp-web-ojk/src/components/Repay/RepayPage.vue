<template>
  <div class="repayPage">
    <MyHeader ref="header"><span>{{$t('lang.repayView.payment')}}</span></MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="top-wrapper">
            <p class="title">{{$t('lang.repayView.amount')}}</p>
            <p class="value">Rp{{totleAmount|money}}</p>
            <p class="text">{{$t('lang.repayView.actualAmount')}}</p>
          </div>
          <div class="mid-wrapper">
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/money-pack.png">
              <span class="text">{{$t('lang.repayView.principal')}}</span>
              <span class="value">{{amount|money}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/icon01.png">
              <span class="text">{{$t('lang.orderView.interest')}}</span>
              <span class="value">{{fee|money}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/over-time.png">
              <span class="text">{{$t('lang.repayView.overdueFines')}}</span>
              <span class="value">{{defaultInterest|money}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/icon02.png">
              <span class="text">{{$t('lang.repayView.overdueManngeFee')}}</span>
              <span class="value">{{overdueManageFee|money}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/no-notice-y.png"  style="top:15px;">
              <span class="text">{{$t('lang.repayView.reduction')}}</span>
              <span class="value">{{reduceAmount|money}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/icon03.png"  style="top:15px;">
              <span class="text">{{$t('lang.repayView.serviceFee')}}</span>
              <span class="value">{{payServiceFee|money}}</span>
            </div>
            <div v-show="false" class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/unionPay.png">
              <span class="text">{{bankName + '(' + bankCard.slice(bankCard.length - 4) + ')'}}</span>
            </div>
          </div>
          <div class="margin">
            <div class="base-btn" @click="repay()">{{$t('lang.repayView.immediatePayment')}}</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      height:0,
      totleAmount:'',
      amount:'',
      fee:'',
      defaultInterest:'',
      overdueManageFee:'',
      reduceAmount:'',
      payServiceFee:'',//信审服务费
      bankName: '----',
      bankCard: '----'
    }
  },
  created(){
    this.getPayFee()
  },
  mounted(){
    this.height = this.$Header / 37.5 + 'rem'
  },
  methods: {
    goPage(path) {
      this.$router.replace(path)
    },
    getPayFee(){
      this.$ajax('post','/repay/getPayFee',{loanId:this.$route.params.loanId,repaymentIds:this.$route.params.repaymentId},(data) =>{
        var msg = data.retData;
        this.totleAmount=msg.totleAmount
        this.amount=msg.amount
        this.fee=msg.fee
        this.defaultInterest=msg.defaultInterest
        this.overdueManageFee=msg.overdueManageFee
        this.reduceAmount=msg.reduceAmount
        this.payServiceFee=msg.payServiceFee
        this.bankName=msg.bankName?msg.bankName:'----'
        this.bankCard=msg.bankCard?msg.bankCard:'----'
      })
    },
    repay(){
      this.$ajax('post','/payTreasure/cardPay',{payType:2,loanNo:this.$route.params.loanNo,loanId:this.$route.params.loanId,repaymentIds:this.$route.params.repaymentId},(data) => {
        if(data.retData.respCode === '0000'){//结清
          this.$router.replace({name:'RepayResult',params:{money:this.totleAmount,repayStatus:0}})
        }else if(data.retData.respCode === '0002'){//等待付款结果
          this.$router.replace({name:'RepayResult',params:{money:this.totleAmount,repayStatus:1}})
        }else{//付款异常
          this.$router.replace({name:'RepayResult',params:{money:this.totleAmount,repayStatus:2}})
        }
      })      
    }
  }
}
</script>

<style scoped lang="stylus">
.repayPage
  background #F6F6F6
  .scroll-list-wrap
    position fixed
    bottom 0
    left 0
    right 0
    background #F6F6F6
    .top-wrapper
      padding 30px 0
      text-align center
      font-size 0
      background #fff
      .title  
        font-size 17px
        color #aaa
      .value
        margin-top 15px
        margin-bottom 8px
        font-weight 600
        font-size 16px
        color #000
      .text
        font-size 12px
        color #909090
    .mid-wrapper
      .item
        padding 0 15px
        position relative
        height 50px
        line-height 50px
        box-sizing border-box
        text-align left
        border-top 1px solid #d4d4d4
        background #ffffff
        font-size 0
        .icon
          position absolute
          top 10px
          left 12px
          width 24px
        .text
          padding-left 34px
          font-size 14px
          color #000
        .value
          float right
          font-size 14px
          color #000
        &:last-child
          margin-top 15px
          .icon
            top 15px  
    .margin
      margin 45px 15px 0        
</style>
