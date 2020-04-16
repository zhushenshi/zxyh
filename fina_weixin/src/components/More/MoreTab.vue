<template>
	<div :class="{moreView:true,accountActive:zIndex}">
		<div class="swipper" ref="swipper">
			<div class="content">
				<header class="More_head">
					<img src="../../assets/images/banner@2x.png" />
				</header>
				<nav class="More_nav" style="">
					<ul class="More_nav_ul" @click="goInto('/home/more/feedback')">
						<p class="More_nav_p">
							<img src="../../assets/images/pic_y(21).png" />
						</p>
						<li class="More_nav_li">
							<p class="fl">意见反馈</p>
							<p class="fr">
								<!-- <img src="../../assets/images/right.png" /> -->
                <span class="icon-more"></span>    
							</p>
						</li>
					</ul>
					<ul class="More_nav_ul" @click="goInto('/home/more/helpCenter')">
						<p class="More_nav_p">
							<img src="../../assets/images/pic_y(6).png" />
						</p>
						<li class="More_nav_li">
							<p class="fl">帮助中心</p>
							<p class="fr">
								<!-- <img src="../../assets/images/right.png" /> -->
                <span class="icon-more"></span>    
							</p>
						</li>
					</ul>
					<ul class="More_nav_ul" @click="goInto('/home/more/aboutUs')">
						<p class="More_nav_p">
							<img src="../../assets/images/pic_y(9).png" />
						</p>
						<li class="More_nav_li" style="border:none">
							<p class="fl">关于19理财</p>
							<p class="fr">
								<!-- <img src="../../assets/images/right.png" /> -->
                <span class="icon-more"></span>    
							</p>
						</li>
					</ul>
				</nav>
				<div class="More_work">客服时间：08:30 - 17:30</div>
		    </div>
			<div class="More_Version">当前版本V1.0.0</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import '../../assets/css/More.css'
export default {
	data () {
		return {
			zIndex: false
		}
  },
  created () {
    this.$parent.$data.selected='/home/more'
  },
	methods: {
		goInto (path) {
			this.$router.push(path);
		}
	},
	watch: {
    '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if(toDepth==3||fromDepth==3){
          this.zIndex = toDepth < fromDepth ? false:true;
        }
      }
  }
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.accountActive
    z-index 2
.moreView
  position fixed
  top 0
  left 0
  right 0
  bottom 54px
  background #F9F9F9
.swipper
  height 100%
	.More_nav
		background #fff
		margin-top 10px
		.More_nav_p
			img
				width 20px
.icon-more
  vertical-align middle
  font-size 18px
  color #8c8c8c               
</style>