<template>
  <cube-popup type="agreement-popup" :visible='loading' ref="agreementPopup">
    <div class="withdrawal">
      <div class="popup-body" id="popup-body">
        <div class="title">{{title}}</div>
        <cube-scroll ref="scroll" @scroll-end="scroll" :scrollEvents="scrollEvents" :options="options">
          <div class="scroll-contianer" id="scroll-contianer">
            <div v-html="context" class="context"></div>
            <div v-if="!context&&getAgreementFlag" style="text-align: center;">{{$t('lang.ojk.noAgree')}}</div>
          </div>
        </cube-scroll>
      </div>
      <div class="popup-footer">
        <div class="btn-container" v-if="!showClose">
          <div :class="{'base-btn':true,'scrollEnd':!scrollEnd}" @click="close">{{$t('lang.ojk.agree')}}</div>
          <div :class="{'base-btn':true, 'refuse':true}" @click="close">{{type=='1'?$t('lang.ojk.refuse'):'kembali'}}</div>
        </div>
      </div>
      <img class="popup-close" v-if="showClose" @click="close" src="./img/close.png" alt="">
    </div>
  </cube-popup>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'agreement',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '1'
    },
    productId: {
      type: String,
      default: ''
    },
    periodsId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      options: {
        scrollbar: true
      },
      context: '',
      title: '',
      showClose: '',
      scrollEvents: ['scroll-end'],
      scrollEnd: false,
      hasContent: false,
      getAgreementFlag:false
    }
  },
  created () {
    this.showClose=this.$props.type=='1'?false:false
    this.getAgreement()
    this.getAgreementFlag=false
  },
  methods: {
    scroll(pos) {
      if (!this.hasContent || this.scrollEnd) {
        return;
      }
      let scrollHeight=document.getElementById("scroll-contianer").scrollHeight
      let clientHeight=document.getElementById("popup-body").clientHeight
      let contents=scrollHeight - clientHeight + 20;
      let scrollHeights=Math.abs(pos.y);
      if(Math.abs(contents - scrollHeights)<=20){
        this.scrollEnd=true
      }else{
        this.scrollEnd=false
        setTimeout(()=>{
          if(!this.$refs.scroll.scroll.hasVerticalScroll){
            this.scrollEnd=true
          }else{
            this.scrollEnd=false
          }
        },500)
      }
    },
    close(e){
      if(e.target.className.indexOf("refuse")>-1){
        this.$emit('closePopup',e)
      }
      if(!this.scrollEnd){
        return
      }
      this.$emit('closePopup',e)
    },
    getAgreement (){
      let productId=this.$props.productId
      let periodsId=this.$props.periodsId
      this.$ajax('post','/reg/getRegClause',{
        type:this.$props.type,
        productId: productId,
        periodsId: periodsId
      },(data)=>{
        this.getAgreementFlag=true
        if(data.retData){
          this.context=data.retData.content
          this.title=data.retData.title
        }
        setTimeout(()=>{
          this.hasContent = true
          if(!this.$refs.scroll.scroll.hasVerticalScroll){
            this.scrollEnd=true
          }else{
            this.scrollEnd=false
          }
        },500)
      })
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
.withdrawal{
  background #ffffff
  border-radius 4px
  font-size 14px
  position relative
  .popup-header{
    padding 20px 15px
    font-size 12px
    color #B1AEAD
    background #FFF9F6
    border-top-left-radius 4px
    border-top-right-radius 4px
    text-align center
  }
  .popup-body{
    background #fff
    padding 10px 15px
    height 13rem
    overflow hidden
    word-break: break-word;
    .title{
      font-weight bold
      font-size 20px
      padding 0 0 10px 0
      text-align center
    }
    .context{
      padding-bottom 25px
    }
  }
  .popup-footer{
    margin 10px 15px
    background #fff
    padding-bottom 10px
  }
  .popup-close{
    position absolute
    bottom -40px
    width 30px
    height 30px
    left 50%
    right 0
    z-index 1
    transform translateX(-50%)
  }
  .btn-container{
    display flex;
    text-align center
    // margin-bottom 40px
    .base-btn:first-child{
      margin-right 5px
      background #4285F4
    }
    .base-btn:last-child{
      margin-right 0
      margin-left 5px
    }
    .scrollEnd{
      background #ddd!important
    }
  }
}
</style>
