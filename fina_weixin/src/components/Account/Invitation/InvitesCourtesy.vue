<!--邀请有礼-->
<template>
	<div class="maxCnt">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'邀请有礼'"></MyHeader></div>
		<div class="scroll-wrapper" ref="scrollWrapper">
			<div class="content-wrapper clearfix">
        <div class="content-main">
          <div class="bannerBg">
            <img src="../../../assets/images/invitesCountesy.png" alt="" />
          </div>
          <div class="cntInvites">
            <div class="rules">
              <div class="ruleTitle"></div>
              <p class="rules1">1、用户登录后点击“我的账户” “邀请好友”查看自己的邀请二维码和邀请链接，可通过上述两种方式邀请自己的好友注册投资;</p>
              <p class="rules2">2、邀请好友实名注册得提现券<br/>实名注册一个用户奖励2元提现券，提现券奖励无上限，多分享多得。提现券奖励按月结算，一次性提现； </p>
              <p class="rules2">3、好友投资奖励<br/>邀请好友投资成功，即可获得该笔投资年化金额3%的佣金奖励，累计奖励无上限。佣金奖励按月结算至邀请人在平台的新浪账户。</p>
              <p class="rules2 ruleClass">佣金计算方式:客户投资金额 X (投资期限/12) X 3%</p>
              <p class="rules2">例：您通过个人专属链接或者邀请码推荐好友小明注册购买10万元,期限为180天（换算为6个月）车贷产品，您将获得:</p>
              <p class="rules2 ruleClass2">100000X (6/12) X3%= 1500元</p>
              <p class="rules2">4、每位用户邀请人数不设上限，用户可通过官网、APP、微信公众号等各种官方渠道参与邀请好友活动，邀请的好友越多，佣金越多,上不封顶;</p>
              <p class="rules2">5、如发现有利用系统漏洞、技术手段等恶意刷奖行为的用户，19理财有权取消其活动资格，所有奖励不予承兑;</p>
              <p class="rules2">6、本次活动的最终解释权归19理财所有。</p>
            </div>
          </div>
          <div class="rulesBottom"></div>
        </div>
			</div>
			<div class="rulesBtn">
				<button @click="gotoRecords">邀请记录</button>
				<button @click="invite">立即邀请</button>
			</div>
		</div>
		<transition name="move"><router-view class="pageView"></router-view></transition>
		<div class="share-bj" v-if="isshow" @click="isshow=false">

		</div>
		<img src="../../../assets/images/ysj.png" width="100%" class="share-img" @click="isshow=false"  v-if="isshow" />
	</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
export default {
	data() {
		return {
			isshow:false,
			uid:'',
			name:'',
			isWeixin:false
		}
	},
	methods: {
		gotoRecords () {
			this.$router.push('/home/accountTab/invitesCourtesy/invitationRecord')
		},
		invite(){
			if(this.isWeixin){
				this.isshow=true
			}
			var ua = navigator.userAgent.toLowerCase();
			let title='19理财'
			let option=['邀请您注册','开启您的赚钱之旅',location.origin+location.pathname+'/#/sharereg?name='+this.name+'&couid='+this.uid]
			if (/iphone|ipad|ipod/.test(ua)) {
				try{
					if(window.webkit.messageHandlers){
						window.webkit.messageHandlers.share.postMessage(option);
					}else{}
				}catch(e){}
			}else if(/android/.test(ua)){
				try{
					if(object&&typeof(object.share)=="function"){
						object.share('邀请您注册','开启您的赚钱之旅',location.origin+location.pathname+'/#/sharereg?name='+this.name+'&couid='+this.uid)
					}else{}
				}catch(e){}
			}			
		}
	},
	watch: {
        '$route' (to, from) {
		const toDepth = to.path.split('/').length
		const fromDepth = from.path.split('/').length
		this.zIndex = toDepth < fromDepth ? false:true;
    }
	},
	created () {
		var ua = navigator.userAgent.toLowerCase();
		var isWeixin = ua.indexOf('micromessenger') != -1;
		this.isWeixin=isWeixin		
		this.$ajax('get',	baseURL+'/account/getmyid',	'',function(res){
				this.name=res.name
				this.uid=res.uid
			if (isWeixin) {
				this.$ajax( "post",baseURL + '/wechat/sign',{url: encodeURIComponent("http://m.19licai.com/"),},function(data) {
								// url: encodeURIComponent(location.href.split('#')[0]),
							wx.config({
								debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId:data.appId, // 必填，公众号的唯一标识
								timestamp: data.timestamp, // 必填，生成签名的时间戳
								nonceStr: data.nonceStr, // 必填，生成签名的随机串
								signature: data.signature, // 必填，签名，见附录1
								jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});		
							wx.ready(function() {
								var detail="现在注册19理财即可获得2018投资红包，邀请奖励、投资佣金累计无上限，年化收益最高可达15%" ;
								var title="注册送豪礼，邀请奖励、投资佣金无上限！" ;
								//var shareUrl="http://m.19licai.com/sharereg?couid=" + res.uid + "&name=" + encodeURIComponent(res.name) ;

								var shareUrl="http://m.19licai.com/?shareUrl=sharereg?couid=" + res.uid + "%26name=" + encodeURIComponent(res.name) ;

									var shareImageURL="http://m.19licai.com/favicon.jpg";

								wx.onMenuShareTimeline({
									title: title, // 分享标题
									link:  shareUrl ,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: shareImageURL, // 分享图标
									success: function() {
										// 用户确认分享后执行的回调函数
	
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
	
									}
								});
								wx.onMenuShareAppMessage({
									title: title, // 分享标题
									desc: detail, // 分享描述
									link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: shareImageURL, // 分享图标
									type: '', // 分享类型,music、video或link，不填默认为link
									dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
									success: function() {
										// 用户确认分享后执行的回调函数
	
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
	
									}
								});
								wx.onMenuShareQQ({
									title: title, // 分享标题
									desc: detail, // 分享描述
									link: shareUrl, // 分享链接
									imgUrl: shareImageURL, // 分享图标
									success: function() {
										// 用户确认分享后执行的回调函数
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
									}
								});
								wx.onMenuShareQZone({
									title:title, // 分享标题
									desc: detail, // 分享描述
									link: shareUrl, // 分享链接
									imgUrl: shareImageURL, // 分享图标
									success: function() {
										// 用户确认分享后执行的回调函数
									},
									cancel: function() {
										// 用户取消分享后执行的回调函数
									}
								});
								// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
							});
	
						}
				);
			}else{
					return false;
			}				
			}.bind(this)
		)
	}
}
</script>
<style scoped>
.maxCnt{background: #FEF8D6;position: fixed;top:0;left: 0;bottom:0;right: 0;}
.scroll-wrapper{width: 100%; height: 100%;overflow: auto;}
.content-wrapper{min-height: 100%;width:100%;}
.clearfix {display: inline-block;}
.content-main{padding-bottom:48px}
        
.bannerBg img{width: 100%;}
.cntInvites {padding: 20px;}
.rules {border: 10px solid #FFA530;border-radius: 10px;position: relative;padding: 12px 6px 0 9px;}
.rules p{margin: 10px 0;}
.ruleTitle {background: url(../../../assets/images/rules.png) no-repeat center center;height: 32px;position: absolute;width: 100%;top: -24px;}
.rules1 {font-family: PingFangSC-Regular;font-size: 11px;color: #2C2C2C;line-height: 16px;letter-spacing: 1px;}
.rules2{font-family: PingFangSC-Regular;font-size: 11px;color: #FF7800;letter-spacing: 1px;text-align: justify;}
.ruleClass{font-family: PingFangSC-Regular;font-size: 11px;color: #FF7800;letter-spacing: 1px;text-align: justify;margin: 0 17px 0 18px !important;}
.ruleClass2{text-align: center;}
.rulesBottom{background: url(../../../assets/images/bottom.png) no-repeat ;height: 35px;margin: 0 50px;}
/* .rulesBtn{overflow: hidden;position: fixed;bottom:0;width: 100%;z-index: 5} */

/* .rulesBtn{position:relative;width:100%;height:48px;margin: -48px auto 0 auto;clear:both;} */
.rulesBtn{position: absolute;bottom:0;width: 100%}
.rulesBtn button{float:left;height:48px;width:50%;text-align:center;line-height:48px;font-family: PingFangSC-Regular;font-size: 18px;color: #FFFFFF;letter-spacing: 1.8px;text-align: center;}
.rulesBtn button:nth-child(1){font-family: PingFangSC-Regular;font-size: 18px;color: #FF5D21;letter-spacing: 1.8px;text-align: center;background: #FFFFFF;}
.rulesBtn button:nth-child(2){font-family: PingFangSC-Regular;font-size: 18px;color: #ffffff;letter-spacing: 1.8px;text-align: center;background: #FA7009;}
.share-img{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 3;
}
.share-bj{
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0,0,0,0.7);
	width: 100%;
	height: 100%;
	z-index: 3;
	
}
</style>