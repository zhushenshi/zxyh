<template>
	<div class="home">
		<router-view></router-view>
		<mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="/home/current">
            <span slot="icon" class="tabIcon"></span><span class="text">首页</span>
        </mt-tab-item>
        <mt-tab-item id="/home/Product">
            <span slot="icon" class="tabIcon iconInvestment"></span><span class="text">产品</span>
        </mt-tab-item>
        <mt-tab-item id="/home/accountTab">
            <span slot="icon" class="tabIcon iconAccount"></span><span class="text">我的</span>
        </mt-tab-item>
        <!-- <mt-tab-item id="/home/more">
            <span slot="icon" class="tabIcon iconMore"></span><span class="text">更多</span>
        </mt-tab-item> -->
    </mt-tabbar>
    <!-- <div class="accountCount" v-show="isAccountShow">
      <button @click="hideAccount">我知道了</button>
    </div> -->
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
	      selected: '/home/current',
        type: 0,
        isAccountShow:false
		}
  },
  created(){
    console.log(this.$route.path)
    this.selected=this.$route.path
  },
  watch: {
    selected: function(nVal, oVal) {
      // if(nVal=='/home/accountTab'){
      //   if(sessionStorage.getItem('$token')){
      //     this.$router.push(nVal); 
      //   }else{
      //     this.$router.push('/login')
      //   }
      // }else{
        this.$router.push(nVal);  
      // }  
    },
    '$route' (to, from) {
      if(to.path==='/home/investment0'){
        this.type=0;
        this.selected='/home/investment0'
      }else if(to.path==='/home/investment1'){
        this.type=1;
        // this.selected='/home/investment0'
      }else if(to.path==='/home/investment2'){
        this.type=2;
        // this.selected='/home/investment0'
      }else{
        // if(to.path=='/home/accountTab'){
        //   if(sessionStorage.getItem('$token')){
        //     this.selected=to.path;
        //   }else{
        //     this.$router.push('/login')
        //   }
        // }else{
          this.selected=to.path
        // }
      }
    }
  },
  methods: {
    hideAccount () {
      this.isAccountShow=false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"  rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.mint-tabbar
  border-top 1px solid #dddddd
  background-color #ffffff
  background-image none
  .mint-tab-item
    .mint-tab-item-icon
      .tabIcon
        bg-image(home)
        background-repeat no-repeat
        background-size contain
      .iconInvestment
        bg-image(product)
      .iconAccount
        bg-image(mine)
      .iconMore
        bg-image(More)
    .mint-tab-item-label
      .text
        font-size 14px    
    &.is-selected
      background #ffffff
      color #FF630C
      .tabIcon
        bg-image(home_active)
        background-repeat no-repeat
        background-size contain
      .iconInvestment
        bg-image(product_active)
      .iconAccount
        bg-image(mine_active)
      .iconMore
        bg-image(More_active)
a:hover
  color #666666
.accountCount
  position fixed
  z-index 2
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,.7) url(img/account.png) no-repeat center center
  background-size 90%
  button
    position absolute
    bottom 80px
    width 40%
    margin 0 30%
    height 40px
    line-height 40px
    color #fff
    background #FA7109
    border-radius 6px
</style>
