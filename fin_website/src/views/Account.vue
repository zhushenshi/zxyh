<template>
  <div>
    <Layout>
      <div slot="main">
        <div class="helloBox">
          <div class="content">
            <div class="left">
              <span :class="[hoursTip>=12&& hoursTip<24?helloIcon:'',otherClass]"></span>
              <div class="fl helloText" v-if="hoursTip>=12&& hoursTip<24">                
                <div>下午好！亲爱的 <span class="infoColor">{{custName}}</span></div>
                一丝牵挂，三言两语，凝聚深深的情谊；淡淡问候，只表心意，惦记人生一路风雨；岁月荏苒，唯愿不要渐渐萎靡，只求幸福越积越深，永不离去！祝您幸福！
              </div>
               <div class="fl helloText" v-if='hoursTip>=0 &&hoursTip<12'>                
                <div>上午好！亲爱的 <span class="infoColor">{{custName}}</span></div>
                  推开一扇窗，屋子里才会充满光亮；为心灵打开一扇窗，才能体验更多的鸟语花香。让心融入世界，把温暖注入心房。上午快乐！
              </div>
            </div>
            <div class="right">
                <div class="panel clearfix">
                  <router-link to="/" class="fl panel1"></router-link>
                  <router-link to="/account/bindCard" class="fl" :class="binkCardStatus==1?'panel2':'panels'" title="绑定银行卡">
                   <div class="bubbleS1" v-if="binkCardStatus==0"></div>
                  </router-link>
                  <router-link to="/account/accountManage" class="fl panel3" :class="binkCardStatus==1?'panels':'panel3s'"  title="绑定银行卡"></router-link>
                </div>
                <div class="tips">
                  <span>安全等级：<span class="infoColor">中</span></span>
                  <span><span style="font-size:12px;margin-right:10px;">进入</span><router-link class="infoColor"  to="/account/accountManage">安全中心</router-link></span>
                </div>
            </div>
          </div>
        </div>
        <div class="content box">
          <el-container>
            <el-container>
              <el-aside width="212px">
                <div class="aside text-center">
                  <!-- <p class="helloInfo">今天是您加入19理财的第<span>587</span>天</p> -->
                  <div class="btnBox">          
                       <button class="button--principal" @click="gotoInvest" style="width:55%;font-size:15px;padding:10px 0;">充值提现</button>            
                  </div>
                  <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    active-text-color="#383838">
                    <el-menu-item index="/account/myInvestment">
                      <span class="accountIcon myInvestment"></span>
                      <span slot="title">我的投资</span>
                    </el-menu-item>
                    <el-menu-item index="/account/myLoan">
                      <span class="accountIcon myLoan"></span>
                      <span slot="title">我的借款</span>
                    </el-menu-item>
                    <el-menu-item index="/account/myMessage">
                      <span class="accountIcon myMessage"></span>
                      <span slot="title">我的消息</span>
                    </el-menu-item>
                    <el-menu-item index="/account/myRedBag">
                      <span class="accountIcon myRedwallet"></span>
                      <span slot="title">我的红包</span>
                    </el-menu-item>
                     <el-menu-item index="/account/myRewards">
                      <span class="accountIcon myRewards"></span>
                      <span slot="title">我的奖励</span>
                    </el-menu-item>
                    <el-menu-item  @click.native="getNum">
                      <span class="accountIcon myEvaluation"></span>
                      <span slot="title">风险评估</span>
                    </el-menu-item>
                    <el-menu-item index="/account/inviteFriends">
                      <span class="accountIcon myInvite"></span>
                        <span slot="title">邀请好友</span>
                    </el-menu-item>
                    <el-menu-item index="/account/accountManage">
                      <span class="accountIcon myAccount"></span>
                      <span slot="title">账户管理</span>
                    </el-menu-item>
                  </el-menu>                    
                </div>
              </el-aside>
              <el-main style="padding:0 0 0 20px;">
                <router-view></router-view>
              </el-main>
            </el-container>
          </el-container>
        </div>
      </div>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
export default {
  data(){
    return {
      hoursTip:'',
      otherClass:'otherClass',
      helloIcon:'helloIcon',
      assessResult:'',
      assess:''
    }
  },
  methods:{
    gotoInvest(){
      if(this.binkCardStatus==1){
        this.$router.push({ path: '/account/rechargeWithdraw' })
      }
      else{
         this.$confirm('您尚未绑卡，点击确定跳转到绑卡页面?', '操作提示', {
          cancelButtonText: '取消',
          cancelButtonClass: 'button--gray fr mt15',
          confirmButtonText: '确定',
          confirmButtonClass: 'button--principal fr mR20 mt15',
          type: 'warning'
        }).then(() => {
           this.$router.push({ path: '/account/bindCard' })
        }).catch(() => {
               return
        });

      }
      
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getNum(){
      this.$ajax({url:'/account/isriskassess',method:"get"}).then((data)=>{
              if(data.results==0){
                this.$router.push({ path: '/account/assess' })   
              }
              else {
                 this.$router.push({ path: '/account/assessResult' }) 
              }
        })
    }
  },
  computed: {
        custName:{
          get (){
               return this.$store.state.custName
           },
          set(val){}
        },
          binkCardStatus() {
            return this.$store.state.isBindCard==true?1:0
        }
    },
  created () {
   this.hoursTip=new Date().getHours();          
  },
  components: {
    Layout,
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/stylus/btn"
  .helloBox
    height: 126px;
    background: url(../../public/img/hello_box_bg.jpg) center;
    .left
      color: #fff;
      float: left;
      font-size: 15px;
      padding-top: 31px;
      width: 732px;
      .helloIcon
        background url(../../public/img/account_icons.png) no-repeat
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 10px;
        position: relative;
        background-position: -317px -1px;
      .otherClass
        background url(../../public/img/account_icons.png) no-repeat
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 10px;
        position: relative;
        background-position: 0 -3px;
      .helloText
        width: 648px;
        div
          margin-bottom 5px;
    .right
      padding-top: 18px;
      float: right;
      color: #fff;
      .panel
        margin-bottom 10px
        a
          display: block;
          margin-right: 25px;
          width: 41px;
          height: 41px;
          position relative
          background url(../../public/img/account_icons.png) no-repeat
        .panel1
          background-position: -129px -79px;
        .panel2
          background-position: -86px -79px;
        .panels
          background-position: -86px -120px;
        .panel3
          background-position: 0 -79px;
        .panel3s
          background-position: 0 -120px;
      .tips
        font-size: 15px;
        >span:nth-child(1)
          margin-right:60px;
  .box
    padding:20px 40px 30px 40px;
    box-sizing:border-box;
    .aside
      background-color #ffffff
      border: 1px solid #e2e2e2;
      .helloInfo
        background: url(../../public/img/helloInfo.jpg) no-repeat;
        color: #fff;
        height: 48px;
        line-height: 48px;
        span
          color: #fccf57;
          font-size: 1.7rem;
          font-weight bold
      .btnBox
        padding 25px 0 20px
        margin 0 15px
        border-bottom: 1px dashed #e2e2e2;
        text-align center
      .accountIcon
        margin-right: 8px;
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(../../public/img/account_icons.png) no-repeat;
      .myInvestment
        background-position: -121px -43px;
      .myLoan
        background-position: -290px -44px;
      .myMessage
        background-position: -162px -44px;
      .myRedwallet
        background-position: -39px -44px;
      .myEvaluation
        background-position: -344px -44px;
      .myInvite
        background-position: 0 -44px;
      .myAccount
        background-position: -317px -44px;
      .myRewards
        margin-right: 8px;
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(../../public/img/myRedwallet.png) no-repeat;
      /deep/ .el-menu-item, .el-submenu__title
        height 48px
        line-height 48px
        color #383838
      /deep/ .el-menu-item:focus, .el-menu-item:hover {
          outline: 0;
          background-color: #f0f1f2;
          border-left: 4px solid #ff6461;
          color #ff6461!important
          position relative
      }
.bubbleS1{
  width: 113px;
  height: 52px;
  position: absolute;
  left:12px
  background: url(../assets/imgs/youhaoli.png) no-repeat center;
  animation: myMove 2s infinite;
  -webkit-animation: myMove 2s infinite;
        /* infinite 表示无限循环 */
}
 @keyframes myMove {
        0% {
            top: -48px;
        }

        50% {
            top: -52px;
        }

        100% {
            top: -48px;
        }
    }

    @-webkit-keyframes myMove {
        0% {
            top: -42px;
        }

        50% {
            top: -50px;
        }

        100% {
            top: -48px;
        }
    }
</style>