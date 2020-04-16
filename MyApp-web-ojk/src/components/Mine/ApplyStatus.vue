<template>
  <div class="repayResult">
    <MyHeader ref="header" :backPath="'/portal'"  :backIconShow="false"><span>{{params.HeaderTitle}}</span></MyHeader>
    <div class="content" :style="{top:height}">
       <!-- 结清 -->
      <div class="settled">
        <div class="info-wrapper">
          <p class="value">
            <img src="./img/applyImg.jpg">
          </p>
          <p class="result">{{params.msg}}</p>
          <p class="desc">{{params.msgMain}}</p>
        </div>
        <div class="margin">
          <div class="base-btn" @click="goPage()">{{params.btnTxt}}</div>
        </div>
        <!-- <div class="margin">
          <div class="checkBtn" @click="goPages('/portal')" style="  border:1px solid #328df2">返回首页</div>
        </div> -->
      </div>     
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      height: 0,
      money: '1000.00',
      repayStatus: 0,
      params:{
        HeaderTitle:'',
        msg:"",
        msgMain:'',
        path:'/order',
      }
    }
  },
  created() {
    this.params=this.$route.params
  },
  mounted(){
    this.height = this.$Header / 37.5 + 'rem'
  },
  methods: {
    goPage() {
      let _this=this;
      if(this.params.path=='/portal'){
        this.$store.commit("tabPage", _this.$t('lang.comm.home'))
      }
      this.$router.replace(this.params.path);
    },
    goPages(path){
      this.$store.commit("tabPage", _this.$t('lang.comm.home'))
      this.$router.replace(path);
     }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.repayResult
  .content
    position fixed
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
          color #ee2652
        .value
          font-size 30px
          margin-top 22px
          margin-bottom 20px
          img 
            border-radius 50%
            height 100px
        .result
          margin-bottom 8px
          font-size 16px
          color #333
        .desc
          font-size 14px
          color #7c7c7c
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
        margin 20px 40px 20px 40px  
.checkBtn
  background #ffffff
  width: 100%;
  height: 1.066667rem;
  border-radius: 0.08rem;
  border: none;
  color: #fff;
  font-size: 0.426667rem;
  line-height: 1.066667rem;
  letter-spacing: 0.04rem;
  background: #f6f6f6;
  outline: none;
  border:1px solid $color-primary
  color: $color-primary
</style>
