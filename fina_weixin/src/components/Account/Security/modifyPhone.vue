<template>
  <div>
    <div class="user">
      <ul class="user_name">
        <li class="name_l1">
          <img src="../../../assets/images/Mobile@3x.png"/>
        </li>
        <li class="name_l2">
          <input type="text" maxlength="11" style="background-color: #FFFFFF;" @input.stop="checkFullInfo" placeholder="请输入手机号" @focus="focusValue('phoneNumberClear',true)" @blur="focusValue('phoneNumberClear',false)" v-model="phoneNumber"/>
          <div class="mint-field-clear clear clear1" :class="{show:phoneNumber&&phoneNumberClear}" @click="clear('phoneNumber',$event)"><i class="mintui mintui-field-error"></i></div>
        </li>
      </ul>
      <ul class="user_name">
        <li class="name_l1">
          <img style="width:16px" src="../../../assets/images/yzm@3x.png"/>
        </li>
        <li class="name_l2 line_right">
          <input type="text" maxlength="6" style="background-color: #FFFFFF;"  @input.stop="checkFullInfo" placeholder="请输入验证码" @focus="focusValue('yzmClear',true)" @blur="focusValue('yzmClear',false)" v-model="yzm"/>
          <div class="mint-field-clear clear clearyzm" :class="{show:yzm&&yzmClear}" @click="clear('yzm',$event)"><i class="mintui mintui-field-error"></i></div>
        </li>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="true">
          <div class="title">
            <span>提示</span>
            <span class="icon-close" @click="hidePopUp"></span>
          </div>
          <div class="content">
            <mt-field label="" placeholder="输入验证码" v-model="captcha">
              <img id="imgId" src="" width="100px" height="45px" @click.stop="changeShowFlag">
            </mt-field>
            <mt-button type="danger" style="width: 100%;background-color:#FA7009;margin: 0px auto;" @click.native="getPhoneIdCode">确定</mt-button>
          </div>
				</mt-popup>
        <li class="yzm_btn"><a href="JavaScript:;" :class="{daojishi:timer!=60}" class="getyzm" @click="getYzm">{{Buttoncontent}}</a></li>
        <!-- <li class="yzm_btn"><a href="JavaScript:;" :class="{daojishi:yzmSecond!==0}" class="getyzm" @click="getYzm">获取验证码</a></li> -->
        <!-- <mt-button class="Reg_p3" :disabled="enableClick" v-html="Buttoncontent" @click.native="changeShowFlag;popupVisible = true"></mt-button> -->
      </ul>
    </div>
    <div :class="{logo_btn:true,logo_btn1:fullInfo}" @click="modifyPhone">
      确认
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/login.css'
  import $ from "jquery";
  import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
  import {uuid} from '@/utils/commontool'
  var timerT1;
  export default {
    name: 'modifyPhone',
    data() {
      return {
        yzmSecond:60,
        phoneNumber:'',
        yzm:'',
        popupVisible:false,
        random:'',
        captcha:'',
        baseURLVerifyImg:baseURLVerifyImg,
        Buttoncontent: "获取验证码",
        bclick:false,
        xcode: uuid(),
        fullInfo:false,//信息是否填完整的标志
        phoneNumberClear:false,
        yzmClear:false,
        timer:60
      }
    },
    methods:{
      hidePopUp() {
        this.popupVisible = false;
      },
      modifyPhone (){
        let that=this;
        if (that.checkPhone()&&that.checkYzm()) {
          console.log("手机号和验证码校验通过！");
          that.$ajax('put',baseURL+'/account/rebindphone?phone='+that.phoneNumber+'&code='+that.yzm+'&xcode='+that.xcode,"", function (data) {
            that.$router.push('/login');
            console.log(data);
          })
        }
      },
      getYzm () {
        //获取验证码
        let that=this;
         //先验证手机号
        if(!that.checkPhone()){
          return
        }
        if(this.Buttoncontent=='获取验证码'||this.Buttoncontent=='重发验证码'){
            this.changeShowFlag();
        }
               
      },
      clear(value,e){
        // console.log(this.$el);	
        this[value]="";			
				e.currentTarget.previousElementSibling.focus();

			},
			focusValue(tar,val){
				 this[tar]=val;			
			},
      changeShowFlag() {
        var vueThis = this;
				vueThis.random = Math.random(); //通过随机数更改验证码
        $.ajax({
          type: "get",
          url: baseURLVerifyImg +'/common/captcha?random='+vueThis.random+'&xcode='+vueThis.xcode+'&phone='+vueThis.phoneNumber+'&from='+1,
          data: '',
          dataType: 'json',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded',
          },
          success: function(result) {
            console.info(result);
            if(result.status == '200') {
              vueThis.popupVisible = true;
              $("#imgId").attr("src", "data:image/jpg;base64,"+result.imgsrc)
            }else{
              vueThis.$Toast({
                message: result.msg,
                position: 'bottom'
              })
            }
          }
        });
      },
      checkPhone () {
        // 校验手机号
        let telReg = /^1[345789]\d{9}$/;
        if (!this.phoneNumber) {
          this.$Toast({
            message: '手机号码不能为空',
            position: 'bottom'
          })
          return false
        } else if (!telReg.test(this.phoneNumber)) {
          this.$Toast({
            message: '手机号码格式不正确',
            position: 'bottom'
          })
          return false
        }
        return true;
      },
      checkYzm () {
        //校验验证码格式
        let yzmReg=/^\d{6}$/;
        if (!this.yzm) {
          this.$Toast({
            message: '验证码不能为空',
            position: 'bottom'
          })
          return false
        }
        return true
      },
    	getPhoneIdCode() {
				//在这里发送一个请求获取验证码
				var vueThis = this;
				
//				if
				setTimeout(function() {
					vueThis.getTestCode();
					vueThis.timer = 59;

				}, 0)
      },
      	disableButton() {
				var vueThis = this;
				vueThis.enableClick = true;
				//				vueThis.getTestCode();
				vueThis.Buttoncontent = "" + '59' + "s" + "后重新获取";
				timerT1 = setInterval(function() {
					vueThis.timer--;
					vueThis.Buttoncontent = ""  + vueThis.timer + "s" + "后重新获取";
					if(vueThis.timer === 0) {
						vueThis.timer = 60;
						clearInterval(timerT1);
						vueThis.Buttoncontent = "重发验证码";
						vueThis.yzmSecond = 60;
					}
				}, 1000)
			},
       getTestCode() {//获取手机验证码
				var vueThis = this;
				var params = {
					"phone": this.phoneNumber,
          captcha: this.captcha,
          xcode: this.xcode
        }
        this.bclick=true;
        if(!this.bclick){
          return
        }
				$.ajax({
					type: "get",
					url: baseURLVerifyImg+"/m/vericode",
					data: params,
					dataType: 'json',
					success: function(result) {
            this.bclick=false;
						console.log("result:" + JSON.stringify(result));
						if(result.status=="200"){
              vueThis.popupVisible = false;
							vueThis.disableButton();
              vueThis.$Toast({
                message: result.msg,
                position: 'bottom'
              })
						}else{
							vueThis.$Toast({
                message: result.msg,
                position: 'bottom'
              })
						}
					}
				});
      },
      checkFullInfo(){
				if(this.phoneNumber!=''&&this.yzm!=''){
					this.fullInfo=true;
				}else{
					this.fullInfo=false;
				}
			},
    }
  }
</script>
<style type="text/css" scoped="scoped">
	input{
		background-color: #FFFFFF;
	}
	
</style>
<style scoped>
  body{background:#FFFFFF;}
  .user{height:auto;}
  .logo_btn{height:44px;line-height:44px;}
  .user_name .name_l2{width:170px;position:relative;}
  .user_name .name_l2 .clear1{position:absolute;right:-80px;}
  .user_name .name_l2 .clearyzm{position:absolute;right:10px;}
  .name_l2 input,.paw_l2 input{font-size: 12px;color: #353535;letter-spacing: 1.45px;width:100%;background-color:#f6f6f6; }

  .name_l2 input::-webkit-input-placeholder,.paw_l2 input::-webkit-input-placeholder{
    color: #b0b0b0;
  }
  .name_l2 input::-moz-input-placeholder,.paw_l2 input::-moz-input-placeholder{
    color: #b0b0b0;
  }
  .name_l2 input::-ms-input-placeholder,.paw_l2 input::-ms-input-placeholder{
    color: #b0b0b0;
  }
  .line_right{border-right:1px solid #E7E7E7;}
  .yzm_btn a.getyzm{font-size: 14px;color: #FA7009;letter-spacing: 1.45px;}
  .yzm_btn a.daojishi{font-size: 12px;}
  .yzm_btn a.timeMessag{color:#B0B0B0;}  /*获取验证码倒计时样式*/
  .user_name .yzm_btn{width: 80pt;height: 100%;padding-left: 10pt;padding-top: 18pt;-webkit-box-sizing: border-box;box-sizing: border-box;}
</style>
<style scoped lang="stylus">
.mint-popup
  width 70%
  .title  
    position relative
    text-align center
    height 40px
    line-height 40px
    font-size 16px
    color #8a8a8a
    .icon-close
      position absolute
      top 0
      right 0
      padding 10px
      font-size 20px
  .content
    padding 0 10px 10px 10px
</style>
