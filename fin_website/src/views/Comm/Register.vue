<template>
  <div class="register">
    <Layout>
      <div slot="main" class="content bg-white clearfix" style="margin: 50px auto 50px;padding-top:50px;">
          <div class="fl" style="width:540px;text-align:center;padding:50px 0; ">
            <img src="@/assets/imgs/login/demo3.png" alt="" style="width:448px;">
          </div>
          <div class="fl">
            <el-form  label-width="108px" :rules="rules" ref="registerForm" :model="registerForm" :hide-required-asterisk="true">
              <!-- <el-form-item label="用户名:" prop="username" :rules="[{required: true, message: '请输入用户名'},{ pattern: /^[a-zA-Z_0-9]{4,16}$/, message: '4-16位，仅可包含字母，数字和下划线' }]">
                <el-input v-model.trim="registerForm.username" placeholder="4-16位，仅可包含字母，数字和下划线"></el-input>
              </el-form-item> -->
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="registerForm.phone" maxlength="11"  placeholder="请输入您本人银行卡绑定的手机号码"></el-input>
              </el-form-item>
              <el-form-item label="登录密码:" prop="password">
                <el-input v-model="registerForm.password" type="password" placeholder="6-16位，必须包含字母和数字"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPwd">
                <el-input v-model="registerForm.checkPwd" type="password"  placeholder="6-16位，必须包含字母和数字"></el-input>
              </el-form-item>           
              <el-form-item label="手机验证码:" prop="code" :rules="[{required: true, message: '请输入手机验证码'}]">
                <el-input v-model="registerForm.code" placeholder="验证码" class="phoneYzm"></el-input>
                <div style="display:inline-block" v-loading="loading"> 
                    <button  class="button--primary" style="width:102px;font-size:12px;margin-left:15px;" :disabled="enableClick"  @click.prevent="getPhoneIdCode">{{Buttoncontent}}</button>
                </div>
              </el-form-item>
              <!-- <el-form-item label="推广码:" prop="eusername">
                <el-input v-model="registerForm.eusername" placeholder="请输入推广人编号"></el-input>
                <span class="tips">如没有请勿填写!</span>
              </el-form-item> -->
               <el-form-item><el-checkbox v-model="checked" @change="registerBox"></el-checkbox><span style="font-size: 13px;color: #AFAFAF;margin-left:10px">我已同意并阅读</span><span class="checkTips"> <router-link to="/registerProtocol">《19理财用户协议》</router-link></span></el-form-item>
              <el-form-item><button :class="[{ 'button--primary': checked==true }, 'disabledBtn']" style="width:256px;" @click.prevent="register" :disabled="enRegister">立即注册</button></el-form-item> 
            </el-form>
          </div>
          <el-dialog
            title="图像验证码"
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose">
           <el-form  ref="imgForm" :model="imgForm" :hide-required-asterisk="true">
              <el-form-item label="图形验证码:" prop="captcha" :rules="[{required: true, message: '请输入图形验证码'}]">
                <el-input v-model="imgForm.captcha" placeholder="验证码" class="picYzm"></el-input>
                <img :src="imgsrc" alt="" style="width:65px;height:36px;border: 1px solid #dcdcdc;vertical-align:middle;">
                <span class="regRefresh" @click.prevent="regRefresh"></span>
              </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click.prevent="imgCode">确 定</el-button>
            </span>
          </el-dialog>
      </div>
    </Layout>
  </div>
</template>

<script>
function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
		s[8] = s[13] = s[18] = s[23] = "-";
		var uuid = s.join("");
		return uuid
	}
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
var timerT1;
export default{
  data(){
      var validatePhone= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } 
        else if(!/^1[345789]\d{9}$/.test(value)){
           callback(new Error('手机号码格式不正确'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/.test(value)){
           callback(new Error('请输入6-16位字符,必须包含数字和字母！'));
        }
        else {
          if (this.registerForm.checkPwd !== '') {
            this.$refs.registerForm.validateField('checkPass');
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
        else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let checkSmscode = (rule, value, callback) => {
      if(this.registerForm.phone === '' ){
            callback(new Error('请输入手机号码'))
        }
      else if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    } 
    return {
      checked: true,
      enRegister:false,
      registerForm: {
        phone : '',
        password: '',
        code:'',
        xcode: uuid(),
      },
    	Buttoncontent: "获取验证码",
      timer: 60,
      isDisabled: false, // 是否禁止点击发送验证码按钮
      rules:{
          phone:[
            { validator: validatePhone, trigger: 'blur' }],
           password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { validator: checkSmscode, trigger: 'blur' }
          ],
          
        },
      imgForm:{
        captcha:''
      },
      imgsrc:'',
      enableClick: false,
      dialogVisible: false,
      loading:false
    }
  },
  components: {
    Layout,
  },
  methods: {
    handleClose() {
        this.dialogVisible=false
        this.$refs.imgForm.resetFields(); 
      },
    registerBox(){
      if(this.checked==true){
        this.enRegister=false
      }
      else{
        this.enRegister=true
      }
    },
    //刷新图片
     regRefresh(){
        var vueThis = this;
        vueThis.random = Math.random(); //通过随机数更改验证码
          vueThis.$refs.registerForm.validateField('phone',(errorMsg)=>{
            if(!errorMsg){
                   vueThis.$ajax({
                        baseURL:'/wx/',
                        url:'/common/captcha?random='+vueThis.random+'&xcode='+vueThis.registerForm.xcode+'&phone='+vueThis.registerForm.phone+'&from='+1,
                        method:"get",           
                        headers: {
                          'Content-Type':'application/x-www-form-urlencoded',
                        }
                        }).then((res)=>{
                          if(res.status == '200') {
                           if(vueThis.imgForm.captcha){
                               vueThis.$refs.registerForm.clearValidate(); 
                                vueThis.$refs.imgForm.resetFields()
                           }
                            vueThis.dialogVisible=true
                            vueThis.imgsrc='data:image/jpg;base64,'+res.imgsrc
                          }else{
                              vueThis.$message({
                                  message: res.msg,
                                  type: 'error'
                                });
                          }
                        })
            }
          })
     },
    	getPhoneIdCode() {
         this.regRefresh()
      },
      //图片验证
       imgCode(){
        this.$refs['imgForm'].validate((valid) => {
                if(valid){
                  this.dialogVisible=false
                  this.getTestCode()
                  
                }})
     },
      getTestCode() {//获取手机验证码
        var vueThis = this;
        vueThis.loading=true
				var params = {
					"phone": vueThis.registerForm.phone,
					captcha: vueThis.imgForm.captcha,
          xcode:vueThis.registerForm.xcode
        }
          vueThis.$ajax({url:'/vericode',params:params,method:"get"}).then((res)=>{
               if(res.status=='200'){
                  vueThis.loading=false
                  vueThis.disableButton()
                  vueThis.$message({
                          message: res.msg,
                        type: 'success'
                    });
               }
               else{
                   vueThis.loading=false
                   vueThis.$message({
                                  message: res.msg,
                                  type: 'error'
                    });
               }
            })
      },
    	disableButton() {
				var vueThis = this;
				vueThis.enableClick = true;
				// vueThis.getTestCode();
				vueThis.Buttoncontent =  '60s后重新获取';
				timerT1 = setInterval(function() {
					vueThis.timer--;
					vueThis.Buttoncontent = vueThis.timer +'s后重新获取'
					if(vueThis.timer === 0) {
						vueThis.timer = 60;
						clearInterval(timerT1);
						vueThis.Buttoncontent = "重新获取";
						vueThis.enableClick = false;
					}
				}, 1000)
      },
      register(){
         this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
             this.$ajax({
              url:'/reg',
              data:this.registerForm
            }).then((res)=>{
              loading.close()
              if(res.status === '200'){
                this.$message({
                  message: "注册成功",
                  type: 'success'
                 });
                  this.$router.push({ path: '/login' })
              }
              else{
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        })
      }
    }
}
</script>
<style lang="stylus">
  @import "../../assets/stylus/btn"
  .register{
    /deep/ .el-form-item__label{
      font-size 12px;
    }
    /deep/ .el-form-item{
      margin-bottom 12px;
    }
    /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color #ff6131 !important
      border-color #ff6131 !important
    }
     /deep/.el-checkbox__input.is-focus .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      border-color #eee !important
    }
    /deep/ .el-form-item__content{
      .el-input{
        width:271px;  
        .el-input__inner{
          height:38px;
          border: 1px solid #d3d3d3;
          font-size:13px;
        }    
      }
      .phoneYzm{
        width:156px; 
      }
      .picYzm{
        width:129px; 
      }
    }
    /deep/ .el-form-item__error{
      display:inline-block;
      position:relative;
      margin-left:15px;
    }
    .tips{
      color: #797979;
      margin-left:15px;
      font-size:12px;
    }
    .regRefresh{
      width: 44px;
      height: 36px;
      border: 1px solid #dcdcdc;
      background: url(../../assets/imgs/login/resetPwd.png) 0 -124px;
      cursor: pointer;
      border-radius: 3px;
      margin-left: 10px;
      padding 9px 22px;
    }
    .checkTips{
      color #383838
      font-size 12px
      padding-left:10px;
      a{
        color:#4171D3;
      }
    }
  }
.disabledBtn{
  background #eeeeee
  color #ffffff
  border none
  cursor: no-drop
}
.button--primary{
  background #ff6131
  cursor pointer
}
</style>