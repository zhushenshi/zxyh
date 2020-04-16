<template>
  <div  v-loading="loading">
     <div class="rechargeWithdraw bg-white">
        <div class="rechargeWithdrawBox1">
          <p class="amount">可用余额： <span>{{accountBalance}} </span><span>元</span></p>
          <div class="rechargeWithdrawDiv border">
              <div class="RechargeDiv ">
                <router-link to="/account/toRecharge">
                  <button class="Recharge btn">充值</button>
                </router-link>
              </div>
              <div class="Reminder">
                  <p class="ReminderTitle">温馨提示：</p>
                  <p>1、快捷充值资金实时到账；</p>
                  <p>2、充值前请先开通新浪支付电子账户；</p>
                  <p>3、快捷充值具体限额请参考充值页面的限额表。</p>
              </div>
          </div>
           <div class="rechargeWithdrawDiv">
              <div class="RechargeDiv">
                 <router-link to="/account/toWithdraw">
                  <button class="Withdraw btn">提现</button>
                 </router-link>
              </div>
              <div class="Reminder">
                  <p class="ReminderTitle">温馨提示：</p>
                  <p>1、用户每日T+0提现到账的额度为1万元，超过额度的提现业务按照T+1/T+2规则到账（当日15点
                前提交提现申请，T+1到账，超过15点的T+2到账）；</p>
                  <p>2、提现当日单笔限额5万元，当天累积提现额度50万元；；</p>
                  <p>3、提现资金默认到新浪支付电子账户开户时绑定的银行卡中。</p>
              </div>
          </div>
        </div>
           
    </div>
     <div class="rechargeWithdrawBox2">
               <div class="title">
                  <span class="tit">充值提现记录</span>
                  <span class="record">(应银行要求,仅可查询最近
                      <i>一个月</i>内的流水)</span>
              </div>   
        </div>
    <div class="bg-white">
      <div class="tabContent">
        <div>
          起止日期：
          <el-date-picker
            v-model="startDate"
            type="date"
            size="mini"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          -
          <el-date-picker
            v-model="endDate" 
            type="date"
            size="mini"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          <button class="button--principal"  @click="queryConfirm">
            检索
          </button>                                  
          <!-- <button class="button--principal">
            清空
          </button> -->
          <a @click="searchBtn('taday')">今天</a>
          <a @click="searchBtn('week')">最近一周</a>
          <a @click="searchBtn('month')">1个月</a>
        </div> 
        <div class="transactionType">
          交易类型：
          <a :class="{'active': activeName === 0}" @click="choseSeries(0)">全部</a>
          <a :class="{'active': activeName === 1}" @click="choseSeries(1)">充值</a>
          <a :class="{'active': activeName === 2}" @click="choseSeries(2)">提现</a>
        </div>
        <div class="mt15 tabChilds">
          <div class="tabContentChild">
            <ul class="recordUl">
              <li>时间</li>
              <li>交易类型</li>
              <li>金额(元)|明细(元)</li>
            </ul>
             <div class="contentItems">
                <div class="itemsLeft" v-for="(item,index) in filterList" :key="index">
                   <p class="itemsTime">{{item.createFormatDate}}</p>
                   <p class="itemsType">{{item.trade_type==0?('充值'+(item.status==0?'确认中':item.status==1?'成功':'失败')):item.trade_type==1?('提现'+(item.status==1?'成功':(item.status==2||item.status==3||item.status==5)?'失败':'审核中')):'其他'}}</p>
                   <p :class="{itemsAll:true,success:checkState(item.status)}">{{item.amount}}</p>                
                </div>
            </div>
            <div class="noRecord" v-show="filterList.length==0">暂无数据</div>
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
    return {
      accountBalance:'',
      activeName:0,
      startDate:'',
      endDate:'',
      pageList: [],
      filterList: [],
      chose: 0,
      success:false,
      loading:false
    }
  },
  created(){
       let nowDay=new Date();
      let y=nowDay.getFullYear();
      let m=nowDay.getMonth()+1;
      let d=nowDay.getDate();
      if(m<10){m='0'+m}
      if(d<10){d='0'+d}
      //this.startDate=y+'-'+m+'-'+d;
      this.endDate=y+'-'+m+'-'+d;
      this.startDate = this.getPreMonth();
      this.getAmount()
      this.getRecords()
  },
  methods: {
    getPreMonth(type) {
      let date = this.endDate;
      let arr = date.split('-');
      let year = arr[0]; //获取当前日期的年份
      let month = arr[1]; //获取当前日期的月份
      let day = arr[2]; //获取当前日期的日
      let days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      let year2 = year;
      let month2 = parseInt(month) - 1;
      if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
      }
      let t2;
      let day2 = day;
       day2=parseInt(day2)+1;
      if(day2<10){
            day2='0'+day2;
        }
      if (month2 < 10) {
          month2 = '0' + month2;
        }
      if(!type){
          let days2 = new Date(year2, month2, 0);
          days2 = days2.getDate();
          if (day2 > days2) {
              day2 = days2;
          }    
         t2= year2 + '-' + month2 + '-' + day2;
        }
        else if(type){
         var date1 = new Date(),time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
         var date2 = new Date(date1);
          date2.setDate(date1.getDate()-7);
          t2= year2 + '-' + month2 + '-' + date2.getDate();
        }
      return t2;
    },
    //检索
    queryConfirm(){
      if(!this.startDate){
            this.$message.error('请选择开始时间');
            return;
        }
        if(!this.endDate){
            this.$message.error('请选择结束时间');
            return;
        }
        let s = new Date(this.startDate).getTime();
        let e = new Date(this.endDate).getTime();
        if(s > e) {
          this.$message.error('请正确选择时间范围');
          return;
        }
        let differ=this.getTimeDiffer(this.endDate,this.startDate);
        if(differ>=30){
           this.$message.error('最多只能查询29天的记录！')
            return;
        }
        this.choseSeries(this.chose);
    },
       getTimeDiffer ($time1, $time2) {
        var time1 = arguments[0], time2 = arguments[1];
        time1 = Date.parse(time1)/1000;
        time2 = Date.parse(time2)/1000;
        var time_ = time1 - time2;
        return (time_/(3600*24));
    },
     getAmount(){
       this.$ajax({url:'/account',method:"get"}).then((data)=>{
              if(data.status=="200"){
                 this.accountBalance=data.balance?data.balance:'0.00';
              } 
        })
    },
    getRecords(){
      let This=this
      This.loading=true
        this.$ajax({url:'/account/deallist',
        method:'get',
        params:{
          curpage:1,
          pagesize:2000000000,
          startDate:This.startDate,
          endDate:This.endDate
        }}).then((data)=>{
              if(data.status=="200"){
                 This.loading=false
                This.pageList=data.pageInfo.list;
                This.filter()
              } 
        })
    },
     filter () {
        this.filterList=[];
        if(this.chose===0){
            this.filterList=this.pageList;
        }else{
            for(var i=0;i<this.pageList.length;i++){
                if(this.chose==1&&Number(this.pageList[i].trade_type==0)){//充值
                    this.filterList.push(this.pageList[i]);
                }else if(this.chose==2&&Number(this.pageList[i].trade_type==1)){//提现
                    this.filterList.push(this.pageList[i]);
                }
            }
        }
    },
     checkState (text) {
        if(text==1){
            return this.success=true;
        }
    },
     choseSeries(val){
        this.chose=val;
        this.activeName=val    
        this.getRecords();
      },
    searchBtn(val){
      let nowDay=new Date();
      let y=nowDay.getFullYear();
      let m=nowDay.getMonth()+1;
      let d=nowDay.getDate();
      if(val=="taday"){
          this.endDate=y+'-'+m+'-'+d;
          this.startDate = y+'-'+m+'-'+d;;
          
      }
      else if(val=="week"){
       if(m<10){m='0'+m}
         if(d<10){d='0'+d}
         this.startDate = this.getPreMonth('week');
         this.endDate=y+'-'+m+'-'+d;
      }
      else {
          if(m<10){m='0'+m}
          if(d<10){d='0'+d}
          this.endDate=y+'-'+m+'-'+d;
          this.startDate = this.getPreMonth();
      }
         this.getRecords()
    }
    }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/btn"
.rechargeWithdraw
  .rechargeWithdrawBox1
     border: 1px solid #e2e2e2
     background: #ffffff
     .amount
         height 83px
         line-height 83px
         background: #fafafa;
         font-size 18px
         color #666666
         padding-left 100px
         span
            color: #ff6461;
            font-size 14px
         span:first-child
            font-size 22px
     .border
         border-bottom: 1px dashed #e8e8e8;
      .rechargeWithdrawDiv
         background #ffffff
         overflow hidden
         padding 20px 0
         div
           float left
         .btn
                font-size: 15px;
                border-radius: 3px;
                display: inline-block;
                width: 109px;
                text-align: center;
                text-indent: 22px;
                font-family: Microsoft Yahei;
                height 34px
                line-height 10px
                color #ffffff
         .RechargeDiv
                padding 40px 
         .Recharge
                background: #ff9600;
                background-image: url(../../assets/iconGroup_1.png);
                background-position: 28px 11px;
                background-repeat: no-repeat;
                border-color: #ff9600;
        .Withdraw
                background: #ff6461;
                background-image: url(../../assets/iconGroup_1.png);
                background-position: 25px -56px;
                background-repeat: no-repeat;
                border-color: #ff6461;
         .Reminder
                color:#666666
                width 59%
                p
                 margin-bottom 5px
                 word-wrap:break-word;
                .ReminderTitle
                    font-size 14px
.rechargeWithdrawBox2
      background #ffffff
     .title
        margin: 10px 20px 0;
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
        .record
            display: inline-block;
            line-height: 34px;
            position: relative;
            top:6px;
            margin-left 20px
            color #666666
            i
              color #ff6461
.tabContent
      font-size 14px
      padding 15px 25px
      color #666666
      border: 1px solid #DCDFE6;
      border-top none
      button
        font-size 12px
        line-height 20px
        padding 0 10px
        margin-left 15px
        border-radius 3px
      a
        font-size 12px
        line-height 20px
        margin-left 15px 
        cursor: pointer;  
        color #666666        
.transactionType{
  padding 15px 0 5px
  a{
    padding 3px 10px
    margin 0
    border-radius 2px
  }
}
.recordUl
  display flex
  background #fafafa
  height 55px
  line-height 55px
  padding 0 10px
  li:first-child  
    text-align left
  li
    text-align center
    flex 1
.itemsLeft
  padding 0 10px
  display flex
  height 55px
  line-height 55px
  border-bottom 1px solid #e2e2e2
  p:first-child  
    text-align left
  p
    flex 1
    text-align center
.itemsLeft:last-child
  border-bottom:none;
.active
  background #ff6461
  color #ffffff !important
.noRecord
  text-align center
  margin 20px 0
</style>