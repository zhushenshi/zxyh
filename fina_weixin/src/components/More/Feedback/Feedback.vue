<template>
	<div class="feedback">
		<div v-if="!isWeixin">
			<MyHeader :title="'意见反馈'"></MyHeader>			
		</div>
		<nav>
			<textarea name="" id="" cols="30" rows="10" maxlength="300" v-model="content"  placeholder="反馈您的问题或意见，帮助我们更好的改进产品～"></textarea>	
		</nav>
		<div class="Fe_Pro">还可输入{{num}}字</div>
		<footer class="Fe_foot">
			<button :class="disableBtn" class="Fe_foot_btn" @click="addFeedBack">提交</button>
		</footer>
	</div>
</template>

<script>
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
export default {
	name: 'Feedback',
	data() {
		return {
			content: '',
			disableBtn: 'true',
			num: 300
		}
	},
  watch: {
    content: function(nval, oval) {
			this.num=300-this.content.length;
      if(nval.length > 0) {
        return this.disableBtn = 'false';
      }else {
        return this.disableBtn = 'true';
      }
    }
  },
	methods: {
		addFeedBack () {
      if(this.disableBtn === 'true') {
        return;
      }
			let wordReg=/^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,300})$/;
			let This=this;
			if(!this.content){
				this.$Toast({message: '反馈为空不能提交哦!',position: 'bottom'});
				return;
      }
      // else if(!wordReg.test(this.content)){
			// 	this.$Toast({message: '反馈内容格式为中英文数字哦!',position: 'bottom'});
			// 	return;
			// }
			this.$ajax('post',baseURL + '/account/feedback?content='+this.content+"&feedTerminal="+(this.isWeixin?'3':'2'),'',function(data){
        This.$Toast({message: '反馈提交成功!',duration: 1000});
        setTimeout(() => {
          	This.$router.go(-1);
        }, 1000);
			})
		},
    inputChange () {
      if(this.content.length > 0){
        this.disableBtn = 'false';
      }else{
        this.disableBtn = 'true';
      }
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"  rel="stylesheet/stylus">
.feedback{
  position:fixed;
  top:0
  left:0;
  right:0;
  bottom:0;
}
nav {
	width: 89.3%;
	height: 219px;
	margin:  10px auto;
}

textarea {
	height: 100%;
	width: 100%;
	background: #F5F5F5;
	font-family: PingFangSC-Medium;
	font-size: 12px;
	color: #333;
	letter-spacing: 1.33px;
	padding-left: 3.7%;
	padding-top: 1.6%;
	box-sizing: border-box;
    border: 1px solid #DDDDDD;
    border-radius: 8px;
    outline:none;
}

.Fe_Pro {
	width: 89.3%;
	text-align: right;
	margin: auto;
	margin-top: 5px;
	font-family: PingFangSC-Medium;
	font-size: 12px;
	color: #888888;
	letter-spacing: 1.33px;
}
.Fe_foot{
	text-align:center
}
.Fe_foot_btn {
	width: 88.5%;
	height: 44px;
	text-align: center;
	line-height: 44px;
	background: #FFC99D;
	border-radius: 5px;
	margin: auto;
	margin-top: 37pt;
	font-family: PingFangSC-Medium;
	font-size: 18px;
	color: #FFFFFF;
	letter-spacing: 3.27px;
}
.Fe_foot_btn.true{
  background:#FFC99D;
}
.Fe_foot_btn.false{
  background: #FA7009;
}
</style>
