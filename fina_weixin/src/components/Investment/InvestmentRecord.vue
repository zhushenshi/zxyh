<template>
  <div class="transaction">
	 <div class="MyHeader"  v-if="!isWeixin"><MyHeader :title="maintitle" :bgColor="'#ffffff'" textColor="#000"></MyHeader></div>
      <!-- <div class="transactionTab borderTop">
          <div :class="{tabItems:true,tabActive:choseType[0].tabActive}" @click="choseSeries(1)">新手专享</div>
          <div :class="{tabItems:true,tabActive:choseType[1].tabActive}" @click="choseSeries(2)">抵押系列</div>
          <div :class="{tabItems:true,tabActive:choseType[2].tabActive}" @click="choseSeries(3)">信贷系列</div>
      </div> -->
      <div class="inverstmentQuery" :style="{top:isWeixin?'0px':'64px'}">
            <div :class="{queryItems:true,queryActive:queryType[1].queryActive}" @click="queryInfo(1)">
                <span>待回款</span>
            </div>
            <div :class="{queryItems:true,queryActive:queryType[2].queryActive}" @click="queryInfo(2)">
                <span>已还款</span>
            </div>
            <div :class="{queryItems:true,queryActive:queryType[0].queryActive}" @click="queryInfo(0)">
                <span>已失效</span>
            </div>
      </div>
      <div class="transactionSwipper" ref="transactionSwipper" :style="{top:isWeixin?'44px':'108px'}">
          <div class="content" ref="content">
                <div class="top-tip">
                    <span class="refresh-hook">{{topText}}</span>
                </div>
                <div class="recordsContentItems" v-for="(list,index) in pageList" :key="index">
                        <div class="itemsFooter">
                            <img class="icon" :src="iconSrc"/>
                            <span class="infos">{{list.crmName}}</span>
                            <span :class="query!=1||is_current!=1?'right':'infoTime'" >{{list.createTime | dateTimeToDate}}</span>
                            <span class="right currentBtn" v-if="is_current==1&&query==1" @click="Redeem(list.orderid)">赎回</span>
                        </div>                    
                        <div class="itemsBody" @click="evenFlag && toRepaymentPlan('/home/accountTab/investmentRecord/repaymentPlan',list.orderid)">
                            <div class="items">
                                <p class="itemsWord" v-text="list.contractMoney"></p>
                                <p class="itemsTitle">我的投资</p>
                            </div>
                            <div class="items" v-if="is_current==0">
                                <p class="itemsWord">{{list.periods+list.periodsUnit}}</p>
                                <p class="itemsTitle">项目期限</p>
                            </div>
                            <div class="items">
                                <p class="itemsWord">{{list.realyRate}}%</p>
                                <p class="itemsTitle">预期年化</p>
                                <span v-show="query!=0" class="icon-more"></span>
                                <span v-show="query==0" class="imgbg"></span>
                            </div>
                        </div>
                </div>
                <div class="bottom-tip">
                    <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
                </div>
          </div>
      </div>
      <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
      <!-- <home-tab></home-tab> -->
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
import icon1 from '@/assets/images/sy_12@3x.png'
import icon2 from '@/assets/images/sy_14@3x.png'
import icon3 from '@/assets/images/sy_11@3x.png'
import HomeTab from '@/components/home/HomeTab.vue'
export default {
  data() {
    return {
        evenFlag: true,//事件标志未
        orderid: '',
        chose: 1,
        choseType:[{tabActive:true},{tabActive:false},{tabActive:false}],
        queryType:[{queryActive:false},{queryActive:true},{queryActive:false}],
        query: 1,
        pageList: [],
        searchCondition:{
          curpage:1,
          pagesize:10
        },
        isHaveMore: false,
        topText: '下拉刷新',
        bottomText: '查看更多',
        refreshSuccess: false,
        isNoInfo:false,
        maintitle:'',
        is_current:''
    }
  },
  created () {
      this.chose=this.$route.params.series
    //   this.chose=1
    this.is_current=this.$route.query.is_current
    console.log(this.$route.query.is_current)
      this.maintitle=this.$route.query.title
      this.getRecords();
  },
  mounted () {
    this.scroll='';
  },
  computed: {
    iconSrc() {
      if (this.chose == 1) {
        return icon1
      }else if (this.chose == 2) {
        return icon2
      }else if (this.chose == 3) {
        return icon3
      }
    }
  },
  methods: {
    _initScroll () {
        this.$nextTick(() => {
        let This=this;
        if(this.$refs.content){
            if(this.$refs.content.offsetHeight<this.$refs.transactionSwipper.offsetHeight){
                this.$refs.content.style.minHeight=this.$refs.transactionSwipper.offsetHeight+1+'px'
            }
        }else{
            return
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
       
        this.scroll.on('scroll', function (position) {
            if(position.y > 30) {
                This.topText = '释放立即刷新'
            }else{
                This.topText = '下拉刷新'
            }
        });
        this.scroll.on('pullingDown', () => {
          This.searchCondition={
            curpage:1,
            pagesize:10
          };
          This.topText = '下拉刷新';
          This.getRecords();
          this.scroll.finishPullDown();
          this.scroll.refresh();
          This.successTips();
        })
        this.scroll.on('pullingUp', () => {
          if(This.isHaveMore){
              This.isNoInfo=false;
              This.bottomText = '加载中...';
              This.bottomText = '查看更多';
              This.getMore();
          }else{
            if(This.pageList.length > 0) {
              This.bottomText='';
            }else{
              This.isNoInfo=true;
              This.bottomText='暂无数据';
            }
          }
          this.scroll.finishPullUp();
          this.scroll.refresh();
        })
    })
    },
    choseSeries (type) {
        this.chose=type;
        this.searchCondition={
          curpage:1,
          pagesize:10
        };
        this.choseType=[{tabActive:false},{tabActive:false},{tabActive:false}]
        this.choseType[type-1].tabActive=true;
        this.getRecords();
    },
    queryInfo (type) {
        this.query=type;
        if(type==0){
            this.evenFlag=false;
        }else{
            this.evenFlag=true;
        }
        this.searchCondition={
          curpage:1,
          pagesize:10
        };
        this.queryType=[{queryActive:false},{queryActive:false},{queryActive:false}];
        this.queryType[type].queryActive=true;
        this.getRecords();
    },
    getRecords () {
        let records=this;
        this.$ajax('get',baseURL +'/account/invests?ptype='+this.chose+'&pagesize='+this.searchCondition.pagesize+'&'+'curpage='+this.searchCondition.curpage+'&'+'status='+this.query,'',function(data){
            records.$nextTick(function () {
                records.pageList=data.list;
                records.isNoInfo=false;
                if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
                    records.isHaveMore=true;
                    records.isNoInfo=false;
                    records.bottomText='查看更多';
                }else{
                    records.isHaveMore=false;
                    if(records.pageList.length > 0) {
                      records.bottomText='';
                    }else{
                      records.isNoInfo=true;
                      records.bottomText='暂无数据';
                    }
                }
                if (records.scroll) {
                  records.scroll.destroy();
                }
                records._initScroll();
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
        this.$ajax('get',baseURL + '/account/invests?ptype='+this.chose+'&pagesize='+this.searchCondition.pagesize+'&'+'curpage='+this.searchCondition.curpage+'&'+'status='+this.query,'',function(data){
            records.$nextTick(function () {
                for(var i=0;i<data.list.length;i++){
                    records.pageList.push(data.list[i]);
                }
                if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
                    records.isHaveMore=true;
                    records.isNoInfo=false;
                    records.bottomText='查看更多';
                }else{
                    records.isHaveMore=false;
                    if(records.pageList.length > 0) {
                      records.bottomText='';
                    }else{
                      records.isNoInfo=true;
                      records.bottomText='暂无数据';
                    }
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
    toRepaymentPlan (url,orderid) {
        this.orderid=orderid;
        sessionStorage.setItem('$orderId', orderid);
        this.$router.push({name: 'RepaymentPlan',params: {orderid:this.orderid}});
    },
    //赎回
    Redeem(orderID){ 
        let This=this
        this.$ajax('',baseURL + '/redeem?orderID='+orderID,'', function (data) {
            if(data.status=="200"){
                This.getRecords()
                This.$Toast({message:data.msg,position:'bottom'})
            }
        })
        
        },
  },
  components: {
    HomeTab
  }
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.transaction
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #F6F6F6
    .transactionTab
        height 54px
        line-height 54px
        background #ffffff
        display flex
        display -webkit-box
        display -webkit-flex
        position fixed
        width 100%
        z-index 1
        top 64px
        text-align center
        .tabItems
            flex 1
            font-family: PingFangSC-Medium
            font-size 16px
            color #888888
            letter-spacing 1.23px
            position relative
        .tabItems:after
            content: ''
            position absolute
            bottom 3px
            background transparent
            border-radius 8px
            height 4px
            width 60%
            left 20%
        .tabActive
            color #FA7009
        .tabActive:after
            background-image linear-gradient(-180deg, #F56A3B 0%, #FD7F22 100%)
    .transactionSwipper
        position fixed
        top 108px
        bottom 0
        left 0
        right 0
        overflow:hidden
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
    .inverstmentQuery
        position fixed
        z-index 1
        top 64px
        height 44px
        line-height 44px
        width 100%
        text-align center
        background #ffffff
        border-top 1px solid #ddd
        font-size 0
        .queryItems
            display inline-block
            width 33%;
            font-family: PingFangSC-Medium
            font-size 14px
            color #888888
            letter-spacing 1px
            position relative
        .queryItems:after
            content ""
            position absolute
            top 15px
            right 0
            width 1px
            height 14px
            background #E9E9E9
        .queryItems:last-child:after
            display none
        .queryActive
            color #FA7009
    .bottom-tip
      background #F6F6F6
    .recordsContentItems
        background #ffffff
        position relative
        padding 10px 10px 0
        margin-bottom 10px
        .itemsBody
            display flex
            display -webkit-box
            display -webkit-flex
            text-align center
            .items
                flex 1
                font-family PingFangSC-Medium
                font-size 12px
                color #BBBBBB
                letter-spacing 0.86px
                margin 10px 0
                position relative
                .itemsWord
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #888888
                    letter-spacing 1.38px
                .icon-more
                    position absolute
                    right 0
                    top 10px
                    font-size 20px
                .imgbg
                    position absolute
                    width 60px
                    height 60px
                    bg-image(out)
                    background-repeat no-repeat
                    background-size contain
                    top -20px
                    right -10px
        .itemsFooter
            height 40px
            line-height 40px
            border-bottom 1px dashed #ddd
            font-family PingFangSC-Regular
            font-size 12px
            color #333333
            letter-spacing 0.92px
            .right
                float right
            .icon
              width 16px
              margin-right 6px
              margin-left 15px
              position relative
              top -2px
.infoTime
    margin-left 20px
.currentBtn
    background #f37723
    color #ffffff
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    position: relative;
    top: 5px;
</style>
