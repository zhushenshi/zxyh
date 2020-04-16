<template>
	<div class="HelpCenterView">
		<MyHeader :title="'关于投资'" v-if="!isWeixin"></MyHeader>
		<div class="wrapper" ref="wrapper" :style="{height}">
			<div class="content">
				<div class="hotProblem pubDiv">
					<ul>
						<li v-on:click="showContents($event)">
							<a>
								<span>注册相关</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<p class="showContent">
								下载19理财APP后打开应用，第一步，点击【快速注册】， 输入手机号点击获取验证码，信息输入完成后点击【注册】，老用户直接【登录】即可投资。<br/> 第二步，进入【账户】，点击【账户安全】激活新浪电子账户，根据提示输入信息，点击【完成】后还需要设置账户交易密码，以上操作完成进入投资列表。
								<br/> 第三步，投资前还需要评估风险承受能力，才能进行投资。
							</p>
						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>充值提现</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<p class="showContent">
								客户所有的投资都是通过第三方托管账户进行，为保证您的资金安全请勿泄露相关账户信息，在充值提现时留意周围环境。<br/> ①充值：登录19理财APP，点击【账户】→【充值】→输入充值金额后，跳转至新浪支付页面，按照页面提示信息，填写交易密码，即可完成充值。
								<br/> ②提现：登录19理财APP，点击【账户】→【提现】→输入提现金额后，跳转至新浪支付页面，按照页面提示信息，填写交易密码，即可完成提现。（温馨提示：提现到账时间2小时以内。）
							</p>
						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>债权转让</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<p class="showContent">
								登录19理财APP，点击【投资理财】，选择想要购买的标的，输入投资金额后点击投资。<br> 温馨提示：购买标的时需要把投资金额充值到账户中再进行投资，投资时可根据页面信息提示选择可使用的红包和加息券。
							</p>
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
		name: 'OnInvestment',
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
		;
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
		display: none
	}
</style>
