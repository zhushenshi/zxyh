<template>
	<div class="sinaActive">
		<div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'绑定银行卡'"></MyHeader></div>
		<div class="info-item">
			<mt-field label="真实姓名" placeholder="请输入您的真实姓名" v-model.trim="form1.name"></mt-field>
      <div class="line"></div>
 			<mt-field label="身份证号" :attr="{ maxlength: 18 }" placeholder="请输入您的身份证号" v-model.trim="form1.idNo"></mt-field>
		</div>
		<div class="info-item">
 			<a data-v-654425dc="" class="mint-cell mint-field"><!----> <div class="mint-cell-left"></div> <div class="mint-cell-wrapper"><div class="mint-cell-title"><!----> <span class="mint-cell-text">银行</span> <!----></div> <div class="mint-cell-value"><a id="trigger5" class="mint-field-core">请选择开户行</a> <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div> <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span> <div class="mint-field-other"></div></div> <!----></div> <div class="mint-cell-right"></div></a>
			<div class="line"></div>
      <mt-field label="银行卡号" placeholder="请输入您的银行卡号" type="tel" :attr="{ maxlength: 19 }"  v-model.trim="form1.cardNo"></mt-field>
			<div class="line"></div>
      <a data-v-654425dc="" class="mint-cell mint-field"><div class="mint-cell-left"></div> <div class="mint-cell-wrapper"><div class="mint-cell-title"><span class="mint-cell-text">开户行省市</span></div> <div class="mint-cell-value"><a id="trigger4" class="mint-field-core">请选择开户行省市</a> <i class="mint-cell-allow-right"></i><div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div> <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span> <div class="mint-field-other"></div></div></div> <div class="mint-cell-right"></div></a>
			 
		</div>
		<div class="info-item">
			<mt-field label="手机号码" placeholder="请输入银行预留手机号" :attr="{ maxlength: 11 }" type="tel" v-model.trim="form1.tel"></mt-field>
			<mt-field label="验证码" placeholder="请输入验证码" :attr="{ maxlength: 6 }" type="text" v-model.trim="form1.smsCode">
				<span class="captcha" @click="!enableClick&&getSmsCode()">{{Buttoncontent}}</span>
			</mt-field>
		</div>
		<div style="width: 89%;margin: 10px auto;">
			<span id="" style="display: inline-block;width: 14px;height: 14px;vertical-align: middle;
				line-height: 14px;
				border-radius: 50%;background-color:#F4642F ;color: #FFFFFF;text-align: center;">
				!
			</span>
			<span id="" style="font-family: PingFangSC-Medium;
				vertical-align: middle;
				font-size: 12px;
				color: #848484;
				letter-spacing: -0.17px;">
				认证手机号必须与银行卡预留手机号一致，否则无法绑定
			</span>
		</div>
		<div class="" style="width: 89%;margin: 30px auto 10px auto;">
			<mt-button type="danger" @click="bindingCardConfirm" :class="{active:isActive}">完成</mt-button>
		</div>
		<!-- <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="true">
			<div class="title">
				<span>提示</span>
				<span class="icon-close" @click="hidePopUp"></span>
			</div>
			<div class="content">
				<mt-field label="" :attr="{ maxlength: 6 ,style:{width:'110px',fontSize:'15px'}}" style="color:red" placeholder="输入验证码" v-model="form2.smsCode">
				</mt-field>
				<mt-button  style="width: 100%;background:#FFC99D;margin: 0px auto;" @click.native="promote">确定</mt-button>
			</div>
		</mt-popup> -->
	</div>
</template>

<script>
	import $ from "jquery";
	import "../../../assets/css/base.styl";
	import "../../../assets/css/form.styl";
	import "../../../assets/css/registered.css";

	import {baseURL} from '../../../vuex/url.js'
	import {city} from '../../../vuex/area.js'
	import MobileSelect from 'mobile-select'
	import {banks} from '../../../vuex/bankcode.js'
	import { MessageBox } from 'mint-ui';
	var timerT1;

	export default {
		name: 'activeSina',
		data() {
			var A=1 
			return {
				popupVisible: false,
				form1:{
					name:'',
					idNo:'',
					bankName:'',
					bankCode:'',					
					cardNo:'',
					provNo:'',
					cityNo:'',
					tel:'',
					smsCode:'',
					transId:'===',// 预绑卡返回流水
					merUserId:'===',
    //  * @param merUserId userId
    //  * @param kind 可为空
    //  * @param payCode 支付渠道code
    //  * @param checkedToken 可为空
					
				},
				form2:{
					ticket: '',
					smsCode: ''
				},
				citys:city,
				banks:banks,
				isActive:false,
				enableClick:false,
				Buttoncontent:'获取',
				timer: 60,
			}
		},
		watch: {
			form1: {
			　　handler(newValue, oldValue) {
					//判断数据都不为空
					var arr=Object.values(newValue);
				    let a = arr.every(item=>{
				        if(item!=''){
				            return true;
				        }else{
				            return false;
				         }
				     });
					//执行按钮高亮
					this.isActive=(a===true)?true:false;	
			　　},
			　　deep: true　　
			}
		},
		created(){
			this.$ajax('get',baseURL +'/account/security','',(data)=>{
				this.form1.name=data.custName
				this.form1.idNo=data.custIc
			})
		},
		mounted() {
			this.getBankName()
			var mobileSelect4 = new MobileSelect({
					trigger: "#trigger4",
					title: "请选择省市",
					wheels: [
						{data:
						this.citys
						}
					],
					keyMap: {
							value: 'name',
							childs :'city'
						},
				callback:function(indexArr, data){
					this.form1.provNo=data[0].name
					this.form1.cityNo=data[1].name
					console.log(this.form1)
				}.bind(this)
			});	
    },
		methods: {
			hidePopUp() {
				this.popupVisible = false;
			},
			goBack() {
				var that = this;
				that.$router.go(-1); //返回上一层

			},
			bindingCardConfirm(){//绑卡接口
				if(this.checkif(false)){
					this.$ajax('post',baseURL+'/ordePay/bindingCardConfirm',this.form1,(data)=>{
							if(data.status=='200'){
								// this.form2.ticket=data.ticket
								// console.log(22,this.form2.ticket,data.ticket)
								this.goBack()
								this.$Toast({message: data.msg,position: 'bottom'})
							}
						}
					)

				}
			

			},
			// 新浪推进接口--激活第二步
			promote () {
		
				this.$ajax(
					'post',
					baseURL+'/account/promote',
					{
						smsCode: this.form2.smsCode,
						ticket: this.form2.ticket
					},
					function(data){
						MessageBox({
							title: '温馨提示',
							message: '设置完交易密码，才能投资哦~',
							confirmButtonText:'去设置'
							}).then(action => {
								window.location=data.redirectUrl
						});

					}.bind(this)
				)
			},
			checkif(flag){
        var pattern = /^([1-9]{1})(\d{14,18})$/;//银行卡正则表达式
				if(!this.form1.name){
					 this.$Toast({
						message: '真实姓名不能为空',
						position: 'bottom'
					})
					return false
				}else if(!/^[\u4e00-\u9fa5]{1,10}$/.test(this.form1.name)){
					this.$Toast({
						message: '真实姓名为10个以内的汉字',
						position: 'bottom'
					})
					return false
				}else if(!this.form1.idNo){
					this.$Toast({
						message: '身份证号不能为空',
						position: 'bottom'
					})
					return false
				}else if(!/^\d{17}[\dx]$/i.test(this.form1.idNo)){
					this.$Toast({
						message: '请输入18位身份证号码',
						position: 'bottom'
					})
					return false
				}else if(!this.form1.bankCode){
					this.$Toast({
						message: '请选择银行',
						position: 'bottom'
					})
					return false
				}else if(!this.form1.cardNo){
					this.$Toast({
						message: '请输银行卡号',
						position: 'bottom'
					})
					return false
				}else if(!pattern.test(this.form1.cardNo)){
					this.$Toast({
						message: '请输入正确的银行卡号',
						position: 'bottom'
					})
					return false
				}
				if(!this.form1.provNo||!this.form1.cityNo){
					this.$Toast({
						message: '请选择开户行省市',
						position: 'bottom'
					})
					return false
				}
				if(!this.form1.tel){
					this.$Toast({
						message: '请输入手机号码',
						position: 'bottom'
					})
					return false
				}else if(!/^1\d{10}$/.test(this.form1.tel)){
					this.$Toast({
						message: '请输入正确的手机号码',
						position: 'bottom'
					})
					return false
				}
				if(!this.form1.smsCode&&!flag){
					this.$Toast({
						message: '请输入验证码',
						position: 'bottom'
					})
					return false				
				}
				// else if(!/^\d{6}$/.test(this.form1.smsCode)&&!flag){
				// 	this.$Toast({
				// 		message: '请输入正确的验证码',
				// 		position: 'bottom'
				// 	})
				// 	return false						
				// }
				return true

			},
			getSmsCode(){
				if(this.checkif(true)){
					var _this = this;
					_this.enableClick = true;//enableClick为true的时候禁止点击重发
					this.$ajax('post',baseURL+'/ordePay/bindingCard',this.form1,(data)=>{
							if(data.status=='200'){
								this.$Toast({message: data.msg,position: 'bottom'})
								this.form1.transId=data.transId
								this.form1.merUserId=data.merUserId
								_this.Buttoncontent =  '60s';
								timerT1 = setInterval(function() {
									_this.timer--;
									_this.Buttoncontent = _this.timer +'s'
									if(_this.timer === 0) {
										_this.timer = 60;
										clearInterval(timerT1);
										_this.Buttoncontent = "重新获取";
										_this.enableClick = false;
									}
								}, 1000)
							}
						},
						(err)=>{
							_this.enableClick = false;
						}
					)
					setTimeout(()=>{
						_this.enableClick = false;
					},0)
				}	
			},
			getBankName(){
				this.$ajax('post',baseURL+'/ordePay/getBankName','',(data)=>{
					if(data.status=='200'){
						this.banks=data.data
						var mobileSelect5 = new MobileSelect({
									trigger: "#trigger5",
									title: "请选择银行",
									wheels: [
										{data:this.banks}
									],
									keyMap: {
											value: 'name',
											code :'code'
										},
								callback:function(indexArr, data){
										this.form1.bankCode=data[0].code
										this.form1.bankName=data[0].name
									console.log(this.form1)
								}.bind(this)
						});	

					}
				})				
			}		
	

		}
	}
</script>

<style scoped="scoped">
	
	.info-item{
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.captcha{
		padding:8px 15px;
		border:1px solid rgba(153,153,153,1);
		border-radius:4px;
		cursor: pointer;
	}
	.mint-button--danger{
		background:#FFC99D;
		width: 100%;
		border-radius: 8px;
	}
	.mint-button--danger.active{
		background-color: #fa7009;
  }
</style>
<style type="text/css">
	.sinaActive{
		height: 100%;
		background-color: #F6F6F6;
	}
	.sinaActive .mint-cell-text{
		font-family: PingFangSC-Medium;
		font-size: 16px;
		/* font-weight: 700; */
		color: #000;
		letter-spacing: -0.2px;
	}
	.sinaActive .mint-field-core{
		font-family: PingFangSC-Medium;
		font-size: 16px;
		/* font-weight: 550; */
		color: #eeeeee;
		letter-spacing: -0.2px;
	}
	/* .sinaActive input::-webkit-input-placeholder{
            font-family: PingFangSC-Medium;
			font-size: 17px;
			font-weight: 550;
			color: #eeeeee;
			letter-spacing: -0.2px;
        }
    .sinaActive input::-moz-placeholder{ 
            font-family: PingFangSC-Medium;
			font-size: 17px;
			font-weight: 550;
			color: #eeeeee;
			letter-spacing: -0.2px;
        }
    .sinaActive input:-moz-placeholder{
            font-family: PingFangSC-Medium;
			font-size: 17px;
			font-weight: 550;
			color: #eeeeee;
			letter-spacing: -0.2px;
		} */
	a:hover {
    		color: #333;
		}
  .sinaActive .mint-cell{background-image:none;width:100%;margin:0 auto;height:50px;padding:0 15px;}
  .sinaActive .mint-cell-wrapper{background-image:none;padding:0;font-size: 14px;color: #333333;letter-spacing: 1px;}
  .sinaActive .line{margin:0 10px;border-top:1px solid #ECECEC}
</style>
<style scoped lang="stylus">
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
// .sinaActive
// 	.mint-cell-title
// 		.mint-cell-text
// 			font-weight  bold
.mint-cell-allow-right::after
	width:10px;
	height:10px;


</style>
