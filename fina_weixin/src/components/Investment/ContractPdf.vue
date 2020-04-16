<template>
  <div class="container">
		<div class="MyHeader" v-if="!isWeixin"><MyHeader :title="'说明书'"></MyHeader></div>

    <div class="scroll-list-wrap" :style="{top:topHeight}">
      <!-- <cube-scroll ref="scroll" > -->
        <!-- <iframe :src="'./static/PDF/web/viewer.html?file='+url" frameborder="0"></iframe> -->
        <iframe :src="'./static/PDF/web/viewer.html?file='+path" frameborder="0"></iframe>
        <div class="protocol" @click="isAgree=!isAgree">
          <i class="mintui mintui-field-success" :class="isAgree?'checked':'noCheck'">
            <input type="checkbox" class="checkboxs">
          </i>        
          <span style="color:#9e9e9e;">已阅读并同意</span><span style="color:#9e9e9e;">说明书</span>
        </div>
        <div class="margin"><div class="base-btn btn" @click="confirm()">确认说明书</div></div>
      <!-- </cube-scroll> -->
    </div>
  </div>
</template>

<script>
// import { httpUrl } from '../../common/js/configuration'
export default {
  name: 'ContractPdf',
  data () {
    return {
      isAgree:true,
      productId:'',
      url:'',
      height:'',
      checkCashTime:true,
      checkCashTimemsg:'',
      path:'',
      topHeight:''
    }
  },
created(){
    // this.productId='6564654654'
    // this.$ajax('post','/order/getLoanGreement',{type:3},function(data){
    //   this.url='httpUrl'+data.retData.fileName
    //   this.path=data.retData.url
    // }.bind(this))
    this.path=this.$route.query.path
  },
  mounted(){
    this.topHeight=!this.isWeixin?"64px":0
  },
  methods:{
    confirm(){
      if(!this.isAgree){
        this.$Toast({message:'请先阅读并同意说明书!'})
        return        
      }
      this.$router.go(-1) 
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.scroll-list-wrap
  position fixed
  bottom 115px
  left 0
  right 0
  top:64px
  iframe 
    width 100%
    height 100%
.protocol
  line-height:30px 
  font-size 12px
  text-align:left
  padding-left:3px;
  color #9e9e9e
  margin:10px 0 0 0
  text-align center
  .noCheck
    color #9e9e9e
  .checked
    color $color-icon-checked
  i
    font-size:18px;
    position:relative;
    bottom:-2px
  .checkboxs
    position absolute
    left 0px
    top 0px
    height 18px
    width 18px
    opacity 0
  span
    color:#000
.margin
  margin 5px 40px 0 40px  
.base-btn{
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fa7009;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
}
</style>