<template>
  <div>
    <div class="user">
      <MyHeader :title="'修改密码'" v-if="!isWeixin"></MyHeader>
      <ul class="uesr_paw" style="border-top:1px solid #F5F5F5;">
        <li class="paw_l1">
          <img src="../../../assets/images/lockOpen@3x.png"/>
        </li>
        <li class="paw_l2">
          <input type="password" placeholder="请输入旧密码" @input.stop="ToCheckInfo" @focus="focusValue('oldpassClear',true)" @blur="focusValue('oldpassClear',false)" v-model.trim="form1.oldpass"/>
          <div class="mint-field-clear clear" :class="{show:form1.oldpass&&oldpassClear}" @click="clear('oldpass',$event)"><i class="mintui mintui-field-error"></i></div>
        </li>
      </ul>

      <ul class="uesr_paw">
        <li class="paw_l1">
          <img src="../../../assets/images/paw@3x.png"/>
        </li>
        <li class="paw_l2">
          <input type="password" placeholder="请输入新密码(6-16位字母、数字、下划线)" @input.stop="ToCheckInfo" @focus="focusValue('passwordClear',true)" @blur="focusValue('passwordClear',false)" v-model.trim="form1.password"/>
           <div class="mint-field-clear clear" :class="{show:form1.password&&passwordClear}" @click="clear('password',$event)"><i class="mintui mintui-field-error"></i></div>
        </li>
      </ul>
      <ul class="uesr_paw">
        <li class="paw_l1">
          <img src="../../../assets/images/paw@3x.png"/>
        </li>
        <li class="paw_l2">
          <input type="password" placeholder="请确认新密码(6-16位字母、数字、下划线)" @input.stop="ToCheckInfo" @focus="focusValue('password2Clear',true)" @blur="focusValue('password2Clear',false)" v-model.trim="form1.password2"/>
           <div class="mint-field-clear clear" :class="{show:form1.password2&&password2Clear}" @click="clear('password2',$event)"><i class="mintui mintui-field-error"></i></div>
        </li>
      </ul>
    </div>
    <div :class="{logo_btn:true,logo_btn1:fullInfoFlag,}" @click="changepwd">
      确认
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/login.css'
  import  axios from 'axios'
  import {baseURL,baseURLVerifyImg} from '../../../vuex/url.js'
  export default {
    name: 'modifyPassword',
    data() {
      return {
          form1:{
            oldpass:'',
            password:'',
            password2:''
          },
          oldpassClear:false,
          passwordClear:false,
          password2Clear:false,
          fullInfoFlag:false
      }
    },
    methods:{
      changepwd(){
        if(this.checkInfo()){
            this.$ajax(
            'put',
            baseURL+'/account/resetpass?oldpass='
            +this.form1.oldpass+'&password='+this.form1.password,
            '',
            function(data){
                this.$router.push('/login')
            }.bind(this)
          )
        }
          

      },
      clear(value,e){
        // console.log(this.$el);	
        this.form1[value]="";			
        e.currentTarget.previousElementSibling.focus();
        this.ToCheckInfo();
        
      },
      focusValue(tar,val){
         this[tar]=val;
        //  this.checkInfo();			
			},
      checkInfo () {
				let telReg = /^1[345789]\d{9}$/;
				let numReg = /^[0-9a-zA-Z_]{6,20}$/;
				let This=this;
				if (!this.form1.oldpass) {
					This.$Toast({
					message: '旧密码不能为空',
					position: 'bottom'
					})
					return false
				} else if (!this.form1.password||!this.form1.password2) {
					This.$Toast({
					message: '新密码不能为空',
					position: 'bottom'
					})
					return false
				}else if (!numReg.test(this.form1.password)) {
					This.$Toast({
					message: '密码格式不正确(6-16位字母、数字、下划线)',
					position: 'bottom'
					})
					return false
				}else if (this.form1.password!=this.form1.password2) {
					This.$Toast({
					message: '两次密码输入不一致',
					position: 'bottom'
					})
					return false
				}
				return true
				},
				ToCheckInfo(){
					if(this.form1.oldpass&&this.form1.password&&this.form1.password2){
						this.fullInfoFlag = true;
					}else{
						this.fullInfoFlag = false;
					}
				}
    }
  }
</script>
<style type="text/css" scoped="scoped">
		.user input::-webkit-input-placeholder{
      font-family: PingFangSC-Medium;
			font-size: 12px;
			color: #bcbcbc;
			letter-spacing: -0.2px;
        }
    .user input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      font-family: PingFangSC-Medium;
			font-size: 12px;
			color: #bcbcbc;
			letter-spacing: -0.2px;
        }
    .user input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      font-family: PingFangSC-Medium;
			font-size: 12px;
			color: #bcbcbc;
			letter-spacing: -0.2px;
        }
    .paw_l2 {
      position:relative;
    }
    .paw_l2 input{
      font-size: 12px;
      color: #B0B0B0;
      letter-spacing: 1.45px;
      width:100%; 
      }
</style>
<style>
  body{background:#FFFFFF;}
  .user{height:auto;}
  .logo_btn{height:44px;line-height:44px;background-color: #ffc99d;}
  .logo_btn1{height:44px;line-height:44px;background-color: #fb7f24;}
</style>
