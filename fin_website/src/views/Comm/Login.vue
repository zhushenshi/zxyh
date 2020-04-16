<template>
  <div class="login"  v-loading="loading">
    <Layout>
      <div slot="main" class="login_box">
        <div class="login_bg">
          <img src="@/assets/imgs/login/demo1.png" alt="" style="width:40%;position: relative;top: 46px;left:60px;">
          <div class="login-inner">
            <div style="line-height:60px;font-size:1.6rem;margin-bottom:20px;">登录</div>
            <el-form :model="loginForm"  ref="numberValidateForm" class="demo-ruleForm" :hide-required-asterisk="true">
              <el-form-item
                prop="phone"
                :rules="[
                  { required: true, message: '请输入手机号码'},
                ]"
              >
                <el-input type="text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" v-model="loginForm.phone"  autocomplete="off" placeholder="用户名/手机号码" class="login_input login_input_username"></el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[
                  { required: true, message: '请输入密码'},
                ]"
                class="nomargin"
              >
                <el-input  type="password"  v-model="loginForm.password" autocomplete="off" placeholder="密码" class="login_input login_input_password"></el-input>
              </el-form-item>
              <el-form-item>
                <div style="font-size:1.2rem;line-height:50px;">
                  <router-link  to="/register" class="fl">立即注册</router-link>
                  <router-link  to="/findPassword" class="fr">忘记密码</router-link>
                </div>
              </el-form-item>
              <el-form-item>
                <button class="button--primary" style="width:98%;" @click.prevent="login">
                  登录
                </button>
              </el-form-item>
            </el-form>

          </div>
        </div>        
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
export default {
  data(){
    return {
      loginForm: {
        phone : '',
        password : '',
      },
      loading:false
    }
  },
  components: {
    Layout,
  },
  methods:{
    login(){
        this.$refs['numberValidateForm'].validate((valid) => {
          if (valid) {
             this.loading=true
             this.$ajax({url:'/login?phone='+this.loginForm.phone+'&password='+this.loginForm.password}).then((res)=>{
                this.loading=false
                  if(res.status === '200'){
                        this.$message({
                          message: res.msg,
                          type: 'success'
                        });
                        this.$store.commit("token", res.token);
                        this.$router.push({ path: '/account/myAccount' })
                        sessionStorage.setItem('$token', res.token);
                      }
                      else{
                          this.$message({
                          message: res.msg,
                          type: 'error'
                        });
                      }
              })
          }
        })
    }
  }

}
</script>
<style lang="stylus" scope>
@import "../../assets/stylus/btn"
.login{
  position relative
  height 100%
}
.login_box{
  width: 1120px;
  margin: 0 auto 50px;
}
.login_bg {
    background-color: #fff;
    height: 468px;
}
.login-inner {
    float:right;
    text-align: center;
    box-sizing: border-box;
    padding:0 20px;
    height: 360px;
    margin:64px 80px;;
    width:342px;
    border: 1px solid #E8E8E8;
    /deep/ .el-input__inner{
      padding 0 43px!important;
    }
    .login_input{
      position relative
    }
    .login_input:before{
      content "";
      width 21px;
      height 21px
      display block;
      position absolute;
      top:0;
      bottom:0;
      margin auto 11px
    }
    .login_input_username:before{
      background url("../../assets/imgs/login/icon-ren.png") no-repeat scroll 3px 0
    }
    .login_input_password:before{
      background url("../../assets/imgs/login/icon-suo.png") no-repeat scroll 3px 0
    }
}
.el-form-item{
  margin-top:10px;
}
</style>
