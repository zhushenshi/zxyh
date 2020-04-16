<template>
  <div class="container">
      <MyHeader ref="header" :backIconShow="true" :backPath="'/portal'">借款合同</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <!-- <cube-scroll ref="scroll" > -->
        <iframe :src="'./static/PDF/web/viewer.html?file='+url" frameborder="0"></iframe>
        <!-- http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf -->
        <div class="protocol" @click="isAgree=!isAgree">
          <i class="iconfont icon-yiyuedu" :class="isAgree?'checked':'noCheck'">
               <input type="checkbox" class="checkboxs">
          </i>        
          <span style="color:#9e9e9e;">已阅读并同意</span><span style="color:#9e9e9e;">合同</span>
        </div>
        <div class="margin"><div class="base-btn btn" @click="confirm()">确认合同</div></div>
      <!-- </cube-scroll> -->
    </div>
  </div>
</template>

<script>
import { httpUrl } from '../../common/js/configuration'
export default {
  name: 'ContractPdf',
  data () {
    return {
      isAgree:true,
      productId:'',
      url:'',
      height:'',
      path:''
    }
  },
created(){
    this.productId='6564654654'
    this.$ajax('post','/order/getLoanGreement',{type:3},function(data){
      this.url=httpUrl+data.retData.fileName
      this.path=data.retData.url
    }.bind(this))
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
  },
  methods:{
    confirm(){
      if(!this.isAgree){
        this.$Toast({message:'请先阅读并同意合同!'})
        return        
      }
        this.$ajax('post','/order/getCreditContract','',()=>{
          //合同
        },'',true)      
      this.$ajax('post','/order/getLoanGreementResult',{pdfPath:this.path,type:3},function(data){
       let  contractNo =data.retData.contractNo
        this.$ajax('post','/order/saveOrderInfo',{productId:this.productId,couponId :'',contractNo:contractNo},function(data){
          if(data.retCode=='SUCCESS'){
            this.$store.commit("tabPage", '首页')
            this.$router.push({name:'ApplyStatus',params:{HeaderTitle:'借款申请',msgMain:'借款申请提交成功！',msg:'请等待审核结果',btnTxt:'查看我的订单',path:'/order'}})
          }
        }.bind(this),32000)
      }.bind(this))   
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
</style>