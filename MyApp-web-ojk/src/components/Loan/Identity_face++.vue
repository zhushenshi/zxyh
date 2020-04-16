
<template>
  <div class="container">
      <MyHeader ref="header">额度申请</MyHeader>
    <Process :index="0"></Process> 
    <div class="scroll-list-wrap" :style="{height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="title">扫描身份证，进行身份信息认证</div>
          <div class="imgBox">
            <div class="img">
              <div @click="callHander('0')" class="imgContainer"><img :src="form.icCardImg1" alt=""></div>
              <div>身份证正面</div>
            </div>
            <div class="img">
              <div @click="callHander('1')" class="imgContainer"><img :src="form.icCardImg2" alt=""></div>
              <div>身份证反面</div>
            </div>
          </div>
          <div class="tips">请确认以下身份证信息是否正确</div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="icon"><i style="color:#42a5e8;" class="iconfont icon-Icon_wode"></i></div>
            <div class="label">真实姓名</div>
            <div class="text"><input type="text" v-model="form.custName" @click="prompt()" :readonly="!scanFront"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="icon"><i style="color:#c9820c;" class="iconfont icon-xingbie"></i></div>
            <div class="label">性别</div>
            <div class="text"><input type="text" readonly="true" v-model="form.sex" @click="prompt()"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="icon"><i style="color:#F53434;" class="iconfont icon-riqi"></i></div>
            <div class="label">出生日期</div>
            <div class="text"><input type="text" readonly v-model="form.birthday" @click="prompt()"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="icon"><i style="color:#7c8efe;" class="iconfont icon-credentials_icon"></i></div>
            <div class="label">身份证号码</div>
            <div class="text"><input type="text" readonly v-model="form.cardNum" @click="prompt()"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="icon"><i style="color:#64d178;" class="iconfont icon-dizhi"></i></div>
            <div class="label">户籍地址</div>
            <!-- <div class="text"><input type="text" readonly v-model="form.cardAddress" @click="prompt()"></div> -->
            <!-- <div class="text"><textarea readonly rows="" cols="" v-model="form.cardAddress" @click="prompt()"></textarea></div> -->
            <div class="text" @click="prompt()"><span class="cardAddress">{{form.cardAddress}}</span></div>
          </div>
          <div class="warn">
            <i class="iconfont icon-jinggao"></i>完成后请确认身份信息正确无误
          </div>
          <div class="wrapper"><div class="base-btn" @click="saveRealNameInfo()">确认无误</div></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
const column1 = [{ text: '男', value: 0}, { text: '女', value: 1 }]
const nameReg=/^[\u4E00-\u9FA5]{2,15}$/
import idcardFront from './img/idcardFront.png'
import idcardBack from './img/idcardBack.png'
import Process from './Process/Process.vue'
export default {
  name: 'Identity',
  data () {
    return {
      height:0,
      form:{
        custName:'',
        cardNum:'',
        sex:'',
        nation:'',
        birthday:'',
        cardAddress:'',
        creditIssueOrg:'',
        cardEffectedDate:'',
        icCardImg1:idcardFront,
        icCardImg2:idcardBack,
      },
      scanFront:false,
      scanBack:false,
      innerHeight:''
    }
  },
  methods:{
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [column1],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    prompt(){
      if(!this.scanFront){
        this.$Toast({message:'请先扫描身份证正面',position:'bottom'});
        return false;
      }
      if(!this.scanBack){
        this.$Toast({message:'请先扫描身份证反面',position:'bottom'});
        return false;
      }
      return true
    },
    //   /customer/saveRealName
    //    * @param String custName 真实姓名
    //    * @param String cardNum 身份证号码
    //    * @param String sex 性别
    //    * @param String nation 民族
    //    * @param String birthday 出生日期 yyyy-MM-dd
    //    * @param String cardAddress 身份证证件地址
    //    * @param String creditIssueOrg 签发机关
    //    * @param String cardEffectedDate 身份证有效期
    //    * @param String icCardImg1 身份证正面照片
    //    * @param String icCardImg2 身份证反面照片
    //调原生接口
    callHander(type){
      let _this=this
      //option 1、//0:人像面  1:国徽面
      //option 2、//0:竖屏  1:横屏
      var option=[type,"1"];
      this.$Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
      });
      if (!this.$IsIphone) {//安卓
        try{
          if(device&&typeof(device.idCardAuth)=="function"){
            device.idCardAuth(_this.getMegIDCardQualitySuccess,_this.getMegIDCardQualityError,option);
            _this.$Indicator.close()
          }else{}
        }catch(e){
          alert(e)
        }
      } else{//ios
        try{
          if(device.getMegIDCardQuality){
            device.getMegIDCardQuality(_this.getMegIDCardQualitySuccess,_this.getMegIDCardQualityError,option);
            _this.$Indicator.close()
          }else{}
        }catch(e){
          alert(e)
        }
      }
      setTimeout(()=>{this.$Indicator.close();},100)
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      // this.$createDialog({
      //   // type: 'warn',
      //   // content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
      //   // icon: 'cubeic-alert'
      // }).show()
    },
    getMegIDCardQualitySuccess (msg) {//身份证识别成功
      let _this=this
        if(typeof(msg)=="string"){
            msg=eval('('+msg+')');
        }
        var data=msg.data;
        if(typeof(data)=="string"){
            data=eval('('+data+')');
        }
        var img='123'
        // alert(JSON.stringify(data))
        _this.$ajax('post','/upload/uploadFile',{fileBase64:"data:image/png;base64,"+msg.image},function(info){
          if(data.xh_side=="front"){//人像面
            // this.form.icCardImg1="data:image/png;base64,"+msg.image
            _this.form.icCardImg1=info.retData
            _this.form.custName=data.xh_name//姓名，
            _this.form.cardNum=data.xh_id_card_number//身份证号码
            _this.form.sex=data.xh_gender//性别
            _this.form.nation=data.xh_race//民族
            _this.form.birthday=data.xh_birthday//出生日期
            _this.form.cardAddress=data.xh_address//身份证证件地址
            _this.scanFront=true//人像面已扫描
          }else if(data.xh_side=="back"){
            // this.form.icCardImg2="data:image/png;base64,"+msg.image
            _this.form.icCardImg2=info.retData
            _this.form.creditIssueOrg =data.xh_issued_by//签发机关
            _this.form.cardEffectedDate =data.xh_valid_date_end//身份证有效期
            _this.scanBack=true//国徽面已扫描
          }
        })
      
        this.$Indicator.close()
    },
    getMegIDCardQualityError (msg) {//身份证识别失败
        this.$Indicator.close()
        // alert(msg);
    },
    //保存实名认证信息
    saveRealNameInfo(){
      let This=this;
      if(!This.prompt()){
        return false
      }
      if(!This.form.custName){
        This.$Toast({message:'姓名不能为空',position:'bottom'})
        return false
      }
      if(!nameReg.test(This.form.custName)){
        This.$Toast({message: '姓名请输入2-15个汉字', position:'bottom'})
         return false
      }
      // alert('身份号'+!This.form.cardNum+This.form.cardNum)
      // alert('性别'+!This.form.sex+This.form.sex)
      // alert('民族'+!This.form.nation+This.form.nation)
      // alert('生日'+!This.form.birthday+This.form.birthday)
      // alert('地址'+!This.form.cardAddress+This.form.cardAddress)
      // alert('签发'+!This.form.creditIssueOrg+This.form.creditIssueOrg)
      // alert('有效'+!This.form.cardEffectedDate+This.form.cardEffectedDate)
      if(!This.form.cardNum||!This.form.sex||!This.form.nation||!This.form.birthday||!This.form.cardAddress||!This.form.creditIssueOrg||!This.form.cardEffectedDate){
        This.$Toast({message:'请重新扫描身份证',position:'bottom'})
        return false
      }
      // if(This.form.icCardImg1==idcardFront||This.form.icCardImg2==idcardBack){
      //   This.$Toast({message:'请重新扫描身份证',position:'bottom'})
      //   return
      // }
      This.$ajax('post','/customer/saveCustomerCardInfo',This.form,function(data){
        This.$router.push('/personalInfo')
      })
    },
    getRealNameInfo(){
      let This=this
      This.$ajax('post','/customer/getCustomerCardInfo','',function(data){
        if(data.retData.custName){
        var customer=data.retData;
        This.form.custName=customer.custName//姓名，
        This.form.cardNum=customer.cardNum//身份证号码
        This.form.sex=customer.sex//性别
        This.form.nation=customer.nation//民族
        This.form.birthday=customer.birthday//出生日期
        This.form.cardAddress=customer.cardAddress//身份证证件地址
        This.form.creditIssueOrg=customer.creditIssueOrg//签发机关
        This.form.cardEffectedDate=customer.cardEffectedDate//身份证有效期
        This.form.icCardImg1=customer.videoList[0].path
        This.form.icCardImg2=customer.videoList[1].path
        This.scanFront=true
        This.scanBack=true
        }
      })
    },
    cancelHandle() {
      // this.$createToast({
      //   type: 'correct',
      //   txt: 'Picker canceled',
      //   time: 1000
      // }).show()
    },
  },
  created(){
    this.getRealNameInfo()
  },
  mounted (){
    // this.height=(window.innerHeight-this.$Header)/37.5+'rem'
    this.height=(window.innerHeight-this.$Header-100)+'px'
    this.innerHeight=window.innerHeight
  },
  beforeDestroy(){
    window.innerHeight=this.innerHeight
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
  .box
    font-size 14px
    .imgBox
      display flex
      justify-content center
      .img
        width 48%
        line-height 30px
        .imgContainer
          height 100px
          img 
            width 82%
            height 92px
  .box
    font-size 14px
    .title
      font-size: 16px;
      text-align: center;
      padding: 27px 0 27px 0;
      color: rgb(51,51,51);
      font-weight: 600;
    .tips
      line-height 50px
      background: #F6F6F6;
      padding-left 37px
      text-align left
      color #686868
    .form
      font-size 14px
      display flex
      line-height 42px
      height 42px
      border-bottom: 1px dashed rgb(241, 241, 241);
      text-align left
      .icon
        flex 1
        padding-left 5px
        text-align center
        i
          // margin 5px
          font-size 20px
          position relative
          // bottom -3px
          width 40px
      .label
        flex 2
      .text 
        flex 6
        position relative
        input
          height 100%
          width 100%
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        textarea
          padding 0
          margin 0
          // height 100%;
          vertical-align middle
          // padding-top 5px
          width 100%
          line-height 21px
          height 100%
          border none
          // text-rendering: auto;
          // color: initial;
          // letter-spacing: normal;
          // word-spacing: normal;
          // text-transform: none;
          // text-indent: 0px;
          // text-shadow: none;
          // display: inline-block;
          // text-align: start;
          // margin: 0em;
          font: 400 13.3333px Arial;
          // overflow:hidden; //超出的文本隐藏
          // text-overflow:ellipsis; //溢出用省略号显示
          // white-space:nowrap; //溢出不换行
          outline:none
        .cardAddress
          line-height 21px
          display inline-block
          // position absolute
          // top 0
          // bottom 0
          // margin auto
          height auto
  .warn
    font-size 14px
    line-height 45px
    color red
    i
      margin 5px
      font-size 20px
      position relative
      bottom -3px
  .wrapper
     margin 0 20px
     height 180px
</style>
