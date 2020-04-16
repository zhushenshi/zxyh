<template>
  <div >
    <div class="myMessage bg-white">
      <div class="title">
        <span class="tit">我的消息</span>
      </div>
      <div class="messagFilter">
        起止日期：
          <el-date-picker
            v-model="startDate"
            type="date"
            size="mini"
            prefix-icon='el-icon-date'
            value-format="yyyy-MM-dd"
            placeholder="" style="width:175px;">
          </el-date-picker>
          -
          <el-date-picker
            v-model="endDate"
            type="date"
            size="mini"
            value-format="yyyy-MM-dd"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>        
          <button class="button--principal" @click="getMsg">
            查询
          </button>                                  
          <button class="button--principal" @click="reset">
            清空
          </button>      
      </div>
      <div class="messageContent">
        <el-collapse>
        <el-collapse-item v-for="(message,index) in messageList" :key="index">
          <template slot="title">
          <div class="clearfix messageTitle"><span class="fl tit">{{message.title}} 
            <!-- <span v-if="message.status !== '0'">未读</span>  -->
            </span>
            <span class="fr time">{{message.time}}</span></div>
          </template>
          <div>{{message.content}}</div>
        </el-collapse-item>
        </el-collapse>
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
      messageList:[],
      startDate:"",
      endDate:""
    }
  },
  created(){
    this.getMsg()
  },
  methods:{
    reset(){
      this.startDate=""
      this.endDate=""
      this.getMsg()
    },
    getMsg(){
     let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'}) 
      this.$ajax({url:'/account/sysmsg',method:"get",params:{
         startDate:this.startDate,
         endDate:this.endDate,
      }}).then((data)=>{
            loading.close()
          if(data.status=='200'){
           this.messageList=data.List
          }
        })
    }
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
        padding-bottom 15px
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
</style>