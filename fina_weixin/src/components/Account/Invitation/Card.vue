<template>
	<div class="bacnkCard">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'我的名片'"></MyHeader></div>
    <div class="container" style="border-top:1px solid #f5f5f5;">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
					<div class="code-box">
						<div class="code-title">我的名片</div>
						<div class="img-box" style="padding:15px;">
							<img src="./img/loading.gif" v-if="flag">
							<vue-qr :text="text" :logoScale="0.2" :size="400" :dotScale="1"  :callback="callBack"></vue-qr>
						</div>
					</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import {baseURL} from '@/vuex/url';
import vueQr from 'vue-qr'
import BScroll from 'better-scroll'
export default {
  name: 'bacnkCard',
  data () {
    return {
      height: 0,
			list:'',
			flag:true,
			imgBase64:"",
			text:''
    }
  },
  created () {
		this.$ajax('get',	baseURL+'/account/getmyid',	'',(res)=>{
			this.text=location.origin+location.pathname+'/#/sharereg?name='+res.name+'&couid='+res.uid
		})
	},
	components:{
		vueQr
	},
  methods: {
		callBack(dataURL){
			this.imgBase64=dataURL
			this.flag=false;
		},		
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
      new BScroll(this.$refs.wrapper, {click: true})
    })
    // this.$ajax('post',baseURL +'/account/bankcard','',(data)=>{
    //   console.log(data)
    //   this.list=data.list
    // })
  }
}
</script>

<style scoped lang="stylus">
.bacnkCard
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #fff;
  text-align: center;
  background-size 100% auto
  background-image url('./img/bg@2x.png')
  background-position 0 100%
  background-repeat no-repeat
  overflow scroll	
	.code-box
		background-color:#fff
		margin:0 25px
		// height:calc(100vw - 50px)
		.code-title
			text-align center
			font-size 18px
			line-height 50px
			padding-top 50px
		.img-box
			margin:0 auto
			border:1pt solid #999
			border-radius:5px
			// padding 30px
			overflow hidden
			.box
				overflow hidden
			img
				width 100%          
</style>