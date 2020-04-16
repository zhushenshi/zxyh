//支持银行卡
<template>
  <div class="holdBanks">
    <div v-if="!isWeixin" style="position:fixed;left:0;right:0;">
      <MyHeader :title="'支持银行卡'" ></MyHeader>
    </div>
    <div class="wrapper" :style="{top:!isWeixin?'64px':0}">
      <div class="content">
        <div class="title rowItem">
          <div class="item">银行名称</div>
          <div class="item">单笔限额(元)</div>
          <div class="item">日累计限额(元)</div>
        </div>
        <div class="rowItem" :key="item.id" v-for="item in data">
          <div class="item">{{item.name}}</div>
          <div class="item">{{item.danbi}}</div>
          <div class="item">{{item.danri}}</div>
        </div>
        <div>
          <table>
          <tr>
              <td style="color: #fcb733;text-align: left;"> 1.此限额参考表更新于2018年4月12日。</td>
          </tr>
          <tr>
              <td style="color: #fcb733;text-align: left;">2.充值限额可参考上表，具体的额度以发卡银行为准。如果您在发卡银行设置的支付额度低于此表限额，以您的设置为准。</td>
          </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      data:[
        {
          name: '中国银行',
          danbi: '5万',
          danri: '50万'
        },
        {
          name: '建设银行',
          danbi: '5万',
          danri: '20万'
        },
        {
          name: '工商银行',
          danbi: '5万',
          danri: '5万'
        },
        {
          name: '中信银行',
          danbi: '5千',
          danri: '2万'
        },
        {
          name: '兴业银行',
          danbi: '5万',
          danri: '5万'
        },
        {
          name: '光大银行',
          danbi: '5万',
          danri: '10万'
        },
        {
          name: '上海银行',
          danbi: '5千',
          danri: '1万'
        },
        {
          name: '邮储银行',
          danbi: '5千',
          danri: '5千'
        },
        {
          name: '平安银行 ',
          danbi: '5万',
          danri: '5万'
        },
        {
          name: '浦发银行',
          danbi: '5万',
          danri: '5万'
        },
        {
          name: '交通银行',
          danbi: '9999元',
          danri: '50万'
        },
        {
          name: '广发银行',
          danbi: '2万',
          danri: '2万'
        },
        {
          name: '华夏银行',
          danbi: '5千',
          danri: '1万'
        }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.holdBanks
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #f6f6f6
  .wrapper
    overflow-y auto
    height 100%
    position fixed
    top 64px
    left 0
    right 0
    bottom 0    
    .content
      margin 9px 10px 80px 10px
      background #ffffff
      text-align center 
      border-top 1px solid #ececec
      border-left 1px solid #ececec
      border-radius 6px
      .rowItem
        display flex
        height 39px
        line-height 39px
        .item
          flex 1
          font-size 14px
          color #252525
          border-bottom  1px solid #ececec
          border-right 1px solid #ececec
      .title
        height 32px
        line-height 32px
        .item
          font-size 13px
          color #8c8c8c  
</style>
