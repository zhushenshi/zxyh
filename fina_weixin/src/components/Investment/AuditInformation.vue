<template>
	<div class="audit">
		<ul>
			<li class="imgList" v-for="item in list"><img  :src="item.imgurl"/></li>
		</ul>
		
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
	.imgList{
		width: 89%;
		margin: 10px auto;
	}
	img{
		display: inline-block;
		width: 100%;
	}	
	.audit{
		min-height:426px;
	}
</style>
<style type="text/css">
	 
</style>