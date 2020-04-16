<template>
	<div class="myRedPacket">
		<div class="MyHeader" v-if="!isWeixin" style="position:relative;z-index:5;"><MyHeader :title="'加息券'" :bgColor="'#ffffff'" textColor="#000"></MyHeader></div>
		<div class="transactionSwipper" ref="transactionSwipper" :style="{top:(isWeixin?'10px':'74px')}">
			<div class="content" ref="content">
				<div class="top-tip">
					<span class="refresh-hook">{{topText}}</span>
				</div>
				<div class="redPacket" v-for="(list,index) in pageList" :key="index" v-if="list.status!='已使用'">
					<div class="backColor" :class="{backColor:list.color=='蓝色',backColor1:list.color=='金色',backColor2:list.color=='红色',backColor3:list.color=='橙色',backColor4:list.status=='已失效'||list.status=='已使用'||list.canuse==0}"></div>
					<div class="card-body">
						<span class="part-num" :class="{redLeft:list.color=='蓝色',redLeft1:list.color=='金色',redLeft2:list.color=='红色',redLeft3:list.color=='橙色',redLeft4:list.status=='已失效'||list.status=='已使用'||list.canuse==0}">
							{{list.riserate | moneyToFixed(0)}}<i class="percent">{{parseFloat(list.riserate).toFixed(2).slice(-3,list.riserate.lentgth)}}%</i>
						</span>
						<span class="redRight">
							<span class="registerRed">
								{{list.color}}年化加息券
							</span>
							<span class="validTimeTip" style="color: #bebebe;" v-if="list.endDate">
								<!-- {{list.leftExpireDays}}天后过期 -->
								{{list.startDate}}至{{list.endDate}}
							</span>
							<span class="validTimeTip" style="color: #bebebe;" v-else>
								永久有效
							</span>
							<img src="../../assets/images/binding@3x.png" @click="cancelBinding($event)" :class="{isBinding:list.mark=='1'}"/>
						</span>
					</div>
					<div class="clearfix card-bottom">
						<div class="useRule" @click="_toUseRules(list.color)">
							<img style="vertical-align: middle;width: 18px;"  src="./img/question_mark.png"/>
							<span style="vertical-align: middle;">
								使用规则
							</span>
						</div>
						<div class="button" :class="{button:list.color=='蓝色',button1:list.color=='金色',button2:list.color=='红色',button2:list.color=='橙色',button4:list.status=='已失效'||list.status=='已使用' ||list.canuse=='0'}" @click.stop="goTo(list.id,list.status)">
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
	import BScroll from 'better-scroll'
	import {baseURL} from '@/vuex/url'
	import fontSizeFit from "@/utils/font-size-fit.js";
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
				fontSizeFit();
				$(window).on('resize',fontSizeFit)
		},
		destroyed () {
			$(window).off('resize',fontSizeFit)
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
				+ that.$route.query.tempOrderID+'&id='+id+'&vtype=1'+'&amount='
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
				this.searchCondition.pagesize +
				 '&' +'tempOrderID=' + this.$route.query.tempOrderID +
				'&amount='+ this.$route.query.amount+
				'&' + 'curpage=' +
				this.searchCondition.curpage + '&' + 'vtype=' + '1', '', function(data) {
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
			goTo(id,status) {
				var that = this;
				if(status=="立即使用"){
					that.$ajax('get', baseURL+'/account/usevoucher?tempOrderID='
					+ that.$route.query.tempOrderID+'&id='+id+'&vtype=1'+'&amount='
					+this.$route.query.amount, '', function(data) {
						if(data.status=="200"){
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
			},
			 _toUseRules(color) {
      			this.$router.push({name: 'CouponRules',params: {color: color}});
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
	.redPacket .redLeft {
		padding-left: 25px;
		text-align: center;
		height: 60px;
		color: #1b6bce;
		padding-right: 10px;
		margin-bottom: 10px;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}
	.redPacket .redLeft1 {
		padding-left: 25px;
		text-align: center;
		height: 60px;
		color: #d6b918;
		padding-right: 10px;
		margin-bottom: 10px;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}
	.redPacket .redLeft2 {
		padding-left: 25px;
		text-align: center;
		height: 60px;
		color: #ff0000;
		padding-right: 10px;
		margin-bottom: 10px;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}
	.redPacket .redLeft3 {
		padding-left: 25px;
		text-align: center;
		height: 60px;
		color:#fa7009;
		padding-right: 10px;
		margin-bottom: 10px;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}
	.redPacket .redLeft4 {
		padding-left: 25px;
		text-align: center;
		height: 60px;
		color: #b8b8b8;
		padding-right: 10px;
		margin-bottom: 10px;
		border-right: 1px dashed #E8E8E8;
		display: inline-block;
		box-sizing: border-box;
		width: 35%;
	}


	.redPacket .redRight {
		text-align: left;
		height: 60px;
		padding-left: 10px;
		display: inline-block;
		box-sizing: border-box;
		width: 64%;
		float:right;
	}

	.backColor {
		margin: 0px auto;
		width: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: #1b6bce;
	}
	.backColor1 {
		background-color: #d6b918;
	}
	.backColor2 {
		background-color: #ff0000;
	}
	.backColor3 {
		background-color: #fa7009;
	}
	.backColor4 {
		background-color: #b8b8b8;
	}


	.myRedPacket {
		min-height: 100vh;
		background-color: #f6f6f6;
	}

	.redP {
		color: #e54444;
		font-size: 20px;
	}

	.minInvest {
		color: #b8b8b8;
		font-size: 10px;
	}

	.registerRed {
		font-size: 16px;
		color: #353535;
	}
	.useRule{
		color: #969696;
		font-size: 13px;
		float: left;
	}
	.button {
		float:right;
		font-size: 12px;
		line-height: 30px;
		color: #1b6bce;
		border-radius: 5px;
		text-align: center;
		border: 1px solid #1b6bce;
		position: absolute;
		bottom: 5px;
		right: -5px;
	}
	.button1 {
		color: #d6b918;
		border-radius: 5px;
		text-align: center;
		border: 1px solid #d6b918;
	}
	.button2 {
		color: #ff0000;
		border-radius: 5px;
		text-align: center;
		border: 1px solid #ff0000;
	}
	.button3 {
		color: #fa7009;
		border-radius: 5px;
		text-align: center;
		border: 1px solid #fa7009;
	}
	.button4 {
		color: #b8b8b8;
		border-radius: 5px;
		text-align: center;
		border: 1px solid #b8b8b8;
  }
  .bottom-tip{
    background: #f6f6f6;
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
.card-body
	zoom 1
	height (260rem/$ratio)
.card-body::after
	clear both
	display block
	content ''
.redPacket
	background-size 100% auto
	.part-num
		font-size (98rem/$ratio)
		margin-top (80rem/$ratio)
		padding-top (30rem/$ratio)
		.percent
			font-size (63rem/$ratio)
			/*margin-left (12rem/$ratio)*/
	.redRight
		padding-top (60rem/$ratio)
		position relative
		img
			position absolute
			top (60rem/$ratio)
			right (70rem/$ratio)
			width  (57rem/$ratio)
			height (57rem/$ratio)
			display none
		img.isBinding
			display block

	.registerRed
		display block
		font-size (45rem/$ratio)
		margin-bottom (25rem/$ratio)
	.validTimeTip
		font-size (40rem/$ratio)
	.backColor
		height (23rem/$ratio)
		width (1032.5rem/$ratio)
	.card-bottom
		padding:0 (70rem/$ratio)
		border-top 1px dashed #e8e8e8
		height (117rem/$ratio)
	.button
		width (235rem/$ratio)
		height (72rem/$ratio)
		line-height (70rem/$ratio)
		top (20rem/$ratio)
		position relative
		float right
	.useRule
		position relative
		top (30rem/$ratio)
</style>
