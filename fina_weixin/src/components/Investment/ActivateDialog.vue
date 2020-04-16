<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow"  @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
         
          <slot><img src="../../assets/images/programDetail/activate_account.png"></slot>
           <router-link :to="{name: 'activeSina'}" class="dialog-button">立即绑卡</router-link>
           <p class="dialog-close" @click="closeMyself">x</p>
        </div>
      </transition>
			
    </div>
  </div>
</template>

<script>
import fontSizeFit from "@/utils/font-size-fit.js";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .7;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  position: fixed;
  overflow: auto;
  z-index: 10;
  top: 50%;
}
.dialog-content img{
    width:100%;
    height:100%
}
.dialog-button {
  width: 100%;
  position: absolute;
  color:#fa700d;
  text-align: center;
  cursor: pointer;
}
.dialog-close {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
<style lang="stylus" scoped>
$ratio = 47
.dialog-content 
  width (895rem/$ratio)
  height (1150rem/$ratio)
  left (92.5rem/$ratio)
  margin-top (-575rem/$ratio)
.dialog-button 
  right (0rem/$ratio)
  bottom (179rem/$ratio)
  height (150rem/$ratio)
  line-height (150rem/$ratio) 
  font-size (46rem/$ratio)
.dialog-close {
  height  (90rem/$ratio) 
}
</style>