<template>
  <div class="sina">
      <!-- <iframe id="iframe" :src="url" frameborder="0"></iframe> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
  },
  created () {
    try {
      this.url=window.Vue.$sina;
      window.location=this.url
    } catch (error) {
      
    }
  }
}
</script>

<style scoped lang="stylus">
iframe
    width 100%
    height 100%
</style>
