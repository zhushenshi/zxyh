
<template>
  <div class="container">
      <MyHeader ref="header" :backIconShow="false">法院执行人，失信名单</MyHeader>
      <div>
        <!-- <div id="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div> -->
        <div class="loading">
          <img src="./img/loading.gif" alt="">
        </div>
        <div class="text">
          <p>正在授权中</p>
          <p>数据采集中，请耐心等待...</p>
        </div>
        <!-- <div class="loadingBottom">
          <img src="./img/loadingBottom.gif" alt="">
        </div> -->
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseURL} from '@/common/js/configuration'
export default {
  name: 'Court',
  data () {
    return {
      params:''
    }
  },
  methods:{
  },
  created(){
    this.params=this.$route.params
    this.$ajax('post','/authorization/authFyZxr',this.params,(data)=>{//法院执行人接口
      this.$ajax('post','/authorization/saveMoxieSq',{type:'6',taskId:data.retData.taskId},(info)=>{
        this.$router.go(-1)
      },'',true)
    },30000,true)
  },
  mounted (){
    // this.height=(window.innerHeight-64)+'px'
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.container
  background-image url(./img/loadingBg.gif)
  background-size 100% 100%
  background-repeat no-repeat
  position absolute 
  bottom 0
  top 0
  left 0
  right 0
  .loading
    position absolute
    top 64px
    background-color #fff
    width 100%
    max-height 60vh
    overflow hidden
    img
      width 65%;
  .text
    position absolute 
    bottom 26vh
    width 100%
    font-size 16px
    color #fff
    line-height 25px
    p:first-child
      color rgba(256,256,256,0.5)
      margin-bottom 15px
</style>
