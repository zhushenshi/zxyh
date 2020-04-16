<template>
  <div class="container">
    <MyHeader  ref="header">{{$t('lang.comm.registerAgreement')}}</MyHeader>
    <cube-scroll ref="scroll" :style="{height:height}" class="scroll-list-wrap">
      <div v-html='context' style="line-height:28px;text-align:left;padding:8px 8px 0;">

      </div>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: 'protocol',
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
      this.$ajax('post','/reg/getRegClause',{type:2},(data)=>{
        if(data.retData){
          this.context=data.retData.content
        }else{
          this.context='<div style="text-align: center;">暂无协议</div>'
        }
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
