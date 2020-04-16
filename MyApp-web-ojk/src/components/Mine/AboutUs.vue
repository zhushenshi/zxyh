<template>
  <div class="aboutUs">
    <MyHeader  ref="header">关于我们</MyHeader>
        <div class="scroll-list-wrap" :style="{top:height}">
          <cube-scroll ref="scroll" >
          <div class="box">
            <div>
            <img :src="img" alt="" class="aboutImg">
            <div class="content">
            <p v-html="content"></p>
          </div>
            </div>
          </div> 
          </cube-scroll>
        </div>
  </div>
</template>

<script>
export default {
  name: 'aboutUs',
  data () {
    return {
      // items: _data,
      height:0,
      content:'',
      img:''
    }
  },
  components:{
  },
  methods: {
     getData (){
      let _this=this
      _this.$ajax('post','/aboutUs/getContext','',function(data){
        _this.content=data.retData.content
        _this.img=data.retData.title
     })
    }
},
  mounted(){
    this.getData()
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
.aboutUs
 background #ffffff
.aboutImg
  width 100%
  height 300px
.content
  font-size 14px
  text-align left 
  padding 15px
  p
   line-height 24px
</style>
