<template>
  <div class="footer">
    <div class="content">
      <el-row>
        <el-col :span="5">
          <div class="footer-item text-left"><img src="../assets/imgs/customer-service.png" alt=""></div>
          <div class="footer-item text-left">
            <span>关注我们：</span>
            <img class="margin-left" src="../assets/imgs/weChat.png" alt="">
            <img class="margin-left" src="../assets/imgs/sina.png" alt="">
            <img class="margin-left" src="../assets/imgs/qq.png" alt="">
          </div>
        </el-col>
        <el-col class="before after" :span="14">
          <ul class="footer-inline-ul">
            <li><router-link to="">关于我们</router-link></li>
            <li><router-link to="">安全保障</router-link></li>
            <li><router-link to="">帮助中心</router-link></li>
            <li><router-link to="">新手指引</router-link></li>
            <li><router-link to="">风险教育</router-link></li>
            <li><router-link to="">联系我们</router-link></li>
          </ul>
          <div class="footer-item">
            <img src="../assets/imgs/footer-logo.png" alt="">
          </div>
          <ul class="footer-inline-ul">
            <li class="nomargin"><router-link to=""><img src="../assets/imgs/shuidi.jpg" alt=""></router-link></li>
            <li class="nomargin"><router-link to=""><img src="../assets/imgs/officialSmall.jpg" alt=""></router-link></li>
            <li class="nomargin"><router-link to=""><img src="../assets/imgs/cert.png" alt=""></router-link></li>
            <li class="nomargin"><router-link to=""><img src="../assets/imgs/gw_124x47.png" alt=""></router-link></li>
            <li class="nomargin"><router-link to=""><img src="../assets/imgs/norton.png" alt=""></router-link></li>
          </ul>
        </el-col>
        <el-col :span="5">
          <div class="footer-item"><img class="code-img" src="../assets/imgs/code.png" alt=""></div>
          <div class="footer-item">扫码关注微信公众号</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ul class="footer-inline-ul footer-ul">
            <li><router-link to="">Copyright@2017-2023 19理财</router-link></li>
            <li><router-link to="">浙ICP备17052820号-1</router-link></li>
            <li><router-link to="">经营许可证编号：浙B2-20171458</router-link></li>
            <li><router-link to=""><img src="../assets/imgs/gaba.png" alt=""> 浙公网安备 33010602009209号</router-link></li>
            <li><router-link to="">杭州盈强投资管理有限公司 版权所有2017-2023</router-link></li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default{
  name:'myFooter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../assets/stylus/comm"
.footer
  min-width 1120px
  min-height 100px
  height 300px
  background $footer-bg-color
  padding 20px 0
  color $footer-text-color
  .footer-item
    margin 20px 0
    text-align center
  .footer-inline-ul
    li
      display: inline-block
      margin 0 20px
      position relative
      &:after
        position absolute
        right -40%
        content ""
        width 1px
        height 100%
        background $footer-text-color
      a
        color $footer-text-color
        text-decoration: none
      a:hover
        color: $red-color
    li:last-child
      margin-left 20px
      &:after
        display none
      a
        color $footer-text-color
    .nomargin
      margin 0
      &:after
        display none
    .nomargin:last-child
      margin 0
  .footer-ul
    li
      margin 0 10px
      &:after
        right -11px
      img
        width 14px
        vertical-align text-bottom
        margin-right 4px
  .after
    position relative
    &:after
      position absolute
      content ""
      width 1px
      height 100%
      background $footer-text-color
      right 14px
      top 0
    &:before
      position absolute
      content ""
      width 1px
      height 100%
      background $footer-text-color
      left 14px
      top 0
  .code-img
    margin-top 14px
</style>
