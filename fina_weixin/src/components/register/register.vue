<template>
	<transition name="move">
		<div class="registerView">
			<MyHeader :title="'注册'" v-if="!isWeixin"></MyHeader>
			<header class="Reg_header">
				<img src="../../assets/images/logo.png" />
			</header>

			<nav class="Reg_nav">
				<ul class="Reg_nav_ul">
					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/Mobile@3x.png" style="width:12px;height:19px;"/>
						</p>
						<p class="Reg_p2 Reg_paw">
							<input type="tel" v-model="registerInfo.mobilePhone" @focus="focusValue('mobilePhoneShow',true)" @blur="focusValue('mobilePhoneShow',false)" maxlength="11" placeholder="请输入手机号" />
							<div class="mint-field-clear clear" style="margin-top:2px;margin-right:20px;" :class="{show:registerInfo.mobilePhone&&mobilePhoneShow}" @click="clear('mobilePhone',$event)"><i class="mintui mintui-field-error"></i></div>
						</p>
						<p class="Reg_Img">
						</p>
					</li>

					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/yzm@3x.png" style="width:16px;height:18px;"/>
						</p>
						<p class="Reg_p2 yzm" >
							<input type="text"  maxlength="6" v-model="registerInfo.testCode" @focus="focusValue('testCodeShow',true)" @blur="focusValue('testCodeShow',false)" placeholder="请输入验证码" />
							<div class="mint-field-clear clear" style="margin-top:0;margin-right:10px;right:40%;" :class="{show:registerInfo.testCode&&testCodeShow}" @click="clear('testCode',$event)"><i class="mintui mintui-field-error"></i></div>
						</p>
						<mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="true">
				              <div class="title">
				                <span>提示</span>
				                <span class="icon-close" @click="hidePopUp"></span>
				              </div>
				              <div class="content">
				                <mt-field label="" :attr="{ maxlength: 4 ,style:{width:'110px',fontSize:'15px'}}" placeholder="输入验证码" v-model="captcha">
				                  <img id="imgId" src="" width="100px" height="40px" @click.stop="changeShowFlag">
				                </mt-field>
				                <mt-button type="danger" style="width: 100%;background-color:#FA7009;margin: 0px auto;" @click.native="getPhoneIdCode" :disabled="enableClick">确定</mt-button>
				              </div>
						</mt-popup>
						<button class="Reg_p3" :disabled="enableClick" v-html="Buttoncontent" @click="judgePopup"></button>
					</li>
					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/paw@3x.png" style="width:14px;height:17px;"/>
						</p>
						<p class="Reg_p2 Reg_paw" >
							<input  :type="passwordType1" v-model="registerInfo.password"  @focus="focusValue('passwordShow',true)" @blur="focusValue('passwordShow',false)" placeholder="请输入登录密码(6-16位字母、数字、下划线)" />
							<div class="mint-field-clear clear" style="margin-top:-6px;margin-right:15px;right:19%;" :class="{show:registerInfo.password&&passwordShow}" @click="clear('password',$event)"><i class="mintui mintui-field-error"></i></div>
						</p>
						<p class="Reg_Img" v-if="registerInfo.password!=''">
							<img :src="psw1" @click="change(1)" :class="{isOff1:isOff1}"/>
						</p>
					</li>

					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/paw@3x.png" style="width:14px;height:17px;" />
						</p>
						<p class="Reg_p2 Reg_paw">
							<input  :type="passwordType2" v-model="registerInfo.confirmPassword" @focus="focusValue('confirmPasswordShow',true)" @blur="focusValue('confirmPasswordShow',false)" placeholder="请确认登录密码(6-16位字母、数字、下划线)" />
							<div class="mint-field-clear clear" style="margin-top:-6px;margin-right:15px;right:19%;" :class="{show:registerInfo.confirmPassword&&confirmPasswordShow}" @click="clear('confirmPassword',$event)"><i class="mintui mintui-field-error"></i></div>
						</p>
						<p class="Reg_Img" v-if="registerInfo.confirmPassword!=''">
							<img :src="psw2" @click="change(2)"  :class="{isOff2:isOff2}"/>
						</p>
					</li>

					<li class="Reg_Prot">
						点击注册表示您同意<span class="Reg_Prot_s" @click="toProtocol">《19理财用户协议》</span>
					</li>

					<li class="Reg_btn" @click="goToRegister" :class="{active:isActive}">
						注册
					</li>
				</ul>
			</nav>
			<transition name="move">
				<router-view class="pageView"></router-view>
			</transition>
		</div>
	</transition>
</template>

<script>
	function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
		s[8] = s[13] = s[18] = s[23] = "-";
		var uuid = s.join("");
		return uuid
	}
	import $ from "jquery";
	import '../../assets/css/registered.css'
	import _psw1 from '@/assets/images/by.png@3x.png'
	import _psw2 from '@/assets/images/AK-Open.png@3x.png'
	import {baseURL,baseURLVerifyImg} from '../../vuex/url.js'
	import { Indicator } from 'mint-ui'
	var timerT1;
	export default {
		name: 'register',
		data() {
			return {
				psw1: _psw1,
				psw2: _psw1,
				passwordType1: 'password',
				passwordType2: 'password',
				baseURLVerifyImg: baseURLVerifyImg,
				registerInfo: {
					mobilePhone: '',
					testCode: '',
					password: '',
					confirmPassword: '',
					xcode: uuid()
				},
				captcha: '',
				enableClick: false,
				popupVisible: false,
				random: '',
				Buttoncontent: "获取验证码",
				timer: 60,
				geturl:'../../assets/images/AK-Open.png',
				isActive:false,//注册按钮是否高亮
				isOff1:false,//是否可见
				isOff2:false,//是否可见
				registerSuccessFlag:true,//注册是否成功的标志
				mobilePhoneShow:false,
				testCodeShow:false,
				passwordShow:false,
				confirmPasswordShow:false
			}
		},
		watch: {
			registerInfo: {
			　　handler(newValue, oldValue) {
					//判断数据都不为空
					var arr=Object.values(newValue);
					//console.log(arr);
				    let a = arr.every(item=>{
				        if(item!=''){
				            return true;
				        }else{
				            return false;
				         }
				     });
					//执行按钮高亮
					this.isActive=(a===true)?true:false;
			　　},
			　　deep: true　　
			}
		},

		mounted() {

		},
		methods: {
			clear(value,e){
				// console.log(this.$el);
				e.currentTarget.previousElementSibling.focus();
				this.registerInfo[value]="";

			},
			focusValue(tar,val){
				 this[tar]=val;
			},
			change(num) {
				if(num == 1) {
					if(this.psw1 == _psw2) {
						this.psw1 = _psw1
						this.passwordType1 = 'password'
						this.isOff1=false
					} else {
						this.psw1 = _psw2
						this.passwordType1 = 'text'
						this.isOff1=true
					}
				}else {
					if(this.psw2 == _psw2) {
						this.psw2 = _psw1
						this.passwordType2 = 'password'
						this.isOff2=false
					} else {
						this.psw2 = _psw2
						this.passwordType2 = 'text'
						this.isOff2=true
					}
				}

			},
			judgePopup(){
				let This = this;
				let telReg = /^1[345789]\d{9}$/;
				if(this.registerInfo.mobilePhone==''){
					This.$Toast({
					message: '手机号码不能为空',
					position: 'bottom'
					})
					return false
				}else if(!telReg.test(this.registerInfo.mobilePhone)){
					This.$Toast({
					message: '请输入正确的手机号',
					position: 'bottom'
					})
					return false
				}else{
          this.changeShowFlag();
				}

			},
			hidePopUp() {
				this.popupVisible = false;
			},
			toProtocol() {
				var that = this;
				that.$router.push('/register/registerProtocol');
			},
			goBack() {
				var that = this;
				//that.$router.go(-1);//返回上一层
				that.$router.push({
					path: '/login'
				});
			},
			changeShowFlag() {
				Indicator.open()
				var vueThis = this;
				this.captcha=''
				vueThis.random = Math.random(); //通过随机数更改验证码
        $.ajax({
        type: "get",
        url: baseURLVerifyImg +'/common/captcha?random='+vueThis.random+'&xcode='+vueThis.registerInfo.xcode+'&phone='+vueThis.registerInfo.mobilePhone+'&from='+1,
        data: '',
        dataType: 'json',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
        },
        success: function(result) {
					console.info(result);
					Indicator.close();
          if(result.status == '200') {
            vueThis.popupVisible = true;
						$("#imgId").attr("src", "data:image/jpg;base64,"+result.imgsrc)
          }else{
            vueThis.$Toast({
              message: result.msg,
              position: 'bottom'
            })
          }
				},
				error: function(err){
					Indicator.close();
					vueThis.$Toast({
						message: err.msg,
						position: 'bottom'
					})					
				}
      });
			},
			getTestCode() {//获取手机验证码
				if(!this.captcha) {
					this.$Toast({
							message: '请输入图形验证码',
							position: 'bottom'
					})
						return
				}			
				Indicator.open()
				var vueThis = this;
				vueThis.enableClick = true;
				var params = {
					"phone": vueThis.registerInfo.mobilePhone,
					captcha: vueThis.captcha,
          xcode:this.registerInfo.xcode
        }
				$.ajax({
					type: "get",
					url: baseURLVerifyImg + "/m/vericode",
					data: params,
					dataType: 'json',
					success: function(result) {
						Indicator.close();
						console.log("result:" + JSON.stringify(result));
						vueThis.enableClick = false;
						if(result.status==200){
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
					},
					error: function(){
						vueThis.enableClick = false;
						Indicator.close();
					}
				});
			},
			disableButton() {
				var vueThis = this;
				vueThis.enableClick = true;
				//				vueThis.getTestCode();
				vueThis.Buttoncontent =  '60s后重新获取';
				timerT1 = setInterval(function() {
					vueThis.timer--;
					vueThis.Buttoncontent = vueThis.timer +'s后重新获取'
					if(vueThis.timer === 0) {
						vueThis.timer = 60;
						clearInterval(timerT1);
						vueThis.Buttoncontent = "重新获取";
						vueThis.enableClick = false;
					}
				}, 1000)
			},
			getPhoneIdCode() {
				//在这里发送一个请求获取验证码
				var vueThis = this;
//				if
				setTimeout(function() {
					vueThis.getTestCode();
					vueThis.timer = 60;
				}, 0)
			},
			 checkInfo () {
				let telReg = /^1[345789]\d{9}$/;
				let numReg = /^[0-9a-zA-Z_]{6,20}$/;
				let This=this;
				if(this.registerInfo.mobilePhone==''){
					This.$Toast({
					message: '手机号码不能为空',
					position: 'bottom'
					})
					return false
				}else if(!telReg.test(this.registerInfo.mobilePhone)){
					This.$Toast({
					message: '请输入正确的手机号',
					position: 'bottom'
					})
					return false
				}
				if(!this.registerInfo.testCode){
					This.$Toast({
					message: '请输入短信验证码',
					position: 'bottom'
					})
					return false
				}
				if (!this.registerInfo.password) {
					This.$Toast({
					message: '密码不能为空',
					position: 'bottom'
					})
					return false
				} else if (!numReg.test(this.registerInfo.password)) {
					This.$Toast({
					message: '密码格式不正确(6-16位字母、数字、下划线)',
					position: 'bottom'
					})
					return false
				}else if (!this.registerInfo.confirmPassword) {
					This.$Toast({
					message: '确认密码不能为空',
					position: 'bottom'
					})
					return false
				}else if (this.registerInfo.password!=this.registerInfo.confirmPassword) {
					This.$Toast({
					message: '两次密码输入不一致',
					position: 'bottom'
					})
					return false
				}
				return true
				},
			goToRegister() {
				var that = this;
				var params = {
					phone: that.registerInfo.mobilePhone,
					password: that.registerInfo.password,
					code: that.registerInfo.testCode,
					xcode: that.registerInfo.xcode
				}
				if(that.checkInfo()&&that.registerSuccessFlag){
					that.registerSuccessFlag = false;
					$.ajax({
					type: "post",
					url: baseURL + "/reg",
					data: params,
					dataType: 'json',
					error:function(){
						that.registerSuccessFlag = true;
					},
					success: function(result) {
						console.log("result:" + JSON.stringify(result));
						if(result.status=="200"){
							that.registerSuccessFlag = true;
							window.Vue.$token=result.token;
		      				sessionStorage.setItem('$token', result.token);
							that.$store.commit("addToken", result.token);

							// window.Vue.$token='';
		      				// sessionStorage.setItem('$token', '');
							// that.$store.commit("addToken", '');

							that.$Toast({
							message: "注册成功",
							position: 'bottom'
						  	})

						    setTimeout(function(){
								that.$router.push('/')
							},3000)

						}else{
							that.registerSuccessFlag = true;
							// if(result.msg=='手机号码已被注册'){
								//  that.$router.push('/login')
							// }
							that.$Toast({
							message: result.msg,
							position: 'bottom'
						  	})
						}
					}.bind(this)
				});
				}

			}
		}
	}
</script>

<style scoped lang="stylus">
.registerView
  height 100%
  overflow-y auto
  position absolute
  left 0
  top 0
  bottom 0
  width 100%
  background #ffffff
  transition all 0.4s ease
  &.move-enter-avtive,&.move-leave-active
    transform translate3d(0, 0, 0) -webkit-transform translate3d(0, 0, 0) -moz-transform translate3d(0, 0, 0)
  &.move-enter,	&.move-leave-active
    transform translate3d(100%, 0, 0) -webkit-transform translate3d(100%, 0, 0) -moz-transform translate3d(100%, 0, 0)
  .Reg_nav
    .Reg_nav_ul
      .Reg_li
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
		.Reg_Img
			right 7%
			width 15%
.Reg_Img img
	width 17px
	height 8px
.Reg_Img img.isOff1,.Reg_Img img.isOff2
	width 18px
	height 12px
.show
	display block!important



</style>
