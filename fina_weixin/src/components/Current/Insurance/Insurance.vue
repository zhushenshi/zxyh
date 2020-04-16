<template>
  <div class="main">
      <div class="scrollWrapper" ref="scrollWrapper">
        <div class="content">
          <img src="../../../assets/images/insurance/banner.png" alt="">
          <div class="insuranceText">
            <p>全方位严格审查，多维度筛选优质项目</p>
            <span class="insuranceLine"></span>
          </div>
          <img class="insuranceImg" src="../../../assets/images/insurance/procedure.png" alt="">
          <div class="insuranceText backColor">
            <p>3重项目保障，全程为您保驾护航</p>
            <span class="insuranceLine"></span>
            <div style="margin:15px 0;">
              <img src="../../../assets/images/insurance/safe.png" alt="" >
            </div>
          </div>
          <div class="insuranceText">
            <p>全方位保护账号安全</p>
            <span class="insuranceLine"></span>
          </div>
          <div class="information">
            <div class="informationImg"><img src="../../../assets/images/insurance/001.png" alt=""></div>
            <div class="informationText">
              <p class="title">注册开户双重验证</p>
              <p class="text"><span class="textBlack">注册:</span><span>手机动态验证码和图形验证;</span></p>
              <p><span>开户:</span><span>真实姓名和身份证号验证才能通过，同时还必须填写手机号才能开户。</span></p>
            </div>
          </div>
          <div class="information">
            <div class="informationImg"><img src="../../../assets/images/insurance/002.png" alt=""></div>
            <div class="informationText">
              <p class="title">全方位技术保障</p>
              <p class="text">我们<span class="textBlack">采用先进的系统加密及保护技术，并由专人24小时严密监控</span>，保障用户账户信息安全。</p>
            </div>
          </div>
          <div class="information">
            <div class="informationImg"><img src="../../../assets/images/insurance/003.png" alt=""></div>
            <div class="informationText">
              <p class="title">快捷支付必须同卡进出</p>
              <p class="text">您在<span class="textBlack">19理财</span>开通银行卡快捷支付，<span class="textBlack">充值和提现必须是同一张银行卡</span>，即使账户丢失、手机挂失，您的钱谁都拿不走。</p>
            </div>
          </div>
        </div> 
      </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: 'Insurance',
    mounted () {
      // this.$nextTick(() => {
      //   new BScroll(this.$refs.scrollWrapper, {click: true})
      // })
    },
    data() {
      return {

      }
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{background:#EEEEEE;}
.main{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom:0;
  background: #FFFFFF;
  text-align: center;
}
.scrollWrapper{height: 100%;overflow: auto}
.backColor{background:#eeeeee;}
.content img{width:100%;}
.insuranceText{padding:30px 0 15px 0;color:#2C47C0;font-size:15px;font-weight:500;}
.insuranceText .insuranceLine{border:1px solid #2C47C0;display:block;width:30px;margin:10px auto}
.content .insuranceImg{width:90%;margin-left:-10px;}

.insurancebox{display:flex;width:96%;margin:0 auto;justify-content: space-between;padding-bottom:30px;}
.insurancebox .items{width:31%;text-align:left;background:#fff;}
.insurancebox .items .itemsImg{width:60%;margin:0 auto;margin-top:10px;}
.insurancebox .items .itemsTitle{font-size:10px;padding:10px 0;}
.insurancebox .items .itemsTitle .itemsNum{color:#2C47C0;}
.insurancebox .items .itemsContent{padding-bottom:10px;font-size:8px;}
.information{display:flex;justify-content: space-between;width:92%;margin:0 auto;text-align:left;font-size:10px;padding-bottom:20px;}
.information .informationImg{width:29%;}
.information .informationText{width:65%;height:auto;}
.information .informationText .title{font-size:10px;font-weight:500;}
.information .informationText .text .textBlack{font-weight:500;}
</style>
