<template>
  <div class="page">
    	<mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="/home/current">
            <span slot="icon" class="tabIcon"></span><span class="text">首页</span>
        </mt-tab-item>
        <mt-tab-item id="/home/investment0">
            <span slot="icon" class="tabIcon iconInvestment"></span><span class="text">投资</span>
        </mt-tab-item>
        <mt-tab-item @click.native="returnAccount" id="/home/accountTab">
            <span slot="icon" class="tabIcon iconAccount"></span><span class="text">账户</span>
        </mt-tab-item>
        <mt-tab-item id="/home/more">
            <span slot="icon" class="tabIcon iconMore"></span><span class="text">更多</span>
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
       selected: '/home/accountTab',
       type: 0
    }
  },
  watch: {
    selected: function(nVal, oVal) {
      if(nVal=='/home/accountTab'){
        if(sessionStorage.getItem('$token')){
          this.$router.push(nVal); 
        }else{
          this.$router.push('/login')
        }
      }else{
        this.$router.push(nVal);  
      }  
    },
    '$route' (to, from) {
     
    }
  },
  methods: {
    returnAccount() {
      this.$router.push('/home/accountTab')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.mint-tabbar
  border-top 1px solid #dddddd
  background-color #ffffff
  background-image none
  .mint-tab-item
    .mint-tab-item-icon
      .tabIcon
        bg-image(pic)
        background-repeat no-repeat
        background-size contain
      .iconInvestment
        bg-image(Investment)
      .iconAccount
        bg-image(Account)
      .iconMore
        bg-image(More)
    .mint-tab-item-label
      .text
        font-size 14px    
    &.is-selected
      background #ffffff
      color #FF630C
      .tabIcon
        bg-image(pic_active)
        background-repeat no-repeat
        background-size contain
      .iconInvestment
        bg-image(Investment_active)
      .iconAccount
        bg-image(Account_active)
      .iconMore
        bg-image(More_active)
a:hover
  color #666666
</style>
