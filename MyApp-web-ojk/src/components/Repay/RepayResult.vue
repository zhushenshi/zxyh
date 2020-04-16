<template>
  <div class="repayResult">
    <MyHeader ref="header" :backIconShow="false"><span>{{headerText}}</span></MyHeader>
    <div class="content" :style="{top:height}">
       <!-- 结清 -->
      <div v-if="repayStatus===0" class="settled">
        <div class="info-wrapper">
          <p><i class="iconfont icon-yiyuedu"></i></p>
          <p class="value">Rp{{money|money}}</p>
          <p class="result">{{$t('lang.repayResultView.repaySuccess')}}</p>
          <!-- <p class="desc1">还款结果以账单明细为准</p> -->
          <p class="desc1">{{$t('lang.repayResultView.repaySuccessText')}}</p>
        </div>
        <div class="margin">
          <div class="base-btn" @click="goPage()">{{$t('lang.repayResultView.goCash')}}</div>
        </div>
      </div>
      <!-- 等待付款结果 -->
      <div v-else-if="repayStatus===1" class="wating">
        <div class="info-wrapper">
          <p><i class="iconfont icon-naozhong"></i></p>
          <p class="result">{{$t('lang.repayResultView.repayWaitText')}}</p>
          <p class="desc">{{$t('lang.repayResultView.repayWaitDesc')}}</p>
        </div>
        <div class="margin">
          <div class="base-btn" @click="goPage()">{{$t('lang.repayResultView.goBackHome')}}</div>
        </div>
      </div>
      <!-- 付款异常 -->
      <div v-else class="fail">
        <div class="info-wrapper">
          <p><i class="iconfont icon-shibai"></i></p>
          <p class="result">{{$t('lang.repayResultView.repayErrorText')}}</p>
          <p class="desc">{{$t('lang.repayResultView.repayErrorDesc')}}</p>
        </div>
        <div class="margin">
          <div class="base-btn" @click="goBack('')">{{$t('lang.repayResultView.repayagain')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      height: 0,
      money: '0',
      repayStatus: 0,//0 结清 /1等待结果 2
      headerText:''
    }
  },
  created() {
    let locale = this.$i18n._vm.locale
    let lang=this.$i18n._vm.messages[locale].lang
    this.money=this.$route.params.money
    this.repayStatus=this.$route.params.repayStatus
    this.headerText=this.$route.params.repayStatus == '0' ? lang.repayResultView.Settle : this.$route.params.repayStatus == 1 ? lang.repayResultView.waitRepayResult :lang.repayResultView.repayError
  },
  mounted(){
    this.height = this.$Header / 37.5 + 'rem'
  },
  destroyed(){
  },
  methods: {
    goPage() {
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$store.commit("tabPage", lang.comm.home)
      this.$router.replace('/portal');
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.repayResult
    position absolute
    bottom 0
    left 0
    right 0
    top 0
    background #F6F6F6
  .content
    position absolute
    bottom 0
    left 0
    right 0
    background #F6F6F6
    .settled, .wating, .fail
      text-align center
      .info-wrapper
        padding 30px 0
        background #ffffff
        .icon-yiyuedu
          font-size 50px
          color #08B708
        .value
          font-size 30px
          margin-top 22px
          margin-bottom 20px
        .result
          margin-bottom 8px
          font-size 16px
          color #333
        .desc
          font-size 14px
          color #7c7c7c
          line-height 28px
        .desc1
          font-size 14px
          color red
          line-height 28px
      &.wating, &.fail
        .icon-naozhong, .icon-shibai
          font-size 70px
          color #ee2652    
        .result
          margin-top 30px  
        .desc
          font-size 12px
          color #7c7c7c  
      .margin
        margin 40px 40px 0 40px  
.loader-ring {
  position: relative;
  width: 100px;
  height: 100px;
  margin 60px auto 100px;
}
.loader-text{
  position:absolute;
  line-height:100px;
  width:100px;
  font-size:32px;
}
.loader-text span{
  font-size:16px;
  margin-left:1px;
  position relative
}
.loader-ring-light {
  width: 100px;
  height: 100px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  -moz-box-shadow: 0 4px 0 #00abf2 inset;
  -webkit-box-shadow: 0 4px 0 #00abf2 inset;
  box-shadow: 0 4px 0 #00abf2 inset;
  animation: rotate-360 2s linear infinite;
}

.loader-ring-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  // -moz-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
  // -webkit-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
  // box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
}

@keyframes rotate-360 {
  from {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
