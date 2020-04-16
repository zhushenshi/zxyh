<template>
  <div>
    <div class="view">
      <div>
        <div style="width:100%;height:100%;" v-if="selectedLabel==$t('lang.comm.home')">
          <home-page ref="home"></home-page>
        </div>
        <div style="width:100%;height:100%;" v-if="selectedLabel==$t('lang.comm.repayment')&&flag">
          <repay-page ref="repay"></repay-page>
        </div>
        <div style="width:100%;height:100%;" v-if="selectedLabel==$t('lang.comm.user')">
          <user-page ref="user"></user-page>
        </div>
      </div>
      <div class="tabBarContainer" style="border-top:1px solid #EFEFEF;">
        <!-- <cube-tab-bar v-model="selectedLabel"  class="myTabBar" ref="tabNav" :useTransition="false">
          <cube-tab v-for="(item,index) in tabs" :label="item.label" :icon="item.icon" :key="item.label"></cube-tab>
        </cube-tab-bar> -->
        <mt-tabbar v-model="selectedLabel" ref="tabNav" fixed>
          <mt-tab-item :id="item.label" v-for="(item,index) in tabs" :key="index">
            <span slot="icon" :class="item.cls"></span>
            <span class="text">{{item.label}}</span>
          </mt-tab-item>
        </mt-tabbar>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomePage from './Home/Home'
  import UserPage from './Mine/User.vue'
  import RepayPage from './Repay/Repay.vue'
  var findIndex=function(ary, fn) {
    if (ary.findIndex) {
      return ary.findIndex(fn)
    }
    /* istanbul ignore next */
    let index = -1
    /* istanbul ignore next */
    ary.some(function (item, i, ary) {
      const ret = fn.call(this, item, i, ary)
      if (ret) {
        index = i
        return ret
      }
    })
    /* istanbul ignore next */
    return index
  }
  export default {
    data() {
      return {
        selectedLabel: this.$t('lang.comm.home'),
        tabs: [{
          label: this.$t('lang.comm.home'),
          icon: 'iconfont icon-shouye1',
          cls: 'tabIcon'
        }, {
          label: this.$t('lang.comm.repayment'),
          icon: 'iconfont icon-qiandai1',
          cls: 'tabIcon repay'
        },{
          label: this.$t('lang.comm.user'),
          icon: 'iconfont icon-wode',
          cls: 'tabIcon user'
        },],
        height:0,
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0,
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        personalInformation:{},
        timer: null,
        flag:false
      }
    },
    computed: {
      initialIndex () {
        let index = 0
        index = findIndex(this.tabs, item => item.label === this.selectedLabel)
        return index
      }
    },
    components: {
      HomePage,
      UserPage,
      RepayPage
    },
    created(){
      this.selectedLabel=this.$store.state.tabPage;
    },
    methods:{
      changePage (current) {
        this.selectedLabel = this.tabs[current].label
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      }
    },
    watch: {
      selectedLabel (newV) {
        this.$store.commit("tabPage", newV)
        this.flag=false
        if(newV === this.$t('lang.comm.repayment')){
          if(this.$store.state.repayCodeFlag){//判断是否是重新选择还款期数
            this.$store.commit("repayCodeFlag", false)// 从还款码页面而来
            this.flag=true
          }else{
            this.$ajax('post','/repay/getRepayCode','',(data)=>{//还款码
              if(data.retData&&data.retData.hasPayCode == true){//已经有还款码
                this.$router.push({name:'RepayOjk',params:data.retData})
              }else{
                this.flag=true
              }
            })
          }
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .mint-tabbar
    background-image: none
    background-color: #ffffff;
    .mint-tab-item
      .mint-tab-item-icon
        .tabIcon
          background url(../assets/home-icon/home.png) no-repeat center center
          background-size contain
        .repay
          background url(../assets/home-icon/repay.png) no-repeat center center
          background-size contain
        .user
          background url(../assets/home-icon/user.png) no-repeat center center
          background-size contain
      .mint-tab-item-label
        .text
          font-size 12px    
      &.is-selected
        background #ffffff
        color $color-home
        .tabIcon
          background url(../assets/home-icon/home-active.png) no-repeat center center
          background-size contain
        .repay
          background url(../assets/home-icon/repay-active.png) no-repeat center center
          background-size contain
        .user
          background url(../assets/home-icon/user-active.png) no-repeat center center
          background-size contain
  .mint-tabbar > .mint-tab-item.is-selected
    background #ffffff
</style>