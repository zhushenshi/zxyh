<template>
  <div >
    <div class="redBag bg-white">
      <div class="title">
        <span class="tit">我的红包</span>
      </div>
        <div class="tabs mt30">
          <div class="bg-white">
            <el-tabs v-model="activeName" type="border-card"  :stretch="true" @tab-click="handleClick">
              <el-tab-pane label="投资红包" name="first">
                <div class="tabContent" v-show="redBagList.length">
                  <div class="investment">
                    <ul class="clearfix">
                      <li class="fl" v-for="(redBag,index) in redBagList" :key="index" :class="redBag.status == 1?'':'overDate'">
                       <div class="fl left" style="width:80%">
                         <div class="clearfix">
                           <div class="fl">
                             <span class="moneyIcon">¥</span>
                             <span class="moneyNum">{{redBag.amount | moneyToFixed(0)}}</span>
                           </div>
                           <div class="fl" style="margin-left:15px">
                             <p>新手注册红包</p>
                             <p>单笔满 <span>{{redBag.limit | moneyToFixed(0)}}</span> 元起用</p>
                           </div>
                         </div>
                         <div class="redBagText">折扣率为100%;适用期限<span v-text="defineInvestLimit(redBag.investLimit)"></span>;{{redBag.investLimit == 15 ? "(新手标可用)" : "(全品类可用)"}}</div>
                        <div style="text-align:center" v-show="redBag.status!=1">{{btnText[redBag.status]}}</div>
                       </div>
                       <div class="fr right" :class="redBag.status == 1?'':'isClick'"  @click="_toInvestment(redBag.status)">{{btnText[redBag.status]}}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="myPagination">
                      <el-pagination @size-change="handleSizeChange" prev-text="上一页" next-text="下一页"  @current-change="handleCurrentChange"  :page-pageSize="[6, 12, 18, 24]"  :page-size="pageSize" background layout="prev, pager, next, jumper" :total="totalNum">
                      </el-pagination>        
                  </div>                  
                </div>
                 <div class="noData" v-show="!redBagList.length">{{noData}}</div>  
              </el-tab-pane>
              <el-tab-pane label="加息券" name="second">
                <div class="tabContent" v-show="redBagList.length">
                  <div class="interest">
                    <ul class="clearfix">
                      <li class="fl text-center" :class="borderTop(redBag.color, redBag.status)"  v-for="(redBag,index) in redBagList" :key="index">
                        <div :class="redBag.status == 1?'canClick':'isClick'"  @click="_toInvestment(redBag.status)" ></div>
                        <div class="interestTitle">{{redBag.color}}年化加息券</div>
                        <div class="interestContent">{{redBag.riserate | moneyToFixed(0)}}<span>{{parseFloat(redBag.riserate).toFixed(2).slice(-3,redBag.riserate)}}%</span></div>
                        <div class="interestStatus" v-if="redBag.status!=1">{{btnText[redBag.status]}}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="myPagination">
                        <el-pagination @size-change="handleSizeChange" prev-text="上一页" next-text="下一页"  @current-change="handleCurrentChange"  :page-pageSize="[6, 12, 18, 24]"  :page-size="pageSize" background layout="prev, pager, next, jumper" :total="totalNum">
                      </el-pagination>          
                  </div>                               
                </div>
                 <div class="noData" v-show="!redBagList.length">{{noData}}</div>               
              </el-tab-pane>
              <!-- <el-tab-pane label="现金奖励" name="third">
                <div class="tabContent">
                  <div class="cash">
                    <ul class="clearfix">
                      <li class="fl" v-for="(item,index) in rewardList" :key="index">
                        <p class="top"></p>
                        <div class="cashContent">
                          <p class="paperType">提现券</p>
                          <p class="paperNum">{{item.total}}<span>元</span></p>
                          <p class="paperTerm">永久有效</p>
                          <div class="tetmText">
                            <p>使用期限</p>
                            <p>{{item.create_time}}</p>
                          </div>
                        </div>
                        <p class="bottom">
                          月末结算
                        </p>
                      </li>
                    </ul>
                  </div>               
                </div>
                  <div class="noData" v-show="!rewardList.length">{{noData}}</div>               
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      activeName:'first',
      vtype:'0',
      redBagList:[],
      pageNo: 1,
      pageSize: 6,
      totalNum: 0,
      noData:"",
      rewardList:[],
      btnText: {'0':'已失效','1':'立即使用','2':'已使用'},
      colorCls: {"蓝色": "blueInterest", "金色": 'yellowInterest', '红色': 'redInterest', '橙色': 'yellowInterest'},
    }
  },
  created(){
    this.getData()
  },
  methods:{
    _toInvestment(status){
          if(status != 1) {
        return
      }
      this.$router.push('/investment');
    },
    handleClick(tab){
         this.activeName =tab.name
         this.pageSize=6
         this.pageNo=1
         this.totalNum=0
         this.noData=""
         console.log(this.activeName)
          if(this.activeName=="first"){
              this.redBagList=[]
              this.vtype="0"
                this.getData()
            }
            else if(this.activeName=="second"){
                this.redBagList=[]
              this.vtype="1"
                this.getData()
            }
           else{
               this.rewardList=[]
           this.reward()
        }
       
    },
    reward(){
          this.$ajax({url:'/account/reward',method:"get",params:{rtype:1}}).then((data)=>{
          if(data.status=='200'){
           this.rewardList=data.list
          }
        })
    },
     defineInvestLimit(days) {
      if(days == 15 || days == 365) {
        return days+'天';
      }else {
        return days + '天及以上'
      }
    },
       handleSizeChange(val){
          this.pageSize = val;
          this.getData()
       },
       handleCurrentChange(val){
         this.pageNo = val;
          this.getData()
       },
        getData () {
        let _this=this;
        if(_this.activeName=="first"){
          _this.vtype="0"
        }
        else{
          _this.vtype="1"
        }
        _this.$ajax({url:'/account/voucher',method:"get",params:{vtype:_this.vtype,pagesize:_this.pageSize,curpage:_this.pageNo}}).then((data)=>{
          if(data.status=='200'){
             _this.redBagList=data.vlist
             _this.noData="暂无数据"
           _this.totalNum = data.totalpage*6
          }
        })
    },
    borderTop(color, status) {
      if(status != 1) {
        return;
      }
      if(!color){
        return;
      }
      return this.colorCls[color];
    },
  }
}
</script>
<style lang="stylus" scoped> 
  .redBag
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #333333;
    padding-bottom 30px
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
    .tabs
      font-size: 14px;
      padding: 0 40px
      box-sizing border-box
      /deep/ .el-tabs__item.is-active
        color #666
      /deep/ .el-tabs__item
        font-size 16px
        line-height: 50px;
        height  50px
      /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
          color: #000;
      }
      .tabContent
        padding 15px 0 30px 15px
        color #ffffff        
        .investment
          ul
            li
              background #ED3D18
              width 45%
              border-radius 10px
              padding 13px 0 30px
              font-size 12px
              margin-right 5%
              margin-bottom 45px
              height:150px
              .left
                padding 24px 10px 22px 10px
                .redBagText
                  margin-top:18px;
                .moneyIcon
                  font-size 20px
                  padding 0 10px
                  position relative
                  top -6px
                .moneyNum
                  font-size 52px
                  line-height 52px
              .right
                cursor pointer
                padding  21px 10px
                font-size 22px
                font-weight 300
                border-left 1px dashed #ffffff
                line-height 24px
                max-width 22px
                min-height 96px
            .overDate
              background #cccccc
              .right
                line-height 30px
        .interest
          padding 0 50px;
          ul
            li
              background url(../../../public/img/jxq_bg.png)no-repeat
              background-position: 0 0;
              background-size 100% 
              width 290px
              height 160px
              // width 349px
              // height 192px
              border-radius 10px
              font-size 12px
              margin-right 5%
              margin-bottom 45px   
              .interestTitle
                font-size:16px;
                margin:18px 30px 0;
              .interestContent
                font-size:60px;
                margin:10px 30px 1px 30px;
                line-height:60px;
                span
                  font-size:18px;
              .interestStatus
                font-size:14px
            .blueInterest
              background-position: 0 -486px;
            .redInterest
              background-position: 0 -324px;
            .yellowInterest
              background-position: 0 -162px;
        .cash
          padding 30px 47px 0 72px
          ul
            li
              margin-right: 25px;
              margin-bottom: 30px; 
              width 183px
              .top
                background: url(../../../public/img/paperCash.png) no-repeat 0 0;
                height: 11px;  
              .cashContent
                padding-left 20px
                background: #ff8400;
                font-size: 15px;
                .paperType
                  margin-bottom: 10px;
                  padding-top 4px
                .paperNum
                  font-size: 38px;
                  margin-bottom: 5px;
                  line-height: 40px;
                  span
                    font-size 17px;
                .paperTerm
                  margin-bottom: 12px;
                .tetmText
                  color: #a26700;
                  line-height: 16px;
                  padding-bottom: 12px;
                  font-size:12px;
              .bottom
                text-align: center;
                line-height: 34px;
                height: 42px;
                background: url(../../../public/img/paperCash.png) no-repeat -191px 0;
                color: #fff;
                font-size: 16px;
                display: block;
                letter-spacing: 3px;
                font-weight: bold;    
                cursor:pointer;                            
/deep/.el-tabs--border-card
    box-shadow none !important  
.isClick{
  pointer-events:none
}
.canClick{
     cursor pointer
     width: 55px;
     height: 160px;
     position absolute
}
.noData{
  text-align center
}
</style>