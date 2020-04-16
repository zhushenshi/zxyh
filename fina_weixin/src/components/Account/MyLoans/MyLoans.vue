//我的借款
<template>
  <div class="myLoans">
    <div class="queryContainer">
      <label for=""><input type="text" name="beginTime" placeholder="开始时间" v-model="startDate" readonly @click="openPicker(0)" onfocus="this.blur()"></label>
      <span style="margin:0 4px">-</span>
      <label for=""><input type="text" name="endTime" placeholder="结束时间" v-model="endDate" readonly @click="openPicker(1)" onfocus="this.blur()"></label>
      <mt-button size="small" @click="queryConfirm">查询</mt-button>
    </div>
    <!-- <div class="titleBar">
      <span @click="goBack" class="icon-back"></span>
      <span class="title-text">我的借款</span>
      <span class="search-btn">查询</span>
    </div> -->
    <div class="content" ref="scrollWrapper">
      <div class="scroll-wrapper" ref="loansWrapper">
        <!--顶部提示信息-->
        <div class="top-tip">
          <span class="refresh-hook">{{topText}}</span>
        </div>
        <div class="item-wrapper" v-for="(item,index) in pageList" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="item-detail">
            <div class="item-row">
              <div class="item item-title">借款金额(元)</div>
              <div class="item item-title">借款年利率</div>
              <div class="item item-title">借款时间</div>
              <div class="item item-title">借款期限</div>
            </div>
            <div class="item-row">
              <div class="item">{{item.amount}}</div>
              <div class="item">{{item.interestrate+"%"}}</div>
              <div class="item">{{item.loanTime.slice(0,10)}}</div>
              <div class="item">{{item.loanTerm}}</div>
            </div>
          </div>
          <div class="repay-plan-wrapper">
            <p class="periods">{{'共'+item.totalperiods+'期，已还'+item.repayperiods+'期'}}</p>
            <p class="btn" @click="lookRepayPlan(item.id)">还款计划</p>
          </div>
          <div v-if="item.status === 4" class="state"></div>
          <div v-if="item.tips != 0" class="tips">
            <img width="40" src="./images/tips.png"/>
          </div>
        </div>
        <div class="bottom-tip">
          <!--底部提示信息-->
          <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
        </div>
      </div>
      <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
    </div>
    <mt-datetime-picker ref="picker" :endDate = 'mindata' v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm"></mt-datetime-picker>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'

export default {
  data() {
    return {

      pickerVisible: '',
      mindata:new Date(),
      startDate: '',
      endDate: '',
      timeType: 0,
      searchCondition:{
        curpage:1,
        pagesize:4
      },
      searchDate:{
        startDate:"",
        endDate:""
      },
      isHaveMore: false,
      topText: '下拉刷新',
      bottomText: '查看更多',
      refreshSuccess: false,
      pageList:[],
      isNoInfo:false
    }
  },
  watch: {
    selected: function(nVal, oVal) {
      this.searchCondition.curpage = 1;
      this.searchCondition.pagesize = 4;
      this.isHaveMore = false;
      this.topText = '下拉刷新';
      this.bottomText = '查看更多';
      this.refreshSuccess = false;
      this.pageList = [];
      this.isNoInfo=false;
      this.searchDate.startDate=this.startDate;
      this.searchDate.endDate=this.endDate;
      this.getData(this.startDate,this.endDate);
    }
  },
  methods: {
    lookRepayPlan(id) {
      sessionStorage.setItem('crmId', id);
      this.$router.push({name:'RepayPlan',params:{crmId: id}});
    },
    queryConfirm(){
      if(!this.startDate){
        this.$Toast({message:'请选择开始时间',position: 'bottom'});
        return;
      }
      if(!this.endDate){
        this.$Toast({message:'请选择结束时间',position: 'bottom'});
        return;
      }

      let s = new Date(this.startDate).getTime();
      let e = new Date(this.endDate).getTime();
      if(s > e) {
        this.$Toast({message:'请正确选择时间范围',position: 'bottom'});
        return;
      }
      this.searchDate.startDate=this.startDate.replace(/[-]/ig,"");
      this.searchDate.endDate=this.endDate.replace(/[-]/ig,"");
      this.searchCondition.curpage = 1;
      this.searchCondition.pagesize = 4;
      this.getData(this.searchDate.startDate,this.searchDate.endDate);
    },
    openPicker(type) {
      this.timeType=type;
      this.$refs.picker.open();
      if(type == 0) {
        this.pickerVisible = new Date(this.startDate);
      }else if(type == 1) {
        this.pickerVisible = new Date(this.endDate);
      }
    },
    handleConfirm(val){
      let m=val.getMonth()+1;
      let d=val.getDate();
      if(m<10){
        m='0'+m;
      }
      if(d<10){
        d='0'+d;
      }
      if(this.timeType==0){
        this.startDate=val.getFullYear()+'-'+m+'-'+d
      }else{
        this.endDate=val.getFullYear()+'-'+m+'-'+d
      }
    },
    getData (startDate,endDate) {
      let _this=this;
      if(!startDate)startDate="";
      if(!endDate)endDate="";
      this.$ajax('get',baseURL + '/account/myloan/?pagesize='+_this.searchCondition.pagesize+'&'+'curpage='+_this.searchCondition.curpage+'&startDate='+startDate+'&endDate='+endDate,"",function(data){
        _this.$nextTick(function () {
          _this.pageList=data.list;
          _this.isNoInfo=false;
          if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
            _this.isHaveMore=true;
            _this.isNoInfo=false;
            _this.bottomText='查看更多';
          }else{
            _this.isHaveMore=false;
            if(_this.pageList.length > 0) {
              _this.bottomText='';
            }else{
              _this.isNoInfo=true;
              _this.bottomText='暂无数据';
            }

          }
          if (_this.scroll) {
            _this.scroll.destroy();
          }
          _this._initScroll();
        })
      })
    },
    _initScroll() {
      let _this=this;
      this.$nextTick(() =>{
          if(this.$refs.loansWrapper.offsetHeight<this.$refs.scrollWrapper.offsetHeight){
            this.$refs.loansWrapper.style.minHeight=this.$refs.scrollWrapper.offsetHeight+1+'px'
          }
          this.scroll=new BScroll(this.$refs.scrollWrapper, {
            click: true,
            probeType: 1,
            pullDownRefresh: {
              threshold: 30,
              stop: 0
            },
            pullUpLoad: {
              threshold: -30
            }
          });

        this.scroll.on('scroll', function (position) {
          if(position.y > 30) {
            _this.topText = '释放立即刷新'
          }else{
            _this.topText = '下拉刷新'
          }
        });
        this.scroll.on('pullingDown', () => {
          _this.searchCondition={
            curpage:1,
            pagesize:4
          };
          _this.topText = '下拉刷新';
          _this.getData(this.searchDate.startDate,this.searchDate.endDate);
          this.scroll.finishPullDown();
          this.scroll.refresh();
          _this.successTips();
        })
        this.scroll.on('pullingUp', () => {
          if(_this.isHaveMore){
            _this.isNoInfo=false;
            _this.bottomText = '加载中...';
            _this.bottomText = '查看更多';
            _this.getMore();
          }else{
            if(_this.pageList.length > 0) {
              _this.bottomText='';
            }else{
              _this.isNoInfo=true;
              _this.bottomText='暂无数据';
            }
          }
          this.scroll.finishPullUp();
          this.scroll.refresh();
        })
      })
    },
    getMore() {
      if(this.isHaveMore){
        this.searchCondition.curpage = parseInt(this.searchCondition.curpage) + 1;
        this.getMoreRecords();
      }
    },
    getMoreRecords() {
      let _this=this;
      this.$ajax('get',baseURL + '/account/myloan?pagesize='+this.searchCondition.pagesize+'&'+'curpage='+this.searchCondition.curpage+'&startDate='+this.searchDate.startDate+'&endDate='+this.searchDate.endDate,'',function(data){
        _this.$nextTick(function () {
          //_this.pageList=data.vlist;
          for(var i=0;i<data.list.length;i++){
            _this.pageList.push(data.list[i]);
          }
          if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
            _this.isHaveMore=true;
            _this.isNoInfo=false;
            _this.bottomText='查看更多';
          }else{
            _this.isHaveMore=false;
            if(_this.pageList.length > 0) {
              _this.bottomText='';
            }else{
              _this.isNoInfo=false;
              _this.bottomText='暂无数据';
            }
          }
        })
      })
    },
    successTips () {
      let _this=this;
      this.refreshSuccess=true;
      setTimeout(function () {
        _this.refreshSuccess=false;
      }, 2000);
    },
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    //初始化时计算当前时间的上个月某天
    getPreMonth() {
      let date = this.endDate;
      let arr = date.split('-');
      let year = arr[0]; //获取当前日期的年份
      let month = arr[1]; //获取当前日期的月份
      let day = arr[2]; //获取当前日期的日
      let days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      let year2 = year;
      let month2 = parseInt(month) - 1;
      if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
          day2 = days2;
      }
      if (month2 < 10) {
          month2 = '0' + month2;
      }
      let t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
    }
  },
  created () {
    let nowDay=new Date();
    let y=nowDay.getFullYear();
    let m=nowDay.getMonth()+1;
    let d=nowDay.getDate();
    if(m<10){m='0'+m}
    if(d<10){d='0'+d}
    //this.startDate=y+'-'+m+'-'+d;
    //this.endDate=y+'-'+m+'-'+d;
    this.endDate=y+'-'+m+'-'+d;
    this.startDate = this.getPreMonth();


    this.searchDate.startDate=this.startDate.replace(/[-]/ig,"");
    this.searchDate.endDate=this.endDate.replace(/[-]/ig,"");
    this.getData(this.searchDate.startDate,this.searchDate.endDate);
  },
  mounted() {

  },
}
</script>

<style scoped lang="stylus">
.myLoans
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .queryContainer
    height 50px
    line-height 50px
    background #ffffff
    padding 10px
    position relative
    position fixed
    z-index 1
    top 0
    width 100%
    input
        background #FAFAFA
        border 1px solid #E9E9E9
        border-radius 6px
        height 34px
        width 98px
        padding 0 4px
    .mint-button--small
        background #FA7009
        border-radius 6px
        color #ffffff
        height 34px
        position absolute
        top 19px
        right 30px
        width 74px
  .titleBar
    padding 0 10px
    height 44px
    line-height 44px
    background #ffffff
    border-bottom 1px solid #f2f2f2
    text-align center
    .icon-back
      position absolute
      left 10px
      padding 13px 10px 10px 10px
      font-size 20px
    .search-btn
      position absolute
      right 10px
      padding 0 10px
      font-size 15px
    .title-text
      font-size 17px
      font-weight 500
      color #000
  .content
    position fixed
    top 80px
    left 0
    right 0
    bottom 0
    overflow hidden
    .bottom-tip
      background #f6f6f6
    .item-wrapper
      position relative
      overflow hidden
      padding 0 10px
      margin-bottom 15px
      height 144px
      background #ffffff
      .title
        padding 12px 10px
        font-size 14px
        color #888888
      .item-detail
        padding 0 10px 12px 10px
        .item-row
          display flex
          height 24px
          line-height 24px
          text-align center
          .item
            flex 1
            font-size 14px
            color #888888
            &:first-child
              text-align left
          .item-title
            font-size 12px
            color #bbbbbb
      .repay-plan-wrapper
        padding 0 10px
        height 40px
        line-height 40px
        border-top 1px dotted #dddddd
        overflow hidden
        font-size 12px
        letter-spacing 0.92px
        .periods
          float left
          height 40px
          line-height 40px
          color #888888
        .btn
          float right
          height 40px
          line-height 40px
          color #fa7009
          text-decoration underline
      .state
        position absolute
        top 0
        right 0
        width 64px
        height 64px
        background url('images/state.png') no-repeat
        background-size cover
      .tips
        position absolute
        top 0
        right 0
        width 40px
        height 40px
</style>
