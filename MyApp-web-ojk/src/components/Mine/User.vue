<template>
  <div class="User">
    <div class="user-scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="userTop">
          <div class="userInfo">
            <div class="headInfo">
                <div class="headDiv">
                  <img :src="headImg" alt="">
                </div>
                <div class="userInfoDetail">
                  <p>{{customerMap.is_identity == '1'?customerMap.person_name:customerMap.phone}}</p>
                  <p class="realName">
                    <span>
                      <i class="iconfont icon-approve"></i>
                      {{customerMap.is_identity == '1'?$t('lang.comm.ident'):$t('lang.comm.noident')}}
                    </span>
                  </p>
                </div>
            </div>
            </div>
            <div class="cashWithdrawal" v-if="false">
              <div>{{$t('lang.comm.quota')}}:<span class="count">{{count|money}}</span></div>
              <div class="cashRight">
                <span class="cashBtn" :class="{cashBtnDisabled:!checkCashTime}" @click="getMoney()">{{$t('lang.portalView.cash')}}</span>
              </div>
          </div>
        </div>
        <div class="userList" v-show="false">
           <div @click="goToPage('/cooperation')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-hezuo iconColor"></i>{{$t('lang.userView.cooperationPlatform')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div> 
         
        </div>
        <div class="userList itemSec">
           <div v-show="false" @click="goToPage('/order')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-dingdanzhuangtai iconColor"></i>{{$t('lang.orderView.order')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
          <div v-show="false" @click="goToCreditCard('/creditCard')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-iconset0292 iconColor"></i>{{$t('lang.userView.myBankCard')}}
            </span>
            <span style="margin:0 0 0 6px;color: red">{{myBankSstatus}}</span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
        </div>
        <div class="userList itemSec">
          <div @click="goToPage('/msgCenter')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-xinxi iconColor"></i>{{$t('lang.msgView.msgCenter')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
          <div @click="goToPage('/suggestion')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-tousujianyi iconColor"></i>{{$t('lang.suggestionView.suggestion')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
          <!-- <div @click="goToPage('/aboutUs')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-women iconColor"></i>关于我们
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div> -->
          <div @click="contactUs()" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-lianxiwomen iconColor"></i>{{$t('lang.userView.contactUs')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
          <div @click="goToPage('/commProblem')" style="border-bottom:1px solid #eeeeee">
            <span>
              <i class="iconfont icon-wentidingdan iconColor"></i>Pertanyaan Umum
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
          <div @click="goToPage('/setting')">
            <span>
              <i class="iconfont icon-icon_setting iconColor"></i>{{$t('lang.settingView.setting')}}
            </span>
            <i class="iconfont icon-previewright icon-right-color"></i>
          </div>
      </div>
      </cube-scroll>   
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const defaultImg = require('./img/user.png')
export default {
  name: 'User',
  data () {
    return {
      count:0,
      nickName:'userName',
      headImg: defaultImg,
      custId:'',
      customerMap:{
        is_identity: '0',
        person_name: 'loading',
        phone: '------'
      },
      telList:{},
      myBankSstatus:'',
      optionsPopup: {
        listenScroll: true,
        probeType: 3,
        stopPropagation:true,
        scrollbar:{
          fade:false
        }
      },
      checkCashTime:true,
      checkCashTimemsg:'',
      lang:''
    }
  },
  mounted() {
    let locale = this.$i18n._vm.locale
    this.lang=this.$i18n._vm.messages[locale].lang
  },
  created(){
    this.getUserAll(true)
  },
  methods:{
    getUserAll(loading){
      this.customerMap.person_name=this.$store.state.userAccount
      this.customerMap.phone=this.$store.state.userAccount
      this.customerMap.is_identity=this.$store.state.userIdentity
      this.myBankSstatus=this.$store.state.userBankSstatus
      this.count=this.$store.state.userCash
      this.getHeadPic(loading)
      this.getInfo(loading)
    },
    goToPage (path) {
      this.$router.push(path)
    },
    getInfo (loading) {
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/customer/getCustomer',{},(data)=>{//
        this.customerMap=data.retData.customerMap
        this.$store.commit("userAccount", this.customerMap.person_name?this.customerMap.person_name:this.customerMap.phone);
        this.$store.commit("userIdentity", this.customerMap.is_identity);
        this.telList=data.retData.telList//联系我们
        this.count=data.retData.trailMap.creditState == 1?data.retData.trailMap.credit:0//提现金额
        this.$store.commit("userCash", this.count);
      },"",loading)
      this.$ajax('post','/payTreasure/getOpenAccount',{},(data)=>{//
        if(data.retData.IsOpenOrder == '0'){
          this.myBankSstatus='('+lang.comm.nobind+')'//未绑定
        }else if(data.retData.IsOpenOrder == '2'){
          this.myBankSstatus='('+lang.comm.binding+')'//绑定中
        }else{
          this.myBankSstatus=''
        }
        this.$store.commit("userBankSstatus", this.myBankSstatus)
      },"",loading)
    },
    goToCreditCard(path){
      if(!this.checkStatus()){
        return
      }
      this.$ajax('post','/payTreasure/getOpenAccount',{},function(msg){
        let data = msg.retData;
        let IsOpenOrder = data.IsOpenOrder//是否绑卡
        let locale = this.$i18n._vm.locale
        let lang=this.$i18n._vm.messages[locale].lang
        if(IsOpenOrder == '2'){
          this.$Toast({message:lang.comm.bingingCard,position:'bottom'})
          return
        }else if(IsOpenOrder == '0'){
          this.$Toast({message:data.MSG,position:'bottom'})
          return
        }
        this.$router.push(path)
      }.bind(this),"",true)
    },
    getMoney(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      if(this.count == 0 ) {
        this.$Toast({message:lang.comm.noQuota,position:'bottom'});
        return;
      }
      this.showWithdrawal()
    },
    getHeadPic(loading){
      this.$ajax('post','/oss/getPage',{},(data)=>{//获取头像
        this.headImg = data.retData.list[0].head_img?data.retData.list[0].head_img:this.headImg;
      },"",loading)
    },
    contactUs() {
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      if(!this.telList.hasOwnProperty('weixin')){
        this.$ajax('post','/customer/getCustomer',{},(data)=>{//
          this.telList=data.retData.telList//联系我们
          this.$createDialog({
            type: 'alert',
            // title: this.lang.userView.contactUs,
            content: `<p style="text-align: center;font-size:18px;margin-bottom:10px;color:#000">Hubungi layanan pelanggan kami(hari senin sampai jumat 09.00 -18.00 GMT+7)</p><p style="font-size:16px;margin-bottom:10px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-email"></span><a style="text-decoration:underline" href="mailto:${this.telList.weixin}">${this.telList.weixin}</a></p><p style="font-size:16px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-phone"></span><a style="text-decoration:underline" href="tel:${this.telList.qq}">${this.telList.qq}</a></p>`,
            // content: `<p style="text-align: center;font-size:18px;margin-bottom:10px;color:#000">Hubungi layanan pelanggan kami(hari senin sampai jumat 09.00 -18.00 GMT+7)</p><p style="font-size:16px;margin-bottom:10px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-email"></span><a style="text-decoration:underline" href="mailto:${this.telList.weixin}">${this.telList.weixin}</a></p>`,
            confirmBtn:{
              text: 'Tutup'
            }
          }).show()          
        })
      }else{
        this.$createDialog({
          type: 'alert',
          // title: this.lang.userView.contactUs,
          content: `<p style="text-align: center;font-size:18px;margin-bottom:10px;color:#000">Hubungi layanan pelanggan kami(hari senin sampai jumat 09.00 -18.00 GMT+7)</p><p style="font-size:16px;margin-bottom:10px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-email"></span><a style="text-decoration:underline" href="mailto:${this.telList.weixin}">${this.telList.weixin}</a></p><p style="font-size:16px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-phone"></span><a style="text-decoration:underline" href="tel:${this.telList.qq}">${this.telList.qq}</a></p>`,
          // content: `<p style="text-align: center;font-size:18px;margin-bottom:10px;color:#000">Hubungi layanan pelanggan kami(hari senin sampai jumat 09.00 -18.00 GMT+7)</p><p style="font-size:16px;margin-bottom:10px"><span style="margin-right:10px;font-size:20px;vertical-align: sub;" class="cubeic-email"></span><a style="text-decoration:underline" href="mailto:${this.telList.weixin}">${this.telList.weixin}</a></p>`,
          confirmBtn:{
            text: 'Tutup'
          }
        }).show()
      }
    },
    checkStatus(){      
      if(this.customerMap.is_identity != '1'){
          this.$Toast({message:this.$t('lang.userView.getMoneyText'),position:'bottom'});
          return false;
      }
      return true
    },
    /** 显示弹框 **/
    showWithdrawal: function () {
      let productId=sessionStorage.getItem('productId')
      let periodsId=sessionStorage.getItem('periodsId')
      this.$createWithdrawal({
        $props: {
          loading: true,
          productId: productId,
          periodsId: periodsId
        },
        $events:{
          closePopup: this.closePopup
        }
      }).show()
    },
    /** 关闭弹框 **/
    closePopup(){
      this.$createWithdrawal({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closePopup
        }
      }).hide();
    }
  }
}
</script>
<style>
.cube-dialog-title{
  line-height: 2 !important
}
</style>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.user-scroll-list-wrap
  position fixed
  bottom 50px
  left 0
  right 0
  top 0
.User
  position absolute
  bottom 0
  left 0
  right 0
  top 0
  height 100% !important
  background #F8F8F8
  .userTop
    background:$color-primary
    .userInfo
      padding 40px 20px 20px 20px
      .headInfo
        text-align left 
        display flex
        padding-bottom 10px
        // border-bottom 1px solid rgba(255, 255, 255, 0.3);
        padding 10px 0 20px
        .headDiv
          width: 75px;
          height: 75px;
          border: 3px solid #fff;
          border-radius: 50%
          img
            border-radius: 50%;
            width: 100%;
            height: 100%
        .userInfoDetail 
          padding-left 15px
          p
           font-size 14px
           color #ffffff
           margin-top 20px
           min-height 14px
          .realName
            color:$color-user-top-realName
            span
              background #ffffff
              border-radius 30px
              // display inline-block
              padding 3px 10px  
              font-size 12px
            i
              font-size 14px
              position relative
              top 1px
  .cashWithdrawal
    display flex
    padding 0 20px 15px
    text-align left 
    color #fff
    font-size 16px
    div
      flex 1
      height 30px
      line-height 30px
    .cashRight
      text-align right 
      .count
        margin-left 10px  
      .cashBtn
        color:#000
        background #ffffff
        width 100px
        text-align center
        display inline-block
        border-radius 5px
      .cashBtnDisabled
        color #888
        background-color #ccc
  .userList
    background #ffffff
    font-size 14px
    text-align left
    padding 0 15px
    div
      position relative
      padding 15px 0
      border-bottom 1px solid #eeeeee
    div:nth-last-child(1)
      border none
    .iconColor
     color:$color-icon
     margin-right 10px
     font-size 18px
    .icon-previewright
      position absolute
      right 0
      font-size 20px
    .icon-right-color
      color $color-icon-right
  .itemSec
    margin-top 10px
</style>
