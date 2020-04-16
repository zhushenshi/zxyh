<template>
  <div >
    <div class="accountManage bg-white">
        <div class="safeTitle">
             <span class="tit">我的借款</span>
        </div>
        <div class="listManage">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                     <div class="item-header">
                            <div class="loanTitle">{{item.type==1?'教师贷':item.type==2?'党员贷':item.type==3?'公务员贷':item.type==4?'小微贷':item.type==5?'大额存单销售':'贷款'}}</div>
                            </div>                       
                            <div class="loanCnt">借款金额：{{item.amount}}</div>
                            <div class="loanCnt">借款期数：{{item.periods}}</div>
                            <div class="loanCnt">借款日期：{{item.createTime|dateTimeToDate}}</div>
                            <div class="loanCnt" >借款状态：<span :class="{'status0':item.state==0,'status1':item.state==1,'status2':item.state==2,}">{{item.state==2?'已拒绝':item.state==0?'已确认':item.state==1?'已经申请':''}}</span></div>
                </li>
            </ul>
            <div class="noData" v-show="!list.length">
              暂无数据
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        list:[]
    }
  },
  created(){
    this.gatData()
  },
  methods: {
      //账户安全
        gatData(){
           let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
            this.$ajax({url:'/custLoanController/getApply',}).then((res)=>{
               loading.close()
            if(res.status == '200'){
               this.list=res.response.data          
            }
          })
    },
  }
}
</script>
<style lang="stylus" scoped> 
.accountManage
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
    .listManage
        margin: auto 40px; 
        padding-bottom: 30px;
        li
          background url("./../../assets/myLoanBg.png") no-repeat
          margin-bottom 10px
          background-size: 100% 100%;
          padding 9px 20px
          height 200px
.item-header{
      text-align left
      font-size:16px;
      font-family:FZLanTingHeiS-R-GB;
      color:#333;
      position relative
      display flex
      justify-content space-between
}
.status1{
    color #707070//通过
    font-size 12px;
    }
    .status2{//
    color:#E7373A;//拒绝
    font-size 12px;
    }
    .status0{
    color:#0087EC;//确认
    font-size 12px;
    }
.loanTitle{
    font-size 20px
}
.loanCnt{
    font-size 14px
    margin 10px 0
}
.noData{
  text-align center
  margin 100px 0
}
</style>