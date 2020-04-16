<template>
  <div class="msgCenter">
    <MyHeader  ref="header">{{$t('lang.msgView.msgCenter')}}</MyHeader>
      <div class="box">
          <div class="sysMsg" id="divHeight">
            <div class="msgList"  @click="goToPage()">    
              <div class="itemInfo">
                  <i class="iconfont icon-combinedshape iconImg"></i>
                <div class="msgItem">
                   <div class="item">
                      <div class="title"><span :class="state =='0' ? 'redStatus' : 'statusNone'"></span>
                       {{$t('lang.sysMsgView.sysMsg')}}
                      </div>
                      <div>{{alter_time |dateFormat}}</div>
                    </div>
                    <p class="msgText">{{content}}</p>
                </div>
              </div>         
            </div>  
          </div>
      <div class="scroll-list-wrap" :style="{top:height}">
          <cube-scroll ref="scroll"  :options="options" @pulling-down="onPullingDown"  :data="list">
            <div v-for="(msg,index) in list" :key="index"  class="typeMsg" v-show="index>0">
            <div class="msgList">    
              <div class="itemInfo">
                <div class="msgItem">
                   <div class="item">
                      <div class="title">
                        <span v-if="msg.state=='0'" class="state"></span>
                        {{msg.title}}
                      </div>
                    </div>
                    <div class="time">{{msg.alter_time |dateFormat}}</div>
                    <p class="msgText">{{msg.content}}</p>
                </div>
              </div>         
            </div>  
          </div>
            <template slot="pullup" slot-scope="props">
              <div v-if="props.isPullUpLoad">
                <div  class="before-trigger">
                  <span style="line-height:22px;font-size:12px;"></span>
                </div>
              </div>
            </template>
          </cube-scroll>
      </div> 
    </div>
      <div class="noMsg"  v-show="!list.length&&shows">
              <img src="./img/no-order.png"/>
              <p>{{$t('lang.orderView.noData')}}</p>
            </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'order',
  data () {
    return {
      height:0,
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: "",
        },
        pullUpLoad: {
          threshold: 50,
        }
      },
      alter_time:"",
      state:"",
      content:'',
      shows:false,
      list:[],
      nowTime:"",
      pageData: {
          pageSize: 4,
          pageIndex: 1
        },
      }
  },
  components:{
  },
  beforeRouteLeave(to, from, next) {
    if(to.path!='/sysMsg'){
      this.setReadFlag(next)
    }else{
      next()
    }
  },
  methods: {
    setReadFlag(next){
      this.$ajax('post','/msg/setReadyMsg',{type:1},function(data){
        next()
      }.bind(this))
    },
    getTime(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.nowTime = new Date().toLocaleString();
      this.options.pullDownRefresh.txt=lang.msgView.newTime
		},
    goToPage () {
      this.$router.push({name:'SysMsg'});
    },
    initList(){
      let _this=this
     _this.$ajax('post','/msg/getMsgList',{type:""},function(data){
      _this.options.pullDownRefresh.txt=""
      _this.list=data.retData.pageList
      if(data.retData.pageList !=""){
       _this.alter_time=data.retData.pageList[0].alter_time
       _this.content=data.retData.pageList[0].content
       _this.state=parseInt(data.retData.pageList[0].state)
      }
       _this.shows=true
     })

    },
     onPullingDown(){
        //下拉刷新
        let _this=this
         _this.getTime()
        _this.$ajax('post','/msg/getMsgList',{type:""},function(data){
           _this.list=data.retData.pageList
            _this.$refs.scroll.forceUpdate()
            _this.pageData.pageIndex=1
        })
      },
},
  mounted(){
     this.initList()
     this.height=(this.$Header)+90+"px"
  }
}
</script>

<style scoped lang="stylus">
.box
  height 100%
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  background #F6F6F6
  font-size 12px
.box 
  margin 0
.msgList
  position relative
  background #ffffff
  padding 0 15px
  .itemInfo
    margin-bottom 10px
    color #868686
    text-align left 
    display flex
    font-size 12px
    .msgText
      font-size 13px
      color: #868686;
      line-height 20px
      overflow hidden
    img
      width: 50px;
      height: 50px;
      text-align: center;
      margin-top 20px
  .item
    display flex
    margin 10px 0
    div:nth-child(1)
      text-align left 
    div:nth-child(2)
      text-align right 
      font-size 12px
    div
      flex 1
      font-size 14px
.sysMsg .msgItem
  width 100%
  padding 5px 0
  margin-left 15px
.sysMsg .msgText
    color: #868686;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
.title
  color #333
  position relative
  .state{
    position absolute
    left -6px
    width 5px
    height 5px
    background #f00
    border-radius 50%
  }
.noMsg
  position fixed
  bottom 0
  left 0
  right 0
  background #F6F6F6
  height 100%
.noMsg img
    width: 100px;
    margin-top: 45%
.noMsg p
  font-size 14px
  color #b7b7b7
  margin-top 10px
.iconImg
  font-size 50px
  color #ffc200
  margin-top 15px
 .redStatus
  display block
  width 6px
  height 6px
  border-radius 10px
  position absolute
  top 2px
  left -11px
  background red
.statusNone
  display none 
.typeMsg 
 .msgList
    border-radius: 5px;
    background: #fff;
    margin: 10px 15px;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,.3)
  .msgItem
    width 100%
    padding 5px 0
  .msgText
    margin-top 10px
.time
  font-size: 12px;
  color: #777;
.top-tip
  text-align center
  font-size 12px
.bottom-tip
  text-align center
  font-size 12px
</style>
