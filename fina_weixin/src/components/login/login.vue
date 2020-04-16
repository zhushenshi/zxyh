<template>
<transition name="move">
	<div class="loginView" ref="loginView">
		<MyHeader :title="'登录'" v-if="!isWeixin"></MyHeader>
		<div class="borderTop"></div>
		<div class="logo">
			<div class="logo_img">
				<img src="../../assets/images/logo.png"/>
			</div>
		</div>
		
		<div class="user">
			<ul class="user_name">
				<li class="name_l1">
					<img src="../../assets/images/Mobile@3x.png"/>
				</li>
				<li class="name_l2">
					<input type="tel" placeholder="请输入手机号" @input.stop="checkFullInfo" v-model="userLogin.userTel" @focus="focusValue('userTleShow',true)" @blur="focusValue('userTleShow',false)" maxlength="11"/>
					<div class="mint-field-clear clear" :class="{show:userLogin.userTel&&userTleShow}" @click="clear('userTel',$event)"><i class="mintui mintui-field-error"></i></div>
				</li>
				
			</ul>
			
			<ul class="uesr_paw">
				<li class="paw_l1">
					<img src="../../assets/images/paw@3x.png"/>
				</li>
				<li class="paw_l2">
					<input  :type="passwordType" placeholder="请输入密码" @input.stop="checkFullInfo" v-model="userLogin.userPwd" @focus="focusValue('userPwdShow',true)" @blur="focusValue('userPwdShow',false)" maxlength="16"/>
					<div class="mint-field-clear clear" :class="{show:userLogin.userPwd&&userPwdShow}" @click="clear('userPwd',$event)"><i class="mintui mintui-field-error"></i></div>
				</li>
				<li class="paw_l1" v-show="userLogin.userPwd.length>0">
					<span :class="{pwdBtn:true,pwdBtnClose:isPassword}"  @click="pwdBtn"></span>
				</li>
			</ul>
		</div>
		
		<div :class="{logo_btn:true,logo_btn1:fullInfo}" @click="login">
			登录
		</div>
		
		<div class="Foot">
			<div class="reg fl">
				<a  @click.stop="ToRegister">快速注册</a>
			</div>
			<div class="Forget fr">
				<a  @click.stop="ToFindPass">忘记密码</a>
			</div>
		</div>
		
	</div>
</transition>
</template>

<script>
	import $ from "jquery";
	import Vue from 'vue'
	import '../../assets/css/login.css'
	import {baseURL,baseURLVerifyImg} from '../../vuex/url.js'
	import {Encrypt,Decrypt} from '../../utils/aes.js'
	export default {
		name: 'login',
		data() {
			return {
				userLogin: {
					userTel: '',
					userPwd: ''
				},
				fullInfo:false,//登陆信息是否填完整的标志
				isPassword: true,
      			passwordType: 'password',
				userTleShow:false,
				userPwdShow:false
			}
		},
		
		mounted(){
			this.$el.addEventListener('click',(e)=>{
				if (e.target.nodeName!='INPUT') {
					let inputList = this.$refs.loginView.querySelectorAll('input')
						inputList.forEach((item) => {
						item.blur()
					})
				}
			})
			$('input,textarea').on('blur',function(){
			window.scroll(0,0);
			});						
		},
		methods:{
			checkFullInfo(){
				if(this.userLogin.userTel!=''&&this.userLogin.userPwd!=''){
					this.fullInfo=true;
				}else{
					this.fullInfo=false;
				}
			},
			pwdBtn () {
				this.isPassword = !this.isPassword
				if (this.isPassword) {
					this.passwordType = 'password'
				} else {
					this.passwordType = 'text'
				}
    		},
			ToRegister(){
				var that = this
				that.$router.push('/register');
			},
			ToFindPass(){
				var that = this
				that.$router.push('/findPass');
			},
			goBack(){
				var that = this;
				that.$router.go(-1);//返回上一层
			},
			clear(value,e){
				// console.log(this.$el);				
				e.currentTarget.previousElementSibling.focus();
				this.userLogin[value]="";

			},
			focusValue(tar,val){
				 this[tar]=val;			
			},
			login () {
				console.log(Encrypt)
				console.log(Encrypt('123'))
				console.log(Decrypt('13A856EA9343FD41AE035E1526F91B7C'))
        	let login = this;
				if (login.checkInfo()) {
					login.$ajax('',baseURL+'/login?phone='+login.userLogin.userTel+'&password='+login.userLogin.userPwd, '', function (data) {
          window.Vue.$token=data.token;
		      sessionStorage.setItem('$token', data.token);
					login.$store.commit("addToken", data.token);
					var loginName=login.userLogin.userTel
					var loginPwd=Encrypt(login.userLogin.userPwd)
					login.$store.commit("loginName", loginName);
					login.$store.commit("loginPwd", loginPwd);
//					login.$router.push(login.$store.state.currentRouterPath);
					login.$router.push({path:"/"});
					var ua = navigator.userAgent.toLowerCase();
					if (/iphone|ipad|ipod/.test(ua)) {
						if(window.webkit&&window.webkit.messageHandlers&&typeof(window.webkit.messageHandlers.postMessage) == 'function'){
							window.webkit.messageHandlers.setGesturePwd.postMessage([loginName,loginPwd,'1']);//1有跳过按钮 0无跳过按钮
						}else{}
					}else if(/android/.test(ua)){
						//没有会报错================
						if(typeof(object)!='undefined'&&typeof(object.setGesturePwd)=="function"){
							object.setGesturePwd(loginName,loginPwd)
						}
					}					
				}.bind(this))
				}
			},
			 checkInfo () {
				let telReg = /^1[345789]\d{9}$/;
				let numReg = /^[0-9a-zA-Z_]{6,20}$/;
				let formData = this.userLogin;
				let This=this
				if (!formData.userTel) {
					This.$Toast({
					message: '手机号码不能为空',
					position: 'bottom'
					})
					return false
				} else if (!telReg.test(formData.userTel)) {
					This.$Toast({
					message: '手机号码格式不正确',
					position: 'bottom'
					})
					return false
				}
				if (!formData.userPwd) {
					This.$Toast({
					message: '密码不能为空',
					position: 'bottom'
					})
					return false
				} else if (!numReg.test(formData.userPwd)) {
					This.$Toast({
					message: '密码格式不正确',
					position: 'bottom'
					})
					return false
				}
				return true
				}
		}
	}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.loginView
  position fixed
  left 0
  top 0
  bottom 0
  width 100%
  background #ffffff
  transition all 0.4s ease
  -webkit-transition all .4s ease
  -moz-transition all .4s ease
  &.move-enter-avtive,&.move-leave-active{
    transform translate3d(0, 0, 0)
    -webkit-transform translate3d(0, 0, 0)
    -moz-transform translate3d(0, 0, 0)
  }
  &.move-enter,&.move-leave-active{
    transform translate3d(-100%, 0, 0)
    -webkit-transform translate3d(-100%, 0, 0)
    -moz-transform translate3d(-100%, 0, 0)
  }
  .pwdBtn
    position absolute
    top 28px
    right 0
    width 18px
    height 22px
    bg-image(icon-eyes)
    background-repeat no-repeat
    background-size contain
    margin-right 18px
    vertical-align middle
  .pwdBtnClose
    position absolute
    top 32px
    right 0
    width 18px
    height 22px
    bg-image(close-eyes)
    background-repeat no-repeat
    background-size contain
    margin-right 18px
    vertical-align middle
.paw_l1
	position relative
.paw_l2
	position relative
.name_l2
	position:relative;
.clear
	display none
	position absolute
	top 50%
	right 0
	margin-top -8px
.show
	display block!important
</style>