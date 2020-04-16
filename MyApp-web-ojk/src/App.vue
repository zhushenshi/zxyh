<template>
  <div id="app">
    <!-- <transition name="page-move"> -->
      <router-view></router-view>    
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
    data () {
    return {
      height:0,
    }
  },
  mounted(){
    this.$el.addEventListener('click',function(e){
      if (e.target.nodeName!='INPUT' && e.target.nodeName!='TEXTAREA') {
        document.activeElement.blur()
      }
    })
    // 监听安卓返回键
    let _this = this
    window['exitAppCaLLBack'] = function () {
      _this.onBackKeyDown()
    }
    // document.addEventListener("backbutton", this.onBackKeyDown, false);
  },
  methods:{
    // 退出app
    exitApp(key) {
      var ua = navigator.userAgent.toLowerCase();
      let locale = this.$i18n._vm.locale
      if (/iphone|ipad|ipod/.test(ua)) {
      } else if (/android/.test(ua)) {
        try{
          if(object&&typeof(object.exitApp)=="function"){
            object.exitApp(key,locale)
          }else{}
        }catch(e){
          alert(e)
        }
      }
    },
    onBackKeyDown () {
      let routeName = this.$route.name
      if(routeName=='CarrierOperator'){
        this.$router.go(-1)
      }else if(routeName == 'FaceIdentity'){//人脸
        this.$router.replace('/authentication')//运营商授权
      }else if(routeName == 'Authentication'){//运营商授权
        this.$router.replace('/personalInfo')//个人信息
      }else if(routeName == 'PersonalInfo'){//个人信息
        this.$router.replace('/identity')//身份认证
      }else if(routeName == 'Identity' || routeName == 'LoanProtocol' || routeName == 'ContractPdf' || routeName == 'ApplyStatus' || routeName == 'Order'){//身份认证
        this.$router.replace('/portal')//首页
      }else if(routeName == 'Portal'){//首页
        this.exitApp(2)
      }else if(routeName == 'Login' || routeName == '/'){//登录页
        this.exitApp(0)
      }else if(routeName == 'ChangeCreditCard'&&this.$route.params.from=='face'){
        this.$router.go(-1)
      }else if(routeName == 'ChangeCreditCard'&&this.$route.params.from!=='creditCard'){
        this.$router.replace('/portal')//首页
      }else if(routeName == 'Court' || routeName == 'RepayResult'){
        
      }else{
        this.$router.go(-1)
      }
    }
  }
}
// 
</script>

<style lang="stylus">
html, body, #app {
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  // height:100vh;
  // overflow hidden
  // width:100%;
  // position:relative;
}
input{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
<style lang="stylus">
@import "~common/stylus/variable"
.page-move-enter, .page-move-leave-active
  transform: translate(100%, 0)
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 1;
.page-move-enter-active
  transition: transform 30000ms
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 1;
.page-move-leave-active
  transition: transform 30000ms
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 1;
.cube-withdrawal-popup,.cube-agreement-popup{
  .cube-popup-content{
    width 85%!important
    border-radius 4px
  }
}
.mint-cell-title{
  text-align left
}
.personInfo .mint-cell-value{
  input{
    text-align right 
  }  
}
.view
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  .cube-tab-bar
    background-color: #fff
  .cube-tab-panels-group
    background-color: #fff
    position:fixed
    top 0
    bottom 50px
    right 0
    left 0
  .tab-panel-li
    padding: 0 16px
    height: 40px
    line-height: 40px
    border-top: 1px solid #eee
    &:last-child
      border-bottom: 1px solid #eee
.tabBarContainer{
  height:50px
  position:fixed;
  width:100%;
  bottom:0;
  font-size:14px;
  border-top:1px solid #EFEFEF;
  background-color #FFF
  z-index 2
}
.myTabBar i{
  font-size 20px
}
.cube-tab{
  color $color-tab!important
}
.myTabBar div{
  padding-top 6px
}
.cube-tab_active {
  color: $color-tab-select!important;
}
.cube-picker-wheel-item{
  font-size 14px
}
.cube-index-list-item-def{
    height auto!important
    line-height 15px!important
    padding 10px 15px!important
}
</style>