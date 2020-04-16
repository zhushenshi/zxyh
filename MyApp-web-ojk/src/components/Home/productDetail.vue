<template>
  <div class="container">
    <MyHeader ref="header" :backIconShow="true" :backPath="'/portal'">{{$t('lang.ojk.pDetail')}}</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="product-info">
            <div class="product-title">{{$t('lang.portalView.loan')}}</div>
            <div class="product-money">Rp {{total.qutoa | money}}</div>
          </div>
          <div class="product-flex" v-if="false">
            <div class="flex-item">
              <div class="item-value">{{total.periods==1?total.days:total.periods}}{{getDiyType(total.diyType)}}</div>
              <div class="item-title">{{$t('lang.portalView.stage')}}</div>
            </div>
            <div class="flex-item">
              <div class="item-value">{{total.totalInterestFee | money}}</div>
              <div class="item-title">{{$t('lang.orderView.interest')}}</div>
            </div>
            <div class="flex-item">
              <div class="item-value">{{total.totalFee | money}}</div>
              <div class="item-title">{{$t('lang.ojk.allPay')}}</div>
            </div>
          </div>
          <div class="list">
            <div class="list-body">
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyType')}}</div>
                <div class="list-item-item">{{total.periods==1?$t('lang.ojk.single'):$t('lang.ojk.multi')}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyQixian')}}</div>
                <div class="list-item-item">{{total.periods==1?total.days:total.periods}} {{getDiyType(total.diyType)}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.jkje')}}</div>
                <div class="list-item-item">Rp {{total.qutoa | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.lx')}}({{total.interestRate}}%/{{getDiyType(total.diyType)}})</div>
                <div class="list-item-item">Rp {{total.totalInterestFee | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.ptglf')}}({{parseFloat(total.trialFeeRate)+parseFloat(total.serviceFeeRate)}}%/{{getDiyType(total.diyType)}})</div>
                <div class="list-item-item">Rp {{parseFloat(total.trialFee)+parseFloat(total.serviceFee) | money}}</div>
              </div>
              <!-- <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.fwf')}}({{total.serviceFeeRate}}%/{{getDiyType(total.diyType)}})</div>
                <div class="list-item-item">Rp {{total.serviceFee | money}}</div>
              </div> -->
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.zje')}}</div>
                <div class="list-item-item">Rp {{total.totalFee | money}}</div>
              </div>
            </div>
          </div>
          <div class="product-list-tips">Simulasi pembayaran:</div>
          <div class="product-list">
            <div class="list-item" v-for="(item,index) in list" :key="index">
              <div class="item-flex">
                <div class="item-tilte">{{$t('lang.orderView.payDay')}}</div>
                <div class="item-time">{{item.payTime}}</div>
              </div>
              <div class="item-flex">
                <!-- <div class="item-tilte" v-if="false">{{$t('lang.ojk.sxf')}} {{item.interestFee | money}}</div> -->
                <div class="item-tilte">{{(index+1)}}/{{list.length}}</div>
                <div class="item-time item-time-money">Rp{{item.money | money}}</div>
              </div>
            </div>
          </div>
          <div class="product-tips">
            <!-- <span>
              <span class="iconfont icon-yiyuedu" :class="{'selected':agree}"></span>
              <span>{{$t('lang.loginView.read')}}</span>
            </span>
            <!-- <span class="agreement" @click="showAgreement('1')">《{{$t('lang.ojk.agreement')}}》</span> -->
            <!-- <span class="agreement" @click="showAgreement('5')">《{{$t('lang.ojk.jkxy')}}》</span> -->
            <div :class="{'base-btn':true,'btn-dis':!agree}" @click="agree&&applyNext()">Form Pengajuan</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Agreement from '../Common/Agreement.vue';
import Withdrawal from '../Common/Withdrawal.vue';
import Vue from 'vue'
import {createAPI} from 'cube-ui'
createAPI(Vue, Agreement, ['click'], true)
createAPI(Vue, Withdrawal, ['click'], true)
export default {
  name: 'productDetail',
  data () {
    return {
      height:0,
      agree: true,
      productId: '',
      periodsId: '',
      list: [],
      total: {
        firstSubmit: true,
        periods: 0,
        qutoa: "0.00",
        serviceFee: "0.00",
        totalFee: "0.00",
        totalInterestFee: "0.00",
        trialFee: "0.00",
        trialFeeRate:'0.00',
        serviceFeeRate:'0.00'
      },
      stepStatus: '',
      cusTrailPhone: {}
    }
  },
  methods:{
    getDiyType(type){
      //diyType分期方式(1,天,2周,3月)
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      switch(type) {
        case '1':
          return lang.comm.day
          break;
        case '2':
          return lang.comm.week
          break;
        case '3':
          return lang.comm.month
          break;
        default:
          return ''
      } 
    },
    showAgreement(type){
      const instance=this.$createAgreement({
        $props: {
          loading: true,
          type: type
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).show()
    },
    closeAgreementPopup(e){
      const instance=this.$createAgreement({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).hide();
      instance.remove();
      let className=e.target.className
      if(className=='base-btn refuse'){
        this.agree=false
      }else{
        this.agree=true
      }
    },
    applyNext(){
      this.saveSelectProductInfo();
    },
    jumpStepView(){
      let status=this.stepStatus;
      switch (status) {
      case '1':
        this.$router.push('/identity')
        break;
      case '2':
        this.$router.push('/personalInfo')
        break;
      case '3':
        this.$router.push('/authentication')
        break;
      case '4':
        this.$router.push('/faceIdentity')
        break;
      case '5':
        this.$router.push({name:'ChangeCreditCard',params:{from:'home'}})
        break;
      default :
        this.$router.push('/identity')
        break;
      }
    },
    getProductInfo(){
      let productId=this.productId
      let periodsId=this.periodsId
      this.$ajax('post','/product/repaymentListPreview',{
        productId: productId,
        periodsId: periodsId
      },(data)=>{
        if(data.retData){
          this.list=data.retData.list;
          this.total=data.retData.total;
          this.stepStatus=data.retData.stepStatus;
          this.cusTrailPhone=data.retData.cusTrailPhone?data.retData.cusTrailPhone:{};
        }
      })
    },
    saveSelectProductInfo(){
      this.$ajax('post','/product/saveSelectProductInfo',{
        productId: this.productId,
        periodsId: this.periodsId
      },(res)=>{
        let state=this.$store.state.cusTrailPhoneState;
        if(state=='0'){
          this.jumpStepView()
        }else if(state=='5'){// 調用預覽計劃  本来是复贷显示还款计划预览 现在要走流程 跳步从新走 后台在绑卡成功后 将跳步设为开始状态
          // this.showWithdrawal()
          this.jumpStepView()
        }
      })
    },
    /** 显示弹框 **/
    showWithdrawal: function () {
      let _this=this
      const instance=this.$createWithdrawal({
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
    closePopup(){
      const instance=this.$createWithdrawal({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closePopup
        }
      }).hide();
      instance.remove()
      this.setOrderback()
    },
    setOrderback(){
      this.$ajax('post','/loanAgreement/orderback',{},function(msg){
        this.$router.push('/portal')
      }.bind(this))
    }
  },
  created(){
    this.headerHeight=this.$Header+'px'
    this.height = this.$Header / 37.5 + 'rem'
  },
  mounted(){
    this.productId=this.$store.state.product_id
    this.periodsId=this.$store.state.periods_id
    // this.showAgreement()
    this.getProductInfo()
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
.container{
  background #f5f5f5;
  .product-info{
    background #ffffff
    .product-title{
      font-size 16px
      padding-top 20px
      padding-bottom 10px
    }
    .product-money{
      font-size 26px
      color $color-primary
      margin 0 10px
      padding-bottom 10px
      // border-bottom 1px solid #ddd
    }
  }
  .product-flex{
    display flex
    padding 20px 10px
    background #fff
    .flex-item{
      flex 1
      position relative
      &:after{
        content ""
        position absolute
        right 0
        top 0
        height 100%
        width 1px
        background #F4F4F4
      }
      .item-value{
        font-size 18px
        padding-bottom 10px
      }
      .item-title{
        font-size 14px
        color #757575  
      }
    }
    .flex-item:last-child{
      &:after{
        display none
      }
    }
  }
  .product-list{
    margin-top 10px
    background #fff
    .list-item{
      padding 10px
      display flex
      .item-flex{
        flex 1
        text-align left
        .item-tilte{
          font-size 13px
          margin-bottom 10px  
        } 
        .item-time{
          font-size 15px
          color #333 
        }
        .item-time-money{
          margin-top 10px
        }
      }
      .item-flex:last-child{
        text-align right   
      }
    }
  }
  .product-tips{
    text-align left
    padding 10px 20px 20px
    .iconfont{
      font-size 16px
      color #ddd
      vertical-align middle
      position relative
      top -1px
      margin-right 4px
    }
    .selected{
      color $color-primary
    }
    .agreement{
      color $color-primary
      display inline-block
      margin-bottom 10px
    }
    .base-btn{
      text-align center
      margin 40px 0 0
    }
    .btn-dis{
      background #dddddd
    }
  }
  .product-list-tips{
    text-align left 
    font-size 14px
    padding 10px 15px 0
    font-weight bold
  }
  .list{
    background #ffffff
    margin 10px 0
    padding 10px 10px 0 10px
    border-radius 4px
    .list-header{
      position relative
      padding 0 0 10px 0
      text-align left
      font-size 15px
      color #333
      span{
        position absolute
        right 0
        font-size 18px
      }
      &:after{
        position absolute
        content ""
        bottom 0
        left 0
        right 0
        height 1px
        background #ddd  
      }
    }
    .list-body{
      padding 10px
      .list-item{
        display flex
        text-align left
        font-size 15px
        color #000
        margin-bottom 10px
        .list-item-item{
          flex 1
          line-height 28px  
        }
      }
      .list-item:last-child{
        margin-bottom 0
      } 
    }
    .list-tips{
      text-align left
      font-size 15px
      color #000
      margin 10px 0 5px 0
      font-weight bold
    }
    .list-periods{
      text-align left
      font-size 14px
      color #333
      position relative
      padding 0 0 5px 0
      margin-bottom 10px
      &:after{
        content ""
        position absolute
        bottom 0
        left 0
        right 0
        height 1px
        background #ddd 
      }
      .periods-item{
        margin-bottom 8px
        span{
          color #1D8E1D
        }
      }
      .periods-moeny{
        position absolute
        right 10px
        top 50%
        color #366DFB
        transform translateY(-50%) 
      }
    }
    .list-periods:last-child{
      &:after{
        display none  
      }
    }
  }
}
</style>