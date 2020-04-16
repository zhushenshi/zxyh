<template>
  <div class="repay">
    <div class="content">
      <div class="content-top">
        <div class="top">
          <MyHeader ref="header" @gotoPage="gotoPage" :headerJson="headerJson" :backIconShow="false" :background="'rgba(255,255,255,0)'">{{$t('lang.repayView.repay')}}</MyHeader>
          <!-- <div class="repayMoney">
            <span class="dollar">Rp</span><span>{{(repayInfo.loanAmount)|money}}</span>
          </div>
          <div class="top-flex">
            <div class="flex-item">
              <div class="flex-title">Rp{{repayInfo.trialFee | money}}</div>
              <div class="flex-text">{{$t('lang.orderView.letter')}}</div>
            </div>
            <div class="flex-item">
              <div class="flex-title">Rp{{repayInfo.serviceFee | money}}</div>
              <div class="flex-text">{{$t('lang.orderView.service')}}</div>
            </div>
          </div> -->
          <div class="list">
            <div class="list-header">
              {{$t('lang.ojk.historyTime')}}: {{repayInfo.loanTime}}
              <!-- <span class="iconfont icon-previewright"></span> -->
            </div>
            <div class="list-body">
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyType')}}</div>
                <div class="list-item-item">{{stage_count(repayInfo.stage_count)}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">Jumlah Pinjaman</div>
                <div class="list-item-item">Rp{{repayInfo.loanAmount | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyQixian')}}</div>
                <div class="list-item-item">{{stage_count_unit(repayInfo.stage_count,repayInfo.dayCount,repayInfo.diyType)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="repayTitle" style="border-bottom: 1px solid #d4d4d4;">
          <div class="repayTitleBtn" @click="goPage('HistoryDetails',repayInfo.loanId)">
            <span class="iconBefore"></span><span class="order">{{$t('lang.repayView.repayOrderdetai')}}</span>
            <span class="iconfont icon-previewright"></span>
          </div>
          <div class="orderStatus">{{repayInfo.orderPaySate === 'ing'?$t('lang.repayView.isInRepay'):repayInfo.status == '5'?$t('lang.repayView.toBeLent'):''}}</div>
          <!-- <span id="waitingFlag" style="float: right; font-size: 12px; color: rgb(204, 204, 204); display: none;">还款中，请稍后...</span> -->
          <!-- <span id="fangkuaningFlag" style="display: none;float: right;font-size: 12px;color: #ccc;">放款处理中，请稍后...</span> -->
          <!-- 付款账单明细 -->
          <!-- <div class="order-detalis" >Rincian Tagihan Penbayaran <span class="iconfont icon-previewright"></span></div> -->
        </div>
      </div>
      <!-- 全选 -->
      <div class="selectAll" @click="selectAll()" v-if="repayInfo.repaymentList.length"><img :src="selectAlls?select:noSelect"><span>Pilih semua tagihan</span></div>
      <cube-scroll ref="scroll" :options="options" class="repay-scroll-list-wrap" @pulling-down="onPullingDown" :style="{height:height}">
        <div class="content-repayContent">
          <div class="noMsg" v-if="!repayInfo.repaymentList.length&&flag">
            <img style="margin-top:20%;" src="./img/no-order.png"/>
            <p>{{$t('lang.repayView.noRepayOrder')}}</p>
          </div>
          <ul class="repayContent" :class="{'repayContentColr':item.state=='1'||item.state=='3'}" v-for="(item,index) in repayInfo.repaymentList" :key="index">
            <li class="contentLi" @click="selectItems(index)">
              <div class="itemBox">
                <div class="item">
                  <div class="itemLine">
                    <div><span style="margin-right:5px;">{{item.payCount}}{{$t('lang.orderView.stage')}}</span><span class="repayMoney">{{item.totleMoney|money}}</span><span class="tips" v-if="false">({{$t('lang.repayView.PrincipalPayable')}})</span></div>
                    <div class="status" v-if="item.state==='2'||item.state==='4'||item.state==='5'">{{item.state==='2'?$t('lang.orderView.repaid'):item.state==='4'?$t('lang.orderView.confirmation'):item.state==='5'?$t('lang.orderView.lending'):''}}</div>
                    <div class="status" v-else-if="item.state==='1'||item.state==='3'"><img :src="item.selected?select:noSelect"></div>
                  </div>
                  <!-- <div class="itemLine"> -->
                  <div class="itemLine reduceAmount" v-if="item.reduceAmount>0">
                    <div>{{$t('lang.repayView.reduction')}}&nbsp;{{item.reduceAmount|money}}</div>
                  </div>
                  <div class="itemLine reduceAmount" v-if="item.overdueManageFee>0">
                    <div>Keterlambatan&nbsp;Rp {{item.overdueManageFee|money}}</div>
                    <div class="date">{{item.overdueDays}} Hari</div>
                  </div>
                  <div class="itemLine">
                    <div>{{$t('lang.repayView.repaymentDate')}}<span v-if="item.state==='3'" style="color: #f00;margin-left: 5px;">({{$t('lang.repayView.Overdue')}})</span></div>
                    <div class="date">{{item.payTime}}</div>
                  </div>
                </div>
                <div class="item" v-if="false">
                  <div class="itemLine">
                    <div class="detail">
                      <div>{{item.fee|money}}</div>
                      <div>{{$t('lang.repayView.interestPayable')}}</div>
                    </div>
                    <div class="detail">
                      <div>{{item.serviceFee|money}}</div>
                      <div>{{$t('lang.ojk.fwf')}}</div>
                    </div>
                    <div class="detail">
                      <div>{{item.trialFee|money}}</div>
                      <div>{{$t('lang.ojk.ptglf')}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </cube-scroll>
    </div>
    <div class="fixeBottom" v-if="repayInfo.repaymentList.length&&flag&&repayInfo.orderPaySate !== 'ing'&&repayInfo.status != '5'">
      <div class="total">{{$t('lang.repayView.total')}}:Rp{{total|money}}</div>
      <div class="repayBtn" @click="repay">{{$t('lang.repayView.immediateRepay')}}</div>
      <div class="extend" @click="extend" v-if="repayInfo.openExtend==='show'">{{$t('lang.repayView.applyExtension')}}</div>
    </div>
    <mt-popup v-model="popupVisible" style="border-radius:5px;">
      <div class="popupBox">
        <div>Pembayaran</div>
        <div class="popupTitle">Metode Pembayaran</div>
        <div class="radioBox">
            <div class="item" @click="selectRepayMethod='ATM'"><img :src="selectRepayMethod==='ATM'?radioCheck:radioNotCheck"> Alfamate</div>
            <div class="item" @click="selectRepayMethod='VA';getBank()"><img :src="selectRepayMethod==='VA'?radioCheck:radioNotCheck">VA/ATM</div>
        </div>
        <div v-if="selectRepayMethod=='VA'">
          <ul class="payWay">           
              <li class="item" v-for="(item,index) in bankList" :key="index"  @click="bankCode=item.value;getBankName(item.text)">
                <img :src="bankCode===item.value?radioCheck:radioNotCheck">{{item.text}}          
              </li>
          </ul>
        </div>
        <span style="line-height:36px;background:linear-gradient(to bottom, #67c9fe, #1ba3f1);color:#fff;padding:8px 25px ;border-radius:5px;min-width 80px" @click="goRepay()">Kirim</span>
      </div>
    </mt-popup>
  </div>
</template>

<script>
const btn_notcheck=require('./img/btn_check_box_default.png')
const btn_check=require('./img/btn_check_box.png')
const radio_img=require('./img/radio.png')
const radio_active_img=require('./img/radio-active.png')
export default {
  name: 'Repay',
  data () {
    return {
      headerJson:{
        rightBtn: '<i style="font-size:20px" class="iconfont icon-dingdanzhuangtai"></i>',
        rightFunc: 'gotoPage'
      },
      height:0,
      options:{
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false,
        pullDownRefresh: {
          threshold: 40,
          stopTime: 1000,
          txt: "",
        },
        pullUpLoad: false,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        },
      },
      repayInfo:{
        orderPaySate:'', //orderPaySate = data.retData.orderPaySate,//订单付款状态 ing还款中
        status:'', //5 放款处理中
        openExtend:'show',//展期开关 show是开启展期，hide关闭
        loanAmount:'',
        totalOntimeShouldAmt:'',//本期待还
        totalOverShouldAmt:'',//逾期待还
        totalShouldAmt:'',//待还款总额
        repaymentList:[
          // 内层的state:状态1未还，2已还，3逾期 4.还款确认中,5放款中
        ]
      },
      total:0,
      flag:false,
      select:btn_check,
      noSelect:btn_notcheck,
      repaymentId:'',
      loanId:'',
      loanNo:'',
      selectAlls: false,
      popupVisible:false,
      repayMethod:'',
      radioCheck:radio_active_img,
      radioNotCheck:radio_img,
      selectRepayMethod:'',
      bankList:[],
      authConfig:'',
      bankCode:'',
      bankName:''
    }
  },
  created(){
    this.getOrderInfo(true)
  },
  mounted(){
    this.height=(window.innerHeight-50-260)+'px'
  },
  methods:{
    selectAll(){
      for(let i=0;i<this.repayInfo.repaymentList.length;i++){
        this.selectAllItems(i)
      }
      this.selectAlls=!this.selectAlls
    },
    selectAllItems(index){
      let repayList=this.repayInfo.repaymentList
      if(this.selectAlls){
        repayList[index].selected=false
      }else{
        repayList[index].selected=true
      }
      if(repayList[index].selected){//选择 true
        let fun=function(){
          let find=repayList.findIndex(ele => {
            return (ele.state=='1'||ele.state=='3')&&!ele.selected//(1未还 3逾期 )//未选中
          })
          if(find<index&&find!=-1){
            repayList[find].selected=true
            fun()
          }
        }
        fun();
      }else{
        repayList.forEach((ele,i) => {
          if(i>index&&(ele.state=='1'||ele.state=='3')){
            ele.selected=false
          }
        })
      }
      this.total=0//计算合计金额
      let repaymentIds=[]
      repayList.map((ele,i) => {
        if((ele.state=='1'||ele.state=='3')&&ele.selected){
          this.total+=ele.totleMoney//计算合计金额
          repaymentIds.push(ele.id)
        }
      })
      this.repaymentId=repaymentIds.join()
    },
    stage_count(count){
      if(count!='--'){
        return count=='1'?this.$t('lang.ojk.single'):this.$t('lang.ojk.multi')
      }else{
        return count
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
    stage_count_unit(count,dayCount,diyType){
      if (!count) {
        return '--'
      }
      if(count!='--'){
        return count=='1'?dayCount+this.getDiyType(diyType):count+this.getDiyType(diyType)
      }else{
        return count
      }
    },
    onPullingDown(){
      this.getOrderInfo(true)
      this.selectAlls=false
      this.total=0//计算合计金额
    },
    goPage(pathName,id){
      if(id){
        this.$router.push({name:pathName,params:{id:id}})
      }else{
        this.$Toast({message: this.$t('lang.ojk.noRepay'), position: 'middle'});
      }
    },
    gotoPage(){
      this.$router.push('repayHistory')
    },
    getTime(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.nowTime = new Date().toLocaleString();
      this.options.pullDownRefresh.txt=lang.msgView.newTime
		},
    getOrderInfo(loading){
      this.$ajax('post','/repay/getRepayList','',(data)=>{
        this.flag=true;
        var info=data.retData
        this.loanId=info.loanId
        this.loanNo=info.loan_no
        if(!info.success){
          this.repayInfo={
            orderPaySate:'',
            status:'',
            openExtend:'show',
            loanAmount:'',
            totalOntimeShouldAmt:'',
            totalOverShouldAmt:'',
            totalShouldAmt:'',
            repaymentList:[]
          }
          this.$Toast({message:info.msg,position:'bottom'});
          return
        }
        var arr=info.repaymentList
        arr=arr.forEach(element => {
          element.selected=false;
        });
        this.repayInfo=info;
        this.repayInfo.openExtend='hide'
        this.$nextTick(function(){
          this.getTime()
          this.$refs.scroll.forceUpdate()
        }.bind(this))
      },'',loading,()=>{
        this.repayInfo={
          orderPaySate:'',
          status:'',
          openExtend:'show',
          loanAmount:'',
          totalOntimeShouldAmt:'',
          totalOverShouldAmt:'',
          totalShouldAmt:'',
          repaymentList:[]
        }
        this.repayInfo.loanTime='--';
        this.repayInfo.stage_count='--';
        this.repayInfo.loanAmount='0';
        this.flag=true;
        this.$nextTick(function(){
          this.getTime()
          this.$refs.scroll.forceUpdate()
        }.bind(this))
      })
    },
    selectItems(index){
      let _this=this
      let repayList=this.repayInfo.repaymentList
      repayList[index].selected=!repayList[index].selected
      if(repayList[index].selected){//选择 true
        let fun=function(){
          let find=repayList.findIndex(ele => {
            return (ele.state=='1'||ele.state=='3')&&!ele.selected//(1未还 3逾期 )//未选中
          })
          if(find<index&&find!=-1){
            repayList[find].selected=true
            fun()
          }
          // _this.selectAlls=true
        }
        fun();
      }else{
        repayList.forEach((ele,i) => {
          if(i>index&&(ele.state=='1'||ele.state=='3')){
            ele.selected=false
          }
        })
        this.selectAlls=false
      }
      this.total=0//计算合计金额
      let repaymentIds=[]
      repayList.map((ele,i) => {
        if((ele.state=='1'||ele.state=='3')&&ele.selected){
          this.total+=ele.totleMoney//计算合计金额
          repaymentIds.push(ele.id)
        }
      })
      this.repaymentId=repaymentIds.join()
    },
    checkRepaying(){//查看是否正在支付中
        if(this.repayInfo.orderPaySate=="ing"){
            this.$Toast({message: this.$t('lang.repayView.isInPayment'), position: 'middle'});
            return false;
        }
        return true
    },
    repay(){//还款
      if(!this.checkRepaying()){
        return
      }
      var arr = this.repayInfo.repaymentList.filter(element => {
        return (element.state=='1'||element.state=='3')&&element.selected //未支付或者逾期 且已选中
      })
      if(arr.length === 0){// 未选择展期相关
        this.$Toast({message: this.$t('lang.repayView.selectOnePeriosRepay'), position: 'middle'});
        return;
      }
      this.$store.commit("product_id", this.repayInfo.productId);
      this.$store.commit("periods_id", this.repayInfo.periodsId);
      this.$store.commit("loan_no", this.repayInfo.loan_no);
      this.$store.commit("loanId", this.loanId);
      this.$store.commit("repayIds", this.repaymentId);
      this.popupVisible=!this.popupVisible
      return
      // this.$router.push({name:'RepayPage',params:{loanId:this.loanId,repaymentId:this.repaymentId,loanNo:this.loanNo}})
    },
    async goRepay(){
      if(!this.selectRepayMethod){
        this.$Toast({message: 'Silakan pilih metode pembayaran', position: 'middle'});
        // this.$Toast({message: '请选择支付方式', position: 'middle'});
        return
      }
      this.$store.commit("repayType", this.selectRepayMethod);
      //=============================
      let  params={}
      var authConfig=null;
      if(this.selectRepayMethod === 'ATM'){
        this.bankCode=""
        this.bankName=""
        authConfig='INSTAMONEYZF'
        params={
           loanNo:this.repayInfo.loan_no,
           loanId:this.loanId,
           repaymentIds:this.repaymentId,
           authConfig: authConfig,
        }
      }else{      
        if(!this.bankCode){
          this.$Toast({message: 'Silakan pilih metode pembayaran', position: 'middle'});
           return
       } 
        params={
            loanNo:this.repayInfo.loan_no,
            loanId:this.loanId,
            repaymentIds:this.repaymentId,
            authConfig: this.authConfig,
            bankName:this.bankName,
            bankCode:this.bankCode
         }

    } 
      this.$ajax('post','/payTreasure/cardPay',params,(data) =>{
        if(data.retData&&data.retData.flag){
          this.$router.push({name:'RepayOjk',params:{data:data.retData,loanId:this.loanId,repaymentId:this.repaymentId,loanNo:this.loanNo,repayType:this.selectRepayMethod}})
        }
      })
      //=============================

    },
    //获取bankName
    getBankName(item){
      console.log(item)
      this.bankName=item
    },
    //获取银行卡
    getBank(){
       this.$ajax('get','/otherCofig/getSysParam?code=repaymentChannel','',(res)=>{
          this.authConfig=res.retData
            this.$ajax('get','/payTreasure/getBankListRemote?payCode='+this.authConfig,'',(data)=>{
             console.log(data)
             this.bankList=data.retData
        }) 
        }) 
      
    },
    extend(){//展期
      if(!this.checkRepaying()){
        return
      }
      var arr = this.repayInfo.repaymentList.filter(element => {
        return (element.state=='1'||element.state=='3')&&element.selected //未支付或者逾期 且已选中
      })
      if(arr.length === 0){// 未选择展期相关
        this.$Toast({message: this.$t('lang.repayView.selectOnePeriosExtend'), position: 'middle'});
        return;
      }else if(arr.length === 1){// 选择一期展期：这里选择1期 只能是第一期或第一期不可展第二期可展
        this.$router.push({name:'Extension',params:{repaymentId:this.repaymentId}})
      }else if (arr.length >= 2){// 不可同时两期展期
          this.$Toast({message: this.$t('lang.repayView.cantExtendText'), position: 'middle'});
          return;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.repay-scroll-list-wrap
.repay
  background-color #f1eff5
  .top
    $bg-user-top(2)
    height 220px
    position relative
    color $color-user-top
    .ovedueMoney
      height 20px
      font-size: 12px;
      text-align: right;
      padding-right: 15px;
      position absolute
      right 0
      i
        font-size:18px;
        position:relative;
        bottom:-2px
    .repayMoneyTitle
      text-align: left;
      font-size 16px
      padding 14px 0 0 30px
    .repayMoney
      text-align: center;
      color: #fff;
      margin: 10px 0 0 0;
      padding 10px 30px 10px 30px
      font-size 32px
      position relative
      .dollar
        font-size 24px
      .repayTip
        text-align: center;
        height 20px
        color: #fff;
        font-size: 12px;
        text-align: right;
        position absolute
        right 0
        top 25px
        span
          padding: 8px 15px;
          background: #ffffff;
          color:#000
          font-size: 13px;
          border-top-left-radius 30px
          border-bottom-left-radius 30px
    span.tips
      color #ED5C3D
      font-size 13px
      height 18px
      line-height 18px
      background-color rgba(255,255,255,.50)
      padding 2px 15px
      border-radius 30px
      margin auto
    .repayMoneyDetail
      text-align: left;
      font-size 12px
      padding-left 30px
      color $color-user-top
      .dollar
        margin-left 10px
      .label2
        margin-left 15px
        color $color-user-top-tint
      .label
        color $color-user-top-tint
    .top-flex{
      display flex
      margin-bottom 10px
      .flex-item{
        flex 1
        font-size 14px
        color #fff
        position relative
        .flex-text{
          margin-top 5px
        }
      }
      .flex-item:first-child{
        &:after{
          content ""
          position absolute
          right 0
          top 10px
          width 1px
          height 20px
          background #fff
        }
      }
    }
  .content
    .repayTitle
      padding: 10px 20px;
      text-align left
      border-bottom: 1px solid #d4d4d4;
      position: relative
      background-color #fff
      .order
        font-size 15px
        vertical-align middle
        padding-left 5px
      .iconBefore
        background-color $color-home
        border-radius 5px
        display inline-block
        width 6px
        height 15px
        position relative
        top 4px
      .orderStatus
        // position:absolute;
        // right:10px;
        font-size:12px;
        top:0;
        bottom:0;
        margin-top:10px;
        height:12px;
        color:#ccc;
    .repayContent
      padding 15px 10px 0
      font-size 12px
      color #909090
      .contentLi
        background-color #ffffff
        padding 15px 15px 0 15px
        border-radius 5px
        .itemBox
          .item
            .itemLine
              display flex
              justify-content space-between
              .repayMoney
                font-size 20px
                margin-right 8px
              .tips
                font-size 10px
              .date
                font-size 15px
              .status
                font-size 14px
                img
                  width 18px
            &:first-child
              // border-bottom 1px solid #d5d5d5
              padding 5px 0 12px 0
              .itemLine
                &:first-child
                  margin-bottom 12px
                &:nth-child(3)
                  margin-top 12px
              .reduceAmount
                color red
            &:nth-child(2)
              padding 13px 0 0 0
              font-size 12px
              .detail
                div
                  &:first-child
                    margin-bottom 7px
                    font-size 17px
              // .itemLine
                // &:first-child
                //   margin-bottom 7px
    .repayContentColr
      color #000000!important
    .fixeBottom
      position fixed
      z-index 1
      bottom 50px
      line-height 44px;
      background-color #FFFFFF
      width 100%
      font-size 15px
      box-sizing border-box
      .total
        color #ef2652
        padding 0 0 0 20px
        float left
      .extend
        background-color #999999
        // float right
        color #fff
        padding 0 8px
        min-width 80px
      .repayBtn
        background $color-primary
        color #fff
        float right
        padding 0 8px
        right 0
        min-width 80px
    .repayContent:last-child{
      padding-bottom: 130px;
    }

.list{
  background #ffffff
  margin 30px 15px 0
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
    padding 10px 0
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
}
.order-detalis{
  text-align right
  font-size 14px
  .iconfont{
    font-size 20px
    position relative
    top 4px
  }
}
.repayTitleBtn{
  position relative
  .iconfont{
    font-size 20px
    position absolute
    right 0
    top 4px
  }
}
.selectAll{
  text-align left
  padding 10px
  img{
    width 18px
    margin-right 4px
    vertical-align sub
  }
}
.popupBox{
  width:260px;
  border-radius:5px;
  font-size:15px;
  padding:15px 15px 15px 30px;
  line-height:40px;
}
.popupTitle{
  text-align:left;
  line-height:30px;
  padding-bottom:15px;
}
.radioBox{
  display:flex;
  margin:0 0 20px 0;
  text-align:left;
  .item{
    line-height:20px;
    flex:1;
    img{
      width:22px;
      height:22px;
      vertical-align:bottom;
    }
  }
}
/deep/.mint-radiolist .mint-cell{
    background:none;
  }
/deep/.mint-radiolist .mint-cell .mint-cell-title{
    background:none;
    font-size:12px;
  }
/deep/.mint-radiolist .mint-cell .mint-cell-title .mint-radio-core{
  border:1px solid red;
}
.payWay{
  padding 15px 0
  .item{
    line-height:25px
    text-align:left
    img{
      width:22px;
      height:22px;
      vertical-align:middle;
      margin-right:5px
    }
  }
}
</style>
