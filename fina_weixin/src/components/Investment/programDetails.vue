<template>
	<div class="details">
		<div class="list">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:18px;height:14px;" src="../../assets/images/borrowerInfo@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人信息
					</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<div class="item" style="padding-bottom:0">
					<span class="huankuan">
				   		客户名称：
				   	</span>{{!borrowerInfo.name?'--':borrowerInfo.name}}<br/>
					<span class="huankuan">
				   		出生日期：
				 	</span>{{!borrowerInfo.birthday?'--':borrowerInfo.birthday}}<br/>
					<span class="huankuan">
				   		手机号码：
				 	</span>{{!borrowerInfo.phone?'--':borrowerInfo.phone}}<br/>
					<span class="huankuan">
				   		婚姻状况：
				 	</span>{{!borrowerInfo.maritalStatus?'--':borrowerInfo.maritalStatus}}<br/>
					<span class="huankuan">
				   		雇佣类型：
				 	</span>{{!borrowerInfo.employmentType?'--':borrowerInfo.employmentType}}<br/>
				 	
				</div>
				<div class="item" style="padding-bottom:0">
					<span class="huankuan">
				   		性别：
				   	</span>{{!borrowerInfo.gender?'--':borrowerInfo.gender}}<br/>
					<span class="huankuan">
				   		身份证：
				 	</span>{{!borrowerInfo.IDnumber?'--':borrowerInfo.IDnumber}}<br/>
					<span class="huankuan">
				   		年龄：
				 	</span>{{!borrowerInfo.age?'--':borrowerInfo.age}}<br/>
					<span class="huankuan">
				   		学历：
				 	</span>{{!borrowerInfo.education?'--':borrowerInfo.education}}<br/>
					<span class="huankuan">
				   		户口所在地 ：
				 	</span>{{!borrowerInfo.registeredAddress?'--':borrowerInfo.registeredAddress}}
				</div>
				<div class="item" style="width:100%;padding:0px">
					<span class="huankuan">
				   		居住地址：
				 	</span>{{!borrowerInfo.address?'--':borrowerInfo.address}}
				</div>
			</div>
		</div>
		<div class="list">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:18px;height:17px;" src="../../assets/images/borrowLabelInfo@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款标的信息
					</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<span class="huankuan" style="padding-left: 0px;">
				   		产品名称：
				</span>{{!bidsInformation.bidsName?'--':bidsInformation.bidsName}}<br/>
				<div class="item" style="padding-top: 0px;">
					<span class="huankuan">
				   		标的金额：
				   	</span>{{!bidsInformation.loanaMount?'--':bidsInformation.loanaMount}}<br/>
					<span class="huankuan">
				   		还款来源：
				 	</span>{{!bidsInformation.repaymentSrc?'--':bidsInformation.repaymentSrc}}<br/>
					 <span class="huankuan">
				   		还款方式：
				 	</span>{{!bidsInformation.redeemType?'--':bidsInformation.redeemType}}
				</div>
				<div class="item" style="padding-top: 0px;">
					<span class="huankuan">
				   		期数：
				 	</span>{{!bidsInformation.periods?'--':bidsInformation.periods}}期<br/>
					<span class="huankuan">
				   		利率：
				   	</span>{{!bidsInformation.realyRate?'--':bidsInformation.realyRate}}<br/>
					<span class="huankuan">
				   		借款用途：
				 	</span>{{!bidsInformation.LoanUsage?'--':bidsInformation.LoanUsage}}

				</div>
				
				
			</div>
		</div>
		<div class="list" v-if="borrowerType==2">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:17px;height:17px;" src="../../assets/images/borrowProblem@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人车产信息
					</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		车辆品牌：
				   	</span>{{!borrowerCarAassetInfo.carbrand?'--':borrowerCarAassetInfo.carbrand}}<br/>
					<span class="huankuan">
				   		购买价格：
				 	</span>{{!borrowerCarAassetInfo.price?'--':borrowerCarAassetInfo.price}}万元<br/>
					<span class="huankuan">
				   		购买时间：
				 	</span>{{!borrowerCarAassetInfo.buydate?'--':borrowerCarAassetInfo.buydate}}<br/>

				</div>
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		车牌号：
				   	</span>{{!borrowerCarAassetInfo.numberPlate?'--':borrowerCarAassetInfo.numberPlate}}<br/>
					<span class="huankuan">
				   		评估价：
				 	</span>{{!borrowerCarAassetInfo.evaluationPrice?'--':borrowerCarAassetInfo.evaluationPrice}}万元<br/>
					<span class="huankuan">
				   		行驶公里数：
				 </span>{{!borrowerCarAassetInfo.milage?'--':borrowerCarAassetInfo.milage}}

				</div>
				<span class="huankuan" style="display: inline-block;padding-left: 0px;margin-top: -15px;">
				   		车辆识别号：
				 </span>{{!borrowerCarAassetInfo.carNumber?'--':borrowerCarAassetInfo.carNumber}}<br/>
			</div>
		</div>
		<div class="list" v-if="borrowerType==1">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:17px;height:17px;" src="../../assets/images/borrowProblem@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人房产信息
					</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		房产性质：
				   	</span>{{!borrowerHouseAassetInfo.property?'--':borrowerHouseAassetInfo.property}}<br/>
					<span class="huankuan">
				   		房产估价：
				 	</span>{{!borrowerHouseAassetInfo.evaluationPrice?'--':borrowerHouseAassetInfo.evaluationPrice}}万元<br/>
					<span v-if="borrowerHouseAassetInfo.incommon == '是'" class="huankuan">
				   		共有人姓名：
				 	</span>{{!borrowerHouseAassetInfo.coownerName?'':borrowerHouseAassetInfo.coownerName}}

				</div>
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		房产证号：
				   	</span>{{!borrowerHouseAassetInfo.number?'--':borrowerHouseAassetInfo.number}}<br/>
					<span class="huankuan">
				   		是否共有：
				 	</span>{{!borrowerHouseAassetInfo.incommon?'--':borrowerHouseAassetInfo.incommon}}<br/>
					<span v-if="borrowerHouseAassetInfo.incommon == '是'" class="huankuan">
				   		共有人手机号：
				 </span>{{!borrowerHouseAassetInfo.coownerPhone?'':borrowerHouseAassetInfo.coownerPhone}}
          
				</div>
				<span v-if="borrowerHouseAassetInfo.incommon == '是'" class="huankuan" style="clear:both;display: inline-block;padding-left: 0px;margin-top: -15px;">
				   		共有人身份证号：
				 </span>{{!borrowerHouseAassetInfo.coownerIDnumber?'':borrowerHouseAassetInfo.coownerIDnumber}}<br/>
				<span  class="huankuan" style="display: inline-block;padding-left: 0px;margin-top: -15px;">
				   		房产地址：
				 </span>{{!borrowerHouseAassetInfo.address?'--':borrowerHouseAassetInfo.address}}
			</div>
		</div>
		<div class="list" v-if="borrowerType==3">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:17px;height:17px;" src="../../assets/images/borrowProblem@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人公积金信息
					</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		账户信息：
				   	</span>{{!borrowerAccumulationFundInfo.account?'--':borrowerAccumulationFundInfo.account}}<br/>
					<span class="huankuan">
				   		公积金贷款：
				 	</span>无<br/>
				</div>
				<div class="item" style="padding-bottom: 0px;">
					<span class="huankuan">
				   		缴纳年限：
				   	</span>{{!borrowerAccumulationFundInfo.paymentLife?'--':borrowerAccumulationFundInfo.paymentLife}}年<br/>
					<span class="huankuan">
				   		月缴金额：
				 </span>{{!borrowerAccumulationFundInfo.monthlyPayment?'--':borrowerAccumulationFundInfo.monthlyPayment}}元<br/>

				</div>
			</div>
		</div>
		
		<div class="list" v-if="borrowerType==3">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:18px;height:14px;" src="../../assets/images/criditRecord@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人企业信息
				</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;padding-top:8px;">
				<div class="item" style="padding-bottom:0">
					<span class="huankuan">
				   		单位名称：
				   	</span>{{!borrowerJobInfo.enterprise?'--':borrowerJobInfo.enterprise}}<br/>
					<span class="huankuan">
				   		单位性质：
				   	</span>{{!borrowerJobInfo.types?'--':borrowerJobInfo.types}}<br/>
					<span class="huankuan">
				   		基本月薪：
				   	</span>{{!borrowerJobInfo.monthlypay?'--':borrowerJobInfo.monthlypay}}
				</div>
				<div class="item" style="padding-bottom:0">
					<span class="huankuan">
				   		部门：
				 	</span>{{!borrowerJobInfo.department?'--':borrowerJobInfo.department}}<br/>
					<span class="huankuan">
				   		现单位工作年限:
				 	</span>{{!borrowerJobInfo.workinglife?'--':borrowerJobInfo.workinglife}}年<br/>
					<span class="huankuan">
				   		公司所在城市:
				 	</span>{{!borrowerJobInfo.city?'--':borrowerJobInfo.city}}
				</div>
			</div>
			
		</div>

		<div class="list" v-if="borrowerType==1 && bidsInformation.loanaMount.substring(0,bidsInformation.loanaMount.length-1)>200000||borrowerType==2 && bidsInformation.loanaMount.substring(0,bidsInformation.loanaMount.length-1)>200000">
			<div style="height:15px;line-height:15px;padding: 15px 8px;">
				<img style="vertical-align: middle;width:18px;height:14px;" src="../../assets/images/criditRecord@3x.png" />
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
						借款人企业信息
				</span>
			</div>
			<div class="clearfix" style="border-top: 1px dashed #f1f1f1;">

				<span class="huankuan">单位名称：</span>{{!borrowerJobInfo.enterprise?'--':borrowerJobInfo.enterprise}}<br/>
				<div class="item" style="padding: 0px;">
					<span class="huankuan">单位性质：</span>{{!borrowerJobInfo.types?'--':borrowerJobInfo.types}}					
				</div>
				<div class="item" style="padding: 0px;">
					<span class="huankuan">所属行业：</span>{{!borrowerJobInfo.industry?'--':borrowerJobInfo.industry}}
				</div>
				<span class="huankuan">单位地址：</span>{{!borrowerJobInfo.address?'--':borrowerJobInfo.address}}
			</div>
		</div>
		
		<div class="shenhe" style="background-color: #FFFFFF;">
			<div class="title" style="height:15px;line-height:15px;padding: 15px 8px;font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #333333;
				letter-spacing: 0;">
				<img style="width:16px;height:19px;" src="../../assets/images/auditStatus@3x.png"/>
				<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">审核状态</span>
			</div>
			<div class="flex">
				<div class="item" v-if="auditInfo.Identity!=0">
					<img style="width:52px;height:41px;" src="../../assets/images/identiAudit@3x.png"/><br/>
					<span >身份审核</span>
				</div>
				<div class="item" v-if="auditInfo.job!=0">
					<img style="width:52px;height:42px;" src="../../assets/images/jobAudit@3x.png"/><br/>
					<span>工作审核</span>
				</div>
				<div class="item" v-if="auditInfo.income!=0">
					<img style="width:52px;height:41px;" src="../../assets/images/incomeAudit@3x.png"/><br/>
					<span>收入审核</span>
				</div>
				<div class="item" v-if="auditInfo.socialRisk!=0">
					<img style="width:51px;height:42px;" src="../../assets/images/SocietyAudit@3x.png"/><br/>
					<span>社会风险审核</span>
				</div>
				<div class="item" v-if="auditInfo.assets!=0">
					<img style="width:52px;height:38px;" src="../../assets/images/asset@3x.png"/><br/>
					<span>资产审核</span>
				</div>
				<div class="item" v-if="auditInfo.Liabilities!=0">
					<img style="width:52px;height:42px;" src="../../assets/images/debtAudit@3x.png"/><br/>
					<span>资产审核</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import {baseURL} from '@/vuex/url'
	export default {
		props: {
	 		borrowerType:'',
	 		borrowerInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {};
	 			}
	 		},
	 		bidsInformation:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {};
	 			}
	 		},
	 		borrowerAccumulationFundInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {}
	 			}
	 		},
	 		borrowerJobInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {}
	 			}
	 		},
	 		borrowerCarAassetInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {}
	 			}
	 		},
	 		borrowerHouseAassetInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {};
	 			}
	 		},
	 		auditInfo:{
	 			type:Object,
	 			required:false,
	 			default:function(){
	 				return {
	 					Identity:1,
	 					job:1,
	 					income:1,
	 					socialRisk:1,
	 					assets:1,
	 					Liabilities:1
	 				};
	 			}
	 		}
	 	},
		data() {
			return {
				selected: "1",
				productId:'',
				detailsData:''
			}
		},
		
		created () {
		
  },
		mounted() {

		},
		methods: {
			goBack() {
				var that = this;
				that.$router.go(-1); //返回上一层
			},
			goto() {
				var that = this;
				that.$router.push({
						path:"/useRedPacket"
					})
			}
		}
	}
</script>

<style scoped="scoped">
	.details{
		background: #F5F5F5;
		min-height: 426px;
	}
	
	.list{
    margin-bottom:10px;
    padding-bottom:10px;
		background-color: #FFFFFF;
	}
	.list .item {
		float: left;
		/* padding: 10px 0px; */
		text-align: left;
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
	}
	
	.huankuan {
		color: #888888;
		letter-spacing: 0;
	}
	.shenhe .flex{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content:space-around;
		align-content:space-between;
		border-top: 1px dashed #f1f1f1;
		border-bottom: none;
		padding-top: 33px;
		padding-bottom: 15px;
		height: 150px;
		margin-bottom: 0px;
		
	}
	.shenhe .flex .item{
		width: 33%;
		text-align: center;
	}
	.shenhe .flex .item img,.shenhe .flex .item span{
		margin-left:-14px;
	}
	.clearfix{
		/* padding: 0px 28px 0px; */
    padding: 0px 8px 0px;
	}
	@media screen and (width: 320px) {
 	.clearfix{
		padding: 10px 28px;
	}
}
</style>