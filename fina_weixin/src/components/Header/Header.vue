<template>
  <div class="header" :style="{'background':bgColor}">
    <div class="top" v-if="iosHeader"></div>
    <mt-header :title="title" fixed :style="{top:iosHeader?'24px':'0px',color:textColor}">
      <mt-button @click="getBack()" slot="left" icon="back">{{backText}}</mt-button>
      <mt-button @click="getRightFun()" :icon="rightIcon" slot="right">{{rightText}}</mt-button>
    </mt-header>
    <mt-header></mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MyHeader',
  data () {
    return {
      iosHeader: false
    }
  },
  props: {
    title:{
      type:String,
      default:''
    },
    backText:{
      type:String,
      default:''
    },
    backPath:{
      type:String,
      default:''
    },
    rightText:{
      type:String,
      default:''
    },
    rightIcon:{
      type:String,
      default:''
    },
    rightPath:{
      type:String,
      default:''
    },
    rightFunc:{
      type:String,
      default:''
    },
    bgColor:{
      type:String,
      default:'#FFFFFF'
    },
    textColor:{
      type:String,
      default:'#000000'
    },
  },
  mounted () {
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      this.iosHeader=true
    } else if (/android/.test(ua)) {
      this.iosHeader=true
    }
  },
  methods: {
    getBack(){
      if(this.$props.backPath){
        this.$router.push(this.$props.backPath)
      }else{
        this.$router.go(-1)
      }
    },
    getRightFun(){
      if (this.$props.rightPath) {
        this.$router.push(this.$props.rightPath)
      } else if (this.$props.rightFunc) {
        this.$emit(this.$props.rightFunc)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"
.top{
  height 24px
  background transparent
  position relative
  z-index 111
}
.mint-header{
	background: transparent;
	color: #fff;
}
</style>