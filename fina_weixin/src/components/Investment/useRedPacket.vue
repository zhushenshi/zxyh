<template>
	<div class="myRedPacket">
		<div class="MyHeader" v-if="!isWeixin" style="position:relative;z-index:5;"><MyHeader :title="'红包'" :bgColor="'#ffffff'" textColor="#000"></MyHeader></div>
		<div class="transactionSwipper" ref="transactionSwipper" :style="{top:(isWeixin?'10px':'74px')}">
			<div class="content" ref="content">
				<div class="top-tip">
					<span class="refresh-hook">{{topText}}</span>
				</div>
				<div class="redPacket" v-for="(list,index) in pageList" :key="index">

					<div :class="{backColor:list.status=='立即使用',backColor1:list.status=='已失效'||list.status=='已使用'||list.canuse==0}"></div>
					<div class="card-body">
						<div class="redLeft part-num">
							<p class="redP">
								<span :class="{unit:list.status=='立即使用',unit1:list.status=='已失效'||list.status=='已使用'||list.canuse==0}">￥ </span>
								<span :class="{num:list.status=='立即使用',num1:list.status=='已失效'||list.status=='已使用'||list.canuse==0}">{{list.amount | moneyToFixed(2)}}</span>
							</p>
							<span class="minInvest">
								单笔满{{list.limit | moneyToFixed(2)}}可用
							</span>
						</div>
						<div class="redRight">
							<div class="registerTitle">
								<span class="registerRed">{{list.type==1?'新手注册红包':list.type==2?'新手投资红包':list.type==3?'邀请注册红包':list.type==4?'邀请投资红包':list.type==5?'活动红包':'红包'}} </span>
								<span class="registerUsed">{{list.investLimit == 15 ? "(新手标可用)" : "(全品类可用)"}}</span>
								<img src="../../assets/images/binding@3x.png" @click="cancelBinding($event)" :class="{isBinding:list.mark=='1'}"/>

							</div>
							
							<span class="registerDesc"  v-text="defineInvestLimit(list.investLimit)"></span><br/>
							<span class="registerDesc" v-if="list.endDate">
								{{list.startDate}}至{{list.endDate}}
							</span>
							<span class="registerDesc" v-else>
								永久有效
							</span>

						</div>
					</div>
					<div class="card-bottom">
						<div class="button" :class="{button:list.status=='立即使用',button1:list.status=='已失效'||list.status=='已使用'||list.canuse=='0'}" @click.stop="goTo(list.id,list.status)">
							{{list.status}}
						</div>
					</div>
				</div>
				<div class="bottom-tip">
					<span class="loading-hook" @click.stop="getMore">{{bottomText}}</span>
				</div>
			</div>
		</div>
		<div class="alertTips" v-show="refreshSuccess">刷新成功</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import BScroll from 'better-scroll';
	import {baseURL} from '@/vuex/url';
	import fontSizeNew from "@/utils/font-size-new.js";
	export default {
		name: 'useRedPacket',
		data() {
			return {
//				redInfoDatas: {},
				buttonFlag:true,
				button1Flag:false,
				pageList: [],
				searchCondition: {
					curpage: 1,
					pagesize: 100
				},
				isHaveMore: false,
				topText: '下拉刷新',
				bottomText: '查看更多',
				refreshSuccess: false
			}
		},

		mounted() {
			this.getRedInfo();
			fontSizeNew();
			$(window).on('resize',fontSizeNew)
		},
		destroyed () {
			$(window).off('resize',fontSizeNew)
		},
		filters: {
			moneyInt (val) {
				try { 
					return parseInt(val)
				} catch (e) {
					return val
				}
			}
		},
		methods: {
			cancelBinding($event){
				var that=this;
				var id='';
				//隐藏绑定图片
				console.log($event.target.className);
				$event.target.className="";
				//取消绑定,跳转详情
				that.$ajax('get', baseURL+'/account/usevoucher?tempOrderID=' 
				+ that.$route.query.tempOrderID+'&id='+id+'&vtype=0'+'&amount='
				+this.$route.query.amount, '', function(data) {
					console.log('红包data:' + JSON.stringify(data))
					if(data.status=='200'){
						that.$router.push({
							path: '/programDetailRuning',
							query: {
								productId: that.$route.query.productId,
								tempOrderID: that.$route.query.tempOrderID
							}
					   });
					}
				})
				
			},
			defineInvestLimit(days) {
				if(days == 15 || days == 365) {
					return '折扣率100%;适用期限'+days+'天';
				}else {
					return '折扣率100%;适用期限'+days + '天及以上';
				}
    		},
			_initScroll() {
				this.$nextTick(() => {
					let This = this;
					if(this.$refs.content.offsetHeight < this.$refs.transactionSwipper.offsetHeight) {
						this.$refs.content.style.minHeight = this.$refs.transactionSwipper.offsetHeight + 1 + 'px'
					}
					this.scroll = new BScroll(this.$refs.transactionSwipper, {
						click: true,
						probeType: 1,
						pullDownRefresh: {
							threshold: 30,
							stop: 20
						},
						pullUpLoad: {
							threshold: -30
						}
					});
					this.scroll.on('scroll', function(position) {
						if(position.y > 30) {
							This.topText = '释放立即刷新'
						} else {
							This.topText = '下拉刷新'
						}
					});
					this.scroll.on('pullingDown', () => {
						This.searchCondition = {
							curpage: 1,
							pagesize: 100
						};
						This.topText = '下拉刷新';
						This.getRedInfo();
						this.scroll.finishPullDown();
						this.scroll.refresh();
						This.successTips();
					})
					this.scroll.on('pullingUp', () => {
						if(This.isHaveMore) {
							This.bottomText = '加载中...';
							This.bottomText = '查看更多';
							This.getMore();
						} else {
							if(This.pageList.length > 0) {
                This.bottomText='';
              }else{
                This.bottomText='暂无数据';
              }
						}
						this.scroll.finishPullUp();
						this.scroll.refresh();
					})
				})
			},
			getMore() {
				if(this.isHaveMore) {
					this.searchCondition.curpage = parseInt(this.searchCondition.curpage) + 1;
					this.getRedInfo();
				}
			},
			getRedInfo() {
				let records = this;
				this.$ajax('get', baseURL+'/account/voucher?pagesize=' + 
				this.searchCondition.pagesize+ '&' +'tempOrderID=' + this.$route.query.tempOrderID + 
				'&amount='+ this.$route.query.amount + '&' + 'curpage=' + 
				this.searchCondition.curpage + '&' + 'vtype=' + '0', '', function(data) {
					records.$nextTick(function() {
						records.pageList = data.vlist;
						for(var item of records.pageList){
							if(item.status==0){
								item.status = "已失效";
								
							}else if(item.status==1){
								
								item.status = "立即使用"
							}else{
								
								item.status = "已使用"
							}
						}
						if((data.totalpage * data.pagesize) - (data.curpage * data.pagesize) > 0) {
							records.isHaveMore = true;
							records.bottomText = '查看更多';
						} else {
							records.isHaveMore = false;
							if(records.pageList.length > 0) {
                records.bottomText='';
              }else{
                records.bottomText='暂无数据';
              }
						}
						this._initScroll();
					})
				})
			},
			goTo(id,status) {//id是红包id
				var that = this		
				if(status=="立即使用"){
					that.$ajax('get', baseURL+'/account/usevoucher?tempOrderID=' 
					+ that.$route.query.tempOrderID+'&id='+id+'&vtype=0'+'&amount='
					+this.$route.query.amount, '', function(data) {
						console.log('红包data:' + JSON.stringify(data))
						if(data.status=='200'){
							that.$router.push({
								path: '/programDetailRuning',
								query: {
									productId: that.$route.query.productId,
									//amount: that.$route.query.amount,
									tempOrderID: that.$route.query.tempOrderID
								}
						});
						}
					})
				}		
				
				
			},
			successTips () {
				let This=this;
				this.refreshSuccess=true;
				setTimeout(function () {
					This.refreshSuccess=false;
			}, 2000);
			}
		}
	}
</script>

<style scoped="scoped">
	.myRedPacket{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom:0;
	}
	.transactionSwipper{
		position: fixed;
		top:74px;
		left: 0;
		right: 0;
		bottom:0;
	}
	.navSelect {
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
		height: 40px;
		text-align: center;
		padding: 12px 0px;
	}
	.redPacket {
		position: relative;
		margin-bottom: 15px;
		left: 50%;
		transform: translateX(-50%);
		background: url('./img/redPacket.png') no-repeat center top;
		overflow: hidden;
	}
	.redPacket:first-child {
		margin-top: 15px;
	}
	
	.redPacket .line {
		position: absolute;
		width: 100%;
		top: 99px;
		left: 0px;
		border-top: 1px dashed #e8e8e8;
	}
	.redPacket .redLeft {
		text-align: center;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}
	
	.redPacket .redRight {
		text-align: left;
		height: 60px;
		display: inline-block;
		box-sizing: border-box;
	}
	
	.backColor {
		margin: 0px auto;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: #e54444;
	}
	.backColor1{
		margin: 0px auto;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: #b8b8b8;
	}
	.myRedPacket {
		min-height: 100vh;
		background-color: #f6f6f6;
	}
	
	.redP {
		color: #e54444;
		font-size: 20px;
		margin-bottom: 8px;
	}
	
	.minInvest {
		color: #b8b8b8;
	}
	.registerTitle{
		position: relative;
	}
	.registerRed {
		color: #353535;
	}
	.registerUsed {
		color: rgb(188, 188, 188)
	}
	.registerDesc {
		color: rgb(190, 190, 190)
	}
	.unit{
		color:#e54444;
		font-size: 1.125rem;
	}
	.unit1{
		color:#b8b8b8;
	}
	.num{
		font-size: 2rem;
		line-height:1.5rem;
		color: #e54444;
	}
		
	.num1{
		font-size: 2.125rem;
		color :#b8b8b8;
	}
</style>
<style scoped lang="stylus">
@import '../../common/stylus/mixin'
$ratio = 47
.transaction
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #F6F6F6
    .transactionTab
        height 54px
        line-height 54px
        background #ffffff
        display flex
        display -webkit-box
        display -webkit-flex
        position fixed
        width 100%
        z-index 1
        top 0
        text-align center
        .tabItems
            flex 1
            font-family: PingFangSC-Medium
            font-size 16px
            color #888888
            letter-spacing 1.23px
            position relative
        .tabItems:after
            content: ''
            position absolute
            bottom 3px
            background transparent
            border-radius 8px
            height 4px
            width 60%
            left 20%
        .tabActive
            color #FA7009
        .tabActive:after
            background-image linear-gradient(-180deg, #F56A3B 0%, #FD7F22 100%)
    .transactionSwipper
        position fixed
        top 108px
        bottom 0
        left 0
        right 0
        .contentItems
            height 60px
            padding 10px
            background #ffffff
            display flex
            display -webkit-box
            display -webkit-flex
            position relative
            .itemsLeft
                flex .5
                .itemsType
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #3D3D3D
                    letter-spacing 1.96px
                    margin-top 10px
                    margin-bottom 4px
                .itemsTime
                    font-family PingFangSC-Medium
                    font-size 12px
                    color #919191
                    letter-spacing 0.51px
            .itemsRight
                flex .5
                text-align right
                .itemsAll
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #ACACAC
                    letter-spacing 0.76px
                    margin-top 20px
                .success
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #FA7009
                    letter-spacing 0.76px
        .contentItems:after
            content ''
            position absolute
            width 100%
            height 1px
            background #F4F4F4
            bottom 0
            left 0
    .inverstmentQuery
        position fixed
        z-index 1
        top 54px
        height 44px
        line-height 44px
        width 100%
        text-align center
        background #ffffff
        border-top 1px solid #ddd
        font-size 0
        .queryItems
            display inline-block
            width 33%;
            font-family: PingFangSC-Medium
            font-size 14px
            color #888888
            letter-spacing 1px
            position relative
        .queryItems:after
            content ""
            position absolute
            top 15px
            right 0
            width 1px
            height 14px
            background #E9E9E9
        .queryItems:last-child:after
            display none
        .queryActive
            color #FA7009
    .recordsContentItems
        background #ffffff
        position relative
        padding 10px 10px 0
        margin-bottom 10px
        .itemsBody
            display flex
            display -webkit-box
            display -webkit-flex
            text-align center
            .items
                flex 1
                font-family PingFangSC-Medium
                font-size 12px
                color #BBBBBB
                letter-spacing 0.86px
                margin 10px 0
                position relative
                .itemsWord
                    font-family PingFangSC-Medium
                    font-size 18px
                    color #888888
                    letter-spacing 1.38px
                .icon-more
                    position absolute
                    right 0
                    top 10px
                    font-size 20px
                .imgbg
                    position absolute
                    width 60px
                    height 60px
                    bg-image(out)
                    background-repeat no-repeat
                    background-size contain
                    top -20px
                    right -10px
        .itemsFooter
            height 40px
            line-height 40px
            border-top 1px dashed #ddd
            font-family PingFangSC-Regular
            font-size 12px
            color #333333
            letter-spacing 0.92px
            .right
                float right
            .iconImg
                display inline-block
                width 20px
                height 20px
                bg-image(iconImg)
                background-repeat no-repeat
                background-size contain
                margin-right 6px
                margin-left 4px
                vertical-align middle
.redPacket
	background-size 100% auto
	margin-bottom 0.75rem
	//height 8.79rem
	//height 9.0625rem
	.minInvest
		display inline-block
		font-size 0.63rem
		line-height 1.5rem
	.part-num
		font-size (65rem/$ratio)
		margin-top 0.98rem
		padding-top (10rem/$ratio)
		padding-left 0.5rem
		padding-right 0.81rem
		width 34.7%
		float left
	.redRight
		padding-top 0
		float right
		width 64.5%
		height 5.531914893617022rem
		padding-left 0.815rem
		padding-right 0.5rem
	.registerTitle
		margin 0.375rem 0
		img 
			position absolute
			top 0.125rem
			right 0.9375rem
			width  1.25rem
			height 1.25rem
			display none
		img.isBinding
			display block
	.registerRed
		display inline-block
		font-size 1rem
		line-height 1.5rem
	.registerUsed
		display inline-block
		font-size 0.75rem
		line-height 1.5rem
	.registerDesc
		display inline-block
		font-size 0.69rem
		line-height 1.5rem
	.validTimeTip
		font-size (40rem/$ratio)
	.backColor
		height 0.5rem
		width 22.4375rem
	.card-bottom
		padding:0 
		border-top 1px dashed #e8e8e8
		//height 2.71875rem
		height 2.875rem
		margin 0 0.875rem
	.button
		color #e54646
		border-radius 0.3rem
		text-align: center
		border 1px solid #e54646
		width 5.13rem
		height 1.56rem
		line-height 1.56rem
		top 0.579375rem
		right 0.5625rem
		position relative
		float right
	.button1
		color #c8c8c8
		border 1px solid #b7b7b7
	.useRule
		position relative
		top (10rem/$ratio)
	.card-body
		zoom 1
		//height (260rem/$ratio)
	.card-body::after
		clear both
		display block
		content ''
	
.bottom-tip
  background #f6f6f6
    
</style>
