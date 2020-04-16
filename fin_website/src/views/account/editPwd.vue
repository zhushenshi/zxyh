<template>
  <div >
    <div class="editPwd bg-white">
        <div class="safeTitle">
             <span class="tit">修改登录密码</span>
        </div>
         <el-form  label-width="108px" :rules="rules" ref="editPwdForm"  :model="editPwdForm" :hide-required-asterisk="true">
              <el-form-item label="旧密码:" prop="oldpass" :rules="[{required: true, message: '请输入旧密码'}]">
                <el-input   type="password" v-model.trim="editPwdForm.oldpass" placeholder="请输入旧密码"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="password">
                <el-input  type="password"  v-model.trim="editPwdForm.password" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPass">
                <el-input   type="password" v-model.trim="editPwdForm.checkPass" placeholder="请输入确认密码"></el-input>
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
   var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/.test(value)){
           callback(new Error('请输入6-16位字符,必须包含数字和字母！'));
        }
        else {
          if (this.editPwdForm.checkPass !== '') {
            this.$refs.editPwdForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } 
        else if(!/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/.test(value)){
           callback(new Error('请输入6-16位字符,必须包含数字和字母！'));
        }
        else if (value !== this.editPwdForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        editPwdForm:{
          password: '',
          checkPass: '',
          oldpass:''
        },
        rules:{
           password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
    }
  },
    methods:{ 
      submitBtn(){
         this.$refs['editPwdForm'].validate((valid) => {
          if (valid) {
             this.$ajax({
              url:'/account/resetpass',
              method:"PUT",
              params:{oldpass:this.editPwdForm.oldpass,password:this.editPwdForm.password}
            }).then((res)=>{
             if(res.status="200"){
                this.$message({
                          message: res.msg,
                          type: 'success'
                  });
                  this.$router.back(-1)
               
            }
           else {
              this.$message({
                          message: res.msg,
                          type: 'error'
                        });
          }
            })
          }
        });
      }
    }
}
</script>
<style lang="stylus" scoped> 
 @import "../../assets/stylus/btn"
  .editPwd
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;  
    .safeTitle
        margin: 20px;
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
</style>