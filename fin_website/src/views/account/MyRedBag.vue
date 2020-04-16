<template>
  <div >
    <div class="redBag bg-white">
      <div class="title">
        <span class="tit">我的红包</span>
      </div>
        <div class="tabs mt30">
          <div class="bg-white">
            <el-tabs v-model="activeName" type="border-card"  :stretch="true" @tab-click="handleClick">
              <el-tab-pane label="投资红包" name="first">
                <RedBag></RedBag>
              </el-tab-pane>
              <el-tab-pane label="加息券" name="second">
                <InterestVouchers></InterestVouchers>
              </el-tab-pane>
              <!-- <el-tab-pane label="现金奖励" name="third">
                <div class="tabContent">
                  <div class="cash">
                    <ul class="clearfix">
                      <li class="fl" v-for="(item,index) in rewardList" :key="index">
                        <p class="top"></p>
                        <div class="cashContent">
                          <p class="paperType">提现券</p>
                          <p class="paperNum">{{item.total}}<span>元</span></p>
                          <p class="paperTerm">永久有效</p>
                          <div class="tetmText">
                            <p>使用期限</p>
                            <p>{{item.create_time}}</p>
                          </div>
                        </div>
                        <p class="bottom">
                          月末结算
                        </p>
                      </li>
                    </ul>
                  </div>               
                </div>
                  <div class="noData" v-show="!rewardList.length">{{noData}}</div>               
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import RedBag from '@/components/RedBag.vue';
import InterestVouchers from '@/components/InterestVouchers.vue';
export default {
  data(){
    return {
      activeName:'first',
      redBagList:[],
      rewardList:[],
      btnText: {'0':'已失效','1':'立即使用','2':'已使用'},
      colorCls: {"蓝色": "blueInterest", "金色": 'yellowInterest', '红色': 'redInterest', '橙色': 'yellowInterest'},
    }
  },
  created(){
  },
  methods:{
    _toInvestment(status){
      if(status != 1) {
        return
      }
      this.$router.push('/investment');
    },
    handleClick(tab){
      this.activeName =tab.name
      if(this.activeName=="first"){
        this.redBagList=[]
      }else if(this.activeName=="second"){
        this.redBagList=[]
      }else{
        this.rewardList=[]
        this.reward()
      }       
    },
    reward(){
      this.$ajax({url:'/account/reward',method:"get",params:{rtype:1}}).then((data)=>{
        if(data.status=='200'){
          this.rewardList=data.list
        }
      })
    }
  },
  components: {
    RedBag,
    InterestVouchers
  }  
}
</script>
<style lang="stylus" scoped> 
  .redBag
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #333333;
    padding-bottom 30px
    .title
      margin: 20px 46px;
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
    .tabs
      font-size: 14px;
      padding: 0 40px
      box-sizing border-box
      /deep/ .el-tabs__item.is-active
        color #666
      /deep/ .el-tabs__item
        font-size 16px
        line-height: 50px;
        height  50px
      /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
          color: #000;
      }
      .tabContent
        padding 15px 0 30px 15px
        color #ffffff
        .cash
          padding 30px 47px 0 72px
          ul
            li
              margin-right: 25px;
              margin-bottom: 30px; 
              width 183px
              .top
                background: url(../../../public/img/paperCash.png) no-repeat 0 0;
                height: 11px;  
              .cashContent
                padding-left 20px
                background: #ff8400;
                font-size: 15px;
                .paperType
                  margin-bottom: 10px;
                  padding-top 4px
                .paperNum
                  font-size: 38px;
                  margin-bottom: 5px;
                  line-height: 40px;
                  span
                    font-size 17px;
                .paperTerm
                  margin-bottom: 12px;
                .tetmText
                  color: #a26700;
                  line-height: 16px;
                  padding-bottom: 12px;
                  font-size:12px;
              .bottom
                text-align: center;
                line-height: 34px;
                height: 42px;
                background: url(../../../public/img/paperCash.png) no-repeat -191px 0;
                color: #fff;
                font-size: 16px;
                display: block;
                letter-spacing: 3px;
                font-weight: bold;    
                cursor:pointer;                            
/deep/.el-tabs--border-card
    box-shadow none !important  
</style>