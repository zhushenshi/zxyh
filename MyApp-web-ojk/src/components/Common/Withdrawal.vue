<template>
  <cube-popup type="withdrawal-popup" :visible='loading' ref="withdrawalPopup">
    <div class="withdrawal">
      <div class="popup-header" v-if="false"></div>
      <div class="popup-body">
        <cube-scroll ref="scroll">
          <div class="scroll-contianer">
            <div class="header-title">Jumlah yang didapat</div>
            <div class="header-money">Rp {{total.qutoa | money}}</div>
            <div class="header-info" v-if="false">
              <div class="header-info-left">
                <div class="left-title">{{total.trialFee | money}}</div>
                <div class="left-title">{{$t('lang.orderView.letter')}}</div>
              </div>
              <div class="header-info-right">
                <div class="right-title">{{total.serviceFee | money}}</div>
                <div class="right-title">{{$t('lang.orderView.service')}}</div>
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
            <div class="body-list" v-for="(item,index) in list">
              <!-- <div class="list-item">
                <div class="item-left">{{item.periods}}{{$t('lang.orderView.stage')}}/{{item.fqDays}}{{getDiyType(item.diyType)}}</div>
                <div class="item-right">{{$t('lang.orderView.payDay')}}: <span class="time">{{item.payTime}}</span></div>
              </div>
              <div class="list-item">
                <div class="item-left item-title">{{$t('lang.orderView.return')}}</div>
                <div class="item-right item-title">{{$t('lang.orderView.interest')}}</div>
              </div>
              <div class="list-item">
                <div class="item-left item-money">{{item.money | money}}</div>
                <div class="item-right item-money">{{item.interestFee | money}}</div>
              </div> -->
              <div class="list-item">
                <div class="item-left">{{$t('lang.orderView.payDay')}}</div>
                <div class="item-right"></div>
              </div>
              <div class="list-item">
                <div class="item-left item-money">{{item.payTime}}</div>
                <div class="item-right item-money">Rp {{item.money | money}}</div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
      <div class="popup-footer">
        <div class="loan-hetong-tips" @click="showAgreement('0')">
          <span>
            <span :class="{'btn-check-box':true,'btn-check-box-check':agree}"></span>
            <span>{{$t('lang.ojk.read')}}</span>
          </span>
          <span class="agreement">《{{$t('lang.ojk.jkxy')}}》</span>
        </div>
        <div class="btn-container">
          <div :class="{'base-btn':true,'btn-dis':!agree}" @click="agree&&confirmWithdrawal()">{{$t('lang.comm.confirmWithdrawal')}}</div>
          <div class="base-btn" @click="close">{{$t('lang.ojk.cancel')}}</div>
        </div>
        <div class="footer-tips">*{{$t('lang.comm.withdrawalTips')}}*</div>
      </div>
      <img v-if="false" class="popup-close" @click="close" src="./img/close.png" alt="">
    </div>
  </cube-popup>
</template>

<script type="text/ecmascript-6">
import Agreement from './Agreement.vue';
import Vue from 'vue'
import {createAPI} from 'cube-ui'
createAPI(Vue, Agreement, ['click'], true)
export default {
  name: 'withdrawal',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    productId: {
      type: String,
      default: ''
    },
    periodsId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      agree: false,
      total: {
        firstSubmit: true,
        qutoa: "0.00",
        serviceFee: "0.00",
        totalFee: "0.00",
        totalInterestFee: "0.00",
        trialFee: "0.00",
        trialFeeRate:'0.00',
        serviceFeeRate:'0.00'
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    showAgreement(type){
      let productId=this.$props.productId
      let periodsId=this.$props.periodsId
      const instance=this.$createAgreement({
        $props: {
          loading: true,
          type: type,
          productId: productId,
          periodsId: periodsId
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
    close(e){
      this.$emit('closePopup',e)
    },
    getInfo(){
      let productId=this.$props.productId
      let periodsId=this.$props.periodsId
      this.$ajax('post','/product/repaymentListPreview',{
        productId: productId,
        periodsId: periodsId
      },function (msg) {
        let data=msg.retData;
        this.total=data.total;
        this.list=data.list;
      }.bind(this))
    },
    confirmWithdrawal(){
      let firstSubmit=this.total.firstSubmit;
      if(firstSubmit){
        this.firstPopupTixian()
      }else{
        // this.nextPopupTixian()
        this.firstPopupTixian()
      }
    },
    formatTime(time, format) {
      if(!time){
          return '--';
      }
      if(format == 'nyr') {
          time = time.substr(0,4)+'年'+time.substr(4,2)+'月'+time.substr(6,2)+'日';
      } else if (format == 'nyrsfm') {
          time = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2)+ ' ' + time.substr(8,2) +':'+ time.substr(10,2) + ':' + time.substr(12,2);
      }else if (format=='--'){
          time = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2);
      }
      return time;
    },
    firstPopupTixian(){
      this.$ajax('post','/miaofuOrder/subApprove',{},function (msg) {
        this.close()
      }.bind(this))
    },
    nextPopupTixian(){
      let productId=this.$props.productId
      let periodsId=this.$props.periodsId
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/loanAgreement/addLoanNoContract',{
        productId: productId,
        productDetailId: periodsId
      },function (msg) {
        this.close();
        this.$router.push('/order')
        // this.$router.push({
        //   name:'ApplyStatus',
        //   params:{HeaderTitle:lang.process.title,msgMain:lang.process.success,msg:'',btnTxt:lang.process.backHome,path:'/portal'}
        // })
      }.bind(this))
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.withdrawal{
  background #ffffff
  border-radius 4px
  font-size 14px
  position relative
  text-align center
  .popup-header{
    padding 20px 15px
    font-size 12px
    color #B1AEAD
    background #FFF9F6
    border-top-left-radius 4px
    border-top-right-radius 4px
    .header-money{
      font-size 20px
      font-weight 500
      color #333
      margin 10px 0
    }
    .header-info{
      display flex
      font-size 14px
      .header-info-left{
        flex 1
        position relative
        &:after{
          content ""
          position absolute
          right 0
          top 8px
          height 20px
          width 1px
          background #E4E2E1
        }
        div:first-child{
          font-size 18px
        }
      }
      .header-info-right{
        flex 1
        div:first-child{
          font-size 18px
        }
      }
    }
  }
  .popup-body{
    background #fff
    padding 10px 15px
    height 400px
    .header-money{
      font-size 20px
      color #333
      margin 10px 0
      font-weight bold
    }
    .header-info{
      display flex
      font-size 14px
      .header-info-left{
        flex 1
        position relative
        &:after{
          content ""
          position absolute
          right 0
          top 8px
          height 20px
          width 1px
          background #E4E2E1
        }
        div:first-child{
          font-size 18px
        }
      }
      .header-info-right{
        flex 1
        div:first-child{
          font-size 18px
        }
      }
    }
    .body-list{
      padding 20px 0
      text-align left
      position relative
      &:after{
        content ""
        position absolute
        bottom 0
        left 0
        right 0
        border-bottom 1px dashed #E6E6E6
      }
      .list-item{
        display flex
        .item-left{
          flex 0.4
          text-align left
          font-size 15px
          font-weight 500
          color #333
        }
        .item-right{
          flex 0.6
          text-align right
          color #A9A9A9
          font-size 14px
          .time{
            color #FF6142
          }
        }
        .item-title{
          font-size 13px
          color #929292
          margin 15px 0 5px
        }
        .item-money{
          font-size 18px
          color #000
        }
      }
    }
  }
  .popup-footer{
    margin 20px 15px
    background #fff
    padding-bottom 20px
    .footer-tips{
      margin-top 10px
      color #f00
    }
    .loan-hetong-tips{
      line-height 26px
      margin 10px 0
    }
    .selected{
      color $color-primary
    }
    .btn-container{
      display flex;
      .base-btn:first-child{
        margin-right 5px
        background #4285F4
      }
      .base-btn:last-child{
        margin-right 0
        margin-left 5px
      }
      .btn-dis{
        background #dddddd!important
      }
    }
  }
  .popup-close{
    position absolute
    bottom -40px
    width 30px
    height 30px
    left 50%
    right 0
    z-index 1
    transform translateX(-50%)
  }
  .btn-check-box{
    display inline-block
    width 16px
    height 16px
    background url('./img/btn_check_box_default.png') no-repeat center center;
    background-size cover
    vertical-align: sub;
    position relative
    top -1px
  }
  .btn-check-box-check{
    display inline-block
    width 16px
    height 16px
    background url('./img/btn_check_box.png') no-repeat center center;
    background-size cover
    vertical-align: sub;
    position relative
    top -1px
  }
  .agreement{
    color $color-primary
  }
  .list{
    background #ffffff
    margin 10px 0
    padding 10px 0 0 0
    border-radius 4px
    .list-body{
      .list-item{
        display flex
        text-align left
        font-size 15px
        color #000
        margin-bottom 10px
        .list-item-item{
          flex 1  
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
  .product-list-tips{
    text-align left 
    font-size 14px
    padding 10px 0
    font-weight bold
  }
}
</style>
