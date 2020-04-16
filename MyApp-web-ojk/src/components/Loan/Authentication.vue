
<template>
  <div class="container">
      <MyHeader ref="header">{{$t('lang.process.title')}}</MyHeader>
      <Process :index="2"></Process>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="authen" v-for="(item,index) in authList" @click="setNativeAuth(item.csConfigType,index)">
            <div class="imgBox"><img src="./img/phoneauto.png" alt=""></div>
            <div class="textBox">
              <div class="title">{{item.name}}</div>
              <div class="title-tips">{{$t('lang.authView.titleTips')}}</div>
            </div>
            <div class="right">
              <div class="title">{{item.state?auth.auth:auth.noAuth}}</div>
              <img width="40" src="./img/mustflag.png">
            </div>
          </div>
          <div class="wrapper"><div class="base-btn" @click="setNext()">{{$t('lang.comm.next')}}</div></div>
        </div>
      </cube-scroll>
    </div>
    <router-view style="z-index:5"></router-view>
  </div>
</template>

<script>
import Process from './Process/Process.vue';
export default {
  name: 'Authentication',
  data () {
    return {
      height:0,
      auth:{
        auth: this.$t('lang.comm.auth'),
        noAuth: this.$t('lang.comm.noAuth')
      },
      authList: [],
      authParam:{},
      authIndex: 0
    }
  },
  created(){
    this.getAuthList();
  },
  mounted (){
    this.height=(this.$Header+100)+'px'
    let _this=this
    /**
     * 授权结果返回
     * */
    window['MoXieAuthorizeCallback'] = function (msg) {
      _this.MoXieAuthorizeCallbackFun(msg)
    }
  },
  components:{
    Process
  },
  methods:{
    goPages(path){
      this.$router.push(path)
    },
    /**调用原生授权方法 */
    setNativeAuth(authType,index){
      this.authIndex=index;
      let _this=this;
      let param=this.authParam;
      let tel = param.tel,MX_key=param.MX_key,name = param.name,card = param.card;
      var option = ['carrier', 'userid', tel, name, card, MX_key];
      var ua = navigator.userAgent.toLowerCase();
      try {
        if (/iphone|ipad|ipod/.test(ua)) {
          window.webkit.messageHandlers.MoXieAuthorize.postMessage(option);
        }else if(/android/.test(ua)){
          object.MoXieAuthorize('carrier', 'userid', tel, name, card, MX_key)
        }
      }catch (e) {
        console.warn(e)
      }
    },
    /**授权成功前台回调 */
    MoXieAuthorizeCallbackFun(msg){
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      this.ISPAuthService();
      if(typeof(msg) == "string"){
        msg = eval('('+msg+')');
      }
      if(msg.retCode=="SUCCESS"){
        this.getNativeAuthSuccess(msg.retData.taskId)
      }else{
        this.$createDialog({type: 'alert',
          content: msg.retData.error_msg,
          confirmBtn:{
            text: lang.comm.confirm
          },
          onConfirm: () => {}
        }).show()
      }
    },
    /**授权成功调后台 */
    getNativeAuthSuccess(taskId){
      if(!taskId) {return}
      this.$ajax('post','/authorization/isBlack',{taskId: taskId},function(data){
        this.authList[this.authIndex].state='1'
      }.bind(this))
    },
    /**更新授权状态到后台跳转人脸识别 */
    updateState(){
      this.$ajax('post','/authorization/updateState','',function(data){
        this.goPages('/faceIdentity')
      }.bind(this))
    },
    /**授权成功回调 插入计费系统 */
    ISPAuthService(){
      this.$ajax('post','/authorization/phoneService','',function(data){}.bind(this))
    },
    /**下一步**/
    setNext(){
      let list=this.authList;
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      for(let i=0;i<list.length;i++){
        if(list[i].state!='1'){
          this.$Toast({ message: lang.authView.authTips,position:'bottom'});
          return;
        }
      }
      this.updateState()
    },
    /**获取授权列表**/
    getAuthList(){
      this.$ajax('get','/otherCofig/getOtherConfigByType?type=SQ',{},function(data){
        if(data.retData){
          if(data.retData&&data.retData[0]){
            this.authList.push({
              mxyys: data.retData[0].param.mxyys,
              name: data.retData[0].param.name,
              url: data.retData[0].param.url,
              state: data.retData[0].state
            })
            this.authParam.name=data.retData[0].person_name;
            this.authParam.card=data.retData[0].card;
            this.authParam.tel=data.retData[0].tel;
            this.getLogoDefaultInfo()
          }else{
            this.authParam={
              MX_key: '',
              name: '',
              tel: '',
              card: ''
            }
          }
        }
      }.bind(this))
    },
    getLogoDefaultInfo(){
      let _this=this;
      _this.$ajax('post','/getAppSetting',{},function(data){
        var data = data.retData;
        if(data.appSetting){
          _this.authParam.MX_key=data.appSetting.MX_key
        }
      },"",true)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background-color #F6F6F6
  position absolute 
  bottom 0
  top 0
  left 0
  right 0
.scroll-list-wrap
  background #F6F6F6
  position absolute 
  bottom 0
  left 0
  right 0
  .box
    font-size 14px
    .authen
      display flex
      height 50px
      position relative
      background #FFF
      padding 8px 
      margin-bottom 10px
      .imgBox
        margin:10px 5px 0 15px
        float left
        width 40px
        img
          height 40px
      .textBox
        float left
        margin: 8px 0 0 8px
        text-align left
        color #999
        line-height 21px
        .title
          color #333
        .title-tips
          font-size 11px
      .right
        position absolute;
        right 0
        line-height 20px
        .title
          font-size: 12px
          margin-right: 33px
          margin-top:14px
          color: #999
        img 
          position: absolute
          top:0
          right: 0
  .wrapper
     margin 50px 20px 0
     height 180px
</style>
