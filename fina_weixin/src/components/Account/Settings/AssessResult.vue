<template>
  <div class="main">
    <MyHeader :title="'风险评估结果'" v-if="!isWeixin"></MyHeader>
    <div class="borderTop"></div>
    <div class="resultTitle">
      <p>尊敬的客户:</p>
      <p>根据您填写的风险能力评估，本公司对您的风险承受能力进行了评估，评估结果如下:</p>
    </div>
    <div class="box">
      <div class="assessResult">
        <div><span class="score">{{score}}</span>分</div>
        <div>稳健型</div>
        <div>房贷</div>
      </div>
      <p class="recommand">您的投资测试为稳健型，推荐房贷项目</p>
      <div class="buttonBox">
        <button @click="goIntoPage('/home/accountTab/settings/assess')">重新测评</button>
        <button @click="goIntoPage('/home/product')">立即投资</button>
      </div>
    </div>
  </div>
</template>

<script>
import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
  export default {
    name: 'AssessResult',
    created () {
      let assessResult=this;
      this.$ajax('get',baseURL + '/account/riskassessresults/','', function (data) {
        assessResult.score=data.score;
      })
    },
    mounted:function(){

    },
    data() {
      return {
        score:''
      }
    },
    methods:{
      goIntoPage (url) {
        this.$router.push(url)
      }
    }
  }
</script>
<style>
  .main{font-size:14px;color: #2C2C2C;letter-spacing: 1.52px;font-weight:500;line-height:20px;}
  .resultTitle{width:92%;margin:20px auto 40px;}
  .box{width:88%;margin:0 auto;}
  .box .assessResult{display:flex;justify-content:space-between;text-align:center;}
  .box .recommand{text-align:center;margin:18px 0 40px 0;}
  .box .buttonBox{text-align:center;margin:18px 0 40px 0;display:flex;justify-content:space-between;text-align:center;font-size: 16px;letter-spacing: 1.66px;}
  .box .buttonBox :first-child{border:1px solid #FA7009;width:40%;height:44px;border-radius:5px;background-color: #fff;color: #FA7009;}
  .box .buttonBox :last-child{width:40%;height:44px;border-radius:5px;background-color: #FA7009;color: #fff;}
  .box .assessResult div{background-image:linear-gradient(to bottom,#FF9C20,#FF9965);border-radius:10px;width:98px;height:98px;line-height:98px;font-size: 24px;color: #ffffff;letter-spacing: 0.75px;}
  .box .assessResult div .score{font-size:30px;}
</style>
