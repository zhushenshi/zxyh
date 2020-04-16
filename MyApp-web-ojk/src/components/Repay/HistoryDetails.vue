<template>
  <div class="repayPage">
    <MyHeader ref="header"><span>{{$t('lang.ojk.historyDetailsTitle')}}</span></MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="list">
            <div class="list-header">
              {{$t('lang.ojk.historyDetailsOrderTime')}} : {{orderInfo.create_time}}
            </div>
            <div class="list-body">
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyDetailsOrderNo')}}</div>
                <div class="list-item-item">{{orderInfo.loan_no}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyType')}}</div>
                <div class="list-item-item">{{orderInfo.stage_count=='1'?$t('lang.ojk.single'):$t('lang.ojk.multi')}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyMoney')}}</div>
                <div class="list-item-item">Rp{{orderInfo.total_fee | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyQixian')}}</div>
                <div class="list-item-item">{{orderInfo.stage_count=='1'?repayList[0].day_count+' '+getDiyType(orderInfo.diy_type):orderInfo.stage_count+'Bulan'}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyDetailsFkNo')}}</div>
                <div class="list-item-item">{{orderInfo.loan_time}}</div>
              </div>
            </div>
          </div>
          <div class="list">
            <div class="list-tips">{{$t('lang.ojk.fymx')}}</div>
            <div class="list-body">
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.jkje')}}</div>
                <div class="list-item-item">Rp {{orderInfo.pro_quota | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.lx')}}({{orderInfo.interest_rate}}%/{{orderInfo.stage_count=='1'?'Hari':'Bulan'}})</div>
                <div class="list-item-item">Rp {{orderInfo.interest_fee | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.ptglf')}}({{parseFloat(orderInfo.trial_rate)+parseFloat(orderInfo.service_rate)}}%/{{orderInfo.stage_count=='1'?'Hari':'Bulan'}})</div>
                <div class="list-item-item">Rp {{parseFloat(orderInfo.trial_fee)+parseFloat(orderInfo.service_fee) | money}}</div>
              </div>
              <!-- <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.fwf')}}({{orderInfo.service_rate}}%/{{orderInfo.stage_count=='1'?'Hari':'Bulan'}})</div>
                <div class="list-item-item">Rp {{orderInfo.service_fee | money}}</div>
              </div> -->
              <div class="list-item">
                <div class="list-item-item">Biaya Denda Terlambat({{orderInfo.contract_violate_rate}}%/Hari)</div>
                <div class="list-item-item">Rp {{orderInfo.overdue_fee_all | money}}</div>
              </div>
              <!-- 滞纳金 -->
              <!-- <div class="list-item">
                <div class="list-item-item">Denda keterlambatan</div>
                <div class="list-item-item">Rp 0</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">Biaya Denda Terlambat (0.5%/{{orderInfo.stage_count=='1'?'Hari':'Bulan'}})</div>
                <div class="list-item-item">Rp 0</div>
              </div> -->
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.zje')}}</div>
                <div class="list-item-item">Rp {{orderInfo.total_fee | money}}</div>
              </div>
            </div>
            <div class="list-tips">{{$t('lang.ojk.fkmx')}}</div>
            <div class="list-body">
              <div class="list-periods" v-for="(item,index) in repayList" :key="index">
                <div class="periods-item">{{$t('lang.ojk.dfk')}} {{item.pay_count}}/{{repayList.length}}</div>
                <div class="periods-item">{{$t('lang.ojk.hkrq')}} {{item.pay_time}}</div>
                <div class="periods-item" v-if="item.state=='Lunas'">Waktu Pembayaran {{item.successTime?item.successTime:'--'}}</div>
                <div class="periods-item" v-if="item.state=='Terlambat'">Denda keterlambatan Rp {{item.overdue_fee|money}}</div>
                <!-- <div class="periods-item" v-if="item.state=='Terlambat'">Biaya Denda Terlambat (0.5%/{{orderInfo.stage_count=='1'?'Hari':'Bulan'}}) Rp {{item.contract_violate_rate?item.contract_violate_rate:0}} </div> -->
                <div class="periods-item"><span :class="{lunas:item.state=='Lunas'?true:false}">{{item.state}}</span></div>
                <div class="periods-moeny">Rp{{item.repayment_amount | money}}</div>
              </div>
            </div>
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
      id: '',
      orderInfo: {
        create_time: "",
        id: "",
        loan_no: "",
        loan_time: "",
        notPayAmount: '',
        pro_quota: "",
        product_id: "",
        stage_count: "",
        status: "",
        trial_rate:'0',
        service_rate:'0'
      },
      repayList: [{
        pay_count: "",
        pay_time: "",
        repayment_amount: "",
        state: ""
      }]
    }
  },
  created(){
    this.id=this.$route.params.id
  },
  mounted(){
    this.height = this.$Header / 37.5 + 'rem'
    this.getHistoryDetails()
  },
  methods: {
    goPage(path) {
      this.$router.replace(path)
    },
    getHistoryDetails(){
      let _this=this
      this.$ajax('post','/loanAgreement/OrderInfoByOrderId',{
        orderId: this.id
      },(data)=>{
        if(data.retData){
          _this.orderInfo=data.retData.orderInfo?data.retData.orderInfo:{}
          _this.repayList=data.retData.repayList?data.retData.repayList:[]
        }
      })
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
    .list{
      background #ffffff
      margin 10px 15px
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
            color #f00
          }
          .lunas{
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
</style>
