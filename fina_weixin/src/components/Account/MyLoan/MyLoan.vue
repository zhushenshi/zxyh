<template>
	<div class="myloanlist">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'我的贷款'"></MyHeader></div>
    <div class="container">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
          <div class="list-item" v-for="(item,index) in list" :key="index">
            <div class="item-header">
              <div>{{item.type==1?'教师贷':item.type==2?'党员贷':item.type==3?'公务员贷':item.type==4?'小微贷':item.type==5?'大额存单销售':'贷款'}}</div>
              <div :class="{'status0':item.state==0,'status1':item.state==1,'status2':item.state==2,}">{{item.state==2?'已拒绝':item.state==0?'申请中':item.state==1?'已确认':''}}</div>
            </div>
            <div class="item-box">
              <div>{{item.amount}}</div>
              <div>{{item.createTime|dateTimeToDate}}</div>
            </div>
            <div class="item-box2">
              <div>贷款金额（元）</div>
              <div>贷款日期</div>
            </div>
            <!-- <div class="item-body">
              <div class="item-flex">
                <div class="item-up">{{item.money}}</div>
                <div class="item-down">可贷金额</div>
              </div>
              <div class="item-flex">
                <div class="item-up">{{item.term}}</div>
                <div class="item-down">借款期数</div>
              </div>
              <div class="item-flex">
                <div class="item-up">{{item.time}}</div>
                <div class="item-down">借款日期</div>
              </div>
            </div> -->
          </div>
          <div class="noMsg" v-show="!list.length&&show">
              <img src="../../../assets/no-order.png"/>
              <p>暂无数据，看看别的地方吧！</p>
          </div>                     
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {baseURL,baseURLVerifyImg} from '@/vuex/url'
export default {
  name: 'myloanlist',
  data () {
    return {
      height: 0,
      list: [
      ],
      show:false

    }
  },
  created () {
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    console.log(1231345)
    this.$ajax('post', baseURL+'/custLoanController/getApply', '', (data)=> {
        this.show=true
        if(data.status == '200'){
            this.list=data.response.data          
        }else{
            this.$Toast({message:data.msg});
        }
    })    
    this.$nextTick(() => {
      // this.height=window.screen.availHeight-(!this.isWeixin?this.$refs.MyHeader.offsetHeight:0)
      this.height=window.screen.availHeight-(!this.isWeixin?64:0)
      new BScroll(this.$refs.wrapper, {click: true})
    })
  }
}
</script>

<style scoped lang="stylus">
.myloanlist{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #F5F5F5;
  text-align: center;
  .wrapper{
    overflow hidden
  }
  .list-item{
    padding 12px 15px 16px;
    background #fff;
    margin-bottom 10px
    margin-top:10px;
    .item-header{
      // padding 10px 0
      text-align left
      font-size:16px;
      font-family:FZLanTingHeiS-R-GB;
      // font-weight:bold;
      color:#333;
      position relative
      display flex
      justify-content space-between
      // &:after{
      //   position absolute
      //   content ""
      //   bottom 0
      //   left 0
      //   right 0
      //   border-bottom 1px dashed #dddddd  
      // }
      .status1{
        color #707070//通过
        font-size 12px;
      }
      .status2{//
        color:#E7373A;//拒绝
        font-size 12px;
      }
      .status0{
        color:#0087EC;//确认
        font-size 12px;
      }
    }
    .item-box{
      margin-top 10px
      text-align left
      font-size:16px;
      font-family:FZLanTingHeiS-R-GB;
      color:#333;
      position relative
      display flex
      justify-content space-between
    }
    .item-box2{
      margin-top 6px
      text-align left
      font-size:10px;
      font-family:FZLanTingHeiS-R-GB;
      color:#A8A8A8;
      position relative
      display flex
      justify-content space-between
    }
    .item-body{
      display flex
      padding 20px 0 10px
      .item-flex{
        flex 1
        .item-up{
          font-size:15px;
          font-family:FZLanTingHeiS-R-GB;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .item-down{
          font-size:12px;
          font-family:FZLanTingHeiS-R-GB;
          font-weight:400;
          color:rgba(136,136,136,1); 
        }
        .item-button{
          background:linear-gradient(90deg,rgba(250,111,10,1) 0%,rgba(255,117,4,1) 100%);
          border-radius:30px;
          color #ffffff
          margin 8px auto;
          width:80px;
          height:30px;
          line-height 30px;
        }
      }
    }
    
  }
}          
</style>