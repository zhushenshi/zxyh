<template>
  <div class="container">
    <div class="logo">
      <img :src="logoSrc" alt="" style="min-width:100px;">
    </div>
    <!-- <div class="text">
      荷包袋
    </div>     -->
    <div class="download">
        <div class="bittonGroup">
          <button class="android" @click="jumpToDownload(androidUrl)"><span class="buttonIcon"></span><span>安卓下载</span></button>
        </div>
        <div class="bittonGroup">
          <button class="apple" @click="jumpToDownload(appleUrl)"><span class="buttonIcon"></span><span>苹果下载</span></button>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DownLoadPage',
  data () {
    return {
      androidUrl:'',
      appleUrl:'',
      logoSrc:''
    }
  },
  created (){
    this.$ajax('post','/baseSetting/getBaseSetting','',(data)=>{
      console.log(data)
      var list=data.retData
      list.forEach((element) => {
        if(element.dictCode === 'androidDownLoadUrl'){
          this.androidUrl=element.remark  
        }else if(element.dictCode === 'iosDownLoadUrl'){
          this.appleUrl=element.remark
        }else if(element.dictCode === 'appLogo'){
          this.logoSrc=element.remark
        }
      });
    })
  },
  methods:{
    jumpToDownload(downUrl){
              // window.open(downloadAddress);
      var ua = navigator.userAgent.toLowerCase();
      if(/iphone|ipad|ipod/.test(ua)){//ios
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
              this.$Toast({message: '请点击微信右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可下载APP',position: 'bottom'});
          } else {
              window.open(downUrl);
          }
      }else{
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
              this.$Toast({message: '请点击微信右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可下载APP',position: 'bottom'});
          } else {
              window.open(downUrl);
          }
      }
    }
  },
  components:{
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.container
  max-width: 750px;
  margin: 0 auto;
  min-height: 100vh;
  background: url(./img/page-bg.png) no-repeat center center;
  background-size: contain;
  text-align: center;
  .logo img
    margin-top: 80px;
    width: 120px;
    text-align: center;
    min-height:100px
  .text
    font-weight 700
    line-height 30px
    font-size 24px
  .download
    margin-top: 55px;
    .bittonGroup
      height: 44px;
      padding-bottom: 25px;
      button
        height: 44px;
        width: 280px;
        border: none;
        outline: none;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
        position: relative;
      button.android
        background: #53A7FD;
        .buttonIcon
          background: url(./img/android.png) no-repeat center center;
          background-size: cover;
          vertical-align: middle;
          display: inline-block;
          width: 18.5px;
          height: 22.5px;
          margin-right: 5px;
      button.apple
        background: #52C3FD;
        .buttonIcon
          background: url(./img/apple.png) no-repeat center center;
          background-size: cover;
          vertical-align: middle;
          display: inline-block;
          width: 18.5px;
          height: 22.5px;
          margin-right: 5px;
</style>