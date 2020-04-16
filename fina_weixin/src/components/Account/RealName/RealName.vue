<template>
	<div class="realName">
    <div ref="MyHeader" v-if="!isWeixin"><MyHeader :title="'实名认证'"></MyHeader></div>
    <div class="container" style="border-top:1px solid #F5F5F5;">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
          <div class="items item-field">
            <mt-field label="真实姓名" type="text" placeholder="请输入真实姓名" :attr="{ maxlength: 20 }" v-model="form.custName"></mt-field>
            <mt-field label="身份证号" type="text" placeholder="请输入身份证号" :attr="{ maxlength: 18 }" v-model="form.custIc"></mt-field>
          </div>
          <div class="base-button-container">
            <div class="base-button" @click="realName">进行验证</div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url';
export default {
  name: 'realName',
  data () {
    return {
      height: 0,
      form:{
        custName: '',
        custIc: ''
      }
    }
  },
  created () {
    this.$ajax('get',baseURL +'/account/security','',(data)=>{
      this.form.custName=data.custName
      this.form.custIc=data.custIc
    })    
  },
  methods: {
    checkif(){
      if(!this.form.custName){
          this.$Toast({
          message: '真实姓名不能为空',
          position: 'bottom'
        })
        return false
      }else if(!/^[\u4e00-\u9fa5]{1,10}$/.test(this.form.custName)){
        this.$Toast({
          message: '真实姓名为10个以内的汉字',
          position: 'bottom'
        })
        return false
      }else if(!this.form.custIc){
        this.$Toast({
          message: '身份证号不能为空',
          position: 'bottom'
        })
        return false
      }else if(!/^\d{17}[\dx]$/i.test(this.form.custIc)){
        this.$Toast({
          message: '请输入18位身份证号码',
          position: 'bottom'
        })
        return false
      }
      return true

    },    
    realName(){
      if(!this.checkif()){
        return
      }
      this.$ajax('post',baseURL +'/account/updateCustInfo',this.form,(data)=>{
        this.$Toast({message:data.msg,position:'bottom'});
        this.$router.go(-1)
      })        
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.height=window.screen.availHeight-this.$refs.MyHeader.offsetHeight
      new BScroll(this.$refs.wrapper, {click: true})
    })
  }
}
</script>

<style scoped lang="stylus">
.realName{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #F3F3F3;
  text-align: center;
  .items{
    background #ffffff
    margin 0 0 10px 0;
    .item-label{
      font-size:17px;
      font-family:FZLanTingHeiS-R-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align left
      padding 10px
    }
    .item-value{
      position relative
    }
    .captcha{
      padding 10px 20px
      border:1px solid rgba(153,153,153,1);
      border-radius:4px;
    }
  }
}          
</style>