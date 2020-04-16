<template>
  <div class="repayPage">
    <MyHeader ref="header"><span>{{$t('lang.ojk.historyTitle')}}</span></MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="content">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goPage('HistoryDetails',item.id)">
            <div class="list-header">
              {{$t('lang.ojk.historyTime')}}: {{item.createTime}}
              <span class="iconfont icon-previewright"></span>
            </div>
            <div class="list-body">
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyType')}}</div>
                <div class="list-item-item">{{item.stage_count=='1'?$t('lang.ojk.single'):$t('lang.ojk.multi')}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyMoney')}}</div>
                <div class="list-item-item">Rp{{item.pro_quota | money}}</div>
              </div>
              <div class="list-item">
                <div class="list-item-item">{{$t('lang.ojk.historyQixian')}}</div>
                <div class="list-item-item">{{item.stage_count=='1'?item.day_count+' '+getDiyType(item.diy_type):item.stage_count+' '+getDiyType(item.diy_type)}}</div>
              </div>
            </div>
          </div>
          <div class="noMsg" v-if="!list.length">
            <img style="margin-top:20%;" src="./img/no-order.png"/>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      height:0,
      list: []
    }
  },
  created(){
  },
  mounted(){
    this.height = this.$Header / 37.5 + 'rem'
    this.getHistoryList()
  },
  methods: {
    goPage(pathName,id) {
      this.$router.push({name:pathName,params:{id:id}})
    },
    getHistoryList(){
      let _this=this
      this.$ajax('post','/loanAgreement/historyOrderInfo',{},(data)=>{
        if(data.retData){
          _this.list=data.retData
        }
      })
    },
    getDiyType(type){
      //diyType分期方式(1,天,2周,3月)
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      switch(type) {
        case '1':
          return lang.comm.day
          break;
        case '2':
          return lang.comm.week
          break;
        case '3':
          return lang.comm.month
          break;
        default:
          return ''
      } 
    },      
  }
}
</script>

<style scoped lang="stylus">
.repayPage
  background #F6F6F6
  .scroll-list-wrap
    position fixed
    bottom 0
    left 0
    right 0
    background #F6F6F6
    .list{
      background #ffffff
      margin 10px 15px
      padding 10px 10px 0 10px
      border-radius 4px
      .list-header{
        position relative
        padding 0 0 10px 0
        text-align left
        font-size 15px
        color #333
        span{
          position absolute
          right 0
          font-size 18px
        }
        &:after{
          position absolute
          content ""
          bottom 0
          left 0
          right 0
          height 1px
          background #ddd  
        }
      }
      .list-body{
        padding 10px 0
        .list-item{
          display flex
          text-align left
          font-size 15px
          color #000
          margin-bottom 10px
          .list-item-item{
            flex 1  
          }
        }
        .list-item:last-child{
          margin-bottom 0
        }  
      }
    }     
</style>
