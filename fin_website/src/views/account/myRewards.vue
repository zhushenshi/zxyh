<template>
  <div >
    <div class="myMessage bg-white">
      <div class="title">
        <span class="tit">我的奖励</span>
      </div>
      <div class="messageContent">
        <el-collapse v-model="activeName">
        <el-collapse-item :name="index" v-for="(message,index) in RewardsList" :key="index"  @click.native="_toggleDetail(message.month)">
          <template slot="title">
          <div class="clearfix messageTitle"><span class="fl tit">{{message.month}}</span><span class="fr time">{{message.total ? message.total : '0.00'}}元</span></div>
          </template>
          <div class="sub" v-show="show" >
            <div class="subTop">
              <div>金额(元)</div>
              <div>奖励时间</div>
            </div>
             <div class="subcnt"  v-for="(item, index) in commissionList" :key="index">
              <div>{{item.amount | moneyToFixed(2)}}</div>
              <div>{{item.createTime}}</div>
            </div>
          </div>
        </el-collapse-item>
        </el-collapse>
          <div class="noData" v-if="!RewardsList.length">暂无数据</div>
      </div>
      <!-- <div class="myPagination">
          <el-pagination @size-change="handleSizeChange" prev-text="上一页" next-text="下一页"  @current-change="handleCurrentChange"  :page-sizes="[100, 200, 300, 400]"  :page-size="100" background layout="prev, pager, next, jumper" :total="400">
          </el-pagination>        
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value1:'',
      value2:'',
      RewardsList:[],
      commissionList:[],
      activeName:'',
      show:false
      
    }
  },
  created(){
    this.getMsg()
  },
  methods:{
      getMsg(){
     let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'}) 
      this.$ajax({url:'/account/reward',method:"get",params:{rtype:1}}).then((data)=>{
          loading.close()
          if(data.status=='200'){
          this.RewardsList=data.list
          }
        })
    },
    _toggleDetail(val){
      var month = val.replace('月', '');
      if(month < 10) {
        month = '0' + month;
      }
       this.$ajax({url:'/account/reward/detail',method:"get",params:{rtype:1,month:month}}).then((data)=>{
          if(data.status=='200'){
           this.commissionList=data.list
           this.show=true
          }
        })
    },
  }
}
</script>
<style lang="stylus" scoped> 
 @import "../../assets/stylus/btn"
  .myMessage
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #333333;  
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
    .messagFilter
      margin: 0 46px 15px;
      button
        font-size 12px
        line-height 26px
        padding 0 10px
        margin-left 15px
        border-radius 3px
    .messageContent
      margin: 0 46px;
      .messageTitle
        width:100%;
        span.tit
          font-weight: bold;
          font-size: 15px;
          color: #666;
          span
            font-size 12px
            background: #ff6460;
            color #ffffff
            margin-left: 12px;
            padding: 4px 10px;
            border-radius: 3px;
            font-weight normal
        span.time
          color: #a4a4a4;
          font-size 12px;
          margin-right 5px
      /deep/.el-collapse-item__header
        font-size 16px
        border-bottom: 1px dashed #e2e2e2;
      /deep/.el-collapse-item__header.is-active {
        border-bottom-color: transparent;
      }
      /deep/ .el-collapse-item__content
        padding-bottom 0
        font-size:12px
        color #666666
        line-height 26px
      /deep/.el-collapse-item__wrap
        border-bottom: 1px dashed #e2e2e2;
      /deep/.el-collapse {
        border-top: none;
        border-bottom: none;
      }
    .myPagination
      margin: 0 46px;
      /deep/ .el-pager li
        font-size 12px;
      /deep/ .el-pagination button span
        font-size 12px!important
        padding 0 8px;
.noData
  text-align center
  margin 50px 0
.sub
   background #f6f6f6 
.subTop
  font-size 14px
  border 1px solid #E4E7ED
.subTop,.subcnt
  display flex
  div
    height 40px
    line-height 40px
    flex 1
    text-align center
.subcnt
  border-bottom: 1px dashed #eee;
.subcnt:last-child
  border none
</style>