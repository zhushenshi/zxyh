<template>
<div>
  <div :class="{account:true,accountActive:zIndex}" ref="scrollWrapper">
    <div class="scroll-wrapper">
      <div class="top">
        <!-- <img class="bgImg"  src="../../assets/images/accountTab/account_banner.png" alt="" style="display:none;"> -->
        <div class="content">
          <p style="height:30px;" v-if="!isWeixin"></p>
          <p class="authinfo">
            <img :src="headImg" style="width:54px;height:54px;border-radius:50%;" @click="uploadImg">
            <input v-if="!noLogin" class="inputPlace" type="file" @change="imgChange($event)"  @click="uploadImg" accept="image/*" style="border:1px solid red;position:absolute;width:54px;height:54px;border-radius: 50%;left:0;top:0;bottom:0;opacity:0;">
            <span class="tel" v-if="phone">{{phone}}</span>
            <span class="tel" v-else @click="goIntoPages('/login')">登录/注册</span>
            <!-- <span class="authstate" v-html="authStatus == 0 ? '未认证' : '已认证'"></span> -->
            <span class="icon icon-setting" @click="goIntoPages('/home/accountTab/settings')"></span>
            <!-- <span class="icon icon-message" @click.once="goIntoPages('/home/accountTab/message')"></span> -->
          </p>
          <!-- <p class="accotitle"  @click="goIntoPages('/home/accountTab/accountDetail')">总资产(元)<span class="icon-eye" @click.stop="evenFlag && _toggleSeeAmount()" :class="hideAmount == 0 ? 'icon-eye-on' : 'icon-eye-off'"></span></p> -->
          <p class="accotitle">总资产(元)<span class="icon-eye" @click.stop="evenFlag && _toggleSeeAmount()" :class="hideAmount == 0 ? 'icon-eye-on' : 'icon-eye-off'"></span></p>
          <p class="totalAssets">{{totalAssets}}</p>
          <p class="totalAssets"><span class="interestTip">昨日收益 <span style="color:#F37723;">{{yesterdayIncome}}</span> 元</span></p>
          <div class="detail-wrapper">
            <div class="item lCon">
              <p class="title">&nbsp;&nbsp;电子钱包（元）</p>
              <p class="value">{{balance}}</p>
            </div>
            <div class="item rCon">
              <p class="title">&nbsp;&nbsp;累计收益（元）</p>
              <p class="value">{{totalRevenue}}</p>
            </div>
          </div>
        </div>
        <div class="operation-wrapper">
          <!-- <div class="lCon">
            <p class="title">账户余额（元）</p>
            <p class="value">{{balance}}</p>
          </div> -->
          <!-- <div class="rCon">
            <button class="withdraw" @click="goIntoPages('/home/accountTab/withdraw')">提现</button>
            <button  @click="goIntoPages('/home/accountTab/recharge')" class="recharge">充值</button>
          </div> -->
          <div class="btn btn1" @click="goIntoPages('/home/accountTab/withdraw')">提现</div>
          <div class="btn btn2" @click="goIntoPages('/home/accountTab/recharge')">充值</div>
        </div>
      </div>
      <div class="mid">
        <div class="allFeatures">
          <div class="feturesTitle">全部功能</div>
          <div class="feturesItem" v-for="(item,index) in feturesList" :key="index" @click="goIntoPages(item.path)">
            <p>
              <img :src="item.logo" alt="">
            </p>
            <p class="mt7">{{item.title}}</p>
          </div>
        </div>

        <!-- <div class="myloan-wrapper" @click="goIntoPages('/home/accountTab/myLoans')">
          <div class="lCon">
            <img src="../../assets/images/accountTab/account_icon7.png" alt="">我的借款
          </div>
          <div class="rCon">
            <span>去还款</span>
          </div>
        </div> -->
        <div style="margin:20px 20px 10px 20px;font-size:16px;padding-left:16px;font-weight:bold;">投资记录</div>
        <div class="container" style="font-size:18px;">
          <div v-for="(item,index) in pList" :key="index" @click="goPages(item.id,item.product_series_name,item.is_current)">
            <mt-cell :title="item.product_series_name"  is-link  >
              <span class="itemValue">{{item.value}}</span>
              <img slot="icon" :src="item.product_series_img_url" width="25" height="25" style="margin-right:6px;border-radius:50%;">
            </mt-cell>            
          </div>
        </div>
        <!-- <div class="container" style="font-size:18px;">
          <div @click="goIntoPages('/home/accountTab/myLoan')">
            <mt-cell title="我的借款"  is-link  >
              <img slot="icon" src="../../assets/images/accountTab/loan.png" width="25" height="25" style="margin-right:6px;border-radius:50%;">
            </mt-cell>            
          </div>
        </div> -->
        <!-- <div class="container">
          <div class="rowItems">
            <div class="item" @click="goIntoPages('/home/accountTab/investmentRecord')"><img src="../../assets/images/accountTab/icon1@3x.png"/>投资记录</div>
            <div class="line"></div>
            <div class="item" @click="goIntoPages('/home/accountTab/transaction')"><img src="../../assets/images/accountTab/account_icon2.png"/>交易记录</div>
          </div>
          <div class="rowItems">
            <div class="item" @click="goIntoPages('/home/accountTab/myLoan')"><img src="../../assets/images/accountTab/account_icon7.png"/>我的贷款</div>
            <div class="line"></div>
            <div class="item" @click="goIntoPages('/home/accountTab/bankCard')"><img src="../../assets/images/accountTab/account_card@2x.png"/>银行卡</div>
          </div>
          <div class="rowItems">
            <div @click="goIntoPages('/home/accountTab/myRedBag')" class="item"><img src="../../assets/images/accountTab/account_icon3.png"/>我的红包</div>
            <div class="line"></div>
            <div @click="goIntoPages('/home/accountTab/myRewards')" class="item"><img src="../../assets/images/accountTab/account_icon4.png"/>我的奖励</div>
          </div>
          <div class="rowItems">
            <div @click="goIntoPages('/home/accountTab/security')" class="item"><img src="../../assets/images/accountTab/account_icon5.png"/>账户安全</div>
            <div class="line"></div>
            <div @click="goIntoPages('/home/accountTab/invitesCourtesy')" class="item"><img src="../../assets/images/accountTab/account_icon6.png"/>邀请有礼</div>
          </div>
          <div class="rowItems lastRowItems">
            <div class="item" @click="goIntoPages('/home/accountTab/realName')"><img src="../../assets/images/accountTab/account_person.png"/>实名认证</div>
            <div class="line"></div>
            <div style="visibility: hidden;" class="item"><img src="../../assets/images/accountTab/account_icon6.png"/>占位符</div>
          </div>
        </div> -->
      </div>
      <div class="bot">
        <div class="goals-wrapper">
          <h3>19理财</h3>
          <p>专业<span class="dot"></span>诚信<span class="dot"></span>透明</p>
        </div>
      </div>
    </div>
    <activate-dialog :is-show="isShowActivateDialog" @on-close="closeDialog('isShowActivateDialog')"></activate-dialog>
    <transition name="move"><router-view class="pageView"></router-view></transition>
  </div>  
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import {baseURL} from '@/vuex/url';
import fontSizeFit from "@/utils/font-size-fit.js";
import sinaPwdImg from '@/assets/images/accountTab/sinaPwd.png'
import sinaAccountImg from '@/assets/images/accountTab/sinaAccount.png'
import ActivateDialog from '@/components/Investment/ActivateDialog.vue';
import headImg from  '../../assets/images/accountTab/avatar.png'
import headImgDefault from  '../../assets/images/accountTab/default.png'
export default {
  name:'AccountTab',
  data() {
    return {
      pList: [{
        title: '存款产品',
        value: '',
        icon: require('../../assets/images/record1@2x.png')
      },{
        title: '大额存单',
        value: '',
        icon: require('../../assets/images/record2@2x.png')
      },{
        title: '定期产品',
        value: '',
        icon: require('../../assets/images/record3@2x.png')
      },{
        title: '代销产品',
        value: '',
        icon: require('../../assets/images/record4@2x.png')
      }],
      feturesList:[
        {
          title:'交易记录',
          logo:require('../../assets/images/feture1@2x.png'),
          path:'/home/accountTab/transaction',
        },
        {
          title:'银行卡',
          logo:require('../../assets/images/feture2@2x.png'),
          path:'/home/accountTab/bankCard',
        },
        {
          title:'优惠券包',
          logo:require('../../assets/images/feture3@2x.png'),
          path:'/home/accountTab/myRedBag',
        },
        {
          title:'实名认证',
          logo:require('../../assets/images/feture4@2x.png'),
          path:'/home/accountTab/realName',
        },
        {
          title:'征信服务',
          logo:require('../../assets/images/feture5@2x.png'),
          path:'',
        },
        {
          title:'邀请有礼',
          logo:require('../../assets/images/feture6@2x.png'),
          path:'/home/accountTab/invitesCourtesy?',
        },
        {
          title:'我的名片',
          logo:require('../../assets/images/card.png'),
          path:'/home/accountTab/card',
        },
        {
          title:'我的奖励',
          logo:require('../../assets/images/reward@2x.png'),
          path:'/home/accountTab/myRewards',
        },
        {
          title:'我的借款',
          logo:require('../../assets/images/loan.png'),
          path:'/home/accountTab/myLoan',
        },                  
        {
          title:'关于我们',
          logo:require('../../assets/images/feture7@2x.png'),
          path:'/home/more/aboutUs',
        }    
      ],
      evenFlag: true,
      zIndex: false,
      phone: '',//手机号
      authStatus: 0,//0未认证
      hideAmount: 0, //0未隐藏资金
      totalAssets: '--',//账户总资产
      uncollectedPrincipal: '--',//代收本金
      totalRevenue: '--',//累计收益
      balance: '--',//账户余额
      balanceToWithdraw: '--',//体现页面余额
      paymentAccount: false, // 新浪支付账户激活
      paymentPasswordSet: '', // 新浪支付账户交易密码
      yesterdayIncome:'',//昨日收益
      activeBtnText: '',
      popupImg:'',
      popupPath: '',
      openurl: '',//新浪交易密码界面链接
      popupVisible: false,
      isShowActivateDialog: false,//是否激活
      headImg:headImg,//头像
      noLogin:true
    }
  },
  created () {
    let _this=this
    _this.noLogin=!sessionStorage.getItem('$token')
    this.$ajax('post', baseURL+'/index/selectProductSeries', '', (data)=> {
        if(data.status == '200'){
            this.pList=data.list          
        }else{
            this.$Toast({message:data.msg});
        }
    })
    if(sessionStorage.getItem('$token')){
      _this.headImg=this.$store.state.avatar
      _this.phone=this.$store.state.userName
      _this.getAccountStatus()
      _this.getAccoutInfo();
      _this.$parent.$data.selected='/home/accountTab'
    }    
    // if(sessionStorage.getItem('$token')){
    //   this.getAccoutInfo();
    //   this.$parent.$data.selected='/home/accountTab'
    // }
  },
  methods: {
    closeDialog(attr){
      this[attr]=false
    },
    //切换金额可见
    _toggleSeeAmount() {
      let _this = this;
      this.evenFlag=false;
      this.getHideAmount();
    },
    goIntoPages (url) {
      console.log('=======================')
      if(!url){
        this.$Toast({message:'尚未开通此功能，敬请期待！'})
        return
      }
      if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }   
      // url += '?r=' + new Date().getTime();
      if(url.indexOf('withdraw')!=-1){
        if(!this.paymentAccount){
					this.isShowActivateDialog=this.isShowActivateDialog?false:true;
					return
				}
        this.$router.push({name: 'Withdraw',params: {balance:this.balance}});
      }else if(url.indexOf('recharge')!=-1){
        if(!this.paymentAccount){
					this.isShowActivateDialog=this.isShowActivateDialog?false:true;
					return
				}
        this.$router.push({name: 'Recharge',params: {balance:this.balance}});
      }else{
        this.$router.push(url);
      }
    },
    //获取账户信息
    getAccoutInfo () {
        let accout=this;
        this.$ajax('get',baseURL +'/account','',function(data){
          accout.totalAssets=data.totalAssets?data.totalAssets:'--';
          accout.phone=data.phone?data.phone:'--';
          // userName
          accout.$store.commit("userName",data.phone?data.phone:'--');
          accout.authStatus=data.authStatus?data.authStatus:0;
          accout.uncollectedPrincipal=data.uncollectedPrincipal?data.uncollectedPrincipal:'--';
          accout.yesterdayIncome=data.yesterdayIncome?data.yesterdayIncome:'--';
          accout.totalRevenue=data.totalRevenue?data.totalRevenue:'--';
          accout.balance=data.balance?data.balance:'--';
          accout.balanceToWithdraw=accout.balance?accout.balance:'--'
          accout.hideAmount=data.hideAmount?data.hideAmount:0;
          accout.headImg=data.headImg?data.headImg:headImg;
          accout.$store.commit("avatar",data.headImg?data.headImg:headImg);
          if(accout.hideAmount == 1) {
            accout.totalAssets=accout.totalAssets.replace(/\d|./g,'*');
            accout.uncollectedPrincipal=accout.uncollectedPrincipal.replace(/\d|./g,'*');
            accout.yesterdayIncome=accout.yesterdayIncome.replace(/\d|./g,'*');
            accout.totalRevenue=accout.totalRevenue.replace(/\d|./g,'*');
            accout.balance=accout.balance.replace(/\d|./g,'*');
          }
          accout.evenFlag=true;
          accout.$parent.$data.isAccountShow=data.accountCount===0?true:false;
        })
    },
    //账户隐藏状态
    getHideAmount () {
        let accoutHide=this;
        this.$ajax('get',baseURL + '/account/hideamount','',function(data){
          accoutHide.getAccoutInfo();
        },'','','',true)
    },
    //账户激活状态
    getAccountStatus(resolve){
      this.$ajax('get', baseURL+'/account/security','',(data)=>{
          // 新浪账户激活状态
          this.paymentAccount=data.activeSinaPay==1?true:false
          // 新浪支付帐户交易密码设置状态
          this.paymentPasswordSet=data.setSinaPass==1?true:false
          // if(data.setSinaPass==1){
          //     this.getpwdurl();
          // }
        }
      )
    },
    //关闭popup
    closePopup() {
      this.popupVisible = false;
    },
    //弹框点击去激活
    toActive() {
      if(!this.paymentAccount) {
        this.$router.push(this.popupPath);
        return
      }
      // if (!this.paymentPasswordSet) {
      //   window.open(this.openurl);
      // }
    },
    goPages(series,title,is_current){
      if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }         
      this.$router.push('/home/accountTab/investmentRecord'+series+"?is_current="+is_current+'&title='+title);
    },
    getpwdurl(){
      this.$ajax(
          'post',
          baseURL+'/account/setsinapass',
          '',
          function(data){
            this.openurl=data.redirection;
          }.bind(this)
      )
    },
    uploadImg(){
      if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }
          // this.$ajax('post', baseURL+'/account/updateHeadImg', {headImg:'465456'}, (msg)=> {
          //   console.log(msg);
          //   alert(3)
          // },(err)=>{
          //    this.$Toast({message:err,position:'bottom'});
          // })    
          // return  
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        if(window.webkit&&window.webkit.messageHandlers){
          window.webkit.messageHandlers.albumCamera.postMessage({ message: 'albumCamera'});
        }else{}
      }else if(/android/.test(ua)){
        if(object&&typeof(object.albumCamera)=="function"){       
          object.albumCamera('all',0)////all,photo,album
        }
      }
    },
    imgChange(event){
      let _this=this
      if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }      
      console.log(event)
      function blobToDataURL(blob,cb) {
          let reader = new FileReader();
          reader.onload = function (evt) {
            var base64 = evt.target.result
            cb(base64)
          };
          reader.readAsDataURL(blob);
      }
      var img = event.target.files[0]
      if(img){
        var url = URL.createObjectURL(img);
        var base64 = blobToDataURL(img,function(base64Url) {
          console.log(base64Url.length)
          _this.$ajax('post',baseURL+'/oss/base64Upload',{base64:base64Url},(data)=>{
            if(data.status == 200){
              _this.$ajax('post', baseURL+'/account/updateHeadImg', {headImg:data.src}, (msg)=> {
                _this.headImg=data.src
                _this.$store.commit("avatar",data.headImg?data.headImg:headImg);
                _this.$Toast({message:'上传成功',position:'bottom'});
              })
            }       
          },(err)=>{
            _this.$Toast({message:'上传失败',position:'bottom'});
          })
        })
      }  
    }  
  },
  components: {
    ActivateDialog
  },
  mounted () {
    this.$nextTick(() => {
      new BScroll(this.$refs.scrollWrapper, {
        click: true,
        bounce: false
      })
    })    
    window['cameraCallBack'] = (img)=> {//base64
      this.$ajax('post',baseURL+'/oss/base64Upload',{base64:"data:image/png;base64,"+img},(data)=>{
        if(data.status == 200){
          this.$ajax('post', baseURL+'/account/updateHeadImg', {headImg:data.src}, (msg)=> {
            this.headImg=data.src
            this.$store.commit("avatar",data.headImg?data.headImg:headImg);
            this.$Toast({message:'上传成功',position:'bottom'});
          })
        }       
      },(err)=>{
        this.$Toast({message:err,position:'bottom'});
      })
    }    
  },
  watch: {

  }
}
</script>

<style scoped lang="stylus">
  .accountActive
    z-index 2
  .account
    position fixed
    top 0;
    left 0
    right 0
    bottom 54px
    background:#F7F7F7
    overflow:hidden;
    .top
      position relative
      // height 240px
      width 100%
      text-align left
      background-color #ffffff
      .bgImg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
      .content
        padding 14px 20px 0 20px
        color #333333
        .authinfo
          height 54px
          line-height 54px
          font-size 16px
          position relative
          .tel
            position relative
            top 3px
            letter-spacing 1.2px
            font-size:16px;
            font-weight:bold
            left:10px;
          .authstate
            display inline-block
            margin-left 10px
            width 44px
            text-align center
            height 18px
            line-height 20px
            font-size 10px
            border 1px solid #ffffff
            border-radius 3px
          .icon
            float right
            margin-left 20px
            margin-top 18px
            font-size 24px
            color #333333
        .accotitle
          // display inline-block
          text-align center 
          margin 25px 0 7px 0
          font-size 14px
          letter-spacing 1px
          .icon-more
            vertical-align middle
            margin 0 15px 0 5px
            font-size 16px
            color #ffffff
          .icon-eye
            padding 0 5px
            vertical-align middle
            font-size 18px
            position absolute
            &:before
              color #333333
        .totalAssets
          text-align center 
          font-size 24px
          height 30px
          line-height 30px
          // letter-spacing 1.2px
          font-weight 500
          line-height 24px
          .interestTip
            background-color:#EBE8E8;
            border-radius:10px;
            line-height:20px;
            font-size:12px;
            color:#333333;
            padding:0 26px;
            display:inline-block;          
        .detail-wrapper
          display flex
          height 45px
          margin-top 30px
          .item
            flex 1
            text-align center
            .title
              font-size 12px
              color #A8A8A8
            .value
              font-size 16px
              color #333333
              line-height:25px
          .lCon
            border-right 1px solid #ffffff
          .rCon
            flex 1
            .title,.value
              padding-left 0
      .operation-wrapper
        position relative
        bottom -20px
        display flex
        // padding 24px 20px
        line-height:44px;
        margin 0 20px
        border-radius 8px
        background #ccc
        box-shadow 0 2px 6px 0 rgba(220,200,193,0.50);
        overflow:hidden;
        .btn
          width:50%;
          text-align:center;
          font-size:16px;
        .btn1
          color:#F37723;
          background:#FFFFFF
        .btn2
          background:#F37723
          color:#ffffff;
        .lCon
          flex 1
          .title
            font-size 14px
            color #333
          .value
            font-size 16px
            color #FA7009
            letter-spacing 1.29px
        .rCon
          flex 1.3
          button
            display inline-block
            width 60px
            height 30px
            line-height 30px
            border-radius 20px
            font-size 14px
            letter-spacing 4px
            &.withdraw
              margin-right 10px
              margin-left 20px
              background #ffffff
              border 1px solid #FA7009
              color #FA7009
              @media screen and (width: 320px)
                margin-right 5px
                margin-left 5px
            &.recharge
              background #FA7009
              color #ffffff
              border none
    .mid
      padding-top 40px
      // background #ffffff
      .allFeatures
        background-color:#ffffff;
        margin:0 15px;
        overflow:hidden;
        padding:0 0 22px 0;
        color:#333333;
        border-radius:8px;
        .feturesTitle
          font-size:16px;
          margin-top:18px;
          line-height:22px;
          padding:0 0 0 16px;
          font-weight:bold;
        .feturesItem
          float:left;
          text-align:center;
          width:25%;
          margin-top:18px;
          img
            width:32px;
            height:32px;
            border-radius:50%;
            background:#ccc;
          p.mt7
            margin-top:7px;
      .myloan-wrapper
        display flex
        padding 12px 0
        margin 0 20px
        background #ffffff
        box-shadow 0 2px 6px 0 rgba(220,200,193,0.50);
        border-radius 8px
        font-size 14px
        color #333
        .lCon
          flex 1
          text-align center
          img
            width 20px
            margin-right 10px
            vertical-align middle
        .rCon
          flex 1
          text-align right
          span
            padding-right 40px
            font-size 12px
            text-decoration underline
            color #bbbbbb
      .container
        margin 15px 20px 20px 20px
        border-radius 8px
        box-shadow 0 2px 6px 0 rgba(220,200,193,0.50);
        .rowItems
          display flex
          padding 20px 0
          border-bottom 1px dotted #eeeeee
          align-items center
          .item
            flex 1
            text-align center
            img
              width 25px
              margin-right 15px
          .line
            height 27 px 
            border-right 1px dotted #eee
        .lastRowItems
          border-bottom none
    .bot
      height 60px
      margin 28px 0
      .goals-wrapper
        text-align center
        color #cccccc
        h3
          font-size 16px
          letter-spacing 1.23px
        p
          margin 5px 0
          font-size 11px
          .dot
            display inline-block
            margin 0 5px
            vertical-align middle
            width 2px
            height 2px
            border-radius 50%
            background #ccc
  .mint-popup
    top 45%
    width 60%
    background transparent
    .pop-wrapper
      .btn
        height 40px
        line-height 40px
        text-align center
        background #fff
        border-bottom-left-radius 5px
        border-bottom-right-radius 5px
        font-size 14px
        color #FF7D1B
    .pop-close
      text-align center
      .line
        display block
        width 1px
        height 30px
        margin 0 auto
        background #fff
      .icon-btn_close
        font-size 25px
</style>
<style lang="stylus" scoped>
.itemValue{
  font-size:14px;
  font-family:FZLanTingHeiS-R-GB;
  font-weight:400;
  color:rgba(250,112,9,1);
}
/deep/ .min-cell
  min-height 51px;
/deep/ .mint-cell-text
  font-size:14px
/deep/ .mint-cell-allow-right::after
  width:10px;
  height:10px;
/deep/.mint-cell-wrapper
  background-size: 100% 1px;
$ratio = 47
.account
  .top
    .operation-wrapper
      // bottom (-52.2rem/$ratio)
      // padding (62.64rem/$ratio) (52.2rem/$ratio)
      // margin 0 (52.2rem/$ratio)
      // border-radius (20.88rem/$ratio)
      .rCon
        button.withdraw
          // width (156.6rem/$ratio)
          // height (78.3rem/$ratio)
          // line-height (78.3rem/$ratio)
          // margin-right (26.1rem/$ratio)
          // margin-left (52.2rem/$ratio)
          // font-size (36.54rem/$ratio)
        button.recharge
          // width (156.6rem/$ratio)
          // height (78.3rem/$ratio)
          // line-height (78.3rem/$ratio)
          // font-size (36.54rem/$ratio)

      .lCon
        .title
          //font-size (36.54rem/$ratio)
        .value
          // font-size (41.76rem/$ratio)
          // letter-spacing (3.3669rem/$ratio)


</style>
