//提现回掉
<template>
  <div class="withdrawReturn">
    <div>提现成功</div>
    <button @click="goBack()">返回</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    }
  },
  methods:{
    goBack () {
      // var iframe = document.getElementById("iframe");
      // console.log(iframe)
      // console.log(iframe.parentNode)
      // console.log(this);
      // console.log(this.$parent.$parent);
      // console.log(document.querySelector('iframe'));
      // this.$parent.$router.push('/home/accountTab')
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
