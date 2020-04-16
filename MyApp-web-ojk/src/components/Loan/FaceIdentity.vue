<template>
  <div class="container">
      <MyHeader ref="header">{{$t('lang.process.title')}}</MyHeader>
      <Process :index="3"></Process> 
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="title"><i class="iconfont icon-ai-camera"></i>{{$t('lang.faceView.tips')}}</div>
          <div class="info">{{$t('lang.faceView.step')}}</div>
          <div class="faceImg"><img :src="faceSrc" alt=""></div>
          <div class="wrapper"><div class="base-btn btn" @click="getLiveCertificate()">{{$t('lang.faceView.faceBtn')}}</div></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import  faceImg from './img/livecercate.png'
import Process from './Process/Process.vue'
import { Indicator} from 'mint-ui'
export default {
  name: 'Authentication',
  data () {
    return {
      height:0,
      faceSrc:faceImg,
      canClick: true
    }
  },
  created(){
  },
  mounted (){
    this.height=(this.$Header+100)+'px';
    let _this=this
    /**
     * 人脸识别
     * */
    window['faceDistinguishCallback'] = function (msg) {
      _this.getMegLiveSuccess(msg)
    }
  },
  methods:{
    /**人脸认证获取参数**/
    getLiveCertificate(){
      if(!this.canClick){return};
      this.canClick=false;
      //type 0=系统配置参数(cs_config_type:200-299);
      //1=风控配置（cs_config_type:100-199）;
      //2=支付配置(cs_config_type:0-99);
      //3=短信配置(cs_config_type:300-399);
      //4=ocr/人脸（400-499）
      this.$ajax('get','/otherCofig/getOtherConfigByType?type=FACE','',function(data){
        Indicator.open({text: '',spinnerType: 'fading-circle'});
        if(data.retData&&data.retData[0]){
          let param=data.retData[0].param;
          let csConfigType=data.retData[0].csConfigType;//ocr/人脸（400-499）400faceOcr 401 魔蝎Ocr
          let face_key=param.face_key,
              face_secret=param.face_secret;
          let ua = navigator.userAgent.toLowerCase();
          let certificateName = data.retData[0].person_name;
          let certificateCard = data.retData[0].card;
          let option = [certificateCard, certificateName,face_key,face_secret];
          try{
            if (/iphone|ipad|ipod/.test(ua)) {
              window.webkit.messageHandlers.faceDistinguish.postMessage(option);
            }else if(/android/.test(ua)){
              object.faceDistinguish(certificateCard, certificateName,face_key,face_secret)
            }
          }catch(e){
            console.warn(e)
            Indicator.close()
            this.canClick=true
          }
        }
      })
    },
    /**人脸认证前台识别成功**/
    getMegLiveSuccess(msg){
      this.faceService();
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      if(typeof(msg)=="string"){
        msg=eval('('+msg+')');
      }
      if(msg.retCode!="SUCCESS"){
        this.$createDialog({type: 'alert',
          content: lang.comm.failure,
          confirmBtn:{
            text: lang.comm.confirm
          },
          onConfirm: () => {}
        }).show()
        this.canClick=true
        Indicator.close()
        return
      }
      let data=msg.retData;
      let confidence=data.confidence;
      let thOfFour=data.thOfFour;
      let image = data.image;
      if(Number(confidence)<Number(thOfFour)){
        this.$Toast({message:lang.comm.failure,position:'bottom'})
        this.canClick=true
        Indicator.close()
        return
      }
      this.$ajax('post','/miaofuOrder/saveFace',{
        person_face_complete:'100',
        face_src:image, 
        orderId:''
      },function(data){
        this.canClick=true
        Indicator.close()
        this.getOpenAccountCard()
      }.bind(this))
    },
    /**调用后台计费系统**/
    faceService:function () {
      this.$ajax('post','/authorization/faceService','',function(data){}.bind(this))
    },
    /**判断是否绑卡**/
    getOpenAccountCard(){
      this.$ajax('post','/payTreasure/getOpenAccountCard','',function(msg){
        let data = msg.retData;
        if(data.is_openAccount=='0'){// 未开户
          this.$router.push({name:'ChangeCreditCard',params:{from:'face'}})
        }else{
          this.addLoanNoContract();
        }
      }.bind(this))
    },
    /**无合同增加借据**/
    addLoanNoContract(){
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/loanAgreement/addLoanNoContract','',function(msg){
        this.$router.push({
          name:'ApplyStatus',
          params:{HeaderTitle:lang.process.title,msgMain:lang.process.success,msg:'',btnTxt:lang.process.backHome,path:'/portal'}
        })
      }.bind(this))
    }
  },
  components:{
    Process
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
  background #FFF
  position absolute 
  bottom 0
  left 0
  right 0
  .box
    font-size 14px
    .title
      font-size 20px
      padding 32px 0 10px
      i
        font-size 25px
        position relative
        bottom -2px
        margin-right 5px
    .info
      font-size 12px
      color: #ccc;
    .faceImg
      padding-top 30px
      img
        width 280px
        margin auto
  .wrapper
     margin-top 30px
     height 180px
    .btn
      width 280px
      margin auto
</style>
