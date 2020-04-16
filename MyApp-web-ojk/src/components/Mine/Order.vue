<template>
  <div class="order">
    <MyHeader  ref="header" :backPath="'/portal'">{{$t('lang.orderView.order')}}</MyHeader>
    <div class="scroll-list-wrap" :style="{height:height}">
      <cube-scroll ref="contentScroll">
        <div class="box">
          <div v-for="(value,key) in list" :key="key">
            <div class="orderList">
              <div class="list-top" @click="start(key)">
                <div class="itemInfo">
                  <div class="item">
                    <div><span class="amout">{{value.pro_quota|money}}</span>({{$t('lang.orderView.cash')}})</div>
                    <div class="status">{{getState(value.status)}}</div>
                  </div>  
                  <div class="date">{{$t('lang.orderView.date')}}:{{value.create_time | dateFormat}}</div>
                </div>
                <div class="arrow">
                  <img src="./img/ic_order_drop_down01.png" :class="value.active? 'routeClass' : ''"/>
                </div>
                <div class="returnMoney">
                  <div>
                    <p>{{value.trial_fee|money}}</p>
                    <p>{{$t('lang.orderView.letter')}}</p>
                  </div>
                  <div>
                      <p>{{value.interest_fee|money}}</p>
                    <p>{{$t('lang.orderView.interest')}}</p>
                  </div>
                    <div>
                      <p>{{value.service_fee|money}}</p>
                    <p>{{$t('lang.orderView.service')}}</p>
                  </div>
                </div>
              </div>
              <div :class="value.active? 'orderItem' : 'showContent'">
                  <div class="periodInfo" v-for="(item,index) in value.repaymentList" :key="index"  >
                  <div class="periods">
                    <div>
                      <span class="itemType">{{item.pay_count }}{{$t('lang.orderView.stage')}}/</span>{{item.day_count}}{{getDiyType(value.diy_type)}}</div>
                    <div class="status">{{getRepaymentState(item.state)}}</div>
                  </div>  
                  <div class="periods">
                      <div class="periodsDiv">{{$t('lang.orderView.return')}}</div>
                      <div class="periodsDiv">{{$t('lang.orderView.payDate')}}</div>
                  </div>
                    <div class="periods num">
                      <div>{{item.yhje |money}}</div>
                      <div>{{item.pre_pay_time | toDate}}</div>
                  </div>
                    <div class="periods">
                      <div class="">
                        <span>{{$t('lang.orderView.management')}}:{{item.overdue_manage_fee |money}}</span>
                      </div>
                      <div>{{$t('lang.orderView.Overdue')}}:{{item.default_interest |money}}</div>
                  </div>
                    <div class="periods">
                      <div>
                        <span>{{$t('lang.orderView.reducAmount')}}:{{item.reduce_amount |money}}</span>
                      </div>
                      <div class="">{{$t('lang.orderView.payAmount')}}:{{item.actual_amount |money}}</div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </cube-scroll>
    </div>
    <div v-show="!list.length" class="no-data-wrapper">
      <img src="./img/no-order.png"/>
      <p>{{$t('lang.orderView.noData')}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue"
import BScroll from 'better-scroll'
let _this=this
  export default {
    data() {
      return {
        height:0,
        list:[]
      }
    },
    mounted() {
      this.getInfo()
    },
    created () {
      this.height=(window.innerHeight-this.$Header)+'px'
    },
    methods: {
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
      start(key){
        this.list[key].active=!this.list[key].active
      },
      getState (state) {
         let locale = this.$i18n._vm.locale
         let lang=this.$i18n._vm.messages[locale].lang
        switch(state)
          {
          case '0':
                return lang.orderView.returnMoney;
                break;
            case '1':
                return lang.orderView.Closed;
                break;
            case '2':
                return lang.orderView.settle;
                break;
            case '3':
                return lang.orderView.beOverdue;
                break;
            case '4':
               return lang.orderView.dealClosure;
                break;
            case '5':
                return lang.orderView.lending;
                break;
            default:
                return '';

          }
      },
      // 还款状态
      getRepaymentState(state) {
        let locale = this.$i18n._vm.locale
        let lang=this.$i18n._vm.messages[locale].lang
          switch(state)
          {
            case '0':
                return lang.orderView.invalid;
                break;
            case '1':
                return lang.orderView.returned;
                break;
            case '2':
                  return lang.orderView.repaid;
                break;
            case '3':
                  return lang.orderView.beOverdue;
                break;
            case '4':
                  return lang.orderView.confirmation;
                break;
            case '5':
                return lang.orderView.lending;
                break;
            default:
                return '';
          }
      },
      getInfo (pageData) {
        let _this=this
        _this.$ajax('post','/order/getOrderList',"",function(data){
          data.retData.forEach((element,i) => {
            if(i==0){
              element.active=true
            }else{
              element.active=false
            }
            _this.list.push(element)
          });
        })
      }
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
  background #F0EFF5
.order
 background #F0EFF5
.orderList
  position relative
  background #ffffff
  margin-bottom 10px
  .amout
    font-size 18px
    margin-right 8px
  .itemType
    font-size 16px
  .date
    color #909090
    font-size 10px
    text-align left 
    padding-left 5px
    margin-top 5px
  .arrow
    position relative
    img
      position absolute
      top 50%
      left 20px
      width 5px
      z-index 1
      transition all 0.4s ease
      transform translateY(-50%)
  .itemInfo
    border-bottom 1px solid #F0EFF5
    color #333333
    margin 0 25px 0 40px
    padding 15px 0
  .item
    display flex
    height 35px
    line-height 35px
    div:nth-child(1)
      white-space nowrap
      text-align left 
    div:nth-child(2)
      text-align right 
    div
      flex 1
      font-size 14px
  .returnMoney
    display flex
    padding 0 25px 0 40px
    div
      flex 1
      font-size 16px
      padding 10px 0  
      p:nth-child(1)
        color #333333
        font-size 18px
      p
        line-height 24px
        white-space: nowrap;
      P:nth-child(1)
       font-size 15px
      P:nth-child(2)
       font-size 12px
    div:nth-child(1)
      white-space nowrap
      text-align left
     div:nth-child(3)
      text-align right 
.repay
  color #6585F3
.succes
  color #A4A4A4
.noRepay
  color #ffffff
  background $color-bg
  border-radius 10px
  display inline-block
  padding 5px 10px
  font-size 12px
.noMsg img
    width: 40%;
    margin-top: 45%
.returnCount
  font-size 18px
.top-tip
  text-align center
  font-size 12px
.bottom-tip
  text-align center
  font-size 12px
.no-data-wrapper
  width 100%
  text-align center
  transform translateY(100%)
  img 
    width 100px
  p
    font-size 14px
    margin-top 10px
    color #B7B7B7
.orderItem
  background #F9F9F9
  display block
.showContent
  display none
  background #F9F9F9
.periodInfo
  border-bottom 1px dashed #b5b5b5
  color #333333
  margin 0 25px 0 40px
  padding 15px 0
.periodInfo:last-child
  border none
.periods
   display flex
   height 30px
   line-height 20px
   div
    flex 1
   div:nth-child(1)
      font-size 12px
      white-space nowrap
      text-align left 
    div:nth-child(2)
      font-size 12px
      text-align right 
.status
  color #ff5e0c
  font-size 14px
.num div
  font-size 15px !important
.periodsDiv
  color #909090
  font-size 14px
  text-align left
.orderList .arrow img.routeClass{
  transform: rotate(90deg);
  transform-origin: 30% 0%;
}
</style>
<style>
.cube-pulldown-wrapper .after-trigger .cube-pulldown-loaded {
  font-size:12px;
}
</style>

