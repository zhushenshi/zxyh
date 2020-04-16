<template>
	<div class="aboutUs">
    <MyHeader :title="'关于我们'" v-if="!isWeixin"></MyHeader>
		<div class="swipper" ref="swipper">
            <div class="content">
                <div class="banner"></div>
                <div class="contents">
                    <p>19理财是隶属于杭州盈强投资管理有限公司旗下的互联网金融服务平台，成立于2017年8月，由从事金融管理和互联网等行业多年的精英团队倾力打造。19理财网络借贷平台采用创新的技术和理念，通过互联网建立一个安全、高效、诚信的服务平台，使个体和个体之间通过互联网平台实现的直接借贷，规范了民间个人之间的借贷行为，使之更加安全、有效，使其阳光化、网络化、信息化、规范化。</p>
                    <p>19理财秉承“诚信、共赢、联合、创新”的理念，以大数据、模型化、决策流、风控业务逻辑为导向，配以可操作性的决策引擎将传统信审模式与大数据风控有效结合，通过建立一个安全， 高效，诚信，互惠互助的网络借贷平台让个人和企业有机会得到更多的帮助和更好的服务，同时得到更高的收益和稳定的回报。</p>
                </div>
                <div class="aboutInfo">
                    <div class="item">
                      <div class="item_l">
                        <span class="iconBg"></span>
                        <span class="title">官方网站</span>
                      </div>  
                      <div class="item_r">
                        <span class="text">www.19licai.com</span>
                      </div>  
                    </div>
                    <div class="item">
                      <div class="item_l">
                        <span class="iconBg iconWechat"></span>
                        <span class="title">微信公众号</span>
                      </div>  
                      <div class="item_r">
                        <span class="text">19金服</span>
                      </div>  
                    </div>
                    <div class="item">
                      <div class="item_l">
                        <span class="iconBg iconMail"></span>
                        <span class="title">客服邮箱</span>
                      </div>  
                      <div class="item_r">
                        <span class="text">19kefu@19licai.com</span>
                        <!-- <span class="icon-more"></span> -->
                      </div>  
                    </div>
                    <div class="item" @click="callTel">
                      <div class="item_l">
                        <span class="iconBg iconTel"></span>
                        <span class="title">全国客服热线</span>
                      </div>  
                      <div class="item_r">
                        <span class="text">400-600-1919</span>
                        <span class="icon-more"></span>
                      </div>  
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'
export default {
	name: 'aboutUs',
	data() {
		return {
            zIndex: false,
            tel: ''
        }
    },
    mounted () {
        this.$nextTick(() => {
            new BScroll(this.$refs.swipper, {click: true})
        })
    },
    methods: {
        callTel () {
            let This=this;
            MessageBox.confirm('', {
                message: '(工作时间周一至周五08:30-17:30)',
                title: '400-600-1919',
                confirmButtonText: '呼叫',
                cancelButtonText: '取消'
            }).then(action => {
                if (action == 'confirm') {
                }
            }).catch(err => {
                if (err == 'cancel') {}
            });
            document.getElementsByClassName('mint-msgbox-confirm')[0].innerHTML='<a style="display:block;width:100%;height:100%;" href="tel:400-600-1919">呼叫</a>';
        },
        call () {
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"  rel="stylesheet/stylus">
@import '../../../common/stylus/mixin'
.aboutUs
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #F6F6F6
.swipper
    height 100%
    .banner
        height 114px
        bg-image(bannerUs)
        background-repeat no-repeat
        background-size 100%
    .contents
        padding 10px
        background #ffffff
        margin 0 0 10px 0
        font-family PingFangSC-Medium
        font-size 12px
        color #2B2B2B
        letter-spacing 1.36px
        p
          text-indent 2em
          margin-bottom 10px
        p:last-child
          margin-bottom
    .aboutInfo
        background #ffffff
        padding 0 15px
      .item
        display flex
        height 48px
        line-height 48px
        border-1px(#F4F4F4)
        .item_l
          flex 1
          text-align left
          .title
            font-family PingFangSC-Medium
            font-size 14px
            color #000
            letter-spacing -0.17px
          .iconBg
            display inline-block
            width 20px
            height 20px
            margin-right 8px
            bg-image(net)
            background-repeat no-repeat
            background-size contain
            vertical-align middle
          .iconWechat
            bg-image(wechat)
            background-repeat no-repeat
            background-size contain
            vertical-align middle
          .iconMail
            bg-image(mail)
            background-repeat no-repeat
            background-size contain
            vertical-align middle
          .iconTel
            bg-image(tel)
            background-repeat no-repeat
            background-size contain
            vertical-align middle
        .item_r
          flex 1
          text-align right 
          .text
            font-family PingFangSC-Medium
            font-size 14px
            color #000
            letter-spacing -0.17px
          .icon-more
            position relative
            top 2px
            font-size 16px
            color #aaa   
.swipper
   .mint-cell:last-child:after
      display none
.call
    position absolute
    top 16px
    z-index -1
.called
    z-index 1
    opacity 0
</style>


