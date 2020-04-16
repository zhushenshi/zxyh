<template>
  <div class="container">
    <Header v-if="!header" />
    <slot name="main"></slot>
    <Footer v-if="!footer" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default{
  props:{
   header:{
     type:Boolean,
     default:false
   }, 
   footer:{
     type:Boolean,
     default:false
   }, 
  },
  components: {
    Header,
    Footer,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.container
  min-width 1200px
</style>
