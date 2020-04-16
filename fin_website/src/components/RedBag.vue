<template>
  <div style="color:#ffffff;">
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
              <span class="checkSign" v-if="redBag.mark == '1'"></span>
            <div style="text-align:center" v-show="redBag.status!=1">{{btnText[redBag.status]}}</div>
            </div>
            <div class="fr right" :class="redBag.status == 1?'':'isClick'"  @click="_toInvestment(redBag.status,index)">{{btnText[redBag.status]}}</div>
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
      vtype:'0',
      redBagList:[],
      pageNo: 1,
      totalNum: 0,
      noData:"",
      btnText: {'0':'已失效','1':'立即使用','2':'已使用'},
      selectedId:'',
      selectedAmount:''
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
      this.selectedAmount=this.redBagList[index].amount
      return
      // return;
      // this.$router.push('/investment');
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
      _this.vtype="0"//红包
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
    }
  }
}
</script>
<style lang="stylus" scoped> 
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
        position relative
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
        .checkSign
          width: 37px;
          height: 37px;
          background: url(../../public/img/common_ico.png) -48px -93px;
          position: absolute;
          top: 30px;
          right: 7px; 
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
.isClick{
  pointer-events:none
}
.noData{
  text-align center
}
</style>