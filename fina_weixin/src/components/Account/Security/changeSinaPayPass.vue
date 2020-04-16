<template>
	<div class="sinaActive">
		<mt-header title="设置账户交易密码" style="background-color: #F6F6F6;">
			<span href="JavaScript:void(0)" @click.stop="goBack" slot="left">
		    <mt-button icon="back"></mt-button>
		  </span>
		</mt-header>
	  <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>	
	  <div class="" style="width: 89%;margin: 30px auto 10px auto;">
			<mt-button type="danger" @click.native.stop="goto" style="width: 100%;background-color: #F4642F;border-radius: 8px;">确认修改</mt-button>
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