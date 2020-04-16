<template>
  <div class="setting">
    <MyHeader ref="header" :backPath="'portal'">{{$t('lang.settingView.setting')}}</MyHeader>
        <div class="scroll-list-wrap" :style="{top:height}">
          <cube-scroll ref="scroll" >
          <div class="box">
             <div class="settingItem" @click="goToPage('/editPwd')">
               <span>{{$t('lang.settingView.pwd')}}</span>
                 <i class="iconfont icon-previewright arrow"></i>
             </div>
             <div class="settingItem">
               <span>{{$t('lang.ojk.version')}}</span>
               <span class="right-text">{{versionCode}}</span>
             </div>
             <div v-if="false" class="settingItem" @click="sheetVisible=!sheetVisible">
               <span>{{$t('lang.comm.lang')}}</span>
                 <i class="iconfont icon-previewright arrow"></i>
             </div>
          </div>
          <div class="margin">
            <div class="base-btn"  @click="setAppOut()">{{$t('lang.settingView.out')}}</div>
          </div>
          </cube-scroll>
        </div>
         <mt-actionsheet :cancelText="$t('lang.comm.cancel')" :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      height:0,
      sheetVisible: false,
      versionCode: '',
      actions: [
        {
          name:'中文',
          method: this.changeLangEvent,
          id:0
        },{
          name:'English',
          method: this.changeLangEvent,
          id:1
        },{
          name:'in_ID',
          method: this.changeLangEvent,
          id:2
        }
      ]
    }
  },
  components:{
  },
  methods: {
    setAppOut() {
      this.$ajax('post','/logout/logout',{},function(data){
        this.$store.commit("userAccount", '');
        this.$store.commit("userIdentity", '');
        this.$store.commit("userBankSstatus", '');
        this.$store.commit("userCash", '');
        this.goToPage('/login')
      }.bind(this))
    },
    goToPage (path) {
      this.$router.push(path)
    },
    changeLangEvent(index){
      if ( index.id === 1 ) {
        this.$i18n.locale = 'en-US';
      }else if(index.id===0) {
        this.$i18n.locale = 'zh-CN';
      }else if(index.id===2){
        this.$i18n.locale = 'in-ID';
      } 
      localStorage.setItem('_lang',this.$i18n.locale)
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.$store.commit("tabPage", lang.comm.user)
    },
    getAppsetting(){
      let _this=this;
      _this.$ajax('post','/getAppSetting',{},function(data){
        var data = data.retData;
        if(data.appSetting){
          _this.versionCode=data.appSetting.android_version;
        }
      },"",true)
    }
  },
  mounted(){
    this.height=this.$Header+'px'
    this.getAppsetting()
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
   position relative
   .settingItem
    display flex
    width 100%
    color #000000
    text-align left 
    background #ffffff
    height 45px
    line-height 45px
    padding 0 15px
    font-size 14px
    border-bottom: 1px solid rgb(241, 241, 241);
    .title
      flex 1
    .imgBox
      height 30px;
      width 30px
      margin-right: 55px;
      margin-top: 8px
      border-radius 50%
      overflow hidden
      position relative
    .imgcon
      width 100%;
      margin auto
      position absolute
      top 0
      bottom 0
    .arrow
      position absolute
      font-size 25px
      right: 15px;
      color: #9C9C9C
    .settingItem:nth-last-child(1)
      border none
    .right-text{
      position absolute
      right 15px
    }
.margin
  margin 45px 15px 0    
</style>
