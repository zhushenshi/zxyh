<template>
  <div class="repaymentPlan">
	 <div class="MyHeader" v-if="!isWeixin"><MyHeader title="还款计划" :bgColor="'#ffffff'" textColor="#000"></MyHeader></div>
      <div class="planTtab" :style="{top:(isWeixin?'0':'64px')}">
          <div class="tabItems">期数</div>
          <div class="tabItems">还款日</div>
          <div class="tabItems">本金(元)</div>
          <div class="tabItems">利息(元)</div>
          <div class="tabItems">本息(元)</div>
      </div>
      <div class="transactionSwipper" ref="transactionSwipper" :style="{top:(isWeixin?'44px':'108px')}">
          <div class="planBody"  ref="content">
                <div class="planContainer" v-for="(item,index) in pageList" :key="index">
                    <div class="planItems">{{item.periods}}</div>
                    <div class="planItems">{{item.repayDate}}</div>
                    <div class="planItems">{{item.principal}}</div>
                    <div class="planItems">{{item.interest}}</div>
                    <div class="planItems">{{item.principalInterest}}</div>
                </div>
                <!-- <div class="footerTab">
                    <div class="footerItems" @click="checkAgreementVoucher"><span>查看协议</span></div>
                    <div class="footerItems" @click="checkAgreementVoucher"><span>交易凭证</span></div>
                    <div class="footerItems" @click="checkAgreementVoucher"><span>项目凭证</span></div>
                </div> -->
                <div class="noPlan" v-show="pageList.length==0">暂无数据</div>
            </div>
      </div>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
export default {
  data() {
    return {
        orderid: '',
        preservationid: '',
        pageList: []
    }
  },
  created () {
      if(this.$route.params.orderid){
          this.orderid=this.$route.params.orderid;
      }else{
          this.orderid=sessionStorage.getItem('$orderId')
      }
      this.getRecords();
  },
  mounted () {
    this.scroll='';
  },
  methods: {
    _initScroll () {
        this.$nextTick(() => {
        let This=this;
        if(this.$refs.content.offsetHeight<this.$refs.transactionSwipper.offsetHeight){
          this.$refs.content.style.minHeight=this.$refs.transactionSwipper.offsetHeight+1+'px'
        }
        this.scroll=new BScroll(this.$refs.transactionSwipper, {
            click: true
        });
    })
    },
    getRecords () {
        let records=this;
        this.$ajax('get',baseURL + '/account/invests/repayplan?orderid='+this.orderid,'',function(data){
            records.$nextTick(function () {
                if(data.list){
                    records.pageList=JSON.parse(data.list);
                    records.preservationid=data.preservationid;
                    this._initScroll();
                }
            })
        })
    },
    checkAgreementVoucher () {
        if(this.preservationid){
            if(this.preservationid.substr(this.preservationid.length-3)=="633"){
                window.location="https://pre.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
            }else{
                window.location="https://www.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
            }
        }
    }
  }
}
</script>

<style scoped lang="stylus">
// @import '../../../common/stylus/mixin'
.repaymentPlan
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #F6F6F6
    .planTtab
        position fixed
        top 64px
        z-index 1
        width 100%
        height 44px
        line-height 44px
        background #ffffff
        text-align center
        font-family PingFangSC-Medium
        font-size 12px
        color #888888
        letter-spacing 0
        display flex
        display -webkit-box
        display -webkit-flex
        border-top: 1px solid #ddd;
        .tabItems
            flex 1
    .transactionSwipper
        position fixed
        top 108px
        left  0
        right  0
        bottom 0
        overflow hidden
        .planBody
            background #ffffff
            .planContainer
                display flex
                display -webkit-box
                display -webkit-flex
                font-family PingFangSC-Medium
                font-size 11px
                color #333333
                letter-spacing 0
                text-align center
                position relative
                height 44px
                line-height 44px
                .planItems
                    flex 1
            .planContainer:after
                content ''
                position absolute
                left 0
                bottom 0
                width 100%
                border-bottom 1px dashed #F1F1F1
            .noPlan
                text-align center
            .footerTab
                display flex
                display -webkit-box
                display -webkit-flex
                text-align center
                height 60px
                line-height 60px
                font-family PingFangSC-Medium
                font-size 14px
                color #FA7009
                letter-spacing 2px
                margin 20px 0
                .footerItems
                    flex 1
                    span
                        position relative
                    span:after
                        position absolute
                        bottom -6px
                        left 0
                        content ''
                        width 100%
                        height 2px
                        background #FA7009
    .planTtab:after
        position absolute
        content ''
        width 100%
        height 1px
        background #eeeeee
        bottom 0
</style>
