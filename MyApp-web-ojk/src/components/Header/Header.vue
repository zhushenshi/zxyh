<template>
<div class="header">
    <div  :class="{iosHeader:iosHeader}" ref="dom" class="myHeader" style="height:64px;line-height:95px;">
    <div class="left" @click="onBackKeyDown(backPath)">
      <i class="iconfont icon" :class="backIcon" style="font-size:22px;" v-show="backIconShow"><span><slot name="leftText"></slot></span></i>
    </div>
    <span class="headerTitle" style="height;50px;line-height:50px;font-size:16px;"><slot></slot></span>
    <div class="right" @click="goNext(headerJson)">
      <span v-if="headerJson.rightIcon" :class="headerJson.rightIcon"></span>
      <span v-if="headerJson.rightBtn" class="rightBtnText" style="font-size:14px;" v-html="headerJson.rightBtn"></span>
    </div>
  </div>
  <div class="bg" :style="{height:'68px'}"></div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MyHeader',
  data () {
    return {
      iosHeader: true,
      HeaderPlace:0
    }
  },
  // props: ['headerJson'],
  props: {
    backIcon:{
      type: String,
      default:'icon-zuojiantou'
    },
    backIconShow:{
      type:Boolean,
      default:true
    },
    backPath:{
      type:String,
      default:'-1'
    },
    background:{
      type:String,
      default:'blue',
    },
    headerJson: {
      type: Object,
      default: function () {
        return { 
          rightIcon: '',
          rightBtn: '',
          rightPath: ''
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    goBack (path) {
      console.log(path)
      if (path === '-1') {
        // let ln = window.location.hash.lastIndexOf('/')
        // this.$router.push(window.location.hash.substring(0,ln).substring(1,ln))
        this.$router.go(-1)
      } else if(path === '-2'){
        this.$router.go(-2)
      }else if(path === '-3'){
        this.$router.go(-3)
      }else if(path === 'exitApp') {
        this.$emit('exitApp')
      }else if(path == "handle"){
        this.$emit('handle')
      }else{
        this.$router.push(path)
      }
    },
    onBackKeyDown (path) {
      console.log(path);
      let routeName = this.$route.name
      if(routeName=='CarrierOperator'){
        this.$router.go(-1)
      }else if(routeName == 'FaceIdentity'){//人脸
        this.$router.replace('/authentication')//运营商授权
      }else if(routeName == 'Authentication'){//运营商授权
        this.$router.replace('/personalInfo')//个人信息
      }else if(routeName == 'PersonalInfo'){//个人信息
        this.$router.replace('/identity')//身份认证
      }else if(routeName == 'Identity' || routeName == 'LoanProtocol' || routeName == 'ContractPdf' || routeName =='ApplyStatus' || routeName == 'Order'){//身份认证 合同
        this.$router.replace('/portal')//首页
      }else if(routeName == 'Portal' || routeName == 'Login'){//首页//登录页
        // this.$router.replace('/portal')//首页
        ExitApp.exitApp(1)
      }else if(routeName == 'ChangeCreditCard'&&this.$route.params.from=='face'){
        this.$router.go(-1)
        return
      }else if(routeName == 'ChangeCreditCard'&&this.$route.params.from!=='creditCard'){
        this.$router.replace('/portal')//首页
      }else  if(path == '/portal'){
        this.$router.replace('/portal')//首页
      }else if (path === '-1') {
        // let ln = window.location.hash.lastIndexOf('/')
        // this.$router.push(window.location.hash.substring(0,ln).substring(1,ln))
        this.$router.go(-1)
      } else if(path === '-2'){
        this.$router.go(-2)
      }else if(path === '-3'){
        this.$router.go(-3)
      }else if(path === 'exitApp') {
        this.$emit('exitApp')
      }else if(path == "handle"){
        this.$emit('handle')
      }else if(path == "repayCode"){
        this.$store.commit("repayCodeFlag", true)// 从还款码页面而来
        this.$router.go(-1)
      }else{
        this.$router.push(path)
      }
    },
    goNext (headerJson) {
      if (headerJson.rightPath) {
        this.$router.push(headerJson.rightPath)
      } else if (headerJson.rightFunc) {
        this.$emit(headerJson.rightFunc)
      }
    },
    titleFunc(headerJson) {
      this.$emit(headerJson.titleFunc)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.bg
  background $color-header
  height 64px
.header
  position relative
  top 0
  left 0 
  z-index 99
.myHeader
  background-color $color-header
  height 64px
  line-height 80px
  text-align center
  position fixed
  top 0
  left 0 
  z-index 99
  width 100%
  .mint-button--default
    background transparent
    color #ffffff
    border-radius 0
    box-shadow none
    font-size 14px
  .left
    position absolute
    left 0
    height 100%
    .icon
      position relative
      top 0px
      padding 10px
      font-size 22px
      color $color-header-back
  .right
    position fixed
    top 0
    right 10px
    .icon-add
      position relative
      top 4px
      padding 10px 0 10px 10px
      font-size 22px
      color #fff
    .icon-more
      position relative
      top 4px
      padding 10px 0 10px 10px
      font-size 24px  
      color #ffffff
      &.redot:after
        content ''
        position absolute
        top 11px
        right 2px
        width 5px
        height 5px
        border-radius 50%
        background #FF0000 
    .rightBtnText
      font-size 14px  
      color #fff
  .headerTitle
    display inline-block
    height 50px
    line-height 50px
    color $color-header-text
    font-size 16px
.iosHeader
  height 64px
  line-height 95px
  .mint-button--default
    background transparent
    color #ffffff
    border-radius 0
    box-shadow none
    font-size 14px
    margin-top 16px
.headerTitle
  color #333
.left
  .icon-arrow_left:before
    color #333  
.icon-more
  color #000!important
.history-icon{
  display inline-block
  width 20px
  height 20px
  background #ddd
}    
</style>