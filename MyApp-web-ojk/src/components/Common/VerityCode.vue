<template>
  <div class="verityCode">
    <div class="verify-img" @click.prevent="refresh">
      <div class="verify-code-item" v-for="item in verifyArray" :style="item.style" :key="item.id">{{item.value}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 定义验证码的一些选择性数据
const colorArr = ['#000099', '#007d05', '#009688', '#f50000', '#1b9203', '#ba267a', '#960000', '#baa726', '#6666cc',
  '#cc6633', '#cc6633', '#3399cc', '#cc3333', '#336600', '#993333', '#ff9900', '#33cc99'];
const fontWeightArr = ['bold', 'lighter '];
const fontFamilyArr = ['Tahoma', 'Arial', 'Helvetica', 'Georgia', 'Lucida Grande', 'Times New Roman'];

export default {
  data() {
    return {
      verifyCodeLength: 4,
      verifyArray: []
    }
  },
  methods: {
    /**
    * 获取随机数值
    */
    getValue() {
      return Math.random().toString(36).substr(7, 1)
    },
    /**
     * 获取验证码样式
     */
    getStyle() {
      // 字体旋转样式
      let transformY = `translateY(${Math.floor((Math.random() - 0.5) * 10)}px)`
      let scale = `scale(${Math.random() + 0.8})`
      let rotate = `rotate(${Math.floor((Math.random() - 0.5) * 100)}deg)`
      // 字体大小
      let fontSize = `${18 + Math.floor((Math.random() - 0.5) * 2)}px`
      // 随机字体颜色
      // let r = Math.floor(Math.random() * 256)
      // let g = Math.floor(Math.random() * 256)
      // let b = Math.floor(Math.random() * 256)
      // let fontColor = `rgb(${r + ',' + g + ',' + b})`
      let fontColor = `${colorArr[Math.floor(Math.random() * colorArr.length)]}`
      // 固定字体类型
      let fontFamily = `${fontFamilyArr[Math.floor(Math.random() * fontFamilyArr.length)]}`
      // 加粗
      let fontWeight = `${fontWeightArr[Math.floor(Math.random() * fontWeightArr.length)]}`
      return {
        transform: `${transformY} ${scale} ${rotate}`,
        fontSize: fontSize,
        color: fontColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight
      }
    },
    /**
     * 刷新验证码
     */
    refresh() {
      var array = Array.from(Array(this.verifyCodeLength)).map(x =>
        ({
          value: this.getValue(),
          style: this.getStyle()
        })
      )
      this.verifyArray = array
    },
    mounted() {
      this.refresh()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.verify-img {
  float: left;
  height: 34px;
  width: 80px;
  border: 0;
  color: #000;
  cursor: pointer;
  line-height: 40px;
  position: relative;
  margin-left: 5px;
}

.verify-code-item {
  float: left;
  width: 20px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
