<template>
	<div class="loanapply">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="params.title" bgColor="#FFFFFF" textColor="#000"></MyHeader></div>
    <div class="container" style="overflow:scroll;" :style="{top:!isWeixin?'64px':0}">
      <div class="wrapper" ref="wrapper" >
        <div class="content" style="padding-top:15px;">
          <div class="items" style="padding-bottom:15px;">
            <div class="item-label">贷款金额</div>
            <div class="item-value">
              <mt-field label="" class="mountField" placeholder="请输入贷款金额" :attr="{ maxlength: 10 }" v-model="form.amount"></mt-field>
              <span class="item-unit" style="font-size:22px;">元</span>
            </div>
          </div>
          <div class="items item-field">
            <div class="item-value">
              <mt-field label="借款期限" placeholder="请输入" :attr="{ maxlength: 4 }" v-model="form.periods">
              <span class="item-unit" style="vertical-align: middle;height:25px;width:15px;top:-2px;right:-15px;line-height: 1.6;">月</span>
              </mt-field>
            </div>
            <mt-field label="姓名" placeholder="请输入" :attr="{ maxlength: 10 }" v-model="form.name"></mt-field>
            <mt-field label="身份证号" placeholder="请输入" :attr="{ maxlength: 18 }" v-model="form.idCard"></mt-field>
            <mt-field label="手机号" placeholder="请输入" :attr="{ maxlength: 11 }" v-model="form.tel"></mt-field>
            <mt-field v-if="params.type == 4||params.type == 5" label="企业名称" placeholder="请输入" :attr="{ maxlength: 20 }" v-model="form.businessName"></mt-field>
            <mt-field label="借款用途" placeholder="请输入" :attr="{ maxlength: 10 }" v-model="form.purpose"></mt-field>
          </div>
          <div class="items" v-if="params.type == 4||params.type == 5">
            <div class="item-label">企业营业执照上传</div>
            <div class="item-img">
              <div style="position:relative;" @click="uploadImg(1)">
                <img :src="form.businessLicense" alt="">
                <input style="border:1px solid red;position:absolute;width:100%;height:100%;left:0;right:0;top:0;bottom:0;opacity:0;" type="file" @change="imgChange($event,1)" accept="image/*">                 
              </div>
            </div>
          </div>
          <div class="items" v-if="params.type != 4&&params.type != 5">
            <div class="item-label">上传身份证</div>
            <div class="item-img-container">
              <div class="item-img item-card" @click="uploadImg(2)">
                <div class="img-box">
                  <img :src="form.idCardFront" alt="">
                  <input class="inputPlace" type="file" @change="imgChange($event,2)" accept="image/*">                  
                </div>
                <span class="item-card-title">身份证正面</span>
              </div>
              <div class="item-img item-card" @click="uploadImg(3)">
                <div class="img-box">
                  <img :src="form.idCardBack" alt="">
                  <input class="inputPlace" type="file" @change="imgChange($event,3)" accept="image/*"> 
                </div>
                <span class="item-card-title">身份证反面</span>
              </div>
            </div> 
          </div>
          <div class="base-button-container">
            <div class="base-button" @click="apply">确定</div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {baseURL} from '../../../vuex/url.js'
export default {
  name: 'loanapply',
  data () {
    return {
      height: 0,
      params:'',//
      type:'',
      form:{
        type:'',
        amount: '',
        periods: '',
        name: '',
        idCard:'',
        tel: '',
        businessName: '',
        purpose: '',
        businessLicense: require('../../../assets/images/upload@2x.png'),
        businessLicenseVal: false,
        idCardFront: require('../../../assets/images/upload-s@2x.png'),
        idCardFrontVal: false,
        idCardBack: require('../../../assets/images/upload-s@2x.png'),
        idCardBackVal: false,
      }
    }
  },
  created () {
    this.params=this.$route.params
    this.form.type=this.$route.params.type
    this.$route.meta.title=this.$route.params.title
  },
  methods: {
    checkif(){
      if(!this.form.amount){
        this.$Toast({
          message: '请输入贷款金额',
          position: 'bottom'
        })
        return false				
      }else if(!/^[1-9][0-9]{0,}$/.test(this.form.amount)){
        this.$Toast({
          message: '请输入合法的贷款金额',
          position: 'bottom'
        })
        return false						
      }
      if(!this.form.periods){
        this.$Toast({
          message: '请输入借款期限',
          position: 'bottom'
        })
        return false				
      }else if(!/^[1-9][0-9]{0,}$/.test(this.form.periods)){
        this.$Toast({
          message: '请输入合法的借款期限',
          position: 'bottom'
        })
        return false						
      }
      if(!this.form.name){
        this.$Toast({
          message: '请输入姓名',
          position: 'bottom'
        })
        return false				
      }else if(!/^[\u4e00-\u9fa5]{2,}$/.test(this.form.name)){
        this.$Toast({
          message: '请输入正确的姓名',
          position: 'bottom'
        })
        return false						
      }
      if(!this.form.idCard){
        this.$Toast({
          message: '请输入身份证号码',
          position: 'bottom'
        })
        return false				
      }else if(!/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.form.idCard)){
        this.$Toast({
          message: '请输入正确的身份证号码',
          position: 'bottom'
        })
        return false						
      }
      if(!this.form.tel){
        this.$Toast({
          message: '请输入手机号',
          position: 'bottom'
        })
        return false				
      }else if(!/^[1][0-9]{10}$/.test(this.form.tel)){
        this.$Toast({
          message: '请输入正确的手机号',
          position: 'bottom'
        })
        return false						
      }
      if(!this.form.purpose){
        this.$Toast({
          message: '请输入借款用途',
          position: 'bottom'
        })
        return false				
      }
      if(!this.form.businessName&&(this.params.type == 4||this.params.type == 5)){
        this.$Toast({
          message: '请输入企业名称',
          position: 'bottom'
        })
        return false				
      }
      if(!this.form.idCardFrontVal&&(this.params.type == 1||this.params.type == 2||this.params.type == 3)){
        this.$Toast({
          message: '请上传身份证',
          position: 'bottom'
        })
        return false				
      }
      if(!this.form.idCardBackVal&&(this.params.type == 1||this.params.type == 2||this.params.type == 3)){
        this.$Toast({
          message: '请上传身份证',
          position: 'bottom'
        })
        return false				
      }
      if(!this.form.businessLicenseVal&&(this.params.type == 4||this.params.type == 5)){
        this.$Toast({
          message: '请上传营业执照',
          position: 'bottom'
        })
        return false				
      }    
      return true
    },
    apply(){
      var params={
        name:this.form.name,
        type:this.form.type,
        tel:this.form.tel,
        idCard:this.form.idCard,
        amount:this.form.amount,
        periods:this.form.periods,
        purpose:this.form.purpose   
      }
      if(this.params.type == 1||this.params.type == 2||this.params.type == 3){ //个人贷款
        params.idCardFront=this.form.idCardFront
        params.idCardBack=this.form.idCardBack
      } else {
        params.businessName=this.form.businessName;
        params.businessLicense=this.form.businessLicense;
      }
      if(this.checkif()){
        this.$ajax('post',baseURL+'/custLoanController/apply',params,(data)=>{
            if(data.status=='200'){
              console.log(data)
              // this.$Toast({message: data.msg,position: 'bottom'})
              this.$router.go(-1)
              this.$Toast({message:data.response.msg,position:'bottom'});
            }
          }
        )

      }
    },
    uploadImg(index){
      if(this.$isWeixin){
        return
      }
      var ua = navigator.userAgent.toLowerCase();
      this.type=index
      if (/iphone|ipad|ipod/.test(ua)) {
        if(window.webkit.messageHandlers){
          window.webkit.messageHandlers.albumCamera.postMessage({ message: 'albumCamera'});
        }else{}
      }else if(/android/.test(ua)){
        if(object&&typeof(object.albumCamera)=="function"){
          object.albumCamera('all',0)////all,photo,album
        }
      }
    },
    base64Upload(base64){
      this.$ajax('post',baseURL+'/oss/base64Upload',{base64:base64},(data)=>{
        if(data.status == 200){
          switch (this.type){
            case 1:
              this.form.businessLicense=data.src;              
              this.form.businessLicenseVal=true;              
              break;
            case 2:
              this.form.idCardFront=data.src;
              this.form.idCardFrontVal=true;
              break;
            case 3:
              this.form.idCardBack=data.src;
              this.form.idCardBackVal=true;
              break;
            default:
              this.$Toast({message:'失败',position:'bottom'});
              break;
          }
        }else{
          this.$Toast({message:data.msg,position:'bottom'});
        }

      },(err)=>{
        alert(err);
      })     
    },
    imgChange(event,index){
      let _this=this
      this.type=index
      console.log(event)
      function blobToDataURL(blob,cb) {
          let reader = new FileReader();
          reader.onload = function (evt) {
            var base64 = evt.target.result
            cb(base64)
          };
          reader.readAsDataURL(blob);
      }
      var img = event.target.files[0]
      if(img){
        var url = URL.createObjectURL(img);
        var base64 = blobToDataURL(img,function(base64Url) {
          console.log(base64Url.length)
          _this.base64Upload(base64Url)
        })
      }      
    }
  },
  computed: {
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
    //   new BScroll(this.$refs.wrapper, {click: true})
    // })
    window['cameraCallBack'] = (img)=> {//base64
      this.base64Upload("data:image/png;base64,"+img)
    }
  }
}
</script>

<style scoped lang="stylus">
.loanapply{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #F5F5F5;
  text-align: center;
  .container{
    position: absolute;
    top:64px;
    left:0;
    right:0;
    bottom:0;
    background: #F5F5F5;
    text-align: center;    
  }
  .items{
    background #ffffff
    margin 0 0 10px 0;
    padding 0 5px
    .item-label{
      font-size:17px;
      font-family:FZLanTingHeiS-R-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align left
      padding 10px
    }  
    .item-value{
      position relative
      .item-unit{
        position absolute
        right 10px
        top -5px
        bottom 0
        margin auto
        height:16px;
        line-height 16px;
        font-size:16px;
        font-family:FZLanTingHeiS-R-GB;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
    }
    .item-img-container{
      display flex
      .item-img{
        flex 1
        .img-box{
          width:100%;
          height:103px;
          position:relative;
          .inputPlace{
            border:1px solid red;
            width:100%;
            height:103px;
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            opacity:0;            
          }
        }
      }
      .item-card{
        img{
          width 100%
          height 103px
        }
        .item-card-title{
          line-height:38px;
          font-size:16px;
          color:#F37723;
        }
      }
    }
    .item-img{
      padding 10px 15px
      img{
        width 100%
        height 180px
      }
    }
  }
} 
/deep/.mint-cell-wrapper{
  background-size: 100% 1px;
}
/deep/.mountField{
  .mint-cell-wrapper{
    background-image:none;
    border-bottom:1pt solid #AACDF4;
    padding:0;
    margin:0 10px;
    font-size:22px;
  }
}     
</style>