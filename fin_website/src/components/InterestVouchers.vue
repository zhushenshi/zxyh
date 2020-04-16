<template>
  <div style="color:#ffffff;">

    <div class="tabContent" v-show="redBagList.length">
      <div class="interest">
        <ul class="clearfix">
          <li class="fl text-center" :class="borderTop(redBag.color, redBag.status,redBag.canuse)"  v-for="(redBag,index) in redBagList" :key="index">
            <div :class="redBag.status == 1?'canClick':'isClick'"  @click="_toInvestment(redBag.status,index)" ></div>
            <div class="interestTitle">{{redBag.color}}年化加息券</div>
            <div class="interestContent">
              {{redBag.riserate | moneyToFixed(0)}}<span>{{parseFloat(redBag.riserate).toFixed(2).slice(-3,redBag.riserate)}}%</span>
              <span class="checkSign" v-if="redBag.mark == '1'"></span>
            </div>
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
  </div>
</template>
<script>
export default {
  props: {
    pageSize:{
      type:Number,
      default:6
    },
    tempOrderID:{
      type:String,
      default:''
    },
    amount:{
      type:Number,
      default:0
    },
  },    
  data(){
    return {
      activeName:'first',
      vtype:'0',
      redBagList:[],
      pageNo: 1,
      totalNum: 0,
      noData:"",
      btnText: {'0':'已失效','1':'立即使用','2':'已使用'},
      colorCls: {"蓝色": "blueInterest", "金色": 'yellowInterest', '红色': 'redInterest', '橙色': 'yellowInterest'},
      selectedId:'',
      selected:'0'
    }
  },
  created(){
    this.getData()
  },
  methods:{
    _toInvestment(status,index){
      if(status != 1) {
        return
      }
      if(!this.amount){
       this.$router.push('/investment');
       return
      }
      this.redBagList.forEach(el=>{
        el.mark=0
      })      
      this.redBagList[index].mark = '1'
      this.selectedId=this.redBagList[index].id
      this.selected=1
      return
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
        _this.vtype="1"
      _this.$ajax({url:'/account/voucher',method:"get",params:{vtype:_this.vtype,pagesize:_this.pageSize,curpage:_this.pageNo,tempOrderID:_this.tempOrderID,amount:_this.amount}}).then((data)=>{
        if(data.status=='200'){
          data.vlist.forEach(el=>{
            el.hasOwnProperty('mark')?'':el.mark='0'
          })          
          _this.redBagList=data.vlist
          _this.noData="暂无数据"
          _this.totalNum = data.totalpage*_this.pageSize
        }
      })
    },
    borderTop(color, status,canuse) {
      if(status != 1) {
        return;
      }
      if(canuse == 0&&this.amount){
        return
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
.tabContent
  padding 15px 0 30px 15px
  color #ffffff   
.interest
  padding 0 50px;
  ul
    li
      background url(../../public/img/jxq_bg.png)no-repeat
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
        position relative
        span
          font-size:18px;
        .checkSign
          width: 37px;
          height: 37px;
          background: url(../../public/img/common_ico.png) -48px -93px;
          position: absolute;
          top: 10px;
          right: 7px;          
      .interestStatus
        font-size:14px
    .blueInterest
      background-position: 0 -486px;
    .redInterest
      background-position: 0 -324px;
    .yellowInterest
      background-position: 0 -162px;                   
.isClick{
  pointer-events:none
}
.canClick{
     cursor pointer
     width: 55px;
     height: 160px;
     position absolute
     z-index 10
}
.noData{
  text-align center
}
</style>