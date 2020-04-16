<template>
	<div class="HelpCenterView" v-if="!isWeixin">
		<MyHeader :title="'常见问题'" style="position:relative;z-index:5;"></MyHeader>
		<div class="wrapper" ref="wrapper" :style="{height}">
			<div class="content">
				<div class="hotProblem pubDiv">
					<ul>
						<li v-on:click="showContents($event)">
							<a>
								<span>1、解绑银行卡</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									为充分保障用户的账户安全，平台对用户的银行卡实行“同卡进出”的要求，即一个用户只能绑定一张银行卡，一个身份证信息只能绑定一张卡且身份信息与银行卡信息必须一致。若需要更换银行卡，请根据以下情况来进行解绑更换银行卡：
								</div>
								<div class="cntFont">
									1、若新浪账户余额为0，则可以直接通过【账户管理】进行银行卡解绑，解绑成功后可以绑定新的银行卡；
								</div>
								<div class="cntFont">
									2、若新浪账户余额不为0，请先将账户余额全部提现后再进行解绑更换银行卡；
								</div>
								<div class="cntFont">
									3、若用户银行丢失且新浪账户余额不为0，请联系客服提交相关个人信息材料已经相应的证明文件，由我司提交至新浪支付进行银行卡变更。
								</div>
							</div>

						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>2、登录密码找回</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									登录19理财APP,点击右下方的【忘记密码】，按照流程完成相应的步骤即可重新设置登录密码。
								</div>
							</div>

						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>3、修改新浪账户支付密码</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									登录APP或官网进入【账户安全】或【账户管理】按照流程步骤进行新浪支付密码的更改。
								</div>
							</div>

						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>4、收费标准</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									<table>
										<tr>
											<td>用户注册</td>
											<td colspan="2">免费</td>
										</tr>
										<tr>
											<td>开通个人账户</td>
											<td colspan="2">免费</td>
										</tr>
										<tr>
											<td>充值</td>
											<td colspan="2">暂时免费，有平台支付</td>
										</tr>
										<tr>
											<td rowspan="3">投资</td>
											<td>新手标</td>
											<td>免费</td>
										</tr>
										<tr>
											<td>抵质押类</td>
											<td>免费</td>

										</tr>
										<tr>
											<td>信用类</td>
											<td>免费</td>
										</tr>
										<tr>
											<td>到账通知</td>
											<td colspan="2">免费</td>
										</tr>
										<tr>
											<td>短信通知</td>
											<td colspan="2">免费，由平台支付</td>
										</tr>
										<tr>
											<td>提现</td>
											<td colspan="2">暂时免费，由平台支付</td>
										</tr>

									</table>
								</div>
							</div>

						</li>
						<li v-on:click="showContents($event)">
							<a>
								<span>5、查看电子合同</span>
								<!-- <span><img src="../../../../assets/images/ShapeRight.png" alt=""></span> -->
								<span class="icon-more"></span>
							</a>
							<div class="showContent">
								<div class="cntFont">
									19理财接入的是安存科技“安存无忧”电子存证，用户在平台完成的每一笔投资数据，都会存入第三方存证系统进行数据固化，全程自动实现无需用户多余操作，所保全数据满足证据的真实性、合法性、关联性要求，做到一站式公证保全，保证客户利益。
								</div>
								<div class="cntFont">
									用户可以查询存证证明
								</div>
								<div class="cntFont">
									方法一：
								</div>
								<div class="cntFont">
									用户投资的标的在放款后，第三方系统会给每笔投标分配一个存证编号，在APP“我的→我的投标”中可以查询此号码。
								</div>
								<div class="cntFont">
									方法二：
								</div>
								<div class="cntFont">
									直接登录
									<a href="https://www.51cunzheng.com/search">https://www.51cunzheng.com/search</a>根据存证编号进行查询。
								</div>
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
		padding: 10px;
	}
	.cntFont table {
		width: 100%;
		margin: 10px 0;
	}

	.cntFont table td {
		border: 1px solid #bfbbbb;
		text-align: center;
	}

	.cntFont table td:nth-child(1) {
		width: 30%;
	}

	.cntFont table td:nth-child(2) {
		width: 30%;
	}
	.cntFont a{color: #00a1e9 !important;padding: 0 !important;display: initial !important;}
</style>
