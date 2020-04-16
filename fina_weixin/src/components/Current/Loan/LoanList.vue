<template>
	<div class="loanlist">
    <div ref="MyHeader"><MyHeader :title="'贷款申请'"></MyHeader></div>
    <div class="container">
      <div class="wrapper" ref="wrapper" :style="{height:height+'px'}">
        <div class="content">
          <div class="list-item" v-for="(item,index) in list" :key="index" @click="goToPage(item)">
            <div class="item-header"><span class="item-icon"></span>{{item.title}}</div>
            <div class="item-body">
              <div class="item-flex">
                <div class="item-up">{{item.money}}</div>
                <div class="item-down">可贷金额</div>
              </div>
              <div class="item-flex">
                <div class="item-up">{{item.interest}}</div>
                <div class="item-down">贷款日利率</div>
              </div>
              <div class="item-flex">
                <div class="item-button">立即申请</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'LoanList',
  data () {
    return {
      height: 0,
      list: [
        {
          title: '教师贷',
          money: '5~20万',
          interest: '0.005%',
          type:1
        },
        {
          title: '党员贷',
          money: '5~20万',
          interest: '0.005%',
          type:2
        },
        {
          title: '公务员贷',
          money: '5~20万',
          interest: '0.005%',
          type:3
        },
        {
          title: '小微贷',
          money: '5~20万',
          interest: '0.005%',
          type:4
        },
        {
          title: '大额存单销售',
          money: '5~20万',
          interest: '0.005%',
          type:5
        }
      ]
    }
  },
  created () {
  },
  methods: {
    goToPage(item){
      this.$router.push({name:'LoanApply',params:item})
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
.loanlist{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: #F5F5F5;
  text-align: center;
  .list-item{
    padding 10px;
    background #fff;
    margin-bottom 10px
    .item-header{
      padding 10px 0
      text-align left
      font-size:12px;
      font-family:FZLanTingHeiS-R-GB;
      font-weight:400;
      color:rgba(51,51,51,1);
      position relative
      &:after{
        position absolute
        content ""
        bottom 0
        left 0
        right 0
        border-bottom 1px dashed #dddddd  
      }
      .item-icon{
        display inline-block
        width 16px
        height 16px
        background url(../../../assets/images/sy_12@3x.png) no-repeat center center
        background-size cover
        vertical-align sub
        margin-right 5px
      }
    }
    .item-body{
      display flex
      padding 20px 0 10px
      .item-flex{
        flex 1
        .item-up{
          font-size:17px;
          font-family:FZLanTingHeiS-R-GB;
          font-weight:400;
          color:rgba(255,149,62,1);
          margin-bottom 10px
        }
        .item-down{
          font-size:12px;
          font-family:FZLanTingHeiS-R-GB;
          font-weight:400;
          color:rgba(136,136,136,1); 
        }
        .item-button{
          background:linear-gradient(90deg,rgba(250,111,10,1) 0%,rgba(255,117,4,1) 100%);
          border-radius:30px;
          color #ffffff
          margin 8px auto;
          width:80px;
          height:30px;
          line-height 30px;
        }
      }
    }
    
  }
}          
</style>