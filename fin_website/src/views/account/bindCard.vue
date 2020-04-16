<template>
  <div >
    <div class="editPwd bg-white">
        <div class="safeTitle">
             <span class="tit">电子账户激活</span>
        </div>
         <el-form  label-width="108px" :rules="rules" ref="form"  :model="form" :hide-required-asterisk="true">
              <el-form-item label="真实姓名:" prop="name" :rules="[{required: true, message: '请输入姓名'},
              { pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入中文姓名' }]">
                <el-input  v-model="form.name" placeholder="请务必输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码:" prop="idNo" :rules="[{required: true, message: '请输入身份证号码'},
               { pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式不正确' }]">
                <el-input  v-model="form.idNo" placeholder="请填写身份证号码，X大小写均可" maxlength="18"></el-input>
              </el-form-item>
              <el-form-item label="省份:" prop="provNo" :rules="[{required: true, message: '请选择省份'}]">
                <el-select v-model="form.provNo" placeholder="请选择" @change="changeCity">
                   <el-option v-for="(item,index) in provinceOptions" :key="index" :name="item.provNo" :value="item.name">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="城市:" prop="cityNo" :rules="[{required: true, message: '请选择城市'}]">
                <el-select v-model="form.cityNo" placeholder="请选择">
                   <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="银行卡号:" prop="cardNo" :rules="[{required: true,validator : validateCard, trigger: 'blur'},]">
                <el-input  v-model="form.cardNo" placeholder="请填写银行卡号"></el-input>
                <span class="formTitle" v-show="custBindCard">请填写您本人开户的银行卡号</span>
              </el-form-item>
               <el-form-item label="开户行:" prop="bankCode" :rules="[{required: true, message: '请输入银行卡号'}]">
                <el-select v-model="form.bankCode" placeholder="请选择" @change="getBankName">
                   <el-option v-for="item in bankNameOptions" :key="item.value" :label="item.name" :value="item.code">
                     {{item.name}}
                   </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="手机号码:" prop="tel" :rules="[{required: true,validator:validateTel, message: '请输入手机号码'},]">
                <el-input  v-model.trim="form.tel" maxlength="11" placeholder="请填写手机号码"></el-input>
                <span class="formTitle" v-show="custBindCardMobile">认证手机号须与银行卡预留手机号一致，否则无法绑卡</span>
              </el-form-item>
            </el-form>
            <el-form class="smsCodeForm" :rules="rules" ref="form1"  :model="form1">
               <el-form-item label="手机验证码:" prop="smsCode" :rules="[{ required: true, message: '请输入手机验证码', trigger: 'blur' }]">
                <el-input v-model="form1.smsCode" placeholder="验证码" class="picYzm"></el-input>
                <div style="display:inline-block" v-loading="loading"> 
                    <button  class="button--primary" style="width:102px;font-size:12px;margin-left:15px;" :disabled="enableClick"  @click.prevent="getSmsCode()">{{Buttoncontent}}</button>
                </div>
              </el-form-item>
              <el-form-item class="btn" >
                  <button class="button--primary" style="width:100px;"  @click.prevent="submitBtn">立即认证</button>
                  <button class="button--primary" style="width:100px;margin-left:79px;" @click.prevent="$router.back(-1)">返回</button>
              </el-form-item>
            </el-form>
    </div>
  </div>
</template>
<script>
import {city} from '../../utils/area.js'
var timerT1;
export default {
  data(){
    return {
       validateCard :(rule, value, callback) => {
        if (value === '') {
           this.custBindCard=false
          callback(new Error('请输入银行卡号'));
        } 
        else if(!/^[0-9]{10,20}$/.test(value)){
           this.custBindCard=false
           callback(new Error('银行卡号格式不正确'));
        }
        else {
          callback();
        }
      },
      validateTel:(rule, value, callback) => {
         if(!/^1[3456789]\d{9}$/.test(value)){
           callback(new Error('银行卡号格式不正确'));
           this.custBindCardMobile=false
        }
        else {
          callback();
        }
      },
      loading:false,
      enableClick:false,
      Buttoncontent:"获取",
      custBindCardMobile:true,
      custBindCard:true,
      timer: 60,
      form:{
          name:'',
					idNo:'',
					bankName:'',
					bankCode:'',					
					cardNo:'',
					provNo:'',
					cityNo:'',
					tel:'',
					transId:'===',// 预绑卡返回流水
					merUserId:'===',
        },
        form1:{
          	smsCode:'',
        },
        rules:{       
         
        },
        provinceOptions:[],
        cityOptions:[],
        bankNameOptions:[]
    }
  },
  created(){
    this.provinceOptions=city
    this.getBankName()
     this.$ajax({url:'/account/security',method:'get'}).then((res)=>{
			if(res.status=="200"){
        	this.form.name=res.custName
        this.form.idNo=res.custIc
      }
			})
  },
    methods:{ 
      changeCity(value){
        this.form.cityNo=""
        console.log(this.form.cityNo)
         for (var item of this.provinceOptions) {
            if (item.name === value) {
              this.cityOptions = item.city 
               console.log(item.city)          
              
            } else {
              
            }
          }    
      },
      //获取开户行
      getBankName(value){
            this.$ajax({url:'/ordePay/getBankName',}).then((res)=>{
             if(res.status=="200"){
               this.bankNameOptions=res.data  
                for (var item of this.bankNameOptions) {
                    if (item.code === value) {
                      this.form.bankName= item.name
                      console.log(this.bankName)          
                      
                    } else {
                      
                    }
                  }       
            }
            })
      },
      //获取验证码
      getSmsCode(){
        let _this=this
           _this.enableClick = true;     
          _this.$refs['form'].validate((valid) => {
            if(valid){
             _this.loading=true 
              _this.$ajax({url:'/ordePay/bindingCard',data:_this.form}).then((res)=>{
             if(res.status =="200"){
                _this.loading=false
                 _this.Buttoncontent =  '60s';
								timerT1 = setInterval(function() {
									_this.timer--;
									_this.Buttoncontent = _this.timer +'s'
									if(_this.timer === 0) {
										_this.timer = 60;
										clearInterval(timerT1);
									  _this.Buttoncontent = "重新获取";
										_this.enableClick = false;
									}
                }, 1000)    
                console.log(timerT1)
            }
            })
            }
         })

      },
      submitBtn(){
        let valids
         this.$refs['form'].validate((valid) => {
            this.$refs['form1'].validate(valid2 => {
            valids = valid && valid2
          }) 
          let data={
            name:this.form.name,
            idNo:this.form.idNo,
            bankName:this.form.bankName,
            bankCode:this.form.bankCode,
            cardNo:this.form.cardNo,
            provNo:this.form.provNo,
            cityNo:this.form.cityNo,
            tel:this.form.tel,
            smsCode:this.form1.smsCode
          } 
          if (valids) {
            this.loading=true
            this.$ajax({url:'/ordePay/bindingCardConfirm',data:data}).then((res)=>{
              if(res.status=="200"){
                this.loading=false
                 this.$message({
                                  message: res.msg,
                                  type: 'success'
                     });
               //  this.$router.push({ path: '/account/accountManage' })
                this.$router.back(-1)
              }
              else{
             
                 this.$message({
                                  message: res.msg,
                                  type: 'error'
                                });
              }
            })
          } else {
            return false;
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
    margin 60px 30px 0
/deep/ .el-form-item__label{
    font-size 14px;
}
/deep/ .el-form-item{
margin-bottom 6px;
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
  margin-left 84px
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
.formTitle{
    margin-left 5px
    color: #7f7f7f;
    height: 20px;
    line-height: 20px;
    font-size 13px;
}
.picYzm{
        width:158px !important; 
      }
.smsCodeForm{
  margin 0 40px 60px;
}
</style>