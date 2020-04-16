<template>
  <div class="newguide">
    <Layout>
      <div slot="main">
        <div class="wrapper bg-white">
          <div><img src="../../public/img/newguideBanner.png" alt=""></div>
          <div class="content text-center">
            <h1>关于19理财</h1>
            <div class="dividing"><img src="../../public/img/dividing.png"></div>
            <p>
              19理财（www.19licai.com）是专注为个人、企业提供金融信息服务。为有资金需求的借款人和有投资需求的投资人搭建一个
							轻松、便捷、安全、透明的互联网金融服务平台。借款人在19理财提交借款申请来实现快捷的融资需求；投资人把自己的部分富余资金通过19理财出借给优质且有融资需求的个人或企业，
							在获得有保障的、安全的、收益稳定的投资回报的同时，帮助了优质的借款人，让双方资金的流动性都得到提升。
            </p>
          </div>
        </div>
        <div class="wrapper">
          <div class="content text-center">
            <h1 >平台优势</h1>
            <div class="dividing"><img src="../../public/img/dividing.png"></div>
            <div class="pb40"><img src="../../public/img/advantage.png"></div>         
          </div>
        </div>
        <div class="wrapper bg-white">
          <div class="content text-center">
            <h1 >可投资类型</h1>
            <div class="dividing"><img src="../../public/img/dividing.png"></div>
            <div class="pb40"><img src="../../public/img/InvestmentType.png" style="width:70%;"></div>         
          </div>
        </div>
        <div class="wrapper">
          <div class="content text-center">
            <h1 >理财投资步骤</h1>
            <div class="dividing"><img src="../../public/img/dividing.png"></div>
            <div class="pb40"><img src="../../public/img/InvestmentStep.png" style="width:70%;"></div>         
          </div>
        </div>
        <div class="wrapper bg-white">
          <div class="content text-center">
            <div style="width:386px;margin:50px auto 120px;">
              <router-link to="/register"><img src="../../public/img/newGuideButton.png" alt=""></router-link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
export default {
  data(){
    return {
    }
  },
  components: {
    Layout,
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding-top 50px
  .dividing
    width 10%;
    margin 0 auto
    padding-bottom 40px;
  p
    padding 0 100px 40px
    text-indent: 2em;
    color: #595959;
    font-size 1.4rem
  .pb40
    padding-bottom 40px

</style>
