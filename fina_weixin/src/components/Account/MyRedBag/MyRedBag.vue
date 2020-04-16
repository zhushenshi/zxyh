<template>
  <div class="myRedBag">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'优惠券包'"></MyHeader></div>
    <mt-navbar v-model="selected" class="borderTop" :style="{top:isWeixin?0:'64px'}">
      <mt-tab-item id="redBag">
        <div class="title">红包<span class="line"></span></div>
      </mt-tab-item>
      <div class="line"></div>
      <mt-tab-item id="interestCoupon">
        <div class="title">加息券<span class="line"></span></div>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="redBag">
        <div class="transactionSwipper" ref="transactionSwipper" :style="{top:isWeixin?'51px':'115px'}">
          <div class="redContainer" ref="redContainer">
            <div class="top-tip">
              <span class="refresh-hook">{{topText}}</span>
            </div>
            <div class="item" v-for="(item, index) in pageList" :key="index" :class="item.status === 1 ? 'active' : ''">
              <div class="top">
                <div class="top_l">
                  <p class="money"><sub>￥</sub>{{item.amount | moneyToFixed(2)}}</p>
                  <p class="condition">单笔投资满{{item.limit | moneyToFixed(2)}}元起用</p>
                </div>
                <div class="top_r">
                  <p class="title">{{item.type==1?'新手注册红包':item.type==2?'新手投资红包':item.type==3?'邀请注册红包':item.type==4?'邀请投资红包':item.type==5?'活动红包':'红包'}}<span>{{item.investLimit == 15 ? "(新手标可用)" : "(全品类可用)"}}</span></p>
                  <p class="condition">折扣率100%;使用期限<span v-text="defineInvestLimit(item.investLimit)"></span></p>
                  <p class="time" v-if="item.endDate">{{item.startDate | dateTimeToDate}}至{{item.endDate | dateTimeToDate}}</p>
                  <p class="time" v-else>永久有效</p>
                </div>
              </div>
              <div class="bot">
                <span class="round round_l"></span>
                <span class="round round_r"></span>
                <span class="btn" @click="_toInvestment(item.status)">{{btnText[item.status]}}</span>
              </div>
            </div>
            <div class="bottom-tip">
              <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
            </div>
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="interestCoupon">
        <div class="transactionSwipper" ref="transactionSwipper2" :style="{top:isWeixin?'51px':'115px'}">
          <div class="inteContainer" ref="inteContainer">
            <div class="top-tip">
              <span class="refresh-hook">{{topText}}</span>
            </div>
            <div v-if="selected == 'interestCoupon'">
              <div v-for="(item, index) in pageList" :key="index" class="item" :class="borderTop(item.color, item.status)">
                <div class="top">
                  <div class="top_l">
                    <p class="value">{{item.riserate | moneyToFixed(0)}}<sub>{{parseFloat(item.riserate).toFixed(2).slice(-3,item.riserate.length)}}%</sub></p>
                  </div>
                  <div class="top_r">
                    <p class="title">{{item.color}}年化加息券</p>
                    <p class="time" v-if="item.endDate">{{item.startDate | dateTimeToDate}}至{{item.endDate | dateTimeToDate}}</p>
                    <p class="time" v-else>永久有效</p>
                  </div>
                </div>
                <div class="bot">
                  <span class="round round_l"></span>
                  <span class="round round_r"></span>
                  <div class="rule" @click="_toUseRules(item.color)"><span class="icon-question"></span>使用规则</div>
                  <div class="btn" @click="_toInvestment(item.status)">{{btnText[item.status]}}</div>
                </div>
              </div>
            </div>
            <div class="bottom-tip">
              <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
    <!-- <home-tab></home-tab> -->
    <router-view class="pageView"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
import HomeTab from '@/components/home/HomeTab.vue'

export default {
  name: 'MyRedBag',
  data() {
    return {
      vtype: 0, //0红包 1加息券
      searchCondition:{
          curpage:1,
          pagesize:5
      },
      isHaveMore: false,
      topText: '下拉刷新',
      bottomText: '查看更多',
      refreshSuccess: false,
      pageList: [],
      selected: 'redBag',
      colorCls: {"蓝色": "blue", "金色": 'gold', '红色': 'red', '橙色': 'orange'},
      btnText: {'0':'已失效','1':'立即使用','2':'已使用'},
      isNoInfo:false
    }
  },
  watch: {
    selected: function(nVal, oVal) {
      if(nVal == 'redBag'){
        this.vtype = 0;
      }else if(nVal == 'interestCoupon'){
        this.vtype = 1;
      }
      this.searchCondition.curpage = 1;
      this.searchCondition.pagesize = 5;
      this.isHaveMore = false;
      this.topText = '下拉刷新';
      this.bottomText = '查看更多';
      this.isNoInfo=false;
      this.refreshSuccess = false;
      this.pageList = [];
      this.getData();
    }
  },
  methods: {
    defineInvestLimit(days) {
      if(days == 15 || days == 365) {
        return days+'天';
      }else {
        return days + '天及以上'
      }
    },
    getData () {
        let _this=this;
        this.$ajax('get',baseURL + '/account/voucher?vtype='+this.vtype+'&pagesize='+this.searchCondition.pagesize+'&'+'curpage='+this.searchCondition.curpage,'',function(data){
            _this.$nextTick(function () {
                _this.pageList=data.vlist;
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
                if(_this.scroll){
                   _this.scroll.destroy();
                }
                 _this._initScroll();
            })
        })
    },
    _initScroll() {
      let _this=this;
      this.$nextTick(() => {
        if(this.vtype === 0){
          if(this.$refs.redContainer.offsetHeight<this.$refs.transactionSwipper.offsetHeight){
            this.$refs.redContainer.style.minHeight=this.$refs.transactionSwipper.offsetHeight+1+'px'
          }
          this.scroll=new BScroll(this.$refs.transactionSwipper, {
              click: true,
              probeType: 1,
              pullDownRefresh: {
                threshold: 30,
                stop: 20
              },
              pullUpLoad: {
                threshold: -30
              }
          });
        }else if(this.vtype === 1){
          if(this.$refs.inteContainer.offsetHeight<this.$refs.transactionSwipper2.offsetHeight){
            this.$refs.inteContainer.style.minHeight=this.$refs.transactionSwipper2.offsetHeight+1+'px'
          }
          this.scroll=new BScroll(this.$refs.transactionSwipper2, {
              click: true,
              probeType: 1,
              pullDownRefresh: {
                threshold: 30,
                stop: 20
              },
              pullUpLoad: {
                threshold: -30
              }
          });
        }

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
            pagesize:5
          };
          _this.topText = '下拉刷新';
          _this.getData();
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
      this.$ajax('get',baseURL + '/account/voucher?vtype='+this.vtype+'&pagesize='+this.searchCondition.pagesize+'&'+'curpage='+this.searchCondition.curpage,'',function(data){
        _this.$nextTick(function () {
            for(var i=0;i<data.vlist.length;i++){
                _this.pageList.push(data.vlist[i]);
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
                  _this.isNoInfo=true;
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
    borderTop(color, status) {
      if(status != 1) {
        return;
      }
      if(!color){
        return;
      }
      return this.colorCls[color];
    },
    //立即使用-去投资界面
    _toInvestment(status) {
      if(status != 1) {
        return
      }
      this.$router.push('/home/Product');
    },
    _toUseRules(color) {
      this.$router.push({name: 'CouponRules',params: {color: color}});
    }
  },
  created() {
    //获取红包/优惠券
    this.getData();
  },
  components: {
    HomeTab
  }
}
</script>

<style scoped lang="stylus">
  .myRedBag
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background #f6f6f6
    .mint-navbar
      position fixed
      top 64px
      left 0
      bottom 0
      right 0
      height 50px
      z-index 1
      border-bottom 1px solid #f2f2f2
      .line
        height 30px
        border-right 1px solid #efefef
        margin-top 10px
      .mint-tab-item
        border none
        &.is-selected
          .title
            color #FA7009
            .line
              display block
        .title
          position relative
          font-size 16px
          letter-spacing 1.56px
          color #AFAFAF
          font-weight 500
          .line
            display none
            height 4px
            width 45px
            margin 13px auto 0
            border-radius 8px
            background  linear-gradient(-180deg, #F56A3B 0%, #FD7F22 100%)
    .mint-tab-container
      .transactionSwipper
        position fixed
        top 115px
        bottom 0
        left 0
        right 0
        overflow hidden
        .redContainer
          padding 10px
          .bottom-tip
            background #f6f6f6
          .item
            height 140px
            margin-bottom 15px
            background #ffffff
            border-top 8px solid #b8b8b8
            border-radius 8px
            box-shadow 0 4px 5px 0 rgba(178,178,178,0.35)
            &.active
              border-top 8px solid #e54444
              .money
                color #e54444!important
              .btn
                border-color #e54444!important
                color #e54444!important
            .top
              height 95px
              display flex
              .top_l
                flex 1.5
                margin-top 28px
                margin-bottom 10px
                text-align center
                border-right 1px dotted #e4e4e4
                .money
                  font-size 34px
                  color #b8b8b8
                  sub
                    position relative
                    top -9px
                    font-size 18px
                .condition
                  line-height 24px
                  color #7d7d7d
                  font-size 8px
              .top_r
                flex 2
                margin-top 14px
                p
                  font-size 11px
                  padding-left 15px
                  color #8a8a8a
                  line-height 26px
                  &.title
                    font-size 16px
                    color #282828
                    span
                      font-size 12px
                      color #8a8a8a
                  @media screen and (width: 360px)
                    padding-left 5px
                  @media screen and (width: 375px)
                    padding-left 10px
            .bot
              position relative
              height 42px
              line-height 42px
              margin 0 10px
              border-top 1px dotted #e4e4e4
              text-align right
              .btn
                display inline-block
                width 82px
                height 25px
                text-align center
                line-height 25px
                color #b5b5b5
                border 1px solid #b5b5b5
                border-radius 5px
              .round
                position absolute
                top -10px
                width 16px
                height 16px
                border-radius 50%
                background #f6f6f6
                &.round_l
                  left -20px
                &.round_r
                  right -20px
        .inteContainer
          padding 10px
          .bottom-tip
            background #f6f6f6
          .item
            height 140px
            margin-bottom 15px
            background #ffffff
            border-top 8px solid #b8b8b8
            border-radius 8px
            box-shadow 0 4px 5px 0 rgba(178,178,178,0.35)
            &.blue
              border-top-color #1B6BCE
              .value
                color #1B6BCE!important
              .btn
                color #1B6BCE!important
                border-color #1B6BCE!important
              .title
                color #282828!important
              .time
                color #8a8a8a!important
            &.gold
              border-top-color: #D6B918
              .value
                color #D6B918!important
              .btn
                color #D6B918!important
                border-color #D6B918!important
              .title
                color #282828!important
              .time
                color #8a8a8a!important
            &.red
              border-top-color: #FF0000
              .value
                color #FF0000!important
              .btn
                color #FF0000!important
                border-color #FF0000!important
              .title
                color #282828!important
              .time
                color #8a8a8a!important
            &.orange
              border-top-color: #FA7009
              .value
                color #FA7009!important
              .btn
                color #FA7009!important
                border-color #FA7009!important
              .title
                color #282828!important
              .time
                color #8a8a8a!important
            .top
              height 95px
              display flex
              .top_l
                flex 1.2
                margin-top 28px
                padding-top 20px
                margin-bottom 10px
                text-align center
                border-right 1px dotted #e4e4e4
                .value
                  font-size 34px
                  color #949494
                  sub
                    position relative
                    top -7px
                    /*margin-left 4px*/
                    font-size 22px
              .top_r
                flex 2
                margin-top 28px
                text-align left
                p
                  padding-left 15px
                  line-height 26px
                  &.title
                    color #b8b8b8
                    font-size 16px
                  &.time
                    color #b8b8b8
                    font-size 11px
            .bot
              position relative
              height 42px
              line-height 42px
              margin 0 10px
              border-top 1px dotted #e4e4e4
              text-align right
              .rule
                float left
                color #8a8a8a
                font-size 13px
                .icon-question
                  position relative
                  top 3px
                  margin-right 4px
                  font-size 18px
                  color #8a8a8a
              .btn
                display inline-block
                width 82px
                height 25px
                text-align center
                line-height 25px
                color #b5b5b5
                border 1px solid #b5b5b5
                border-radius 5px
              .round
                position absolute
                top -10px
                width 16px
                height 16px
                border-radius 50%
                background #f6f6f6
                &.round_l
                  left -20px
                &.round_r
                  right -20px
</style>
