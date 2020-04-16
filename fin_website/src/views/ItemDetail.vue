<template>
  <div class="itemDetail">
    <Layout>
      <div slot="main">
        <div class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <span class="fl positionIcon"><i></i>您的当前位置:</span>
            <el-breadcrumb-item>投资理财</el-breadcrumb-item>
            <el-breadcrumb-item>信用系列</el-breadcrumb-item>
            <el-breadcrumb-item>项目详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content itemInfo clearfix">
          <div class="fl left bg-white">
            <div class="title">
              <img src="../../public/img/icon_new.png">
              <span>{{detailsData.bidsInformation.bidsName}}</span>
            </div>
            <div class="numShow_area">
              <div class="colN_1 fl">
                <p class="iconC_Nlight"></p>
                <p class="colorB1 mb10">预期年化收益率：</p>
                <p class="rate">
                  <span>{{detailsData.productBaseInfo.realyRate}}</span>					
                </p>
              </div>
              <div class="colN_2 fl">
                <p v-if="is_current==0">
                  <span  class="colorB1">项目金额(元)：</span>
                  <span >{{!detailsData.bidsInformation.loanaMount?'--':detailsData.bidsInformation.loanaMount}}</span>
                  <!-- <span >&nbsp;元</span> -->
                </p>
                <p class="lineH1 mt_s1 mb10" v-if="is_current==0">
                  <span class="colorB1">项目期限：</span>  
                    {{detailsData.productBaseInfo.periods  }}         
                  <span class="small">&nbsp;天</span>
                </p>
                <p class="lineH1 mt_s1 mb10" v-else>
                  <span class="colorB1">项目期限：</span>
                  <span class="small">长期</span>
                </p>                  
              </div>
            </div>

            <div class="info_bottom clearfix">
              <div class="fl space1">
                <div class="mb30">
                  <span class="iconBackGround save"></span>
                  保障方式：100%适用于用户利益保障机制                  
                </div>
                <div class="mb30">
                  <span class="iconBackGround iconTime"></span>
                  投标进度：<el-progress :percentage="is_current==0?detailsData.productBaseInfo.progress:50" style="width:220px;display:inline-block;"></el-progress>                
                </div>
              </div>
              <div class="fl space2">
                <div class="mb30">
                  <span class="iconBackGround iconC_quit"></span>
                  还款方式：{{is_current == 1?'按月付息':detailsData.productBaseInfo.redeemType}}
                </div>
                <div class="mb30">
                  <span class="iconBackGround iconC_date"></span>
                  剩余时间：<CountDownTimer v-if="is_current==0" style="display: inline-block;" :deadline="detailsData.productBaseInfo.preparationDate ?  detailsData.productBaseInfo.preparationDate.replace('  ',' ') : ''"></CountDownTimer>
                   <span v-else>长期</span>
                </div>
              </div>
            </div>

          </div>
          <div class="right" v-if="true">
            <div class="title">
              <span>投资金额</span>
            </div>
            <div class="rightBox">
              <p class="itemMoney" v-if="is_current==0">可投金额：<span class="money">{{(!detailsData.productBaseInfo.InvestableBalances?'--':detailsData.productBaseInfo.InvestableBalances)|moneyToFixed(2)}}</span>元</p>
              <p class="userInverInfo">可用余额：
                <span v-if="!isLogin"><router-link to='/login' style="color:#3b8cde;">登录</router-link>后可见</span>
                <span v-if="isLogin&&!this.$store.state.isBindCard">未<router-link to='/account/bindCard' style="color:#3b8cde;">开通</router-link>资金账户</span>
                <span v-if="isLogin&&this.$store.state.isBindCard==true">{{detailsData.userInfo.balance|moneyToFixed(2)}}元</span>
                <span class="fr rightBtn" v-if="isLogin&&this.$store.state.isBindCard==true">
                  <a @click="getData()">刷新余额</a>
                  <a @click="goPage('/account/toRecharge')">充值</a>
                </span>
              </p>
              <p class="userInverInfo" v-if="isLogin&&this.$store.state.isBindCard==true">
                <span>已使用红包：</span>
                <span class="moneyColor">{{detailsData.userInfo.voucher}}元</span>
                <a class="fr moneyColor" @click="openRedBagDialog(0,btnUseAble)">使用红包</a>
              </p>
              <p class="userInverInfo" v-if="isLogin&&this.$store.state.isBindCard==true&&this.is_current != 1">
                <span>已使用加息券：</span>
                <span class="moneyColor">{{detailsData.userInfo.interestCoupons}}</span>张
                <a class="fr moneyColor" @click="openRedBagDialog(1,btnUseAble)">使用加息券</a>
              </p>
              <div class="btnBox">
                <el-input :readonly="amountFlag" v-model.number="amount" onkeyup="value=value.replace(/[^\d]/g,'');" :placeholder="detailsData.productBaseInfo.InvestMin+'元起投'" class="fl">
                  <template slot="append">元</template>
                  </el-input>
              </div>
              <div>
                <button class="button--principal" @click="gotoInvest" style="width:98%;font-size:20px;margin:20px auto;">
                  立即购买
                </button>                
              </div>


            </div>
          </div>
          <div class="right text-center" v-else>
            <p class="mt30 mb15">满标人次</p>
            <p class="count">1人</p>
            <p class="mt30">满标日期</p>
            <p class="mt30 date">2018-06-25</p>
            <span class="statueSign"></span>
          </div>
        </div>
        <div class="content tabs mt30">
          <div class="bg-white">
            <el-tabs v-model="activeName" type="border-card" :stretch="true">
              <el-tab-pane label="基本信息" name="first">
                <div class="tabContent">
                  <ul>
                    <li v-if="is_current==0" ><span>总融资</span><span>{{(!detailsData.bidsInformation.loanaMount?'--':detailsData.bidsInformation.loanaMount)|moneyToFixed(2)}}</span></li>
                    <li v-if="is_current==0" ><span>可投金额</span><span>{{(!detailsData.productBaseInfo.InvestableBalances?'--':detailsData.productBaseInfo.InvestableBalances)|moneyToFixed(2) }}&nbsp;元</span></li>
                    <li><span>还款方式</span><span>{{is_current == 1?'按月付息':detailsData.productBaseInfo.redeemType}}</span></li>
                    <li><span>起投金额</span><span>	{{detailsData.productBaseInfo.InvestMin|moneyToFixed(2)}}&nbsp;元</span></li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目详情" name="second">
                <div class="tabContent">
                  <ul>
                    <li><span>{{detailsData.productBaseInfo.projectRemark?detailsData.productBaseInfo.projectRemark:'暂无描述'}}</span></li>
                  </ul>
                </div>                
              </el-tab-pane>
              <el-tab-pane label="投资记录" name="third">
                <div class="tabContent">
                  <div class="mb15">投标总额：<span class="infoColor">¥{{totalInvestment|moneyToFixed(2)}}</span>&nbsp;&nbsp;投标人次：<span class="infoColor">{{participants}}人</span></div>
                  <el-table
                    :data="tableData"
                    stripe
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{textAlign:'center',backgroundColor:'#eeeeee'}"
                    style="width: 100%;border:1px solid #EBEEF5;">
                    <el-table-column
                      prop="date"
                      label="序号"
                      type="index">
                    </el-table-column>
                    <el-table-column
                      prop="investors"
                      label="投资人姓名">
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="投资金额（元）">
                    </el-table-column>
                    <el-table-column
                      prop="fmtCustMobile"
                      label="手机号码">
                    </el-table-column>
                    <el-table-column
                      prop="date"
                      label="日期">
                    </el-table-column>
                  </el-table>
                </div>                  
              </el-tab-pane>
              <!-- <el-tab-pane label="收益计划" name="fourth">
                <div class="tabContent">
                  <div class="mb15"><span class="infoTipsColor">* 此收益基于项目初始总金额计算得来</span></div>
                  <el-table
                    :data="tableData"
                    stripe
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{textAlign:'center',backgroundColor:'#eeeeee'}"
                    style="width: 100%;border:1px solid #EBEEF5;">
                    <el-table-column
                      prop="date"
                      label="序号"
                      type="index">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="原始债务人姓名">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="身份证号码">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="手机号码">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="借款金额">
                    </el-table-column>
                  </el-table>                  
                </div>                   
              </el-tab-pane>
              <el-tab-pane label="风险提示" name="five">
                <div class="tabContent2">
                  <div class="title">风险提示书</div>
                  <div class="text">19理财在线郑重提示：用户应自行对交易风险进行全面了解、充分认识、谨慎决策，用户应对其决策承担全部责任并承担全部风险。如用户通过19理财平台进行投资操作，即表示已经认真阅读本提示书并完全了解与接受。</div>
                  <br>
                  <div class="title">特别提示</div>
                  <div class="text">本风险提示书不能穷尽全部风险及市场的全部情形。</div>
                </div>
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </div>
        <el-dialog
          title="测评提示"
          :visible.sync="dialogVisible"
          width="550px"
          class="assessDialog">
          <p>尊敬的客户：</p>
          <p>我司已根据最新的监管要求启用了网贷投资人风险评测问卷，请您通过如下链接填写问卷，以便我司对您的风险承受能力进行综合评估：</p>              
          <span slot="footer" class="dialog-footer">        
            <button class="button--principal" @click="goPage('/account/assessResult')" style="font-size:16px;margin:0 auto 20px;">
              <span style="padding:0 10px;">网贷投资人风险评测问卷</span>
            </button>
          </span>
        </el-dialog>        
        <el-dialog
          title="使用红包"
          :visible.sync="redBagVisible"
          width="850px">
          <RedBag :tempOrderID="tempOrderID" :amount="amount?amount:0" :pageSize="4" v-if="redBagVisible" ref="redBag"></RedBag>
          <span slot="footer" class="dialog-footer">        
            <el-button class="button--principal" style="padding:9px 15px;font-size:12px;" @click="chooseRedBag(0,'redBag')">确定</el-button>
            <el-button class="button--gray" style="padding:9px 15px;font-size:12px;" @click="redBagVisible=false">取消</el-button>
          </span>
        </el-dialog>        
        <el-dialog
          title="使用加息券"
          :visible.sync="InterestVouchersVisible"
          width="800px">
          <InterestVouchers :tempOrderID="tempOrderID" :amount="amount?amount:0" :pageSize="4" v-if="InterestVouchersVisible" ref="interestVouchers"></InterestVouchers>
          <span slot="footer" class="dialog-footer">        
            <el-button class="button--principal" style="padding:9px 15px;font-size:12px;" @click="chooseRedBag(1,'interestVouchers')">确定</el-button>
            <el-button class="button--gray" style="padding:9px 15px;font-size:12px;" @click="InterestVouchersVisible=false">取消</el-button>
          </span>
        </el-dialog>        
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
import CountDownTimer from '@/components/CountDownTimer.vue';
import RedBag from '@/components/RedBag.vue';
import InterestVouchers from '@/components/InterestVouchers.vue';
export default {
  data(){
    return {
      activeName:'first',
      tableData: [
      ],
      totalInvestment:'0.00',
      participants:'0',
      detailsData: {//项目详细信息
        productBaseInfo: {
          progress: 0,
          creatdate: '',
          leftTiem: '',
          preparationDate: '',
          InvestMin:''
        },
        bidsInformation: {
          bidsName: ''
        },
        userInfo: {
          balance: ''
        }
      },
      amount:'',
      amountFlag:false,
      dialogVisible:false,
      redBagVisible:false,
      InterestVouchersVisible:false,
      tempOrderID:'',
      selectedAmount:'0.00',//红包选择金额
      selected:0,//加息券选择个数
      btnUseAble:false,
      is_current:"",
    }
  },
  created(){
    this.getData()
    this.tempOrderID=this.$store.state.tempOrderID
    this.is_current=this.$route.query.is_current
    console.log( this.tempOrderID)
  },
  methods: {
    getData(){
      let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
      this.$ajax({url:'/product/detail/'+this.$store.state.productId,method:"get"}).then((data)=>{
        loading.close()
        if(data.status === '200'){
          Object.assign(this.detailsData, data)
					if(this.detailsData.productBaseInfo.InvestableBalances<=this.detailsData.productBaseInfo.InvestMin){//可投金额<起投金额
						this.amount=this.detailsData.productBaseInfo.InvestableBalances
						this.amountFlag=true
					}else{
						this.amountFlag=false
          }
					switch(this.detailsData.productBaseInfo.status) {
						case 0:
							this.detailsData.productBaseInfo.status = "募集中";
							break;
						case 1:
							this.detailsData.productBaseInfo.status = "回款中";
							break;
						case 2:
							this.detailsData.productBaseInfo.status = "流标";
							break;
						case 3:
							this.detailsData.productBaseInfo.status = "已满标";
							break;
						case 7:
							this.detailsData.productBaseInfo.status = "已满标";
							break;
						default:
							this.detailsData.productBaseInfo.status = "已结清";
          }
					this.btnUseAble = !(this.detailsData.productBaseInfo.status== '已满标'|| this.detailsData.productBaseInfo.status=='已结清'|| this.detailsData.productBaseInfo.status=='回款中'|| this.detailsData.productBaseInfo.status=='流标')          
           if(this.is_current==1){
						this.detailsData.productBaseInfo.InvestMin=0
					}
        }
      })
    },
    getInvestData(){
      let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
      this.$ajax({url:'/product/Investmentlist/'+this.$store.state.productId,method:"get"}).then((data)=>{
        loading.close()
        if(data.status === '200'){
          this.tableData=data.list
          this.totalInvestment=data.totalInvestment?data.totalInvestment:0//投标总额
          this.participants=data.participants?data.participants:0//投标人次
        }
      })
    },
    gotoInvest(){
      if(this.isLogin){
        if(!this.amount){//已经输入金额
          this.$alert('请输入购买金额', '操作提示', {
            type: 'error'
          }).then(() => {return}).catch(() => {return});
        }else{
          //判断是否已经绑卡
          if(!this.$store.state.isBindCard){//未绑卡
            this.$confirm('您尚未绑卡，点击确定跳转到绑卡页面?', '操作提示', {
              cancelButtonText: '取消',
              cancelButtonClass: 'button--gray fr mt15',
              confirmButtonText: '确定',
              confirmButtonClass: 'button--principal fr mR20 mt15',
              type: 'warning'
            }).then(() => {
              this.goPage('/account/bindCard')
            }).catch(() => {
              return
            });
          }else{//已绑卡
            if(Number(this.detailsData.userInfo.isriskassess)!=1){//判断isriskassess不为1，去评估
              this.dialogVisible=true
            }else{//已评估
            if(this.amount < this.detailsData.productBaseInfo.InvestMin&&!this.amountFlag) {
              this.$alert('购买金额不能低于'+this.detailsData.productBaseInfo.InvestMin+'元!', '操作提示', {
                type: 'error'
              }).then(() => {return}).catch(() => {return});
            } else if((this.amount > this.detailsData.productBaseInfo.InvestableBalances&&!this.amountFlag)&&this.is_current != 1) {
              this.$alert('购买金额不能高于可投金额', '操作提示', {
                type: 'error'
              }).then(() => {return}).catch(() => {return});              
            }else{
							let numReg=/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
							if(numReg.test(this.amount)){
								if(this.amount<=Number(this.detailsData.userInfo.balance)){                  
                  this.$confirm('是否确认投资'+this.amount+'元?', '操作提示', {
                    cancelButtonText: '取消',
                    cancelButtonClass: 'button--gray fr mt15',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'fr mR20 mt15',
                    type: 'warning'
                  }).then(() => {
                    let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
                    this.$ajax({url:'/account/buynow',method:"post",params:{amount:this.amount,orderID:this.$store.state.tempOrderID,type:0}}).then((data)=>{
                      loading.close()
                      if(data.status === '200'){//投资成功
                        this.$alert('投资成功', '操作提示', {
                          type: 'success'
                        }).then(() => {
                          this.getInvestData()
                          this.$router.go(-1)   
                        }).catch(() => {return});
                      }else if(data.status == 301){
                        this.$confirm('已取消不合规则的加息券/红包,是否继续投资?', '温馨提示', {
                          cancelButtonText: '取消',
                          cancelButtonClass: 'button--gray fr mt15',
                          confirmButtonText: '确定',
                          confirmButtonClass: 'button--principal fr mR20 mt15',
                          type: 'warning'
                        }).then(() => {
                          this.gotoInvest()
                        }).catch(() => {
                          return
                        });                        
                      }
                    })

                  }).catch(() => {
                    return
                  });
								}else{
                  this.$alert('账户余额不足', '操作提示', {
                    type: 'error'
                  }).then(() => {return}).catch(() => {return});
								}								
							}else{
                this.$alert('请正确输入投资金额(最多两位小数)', '操作提示', {
                  type: 'error'
                }).then(() => {return}).catch(() => {return});                
							}
            }
            }
          }
        }
      }else{
        this.$confirm('您尚未登录，点击确定跳转到登录页面?', '操作提示', {
          cancelButtonText: '取消',
          cancelButtonClass: 'button--gray fr mt15',
          confirmButtonText: '确定',
          confirmButtonClass: 'button--principal fr mR20 mt15',
          type: 'warning'
        }).then(() => {
          this.goPage('/login')
        }).catch(() => {
          return
        });
      }
    },
    /**选择红包 */
    chooseRedBag(vtype,ref){
      vtype == 0 ?this.selectedAmount=this.$refs[ref].selectedAmount:this.selected=this.$refs[ref].selected
      this.$ajax({url:'/account/usevoucher',method:"get",params:{tempOrderID:this.tempOrderID,id:this.$refs[ref].selectedId,vtype:vtype,amount:this.amount}}).then((data)=>{
        if(data.status=='200'){
          vtype == 0 ? this.redBagVisible=false :this.InterestVouchersVisible=false
          this.getData()
          return
        }else{
          this.$message.error(data.msg);
        }
      })
    },
    openRedBagDialog(type,useable){
      if(!useable)return
      if(this.isLogin){
        if(!this.amount){
          this.$alert('请输入购买金额', '操作提示', {
            type: 'error'
          }).then(() => {return}).catch(() => {return});
        }else{
          if(this.amount < this.detailsData.productBaseInfo.InvestMin) {
            this.$alert('购买金额不能低于'+this.detailsData.productBaseInfo.InvestMin+'元!', '操作提示', {
              type: 'error'
            }).then(() => {return}).catch(() => {return});
          } else if(this.amount > this.detailsData.productBaseInfo.InvestableBalances) {
            this.$alert('购买金额不能高于可投金额', '操作提示', {
              type: 'error'
            }).then(() => {return}).catch(() => {return});              
          } else {
            if(type == 0) {
              this.redBagVisible=true
            } else {
              this.InterestVouchersVisible=true
            }
          }
        }
      }else{
        this.$confirm('您尚未登录，点击确定跳转到登录页面?', '操作提示', {
          cancelButtonText: '取消',
          cancelButtonClass: 'button--gray fr mt15',
          confirmButtonText: '确定',
          confirmButtonClass: 'button--principal fr mR20 mt15',
          type: 'warning'
        }).then(() => {
          this.goPage('/login')
        }).catch(() => {
          return
        });        
      }
    }
  },
  watch:{
    activeName:function(val,oldVal){
      console.log(val,oldVal)
      if(val === 'third')
        this.getInvestData()
    }
  },
  components: {
    Layout,
    CountDownTimer,
    RedBag,
    InterestVouchers
  }
}
</script>
<style lang="stylus">
@import "../assets/stylus/btn"  
</style>
<style lang="stylus" scoped>
@import "../assets/stylus/btn"
  .breadcrumb
    font-size:16px;
    line-height 45px
    .positionIcon
      margin-right:15px;
      i
        display block
        float left
        width: 20px;
        height: 20px;
        margin-top 13px
        background: url('../../public/img/position.png') no-repeat center;
        background-size cover
        margin-right: 5px;
  .itemInfo
    font-size: 16px;
    padding: 0 40px
    box-sizing border-box
    .left
      width: 740px;
      height: 444px;
      .title
        line-height: 47px;
        padding-left: 15px;
        border-bottom: 1px solid #e2e2e2;
        img
          vertical-align middle
          margin-right 15px
          position relative
          top -3px
      .numShow_area
        background: #fafafa;
        padding: 25px 0;
        overflow: hidden;
        width: 686px;
        margin: auto;
        margin-top:12px;
        .colorB1
          color: #808080;  
          font-size 12px      
        .colN_1
          border-right: 1px dashed #d3d3d3;
          width: 255px;
          text-align: center;
          .iconC_Nlight
            width: 52px;
            height: 34px;
            display: inline-block;
            background: url(../../public/img/icon_invest.png);
            background-position: -31px -36px;
          .mb10
            margin-bottom 10px
          .rate
            color: #ff6461;
            font-size: 12px;
            line-height: 30px;
            span
              font-size: 30px;
        .colN_2
          padding-left: 30px;
          line-height: 34px;
          font-size 3rem
          p:first-child
            margin-top 15px
          p:nth-child(2)
            margin-top: 26px;
          .small
            font-size 12px
      
      .info_bottom
        padding 32px 80px 0 80px
        font-size 1.2rem
        .space1
          width: 355px;
          .save
            background-position: 1px -25px;
            width: 18px;
            height: 18px;
            position relative
            top 5px
            margin-right 5px
          .iconTime
            background-position: 3px -130px;
            width: 20px;
            height: 20px;
            position relative
            top 5px
            margin-right 5px
        .space2
          .iconC_quit
            position: relative;
            margin-right: 5px;            
            background-position: 0px -52px;
            width: 18px;
            height: 18px;
            position relative
            top 5px            
          .iconC_date
            position: relative;
            margin-right: 5px;            
            background-position: 0px -105px;
            width: 20px;
            height: 20px;
            position relative
            top 5px
             
    .right
      float right
      height: 444px;
      width: 362px;
      background: #fff;
      color: #808080;
      position: relative; 
      .title
        line-height: 47px;
        padding-left: 15px;
        border-bottom: 1px solid #e2e2e2;
        color #000
      .rightBox
        padding: 5px 20px;
        font-size: 14px;
        .itemMoney
          padding-bottom: 15px;
          border-bottom: 1px dashed #d3d3d3;  
          margin: 5px 0 15px 0;
          .money
            color: #ff6461;
            font-size: 24px  
        .userInverInfo
          margin-bottom 10px
          .rightBtn
            font-size 12px
            :nth-child(1)
              color #ff9600
              cursor pointer
              margin-right 10px;
            :nth-child(2)
              color #3b8cde
              cursor pointer
        .btnBox
          margin:15px 0;
          /deep/ .el-input__inner
            height  46px
      .count
        border-bottom: 1px dashed #d3d3d3;
        padding-bottom: 30px;
        color: #393939;
        font-size: 26px;
        width: 240px;
        margin:0 auto;
      .date
        font-size:26px;
        color: #393939;
      .statueSign
        display: block;
        width: 130px;
        height: 130px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: url(../../public/img/icon_sign.png);
        background-position: 10px -187px;
            
  .tabs
    font-size: 14px;
    padding: 0 40px
    box-sizing border-box
    /deep/ .el-tabs__item.is-active
      color #000
    /deep/ .el-tabs__item
      font-size 18px
      line-height: 50px;
      height  50px
    /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #000;
    }
    .tabContent
      padding: 25px 50px 50px;
      color:#666666;
      ul
        padding-left: 45px; 
        li
          padding: 8px 0;
          :first-child
            width 15%
            display inline-block
    .tabContent2
      padding: 25px 50px 50px;
      .title
        font-size 18px
      .title:before
        content ''
        display inline-block
        width 6px
        height 6px
        border-radius 50%
        background-color #F66060
        position relative
        top -5px
        margin-right 15px
      .text
        text-indent: 2em;
        line-height: 25px;
        margin-top 5px
        color #666666
.iconBackGround
  display: inline-block;
  background: url(../../public/img/icon_invest.png);
/deep/.el-progress-bar
  padding-right: 60px;
  width: 100%;
  margin-right: -65px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
.assessDialog
  /deep/.el-dialog__footer
    text-align center
  /deep/.el-dialog .el-dialog__header
    margin: 0 ;
    padding:0 20px;
    background-color:#F8F8F8
  /deep/.el-dialog
    p
      margin 14px 0
      color #2E2C2C

</style>