<template>
  <div >
    <div class="toRecharge bg-white">
      <div class="title">
        <span class="tit">充值</span>
      </div>
      <div class="rechargeInfo">
        <ul class="rechargeTop">
          <li>
            <p class="rechargeAmount1">可用余额（元）</p>
            <p class="rechargeAmount2">{{accountBalance}}</p>
          </li>
           <li>
             <div class="s_cardA fl">
							<p class="pLeft">
							</p>
							<div class="partMain">
                <s class="bank_logo bkLg_sina"></s>
                <p class="pt30">{{list.bankName}}</p>
                <p><span class="mr30">开户人：{{list.custName}}</span>
                可用余额：{{accountBalance}}元
                </p>
								<p class="cardNum"><span>****</span>&emsp;<span>****</span>&emsp;<span>****</span>&emsp;<span>{{list.cardNumber?list.cardNumber.slice(-4,):''}}</span></p>
							</div>
							<p class="pRight">
							</p>
						</div>
           </li>
        </ul>
         <div class="rechargeCard">
            <ul class="cardUl">
              <li class="rechargeName current">充值</li>
            </ul>
            <div class="rechargeContent">
              <el-form  label-width="108px" :rules="rules" ref="rechargeForm"  :model="rechargeForm" :hide-required-asterisk="true">
                  <el-form-item  label="我的银行卡：" class="input-box">
                    <span>****</span><span>****</span><span>****</span><span>{{list.cardNumber?list.cardNumber.slice(-4,):''}}</span>
                  </el-form-item>
                    <el-form-item  label="开户银行：" class="input-box">
                    {{list.bankName}}
                  </el-form-item>
                    <el-form-item prop="chargeMoney"  label="充值金额：" class="input-box">
                      <el-input  placeholder="请输入充值金额" :readonly="!canChange" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"  v-model.trim="rechargeForm.chargeMoney" maxlength="6"></el-input>
                  </el-form-item>
                  <el-form-item  label="手续费：" class="input-box">
                    <span class="cost">0元</span>
                  </el-form-item>
                  <el-form-item  label="到账金额：" class="input-box">
                      <span class="cost">{{rechargeForm.chargeMoney?rechargeForm.chargeMoney:'0'}}元</span>
                  </el-form-item>
                  <el-form-item label="手机验证码:" prop="smsCode" :rules="[{required: true, message: '请输入手机验证码'}]">
                        <el-input v-model="rechargeForm.smsCode" placeholder="验证码" class="phoneYzm"></el-input>
                      <div style="display:inline-block"> 
                          <button  class="button--primary" style="width:102px;font-size:12px;margin-left:15px;" :disabled="enableClick"  @click.prevent="getSmsCode">{{Buttoncontent}}</button>
                      </div>
                  </el-form-item>
                    <el-form-item>
                      <button class="Recharge"  style="width:162px;"  @click.prevent="submitBtn">充值</button>
                    </el-form-item>
            </el-form>
            </div>
         </div>
         <div class="rechargeCard">
            <ul class="cardUl">
              <li :class="{'current': activeName === 'first'}" @click="handelChange('first')">温馨提示</li>
              <li :class="{'current': activeName === 'second'}" @click="handelChange('second')">充值遇到的问题</li>
            </ul>
            <div class="rechargeContent">
              <div class="rechargeTip" v-if="activeName === 'first'">
                 <p>1.快捷充值资金实时到账； </p>
                 <p>2.快捷充值单日充值次数上限为10次； </p>
                 <p>3.快捷充值具体限额请参考平台提供的限额表。</p>
                 <div class="payTable">
                   <p>新浪支付快捷充值限额表</p>
                    <table>
                      <thead>
                        <tr>              
                      <th style="width:186px">银行(借记卡)</th>
                      <th style="width:194px">首次绑卡支付</th>
                      <th style="width:334px">已绑卡支付</th> 
                      </tr>          
                      </thead>
                      <tbody>
                        <tr>
                          <td>中国银行</td>
                          <td>5W</td>
                          <td>单笔5W/日50W</td>
                        </tr>
                        <tr>
                          <td>建设银行</td>
                          <td>5W</td>
                          <td>单笔5W/日20W</td>
                        </tr>
                        <tr>
                          <td>工商银行</td>
                          <td>5K</td>
                          <td>单笔5K/日5K</td>
                        </tr>
                        <tr>
                          <td>中信银行</td>
                          <td>5K</td>
                          <td>单笔5K/日2W/月5W</td>
                        </tr>
                        <tr>
                          <td>兴业银行</td>
                          <td>5W</td>
                          <td>单笔5W/日5W</td>
                        </tr>
                        <tr>
                          <td>光大银行</td>
                          <td>5W</td>
                          <td>单笔5W/日10W</td>
                        </tr>
                        <tr>
                          <td>上海银行</td>
                          <td>5K</td>
                          <td>单笔5K/日1W/月2W</td>
                        </tr>
                        <tr>
                          <td>邮储银行</td>
                          <td>5K</td>
                          <td>单笔5K/日5K</td>
                        </tr>
                        <tr>
                          <td>平安银行</td>
                          <td>5W</td>
                          <td>单笔5W/日5W</td>
                        </tr>
                        <tr>
                          <td>浦发银行</td>
                          <td>5W</td>
                          <td>单笔5W/日5W</td>
                        </tr>
                        <tr>
                          <td>交通银行</td>
                          <td>9999元</td>
                          <td>单笔9999元/日50W</td>
                      </tr>
                        <tr>
                              <td>广发银行</td>
                              <td>2W</td>
                              <td>单笔2W/日2W/月20W</td>
                        </tr>
                        <tr>
                              <td>华夏银行</td>
                              <td>5K</td>
                              <td>单笔5K/日1W</td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="tifFood">
                      <p>1.此限额参考表更新于2018年4月12日。</p>
                      <p>2.充值限额可参考上表，具体的额度以发卡银行为准。如果您在发卡银行设置的支付额度低于此表限额，以您的设置为准。</p>
                    </div>
                 </div>
              </div>
              <div class="rechargeProblem" v-if="activeName === 'second'">
                <p>1、充值方式有哪些？</p>
								<p class="pl20">
									快捷充值，将您认证银行卡中的资金充值到新浪支付电子账户中。
								</p>
								<p>2、充值到账时间？</p>
								<p class="pl20">
									快捷充值实时到账，转账充值到账时间以您选择的转账方式限定到账时间为准。			
								</p>
								<p>3、充值显示不支持此银行卡或者不能支付？</p>
								<p class="pl20">
									请核对绑定的银行卡是否属于新浪支付支持的银行卡，详见【温馨提示】新浪支付快捷充值列表。			
								</p>
								<p>4、充值有没有限额要求？</p>
								<p class="pl20">
									根据新浪支付规定，对于投资用户充值根据不同的银行有不同的限额要求，包括首次绑卡用户、单笔充值限额、单日累计充值限额，<br>
									详见【温馨提示】新浪支付快捷充值限额表。			
								</p>
								<p>5、如何查看充值记录？</p>
								<p class="pl20">
									进入【我的账户】—【充值提现】，页面下方即可查询您的充值资金记录。
								</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
var timerT1;
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
      Buttoncontent:'获取',
      enableClick:false,
      timer:60,
      accountBalance:'',
      activeName:"first",
      list:{},
      canChange:true,
      transId:'',
      disableBtn:'false',
      rechargeForm:{
          chargeMoney:"",
          smsCode:'',
        },
        codeUrl:"",
        rules:{
            chargeMoney: [
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
      this.$refs['rechargeForm'].validate((valid) => {
          if (valid) {
            if(this.disableBtn=='true'){
             let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
              this.$ajax({url:'/account/rechargeConfirm',params:{
                 amount:parseFloat(this.rechargeForm.chargeMoney),
                 smsCode:this.rechargeForm.smsCode,
                 transId:this.transId
              }}).then((data)=>{
                if(data.status=="200"){
                 loading.close()
                   this.$message({
                          message: "充值成功",
                          type: 'success'
                    });
                   this.$router.push({ path: '/account/rechargeWithdraw' })  
                }
              })
            }
             else {
            this.$message.error({message:"请先获取验证码"})
          }
          }
        });
    },
    handelChange(val){
      this.activeName=val   
    },
    getSmsCode(){  
      var _this = this;
         _this.$refs.rechargeForm.validateField('chargeMoney',(errorMsg)=>{
            if(!errorMsg){
              console.log(111)
                   _this.$ajax({url:'/account/recharge',params:{
                 amount:parseFloat(_this.rechargeForm.chargeMoney),
              }}).then((data)=>{
                  if(data.status=='200'){
                      _this.enableClick = true
                    _this.$message({
                          message: "发送成功",
                          type: 'success'
                    });
                    _this.disableBtn='true'
                    _this.canChange=false//金额不可 修改
                    _this.transId=data.transId
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
                  }
                },
                
              )
  
            }
            })
 
    }, 
  }
}
</script>
<style lang="stylus" scoped> 
 @import "../../assets/stylus/btn"
  .toRecharge
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
    .rechargeInfo
        padding-bottom 30px
        .rechargeTop
          overflow hidden
          margin 0 40px
          border-bottom: 1px dashed #d3d3d3;
          li
           float left
           text-align center
           width 50%
           height 205px
           .rechargeAmount1
             font-size 14px
             margin-top 50px
           .rechargeAmount2
              font-size 22px
              color #ff6461
              margin-top 10px
.s_cardA
    position: relative;
    padding: 0 22px;
    color: #666;
    display: inline-block;
    min-width: 286px
    .pLeft
        left: 0;
        background: url(../../assets/card_L.jpg) no-repeat
        width: 22px;
        height: 173px;
        position: absolute;
        top: 0;
    .partMain 
        background: url(../../assets/card_repeat.jpg) repeat-x;
        height: 129px;
        padding: 22px 0;
    .bank_logo
        position: absolute;
        top: 22px;
        right: 2px;
        z-index: 1;
        background-repeat: no-repeat;
        background-position: right top;
    .bkLg_sina
        background: url(../../assets/yinlian.png);
        width: 50px;
        height: 50px
        background-size contain
    .pt30
        text-align left
        padding-top: 30px !important;
    .mr30
        margin-right 30px
    .cardNum
        font-size: 19px;
        color: #111;
        padding-top: 9px;
    .pRight
        right: 0;
        background: url(../../assets/card_R.jpg) no-repeat; 
        width: 22px;
        height: 173px;
        position: absolute;
        top: 0;
.rechargeCard
  margin 30px 40px
  .cardUl
    position relative
    top 1px
    overflow hidden
    li
      cursor pointer
      background #fafafa
      float left
      width 160px
      color: #666666;
      border: 1px solid #e2e2e2;
      border-radius: 5px 5px 0 0
      text-align center
      height: 41px;
      line-height: 41px;
      font-size 15px
      margin-right 13px
    .current
      color: #349cd8;
      border-bottom-color: #fff;
      background #ffffff
  .rechargeContent
      border: 1px solid #e2e2e2;
      border-radius: 0px 5px 5px 5px
.el-form
    margin 30px 15px
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
    width:282px;  
    .el-input__inner{
    height:38px;
    font-size:13px;
    }
.phoneYzm{
      width:100px !important
    }
}
/deep/ .el-form-item__error{
display:inline-block;
position:relative;
margin-left:15px;
}
}
.btn
   margin-top 40px;
.short-input
  width:21% !important;
.codeDiv
  position: absolute;
  top: 2px;
  left: 21%;
  overflow:hidden;
.Recharge
  background: #ff9600;
  background-image: url(../../assets/iconGroup_1.png);
  background-position:56px 11px;
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
  color #ff9600
  font-size 20px
.rechargeTip
  padding: 20px 20px 0
  font-size 12px
  .payTable
    p
      text-align center
    table
      margin 0 30px
      thead
        background #f1f1f1
        th
          border: #ccc solid 1px
          line-height: 30px;
      td
        border: #ccc solid 1px
        line-height: 30px;
        text-align center
    .tifFood
      margin 20px 30px
      p
        text-align left
        color #fcb733
.rechargeProblem
  padding: 20px 20px 30px
  .pl20
      padding-left: 20px;
.rechargeYzmBtn
    background #ff9600
    color #ffffff
    width 80px
    margin-left 10px 
</style>