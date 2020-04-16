<template>
  <div class="repayPage">
    <MyHeader ref="header"><span>{{$t('lang.repayView.extensionPay')}}</span></MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="top-wrapper">
            <p class="title">{{$t('lang.repayView.amount')}}</p>
            <p class="value">Rp{{totalFee|money}}</p>
            <p class="text">{{$t('lang.repayView.actualAmount')}}</p>
          </div>
          <div class="mid-wrapper">
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/money-pack.png">
              <span class="text">{{$t('lang.orderView.payDay')}}</span>
              <span class="value">{{newPayDate|toDate}}</span>
            </div>
            <div class="item" style="border-top:1px solid #d4d4d4;">
              <img class="icon" src="./img/unionPay.png">
              <span class="text">{{bankName + '(' + bankCard.slice(bankCard.length - 4) + ')'}}</span>
            </div>
          </div>
          <div class="margin">
            <div class="base-btn" @click="extendPay">{{$t('lang.repayView.immediatePayment')}}</div>
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
       bankName: '----',
       bankCard: '----',
       newPayDate:'',
       totalFee:'0.00',
       loanId:'',
    }
  },
  created(){
    this.getExtendFee()
  },
  mounted(){
      this.height = this.$Header / 37.5 + 'rem'
  },
  methods: {
    goPage(path) {
      this.$router.replace(path)
    },
    getExtendFee(){
      this.$ajax('post','/extend/getExtendFee',{repaymentId:this.$route.params.repaymentId},(data) =>{
        this.bankName=data.retData.bankName?data.retData.bankName:'----';
        this.bankCard=data.retData.bankCard?data.retData.bankCard:'----';
        this.newPayDate=data.retData.newPayDate;
        this.totalFee=data.retData.totalFee;
        this.loanId=data.retData.loanId
      })
    },
    extendPay(){//展期付款
      this.$ajax('post','/extend/payForExtend',{loanId:this.loanId,repaymentId:this.$route.params.repaymentId,totalFee:this.totalFee},(data) => {
        if(data.retData.respCode === '0000' || data.retData.respCode === '0002'){
          this.$createDialog({
            type: 'alert',
            confirmBtn: {
              text: '确定',
              active: true
            },
            showClose: false,
            title: '展期申请处理中',
            onConfirm: () => {
              this.$router.replace('/portal')
            }
          }).show()
        }else{
          this.$createDialog({
            type: 'alert',
            confirmBtn: {
              text: '确定',
              active: true
            },
            showClose: false,
            title: '出错啦',
            onConfirm: () => {
              this.$router.replace('/portal')
            }
          }).show()  
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
