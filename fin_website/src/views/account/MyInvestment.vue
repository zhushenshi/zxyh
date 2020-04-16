<template>
  <div >
    <div class="accoutmoney bg-white"  v-loading="loading">
        <div class="operation">
          <span class="icon-eye"  @click.stop="evenFlag && _toggleSeeAmount()" :class="hideAmount == 0 ? 'icon-eye-on' : 'icon-eye-off'"></span>
          <span><img src="./../../assets/refrsh.png" @click="getAccount(1)"/></span>
        </div>
      <div class="item">
        <p class="mb15">总资产(元)</p>
        <p class="money">{{totalAssets}}</p>
        <p class="itemText">电子钱包：<i>{{balance}}</i>元
         <!-- <el-popover  placement="right" title="标题" width="200" trigger="hover"
         v-model="visible">
            <img slot="reference" src="./../../assets/warn.png"/>
        </el-popover> -->
      
        </p>
      </div>
      <div class="item">
        <p class="myIncome">我的收益</p>
        <p class="IncomeIoney">
          <span class="yesterdayIncome">昨日收益<i >{{yesterdayIncome}}</i>元</span>
          <span class="itemText">累计收益<i >{{totalRevenue}}</i></span>
        </p>
      </div>
    </div>
    <div class="tabs">
      <el-collapse v-model="activeName"  accordion >
        <el-collapse-item :name="index" v-for="(item,index) in pList"  :key="index"  @click.native="getCnt(item,'')">
           <template slot="title">
           <p class="title">{{item.product_series_name}}</p>
          </template>
          <div class="tabContent">
            <div>
          起止日期：
          <el-date-picker
            v-model="item.startDate"
            type="date"
            size="mini"
             value-format="yyyy-MM-dd"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          -
          <el-date-picker
            v-model="item.endDate"
            type="date"
            size="mini"
             value-format="yyyy-MM-dd"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          <button class="button--principal" @click="search(item,'type')">
            检索
          </button>                                  
          <button class="button--principal" @click="resetBtn(item)">
            清空
          </button>
          <a @click.stop="searchBtn('taday',item)">今天</a>
          <a @click.stop="searchBtn('week',item)">最近一周</a>
          <a @click.stop="searchBtn('month',item)">1个月</a>
          <a @click.stop="searchBtn('threeMonth',item)">3个月</a>
        </div> 
        <div class="mt15 tabChilds">
          <!-- <el-tabs v-model="status" type="card" @click.prevent="queryInfo(item,status)" :stretch="true">
            <el-tab-pane label="回款中的项目" name="1">
            </el-tab-pane>
            <el-tab-pane label="已结清的项目" name="2">
            </el-tab-pane>
            <el-tab-pane label="已失效的项目" name="0">
            </el-tab-pane>
          </el-tabs> -->
          <ul class="tabDiv">
            <li :class="{'active': tabName === '1'}" @click.stop="queryInfo(item,'1')">回款中的项目</li>
            <li :class="{'active': tabName === '2'}" @click.stop="queryInfo(item,'2')">已结清的项目</li>
            <li :class="{'active': tabName === '0'}" @click.stop="queryInfo(item,'0')">已失效的项目</li>
          </ul>
          <div class="tabContentChild">
            <ul class="tabTop">
              <li>
                购买时间
              </li>
              <li>
                标名
              </li>
              <li>
                我的投资(元)
              </li>
              <li v-if="item.is_current==0">
                项目期限
              </li>
              <li>
                预期年化收益率
              </li>
              <li>
                操作
              </li>
            </ul>
            <div class="noData" v-if="!tableData.length">
                暂无数据
            </div>
            <ul class="tabCnt" v-for="(list,index) in tableData" :key="index">
              <li>
                {{list.createTime | dateTimeToDate}}
              </li>
             <li>
                {{list.crmName}}
              </li>
             <li>
                {{list.contractMoney}}
              </li>
              <li v-if="item.is_current==0">
                {{list.periods+list.periodsUnit}}
              </li>
              <li>
                {{list.realyRate}}%
              </li>
              <li>
                <button v-if="item.is_current==1&&status==1" class="button--principal" @click="Redeem(list.orderid)">
                    赎回
                  </button>
                <button class="button--principal" @click="lookBtn(list.orderid)">
                    查看
                  </button>
              </li>
            </ul>
          </div>             
        </div>       
      </div>
        </el-collapse-item>
      </el-collapse>
       <el-dialog title="查看" :visible.sync="dialogTableVisible" width="1040px" v-dialogDrag>
            <el-table :data="gridData">
              <el-table-column prop="periods" label="期数" width="150"></el-table-column>
              <el-table-column prop="repayDate" label="还款日" width="200"></el-table-column>
              <el-table-column prop="principal" label="本金(元)"></el-table-column>
              <el-table-column prop="interest" label="利息(元)"></el-table-column>
              <el-table-column prop="principalInterest" label="本息(元)"></el-table-column>
            </el-table>
          </el-dialog>    
    </div>    
  </div>
</template>
<script>
export default {
  data(){
    return {
      accordion:true,
      visible: false,
      evenFlag: true,
      totalAssets: '--',//账户总资产
      balance:'',
      yesterdayIncome:'',
      totalRevenue:'',
      hideAmount: 1, //0未隐藏资金
      activeName: 0,
      pList:[],
      loading:false,
      status:'1',
      id:"", 
      tableData: [],
      value2:'',
      value1:'',
      dialogTableVisible:false,
      gridData: [],
      tabName:'1'
    }
  },
  created(){
    this.getAccount()
    this.getRecoed()
  },
  methods:{
        resetBtn(item){
           item.startDate=""
           item.endDate=""
        },
        searchBtn(val,item){
            let nowDay=new Date();
            let y=nowDay.getFullYear();
            let m=nowDay.getMonth()+1;
            let d=nowDay.getDate();
            if(m<10){m='0'+m}
            if(d<10){d='0'+d}
              item.endDate=y+'-'+m+'-'+d;
            if(val=="taday"){
                item.startDate = y+'-'+m+'-'+d;;             
            }
            else if(val=="week"){
              item.startDate = this.getPreMonth('week',item);
            }
            else if(val=="threeMonth"){
                item.startDate = this.getPreMonth('threeMonth',item);
            }
            else {
                item.startDate = this.getPreMonth('month',item);
            }
            this.getList(item,'type')
    },
       getPreMonth(type,item) {
            let date = item.endDate;
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
            if(type=="month"){
                let days2 = new Date(year2, month2, 0);
                days2 = days2.getDate();
                if (day2 > days2) {
                    day2 = days2;
                }    
                t2= year2 + '-' + month2 + '-' + day2;
              }
              else if(type=="week"){//
                var date1 = new Date(),time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                var date2 = new Date(date1);
                  date2.setDate(date1.getDate()-7);
                  t2= year2 + '-' + month2 + '-' + date2.getDate();
              }
              else{
                var monthThree = parseInt(month) - 3
                  if (monthThree <=0) {
                    year2 = parseInt(year2) - parseInt(monthThree / 12 == 0 ? 1 : parseInt(monthThree) / 12);
                    monthThree = 12 - (Math.abs(monthThree) % 12);
                }
                t2= year2 + '-' + monthThree + '-' + day2;
              }

            return t2;
    },
      queryInfo(tab,status) {
        this.status=status
        this.tabName=status
        this.getList(tab,"")
      },
      getCnt(item,type){
        this.status='1'
        this.tabName='1'
        this.getList(item,type)
      },
    search(item,type){
      this.getList(item,type)
    },
    getList(item,type){
       let _this=this
      let loading
       if(type){
         loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       } 
       console.log(_this.status)     
       this.$ajax({url:'/account/invests',method:'get',params:{
         ptype:item.id,
         pagesize:100000000,
         curpage:1,
         status:_this.status,
         startDate:item.startDate,
         endDate:item.endDate,
       }}).then((data)=>{
            if(data.status == '200'){
               if(type){loading.close()}    
                _this.tableData=data.list 
            }
        })
    },
    getRecoed(){
       this.$ajax({url:'/index/selectProductSeries'}).then((data)=>{
            if(data.status == '200'){
                this.pList=data.list
                let item={}
                for(var i=0;i<this.pList.length;i++){
                  item=this.pList[0]
                }  
                console.log(item)
                this.getList(item,"")
            }
        })
    },
    lookBtn(orderid){
      this.dialogTableVisible=true
      console.log(orderid)
       let _this=this
        let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       this.$ajax({method:'get',url:'/account/invests/repayplan',params:{orderid:orderid}}).then((data)=>{
            if(data.status == '200'){
              loading.close()
                _this.gridData=JSON.parse(data.list)         
            }
        })
    },
    //赎回
    Redeem(orderid){
        let _this=this
        let loading=_this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       this.$ajax({method:'post',url:'/redeem',params:{orderid:orderid}}).then((data)=>{
          loading.close()
            if(data.status == '200'){      
               _this.getList()      
            }
        })
    },
      //切换金额可见
    _toggleSeeAmount() {
      this.evenFlag=false;
      this.getHideAmount();
    },
    //账户隐藏状态
    getHideAmount () {
        let accoutHide=this;
        this.$ajax({url:'/account/hideamount',method:"get"}).then((data)=>{
          accoutHide.getAccount();
        },'','','',true)
    },
     getAccount(type){   
       let accout=this;
      let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       this.$ajax({url:'/account',method:"get"}).then((data)=>{
           loading.close()
         if(data.status=="200"){
          accout.totalAssets=data.totalAssets?data.totalAssets:'--';
          accout.yesterdayIncome=data.yesterdayIncome?data.yesterdayIncome:'--';
          accout.totalRevenue=data.totalRevenue?data.totalRevenue:'--';
          accout.balance=data.balance?data.balance:'--';
          accout.hideAmount=data.hideAmount?data.hideAmount:0;  
          if(accout.hideAmount == 1) {
            accout.totalAssets=accout.totalAssets.replace(/\d|./g,'*');
            accout.yesterdayIncome=accout.yesterdayIncome.replace(/\d|./g,'*');
            accout.totalRevenue=accout.totalRevenue.replace(/\d|./g,'*');
            accout.balance=accout.balance.replace(/\d|./g,'*');
          }
          accout.evenFlag=true;
         } 
        }
      )

    },
  }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/btn"
  .accoutmoney
    overflow: hidden;
    border: 1px solid #e2e2e2;  
    font-size: 14px;
    color #666666  
    line-height 25px
    display flex
    position relative
    .item
      flex 1
      width: 50%;
      height: 182px;
      text-align: left;
      padding: 10px 24px;
    :first-child 
      border-left: none;
    .mb15
      font-size 16px
      margin 24px 0
    .myIncome
      margin 54px 0 10px
      font-size 14px
    .IncomeIoney
      .yesterdayIncome
        margin-right 15px
        i
          color #FF6461
          font-size 20px
          margin 0 5px
    .money
      font-weight bold
      font-size: 38px;
      color #333333
      padding-bottom 30px
    .restmoney
      font-size 22px
      margin-top 35px
    .btnBox
      button
        width:45%;
        font-size:15px;
        padding:10px 0;
        margin-top:35px;
 .itemText
      font-size 16px
      i
        font-size 20px
        margin 0 5px
      img 
        width 16px
        position relative
        top 2px
        cursor: pointer
  .tabs
    font-size: 14px;
    box-sizing border-box
    margin-top 10px
    /deep/ .el-tabs__item.is-active
      color #ff6461!important
      background: #ffffff;
    /deep/ .el-tabs__item
      font-size 16px
      line-height: 50px;
      height  50px
    /deep/.el-tabs__item:hover {
        color: #ff6461;
    }
    /deep/.el-tabs__item {
        background: #f5f6f8;
    }    
    /deep/.el-tabs__header{
      margin 0
    }
    .tabContent
      padding 30px 25px
      color #666666
      border-top none
      // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
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
      .tabChilds
        .tabDiv
            display: flex;
            .active
              color: #666666 !important;
              background: #fff !important;
              border-bottom-color: #ffffff !important;
            li
              border-top: 1px solid #E2E2E2;
              border-left: 1px solid #E2E2E2;
              cursor pointer
              float left
              font-size 14px
              line-height: 47px;
              height  47px
              flex 1
              background #EEEEEE
              text-align center
            li:last-child
              border-right: 1px solid #E4E7ED;
        /deep/ .el-tabs__item
          font-size 14px
          line-height: 47px;
          height  47px
        /deep/.el-tabs__item:hover {
            color: #666666;
        }
      .tabContentChild
          /deep/ .el-table td, .el-table th
            padding 10px 0
          .tabTop
            overflow hidden
            display flex
            border 1px solid #ebeef5
            li
              flex 1
              text-align center
              font-weight bold
              height 40px
              line-height  40px
          .tabCnt
            overflow hidden
            display flex
            border-bottom 1px dashed #ebeef5
            border-left 1px solid #ebeef5
            border-right 1px solid #ebeef5
            li  
              flex 1
              height 45px
              line-height  45px
              text-align center
.operation
  position absolute
  margin 24px
  right 24px
  span 
    cursor pointer
  img
    width 30px
 .icon-eye
    margin-right 10px
    cursor pointer
.icon-eye-on
  background url("../../assets/open.png") no-repeat
  width 30px
  height 30px
  display inline-block
.icon-eye-off
  background url("../../assets/close.png") no-repeat
  width 30px
  height 30px
  display inline-block
.title{
  padding-left 25px
}
/deep/.el-collapse-item
  margin-bottom 15px !important
 /deep/ .el-collapse-item__header.is-active
      border-bottom: 1px solid #EBEEF5
.noData
  text-align center
  border-bottom 1px solid #ebeef5
  border-left 1px solid #ebeef5
  border-right 1px solid #ebeef5
  height 50px
  line-height 50px
</style>