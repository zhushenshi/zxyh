<template>
  <div class="container">
    <MyHeader  ref="header">用户授权协议</MyHeader>
    <cube-scroll ref="scroll" :style="{height:height}" class="scroll-list-wrap">
      <div v-html='context' style="line-height:28px;text-align:left;padding:8px 8px 0;">

      </div>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: 'protocolUser',
  data () {
    return {
      context:'',
      height:''
    }
  },
  created(){
    this.getAgreement()
    this.height=window.innerHeight-this.$Header+'px'
  },
  methods:{
    getAgreement (){
      this.$ajax('post','/order/getSQAgreement',{companyCode:this.$parent.companyCode},(data)=>{
        this.context=data.retData.context
      })
    },
  },
  components:{
  }
}
</script>

<style scoped lang="stylus">
.scroll-list-wrap
  position absolute
  bottom 0
  left 0
  right 0
</style>
