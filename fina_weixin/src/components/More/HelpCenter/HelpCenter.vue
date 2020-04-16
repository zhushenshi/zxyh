<template>
	<div class="HelpCenterView">
		<MyHeader :title="'帮助中心'" v-if="!isWeixin" style="position:relative;z-index:5;"></MyHeader>
		<div class="wrapper" ref="wrapper" :style="{height}">
			<div class="content">
				<div class="helpCenterMenu">
					<ul class="helpCenterUl">
						<li @click='toInvestment'>
							<em class="Investment"></em>
							<span>关于投资</span>
						</li>
						<li @click='toMyAccount'>
							<em class="myAccount"></em>
							<span>我的账户</span>
						</li>
						<li @click='toProblems'>
							<em class="problems"></em>
							<span>常见问题</span>
						</li>
					</ul>
				</div>
				<div class="preProblems">猜您遇到以下问题</div>
				<div class="hotProblem pubDiv">
					<ul>
						<li @click="showContents($event)">
							<a>
								<span>提现金额多久能到账？</span>
								<!-- <span><em  class='shapeRight'></em></span> -->
								<span class="icon-more"></span> 
							</a>
							<p class="showContent">用户在发起提现后两小时以内到账。</p>
						</li>
						<li @click="showContents($event)">
							<a>
								<span>如何更换绑定银行卡？</span>
								<!-- <span><em  class='shapeRight arrow'></em></span> -->
								<span class="icon-more"></span> 
							</a>
							<p class="showContent">手机端暂时不提供解绑更换银行卡功能，如需要更换银行卡可登录19理财官网进入【我的账户】，在【账户管理】中修改。在更换解绑银行卡前，账户金额需为0。</p>
						</li>
						<li @click="showContents($event)">
							<a>
								<span>提现和充值有手续费吗？</span>
								<!-- <span><em  class='shapeRight'></em></span> -->
								<span class="icon-more"></span> 
							</a>
							<p class="showContent">充值提现的手续费由19理财平台承担，对于投资人不收取任何相关手续费。</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
    <router-view class="pageView"></router-view>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'HelpCenter',
	data() {
		return {
			shapeRight:true,
			shapeDown:"active2"
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
		toInvestment() {
			this.$router.push('/home/more/onInvestment');
		},
		toMyAccount(){
		this.$router.push('/home/more/myAccount');	
		},
		toProblems(){
			this.$router.push('/home/more/comProblem');	
		},
		showContents(e) {
			var me=e.target;
			if(e.target.nodeName=='SPAN'){
				me=e.target.parentNode
			}else if(e.target.nodeName=='EM'){
				me=e.target.parentNode.parentNode
			}
			if(me.nextElementSibling.className=='showContent'){
				me.nextElementSibling.className='';
				me.children[1].style.transform='rotate(90deg)';
			}else{
				me.nextElementSibling.className='showContent';
				me.children[1].style.transform='rotate(0deg)'
			}
			me.children[1].style.transition='all 0.4s ease'
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
		background: #F5F5F5;
		;
	}
	
	.helpCenterMenu {
		background: #ffffff;
	}
	
	.helpCenterUl {
		overflow: hidden;
		padding: 30px 0;
	}
	
	.helpCenterUl li {
		float: left;
		width: 33%;
		text-align: center;
		margin: auto;
	}
	
	.helpCenterUl li em {
		margin: auto;
	}
	
	.Investment {
		display: block;
		background: url(../../../assets/images/investPic3.png) no-repeat center center;
		background-size: contain;
		height: 39px;
		width: 45px;
	}
	
	.myAccount {
		display: block;
		background: url(../../../assets/images/myAccount3.png) no-repeat center center;
		background-size: contain;
		height: 39px;
		width: 45px;
	}
	
	.problems {
		display: block;
		background: url(../../../assets/images/problem3.png) no-repeat center center;
		background-size: contain;
		height: 39px;
		width: 45px;
	}
	
	.helpCenterUl li span {
		display: inline-block;
		margin-top: 10px;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #4E4E4E;
		letter-spacing: 1.56px;
	}
	
	.preProblems {
		font-family: PingFangSC-Regular;
		font-size: 11px;
		color: #888888;
		letter-spacing: 1.22px;
		margin: 7px 27px;
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
	
	.hotProblem ul li:last-child {
		border: none;
	}
	
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
	.hotProblem li span.icon-more{
		vertical-align:middle;
  		font-size:18px;
		color:#8c8c8c;
		line-height:50px;  
	}  
	
	.hotProblem li span:nth-child(1) {
		float: left;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		letter-spacing: 1px;
	}
	
	.hotProblem li span:nth-child(2) {
		float: right;
	}
	
	.hotProblem li span:nth-child(2) em {
		display: inline-block;
		height: 20px;
		width: 20px;
		position: relative;
    top: 5px;
	}
	.shapeRight{background: url(../../../assets/images/ShapeRight.png) no-repeat center center;}
	.shapeDown{background: url(../../../assets/images/Shapedown.png) no-repeat center center;}
	.hotProblem li a {
    height: 50px;
    line-height: 50px;
		padding: 0 30px;
		display: block;
		overflow: hidden;
		color: #333333
	}
	
	.hotProblem li p {
		font-size: 12px;
		color: #4D4D4D;
		text-indent: 24px;
		background: #F5F5F5;
		padding: 10px 5px;
		line-height: 1.8;
	}
	.showContent{
		display: none
	} 
</style>