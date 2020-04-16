<template>
  <div >
    <div class="inviteFriends bg-white">
        <div class="safeTitle">
             <span class="tit">邀请好友</span>
        </div>
        <div class="listManage">
           <img src="./../../assets/imgs/demo.jpg"/>
           <router-link to="/viewActivity" class="invBtn">邀请好友</router-link>
           <h5 class="invH5">我的邀请记录</h5>
           <p>
               您的好友邀请人数为：<span class="colorEm_3">{{totalCount}}</span>人&nbsp;，&nbsp;
               已获得佣金总额：<span class="colorEm_3">{{sum}}</span>元
            </p>
            <div class="invTab invHead">
               <div>用户名</div>
               <div>注册时间</div>
               <div>好友投资总额（元）</div>
               <div>已获得佣金总额（元）</div>
            </div>
            <div class="invTab" v-for="(item,index) in invList" :key="index">
               <div>{{item.name}}</div>
               <div>{{item.date}}</div>
               <div>{{item.orderCount}}</div>
               <div>{{item.countIncome}}</div>
            </div>
            <div class="noData" v-if="!invList.length">暂无数据</div>
            <div class="wenxintishi">
                <p>温馨提示</p>
                <p>1.邀请奖励注意事项:</p>
                <p>(1)邀请好友注册奖励每邀请一个好友实名注册成功,即可获得2元提现券。<br>
                (2)邀请好友投资即可获得好友投资年化金额3%的佣金奖励。<br>
                (3)邀请实名注册、投资奖励无上限,邀请越多,奖励越多。<br>
                (4)所有奖励以月为单位进行结算,结算奖励永久有效,奖励会发至平台个人账户,请绑卡后进行提现。<br>
                (5)请不要随意邀请您不熟悉的人,避免给别人带来不必要的困扰。</p>
                <p>2.使用过程中遇到问题,请联系在线客服或致电400-600-1919</p>
             </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        invList:[],
        totalCount:"0",
        sum:''
    }
  },
  created(){
    this.invite()
  },
  methods: {
          //邀请记录
        invite(){
            this.$ajax({url:'/account/invitelist',method:"get",data:{
              pagesize:100000000,
              curpage:1
            }}).then((data)=>{
                if(data.status=="200"){
                    this.invList=data.list
                    this.totalCount=data.totalCount
                    let sum = 0;
                    this.invList.forEach((item) => {
                      sum += item.countIncome;
                    });
                    this.sum = sum;
                } 
                }
            )
    },
  }
}
</script>
<style lang="stylus" scoped> 
  .inviteFriends
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;  
    .safeTitle
        margin: 20px 40px;
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
    .listManage
        margin: auto 40px; 
        padding-bottom: 30px;
        position relative
        .invBtn
            width: 130px !important;
            height: 38px !important;
            display: block;
            position: absolute;
            top: 137px;
            left: 532px !important;
            opacity: 0;
            background: #fff;
        .invH5
            font-size 14px
            margin 15px 0 5px
        .colorEm_3
            color #ff6461
        .invHead
            background #fafafa
            border-top: 1px solid #e2e2e2
            font-size: 14px
            margin-top:10px
        .invTab
            display flex
            height 40px
            line-height 40px
            border-bottom: 1px solid #e2e2e2
            div
               flex 1
               text-align center
        .wenxintishi
            margin-top 30px
.noData
  text-align center
  margin-top 20px
</style>