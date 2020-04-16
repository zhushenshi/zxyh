//红包使用规则
<template>
  <div class="couponRules">
    <!-- <div class="titleBar">
      <span class="icon-back" @click="goBack"></span>
      <span class="title-text">加息券使用规则</span>
    </div> -->
		<MyHeader :title="'加息券使用规则'" v-if="!isWeixin"></MyHeader>
    <div class="main" style="border-top:1px solid #f5f5f5;">
      <div class="wrapper" v-if="color === '金色'">
        <div class="title">一、什么是金色加息券:</div>        
        <div class="content">金色加息券是一种增加投资人年化收益的电子券,在19理财原产品的基础上,对指定的产品进行投资并使用金色加息券,可使财富增幅显著提高。</div>
        <div class="title">二、获取方式:</div>        
        <div class="content">当日单笔投资金额最高的用户获得。</div>
        <div class="title">三、使用规则:</div>        
        <div class="content">
          <p>1.单笔投资金额满3000元可加息,加息7天,适用于投资三个月及以上期限的产品,最高可加息100000元;</p>
          <p>2.所有加息券有效期:20天,20天之后自动失效;</p>
          <p>3.6%的加息券由于只能加息7天,因此这部分加息金额要在加息结束后立刻到账;</p>
          <p>4.任何通过非正规途径获取的金色加息券,一经核实,金色加息券不予承兑。</p>
        </div>
      </div>
      <div class="wrapper" v-if="color === '橙色'">
        <div class="title">一、什么是橙色加息券:</div>      
        <div class="content">橙色加息券是一种增加投资人年化收益的电子券,在19理财原产品的基础上,对指定的产品进行投资并使用橙色加息券,可使财富增幅显著提高。</div>
        <div class="title">二、获取方式:</div>      
        <div class="content">当日每个尾标用户获得。</div>
        <div class="title">三、使用规则:</div>      
        <div class="content">
          <p>1.单笔投资金额满8000元可加息,适用于投资六个月及以上期限的产品,最高可加息100000元;</p>
          <p>2.所有加息券有效期:20天,20天之后自动失效;</p>
          <p>3.任何通过非正规途径获取的橙色加息券,一经核实,橙色加息券不予承兑。</p>
        </div>
      </div>
      <div class="wrapper" v-if="color === '红色'">
        <div class="title">一、什么是红色加息券:</div>      
        <div class="content">红色加息券是一种增加投资人年化收益的电子券,在19理财原产品的基础上,对指定的产品进行投资并使用红色加息券,可使财富增幅显著提高。</div>
        <div class="title">二、获取方式:</div>      
        <div class="content">当日投资总额最高用户获得。</div>
        <div class="title">三、使用规则:</div>      
        <div class="content">
          <p>1.单笔投资金额满10000元可加息,适用于投资六个月及以上期限的产品,最高可加息100000元;</p>
          <p>2.所有加息券有效期:20天,20天之后自动失效;</p>
          <p>3.任何通过非正规途径获取的红色加息券,一经核实,红色加息券不予承兑。</p>
        </div>
      </div>
      <div class="wrapper" v-if="color === '蓝色'">
        <div class="title">一、什么是蓝色加息券:</div>      
        <div class="content">蓝色加息券是一种增加投资人年化收益的电子券,在19理财原产品的基础上,对指定的产品进行投资并使用蓝色加息券,可使财富增幅显著提高。</div>
        <div class="title">二、获取方式:</div>      
        <div class="content">
          <p>1.新用户注册获得;</p>
          <p>2.当日第一个投资用户获得。</p>
        </div>
        <div class="title">三、使用规则:</div>      
        <div class="content">
          <p>1.单笔投资金额满5000元可加息,加息10天,适用于投资90天及以上期限的产品,最高可加息100000元;</p>
          <p>2.所有加息券有效期:20天,20天之后自动失效;</p>
          <p>3.8%的加息券由于只能加息10天,因此这部分加息金额要在加息结束后立刻到账;</p>
          <p>4.任何通过非正规途径获取的蓝色加息券,一经核实,蓝色加息券不予承兑。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      color: ''
    }
  },
  created() {
    this.color = this.$route.params.color;
  },
  methods: {
    goBack() {
      this.$router.go(-1);//返回上一层
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.couponRules
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #fff
  .titleBar
    padding 0 10px
    height 44px
    line-height 44px
    background #ffffff
    border-bottom 1px solid #f2f2f2
    text-align center 
    .icon-back
      position absolute
      left 10px
      padding 13px 10px 10px 10px
      font-size 20px
    .title-text
      font-size 17px
      font-weight 500
      color #000 
  .wrapper
    padding 10px    
    .title
      margin 15px 0 6px 0
      font-size 15px
      font-weight 500
      color #000
    .content
      padding 0 15px 0 28px
      line-height 24px
      font-size 14px  
      color #666
</style>
