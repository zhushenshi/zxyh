<template>
  <div class="main">
    <div ref="MyHeader" v-if="!isWeixin" style="z-index:10;position:relative;"><MyHeader :title="'消息'"></MyHeader></div>
    <div class="swiper" ref="swiper" :style="{height:height+'px'}" style="border-top:1px solid #F5F5F5;">
      <div class="content" ref="content">
        <div class="top-tip">
          <span class="refresh-hook">{{topText}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in pageList" class="item" :key="index">
            <div class="img-box"><img src="../../../assets/images/1@3x.png" alt=""></div>
            <div class="info">
              <p class="title">{{item.title}}</p>
              <p class="message">{{item.content}}</p>
              <p class="date">{{item.time}}</p>
            </div>
          </li>
        </ul>
        <div class="bottom-tip" v-show="isNoInfo">
          <span class="loading-hook" :class="{'noinfo':isNoInfo}">暂无数据</span>
        </div>
      </div>
    </div>
    <div class="alertTips" :style="{top:top+'px'}" v-show="refreshSuccess">刷新成功</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {baseURL, baseurlVerifyImg} from '@/vuex/url'

  export default {
    name: 'Message',
    data() {
      return {
        pageList: [],
        height: 0,
        top: 0,
        topText: '',
        refreshSuccess: false,
        isNoInfo:false
      }
    },
    created () {
      this.getRecords();
    },
    mounted () {
      this.$nextTick(() => {
        // this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
        // this.top=this.$refs.MyHeader.offsetHeight
        this.top=!this.isWeixin?64:0
      })
    },
    methods:{
      _initScroll () {
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
          This.getRecords();
          this.scroll.finishPullDown();
          this.scroll.refresh();
          This.successTips();
        })
        })
      },
      getRecords () {
        let records=this;
        this.$ajax('get',baseURL + '/account/sysmsg','',function(data){
            records.$nextTick(function () {
                records.pageList=data.List;
                if(!records.pageList || records.pageList.length == 0) {
                   records.isNoInfo=true;
                }
                if(records.scroll) {
                  records.scroll.refresh();
                }else{
                  this._initScroll();
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
      }
    }
  }
</script>

<style scoped>
.main{position: fixed;top:0;bottom:0;left: 0;right: 0;background:#F6F6F6;}
/* .main .swiper{position: fixed;top:10px;bottom:0;left:0;right: 0} */
.item{display:flex;margin: 0 10px 15px;background:#fff;padding:15px;}
.item .img-box {margin-right:15px;}
.item .img-box img{width:60px;}
.item .info{line-height:20px;font-size:11px;}
.item .info .title{font-size: 14px;color: #3B3B3B;letter-spacing: 0.32px;font-weight:500;}
.item  .info .message{color: #797979;letter-spacing: 0.25px;}
.item  .info .date{color: #BCBCBC;letter-spacing: -0.02px;}
.alertTips{
    display:block;
    position:fixed;
    left: 0;
    z-index :100;
    width: 100%;
    height :35px;
    line-height :35px;
    text-align :center;
    color: #fff;
    font-size: 12px;
    background: rgba(7, 17, 27, 0.7);
} 
</style>
