<template>
	<div class="">
		<mt-header title="修改绑定手机">
			<span href="JavaScript:void(0)" @click.stop="goBack" slot="left">
		    <mt-button icon="back"></mt-button>
		  </span>
		</mt-header>
		<div class="" style="border-bottom: 1px solid lightgray;">
			
		</div>
		<div class="form">
			<div>
				<div class="form-item">
					<label class="icon lock icon-mobile"></label>
					<input class="border-1px" type="password" maxLength="11" placeholder="请输入手机号">
				</div>
				<div class="form-item">
					<label class="icon lock icon-testCode"></label>
					<input type="password" placeholder="请输入验证码">					
				</div>				
				<div class="" style="width: 89%;margin: 30px auto 10px auto;">
					<mt-button type="danger" style="width: 100%;background-color: #F4642F;border-radius: 8px;">确认</mt-button>
				</div>
				
			</div>

		</div>
	</div>

</template>

<script>
	import $ from "jquery";
	import "../../../assets/css/base.styl";
	import "../../../assets/css/form.styl";
	export default {
		name: 'changeMobile',
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

<style >
	.lock{
		 display: inline-block;
		 border-right: 1px solid lightgray;
		 padding-right: 10px;
		 background-clip: content-box;
		 background-size: 18px 18px;
		 
	}
	.form-item{
		width: 89%;
		margin: 0px auto;
		border-bottom: 1px solid lightgray;
	}
</style>