<template>
  <div class="header">
    <div class="header-top">
      <div class="content">
        <el-row>
          <el-col :span="12" class="text-left">
            <span class="text">客服热线：</span>
            <span class="text-red">400-600-1919</span>
          </el-col>
          <el-col :span="12" class="text-right">
            <ul class="inline-ul">
              <li v-if="loginInfo">您好, {{custName}}</li>
              <li v-if="loginInfo"><router-link to="/account/myAccount">我的账户</router-link> </li>
              <li v-if="loginInfo"><a @click="signOut">安全退出</a></li>
              <li v-if="!loginInfo"><router-link to="/login">登录</router-link></li>
              <li v-if="!loginInfo"><router-link to="/register">注册</router-link></li>
              <!-- <li><router-link to="/newguide">新手指引</router-link></li>
              <li><router-link to="/helpCenter">帮助中心</router-link></li> -->
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="header-nav">
      <div class="content">
        <el-row>
          <el-col :span="12" class="text-left">
            <router-link to="/">
              <img class="logo" src="../assets/imgs/logo.png" alt="">
            </router-link>
          </el-col>
          <el-col :span="12" class="text-right">
            <ul class="inline-ul">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/investment">投资理财</router-link></li>
              <!-- <li><router-link to="/">安全保障</router-link></li>
              <li><router-link to="/">信息披露</router-link></li> -->
              <li v-if="loginInfo"><router-link to="/account/myAccount">我的账户</router-link></li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default{
   data(){
    return {
     }
    },
    computed:{
      custName:{
          get (){
               return this.$store.state.custName
           },
          set(val){}
        },
      loginInfo(){
        return this.$store.state.token
      }
    },
    created(){
      this.getAccountStatus()
    },
    methods:{
      //退出
    signOut(){
      sessionStorage.setItem('$token', '');   
      this.$store.commit("token", '');
      this.$router.push({ path: '/' })  
    },
    //账户激活状态
    getAccountStatus(){
      if(sessionStorage.getItem('$token')){
        this.$ajax({url:'/account/security',method:"get"}).then((data)=>{
          this.custName=data.custName
          this.$store.commit("custName", data.custName);
          // 登录密码设置状态
          // this.userAccountStatus.loginPassword=data.setPass==1?true:false
          // 绑定手机状态
          // this.userAccountStatus.phoneSet=data.setphone==1?true:false
          // 新浪账户激活状态   是否已经绑卡
          let isBindCard=data.binkCardStatus=='1'?true:false
          console.log(isBindCard)
          this.$store.commit("isBindCard", isBindCard);//是否已经绑卡
          // 新浪支付帐户交易密码设置状态
          // this.userAccountStatus.paymentPasswordSet=data.setSinaPass==1?true:false          
        })
      }
    },
    },
  mounted () {
    //登录成功返回信息
    //  this.loginInfo= sessionStorage.getItem('$token')
},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  .header-top
    height 34px
    line-height 34px
    background #EEEEEE
    border-bottom 1px solid #D3D3D3
    box-sizing border-box
  .header-nav
    height 87px
    line-height 87px
    background #ffffff
    border-bottom 1px solid #D3D3D3
    box-sizing border-box
    font-size 16px
    .text-right,.text-left
      height 87px
    a
      display inline-block
      height 86px
      .logo
        width 134px
        height 56px
        margin-top 12px
    .inline-ul
      li
        margin 0 20px
      li:last-child
        a
          color $text-color
  .content
    width 1120px
.router-link-exact-active{
  color:red
  }
.myAccount{
  margin-left 5px;
}
.inline-ul li a{
  cursor pointer
}
</style>
