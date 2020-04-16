<template>
	<div class="bacnkCard">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'银行卡'" :rightText="list.bankName?'换卡':'绑卡'" :rightPath="'/home/accountTab/security/activeSina'"></MyHeader></div>
    <div class="container" style="border-top:1px solid #f5f5f5;">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
          <div class="noData" v-if="!list.bankName">暂未绑定银行卡</div>
          <div class="cardList" v-else>
            <div class="cardName">{{list.bankName}}</div>
            <span v-if="isWeixin" class="changeBtn" @click="$router.push('/home/accountTab/security/activeSina')">换卡</span>
            <div class="cardNo"><span>****</span><span>****</span><span>****</span><span>{{list.cardNumber?list.cardNumber.slice(-4,):''}}</span><span class="card-icon"></span></div>

          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import {baseURL} from '@/vuex/url';
import BScroll from 'better-scroll'
export default {
  name: 'bacnkCard',
  data () {
    return {
      height: 0,
      list:''
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
      // this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
      new BScroll(this.$refs.wrapper, {click: true})
    })
    this.$ajax('post',baseURL +'/account/bankcard','',(data)=>{
      console.log(data)
      this.list=data.list
    })
  }
}
</script>

<style scoped lang="stylus">
.bacnkCard{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #fff;
  text-align: center;
  .noData{
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(188,188,188,1);
    background url(../../../assets/images/accountTab/cardNo.png) no-repeat center center
    background-size contain
    height 112px
    line-height 112px
    margin 10px 20px
  }
  .cardList{
    height:112px;
    margin 10px 20px
    background:linear-gradient(-90deg,rgba(48,101,194,1) 0%,rgba(76,122,205,1) 100%);
    border-radius:6px;
    text-align left
    padding 0 20px
    position relative
    .cardName{
      font-size:18px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      padding 30px 0 20px 0
    }
    .changeBtn{
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      position:absolute;
      right:15px;
      top:15px;
    }
    .cardNo{
      font-size:18px;
      font-family:Roboto;
      font-weight:400;
      color:rgba(255,255,255,1);
      position relative
      span{
        margin 0 5px
      }
      .card-icon{
        position absolute
        width 32px
        height 32px
        background url(../../../assets/images/accountTab/yinlian.png) no-repeat center center
        background-size contain
        top -5px
        right 0
      }
    }
  }
}          
</style>