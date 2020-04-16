<template>
	<transition name="move">
		<div class="shareView">
			<header class="Reg_header">
				<img src="../../assets/images/sharehead.png" width="100%"/>
			</header>
            
			<nav class="Reg_nav">
                <p class="share-rmb">
                    您的好友<span>{{name}}</span>,邀请您注册领取<span>2018</span>元投资红包。
                 </p>
				<ul class="Reg_nav_ul">
					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/sharemobile.png" width="12px" />
						</p>
						<p class="Reg_p2">
							<input type="text" @focus="resizeWidow" @keyup="judgeIfGetTestcode"  v-model="registerInfo.mobilePhone" placeholder="请输入手机号" maxlength="11"/>
						</p>
					</li>

					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/sharereg.png" width="12px" />
						</p>
						<p class="Reg_p2 yzm">
							<input type="text" @focus="resizeWidow" v-model="registerInfo.testCode" placeholder="请输入验证码" maxlength="6"/>
						</p>
						<mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="true">
							<div class="title">
								<span>提示</span>
								<span class="icon-close" @click="hidePopUp"></span>
							</div>
							<div class="content">
								<mt-field label="" placeholder="输入验证码" v-model="captcha" maxlength="6">
									<img id="imgId" src="" width="100px" height="45px" @click.stop="changeShowFlag">
								</mt-field>
								<mt-button type="danger" style="width: 100%;background-color:#FA7009;margin: 0px auto;" @click.native="getPhoneIdCode">确定</mt-button>
							</div>
						</mt-popup>
						<mt-button class="Reg_p3" :disabled="enableClick" :class="{style1:enableClick,style2:!enableClick,}" v-html="Buttoncontent" @click.native="changeShowFlag()"></mt-button>
					</li>

					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/sharepwd.png" width="12px" />
						</p>
						<p class="Reg_p2 Reg_paw">
							<input type="password" @focus="resizeWidow"  v-model="registerInfo.password" placeholder="请输入密码(6-16位字母、数字、下划线)" />
						</p>
						<!-- <p class="Reg_Img">
							<img src="../../images/AK-Open.png" />
						</p> -->
					</li>

					<li class="Reg_li flex">
						<p class="Reg_p1">
							<img src="../../assets/images/sharepwd.png" width="12px"/>
						</p>
						<p class="Reg_p2 Reg_paw">
							<input type="password" @focus="resizeWidow" v-model="registerInfo.confirmPassword" placeholder="请确认密码(6-16位字母、数字、下划线)" />
						</p>
						<!-- <p class="Reg_Img">
							<img src="../../images/by.png" />
						</p> -->
					</li>

					<!-- <li class="Reg_Prot">
						点击注册表示您同意<span class="Reg_Prot_s" @click="toProtocol">《19理财用户协议》</span>
					</li> -->

					<li class="Reg_btn" @click="goToRegister">
						注册领取
					</li>
				</ul>
                <div class="shareinfo">
                    <p>
                        红包说明
                    </p>
                    <p>
                        一、关于红包
                    </p>
                    <p>
                        红包由是19理财发放给注册用户的福利，投资时可直接抵扣现金。
                    </p>
                    <p>
                        二、如何获取红包
                    </p>
                    <p>
                        用户在注册后即可获得投资红包，注册成功后红包将自动添加到您的账户中。
                    </p>
                    <p>
                        三、如何使用红包
                    </p>
                    <p>
                    1、选择理财项目进入详情页，投资时勾选使用；<br>

2、红包不能提现，不得转赠他人，不得为他人付款；<br>

3、已使用的红包，在投资的项目中发生流标的情况，红包将会在十分钟后释放到您的红包列表中，届时可继续投资。

(备注：红包存在有效期，请在有效期内及时投资，过期则失效；)
                    </p>
                </div>
			</nav>
			<!-- <transition name="move">
				<router-view class="pageView"></router-view>
			</transition> -->

            <div class="share-bj" v-if="isshow" @click="isshow=false">

		</div>
		<div class="sharepic"   v-if="isshow">
            <img src="../../assets/images/sharesucc.png" width="80%" @click="isshow=false"   />
            <!-- <img src="../../assets/images/shareclose.png" width="10%" @click="closeWindow"  /> -->
            <input type="button" value="去使用" @click="gourl"/>
			<p style="color:#ffffff;font-size:10px;height:20px;line-height:20px;margin-top:15px;">温馨提示：搜索关注微信公众号【19金服】便于下次登录投资</p>
        </div>
		</div>
	</transition>
</template>

<script>
	import $ from "jquery";
    import '../../assets/css/registered.css'
    import {uuid} from '@/utils/commontool'
	import {baseURL,baseURLVerifyImg} from '../../vuex/url.js'
	import { Indicator } from 'mint-ui'
	var timerT1;
	export default {
		name: 'register',
		data() {
			return {
				registerInfo: {
					mobilePhone: '',
					testCode: '',
					password: '',
					confirmPassword: '',
					xcode: uuid()
				},
				captcha: '',
				enableClick: true,
				popupVisible: false,
				random: '',
				Buttoncontent: "获取验证码",
				timer: 60,
				baseURLVerifyImg:baseURLVerifyImg,
				isshow:false,
				name:decodeURIComponent(this.gethash('name')) 
			}
		},

		mounted() {
//			var wHeight = window.innerHeight;   //获取初始可视窗口高度  
//			window.addEventListener('resize', function(){       //监测窗口大小的变化事件  
//			    var hh = window.innerHeight;     //当前可视窗口高度  
//			    var viewTop = $(window).scrollTop();   //可视窗口高度顶部距离网页顶部的距离  
//			    if(wHeight > hh){           //可以作为虚拟键盘弹出事件  
//			        $(".shareView").animate({scrollTop:viewTop-300+'px'});    //调整可视页面的位置  
//			    }else{         //可以作为虚拟键盘关闭事件  
//			        $(".shareView").animate({scrollTop:viewTop+300+'px'});  
//			    }  
//			    wHeight = hh;  
//			}); 
//			var element = document.getElementsByClassName("Reg_nav")[0];
//			window.onresize = function(){
//			element.scrollIntoViewIfNeeded(false);	
//			}
//			
		},
		methods: {
			judgeIfGetTestcode(){
				if(this.registerInfo.mobilePhone.length===11){
					let telReg = /^1[345789]\d{9}$/;	
					if(!telReg.test(this.registerInfo.mobilePhone)){
						this.$Toast({
						message: '手机号码格式不正确',
						position: 'bottom'
						})
						this.enableClick = true;
					}else{
						this.enableClick = false;
					}
				}else{
					this.enableClick = true;
				}
			},
			resizeWidow(){
				window.addEventListener('resize', function() {
				    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
				      window.setTimeout(function() {
				        document.activeElement.scrollIntoViewIfNeeded()
				      }, 0)
				     }
				    })
			},
			hidePopUp() {
				this.popupVisible = false;
			},
    	checkInfo () {
				let telReg = /^1[345789]\d{9}$/;
				let numReg = /^[0-9a-zA-Z_]{6,20}$/;
				let This=this;
				if (!this.registerInfo.mobilePhone) {
					This.$Toast({
					message: '手机号码不能为空',
					position: 'bottom'
					})
					return false
				}else if (!telReg.test(this.registerInfo.mobilePhone)) {
					This.$Toast({
					message: '请输入正确的手机号',
					position: 'bottom'
					})
					return false
				}
				if (!this.registerInfo.testCode) {
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
				}else if (!numReg.test(this.registerInfo.password)) {
					This.$Toast({
					message: '密码格式不正确',
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
			toProtocol() {
				var that = this;
				that.$router.push('/register/registerProtocol');
            },
            gourl(){
					var that = this;
					if(sessionStorage.getItem('$token')){
						that.$router.push('/');
					}else{
						that.$router.push('/login');
					}
				
			},
			// closeWindow(){
			// 	var that = this;
			// 	that.isshow=false;
			// 	setTimeout(function(){  
			// 		window.opener=null;
			// 		window.close();
			// 	}, 1000) 
			// },
			changeShowFlag() {
				var vueThis = this;
				let telReg = /^1[345789]\d{9}$/;
				if(vueThis.registerInfo.mobilePhone==''){
					vueThis.$Toast({
					message: '手机号码不能为空',
					position: 'bottom'
					})
					return false
				}else if(!telReg.test(vueThis.registerInfo.mobilePhone)){
					vueThis.$Toast({
					message: '请输入正确的手机号',
					position: 'bottom'
					})
					return false
				}else{
					vueThis.random = Math.random();
					Indicator.open()
					vueThis.captcha = '';
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
				}
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
				//				vueThis.ruleForm.identifyingCode = '';
				var params = {
					"phone": vueThis.registerInfo.mobilePhone,
					captcha: vueThis.captcha,
					xcode: vueThis.registerInfo.xcode
				}
				$.ajax({
					type: "get",
					url: baseURL+"/vericode",
					data: params,
					dataType: 'json',
					success: function(result) {	
						Indicator.close();	
						vueThis.enableClick = false;				
						if(result.status== '200'){
							vueThis.popupVisible = false;
							vueThis.disableButton();							
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
				vueThis.Buttoncontent = "重发验证码" + "(" + '60' + "s" + ")";
				timerT1 = setInterval(function() {
					vueThis.timer--;
					vueThis.Buttoncontent = "重发验证码" + "(" + vueThis.timer + "s" + ")";
					if(vueThis.timer === 0) {
						vueThis.timer = 60;
						clearInterval(timerT1);
						vueThis.Buttoncontent = "重发验证码";
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

			goToRegister() {
				var that = this;
				var params = {
					phone: that.registerInfo.mobilePhone,
					password: that.registerInfo.password,
                    code: that.registerInfo.testCode,
                    couid:this.gethash('couid'),
					xcode: that.registerInfo.xcode
                }
        if(this.checkInfo()){
					Indicator.open()	
					$.ajax({
						type: "post",
						url: baseURL+"/reg",
						data: params,
						dataType: 'json',
						success: function(result) {
							Indicator.close()	
							console.log("result:" + JSON.stringify(result));
							if(result.status=="200"){
				
								window.Vue.$token=result.token;
										sessionStorage.setItem('$token', result.token);
								that.$store.commit("addToken", result.token);
								that.isshow=true;
															// that.$Toast({
								// message: "注册成功",
								// position: 'bottom'
								//   })
								// window.Vue.$token='';//改为未登录
								// sessionStorage.setItem('$token', '');
								// this.$store.commit("addToken", '');
								
							}else{
								if(result.msg=='手机号码已被注册'){
									// that.$router.push('/login')
								}
								that.$Toast({
								message: result.msg,
								position: 'bottom'
									})
							}
						}.bind(this),
						error: function(){
							Indicator.close()	
								that.$Toast({
								message: result.msg,
								position: 'bottom'
							})							
						}
					});
        }	
      },
            gethash(name){
                	var url = location.href;
                	var lastIndex=url.lastIndexOf("?");
                	url="?"+url.substring(lastIndex+1);
                    var pattern=new RegExp('[?&]'+name+'=([^&]*)');
                    url.match(pattern);
                    return RegExp.$1=='String'?'':RegExp.$1		

            }
        },
        created(){
			window.addEventListener("popstate", function(e) {  
				WeixinJSBridge.call('closeWindow');//关闭微信浏览器		
    			console.log("监听到了浏览器的返回按钮事件!");
   			}, false);  
   			var that=this;
		  console.log(  that.gethash('couid'),that.gethash('name'));

			// this.$ajax(
			// 		"post",
			// 		baseURL + '/wechat/sign',
			// 		{
			// 		url: encodeURIComponent(location.href.split('#')[0])
			// 	},
			// 	function(data) {
			// 			// url: encodeURIComponent(location.href.split('#')[0]),
			// 		wx.config({
			// 			debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			// 			appId:data.appId, // 必填，公众号的唯一标识
			// 			timestamp: data.timestamp, // 必填，生成签名的时间戳
			// 			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			// 			signature: data.signature, // 必填，签名，见附录1
			// 			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			// 		});

			// 		wx.ready(function() {
			// 			var detail="现在注册19理财即可获得2018投资红包，邀请奖励、投资佣金累计无上限，年化收益最高可达15%" ;
			// 			var title="注册送豪礼，邀请奖励、投资佣金无上限！" ;
			// 			var shareName=that.gethash('name');

			// 			var shareUrl="http://m.19licai.com/?shareUrl=sharereg?couid=" + that.gethash('couid') + "%26name=" + shareName ;

			// 				var shareImageURL="http://m.19licai.com/favicon.jpg";

			// 			wx.onMenuShareTimeline({
			// 				title: title, // 分享标题
			// 				link:  shareUrl ,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			// 				imgUrl: shareImageURL, // 分享图标
			// 				success: function() {
			// 					// 用户确认分享后执行的回调函数

			// 				},
			// 				cancel: function() {
			// 					// 用户取消分享后执行的回调函数

			// 				}
			// 			});
			// 			wx.onMenuShareAppMessage({
			// 				title: title, // 分享标题
			// 				desc: detail, // 分享描述
			// 				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			// 				imgUrl: shareImageURL, // 分享图标
			// 				type: '', // 分享类型,music、video或link，不填默认为link
			// 				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			// 				success: function() {
			// 					// 用户确认分享后执行的回调函数

			// 				},
			// 				cancel: function() {
			// 					// 用户取消分享后执行的回调函数

			// 				}
			// 			});
			// 			wx.onMenuShareQQ({
			// 				title: title, // 分享标题
			// 				desc: detail, // 分享描述
			// 				link: shareUrl, // 分享链接
			// 				imgUrl: shareImageURL, // 分享图标
			// 				success: function() {
			// 					// 用户确认分享后执行的回调函数
			// 				},
			// 				cancel: function() {
			// 					// 用户取消分享后执行的回调函数
			// 				}
			// 			});
			// 			wx.onMenuShareQZone({
			// 				title:title, // 分享标题
			// 				desc: detail, // 分享描述
			// 				link: shareUrl, // 分享链接
			// 				imgUrl: shareImageURL, // 分享图标
			// 				success: function() {
			// 					// 用户确认分享后执行的回调函数
			// 				},
			// 				cancel: function() {
			// 					// 用户取消分享后执行的回调函数
			// 				}
			// 			});
			// 			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			// 		});

			// 	}
			// );
							



        }
	}
</script>

<style scoped lang="stylus">
	.shareView{
    position fixed 
    left 0 
    bottom 0 
    width 100% 
    height 100%
    overflow-y scroll 
    background linear-gradient(#f9c515,#feb54d)
    transition all 0.4s ease 
    -webkit-transition all .4s ease 
    -moz-transition all .4s ease 
  } 
  &.move-enter-avtive,
	&.move-leave-active {
		transform translate3d(0, 0, 0) -webkit-transform translate3d(0, 0, 0) -moz-transform translate3d(0, 0, 0)
	}
	
	&.move-enter,
	&.move-leave-active {
		transform translate3d(100%, 0, 0) -webkit-transform translate3d(100%, 0, 0) -moz-transform translate3d(100%, 0, 0)
	}
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
<style type="text/css" scoped="scoped">
     .shareView{
     	height: 100%;
     	overflow: scroll;
     }
	.Reg_nav_ul{
		/*position: fixed;
		bottom: 0px;
		left:50%;
		transform: translateX(-50%);*/
	}
	.mint-button--normal{
		padding: 0;
		white-space: nowrap;
	}
	.style1{
		background-color:#ffc99d;
	}
	.style2{
		background-color:#fa7009;
  }
  .shareView .Reg_nav {
    margin:0;
  }
  @media screen and (max-width: 320px) {
	 .shareView .Reg_nav{padding-bottom:100px}
	 .mint-button--normal{
		font-size:12px;
	}
  }
  .Reg_p2.Reg_paw{
	  width:80%;
  }
</style>