<template>
	<div class="proRuning" id="proRuning" ref="proRuning">
		<div class="MyHeader" v-if="!isWeixin"><MyHeader :title="'项目详情'" :bgColor="'#ffffff'" textColor="#000"></MyHeader></div>
		<div style="height:54px;width:100%;" v-if="!isWeixin"></div>
		<header class="Inc_head flex" style="height: 160pt;">
			<div class="figure">
				<vue-circle ref="progressCircle"  :progress="detailsData.productBaseInfo.progress" :reverse="false" line-cap="round" :fill="fill" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0" :start-angle="0" insert-mode="append" :thickness="15" :show-percent="false"
				:animation="{ duration: 600 }"
				>
					<p class="progressNum progress" :class="detailsData.productBaseInfo.progress == 100 ? 'jieqingCls' : ''">{{detailsData.productBaseInfo.progress}}%</p>
					<p class="progressNum" style="padding-top: 12px;">{{detailsData.productBaseInfo.status}}</p>
				</vue-circle>
				<!-- <vue-circle v-else ref="progressCircle" progress="50" :reverse="false" line-cap="round" :fill="fill" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0" :start-angle="0" insert-mode="append" :thickness="15" :show-percent="false"
				:animation="{ duration: 600 }"
				>
					<p class="progressNum progress">50%</p>
					<p class="progressNum" style="padding-top: 12px;">募集中</p>
				</vue-circle> -->
				<!--<div class="figu">
					<p class="Inc_p">{{detailsData.productBaseInfo.progress}} %</p>
					<p class="Inc_p1">{{detailsData.productBaseInfo.status}}</p>
				</div>-->
			</div>
			<div class="Inc_r_div">
				<p class="Inc_p2" style="margin-bottom: 12pt;">{{detailsData.bidsInformation.bidsName}}</p>
				<ul>
					<!-- <li class="Inc_l1">
						项目金额：&nbsp;<strong>{{detailsData.productBaseInfo.contractMoney | moneyToFixed(2)}}</strong>&nbsp;元
					</li> -->
					<!-- <li class="Inc_l1">
						可投余额：
						<s class="Inc_l1_s"><strong>{{detailsData.productBaseInfo.InvestableBalances | moneyToFixed(2)}}</strong>&nbsp;元</s>
					</li> -->
					<li class="Inc_l1">
						预期年化：
						<s class="Inc_l1_s"><strong>{{detailsData.productBaseInfo.realyRate}}</strong></s>
					</li>
					<li class="Inc_l1">
						产品期限：<span v-if="is_current===0">&nbsp;{{detailsData.productBaseInfo.periods}}&nbsp;天</span>
						          <span v-else>长期</span>
					</li>
					<li class="Inc_l1">
						还款方式：&nbsp;{{is_current == 1?'按日付息':detailsData.productBaseInfo.redeemType}}
					</li>
					<li class="Inc_l1">
						投标人次：&nbsp;{{detailsData.productBaseInfo.participants}}&nbsp;次
					</li>
				</ul>
			</div>
		</header>
		<div class="tell">
			<span v-if="(detailsData.productBaseInfo.status=='已满标' || detailsData.productBaseInfo.status=='已结清' || detailsData.productBaseInfo.status=='回款中' || detailsData.productBaseInfo.status=='流标')">已完成</span>
			<span v-else>
				<i v-if="is_current==0">剩余时间：<countdown-timer class="remain-countdown" :deadline="getRemainTime(detailsData.productBaseInfo.preparationDate)"></countdown-timer></i>
			    <i v-else>长期</i>
			</span>
		</div>

		<!-- <nav class="flexBox">
			<div class="Inc_one" style="width:100%;">
				<div class="Inc_div Inc_div_one Inc_div_l" style="text-align: left;width: 46%;border-right:1px solid #eeeeee;">
					<img src="../../assets/images/time(3).png" style="width: 14px;height:14px;" />
					<span style="vertical-align:middle">发布时间</span><span style="font-weight: 700;vertical-align:middle">&nbsp;:</span>
					<span style="vertical-align:middle">{{detailsData.productBaseInfo.creatdate.substring(0,detailsData.productBaseInfo.creatdate.indexOf(' '))}}</span>
				</div>
				<div class="Inc_div Inc_div_one Inc_div_r" style="text-align: left;width: 45%;margin-left:5%">
					<img src="../../assets/images/breathway(3).png" style="width: 14px;height:14px;" />
					<span style="vertical-align:middle">起息时间</span><span style="font-weight: 700;vertical-align:middle">&nbsp;:</span>
					<span style="vertical-align:middle">{{detailsData.productBaseInfo.interestStartDate}}</span>
				</div>
			</div>
			
			<div class="Inc_two" style="border-top:1px solid #eeeeee;width:100%;">
				<div class="Inc_div Inc_div_two Inc_div_l" style="text-align: left;width: 46%;border-right:1px solid #eeeeee;">
					<img src="../../assets/images/qt@3x.png" style="width: 14px;height:14px;vertical-align:middle"/>
					<span style="vertical-align:middle">起投金额</span><span style="font-weight: 700;vertical-align:middle">&nbsp;:</span>
					<span style="vertical-align:middle">{{detailsData.productBaseInfo.InvestMin}}&nbsp;(元)</span>
					
				</div>
				<div class="Inc_div Inc_div_two Inc_div_r" style="text-align: left;width: 50%;margin-left:5%;vertical-align:middle">
					<img src="../../assets/images/hk@3x.png" style="width: 14px;height:14px;vertical-align:middle" />
					<span style="vertical-align:middle">还款方式</span><span style="font-weight: 700;vertical-align:middle">&nbsp;:</span>
					<span style="vertical-align:middle;letter-spacing:-1px;">{{detailsData.productBaseInfo.redeemType}}</span>

				</div>
			</div>
			
		</nav> -->
		<div>
			<img src="./img/process.png" alt="" style="width:100%;">
			<!-- 20 135 750 -->
			<div style="display:flex;background-color:#ffffff;justify-content:space-between;text-align:center;color:#666;padding:5px 0 20px;">
				<div style="width:18%;margin-left:5.33333%">{{detailsData.productBaseInfo.creatdate.substring(0,detailsData.productBaseInfo.creatdate.indexOf(' '))}}</div>
				<div style="width:18%;">{{detailsData.productBaseInfo.interestStartDate}}</div>
				<div style="width:18%;margin-right:5.33333%">{{detailsData.productBaseInfo.leftTiem|dateTimeToDate}}</div>
			</div>
		</div>
		<div class="Inc_blank"></div>
		<div class="Inc_ups flex">
			<div class="Inc_ups_div1">
				<p class="Inc_ups_p1">
					账户余额(元)
				</p>
				<p class="Inc_ups_p2">
					{{Number(detailsData.userInfo.balance).toFixed(2)}}
				</p>
				<p class="Inc_ups_p3" :class="{btnDisable:!btnUseAble}">
					<!-- <router-link v-if="btnUseAble" :to="{path:'/home/accountTab/recharge'}">充&nbsp;值</router-link> -->

					<a v-if="btnUseAble" @click.stop="gotoRecharge">充&nbsp;值</a>
					<span v-else>充&nbsp;值</span>
				</p>
			</div>
			<div class="Inc_ups_div1 Inc_ups_div" v-if="is_current != 1">
				<p class="Inc_ups_p1">
					使用加息券(张)
				</p>
				<p class="Inc_ups_p2">
					{{detailsData.userInfo.interestCoupons}}
				</p>
				<p class="Inc_ups_p3" @click.stop="goto(0,btnUseAble)" :class="{btnDisable:!btnUseAble,isAmount:!isAmount}">
					使用加息券
				</p>
			</div>
			<div class="Inc_ups_div1">
				<p class="Inc_ups_p1">
					使用红包(元)
				</p>
				<p class="Inc_ups_p2">
					{{detailsData.userInfo.voucher}}
				</p>
				<p class="Inc_ups_p3" @click.stop="goto(1,btnUseAble)" :class="{btnDisable:!btnUseAble,isAmount:!isAmount}">
					使用红包
				</p>
			</div>

		</div>
		<div class="Inc_blank"></div>
		

		<mt-navbar v-model="selected">
			<mt-tab-item id="1"><span class="text">基本信息</span></mt-tab-item>
			<mt-tab-item id="4"><span class="text">项目详情</span></mt-tab-item>
			<mt-tab-item id="2" @click.native.stop="getInvestData"><span class="text">投资记录</span></mt-tab-item>
			<!-- <mt-tab-item id="3" @click.native.stop="getProfitData"><span class="text">收益计划</span></mt-tab-item> -->
			<!-- <mt-tab-item id="4" @click.native.stop="getAuditData"><span class="text">审核资料</span></mt-tab-item> -->
		</mt-navbar>

		<mt-tab-container v-model="selected" class="mint-tab-container-once">
			<mt-tab-container-item id="1">
				<!-- <program-details :borrowerType="detailsData.productBaseInfo.mortgagetype" :borrowerInfo="detailsData.borrowerInfo" :bidsInformation="detailsData.bidsInformation" :borrowerAccumulationFundInfo="detailsData.borrowerAccumulationFundInfo" :borrowerCarAassetInfo="detailsData.borrowerCarAassetInfo" :borrowerHouseAassetInfo="detailsData.borrowerHouseAassetInfo" :auditInfo="detailsData.auditInfo" :borrowerJobInfo="detailsData.borrowerJobInfo">
				</program-details> -->
				<div style="background-color:#ffffff;padding:15px 15px 50px 15px;font-size:14px;color:#A8A8A8;">
					<div style="display:flex;justify-content:space-between;margin-bottom:10px;" v-if="is_current==0">
						<div>总融资</div>
						<div><span style="color:#000;">{{!detailsData.bidsInformation.loanaMount?'--':detailsData.bidsInformation.loanaMount}}</span></div>
					</div>
					<div style="display:flex;justify-content:space-between;margin-bottom:10px;" v-if="is_current==0">
						<div>可投金额</div>
						<div><span style="color:#000;">{{!detailsData.productBaseInfo.InvestableBalances?'--':detailsData.productBaseInfo.InvestableBalances }}</span></div>
					</div>
					<div style="display:flex;justify-content:space-between;margin-bottom:10px;">
						<div>还款方式</div>
						<div><span style="color:#000;">{{is_current == 1?'按日付息':detailsData.productBaseInfo.redeemType}}</span></div>
					</div>
					<div style="display:flex;justify-content:space-between;">
						<div>起投金额</div>
						<div><span style="color:#000;">{{detailsData.productBaseInfo.InvestMin}}&nbsp;元</span></div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<invest-record :totalInvestment="investDatas.totalInvestment" :participants="investDatas.participants" :List="investDatas.list">
				</invest-record>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<profit-plan :list="profitDatas.list">

				</profit-plan>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<!-- <Audit-information :list="auditDatas.list"> -->
					<div style="line-height:18px;padding:15px 15px 50px 15px;background-color:#ffffff;font-size:13px;line-height:23px;">
						{{detailsData.productBaseInfo.projectRemark?detailsData.productBaseInfo.projectRemark:'暂无描述'}}
					</div>
				<!-- </Audit-information> -->
			</mt-tab-container-item>
		</mt-tab-container>

		<div class="Deta_foot_div2" v-if="detailsData.productBaseInfo.status=='募集中'">
			<!--计算器图片-->
			<!--<img src="./img/caculater.png" />-->
			<input type="number" :readonly="amountFlag" v-if="!amountFlag" v-model.number="amount" onkeyup="value=value.replace(/[^\d]/g,'');" class="investAmount investAmountOnce"    :placeholder="'购买金额'+detailsData.productBaseInfo.InvestMin+'元起'" id="" @blur="clearCont" />
			<span class="investAmount investAmountOnce" v-else @click="tipsMethos('尾标剩余可投金额不可变更')">{{amount}}</span>
			<div class="Deta_btn fr Deta_btn_new" @click.stop="gotoInvest">立即投资</div>
		</div>
		<div v-if="detailsData.productBaseInfo.status=='募集中'" class="Deta_foot_div3">我已阅读并同意 <span @click="goContractPdf">《产品合约-产品说明书-风险揭示书》</span></div>
		<div class="footerTo" @click.stop="toInvest" v-if="detailsData.productBaseInfo.status=='回款中'||
			detailsData.productBaseInfo.status=='流标'||detailsData.productBaseInfo.status=='已满标'
			||detailsData.productBaseInfo.status=='已结清'">
			查看更多项目
		</div>


		<activate-dialog :is-show="isShowActivateDialog" @on-close="closeDialog('isShowActivateDialog')">
    	</activate-dialog>
		<set-password-dialog :is-show="isShowSetPwdDialog" @on-close="closeDialog('isShowSetPwdDialog')">
    	</set-password-dialog>
		<assessment-dialog :is-show="isShowAssessmentDialog" @on-close="closeDialog('isShowAssessmentDialog')" >
    	</assessment-dialog>
		

	</div>
</template>

<script>
	import $ from "jquery";
	import VueCircle from 'vue2-circle-progress'
	import investRecord from "./investRecord.vue";
	import profitPlan from "./profitPlan.vue";
	import programDetails from "./programDetails.vue";
	import AuditInformation from "./AuditInformation.vue";
	import { baseURL } from '@/vuex/url'
	import "../../assets/css/Details.css"
	import CountDownTimer from '@/components/common/CountDownTimer.vue';
	import ActivateDialog from '@/components/Investment/ActivateDialog.vue';
	import AssessmentDialog from '@/components/Investment/AssessmentDialog.vue';
	import SetPasswordDialog from '@/components/Investment/SetPasswordDialog.vue';
	import moment from 'moment';
	import fontSizeFit from "@/utils/font-size-fit.js";
	import { Toast, Indicator, MessageBox } from 'mint-ui'
	
	export default {
		name: 'programDetailRuning',
		data() {
			return {
				is_current:'',
				tempOrderID:'',
				btnUseAble: false,
				userAccountStatus: {
					loginPassword: '',// 登录密码
					phoneSet: '', // 绑定手机
					paymentAccount: '', // 新浪支付账户激活
					paymentPasswordSet: '' // 新浪支付账户交易密码
				},
				selected: "1",
				productId: '',
				borrowerType: '',
				detailsData: {
					productBaseInfo: {
						progress: 0,
						creatdate: '',
						leftTiem: '',
						preparationDate: '',
					},
					bidsInformation: {
						bidsName: ''
					},
					userInfo: {
						balance: ''
					}
				},
				fill: {
					color: ["#fa7009"]
				},
				investDatas: {},
				profitDatas: {},
				auditDatas: {},
				amount: '', //用户要投资的金额
				amountFlag:false,
				isAmount:false,//是否输入购买金额
				isShowActivateDialog:false,//是否激活
				isShowSetPwdDialog:false,//是否设置交易密码
				isShowAssessmentDialog:false,//是否评估
			}
		},
		components: {
			investRecord,
			profitPlan,
			programDetails,
			AuditInformation,
			VueCircle,
			'countdown-timer': CountDownTimer,
			ActivateDialog,
			SetPasswordDialog,
			AssessmentDialog
		},
		watch: {
      'detailsData.productBaseInfo.progress' (val) {
        if(val == 100) {
          val = 0;
        }
				 this.$refs['progressCircle'].updateProgress(val)
			},
			amount: {
					　　handler(newValue, oldValue) {
							//判断数据不为空
							this.isAmount=(newValue!=""&&newValue!=0&&newValue!=null)?true:false;	
							// if(this.isAmount){
							// 	sessionStorage.setItem('$amount',this.amount)
							// }else{
							// 	sessionStorage.setItem('$amount',"")
							// }
					　　},
					　　deep: true　　
					}
		},

		created() {
			if(sessionStorage.getItem('$token')){
				this.getAccountStatus()
			}
			this.amount = sessionStorage.getItem('$amount')
			console.log(this.amount);
			// $(window).on('resize',()=>{
			// 	$('#proRuning').height(window.innerHeight);
			// })
			$('input,textarea').on('blur',function(){
				window.scroll(0,0);
			});
			
			//this.amount = this.$route.query.hasOwnProperty('amount') ? this.$route.query.amount : ''
		},
		mounted() {
			// if(this.$route.query.amount!=undefined){
			// 	this.amount = this.$route.query.amount;
			// }
			this.getProgramDatas();	
			// this.is_current=this.$route.query.is_current?this.$route.query.is_current:this.$store.state.is_current
			this.is_current=this.$store.state.is_current
						
			this.borrowerType = this.$store.state.borrowType;
			fontSizeFit();
			$(window).on('resize',fontSizeFit)
			this.$store.commit("tempOrderID", this.$route.query.hasOwnProperty('tempOrderID') ? this.$route.query.tempOrderID : '');
			this.$el.addEventListener('click',(e)=>{
				if (e.target.nodeName!='INPUT') {
					let inputList = this.$refs.proRuning.querySelectorAll('input')
						inputList.forEach((item) => {
						item.blur()
					})
				}
			})					
		},
		destroyed () {
			$(window).off('resize',fontSizeFit)
		},
		beforeDestroy() {
		},
		methods: {
			clearCont(){
				var that = this	
				//失去焦点，清空红包或加息券
				if(that.amount!=sessionStorage.getItem('$amount')){
					sessionStorage.setItem('$amount',that.amount)
					console.log('金额为'+that.amount);
					console.log('session金额为'+sessionStorage.getItem('$amount'));
					console.log("清空加息券和红包");
							
					that.$ajax('get', baseURL+'/account/usevoucher?tempOrderID=' 
					+ that.$route.query.tempOrderID+'&amount='
					+that.amount, '', function(data) {
						console.log('红包data:' + JSON.stringify(data))
						if(data.status=='200'){
							that.getProgramDatas();			
							that.borrowerType = that.$store.state.borrowType;
							fontSizeFit();
							$(window).on('resize',fontSizeFit)
							that.$store.commit("tempOrderID", that.$route.query.hasOwnProperty('tempOrderID') ? that.$route.query.tempOrderID : '');
							console.log(111111)
						}
					})
				}
				
			},
			tipsMethos(msg){
				this.$Toast({message:msg,position:'bottom'})
			},
			closeDialog(attr){
				this[attr]=false
			},
			getRemainTime(time) {
				time = time ?  time.replace('  ',' ') : ''
				return time
			},
			getProgramDatas() {
				var that = this;
				// that.productId = that.$store.state.productId;
				that.productId = that.$route.query.productId;
				this.$ajax('get', baseURL + '/product/detail/' + this.productId, '', function(data) {
					// that.detailsData = data;
					Object.assign(that.detailsData, data)
					that.detailsData.productBaseInfo.leftTiem = data.productBaseInfo.leftTiem
					that.detailsData.productBaseInfo.preparationDate = data.productBaseInfo.preparationDate
					if(that.detailsData.productBaseInfo.InvestableBalances<=that.detailsData.productBaseInfo.InvestMin){//可投金额<起投金额
						console.log(123)
						that.amount=that.detailsData.productBaseInfo.InvestableBalances
						that.amountFlag=true
					}else{
						that.amountFlag=false
					}               
					switch(that.detailsData.productBaseInfo.status) {
						case 0:
							that.detailsData.productBaseInfo.status = "募集中";
							break;
						case 1:
							that.detailsData.productBaseInfo.status = "回款中";
							break;
						case 2:
							that.detailsData.productBaseInfo.status = "流标";
							break;
						case 3:
							that.detailsData.productBaseInfo.status = "已满标";
							break;
						case 7:
							that.detailsData.productBaseInfo.status = "已满标";
							break;
						default:
							that.detailsData.productBaseInfo.status = "已结清";
					}
					console.log('data:' + JSON.stringify(data))
					that.btnUseAble = !(that.detailsData.productBaseInfo.status== '已满标'|| that.detailsData.productBaseInfo.status=='已结清'|| that.detailsData.productBaseInfo.status=='回款中'|| that.detailsData.productBaseInfo.status=='流标')
				  if(that.is_current==1){
						that.detailsData.productBaseInfo.progress=50
						that.detailsData.productBaseInfo.status='募集中'
						that.detailsData.productBaseInfo.InvestMin=0
					}
					console.log(that.detailsData.productBaseInfo.progress)
				})
			},
			getInvestData() {
				var that = this;
				this.$ajax('get', baseURL + '/product/Investmentlist/' + this.productId, '', function(data) {
					that.investDatas = data;
					console.log('data:' + JSON.stringify(data))
				})
			},
			getProfitData() {
				var that = this;
				this.$ajax('get', baseURL + '/product/revenueplan/' + this.productId, '', function(data) {
					that.profitDatas = data;
					console.log('data:' + JSON.stringify(data))
				})
			},
			getAuditData() {
				var that = this;
				this.$ajax('get', baseURL + '/product/auditinfo/' + this.productId, '', function(data) {
					that.auditDatas = data;
					console.log('data:' + JSON.stringify(data))
				})
			},
			goto(type,useable) {
				if(!useable)return
				var that = this;
				if(sessionStorage.getItem('$token')){
					console.log("amount#", this.amount);
					if(that.amount != ''&&that.amount != null&&that.amount != 0) {
						if((that.amount < that.detailsData.productBaseInfo.InvestMin)&&!that.amountFlag) {
							that.$Toast({
								message: '购买金额不能低于'+that.detailsData.productBaseInfo.InvestMin+'元!',
								position: 'middle',
								duration: 5000
							});
						} else if(((that.amount > that.detailsData.productBaseInfo.InvestableBalances)&&!that.amountFlag )&&this.is_current != 1) {
							that.$Toast({
								message: '购买金额不能高于可投金额!',
								position: 'middle',
								duration: 5000
							});
						} else {
							//that.$store.commit("amount", that.amount);
							that.$store.commit("is_current", that.is_current);
							// if(that.amount%100==0){
								if(type == 0) {
								that.$router.push({
									path: "/ticket",
									query: {
										amount: this.amount,
										tempOrderID: this.$route.query.tempOrderID,
										productId: this.$route.query.productId
									}
								})
								} else {
								that.$router.push({
									path: "/useRedPacket",
									query: {
										amount: this.amount,
										tempOrderID: this.$route.query.tempOrderID,
										productId: this.$route.query.productId
									}
								})
								}
							// }else{
							// 	that.$Toast({
							// 	message: '所购金额必须是100的整数倍!',
							// 	position: 'middle',
							// 	duration: 5000
							// });
							// }
							
						}
					} else {
						that.$Toast({
							message: '请先输入购买金额!',
							position: 'middle',
							duration: 5000
						});
					}
				}else{
					MessageBox.confirm('您尚未登录,点击确定跳转登录页','温馨提示').then(action => {
        		that.$router.push('/login')
						}).catch(() => {
					});
					document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='确定';
				}
			},
			toInvest(){//点击查看更多跳转到投资模块
				var that = this;
				that.$router.push({
								name: "Investment"
							})
			},
			gotoRecharge() {
				var that = this;
				if(sessionStorage.getItem('$token')){
					console.log('判断激活');
					if(!that.userAccountStatus.paymentAccount){
						console.log(that.userAccountStatus.paymentAccount);
						that.isShowActivateDialog=that.isShowActivateDialog?false:true;
						return
					}

					//console.log('判断设置交易密码');
					// if(!that.userAccountStatus.paymentPasswordSet){
					// 	console.log(that.userAccountStatus.paymentPasswordSet);
					// 	that.isShowSetPwdDialog=that.isShowSetPwdDialog?false:true;
					// 	return
					// }

					//跳转充值
					that.$router.push({path: '/home/accountTab/recharge'})
				}else{
					MessageBox.confirm('您尚未登录,点击确定跳转登录页','温馨提示').then(action => {
        		that.$router.push('/login')
						}).catch(() => {
					});
					document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='确定';
				}
			},
			gotoInvest() {
				var that = this;
				if(sessionStorage.getItem('$token')){
					if(!this.userAccountStatus.paymentAccount){
						console.log(this.userAccountStatus.paymentAccount);
						console.log('判断激活');
						this.isShowActivateDialog=this.isShowActivateDialog?false:true;
						return
					}
					//判断isriskassess不为1，去评估
					if(Number(this.detailsData.userInfo.isriskassess)!=1){
						this.isShowAssessmentDialog=this.isShowAssessmentDialog?false:true;
						return
					}				
					if(that.amount != ''&&that.amount != null&&that.amount != 0) {
						if((that.amount < that.detailsData.productBaseInfo.InvestMin)&&!that.amountFlag) {
							that.$Toast({
								message: '购买金额不能低于'+that.detailsData.productBaseInfo.InvestMin+'元!',
								position: 'middle',
								duration: 5000
							});
						} else if(((that.amount > that.detailsData.productBaseInfo.InvestableBalances)&&!that.amountFlag )&&this.is_current != 1) {
							that.$Toast({
								message: '购买金额不能高于可投金额!',
								position: 'middle',
								duration: 5000
							});
						} else {
							let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
							if(numReg.test(that.amount)){
								if(that.amount<=Number(that.detailsData.userInfo.balance)){
									console.log(this.$store.state.tempOrderID);
									
									this.$ajax('post', baseURL + '/account/buynow?amount=' + this.amount + '&orderID=' + this.$store.state.tempOrderID + '&type=0', '', function(data) {
										if(data.status == 200) {
											// that.$Toast({
											// message: '投资成功!',
											// position: 'bottom'
											// })
											that.getInvestData();
											MessageBox.alert('投资成功').then(action => {
												that.$router.push('/home/Product')
											});
											// setTimeout(function(){
											// 	// window.location.href = data.payUrl;
											// 	that.$router.push('/home/Product')
											// },0)
																		
										}else if(data.status == 301){
											MessageBox.confirm('已取消不合规则的加息券/红包,是否继续投资?','温馨提示')
											.then(action => {											
												that.gotoInvest();		
											})
											.catch(() => {});
											document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='确定';
											return

										}
										console.log('data:' + JSON.stringify(data))
									})	
								}else{
									that.$Toast({
										message: '账户余额不足!',
										position: 'middle',
										duration: 5000
									});
								}
								
							}else{
								that.$Toast({
									message: '请正确输入投资金额(最多两位小数)',
									position: 'middle',
									duration: 5000
								});
							}
							
						}
					} else {
						that.$Toast({
							message: '请先输入购买金额!',
							position: 'middle',
							duration: 5000
						});
					}
				}else{
					MessageBox.confirm('您尚未登录,点击确定跳转登录页','温馨提示').then(action => {
        		that.$router.push('/login')
						}).catch(() => {
					});
					document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='确定';
				}
			},
			getAccountStatus(){
				this.$ajax(
					'get',
					baseURL+'/account/security',
					'',
					function(data){
						// 登录密码设置状态
						this.userAccountStatus.loginPassword=data.setPass==1?true:false
						// 绑定手机状态
						this.userAccountStatus.phoneSet=data.setphone==1?true:false
						// 新浪账户激活状态
						this.userAccountStatus.paymentAccount=data.activeSinaPay==1?true:false
						// 新浪支付帐户交易密码设置状态
						this.userAccountStatus.paymentPasswordSet=data.setSinaPass==1?true:false
					}.bind(this)

				)
			},
			goContractPdf(){
				this.$router.push({path:'/contractPdf',query:{path:this.detailsData.productBaseInfo.fileSrc}})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.proRuning {
		position absolute
		left 0
		top 0
		bottom 0		
		height: 100vh;
		width: 100vw;
		overflow-x: hidden;
		overflow-y: scroll;
		background-color: #F5F5F5;
	}
	.MyHeader{
		background-color:#ffffff;
		position: fixed;
    z-index: 100;
		left:0;
		right:0;
	}
	.investAmount {
		display: inline-block;
		height: 40px;
		width: 71%;
		font-size: 15px;
		background: #F9F9F9;
		border: 1px solid #EEEEEE;
		border-radius: 4px;
	}
	.Deta_Tender{
		height: 99px;
		padding: 0px 5.3% 0px;
	}
	.Deta_b_p1{
		margin:0;
		margin-top:9px;
		font-size:18px;
		height:25px;
		line-height:25px;
	}
	.Deta_b_p2{
		font-size: 14px;
		height:20px;
		line-height:20px;
		margin-top:13.75px;
	}
	.footerTo {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		background-color: #fa7009;
		height: 50px;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
		line-height: 50px;
	}
	
	.remain-countdown {
		display: inline-block;
	}
	.flexBox{
		display: flex;
		flex-direction: row ;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		padding-bottom: 1rem;
		justify-content: space-around;
	}
	.Deta_foot_nav {
	height: 52px;
	line-height: 52px;
}
.Deta_foot_div2{
	border-top: 1px solid lightgray;
}
.Inc_ups_div{
	border-left:1px solid #eee;
	border-right:1px solid #eee;
}	
.proRuning .mint-navbar{
  border-bottom: 1px solid #DDDDDD
}
.proRuning .mint-tab-item{border:none!important;height:50px;line-height:50px;padding:0!important}
.proRuning .mint-tab-item .text{position:relative;display:inline-block;height:50px;line-height:50px;font-size: 15px;}
.proRuning .mint-tab-item .text:after{
  content:'';
  display: inline-block;
  position:absolute;
  bottom:-1px;
  left:0;
  width:60px;
  border-bottom: 1px solid transparent;
}
.proRuning .mint-tab-item.is-selected .text:after{
  border-bottom: 1px solid #FF6028;
}

 .Inc_one .Inc_div_l{
	  width:42%;
  }
  .Inc_one .Inc_div_r{
	  width:45%;
  }
   .Inc_two .Inc_div_l{
	  width:42%;
  }
  .Inc_two .Inc_div_r{
	  width:45%;
  }
@media screen and (width: 320px) {
  .proRuning .Inc_r_div {
    padding-left: 35px!important;
  }
  .proRuning .Inc_div{
    padding-left:0!important;
  }
  .Inc_div_one{
	  width:49%;
  }
}
.progressNum.progress{
  color:#ff6028
}
.progressNum.jieqingCls{color:#888888}
</style>
<style lang="stylus" scoped>
$ratio = 47
.figure
	width (400rem/$ratio)
	height (400rem/$ratio)
.progressNum
	font-size (58rem/$ratio)
.Inc_r_div
	padding-left (80rem/$ratio)
.Inc_head
	padding-top (110rem/$ratio)
	// margin-top 54px
.Inc_li_hk1
	margin-right 0
.Inc_ul
	.Inc_li_hk:nth-child(2)
		float right
		flex 1
		text-align right
.tell
	height (116rem/$ratio)
	line-height (116rem/$ratio)
	font-size (46rem/$ratio)
	letter-spacing (8rem/$ratio)
.Inc_ups
	height (330rem/$ratio)
	padding-top (50rem/$ratio)
	padding-bottom (58rem/$ratio)
	padding-left (0rem/$ratio)
	padding-right (0rem/$ratio)
.mint-tab-container-once
	margin-bottom (235.85rem/$ratio)
.Inc_div
	padding-left (0rem/$ratio)

.Inc_one
	padding-top (52rem/$ratio)
	padding-bottom (44rem/$ratio)
	margin-left (36rem/$ratio)
	margin-right (36rem/$ratio)
	display -webkit-box
    display -ms-flexbox
    display flex
    // -webkit-box-orient horizontal
    // -webkit-box-direction normal
    // -ms-flex-direction row
    // flex-direction row
    // -ms-flex-wrap wrap
    // flex-wrap wrap
    // background-color #FFFFFF
    // -ms-flex-pack distribute
    // justify-content space-around
	
.Inc_two
	padding-top (44rem/$ratio)
	margin-left (36rem/$ratio)
	margin-right (36rem/$ratio)
	display -webkit-box
    display -ms-flexbox
    display flex
    -webkit-box-orient horizontal
    -webkit-box-direction normal
    -ms-flex-direction row
    flex-direction row
    -ms-flex-wrap wrap
    flex-wrap wrap
    background-color #FFFFFF
    -ms-flex-pack distribute
    justify-content space-around
	
.Inc_div_one
	padding-top 0
	margin 0
	//margin-top (52rem/$ratio)
.Inc_div_two
	padding-top 0
	margin 0
	//margin-top (88rem/$ratio)
.Inc_ups_p3
	width (234rem/$ratio)
	height (88rem/$ratio)
	line-height (88rem/$ratio)
	border-radius (57.5rem/$ratio)
	margin-left (56rem/$ratio)
	font-size (40rem/$ratio)
.Deta_foot_div2
	height (175.85rem/$ratio)
	line-height (195.85rem/$ratio)

.Deta_btn_new
	width (260rem/$ratio)
	height (90rem/$ratio)
	line-height (90rem/$ratio)
	margin-top (52.93rem/$ratio)
	font-size (43rem/$ratio)
	border-radius (11.5rem/$ratio)
.investAmountOnce
	height (90rem/$ratio)
	line-height (90rem/$ratio)
	font-size (43rem/$ratio)
	border-radius (11.5rem/$ratio)
	text-indent (43rem/$ratio)
.mint-tab-item
	border-bottom 1px solid #BBBBBB
	color #BBBBBB
	margin-bottom -1px	
.mint-tab-item.is-selected 
	border-bottom: 1px solid #FF6028
	color #FF6028
	margin-bottom 0px	
.mint-navbar .mint-tab-item
	padding (40rem/$ratio) (0rem/$ratio);
</style>
