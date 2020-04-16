<template>
	<div class="HelpCenterView">
		<MyHeader :title="'我的账户'" v-if="!isWeixin"></MyHeader>
		<div class="wrapper" ref="wrapper" :style="{height}">
			<div class="content">
				<div class="hotProblem pubDiv">
					<ul>
						<li v-on:click="showContents($event)">
							<a>
								<span>1、红包加息券</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									加息券根据获取方式可以分为：新手注册加息券和投资赠送加息券，用户可在【账户】→【我的红包】中查看，根据加息券的使用规则投资购买相关产品，即可使财富增幅显著提高。
								</div>
								<div class="cntFont">
									温馨提示：加息红包有投资金额、投资时间、投资项目等条件限制，仅可在条件范围内使用。
								</div>
							</div>

						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>2、邀请好友</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									邀请方式：打开手机APP，进入【账户】→【邀请有礼】→【立即邀请】进行好友邀请；
								</div>
								<div class="cntFont">
									活动说明：活动期间，通过您的专属链接邀请好友注册即可获得相应的现金红包、加息券，同时您邀请的好友注册投资，您即可享受投资年化3%的佣金奖励，奖励金额无上限。
								</div>
							<div class="cntFont">邀请奖励：</div>
							<div class="cntFont">
								1、好友注册奖励，用户每邀请一个好友注册成功即可获得2元提现券，奖励金额无上限，注册奖励按月结算。；
							</div>
							<div class="cntFont">
								2、邀请好友注册投资成功后，可获得该笔投资年化金额3%的佣金奖励，佣金奖励无上限，按月结算至用户的新浪账户。
							</div>
							<div class="cntFont exampleTitle">
								例如：您通过个人专属链接或邀请二维码分享给好友小明，他在平台注册购买10万元期限为180天（换算为6个月）的理财产品，您将获得100000×（6/12）×3 %=1500元。
							</div>
							<div class="cntFont">
								说明：如发现有利用系统漏洞、技术手段等恶意刷奖行为的用户，19理财有权取消其活动资格，所有奖励不予承兑。</div>
				</div>
				</li>

				</ul>
			</div>

		</div>
	</div>

	<transition name="move">
		<router-view class="pageView"></router-view>
	</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'MyAccount',
		data() {
			return {
				isShow: false,
				putShow: false,
				moveShow: false
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wrapper, {
					click: true
				})
			})
		},
		methods: {
			showContents(e) {
				var me = e.target;
				if(e.target.nodeName == 'SPAN') {
					me = e.target.parentNode
				} else if(e.target.nodeName == 'IMG') {
					me = e.target.parentNode.parentNode
				}
				if(me.nextElementSibling.className == 'showContent') {
					me.nextElementSibling.className = '';
					me.children[1].style.transform = 'rotate(90deg)';
				} else {
					me.nextElementSibling.className = 'showContent';
					me.children[1].style.transform = 'rotate(0deg)'
				}
				me.children[1].style.transition = 'all 0.4s ease'
			}
		}
	}
</script>

<style scoped>
	.HelpCenterView {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f6f6f6;
	}

	.wrapper {
		height: 100%;
		background: #FFFFFF;
	}

	.accouTitle {
		font-weight: bold;
		margin: 10px 0;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		letter-spacing: 1px
	}

	.cntFont {
		font-size: 12px;
		line-height: 1.5;
		margin: 5px 0;
		color: #333333;
		font-family: PingFangSC-Regular;
		letter-spacing: 1px
	}

	.exampleTitle {
		text-indent: 12px;
	}

	.hotProblem {
		background: #FFFFFF;
	}

	.hotProblem ul {
		overflow: hidden;
	}

	.hotProblem ul li {
		border-bottom: 1px solid #E5E5E5;
	}
	.hotProblem ul li .icon-more{
		font-size:18px;
    color: #8c8c8c;
	}

	/* .hotProblem ul li:last-child {
		border: none;
	} */

	.hotProblem li img {
		width: 10px;
	}

	.hotProblem li div {
		overflow: hidden;
		padding: 0px 8px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #555555;
		letter-spacing: 1.33px;
		background: #F5F5F5;
		line-height: 1.8;
	}

	.hotProblem li span {
		font-size: 14px;
		font-family: "Microsoft YaHei";
		display: inline-block;
	}

	.hotProblem li span:nth-child(1) {
		padding-left: 10px;
		float: left;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		letter-spacing: 1px;
	}

	.hotProblem li span:nth-child(2) {
		padding-right: 10px;
		float: right;
	}

	.hotProblem li a {
		padding: 16px 10px;
		display: block;
		overflow: hidden;
		color: #333333
	}

	.hotProblem li p {
		padding: 20px 10px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #555555;
		letter-spacing: 1.33px;
		background: #F5F5F5;
		line-height: 1.8;
	}

	.showContent {
		display: none;
		background: red;
	}
</style>
