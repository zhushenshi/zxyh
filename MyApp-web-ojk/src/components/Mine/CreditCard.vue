<template>
  <div class="creditCard">
    <MyHeader  ref="header">{{$t('lang.creditCardView.title')}}</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div v-show="hasInfo">
          <div class="box">
          <div class="item">
            <span>{{$t('lang.creditCardView.cardNo')}}</span>
            <span>{{cardNummer}}</span> 
          </div>
          <div class="item">
            <span>{{$t('lang.creditCardView.bank')}}</span>
            <span>{{bankName}}</span> 
          </div>
        </div> 
        <div class="changeBtn">
          <div class="btns" @click="goToChangeCreditCard('ChangeCreditCard','creditCard')">{{$t('lang.creditCardView.changeCard')}}</div>
        </div>
        <div class="tips">
          <p>{{$t('lang.comm.reminderTips')}}:</p>
          <p>{{$t('lang.comm.reminderTipsOne')}}</p>
        </div>
        </div>
        <div class="noCard" v-show="isShow">
          <div class="addCard" @click="addBank()" style="border:1px dashed #b9b9b9">
            <span class="addNew">+</span>
            <span>{{$t('lang.creditCardView.addCard')}}</span>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'creditCard',
  data () {
    return {
      height:0,
      isShow:false,
      hasInfo:false,
      cardNummer:'',
      bankName:''
    }
  },
   created () {
     this.getData ()
  },
  methods: {
    goToChangeCreditCard (name,from) {
      this.$router.push({name:name,params:{from:from}})
    },
     //添加银行卡
    addBank () {
      let _this = this
       _this.$router.push('changeCreditCard')
      // if (this.realnameVerify != 0) {
      //   this.$createDialog({
      //     type: 'confirm',
      //     title: '提示',
      //     content: '请先进行实名认证！',
      //     confirmBtn: {
      //       text: '确定',
      //       active: true,
      //       disabled: false,
      //       href: 'javascript:;'
      //     },
      //     cancelBtn: {
      //       text: '取消',
      //       active: false,
      //       disabled: false,
      //       href: 'javascript:;'
      //     },
      //     onConfirm: () => {
      //       _this.$router.push('/home/current')
      //     }
      //   }).show()
      // } else {
      //   this.$store.commit('bankCardFlag', 'mine')
      //   this.$router.push("/addCreditCard")
      // }
    },
    getData (){
      let _this=this
      _this.$ajax('post','/payTreasure/getOpenAccount','',function(data){
        if(data.retData==null){
           _this.isShow=!_this.isShow
           return
        }else{
          _this.hasInfo=!_this.hasInfo
        }
        _this.cardNummer=data.retData.bank_card
        _this.bankName=data.retData.account_bank
     })
    }
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  background #F4F4F4
  .box
    background #ffffff
    font-size 14px
    text-align left
    color #000000
    .item
      padding 15px
      span:nth-child(1)
        width 100px
        display inline-block
.changeBtn
  margin 30px auto
  width 75%
  background $color-primary
  font-weight 500
  border-radius 20px
  color #ffffff
  .btns
    height 36px
    line-height 36px
    font-size 16px 
    margin 10px auto 0
.tips
  font-size 14px
  padding 0 15px
  text-align left 
  p
   margin 10px 0
   color #B9B9B9
.noCard
    margin 30% 20px
.addCard
  width 100%
  text-align center
  border:1px dashed $color-primary
  border-radius 5px
  color:#000000
  padding 20px 0
  font-size 16px
.addNew
  font-size 20px
  position relative
  top -1px
</style>
