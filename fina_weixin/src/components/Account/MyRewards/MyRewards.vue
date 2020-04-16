<template>
  <div class="myRewrads">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'我的奖励'"></MyHeader></div>
    <div class="top paddingTop" style="border-top:1px solid #f5f5f5;">
      <div class="item">
        <p class="text">获得总佣金(元)</p>
        <p class="value">{{totalCommission | moneyToFixed(2)}}</p>
      </div>
      <div class="line"></div>
      <div class="item">
        <p class="text">已结算(元)</p>
        <p class="valueItem">{{commissionPaid | moneyToFixed(2)}}</p>
      </div>
      <div class="item">
        <p class="text">未结算(元)</p>
        <p class="valueItem">{{commissionPaidRest | moneyToFixed(2)}}</p>
      </div>
    </div>
    <div class=lineContainer><div class="line_top"></div></div>
    <div class="top marginBottom">
       <div class="item">
        <p class="text">现金奖励(元)</p>
        <p class="value">{{totalCash | moneyToFixed(2)}}</p>
      </div>
      <div class="line"></div>
      <div class="item">
        <p class="text">已结算(元)</p>
        <p class="valueItem">{{cashPaid | moneyToFixed(2)}}</p>
      </div>
      <div class="item">
        <p class="text">未结算(元)</p>
        <p class="valueItem">{{cashPaidRest | moneyToFixed(2)}}</p>
      </div>
    </div>
    <div class="bot">
      <!-- <div class="splitLine"></div> -->
      <mt-navbar v-model="selected">
        <mt-tab-item id="commissionAward">
          <div class="title">佣金奖励<span class="line"></span></div>
        </mt-tab-item>
        <mt-tab-item id="cashAward">
          <div class="title">现金奖励<span class="line"></span></div>
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" :style="{top:isWeixin?'243px':'307px'}">
        <mt-tab-container-item id="commissionAward">
          <div class="commissionContainer" ref="commissionContainer">
            <div>
              <div class="item" :key="item.id" v-for="(item, index) in commissionList">
                 <div class="title" @click="_toggleDetail(item, index, 'commissionList')">
                  <div class="title_l">{{item.month}}佣金</div>
                  <div class="title_r">{{item.total ? item.total : '0.00'}}元<span class="icon" :class="item.subShow==='true' ? 'icon-arrow_down' : 'icon-more'"></span></div>
                </div>
                <div class="sub" v-show="item.subShow === 'true'">
                  <div class="sub_item sub_item_title">
                    <p class="item">用户名</p>
                    <p class="item">投资总额(元)</p>
                    <p class="item">获得佣金(元)</p>
                  </div>
                  <div class="sub_item" :key="subItem.id" v-for="subItem in item.sub">
                    <p class="item">{{subItem.username}}</p>
                    <p class="item">{{subItem.amount | moneyToFixed(2)}}</p>
                    <p class="item">{{subItem.commission | moneyToFixed(2)}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="no-result-wrapper" v-show="commissionList.length === 0">{{noCommissionText}}</div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="cashAward">
          <div class="cashContainer" ref="cashContainer">
            <div>
              <div class="item item_cash" :key="item.id" v-for="(item, index) in cashList">
                 <div class="title" @click="_toggleDetail(item, index, 'cashList')">
                  <div class="title_l">{{item.month}}奖励</div>
                  <div class="title_r">
                    <!-- 共邀请{{item.ptimes ? item.ptimes : '0'}}人，共 -->
                    {{item.total}}元
                    <span class="icon" :class="item.subShow==='true' ? 'icon-arrow_down' : 'icon-more'"></span></div>
                </div>
                <div class="sub" v-show="item.subShow==='true'">
                  <div class="sub_item sub_item_title">
                    <p class="item">金额(元)</p>
                    <!-- <p class="item"></p> -->
                    <!-- <p class="item">用户名</p> -->
                    <p class="item">奖励时间</p>
                  </div>
                  <div class="sub_item" :key="subItem.id" v-for="subItem in item.sub">
                    <p class="item">{{subItem.amount | moneyToFixed(2)}}</p>
                    <!-- <p class="item"></p> -->
                    <!-- <p class="item">{{subItem.username}}</p> -->
                    <p class="item">{{subItem.createTime}}</p>

                  </div>
                </div>
              </div>
            </div>
            <div class="no-result-wrapper" v-show="cashList.length === 0">{{noCashText}}</div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <home-tab></home-tab> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
import HomeTab from '@/components/home/HomeTab.vue'

export default {
  data() {
    return {
      totalCommission: '0.00',//总佣金奖励
      commissionPaid: '0.00', //佣金奖励已结算
      totalCash: '0.00',     //总现金奖励
      cashPaid: '0.00',      //现金奖励已结算
      rtype: 0,//0佣金 1现金
      selected: 'commissionAward',
      commissionList:[],
      cashList: [],
      noCommissionText: '暂无佣金奖励',
      noCashText: '暂无现金奖励',
      commissionPaidRest:'0.00',
      cashPaidRest:'0.00'
    }
  },
  created() {
    let _this = this;
    this.$ajax('get',baseURL + '/account/reward?rtype='+this.rtype,'',function(data){
      _this.commissionList=data.list;
      _this.totalCommission = data.totalCommission;
      _this.totalCash =  data.totalCash;
      _this.cashPaid =  data.cashPaid;
      _this.commissionPaid =  data.commissionPaid;      
      _this.commissionPaidRest =  data.commissionPaidRest;      
      _this.cashPaidRest =  data.cashPaidRest;      
    })
  },
  watch: {
    selected(nVal, oVal) {
      let _this = this;
      if(nVal === 'commissionAward'){
        _this.rtype = 0;
      }else{
        _this.rtype = 1;
      }
      this.$ajax('get',baseURL + '/account/reward?rtype='+this.rtype,'',function(data){
        if(nVal === 'commissionAward'){
          _this.commissionList=data.list;
        }else{
          _this.cashList=data.list;
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.commissionScroll = new BScroll(this.$refs.commissionContainer, {
        click:true
        //click: '_toggleDetail'
      })
      this.cashScroll = new BScroll(this.$refs.cashContainer, {
        click:true
        //tap: '_toggleDetail'
      })
    })
  },
  methods: {
    //切换奖励明细
    _toggleDetail(item, index, list){
      var _this = this;
      if(list === 'commissionList'){
        list = _this.commissionList;
      }else{
        list = _this.cashList;
      }
      var month = item.month.replace('月', '');
      if(month < 10) {
        month = '0' + month;
      }
      this.$ajax('get',baseURL + '/account/reward/detail?rtype='+this.rtype+'&month='+month,'',function(data){
        Vue.set(item, 'sub', data.list);
      })
      list.forEach(i => {
          // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
          if (i.subShow !== list[index].subShow) {
              i.subShow = 'false';
          };
      });
      if(item.subShow == 'true') {
        item.subShow = 'false';
      }else{
         item.subShow = 'true';
      }
    }
  },
  computed: {
    //   commissionPaidRest:function(){
    //   return parseFloat(this.totalCommission)-parseFloat(this.commissionPaid);
    // },
    // cashPaidRest:function(){
    //   return parseFloat(this.totalCash)-parseFloat(this.cashPaid);
    // }

  },
  components: {
    HomeTab
  }
}
</script>

<style scoped lang="stylus">

  .myRewrads
    background #f6f6f6
    .lineContainer
      background #ffffff
      .line_top
        border-top 1px solid #F5F5F5
        width 90%
        margin 0 auto
    .paddingTop
      padding-top 14px
    .marginBottom
      margin-bottom 10px
    .top
      display flex
      height 87px
      // margin-bottom 10px
      background #ffffff
      .item
        flex 1
        padding-top 20px
        text-align center
        .text
          margin-bottom 10px
          font-size 12px
          color #858585
          letter-spacing: 0.16px;
        .value
          font-size 23px
          font-weight 500
          color #fa7009
          letter-spacing 0.24px
        .valueItem
          font-size 17px
          font-weight 500
      .line
        height 50px
        margin-top 21px
        border 1px dashed #F5F5F5
    .bot
      .splitLine
        border-right 1px solid #F5F5F5
        height 28px
        position absolute
        left 50%
        margin-left -1px
        top 270px
      .mint-navbar
        height 42px
        border-bottom 1px solid #f2f2f2
        .mint-tab-item
          padding 13px 0
          border none
          &.is-selected
            .title
              color #FA7009
              .line
                display block
          .title
            position relative
            font-size 15px
            letter-spacing 1.56px
            color #333333
            font-weight 500
            .line
              display none
              height 4px
              width 48px
              margin 9px auto 0
              border-radius 8px
              background  linear-gradient(-180deg, #F56A3B 0%, #FD7F22 100%)
      .mint-tab-container
        position fixed
        top 307px
        left 0
        right 0
        bottom 0
        background #ffffff
        .commissionContainer,.cashContainer
          position absolute
          top 0
          left 0
          right 0
          bottom 0px
          overflow hidden
          .no-result-wrapper
            position absolute
            width 100%
            top 50%
            margin-top -9px
            padding 10px 0
            font-size 14px
            text-align center
            color #afafaf
          .item_cash
            .title_r
              font-size 13px
          .title
            height 50px
            line-height 50px
            padding 0 20px
            display flex
            font-size 15px
            letter-spacing 0.27px
            border-bottom 1px solid #f2f2f2
            .title_l
              flex 1
              text-align left
              color #333
            .title_r
              flex 1
              text-align right
              color #939393
              .icon
                vertical-align text-top
                margin-left 4px
                font-size 16px
          .sub
            //padding 0 20px 0 0
            background #f6f6f6
            .sub_item
              display flex
              margin 0 15px
              text-align center
              color #515151
              font-size 14px
              border-bottom 1px dashed #eee
              &:last-child
                border none
              &.sub_item_title
                .item
                  color #afafaf
              .item
                flex 1
                height 35px
                line-height 35px
              .item:nth-child(2)
                flex 2
              .item:last-child
                padding-right 5px

</style>
