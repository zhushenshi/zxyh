<template>
  <div class="findPassword">
    <Layout>
      <div slot="main" class="content bg-white clearfix" style="margin:30px auto 50px;padding-top:10px;">
          <div class="title">
          <span class="tit">找回密码</span>
        </div>
         <div class="deployBox">
         <el-steps :active="active"  align-center space="550px">
           <el-step title="输入手机号码"></el-step>
           <el-step title="输入验证码"></el-step>
           <el-step title="输入新密码"></el-step>
           <el-step title="成功"></el-step>
         </el-steps>
         </div>
         <div class="findPasswordForm" v-if="active===0">
            <el-form  label-width="108px" :model="registerForm" ref="registerForm" label-position="left" :hide-required-asterisk="true">
              <el-form-item label="手机号码：" prop="phone" :rules="[{required: true, message: '请输入手机号码'}]">
                <el-input maxlength="11" v-model="registerForm.phone" placeholder="请输入您注册时的手机号码"></el-input>
              </el-form-item>
              <!--  -->
            </el-form>
         </div>
         <div v-if="active===1" class="findPasswordForm" >
            <el-form  label-width="108px" :model="findPasswordForm2" ref="findPasswordForm2" label-position="left" :hide-required-asterisk="true">
              <el-form-item label="手机号码：">
                {{registerForm.phone}}  
              </el-form-item>
              <el-form-item label="图形验证码：" prop="captcha" :rules="[{required: true, message: '请输入图形验证码'}]">
                <el-input v-model="findPasswordForm2.captcha" placeholder="图形验证码" class="picYzm"></el-input>
                <img :src="imgsrc" alt="" style="width:65px;height:36px;border: 1px solid #dcdcdc;vertical-align:middle;margin-left:15px">
                <span class="regRefresh" @click="regRefresh()"></span>
              </el-form-item>
              <el-form-item label="验证码：" prop="code" :rules="[{required: true, message: '请输入手机验证码'}]">
                <el-input v-model="findPasswordForm2.code" placeholder="验证码" class="picYzm"></el-input>
                <div v-loading="loading" style="display:inline-block">
                      <button class="button--primary"  style="width:102px;font-size:12px;margin-left:15px;" :disabled="enableClick"  @click.prevent="getTestCode">{{Buttoncontent}}</button>
                </div>
              </el-form-item>
            </el-form>
         </div>
         <div  class="findPasswordForm" :rules="rules" v-if="active===2">
             <el-form  label-width="108px" :model="findPasswordForm3" ref="findPasswordForm3" label-position="left" :hide-required-asterisk="true">
              <el-form-item label="新密码:" prop="password" :rules="[{ required: true, validator: validatePass, trigger: 'blur' }]">
                 <el-input  type="password"  v-model="findPasswordForm3.password" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPass" :rules="[{ required: true, validator: validatePass2, trigger: 'blur' }]">
                <el-input   type="password" v-model="findPasswordForm3.checkPass" placeholder="请输入确认密码"></el-input>
              </el-form-item>
            </el-form>
         </div>
          <div  class="findPasswordForm" v-if="active===3">
             <p class="success">
               <span></span>恭喜您，修改密码成功!</p>
         </div>
        <div class="btnDiv" v-if="active !=3">
            <el-button class="button--primary" @click="next">下一步</el-button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
var timerT1;
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
export default{
  data(){
      return {
        validatePass:(rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/.test(value)){
           callback(new Error('请输入6-16位字符,必须包含数字和字母！'));
        }
        else {
          if (this.findPasswordForm3.checkPass !== '') {
            this.$refs.findPasswordForm3.validateField('checkPass');
          }
          callback();
        }
      },
       validatePass2:(rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } 
        else if(!/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/.test(value)){
           callback(new Error('请输入6-16位字符,必须包含数字和字母！'));
        }
        else if (value !== this.findPasswordForm3.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      active:0,
      registerForm:{
       
      },
      findPasswordForm2:{
        code:'',
        xcode: uuid(),
        phone : '',         

      },
      findPasswordForm3:{
         password: '',
         checkPass: '',
      },
      imgsrc:'',
      rules:{},
      enableClick: false,
      Buttoncontent: "获取验证码",
      timer: 60,
      isClick:"",
      loading:false
    }
  },
  components: {
    Layout,
  },
  methods: {
        //刷新图片
     regRefresh(){
        var vueThis = this;
        vueThis.random = Math.random(); //通过随机数更改验证码
          vueThis.$ajax({
              baseURL:'/wx/',
              url:'/common/captcha?random='+vueThis.random+'&xcode='+vueThis.findPasswordForm2.xcode+'&phone='+vueThis.registerForm.phone+'&from='+2,
              method:"get",           
              headers: {
                'Content-Type':'application/x-www-form-urlencoded',
              }
              }).then((res)=>{
                if(res.status == '200') {
                  vueThis.imgsrc='data:image/jpg;base64,'+res.imgsrc
                }else{
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
      getTestCode() {//获取手机验证码
      	var vueThis = this;
        vueThis.isClick=0
				var params = {
					"phone": vueThis.registerForm.phone,
					captcha: vueThis.findPasswordForm2.captcha,
          xcode:vueThis.findPasswordForm2.xcode
        }
        vueThis.$refs.findPasswordForm2.validateField('captcha',(errorMsg)=>{
        if(!errorMsg){
             vueThis.loading=true
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
                vueThis.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        })
        }
        })
      },
    next() {
        if(this.active===0){
          this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            this.regRefresh()
            this.active++
          } else {
            return
          }
       })
        }
        else if(this.active===1){
            this.$refs['findPasswordForm2'].validate((valid) => {
          if (valid) {
            console.log(this.isClick)
            if(this.isClick !==0){
              this.$message({
                    message: "请先获取手机验证码",
                    type: 'error'
                });
            }
            else{
              this.active++
            }          
          } else {
            return
          }
        })
        }
         else if(this.active===2){
            this.$refs['findPasswordForm3'].validate((valid) => {
              if (valid) {
                  console.log(this.active)
                  this.editSucess()
              } else {
                return
              }
        })
        }
      },
      editSucess(){
        var params = {
					"phone": this.registerForm.phone,
					code: this.findPasswordForm2.code,
          password:this.findPasswordForm3.password
        }
        this.loading=true
             this.$ajax({
              url:'/forgetpass',
              params:params            
            }).then((res)=>{
              if(res.status === '200'){
                this.loading=false
                // this.$message({
                //   message:res.msg,
                //   type: 'success'
                //  });
                 this.active++
              }
              else{
                this.$message({
                  message: res.msg,
                  type: 'error'
                 });
                 
              }
            })
      }
  }
}
</script>
<style lang="stylus">
  @import "../../assets/stylus/btn"
.content
  width 1120px
  .title
      margin: 10px 46px;
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
.deployBox
  margin-top 50px
  width 90%
  margin-left 8%
.findPasswordForm{
    margin 30px 0 0 30%
    /deep/ .el-form-item__label{
      font-size 12px;
    }
    /deep/ .el-form-item{
      margin-bottom 12px;
    }
    /deep/ .el-form-item__content{
      .el-input{
        width:256px;  
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
.btnDiv
  text-align center
  padding-bottom 50px
  .button--primary
    background #ff6461
 .el-step__title.is-process
  color #ffae2b
  font-size 15px
  font-weight normal
  margin-top 15px
.el-step__head.is-process
    color: #ffae2b;
    border-color: #ffae2b
.el-step__head.is-finish
    color: #ffae2b;
    border-color: #ffae2b;
.el-step__title.is-finish
    color: #ffae2b;
    font-size 15px
    margin-top 15px
.is-process .el-step__icon
    background #ffae2b
    color #FFFFFF
.is-wait
    color: #ffffff !important
    border-color: #E5E5E5 !important

.is-wait .el-step__icon
    background #E5E5E5
    color #b0b0b0
.is-finish .el-step__icon
    background #ffae2b
    color #FFFFFF
.is-finish .el-step__line
    background #ffae2b
.el-step__icon
    color #FFFFFF
    width 40px
    height 40px
    background #E5E5E5
.el-step.is-horizontal .el-step__line
    top 20px
 .el-step__line
    width 80%
    left 60% !important
    background #E5E5E5
.success
   color #ff6461
   font-size 24px
   margin: 50px 0 50px 12%;
   padding-bottom 100px
   span
      top: 11px;
      position: relative;
      width: 38px;
      height: 38px;
      display: inline-block;
      background: url(../../assets/common_ico.png) 3px -40px
</style>