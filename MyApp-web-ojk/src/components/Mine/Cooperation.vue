<template>
  <div class="cooperation">
    <MyHeader  ref="header">{{$t('lang.userView.cooperationPlatform')}}</MyHeader>
      <div class="scroll-list-wrap" :style="{top:height}">
        <cube-scroll ref="scroll" :data="advertisActivityList" :options="options">
          <div class="box">
            <div class="imgList" v-for="(value,index) in advertisActivityList" :key="index">
              <img :src="value.path" alt="">               
            </div>  
            <div class="noMsg" v-show="!advertisActivityList.length">
              <img src="./img/no-order.png"/>
            </div>
          </div>
        </cube-scroll>
      </div>
  </div>
</template>

<script>
import img1 from "./img/banner_default.png"
import img2 from "./img/banner_default.png"
import img3 from "./img/banner_default.png"
export default {
  name: 'cooperation',
  data () {
    return {
      height:0,
      imgList:[img1,img2,img3],
      advertisActivityList:[],
      params:{
        pageIndex:1,
        pageSize:5
      },
      options:{
        pullDownRefresh:false,
        nextPage:0
      }
    }
  },
  components:{
  },
  methods: {
    oToPage (path) {
      this.$router.push(path)
    },
    getInfo(){
      let _this=this;
      _this.$ajax('post','/platform/getCooperation',"",function(data){
        _this.advertisActivityList=data.retData.list
        setTimeout(() => {
          _this.$refs.scroll.refresh()
        }, 500)
      })   
    }
},
  created(){
    this.getInfo()
  },
  mounted(){
     this.height=(this.$Header)/37.5+'rem'
  }
}
</script>

<style scoped lang="stylus">
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
.cooperation
 background #F0EFF5
.box
 padding 15px
 margin 0
.imgList
  margin-top 10px
  img
   width 100%
   boder-radius 4px
   height 100%
  //  min-height 150px;
.noMsg img
    width: 40%;
    margin-top: 45%
</style>
<style lang="stylus">
  .cube-pullup-wrapper .before-trigger
    font-size 12px!important
    height 15px!important
</style>
