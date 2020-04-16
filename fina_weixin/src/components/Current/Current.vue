<template>
	<div :class="{homeView:true,accountActive:zIndex}">
		<div style="height:24px;background:#F37723"  v-if="!isWeixin"></div>
	    <div class="headTop" v-if="!isWeixin">
         首页
		 <!-- <span class="icon icon-setting"  @click="showMenu = !showMenu">
			 <transition name="fade">
				<ul class="menu" v-show="showMenu">
					<div class="arrow"></div>
					<li class="menu-item" v-if="isLogin">
						<img src="./../../assets/menu1.png" alt="">
						<span>账号头像</span>
					</li>
					<li class="menu-item" v-if="!isLogin">
						<img src="./../../assets/menu1.png" alt="">
						<span>
						    <a @click="goIntoPage('/login')">登录</a>
							<a>/</a>
							<a @click="goIntoPage('/register')">注册</a>
						</span>
					</li>
					<li class="menu-item" v-if="isLogin" @click="goIntoPage('/home/accountTab/message')">
						<img src="./../../assets/menu3.png" alt="">
						<span>消息通知</span>
					</li>
					<li class="menu-item">
						<img src="./../../assets/menu2.png" alt="">
						<span>兑付公告</span>
					</li>
					<li class="menu-item" @click="goIntoPage('/home/more/helpCenter')">
						<img src="./../../assets/menu1.png" alt="">
						<span>使用帮助</span>
					</li>
				</ul>
			</transition>
		 </span> -->
		</div>
		<div class="homewrapper"  ref="wrapper" @click="showMenus()" :style="{height}">
			<div class="homecontent" ref="content">
				<div class="homeBg">
					<div class="swiper">
					<mt-swipe :auto="4000">
						<mt-swipe-item v-for="(img,index) in swipe" :key="index" @click.native="gotoActivity(img.url,img.title)"><img :src="img.imgurl"></mt-swipe-item>
					</mt-swipe>
					</div>
				</div>
				<div class="notice">
					  <img src="./../../assets/notice.png"/>
					  <ul :class="{marquee_top:animate}">
						  <li v-for="(value,index) in noticeList" :key="index" @click=notice(value.content)>
							  {{value.content}}
						  </li>
					  </ul>
			    </div>
				<div class="itemProduct">
					<div class="leftLine"></div>
					<span>优享生活</span>
				</div>
				<div class="life">
                    <div><img src="./../../assets/life.png"/></div>
					<div class="introduce">
						<p>优享生活</p>
						<p>生活缴费</p>
					</div>
					<div class="toPay" @click="toPay">去缴费</div>
				</div>
				<div class="itemProduct">
					<div class="leftLine"></div>
					<span>今日推荐</span>
				</div>
				<footer class="Homefoot">					
					<div class="item" v-for="(item,index) in products" :key="index">
					  <div class="itemTop">
						   <p class="name">{{item.crmName}}</p>
					       <p class="status"><span>{{getStatus(item.status)}}</span></p>
						   <p class="amount">可投金额：{{item.remainingAmount | moneyToFixed(2)}}</p>
					  </div>
					  <div class="Investment">
						  <div>
							  <p class="investmentNum"><span class="expe">{{item.realyRate}}</span></p>
							  <p class="InvestmentTitle">预期年化</p>
						  </div>
						  <div>
							<p><span class="expe">{{item.periods}}</span>{{item.periodsUnit}}</p>
                            <p class="InvestmentTitle">项目期限</p>
						  </div>
                          <div>
							  <p><span class="expe">{{item.participants}}</span></p>
							  <p class="InvestmentTitle">投标人次</p>
						  </div>
					  </div>
					  <div class="InvestmentBtn" @click="toInvestment(item.productid,item.is_current)">立即投资</div>
					</div>
				</footer>	
				<div class="goals-wrapper">
					<h3>19理财</h3>
					<p>专业<span class="dot"></span>诚信<span class="dot"></span>透明</p>
				</div>
			</div>
		</div>
		<transition name="move"><router-view class="pageView"></router-view></transition>
	</div>
</template>

<script>
import '../../assets/css/home.css'
import BScroll from 'better-scroll'
import fontSizeFit from "@/utils/font-size-fit.js";
import {baseURL,baseURLVerifyImg} from '@/vuex/url'
import { MessageBox } from 'mint-ui';
export default {
  name: 'Current',
  data () {
    return {
		animate: false,
		showMenu:false,
		zIndex: false,
		url: '',
		swipe: [
				{
						imgurl:'https://miaofuxianjindai-001.oss-cn-beijing.aliyuncs.com/zwp2p/fintecher_file/d4becd76-68e6-49ff-ae1e-cfb57c6256a32.jpg',
						url: ''
				}
				],
		products:[],
		noticeList:[],
		tempOrderID:'',
		tempOrderFlag:'',
		isLogin:""
		}
  },		
  methods: {
	 toPay(){
		  this.$Toast({message:'尚未开通此功能，敬请期待！'})
	 },
	 goIntoPage (url) {
        this.$router.push(url)
	  },
	 async toInvestment(productid,is_current){
		this.$store.commit("productId", productid);
		this.$store.commit("is_current", is_current);
		if(sessionStorage.getItem('$token')){
			await this.createTempOrder();
			setTimeout(()=>{
				if(this.tempOrderFlag){
					this.$router.push({
						path: '/programDetailRuning',
						query: {
							productId: productid,
							tempOrderID: this.tempOrderID,
							is_current:is_current
						}
					  })
					}
				},10)
				}
				else{
					this.$router.push({
						path: '/programDetailRuning',
						query: {
							productId: productid,
							tempOrderID: this.tempOrderID,
							is_current:is_current
						}
					})
				}
	  },
     async createTempOrder(){
    	var that = this;
    	await this.$ajax('get', baseURL+'/account/temporder?productid='+that.$store.state.productId, '', function(data) {
            that.tempOrderFlag = data.status == '200' ? true : false
            if(data.status == '200'){
                that.tempOrderID = data.tempOrderID;
                that.$store.commit("tempOrderID", that.tempOrderID);
            }else{
                that.$Toast({message:data.msg});
            }
		})
    },
	 getStatus (type) {
        switch(type)
            {
            case 0:
            return this.status='出售中'//募集中
            break;
            case 1:
            return this.status='回款中'
            break;
            case 2:
            return this.status='流标'
            break;
            case 3:
            return this.status='已满标'
            break;
            case 4:
            return this.status='已结清'//交易成功
            break;
            case 5:
            return this.status='订单异常'
            break;
            case 6:
            return this.status='死亡'
            break;
            case 7:
            return this.status='已满标'//满标放款中
            break;
            case 8:
            return this.status='合规检查'
            break;
            case 9:
            return this.status='合规检查不通过'
            break;
            case 10:
            return this.status='放款成功'
            break;
            case 11:
            return this.status='提前还款'
            break;
            case 12:
            return this.status='上架复审'
            break;
            }
	},
	//通知
	getNotice(){
        this.$ajax('get',baseURL + '/account/notice','', (data) => {
			console.log(data)
			this.noticeList=data.list
        })
	},
    gotoActivity (link,title) {
		// this.url=link;
		// window.location='https://www.19licai.com/zwp2p/'+this.url;
		// jumpWebView(String url, String title)
      var ua = navigator.userAgent.toLowerCase();//获取手势密码设置状态
      if (/iphone|ipad|ipod/.test(ua)) {
        if(window.webkit&&window.webkit.messageHandlers.jumpWebView){
          window.webkit.messageHandlers.jumpWebView.postMessage([link,title]);
        }else{}
      }else if(/android/.test(ua)){
        if(object&&typeof(object.jumpWebView)=="function"){
          object.jumpWebView(link,title)////all,photo,album
        }
      }  		
	},
	showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.noticeList.push(this.noticeList[0]);
        this.noticeList.shift();
        this.animate = false;
      }, 1000);
	},
	showMenus () { 
		this.showMenu=false
	},
	notice(content){
			clearInterval(this.showMarquee)
		MessageBox({
				title: '公告',
				message: content,
				showCancelButton: false
				});
		}
	},
	created () {
		setInterval(this.showMarquee, 2000);
		this.getNotice()
		let current=this;
		this.$ajax('get',baseURL + '/index/carousel','', function (data) {
			current.swipe=data.list;
        })
		this.$ajax('post',baseURL + '/todayRecommend','', (data) => {
			console.log(data)
			this.products=data.list
       })
	},
  mounted () {
	  this.isLogin=sessionStorage.getItem('$token')
		fontSizeFit();
		$(window).on('resize',fontSizeFit)				
			this.$nextTick(() => {
				if(this.$refs.content.offsetHeight<this.$refs.wrapper.offsetHeight){
					this.$refs.content.style.minHeight=this.$refs.wrapper.offsetHeight+1+'px'
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					click: true,
					bounce: false     
				})
			}) },
  destroyed () {
		$(window).off('resize',fontSizeFit)
	}
}
</script>
<style type="text/css">
	
</style>
<style lang="stylus" scoped>

.accountActive
    z-index 2
.homeView  
  background #fff
  text-align center
  position fixed 
  top 0
  left 0
  right 0
  bottom 58px
  .homewrapper
    /*height 10rem*/
   	height 100%
   	overflow hidden
  	.swiper
      height 10rem
	  .mint-swipe-item
      	img
          width 100%
          height 10rem
.goals-wrapper
      text-align center 
      color #cccccc
      h3
        font-size 16px
        letter-spacing 1.23px
      p  
        margin 5px 0
        font-size 11px
        .dot
          display inline-block
          margin 0 5px
          vertical-align middle
          width 2px
          height 2px
          border-radius 50%
          background #ccc
.headTop{
  background #F37723
  color #ffffff
  height 40px
  line-height 40px
  font-size: 18px;
  position relative;
  font-family PingFang SC
  .icon{
	  position:absolute;
	  top:13px;
	  right:15px;
  }
}
.homeBg{
	padding 10px 15px 0;
	background url("./../../assets/homeBg.png")  no-repeat;
	background-size: cover;
	.mint-swipe{
      border-radius 8px
	}
}
.menu {
  position: absolute;
  top: 22px;
  right: -6px;
  z-index: 100;
  width: 156px;
  background: #ffffff;
  color #A8A8A8
  border-radius: 10px;
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.2);
  .menu-item {
    cursor pointer
    text-align left
    align-items: center;
    font-size: 15px;
    padding: 10px 5px 0;
	 &:active {
      background-color: #ffffff;
    }
	img{
		top: -2px;
        position: relative
		margin-left 10px
	}
	a{
		 color #A8A8A8
	}
	span{
          width: 69%;
		  padding-bottom 13px;
          display: inline-block;
 		  border-bottom: 1px solid #E6E6E6;
	}
  }
}
.menu li:last-child{
    border-bottom:none !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
 
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.notice{
	height:40px;
	line-height 40px;
	background #ffffff;
	margin 16px 15px
	border-radius 4px
	text-align left
	font-size 13px
	overflow: hidden;
	ul{
		float left
		position relative
		top 3px
		width 80%
		li {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			padding-left: 20px;
			white-space nowrap
			text-overflow ellipsis
			overflow hidden
			}		
	}
	img{
		position: relative;
        top: 8px;
		float left
		margin-left 12px
		vertical-align middle
		width 18px
		height 18px
	}
}
.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}
.itemProduct{
	margin 10px 15px;
	text-align left
	.leftLine{
		display inline-block
		width 3px
		height 16px
		background #F37723
	}
	span{
		font-size 17px
		margin-left 12px
		color #333333
	}
}
.life{
   padding 15px
   margin 10px 15px 15px;
   background #ffffff
   overflow hidden
   text-align left 
   div{
     float left
   }
   .toPay{
	   float right
	   background #F37723
	   border-radius 15px
	   color #ffffff
	   padding: 5px 18px;
	   position: relative;
	   top: 7px
   }
   .introduce{
	   position relative
	   top 5px
	   margin-left 10px
	   p:first-child{
		   font-size 16px
		   color #333333
	   }
	   p:last-child{
		   font-size 13px
		   color #A8A8A8
		   margin-top 5px
	   }
   }
}
.Homefoot{
	margin  0 15px
	text-align left
	.item{
		background: #ffffff !important
		padding 15px
		margin-bottom 15px
	}
	.itemTop{
	   overflow hidden
	   border-bottom 1px solid #E6E6E6 
	   font-size 15px
	   padding-bottom 10px
	   p{
           float left
		   color #333333
	   }
	   .name{
		overflow: hidden;
		text-overflow: ellipsis;
		width 35%
		white-space nowrap
		font-size 12px
		font-weight bold
		}
	   .status{
		   color #ffffff
		   border-radius 10px
		   background #F37723
		   margin-left 13px
		   padding 2px 7px
		   font-size 12px
	   }
	   .amount{
		   font-size 12px
		   float right
		   color #333333
		   font-family:PingFang SC
		   font-weight:400;
		   font-size 12px
	   }
	}
	.Investment{
		display flex
		margin 15px 0
		div{
			flex 1
			text-align center
			.expe{
				font-size 20px
			}
			.investmentNum{
			   color #F37723
			}
			.InvestmentTitle{
				color #A8A8A8
				font-size 10px
				margin-top 10px
			}
		}
	}
	.InvestmentBtn{
			border 1px solid #F37723
			color #F37723
			padding 10px
			text-align center
			font-size 16px
			border-radius 4px
		}
}
/* 三角在右边 */ 
.arrow{
		width: 0;
		height: 0;
		border-width: 0 5px 5px;
		border-style: solid;
		border-color: transparent transparent #ffffff;					/*透明         透明       黄*/
	    position: absolute;
		right: 10px;
		top: -4px;
}

</style>
<style>
body{
	width :100%;
	height :100%;
	overflow: hidden;
	position: absolute;
}
.app-root{
	height :100%;
   	overflow: hidden;
}
	
.home{
	height :100%;
   	overflow: hidden;
}
.homeView{
	height :100%;
   	overflow: hidden;
}
	
.homewrapper{
	height: 100%;
   	overflow: hidden;
	background: #F7F7F7;
}
.stated{
    background: #bbbbbb;
}
.mint-msgbox-message {
    text-indent: 30px !important;
    text-align: left !important;
}
</style>