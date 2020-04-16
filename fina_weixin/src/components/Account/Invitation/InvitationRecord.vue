<!--邀请记录-->
<template>
	<div class="invitationRecord">
     <MyHeader title="邀请记录" v-if="!isWeixin"></MyHeader>
    <div class="topDiv" :style="{top:isWeixin?0:'64px'}">
      <p>共邀请好友</p>
      <p class="totalCount"><span>{{totalCount}}</span>人</p>
    </div>
    <div class="interval" :style="{top:isWeixin?'120px':'184px'}"></div>
    <div class="recordcntHead" :style="{top:isWeixin?'130px':'194px'}">
      <div>注册时间</div>
      <div>用户名</div>
    </div>
    <div class="swiper" ref="swiper" :style="{top:isWeixin?'176px':'240px'}">
      <div class="content" ref="content">
        <div class="top-tip">
          <span class="refresh-hook" :class="{'noinfo':isNoInfo}">{{topText}}</span>
        </div>
        <ul class="listRecord">
          <li v-for="(item,index) in items" :key="index">
            <p>{{item.date}}</p>
            <p>{{item.name}}</p>
          </li>
        </ul>
        <div class="bottom-tip">
          <span class="loading-hook" :class="{'noinfo':isNoInfo}">{{bottomText}}</span>
        </div>
      </div>
    </div>
    <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
export default {
  data() {
    return {
      items:{},
      totalCount:0,
      pageList: [],
      searchCondition:{
        curpage:1,
        pagesize:10
      },
      isHaveMore: false,
      topText: '下拉刷新',
      bottomText: '查看更多',
      refreshSuccess: false,
      isNoInfo:false
    }
  },
  mounted(){
    this.scroll='';
  },
  created () {
    this.loadPageList()
  },
  methods:{
    _initScroll(){
      this.$nextTick(() => {
        let This=this;
        if(this.$refs.content.offsetHeight<this.$refs.swiper.offsetHeight){
          this.$refs.content.style.minHeight=this.$refs.swiper.offsetHeight+1+'px'
        }
        this.scroll=new BScroll(this.$refs.swiper, {
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
          This.loadPageList();
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
            if(This.items.length > 0) {
              This.bottomText='';
            }else{
              This.isNoInfo=true;
              This.bottomText='暂无数据';
            }
            //This.bottomText = '';
          }
          this.scroll.finishPullUp();
          this.scroll.refresh();
        })
      })
    },
    loadPageList () {
      let self = this;
      this.$ajax('get',baseURL + '/account/invitelist?pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage,'', function (data) {
        self.items = data.list;
        self.totalCount = data.totalCount;
        if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
          self.isHaveMore=true;
          self.isNoInfo=false;
          self.bottomText='查看更多';
        }else{
          self.isHaveMore=false;
          if(self.items.length > 0) {
            self.bottomText='';
          }else{
            self.isNoInfo=true;
            self.bottomText='暂无数据';
          }
        }
        if(!self.scroll){
          self._initScroll();
        }
      })
    },
    getMore () {
      if(this.isHaveMore){
        this.searchCondition.curpage = parseInt(this.searchCondition.curpage) + 1;
        this.getMoreRecords();
      }
    },
    getMoreRecords () {
      debugger
      let records=this;
      this.$ajax('get',baseURL + '/account/invitelist?pagesize='+this.searchCondition.pagesize+'&curpage='+this.searchCondition.curpage,'',function(data){
        debugger
        records.$nextTick(function () {
        for(var i=0;i<data.list.length;i++){
          records.items.push(data.list[i]);
        }

        if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
          records.isHaveMore=true;
          records.isNoInfo=false;
          records.bottomText='查看更多';
        }else{
          records.isHaveMore=false;
          if(records.items.length > 0) {
            records.bottomText='';
          }else{
            records.isNoInfo=true;
            records.bottomText='暂无数据';
          }
          //records.bottomText='';
        }
      })
    })
    },
    successTips () {
        let This=this;
        this.refreshSuccess=true;
        this.topText='下拉刷新';
        setTimeout(function () {
            This.refreshSuccess=false;
        }, 2000);
    }
  }
}
</script>
<style scoped lang="stylus">
.invitationRecord
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f5f5f5
  .topDiv
    position fixed
    top 64px
    width 100%
    height 120px
    background #ffffff
    z-index 1
    border-top:1px solid #F5F5F5;
    p
      text-align center
      font-family PingFangSC-Medium
      font-size 14px
      color #333333
      letter-spacing 0.96px
      line-height 30px
    .totalCount
      font-size 16px
      color #FA7009
      span
        font-family PingFangSC-Medium
        font-size 36px
        color #FA7009
        letter-spacing 4px
    p:first-child
      margin-top 30px
      font-weight 500
  .interval
    position fixed
    top 184px
    left 0
    right 0
    height 10px
    background #f5f5f5    
    z-index 1
  .recordcntHead
    position fixed
    z-index 1
    top 194px
    height 50px
    line-height 50px
    background #ffffff
    width 100%
    text-align center
    display flex
    display -webkit-box
    display -webkit-flex
    border-bottom 1px solid #f0f0f0
    div
      flex 1
      font-family PingFangSC-Medium
      font-size 16px
      color #A3A3A3
      letter-spacing 0.27px
      position relative
    div:first-child:after
      content ''
      position absolute
      height 30px
      width 1px
      background #ededed
      right 0
      top 10px
  .swiper
    position fixed
    top 240px
    left 0
    right 0
    bottom 0
    .bottom-tip
      background #f5f5f5
    .listRecord
      font-family PingFangSC-Medium
      font-size 14px
      color #333333
      letter-spacing 0
      padding 0 15px
      background #ffffff
      li
        height 44px
        line-height 44px
        display flex
        display -webkit-box
        display -webkit-flex
        border-bottom 1px dashed #EBEBEB
        &.last-child
          border none
        p
          flex 1
          text-align center
          color #333
          font-weight 500
  .recordcntHead:before
    content ''
    position absolute
    top 0
    width 100%
    height 10px
    background #f5f5f5
  .recordcntHead:before
    content ''
    position absolute
    bottom 0
    width 100%
    height 1px
    background #f0f0f0
</style>
