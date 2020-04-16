<template>
  <div class="sysMsg">
    <MyHeader  ref="header">{{$t('lang.sysMsgView.sysMsg')}}</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="msgList" v-for="(item,index) in list" :key="index">    
            <div class="itemInfo">
              <div class="msgItem">
                <p class="title"><span v-if="item.state=='0'" class="state"></span> {{item.title}}</p>
                <p class="msgDate">{{item.alterTime}}</p>
                <p class="msgText">{{item.content}}</p>
              </div>
            </div> 
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sysMsg',
  data () {
    return {
      height:0,
      title:"",
      alterTime:'',
      content:'',
      type:'',
      list: []
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setReadFlag(next)
  },
  components:{
  },
  methods: {
    initList(){
      let _this=this
      _this.$ajax('post','/msg/getMsgList',{type:0},function(data){
        _this.list=data.retData.system;
      })
    },
    setReadFlag(next){
      this.$ajax('post','/msg/setReadyMsg',{type:0},function(data){
        next()
      }.bind(this))
    }
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
    this.initList()
  }
}
</script>

<style scoped lang="stylus">
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  background #F6F6F6
.box 
  margin 0
.msgList
  position relative
  background #ffffff
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
  margin: 12.5px 15px;
  border-radius: 10px;
  .itemInfo
    margin-bottom 10px
    color #868686
    padding 5px 0
    text-align left 
    .msgItem
      margin 10px
      .title
        font-size 17px
        color #0c0c0c
        position relative
        .state{
          position absolute
          left -6px
          width 5px
          height 5px
          background #f00
          border-radius 50%
        }
      .msgDate
        border-bottom: 1px solid #d7d8d9;
        padding: 10px 11px;
        font-size: 13px;
        color: #000;
        line-height 20px
      .msgText
        margin: 10px 8px;
        font-size: 14px;
        line-height 22px
        color #0c0c0c
</style>
