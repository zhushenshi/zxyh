<template>
  <div class="problem">
        <MyHeader  ref="header" :backPath="'/portal'">投诉建议
           <span class="addSuggestion" @click="goToPage('/suggestion')" >+</span>
        </MyHeader>
        <div class="scroll-list-wrap" :style="{top:height}">
       <cube-scroll ref="contentScroll" :options="options" @pulling-down="onPullingDown"  @pulling-up="onPullingUp" :data="list">
          <div class="box">
              <div class="question">
               <div class="hideClass">
                 <div class="quertList" v-for="(value,index) in list" :key="index">
                    <div class="questItem" @click="start($event)">
                      <p>{{value.content}}</p> 
                       <i class="cubeic-select" v-show="value.dealContent !=''&&value.dealContent !=null"></i>
                    </div>
                    <p class="questionDetail">
                    回复： {{value.dealContent}}
                    </p>
                 </div>
                 </div>
            </div>  
          </div>
            <template slot="pullup" slot-scope="props">
              <div v-if="props.isPullUpLoad">
                <div  class="before-trigger">
                  <span style="line-height:22px;font-size:12px;">到底啦</span>
                </div>
              </div>
            </template>     
          </cube-scroll>
        </div>
         <div v-show="!list.length && show" class="no-data-wrapper">
          <img src="./img/no-order.png"/>
          <p>暂无数据，看看别的地方吧！</p>
        </div>
  </div>
</template>

<script>
export default {
  name: 'cooperation',
  data () {
    return {
       height:0,
       isShow: false,
       show:false,
       options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 50,
        }      
      },
       pageData: {
          pageSize: 10,
          pageIndex: 1
        },
       nextPage:'',
      secondStop: 0,
       list:[
        //  {title:'回复建议的点点滴滴多多多多多多多',
        //  content:'jjdjjkaj'
        //  },
        //    {title:'回复建议',
        //  content:'jjdjjkaj djk djkkdsfjksjkfjsjfsdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdnmnxnvnnvxmnxvvxnvx'
        //  },
        //    {title:'回复建议',
        //  content:'jjdjjkaj djk djkkdsfjksjkfjsjfsdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdjkkdsfjksjkfjsjfsdnmnxnvnnvxmnxvvxnvxdnmnxnvnnvxmnxvvxnvx'
        //  }
       ]
    }   
  },
  components:{
  },
  methods: {
   goToPage (path) {
      this.$router.push(path)
    },
     start(e){
       var me= e.target
       if(e.target.nodeName == 'P') {
					me = e.target.parentNode
				} else if(e.target.nodeName == 'I') {
					me = e.target.parentNode
				}
      if(me.nextElementSibling.className == 'questionDetail') {
          me.children[1].style.transform = 'rotate(180deg)';
          me.nextElementSibling.className = 'showContent';
				} else {
					me.nextElementSibling.className = 'questionDetail';
          me.children[1].style.transform = 'rotate(0deg)'
				}
        me.children[1].style.transition = 'all 0.4s ease'
      },
   getData (pageData) {
        let _this=this
        _this.$ajax('post','/suggestion/getSuggestion',pageData,function(data){
          _this.nextPage=data.retData.nextPage
            _this.list=data.retData.list
            _this.show=true
        })
      },
      onPullingDown(){
        //下拉刷新
        // _this.list.push({})
        let _this=this
        _this.$ajax('post','/suggestion/getSuggestion',{pageSize: 10,pageIndex: 1},function(data){
          _this.pageData.pageIndex=1
          _this.nextPage=data.retData.nextPage
            _this.list=data.retData.list
            // _this.$refs.contentScroll.scrollTo(0, _this.secondStop, 300)
            _this.$refs.contentScroll.forceUpdate()
        })
      },
      onPullingUp(){
        //上拉加载
        let _this=this
          _this.pageData.pageIndex++
          if(_this.nextPage==0){
            return
          }
        _this.$ajax('post','/suggestion/getSuggestion',_this.pageData,function(data){
            _this.nextPage=data.retData.nextPage
            _this.list=_this.list.concat(data.retData.list)
        })

      },
  
},
  mounted(){
   this.getData(this.pageData)
    this.height=(this.$Header)+'px'
  }
}
</script>

<style scoped lang="stylus">
.scroll-list-wrap
  position fixed
  bottom 0
  right 0
  left 0
  background #F0EFF5
.problem
 background #F0EFF5
.box
 margin 0
 .question
  background #ffffff
  margin-top 10px
 .questionTitle
    height: 45px;
    font-size 14px
    line-height: 45px;
    padding: 0 15px;
    border-bottom: 1px solid #CCCCCC;
    color: #666;
    text-align left 
    .more
      position absolute
      right 10px
.quertList
  color #000
  font-size 14px
  text-align left 
  border-bottom: 1px solid #CCCCCC;
  .questItem
    position relative
    border-radius: 0;
    padding-left: 10px;
    padding-top 5px
    p 
      line-height 22px
      width 95%
      word-wrap:break-word
    .cubeic-select
      position absolute
      right 10px
      color #707070
      bottom 0
  .questionDetail
    padding 10px 15px
    color #666
    width 90%
    line-height 20px
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  //  display none
  .showContent
    word-wrap:break-word
    padding 10px 10px
    color #666
    line-height 20px
    display block
.quertList:last-child 
  border: none;
.show
  border none
  :last-child .questItem
    border none
.no-data-wrapper
  width 100%
  text-align center
  transform translateY(100%)
  img 
    width 100px
  p
    font-size 14px
    margin-top 10px
    color #B7B7B7
.myHeader .addSuggestion
  position absolute !important
  right 12px
  top 20px
  bottom 0
  font-size 25px

</style>
