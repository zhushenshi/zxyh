export const myMixin = {
  data() {
    return {
      isWeixin: false,
      height:''
    }
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    this.isWeixin=isWeixin
    this.height=(window.innerHeight-(!isWeixin?64:0))+"px"
  },
}