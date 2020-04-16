<template>
  <div >
    <div class="changeMobile bg-white">
        <div class="safeTitle">
             <span class="tit">修改手机号码</span>
        </div>
         <el-form  label-width="108px" :rules="rules" ref="editPwdForm"  :model="editPwdForm" :hide-required-asterisk="true">
              <p class="warnTip">提示：修改手机号码成功后，请您使用新手机号码登录19理财</p>
              <el-form-item label="手机号码:" prop="username" :rules="[{required: true, message: '请输入手机号码'}, { pattern:/^1[345789]\d{9}$/, message: '手机号码格式错误，请录入正确的手机号码' }]">
                <el-input  v-model="editPwdForm.username" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item prop="code" label="验证码:" class="input-box">
                <el-input class="short-input" placeholder="请输入验证码" v-model.trim="editPwdForm.code" @keyup.enter.native="login"></el-input>
                <div class="codeDiv">
                  <img :src="codeUrl" class="codeImg" @click="getCodeUrl"  alt="验证码图片">
                <a href="javascript:void(0);" class="regRefresh"></a>
                </div>
            </el-form-item>
              <el-form-item class="btn" >
                  <button class="button--primary" style="width:100px;"  @click.prevent="submitBtn">修改</button>
                  <button class="button--primary" style="width:100px;margin-left:79px;" @click.prevent="$router.back(-1)">返回</button>
              </el-form-item>
            </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      codeUrl:"",
        editPwdForm:{
          pass: '',
          checkPass: '',
        },
        rules:{
          
        }
    }
  },
    methods:{ 
      submitBtn(){
         this.$refs['editPwdForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCodeUrl(){

      }
    }
}
</script>
<style lang="stylus" scoped> 
 @import "../../assets/stylus/btn"
  .changeMobile
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;  
    .safeTitle
        margin: 20px 40px;
        line-height: 36px;
        height: 36px;
        border-bottom: 1px solid #e2e2e2
        .tit
            font-size: 18px;
            border-bottom: 1px solid #fe294f;
            position: relative;
            display: inline-block;
            line-height: 34px;
            top: 2px;
            float: left 
.warnTip
   font-size: 12px;
   margin: 30px 48px;
   color:#666666;
.el-form
    margin 60px 30px
/deep/ .el-form-item__label{
    font-size 12px;
}
/deep/ .el-form-item{
margin-bottom 12px;
}
/deep/ .el-form-item__content{
    height 50px;
.el-input{
    width:282px;  
    .el-input__inner{
    height:38px;
    font-size:13px;
    }    
}
/deep/ .el-form-item__error{
display:inline-block;
position:relative;
margin-left:15px;
}
}
.btn{
   margin-top 40px;
    }
.short-input{
  width:21% !important;
}
.codeDiv{
  position: absolute;
  top: 2px;
  left: 21%;
  overflow:hidden;
}
.codeImg{
    border: 1px solid #dcdcdc;
    border-radius: 0 3px 3px 0;
    width: 70px;
    height: 36px;
    cursor: default;
    float: left;
}
.regRefresh {
    width: 44px;
    height: 36px;
    border: 1px solid #dcdcdc;
    background: url(./../../assets/imgs/resetPwd.png)  0 -126px;
    float: left;
    cursor: pointer;
    border-radius: 3px;
    margin-left: 10px;
} 
</style>