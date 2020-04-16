<template>
	<div class="invest">
		<!-- <div class="Deta_Tender flex">
			<div class="Deta_l_div">
				<p class="Deta_b_p1">
					{{totalInvestment}}.00
					<s class="Deta_b_s"></s>
				</p>
				<p class="Deta_b_p2">
					已投总额(元)
				</p>
			</div>
			<div class="Deta_r_div">
				<p class="Deta_b_p1">
					{{participants}}
				</p>
				<p class="Deta_b_p2">
					投标人次
				</p>
			</div>
		</div> -->
		<div class="Inc_blank"></div>

		<!-- <div class="Deta_foot_nav">
			<ul class="flex">
				<li class="Deta_foot_l1">投资人</li>
				<li class="Deta_foot_l1">金额(元)</li>
				<li class="Deta_foot_l1" style="width:23%">加息券(%)</li>
				<li class="Deta_foot_l1">红包(元)</li>
				<li class="Deta_foot_l1" style="width:25%">时间</li>
			</ul>
		</div> -->
		<div class="Deta_foot_div" >
			<template v-if="List.length > 0" >
				<ul class="Deta_foot_ul flex" v-for="item in List" >
					<li class="Deta_foot_l2">
						{{item.investors}}
					</li>
					<li class="Deta_foot_l2">
						{{item.amount}}
					</li>
					<!-- <li class="Deta_foot_l2" style="width:23%">
						{{item.interestCoupon}}
					</li>
					<li class="Deta_foot_l2">
						{{item.voucher}}
					</li> -->
					<li class="Deta_foot_l2" style="width:25%">
						{{item.date}}
					</li>
				</ul>
			</template>
			<template v-else>
				<div class="Deta_foot_none">暂无投资记录!</div>
			</template>
			
		
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import {baseURL} from '@/vuex/url';
	export default {
		props: {
			totalInvestment:{
				type:Number,
				required:false,
	 			default:1
			},
			participants:{
				type:Number,
				required:false,
	 			default:1
			},
	 		List:{
	 			type:Array,
	 			required:false,
	 			default:function(){
	 				return [];
	 			}
	 		}
	 	},
		data() {
			return {
				selected: "1"
			}
		},
		created () {
		
  },
		mounted() {
		},
		methods: {

		}
	}
</script>

<style scoped>
.invest{
	min-height:426px;
}
.Deta_foot_none{
	height: 200pt;
	line-height:200pt;
	text-align:center;
	color:#999;
	font-size:12pt;
}
</style>
