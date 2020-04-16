//还款计划
<template>
  <div class="repayPlan">
    <div class="fix-wrapper">
      <div class="titleBar" style="display:none">
        <span @click="goBack" class="icon-back"></span>
        <span class="title-text">还款计划</span>
      </div>
      <div class="project-name">
        借款项目：{{loanProject}}
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="paying">
          <div class="title">待还款<span class="line"></span></div>
        </mt-tab-item>
        <div class="line"></div>
        <mt-tab-item id="payed">
          <div class="title">已还款<span class="line"></span></div>
        </mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="paying">
        <div class="payingContainer" ref="payingContainer">
          <div ref="payingContainer1">
            <div class="top-tip">
              <span class="refresh-hook">{{topText}}</span>
            </div>
            <div class="container" v-for="(item, index) in pageList" :key="index">
              <div class="con_t">
                <div class="item-row">
                  <div class="item item-title">还款本金(元)</div>
                  <div class="item item-title">还款金额(元)</div>
                  <div class="item item-title">本期还款日</div>
                </div>
                <div class="item-row">
                  <div class="item">{{item.principal}}</div>
                  <div class="item">{{item.interest}}</div>
                  <div class="item">{{item.overdueday}}</div>
                </div>
              </div>
              <div class="con_b">
                <div class="periods">期数：{{item.curperiods}}/{{item.totalperiods}}</div>
                <div :class="{btn:true,payStatusStyle:item.payStatus=='5'?true:false}" @click="toWantPay(item.id,item.payStatus)" v-text="checkPayStatus(item.payStatus)"></div>
              </div>
            </div>
            <div class="bottom-tip">
              <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="payed">
        <div class="payedContainer" ref="payedContainer">
          <div ref="payedContainer1">
            <div class="top-tip">
              <span class="refresh-hook">{{topText}}</span>
            </div>
            <div class="container"  v-for="(item, index) in pageList" :key="index">
              <div class="con_t">
                <div class="item-row">
                  <div class="item item-title">还款本金(元)</div>
                  <div class="item item-title">还款利息(元)</div>
                  <div class="item item-title">本期还款日</div>
                  <div class="item item-title">实际还款日</div>
                </div>
                <div class="item-row">
                  <div class="item">{{item.principal}}</div>
                  <div class="item">{{item.interest}}</div>
                  <div class="item">{{item.overdueday}}</div>
                  <div class="item">{{item.repayday}}</div>
                </div>
              </div>
              <div class="con_b">
                <div class="periods">期数：{{item.curperiods}}/{{item.totalperiods}}</div>
                <div class="actual-money">实际还款(元)：{{item.repayamount}}</div>
              </div>
              <div class="icon"></div>
            </div>
            <div class="bottom-tip">
              <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
    <home-tab></home-tab>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
import HomeTab from '@/components/home/HomeTab.vue'
export default {
  data() {
    return {
      payStatusStyle: false,
      payStatusText:"还款",
      crmId:'',
      loanProject: '',
      type: 0, //0待还 1已还
      searchCondition:{
          curpage:1,
          pagesize:5
      },
      isHaveMore: false,
      topText: '下拉刷新',
      bottomText: '查看更多',
      isNoInfo:false,
      refreshSuccess: false,
      pageList: [],
      selected: 'paying'
    }
  },
  created() {
    this.crmId = this.$route.params.crmId;
    if(!this.crmId) {
      this.crmId = sessionStorage.getItem('crmId');
    }
    this.getData();
  },
  watch: {
    selected: function(nVal, oVal) {
      if(nVal == 'paying'){
        this.type = 0;
      }else if(nVal == 'payed'){
        this.type = 1;
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
    checkPayStatus (type) {
      if(type=="5"){
        this.payStatus=true;
        return this.payStatusText="还款中";
      }else{
        this.payStatus=false;
        return this.payStatusText="还款"
      }
    },
    getData() {
      let _this=this;
      this.$ajax('get',baseURL +  '/account/myloan/repayplan?type='+this.type+'&crmId='+this.crmId+'&pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage+'&startDate=&endDate=','',function(data){
          _this.$nextTick(function () {
              _this.pageList=data.list;
              _this.loanProject = data.name;
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
              if(_this.scroll) {
                _this.scroll.destroy();
              }
              _this._initScroll();
          })
      })
    },
    _initScroll() {
      let _this=this;
      this.$nextTick(() => {
        if(this.type === 0){
          if(this.$refs.payingContainer1.offsetHeight<this.$refs.payingContainer.offsetHeight){
            this.$refs.payingContainer1.style.minHeight=this.$refs.payingContainer.offsetHeight+1+'px'
          }
          this.scroll=new BScroll(this.$refs.payingContainer, {
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
        }else if(this.type === 1){
           if(this.$refs.payedContainer1.offsetHeight<this.$refs.payedContainer.offsetHeight){
            this.$refs.payedContainer1.style.minHeight=this.$refs.payedContainer.offsetHeight+1+'px'
          }
          this.scroll=new BScroll(this.$refs.payedContainer, {
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
      this.$ajax('get',baseURL + '/account/myloan/repayplan?type='+this.type+'&crmId='+this.crmId+'&pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage+'&startDate=&endDate=','',function(data){
          _this.$nextTick(function () {
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
    toWantPay(id,type) {
      if(type=="5"){
        return;
      }
      var _this = this;
      this.$ajax('post',baseURL + '/account/repaynow?paycontrolId='+id,'',function(data){
        window.Vue.$sina=data.redirection;
        // _this.$router.push(_this.$router.history.current.path+'/sina');
        window.location=data.redirection
      })
    },
    goBack() {
      this.$router.go(-1);//返回上一层
    }
  },
  mounted() {
  },
  components: {
    HomeTab
  }
}
</script>

<style scoped lang="stylus">
.repayPlan
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .fix-wrapper
    position fixed
    top 0
    left 0
    right 0
    z-index 2
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
      .title-text
        font-size 17px
        font-weight 500
        color #000
    .project-name
      height 44px
      line-height 44px
      border-bottom 1px solid #f2f2f2
      text-align center
      font-size 14px
      color #646464
      background #fff
    .mint-navbar
        height 49px
        margin-bottom 10px
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
    .payingContainer
      position fixed
      top 105px
      left 0
      right 0
      bottom 60px
      .bottom-tip
        background #f6f6f6
      .container
        padding 0 20px
        height 108px
        margin-bottom 15px
        border-top 1px solid #e9e9e9
        border-bottom 1px solid #e9e9e9
        background #fff
        .con_t
          .item-row
            display flex
            padding 8px 0 4px 0
            text-align center
            font-size 13px
            color #333333
            .item
              flex 1
              &.item-title
                color #959595
            .item:first-child
              text-align left
            .item:last-child
              text-align right
        .con_b
          height 45px
          line-height 45px
          overflow hidden
          border-top 1px dotted #e8e8e8
          .periods
            float left
            font-size 13px
            color #757575
          .btn
            float right
            width 67px
            height 25px
            margin-top 10px
            text-align center
            line-height 25px
            border-radius 5px
            background #fa7009
            color #ffffff
            font-size 13px
          .payStatusStyle
            background #dddddd
    .payedContainer
      position fixed
      top 105px
      left 0
      right 0
      bottom 60px
      .bottom-tip
        background #f6f6f6
      .container
        position relative
        padding 0 20px
        height 117px
        margin-bottom 15px
        border-top 1px solid #e9e9e9
        border-bottom 1px solid #e9e9e9
        background #fff
        .con_t
          .item-row
            display flex
            padding 11px 0 7px 0
            text-align center
            font-size 13px
            color #333333
            .item
              flex 1
              &.item-title
                color #959595
            .item:first-child
              text-align left
            .item:last-child
              text-align right
        .con_b
          height 45px
          line-height 45px
          overflow hidden
          border-top 1px dotted #e8e8e8
          .periods
            float left
            font-size 13px
            color #8b8b8b
          .actual-money
            float right
            color #8b8b8b
            font-size 13px
        .icon
          position absolute
          top 0
          right 0
          width 55px
          height 55px
          background url('images/state.png') no-repeat
          background-size cover

</style>
