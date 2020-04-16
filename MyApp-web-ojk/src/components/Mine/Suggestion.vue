<template>
  <div class="suggestion">
    <MyHeader  ref="header">{{$t('lang.suggestionView.suggestion')}}</MyHeader>
        <div class="scroll-list-wrap" :style="{top:height}">
          <cube-scroll ref="scroll" >
          <div class="box">
             <textarea :placeholder="$t('lang.suggestionView.advices')" @input="descInput" v-model="content" maxlength="400"></textarea>
              <div class="fontNum">
                <span id="text-length">{{remnant}}</span>
                <span>/400</span>
            </div>
          </div>
          <div class="margin">
            <div class="base-btn" @click="suggestion()">{{$t('lang.suggestionView.Submission')}}</div> 
          </div>
          </cube-scroll>
        </div>
  </div>
</template>

<script>
export default {
  name: 'suggestion',
  data () {
    return {
      height:0,
      content:'',
      remnant:400
   
    }
  },
  components:{
  },
  methods: {
     descInput(){
      let txtVal = this.content.length;
      this.remnant = 400 - txtVal;
    },
      checkInfo(){
        var ln=this.content.length;
        var speciReg = /^[A-Za-z0-9\u4e00-\u9fa5\，\ \。\？\！\：\,\.\?\!\:\、 ]+$/;
         let locale = this.$i18n._vm.locale
        let lang=this.$i18n._vm.messages[locale].lang
         if(ln<30){
           this.$Toast({message:lang.suggestionView.characters,position:'bottom'})
            return false;
          }
          else if(!speciReg.test(this.content)){
             this.$Toast({message:lang.suggestionView.special,position:'bottom'})
            return false;
        }
      return true
    },
    suggestion(){
      if(!this.checkInfo()){
        return
      }
      let _this=this
      let locale = _this.$i18n._vm.locale
      let lang=_this.$i18n._vm.messages[locale].lang
     _this.$ajax('post','/feedback/saveFeedback',{content:_this.content},function(data){
       if(data.retCode=="SUCCESS"){      
        _this.$Toast({message:lang.suggestionView.youAdvice,position:'bottom'})
        setTimeout(() => {
          _this.$router.go(-1);
        }, 1000);
       }else{
        _this.$Toast({message: data.retMsg,position:'bottom'})
      }
    })
  }

},
  mounted(){
     this.height=(this.$Header)/37.5+'rem'
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.scroll-list-wrap
  position fixed
  bottom 0
  left 0
  right 0
  background #F6F6F6
  .box
   position relative
   margin-top 10px
   textarea
      width 98%
      height 140px
      text-align left 
      border none
      font-size 14px
      color #8c8c8c
      padding 0 5px
      outline none
      font-family inline-size 
   .fontNum
      position: absolute;
      bottom:10px;
      right:10px;
      color:#8C8C8C;
      font-size:14px
.margin
  margin 45px 15px 0    
</style>
