<template>
  <div class="AgreementVoucher">
      <!-- <iframe :src="url" frameborder="0"  id="main" style="min-height:600px;width:100%;height:100%;"></iframe> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        preservationid: '',
        url: ''
    }
  },
  created () {
      this.preservationid=this.$parent.$data.preservationid;
      if(this.preservationid){
        if(this.preservationid.substr(this.preservationid.length-3)=="633"){
          window.location="https://pre.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
          // this.url="https://pre.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
        }else{
          window.location="https://www.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
          // this.url="https://www.51cunzheng.com/investment-detail?recordNo="+this.preservationid;
        }
      }
  }
}
</script>

<style scoped lang="stylus">
iframe
    width 100%
    height 100%
</style>
