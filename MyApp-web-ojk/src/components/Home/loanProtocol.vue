<template>
  <div class="container">
      <MyHeader ref="header" :backIconShow="true" :backPath="'/portal'">授权协议</MyHeader>
    <div class="scroll-list-wrap" :style="{top:headerHeight}">
      <!-- <cube-scroll ref="scroll" > -->
        <iframe :src="'./static/PDF/web/viewer.html?file='+url" frameborder="0" style="width:100%;height:100%;"></iframe>
    </div>
  </div>
</template>

<script>
import { httpUrl } from '../../common/js/configuration'
export default {
  name: 'loanProtocol',
  data () {
    return {
      isAgree:false,
      headerHeight:'',
      url:''
      // url:'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    }
  },
  methods:{

  },
  created(){
    this.$ajax('post','/order/getLoanGreement',{type:1},function(data){
      this.url=httpUrl+data.retData.fileName

      ///暂时
    }.bind(this))
    this.headerHeight=this.$Header+'px'
  },
  mounted(){

  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  iframe 
    width 100%
    height 100%
</style>