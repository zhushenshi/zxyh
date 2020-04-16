<template>
	<div class="">
		<mt-header title="账户安全">
			<span href="JavaScript:void(0)" @click.stop="goBack" slot="left">
		    <mt-button icon="back"></mt-button>
		  </span>
		</mt-header>
		<div class="" style="border-bottom: 1px solid lightgray;"></div>
		<mt-cell title="修改登录密码" is-link to="./changeLoginPass">
			<span class="link" @click="goTo">已设置</span>
		</mt-cell>
		<div class="" style="border-bottom: 1px solid lightgray;"></div>
		<mt-cell title="修改绑定手机" is-link to="./changeMobile">
			<span class="link" >未绑定/已绑定</span>
		</mt-cell>
		<div class="" style="border-bottom: 1px solid lightgray;"></div>
		<mt-cell title="新浪支付账户激活" is-link to="./activeSina">
			<span class="link" >未激活/已激活</span>
		</mt-cell>
		<div class="" style="border-bottom: 1px solid lightgray;"></div>
		<mt-cell title="新浪支付账户交易密码" is-link to="/setSinaPayPass">
			<span class="link" >未设置/已设置</span>
		</mt-cell>
		<div class="" style="border-bottom: 1px solid lightgray;"></div>
	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		name: 'accountSafe',
		data() {
			return {

			}
		},

		mounted() {

		},
		methods: {
			goBack() {
				var that = this;
				that.$router.go(-1); //返回上一层

			},
			goTo(){
				var that = this
				// console.log("ok")
				that.$router.push({
								path: '/changeLoginPass'
							});
			}
		}
	}
</script>

<style scoped="scoped">
	.link {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #B0B0B0;
		letter-spacing: 1.45px;
	}
</style>