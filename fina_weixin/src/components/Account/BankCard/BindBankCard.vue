<template>
	<div class="bindbacnkCard">
    <div ref="MyHeader"><MyHeader :title="'绑定银行卡'"></MyHeader></div>
    <div class="container" style="border-top:1px solid #F5F5F5;">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
          <div class="items item-field">
            <mt-field label="开户银行" type="text" placeholder="请输入开户行名称" :attr="{ maxlength: 20 }" v-model="form.bankName"></mt-field>
            <mt-field label="银行卡号" type="tel" placeholder="请输入银行卡号" :attr="{ maxlength: 18 }" v-model="form.bankCard"></mt-field>
            <mt-field label="开户名称" type="text" placeholder="请输入开户名" :attr="{ maxlength: 20 }" v-model="form.bankAccount"></mt-field>
            <mt-field label="手机号" type="tel" placeholder="请输入手机号" :attr="{ maxlength: 11 }" v-model="form.tel"></mt-field>
            <mt-field label="验证码" type="tel" placeholder="请输入验证码" v-model="form.captcha" :attr="{ maxlength: 6 }">
              <span class="captcha">验证码</span>
            </mt-field>
          </div>
          <div class="base-button-container">
            <div class="base-button">绑定</div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'bindbacnkCard',
  data () {
    return {
      height: 0,
      form:{
        bankName: '',
        bankCard: '',
        bankAccount: '',
        tel: '',
        captcha: ''
      }
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
      new BScroll(this.$refs.wrapper, {click: true})
    })
  }
}
</script>

<style scoped lang="stylus">
.bindbacnkCard{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #F3F3F3;
  text-align: center;
  .items{
    background #ffffff
    margin 0 0 10px 0;
    .item-label{
      font-size:17px;
      font-family:FZLanTingHeiS-R-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align left
      padding 10px
    }
    .item-value{
      position relative
    }
    .captcha{
      padding 10px 20px
      border:1px solid rgba(153,153,153,1);
      border-radius:4px;
    }
  }
}          
</style>