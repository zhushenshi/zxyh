<template>
  <div class="investment">
    <Layout>
      <div slot="main">
        <!-- 头部图片          -->
        <div class="investmentTop">
            <div class="bgImg" :style="{backgroundImage:'url('+ser.product_series_img_url+')'}" v-for="(ser,index) in series" :key="index"  v-show="activeName === index">
            </div>
            <div class="bgImg exThree" v-if="activeName === 'apply'">
          </div>
        </div>
        <div class="container">
          <div class="lyBody">
              <div class="tabBar">
                <ul>
                  <li v-for="(ser,index) in series" :key="index" :class="{'active': activeName === index}" @click="handelChange(index)">
                    {{ser.product_series_name}}
                    <s class="arrow"></s>
                  </li>
                    <li :class="{'active': activeName === 'apply'}" @click="handelChange('apply')">贷款申请
                    <s class="arrow"></s>
                  </li>
                </ul>
             </div>
              <!-- <div class="sortlist" v-if="activeName !='apply'">
                    <ul class="sort">
                      <li class="first">排序方式：</li>
                      <li><a href="javascript:void(0)" :class="{'offdown':isActive=== 'default'}" name="default" @click="period('default')">默认</a></li>
                      <li><a href="javascript:void(0)" :class="{'go':rotate,'offdown':isActive === 'period'}" @click="period('period')" name="period">投资期数<i class="arrow el-icon-bottom"></i></a></li>
                      <li><a href="javascript:void(0)" :class="{'go':rate,'offdown':isActive=== 'rate'}" @click="period('rate')" name="rate">预期年化<i class="arrow el-icon-bottom"></i></a></li>
                  </ul>
            </div> -->
            <div class="itemList"  v-if="activeName !='apply' || !series.length">
              <div class="noData" v-if="!series[activeName].orderList.length">
                暂无数据
              </div>
               <ul v-else>
                 <li v-for="(item,index) in series[activeName].orderList" :key="index">
                  <div class="partLeft">
                     <p class="itemListName">
                     <img src="./../assets/imgs/investment/icon_car.png"/>
                     {{item.title}}
                   </p>
                   <div class="item">
                     <p v-if="item.is_current==0">{{item.contractMoney|moneyToFixed(2)}}元</p>
                     <p>{{getpay(item.payment)}}</p>
                     <p v-if="item.is_current==0">{{item.periods}}</p>
                     <p v-if="item.is_current==1">长期</p>
                     <p class="income">{{item.yearRate}}</p>
                   </div>
                    <div class="item tit">
                     <p v-if="item.is_current==0">项目金额</p>
                     <p>还款方式</p>
                     <p>项目期限</p>
                     <p>预期年化收益率</p>
                   </div>
                  </div>
                  <div class="partRight">
                    <p v-if="item.is_current==0">{{(item.contractMoney-item.hasInvestAmt)|moneyToFixed(2)}}元 可投</p>
                    <a class="inveBtn" @click="itemDetail(item.productId,item.is_current)"  >立即投资</a>
                    <!-- <a :class="{'inveBtn':item.stitle ==='立即投资'}" @click="itemDetail()"  @mouseenter="enter(item)" @mouseleave="leave(item)">{{item.stitle}}</a> -->
                  </div>
                 </li>
               </ul>
            </div> 
              <div class="itemList" v-if="activeName ==='apply'">
               <ul>
                 <li v-for="(item,index) in loanApplicationList" :key="index">
                     <p class="itemListName">
                     <img src="./../assets/imgs/investment/icon_car.png"/>
                     {{item.title}}
                   </p>
                    <div class="partLeft applyLeft">
                   <div class="item">
                     <p>{{item.money}}</p>
                     <p class="income">{{item.interest}}%</p>
                   </div>
                    <div class="item tit">
                     <p>可贷金额</p>
                     <p>贷款日利率</p>
                   </div>
                  </div>
                  <div class="partRight apply">
                    <a class="inveBtn"  @click="projectDetail(item.title,item.type)">
                      立即申请
                    </a>
                  </div>
                 </li>
               </ul>
            </div>         
          <!-- <el-pagination @size-change="handleSizeChange" prev-text="上一页" next-text="下一页"  @current-change="handleCurrentChange"  :page-sizes="[100, 200, 300, 400]"  :page-size="100" background layout="prev, pager, next, jumper" :total="400">
          </el-pagination> -->
          </div>       
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src

export default {
  data(){
    return {
       activeName:0,
       isActive:"default",
       rotate:false,
       rate:false,
       list:[],
       tempOrderID:'',
       loanApplicationList:[
        {
            title: '教师贷',
            money: '5~20万',
            interest: '0.005',
            type:1
            },
            {
            title: '党员贷',
            money: '5~20万',
            interest: '0.005',
            type:2
            },
            {
            title: '公务员贷',
            money: '5~20万',
            interest: '0.005',
            type:3
            },
            {
            title: '小微贷',
            money: '5~20万',
            interest: '0.005',
            type:4
            },
            {
            title: '大额存单销售',
            money: '5~20万',
            interest: '0.005',
            type:5
            }
       ],
       count:0,
       productSeriesType:'',
       series:[{orderList:''}]
    }
  },
  components: {
    Layout,
   
  },
  created(){
    // this.productSeriesType= this.activeName
    this.selectProductSeries()
   console.log(this.activeName)
 //   this.getData()
  },
   beforeRouteEnter(to, from, next) {
   next(vm=>{        //  这里的vm指的就是vue实例，可以用来当做this使用 
   console.log(to.query.type)
   if(to.query.type){
       vm.activeName=to.query.type
     }
    })
  },
  methods: {
    getpay(payment){
           switch(payment)
            {
            case 1:
            return '按月付息到期本金'//募集中
            break;
            case 2:
            return '到期一次还本付息'
            break;
            case 3:
            return '等额本息'
            break;
            case 4:
            return '分期等额'
            break;
            case 5:
            return '等额本金'
            break;                  
            }
    },
    selectProductSeries(){
      this.$ajax({url:'/index/selectProductSeries',}).then((res)=>{
        this.series=res.list
      }) 
    },
    handelChange(val){
      this.activeName=val
      this.isActive='default'
      this.rotate=false
      this.rate=false
      this.productSeriesType=val
        
      //this.getData()

    },
    period(val){//排序切换
     this.isActive=val
     if(val==="period" || val==="rate"){
         this.count++;
        if(val==="period" && this.count>1){
          this.rate=false
          this.rotate=!this.rotate 
          this.count=0
        }
        else if(val=="rate" && this.count>1){
          this.rotate=false
          this.rate=!this.rate
          this.count=0
        }
        else{
            this.rate=false
            this.rotate=false  
        }
     }  
     },
     enter(item){
       if(item.stitle==="立即投资"){
          item.stitle="立即投资"
       }
      if(item.stitle === "已满标"){
          item.stitle="查看"
       }
     },
     leave(item){
      if(item.stitle ==="查看"){
          item.stitle="已满标"
       }
     },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
     //项目详情
    projectDetail(title,type){
       if(sessionStorage.getItem('$token')){
         this.$router.push({
        path: './projectDetail',
        query:{
          title:title,
          type:type
        }
      })
      }
      else{
          this.$confirm('您尚未登录，点击确定跳转到登录页面?', '操作提示', {
          cancelButtonText: '取消',
          cancelButtonClass: 'button--gray fr mt15',
          confirmButtonText: '确定',
          confirmButtonClass: 'button--principal fr mR20 mt15',
          type: 'warning'
        }).then(() => {
          this.goPage('/login')
        }).catch(() => {
          return
        });
      }       
    },
   async itemDetail(productId,is_current){
      this.$store.commit("productId", productId);
      if(sessionStorage.getItem('$token')){
        await this.createTempOrder()
        this.$router.push({
            path: '/itemDetail',
            query: {
                productId: productId,
                tempOrderID: this.tempOrderID,
                is_current:is_current
            }
        });
      }else{
        this.$router.push({
            path: '/itemDetail',
            query: {
                productId: productId,
                tempOrderID: this.tempOrderID,
                is_current:is_current
            }
        });
      }
    },
    async createTempOrder(){//创建临时订单
      await this.$ajax({method:'get', url:'/account/temporder',params:{productid:this.$store.state.productId}}).then( data => {
          if(data.status == '200'){
              this.tempOrderID = data.tempOrderID;
              this.$store.commit("tempOrderID", this.tempOrderID);
          }else{
            this.$message.error(data.msg);
          }
        })
    }    
    },
}
</script>
<style lang="stylus" scoped>
.investmentTop{
  width:100%;
  height: 265px;
  display: block;
}
.bgImg{
  height:260px
  background-repeat:no-repeat;
  background-size cover
}
.exOne{
  background:url('./../assets/imgs/investment/demo1.png') center no-repeat;
}
.exTwo{
  background:url('./../assets/imgs/investment/demo2.png') center no-repeat;
}
.exThree{
  background:url('./../assets/imgs/investment/demo3.jpg') center no-repeat;
}
.container{
    position: relative;
}
.lyBody{
  width: 1120px;
  margin: 0 auto 50px;
}
.tabBar {
    background-color: #fff;
    padding-top: 4px;
    ul{
      font-size: 18px;
      overflow: hidden;
      line-height: 20px;
      margin-top: 15px;
      margin-bottom: 10px;
      display:flex
      li{
        flex:1;
        text-align: center;
        border-bottom: 1px solid #ff6461;
        position: relative;
        padding-bottom: 20px;
        cursor:pointer;
      }    
       .active{
         color:#ff6461;
          .arrow{
            width: 26px;
            height: 16px;
            display: inline-block;
            position: absolute;
            bottom: -1px;
            left: 50%;
            margin-left: -13px;
            background:url('./../assets/imgs/investment/ico_common.png') center no-repeat;
        }
       }
         li:hover{
            color:#ff6461;     
          .arrow{       
              width: 26px;
              height: 16px;
              display: inline-block;
              position: absolute;
              bottom: -1px;
              left: 50%;
              margin-left: -13px;
              background:url('./../assets/imgs/investment/ico_common.png') center no-repeat;
            }
        }
    }
}
.sortlist {
    margin-top: 10px;
    ul{
      padding: 15px 20px;
      overflow: hidden;
      background: #fff;
      li{
        margin-right: 75px;
        float: left;
        a{
          color:
        }       
        .arrow {
          transform:rotate(0deg);
          font-weight:bold;
         }
         
      }
    }         
}
.offdown 
{
  color:#ff0000;
}
.go{
   .arrow {
      transform:rotate(180deg) !important;
      font-weight:bold;
}
}
.sortlist ul li i.arrow {
    display: inline-block;
    margin-left: 3px;
}
.sortlist ul li a.ondown {
  color:#ff0000;
}
.itemList{
    width: 100%;
      li{
        background:#ffffff;
        padding: 15px;
        overflow: hidden;
        border: 1px solid #e2e2e2;
        background: #fff;
        margin-top 10px;
      }
      li:hover{
         box-shadow: 0 0 3px 3px #fab0b0 ;
      }
}
.partLeft{
    width: 800px;
    float: left;
    .item{
      display:flex;
      .income{
        color:#ff6461;
        font-size:18px;
      }
      p{
        flex 1;
        height 30px;
        line-height 30px;
        text-align center;
        font-size:14px;
        margin-top 8px;
      }
    }
    .tit{
      color: #999999;
    }
}
.partRight{
    height: 102px;
    float: right;
    width: 228px;
    border-left: 1px dashed #e2e2e2;
    text-align: center;
    padding-top: 12px;
    font-size: 14px;
}
.itemListName{
    font-size: 16px;
    border-bottom: 1px dashed #d3d3d3;
    padding-bottom: 4px;
    zoom: 1;
    img{
        vertical-align:middle;
    }  
}
.partRight a{
    display: block;
    border-radius: 5px;
    line-height: 38px;
    height: 38px;
    width: 180px;
    font-size: 16px;
    margin: auto;
    margin-top:10px;
    cursor:pointer;
    border: 1px solid #aeaeae;
    color: #aeaeae;
}
.partRight a:hover{
   background:#aeaeae;
   color:#ffffff;
}
.inveBtn{
    border: 1px solid #ff6461 !important;
    color: #ff6461 !important;
}
.inveBtn:hover{
  background:#ff6461 !important;
  color:#ffffff !important;
}
.el-pagination{
  text-align:right;
  margin-top:20px;
}
>>>.el-pagination.is-background .el-pager li:not(.disabled).active{
  background:#ff6461 !important;
}
>>>.el-pagination.is-background .el-pager li {
   border: 1px solid #e2e2e2;
   background:#ffffff;
}
>>>.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #ffffff;
    background:#ff6461;
}
>>>.el-pagination.is-background .btn-next,>>>.el-pagination.is-background .btn-prev{
   border: 1px solid #e2e2e2;
   background:#ffffff;
   font-size:12px;
   padding:0 5px;
}
.applyLeft{
  margin-top:10px;
  width:49%;
}
.apply{
  border:1px solid #ffffff;
  height:60px;
}
.noData{
  text-align center
  margin-top 20px
}
</style>
