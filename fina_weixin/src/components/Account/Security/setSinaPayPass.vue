<template>
	<div class="sinaActive">
		<mt-header title="设置账户交易密码" style="background-color: #F6F6F6;">
			<span href="JavaScript:void(0)" @click.stop="goBack" slot="left">
		    <mt-button icon="back"></mt-button>
		  </span>
		</mt-header>
		<div class="">
			<mt-field label="支付密码" placeholder="设置支付密码"  type="password"></mt-field>
		</div>
		
		<div class="" style="margin-top: 15px;">
			<mt-field label="手机号" placeholder="请填写手机号" type="tel"></mt-field>
			<mt-field label="验证码" placeholder="请填写验证码" type="text" ></mt-field>
		</div>
		<div class="" style="color: gray;padding: 10px;20px">
			该手机号由新浪支付认证，独立管理
		</div>
		<div class="" style="width: 89%;margin: 30px auto 10px auto;">
			<mt-button type="danger" @click.native.stop="goto" style="width: 100%;background-color: #F4642F;border-radius: 8px;">下一步</mt-button>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import "../../../assets/css/base.styl";
	import "../../../assets/css/form.styl";
	export default {
		name: 'setSinaPayPass',
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
			goto(){
				var that = this;
				that.$router.push({
					path:"/changeSinaPayPass"
				})
			}
		}
	}
</script>

<style>
	.sinaActive{
		height: 100vh;
		background-color: #F6F6F6;
	}
</style>