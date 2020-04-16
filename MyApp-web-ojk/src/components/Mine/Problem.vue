<template>
  <div class="problem">
    <MyHeader  ref="header">PANDUAN PEMBAYARAN</MyHeader>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="question">
            <div class="hideClass">
              <div class="quertList" v-for="(value,index) in ordList" :key="index">
                <div class="questItem" @click="start(index)">
                  <span>{{value.problem_name}}</span> 
                    <i class="cubeic-select" :class="value.active? 'routeClass' : 'cubeic-select'"></i>
                </div>
                <div :class="value.active? 'orderItem' : 'showContent'" v-html="value.problem_content"></div>
              </div>
            </div>
          </div>
        </div>       
      </cube-scroll>
    </div>
    <div v-show="!ordList.length" class="no-data-wrapper">
    <img src="./img/no-order.png"/>
    <p>{{$t('lang.orderView.noData')}}</p>
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
      txt: this.$t('lang.problemView.more'),
      num: 3,
      show:false,
      ordList:[],
    }   
  },
  components:{
  },
  methods: {
    showMore(){
      var me=this
      me.isShow=true
      me.txt=''
      me.isShow = !me.isShow;
      me.num = me.isShow? 3: me.ordList.length;
    },
    start(index){
      this.ordList[index].active=!this.ordList[index].active
    },
    getData (){
      let _this=this
      _this.$ajax('post','/problem/getFaqList','',function(data){
        // if(data.retData.resultMap){
        //   data.retData.resultMap[1].forEach((element,i) => {   
        //     element.active=false      
        //     _this.ordList.push(element)
        //   });
        // }
        for (var item in data.retData.resultMap){
            data.retData.resultMap[item].forEach((element,i) => {   
            element.active=false      
            _this.ordList.push(element)
          });
        }        
      })
    }
  },
  mounted(){
    this.getData()
    this.height=(this.$Header)+'px'
  }
}
</script>

<style scoped lang="stylus">
.problem
  position fixed
  bottom 0
  right 0
  left 0
  top 0
  z-index 100
  background #F0EFF5
  .scroll-list-wrap
    position fixed
    bottom 0
    left 0
    right 0
    background #F6F6F6
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
  border-top: 1px dashed #CCCCCC;
  margin:0 15px
  .questItem
    position relative
    border-radius: 0;
    padding-top: 10px;
    line-height 24px
    span
      overflow hidden
      word-wrap:break-word
      display inline-block
      width 95%
    .cubeic-select
      position absolute
      right 5px
      color #707070
  .orderItem
    padding 10px 15px
    color #666
    line-height 20px
    display block
  .showContent
    padding 10px 0px
    color #666
    line-height 20px
    display none
.quertList:first-child
  border:none;
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
.routeClass
  transform:rotate(180deg);
  transition-duration: 0.4s;
.cubeic-select
  transition-duration: 0.4s;
</style>
