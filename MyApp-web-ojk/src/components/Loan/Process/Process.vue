
<template>
  <div class="top">
    <div class="infoTitle">
      <div class="infoContent">
        <p class="infoLine" style="border-top:1px solid #DDD;"></p>
        <p class="infoImg infoImg1 infoImgActive"></p>
        <!-- <p class="infoWord">{{$t('lang.process.one')}}</p> -->
      </div>
      <div class="infoContent">
        <!-- <p class="infoLine" style="border-top:1px solid #DDD;"></p> -->
        <p class="infoImg" :class="{infoImgActive:index>0,infoImg2:index<=0,infoImg2_active:index>0}"></p>
        <!-- <p class="infoWord">{{$t('lang.process.two')}}</p> -->
      </div>
      <!-- <div class="infoContent">
        <p class="infoLine" style="border-top:1px solid #DDD;"></p>
        <p class="infoImg" :class="{infoImgActive:index>1,infoImg3:index<=1,infoImg3_active:index>1}"></p>
        <p class="infoWord">{{$t('lang.process.three')}}</p>
      </div>
      <div class="infoContent">
        <p class="infoImg" :class="{infoImgActive:index>2,infoImg4:index<=2,infoImg4_active:index>2}"></p>
        <p class="infoWord">{{$t('lang.process.four')}}</p>
      </div> -->
    </div>
    <div class="info-tips" v-if="index==1">Silakan isi informasi kontak darurat yang dapat dihubungi</div>
    <!-- <div style="height:100px;"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Process',
  data () {
    return {
    }
  },
  props:{
    // backPath:{
    //   type:String,
    //   default:'-1'
    // },
    index:{
      type:Number,
      default:0
    }
  },
  methods:{
  },
  created(){
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
.top
  padding 0px 0
  min-height 60px
  background #FFF
  margin 10px 0
.infoTitle
    display flex
    text-align center
    font-size 14px
    padding 10px 0
    // margin 10px 0
  .infoContent
    flex: 1;
    position: relative;
    .infoLine
      position: absolute;
      width: 50%;
      // height: 1px;
      // background: #ddd;
      top: 16px;
      right: -40px;
    .infoImg
      width: 30px;
      height: 30px;
      margin: 2px auto;
    .infoImgActive
      width 36px
      height 36px
      margin-bottom -3px
      position relative
      top -4px
    .infoWord
      line-height 22px
.infoTitle .infoContent .infoImg1 {
    background: url(./img/one.png) no-repeat center center;
    background-size: cover;
}
// .infoTitle .infoContent:nth-child(2) .infoImg {
//     background: url(./img/two_d.png) no-repeat center center;
//     background-size: cover;
// }
// .infoTitle .infoContent:nth-child(3) .infoImg {
//     background: url(./img/three_d.png) no-repeat center center;
//     background-size: cover;
// }
// .infoTitle .infoContent:nth-child(4) .infoImg {
//     background: url(./img/four_d.png) no-repeat center center;
//     background-size: cover;
// }
.infoTitle .infoContent .infoImg2 {
    background: url(./img/two_d.png) no-repeat center center;
    background-size: cover;
}
.infoTitle .infoContent .infoImg3 {
    background: url(./img/three_d.png) no-repeat center center;
    background-size: cover;
}
.infoTitle .infoContent .infoImg4{
    background: url(./img/four_d.png) no-repeat center center;
    background-size: cover;
}
.infoTitle .infoContent .infoImg2_active {
    background: url(./img/two.png) no-repeat center center;
    background-size: cover;
}
.infoTitle .infoContent .infoImg3_active {
    background: url(./img/three.png) no-repeat center center;
    background-size: cover;
}
.infoTitle .infoContent .infoImg4_active{
    background: url(./img/four.png) no-repeat center center;
    background-size: cover;
}
.info-tips{
  text-align left 
  background #fff
  padding 0 15px 10px
  font-size 14px
}
</style>
