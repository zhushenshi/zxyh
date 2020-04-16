<template>
  <div class="transaction">
      <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'交易记录'" bgColor="#FFFFFF" textColor="#000"></MyHeader></div>
      <div class="queryContainer">
          <label for=""><input type="text" name="beginTime" placeholder="开始时间" v-model="startDate" readonly @click="openPicker(0)" onfocus="this.blur()"></label>
          <span style="margin:0 4px">-</span>
          <label for=""><input type="text" name="endTime" placeholder="结束时间" v-model="endDate" readonly @click="openPicker(1)" onfocus="this.blur()"></label>
          <mt-button size="small" @click="queryConfirm">查询</mt-button>
      </div>
      <div class="transactionTab" :style="{top:isWeixin?'70px':'134px'}">
          <div :class="{tabItems:true,tabActive:choseType[0].tabActive}" @click="choseSeries(0)">全部</div>
          <div :class="{tabItems:true,tabActive:choseType[1].tabActive}" @click="choseSeries(1)">充值</div>
          <div :class="{tabItems:true,tabActive:choseType[2].tabActive}" @click="choseSeries(2)">提现</div>
      </div>
      <div class="transactionSwipper" ref="transactionSwipper" :style="{top:isWeixin?'134px':'198px'}">
          <div class="content" ref="content">
            <div class="contentItems" v-for="(item,index) in filterList" :key="index">
                <div class="itemsLeft">
                    <p class="itemsType">{{item.trade_type==0?('充值'+(item.status==0?'确认中':item.status==1?'成功':'失败')):item.trade_type==1?('提现'+(item.status==1?'成功':(item.status==2||item.status==3||item.status==5)?'失败':'审核中')):'其他'}}</p>
                    <!-- <p class="itemsType">{{item.DESLINE1}}</p> -->
                    <p class="itemsTime">{{item.createFormatDate}}</p>
                </div>
                <div class="itemsRight">
                    <p :class="{itemsAll:true,success:checkState(item.status)}">{{item.amount}}</p>
                </div>
            </div>
            <div class="noRecord" v-show="filterList.length==0">暂无数据</div>
          </div>
      </div>
      <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
      <!-- <home-tab></home-tab> -->
      <mt-datetime-picker ref="picker" :endDate = 'mindata' v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm"></mt-datetime-picker>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
import HomeTab from '@/components/home/HomeTab.vue'
export default {
  data() {
    return {
        success:false,
        mindata:new Date(),
        chose: 0,
        pickerVisible: '',
        choseType:[{tabActive:true},{tabActive:false},{tabActive:false}],
        startDate: '',
        endDate: '',
        timeType: 0,
        pageList: [],
        filterList: [],
        searchCondition:{
          curpage:1,
          pagesize:20
        },
        isHaveMore: false,
        topText: '下拉刷新',
        bottomText: '查看更多',
        refreshSuccess: false
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
      this.endDate=y+'-'+m+'-'+d;
      this.startDate = this.getPreMonth();
      this.getRecords();
  },
  mounted () {
    this.scroll='';
  },
  methods: {
    checkState (text) {
        if(text==1){
            return this.success=true;
        }
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
        let differ=this.getTimeDiffer(this.endDate,this.startDate);
        if(differ>=30){
            this.$Toast({message:'最多只能查询29天的记录！',position: 'bottom'});
            return;
        }
        this.choseSeries(this.chose);
    },
    getTimeDiffer ($time1, $time2) {
        var time1 = arguments[0], time2 = arguments[1];
        time1 = Date.parse(time1)/1000;
        time2 = Date.parse(time2)/1000;
        var time_ = time1 - time2;
        return (time_/(3600*24));
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
    choseSeries (type) {
        this.choseType=[{tabActive:false},{tabActive:false},{tabActive:false}]
        this.choseType[type].tabActive=true;
        this.chose=type;
        this.getRecords();
    },
    filter () {
        this.filterList=[];
        if(this.chose===0){
            this.filterList=this.pageList;
        }else{
            for(var i=0;i<this.pageList.length;i++){
                if(this.chose==1&&Number(this.pageList[i].trade_type==0)){//充值
                    this.filterList.push(this.pageList[i]);
                }else if(this.chose==2&&Number(this.pageList[i].trade_type==1)){//提现
                    this.filterList.push(this.pageList[i]);
                }
            }
        }
    },
    _initScroll () {
        this.$nextTick(() => {
        let This=this;
        if(this.$refs.content.offsetHeight<this.$refs.transactionSwipper.offsetHeight){
          this.$refs.content.style.minHeight=this.$refs.transactionSwipper.offsetHeight+1+'px'
        }
        this.scroll=new BScroll(this.$refs.transactionSwipper, {
            click: true,
            probeType: 1,
        });
    })
    },
    getRecords () {
        let records=this;
        this.$ajax('get',baseURL + '/account/deallist?pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage+'&startDate='+this.startDate+'&endDate='+this.endDate,'',function(data){
            records.$nextTick(function () {
                records.pageList=data.pageInfo.list;
                if(data.pageInfo.list.length > 0 && data.msg) {
//                   records.$Toast({message:data.msg,position: 'bottom'})
                }
                records._initScroll();
                records.filter();
            })
        })
    },
    getMore () {
        if(this.isHaveMore){
            this.searchCondition.curpage = parseInt(this.searchCondition.curpage) + 1;
            this.getMoreRecords();
        }
    },
    getMoreRecords () {
        let records=this;
        this.$ajax('get',baseURL + '/account/deallist?pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage+'&startDate='+this.startDate+'&endDate='+this.endDate,'',function(data){
            records.$nextTick(function () {
                for(var i=0;i<data.list.length;i++){
                    records.pageList.push(data.pageInfo.list[i]);
                }
            })
        })
    },
    successTips () {
        let This=this;
        this.refreshSuccess=true;
        setTimeout(function () {
            This.refreshSuccess=false;
        }, 2000);
    },
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
      day2=parseInt(day2)+1;
      if(day2<10){
          day2='0'+day2;
      }
      if (month2 < 10) {
          month2 = '0' + month2;
      }
      let t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
    }
  },
  components: {
    HomeTab
  }
}
</script>

<style scoped lang="stylus">
.transaction
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #F6F6F6
    .queryContainer
        height 50px
        line-height 50px
        background #ffffff
        padding 10px
        position relative
        position fixed
        z-index 1
        width 100%
        border-top 1px solid #F5F5F5
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
    .transactionTab
        height 54px
        line-height 60px
        background #ffffff
        display flex
        display -webkit-box
        display -webkit-flex
        position fixed
        width 100%
        z-index 1
        top 134px
        text-align center
        .tabItems
            flex 1
            font-family PingFangSC-Medium
            font-size 18px
            color #AFAFAF
            letter-spacing 1.96px
            position relative
        .tabItems:after
            content: ''
            position absolute
            bottom 3px
            background transparent
            border-radius 8px
            height 4px
            width 30%
            left 35%
        .tabActive
            color #FA7009
        .tabActive:after
            background-image linear-gradient(-180deg, #F56A3B 0%, #FD7F22 100%)
    .transactionSwipper
        position fixed
        top 198px
        bottom 0px
        left 0
        right 0
        overflow hidden
        .contentItems
            height 60px
            padding 10px
            background #ffffff
            display flex
            display -webkit-box
            display -webkit-flex
            position relative
            .itemsLeft
                flex .5
                .itemsType
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #3D3D3D
                    letter-spacing 1.96px
                    margin-top 10px
                    margin-bottom 4px
                .itemsTime
                    font-family PingFangSC-Medium
                    font-size 12px
                    color #919191
                    letter-spacing 0.51px
            .itemsRight
                flex .5
                text-align right
                .itemsAll
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #ACACAC
                    letter-spacing 0.76px
                    margin-top 20px
                .success
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #FA7009
                    letter-spacing 0.76px
        .contentItems:after
            content ''
            position absolute
            width 100%
            height 1px
            background #F4F4F4
            bottom 0
            left 0
    .transactionTab:before
        content: ''
        position absolute
        width 100%
        height 10px
        background #F6F6F6
.noRecord
    position absolute
    width 100%
    height 50px
    line-height 50px
    top 50%
    margin-top -25px
    text-align center
    font-size 12px
    color #afafaf
</style>
