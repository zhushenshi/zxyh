<template>
  <div >
    <div class="toWithdraw bg-white">
      <div class="title">
        <span class="tit">提现</span>
      </div>
      <div class="withdrawInfo">
         <div class="withdrawCard">
            <div class="withdrawContent">
               <el-form  label-width="105px" label-position="left" :rules="rules" ref="withdrawForm"  :model="withdrawForm" :hide-required-asterisk="true">
             <el-form-item  label="我的银行卡：" class="input-box">
             		<p class="cardNum"><span>****</span>&emsp;<span>****</span>&emsp;<span>****</span>&emsp;<span>{{list.cardNumber?list.cardNumber.slice(-4,):''}}</span></p>
            </el-form-item>
              <el-form-item  label="开户银行：" class="input-box">
              {{list.bankName}}
            </el-form-item>
            <el-form-item  label="可用余额：" class="input-box">
                <span class="cost">{{accountBalance}}元</span>
            </el-form-item>
              <el-form-item prop="balance"  label="提现金额：" class="input-box">
                 <el-input class="short-input" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" maxlength="6" placeholder="请输入提现金额" v-model.trim="withdrawForm.balance"></el-input>
            </el-form-item>
            <el-form-item  label="手续费：" class="input-box">
              <span class="cost">0元</span>
            </el-form-item>
              <el-form-item>
                 <button class="withdraw" style="width:116px;"  @click.prevent="submitBtn">提现</button>
              </el-form-item>
            </el-form>
            <div class="withdrawBox">
              <p class="withdrawTitle">温馨提示</p>
              <p>1.提现资金2小时到账；</p>
              <p>2.提现当日单笔限额5万元,当天累计提现金额50万元；</p>
              <p>3.提现资金默认到新浪支付电子账户开户时绑定的银行卡中。</p>
            </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
     var validateAmount = (rule, value, callback) => {
        let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
        if (value === '') {
          callback(new Error('请正确输入充值金额'));
        } 
        else if(!numReg.test(value)) {
           callback(new Error('请正确输入充值金额(最多两位小数)'));
        }
       else{
          callback();
       }
      };
    return {
      list:{},
      accountBalance:'',
      withdrawForm:{
          balance:""
        },
      rules:{
            balance: [
                 {  validator: validateAmount, trigger: 'blur'}
          ],
        }
    }
  },
  created(){
         this.$ajax({url:'/account',method:"get"}).then((data)=>{
              if(data.status=="200"){
                 this.accountBalance=data.balance?data.balance:'0.00';
              } 
        })
    this.getData()
  },
  methods:{
      getData(){
          this.$ajax({url:'/account/bankcard'}).then((data)=>{
              if(data.status=="200"){
                this.list=data.list
                 
              } 
        })
      },
    submitBtn(){
      this.$refs['withdrawForm'].validate((valid) => {
          if (valid) {
            let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
            this.$ajax({url:'/account/withdraw',params:{
                 amount:parseFloat(this.withdrawForm.balance),
              }}).then((data)=>{
                if(data.status=="200"){
                 loading.close()
                       this.$message({
                          message:data.msg,
                          type: 'success'
                    });
                   this.$router.push({ path: '/account/rechargeWithdraw' })
                }    
              })
          }
        });
    },
  }
}
</script>
<style lang="stylus" scoped> 
 @import "../../assets/stylus/btn"
  .toWithdraw
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;  
    .title
      margin: 20px 46px;
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
    .withdrawInfo
        padding-bottom 30px
.withdraw
  margin 30px auto
.el-form
    margin 30px 20px 20px 50px
/deep/ .el-form-item__label{
    font-size 12px;
}
/deep/ .el-form-item{
margin-bottom 5px;
}
/deep/ .el-form-item__content{
    font-size 12px;
    color #666666
.el-input{
    width:242px;  
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
.withdraw
  background: #ff6461;
  background-image : url(../../assets/iconGroup_1.png);
  background-position:25px -56px;
  background-repeat: no-repeat;
  border-color: #ff9600;
  font-size: 15px;
  border-radius: 3px;
  display: inline-block;
  text-align: center;
  text-indent: 22px;
  font-family: Microsoft Yahei;
  height 34px
  line-height 10px
  color #ffffff
  margin-top 10px
.cost
  color #ff6461
  font-size 18px
.withdrawBox
  margin 20px 45px
  padding 15px
  border #e2e2e2 solid 1px
  border-radius 3px
  .withdrawTitle
    font-size 16px
    color #3b8cde
    margin-bottom 5px
</style>