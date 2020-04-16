<template>
	<div class="profit">
		<header style="margin-top: 5px;
			background-color: #F5F5F5;padding: 10px 20px;">
			<img style="vertical-align: middle;width:12px;height:18px;" src="../../assets/images/bell@3x.png"/>
			<span style="color: #FA7009;vertical-align: middle;">
				* 此收益计划基于项目初始总金额计算得来
			</span>
		</header>
			<div class="listMin">
				<div class="list" v-for="(item, index) in list" :key="index" style="background:#fff;">
					<div class="titleHeader" style="">
						<img style="vertical-align: middle;width:23px;height:23px;" src="../../assets/images/investPic@3x.png"/>
						<span style="vertical-align: middle;font-size: 14px;font-weight: bold;">
							第{{item.periods}}期
						</span>
					</div>
					<div class="clearfix" style="border-top: 1px dashed lightgray;padding: 10px 20px;">
					   <div class="item" style="border-right: 1px solid lightgray;padding-left:0;">
					   	<span class="huankuan">还款本金(元)：</span>{{item.principal}}<br/>
					   	<span class="huankuan">还款利息(元)：</span>{{item.interest}}
					   </div>	
					   <div class="item" style="padding-right:0;">
					   	<span class="huankuan">还款本息(元)：</span>{{item.PrincipalInterest}}<br/>
					   	<span class="huankuan">预计还款日：</span>{{item.repayDate}}
					   </div>	
					</div>
				</div>
			</div>
			
		
	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		props: {
			list:{
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
	.profit{
		min-height:426px;	
	}
	.list .item{
		float: left;
		padding: 0px 12px;
		text-align: left;
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
		overflow: hidden;
		white-space:nowrap;
		
	}
	.titleHeader{
		height: 30px;
		padding: 20px 20px;
	}
	
	.list .item .huankuan{
		color: #888888;
		letter-spacing: 0;	
	}
	
</style>
<style lang="stylus" scoped>
$ratio = 47
.titleHeader
	height (146rem/$ratio)
	line-height (146rem/$ratio)
	padding (0rem/$ratio 50rem/$ratio)
	img
		margin-top (-16rem/$ratio)
.list
	margin-bottom (44rem/$ratio)
.listMin
	min-height (1118rem/$ratio)
</style>