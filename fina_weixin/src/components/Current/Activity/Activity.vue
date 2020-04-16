<template>
	<div class="activity">
		<iframe :src="baseUrl+url" frameborder="0" class="activityIframe"></iframe>
	</div>
</template>

<script>
export default {
  name: 'Activity',
  data () {
    return {
      url: '',
      baseUrl: 'https://www.19licai.com/zwp2p/'
    }
  },
  methods: {
	},
	created () {
    this.url=this.$parent.$data.url;
	},
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.activityIframe
  height 100%
  width 100%
</style>