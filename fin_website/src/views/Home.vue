<template>
  <div class="home" v-loading.fullscreen.lock="false">
    <Layout>
      <div slot="main" class="mb30">
        <div class="swiperWrapper">
          <swiper :options="swiperOption" class="swiper-container" >
            <!-- slides -->
            <swiper-slide class="swiper-item" v-for='item of swiperList' :key='item.id'>
                <img class='swiper-img' :src='item.imgurl' alt="" />
                 <!-- <span class="swiper-img" :style="{backgroundImage:'url('+item.imgurl+')'}"></span> -->
            </swiper-slide>
            <!-- Optional controls ,显示小点-->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="noticeBg">
          <div class="notice content">
            <img src="./../assets/noticeIcon.png"/>
            <ul :class="{marquee_top:animate}">
              <li v-for="(value,index) in noticeList" :key="index">
                {{value.content}}
              </li>
            </ul>
            <span class="noData" v-if="!noticeList.length">暂无数据</span>
          </div>
        </div>
        <div class="wrapper bg-white mt30">
          <ul class="content clearfix intro">
            <li class="rightline fl">
                <div class="fl logo_div">
                    <img src="../../public/img/ind_1.png">
                </div>
                <div class="fl details_div">
                  <p>安全</p>
                  <p>足额资产覆盖</p>
                  <p>连带责任担保</p>
                  <p>智能风控引擎</p>
                </div>
            </li>
            <li class="rightline fl">
                <div class="fl logo_div" style="margin-left: 64px;">
                    <img src="../../public/img/ind_2.png">
                </div>
                <div class="fl details_div">
                  <p>产品</p>
                    <p>15天新手专享标</p>
                    <p>期限1-12个月</p>
                    <p>当日起息  立享收益</p>
                </div>
            </li>
            <li class="fl">
                <div class="fl logo_div" style="margin-left: 76px;">
                    <img src="../../public/img/ind_3.png">
                </div>
                <div class="fl details_div">
                    <p>信息</p>
                    <p>电子数据保全</p>
                    <p>Symantec加密认证</p>
                    <p>阿里金融云认证</p>
                </div>
            </li>
          </ul>
        </div>
        <div class="content" v-for="(ser,index) in series" :key="index" >
          <div v-if="ser.orderList&&ser.orderList.length">
          <div class="productionName">
            <span>{{ser.product_series_name}}</span>
            <span>{{ser.remark}}</span>
            <a  class="fr" @click="more(index)" style="cursor: pointer;">更多>></a>
          </div>
          <div class="productBox clearfix">
            <div class="item" v-for="(item,index) in ser.orderList" :key="index+100">
              <p class="itemTitle">{{item.title}}</p>
              <div class="circleCanvas">
                <!-- <canvas width="200" height="200" :id="item.orderId" style="width:100%;height:100%;"></canvas> -->
                <vue-circle ref="progressCircle" :progress="ser.is_current===0?item.progress:50" :reverse="false" line-cap="round" :fill="fill" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0" :start-angle="0" insert-mode="append" :thickness="15" :show-percent="false" :animation="{ duration: 600 }">
                  <p class="progressNum progress" :class="item.progress == 100 ? 'jieqingCls' : ''">
                    <span v-if="ser.is_current===0">{{item.progress}} %</span>
                    <span v-else>50%</span>
                   </p>  
                  <p class="circleCanvasTitle">投资进度</p>
                </vue-circle>
              </div>
              <p class="detailsProgress">
                <span>预期年化收益率：</span>
                <span>{{item.yearRate}}</span>
              </p>
              <p class="detailsSurplus">
                <span>项目期限：</span>
                <span v-if="ser.is_current==0">{{item.periods}}</span> 
                <span v-else>长期</span>               
              </p>
              <p class="detailsBtn">
                <button class="button--primary" @click="gotoInvest(item.productId,ser.is_current)">
                  立即投资
                  <!-- <router-link to="/itemDetail">立即投资</router-link> -->
                </button>                
              </p>
            </div>
          </div>
        </div>
        </div>
        <div class="content clearfix text-center">
          <div class=" loanLeft">
            <p class="title">贷款申请</p>
            <p>贷款申请 便捷高效</p>
            <div class="loanLogo"><img src="../../public/img/loanLogo.png" alt=""></div>
            <div class="loanBtn" @click="more('apply')">更多</div>
            <img class="triangle triangle1" src="../../public/img/triangle1.png">
            <img class="triangle triangle2" src="../../public/img/triangle2.png">
          </div>
          <div class="text-left loanRight">
            <div class="bg-white loanRightBox" v-for="(item,index) in products2" :key="index">
              <p class="loanRightItemTitle">{{item.title}}</p>
              <div class="loanRightItemInfo">
                <p class="loanRightItemNum"><span>{{item.money}}</span><span class="loanRightItemRate">{{item.interest}}%</span></p>
                <p class="clearfix"><span>可申请额度</span><span>贷款日利率</span><button class="button--primary fr" @click="projectDetail(item.title,item.type)">立即申请</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'; // @ is an alias to /src
import VueCircle from 'vue2-circle-progress'

import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import { initCircleCanvas } from '@/utils/circleCanvas'

export default {
  data(){
    return {
      swiperOption:{
        // 参数选项,显示小点
        pagination:{
          el:'.swiper-pagination',
          clickable: true,
        },
        // //循环
        // loop:true,
        // //每张播放时长3秒，自动播放
        // autoplay:2000,
        // //滑动速度
        // speed:1000,
        // // delay:1000        
      },
      swiperList:[
        // {
        //   id:'001',
        //   imgurl:"http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg"
        // },
        // {
        //   id:'002',
        //   imgurl:"http://img1.qunarzz.com/piao/fusion/1805/f1/e57bc93226317102.jpg_750x200_9ab37bd0.jpg"
        // },
        // {
        //   id:'003',
        //   imgurl:"http://img1.qunarzz.com/piao/fusion/1804/c4/1cdd28811593b802.jpg_750x200_5fbb7c91.jpg"
        // }
      ],
    series:[
      {
        // title:'新手专享',
        // subTitle:'新手专享 超高收益',
        // products:[{"hasInvestAmt":0.00,"prdId":"d206c9ebb5244039ab71e232ea4a3408","orderNumber":"20180506148","loanType":1,"saleId":"","orderId":"2f845fb93b284394b3b3459ba35cf721","persiodUp":15,"rateDown":1.00,"ordPrdNumber":"20180506148","rateUp":15.00,"limitTime":"20180513143452","online_time":"20180506143452","activitiesRate":0.0000,"left_periods":1,"periods":1,"payment":2,"step_amount":100.00,"id":"0996ad0864a542889b4975f80326a264","productType":2,"invest_rate":15.0000,"persiodDown":15,"prdNumber":"20180506148","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":15,"createTime":"20180506143430","tradeStatus":0,"progress":0.00,"contractMoney":2000.00,"productSeriesType":1,"realyRate":15.0000,"periods_type":3,"pro_name":"新手标"},{"hasInvestAmt":3100.00,"prdId":"d206c9ebb5244039ab71e232ea4a3408","orderNumber":"20180507155","loanType":1,"saleId":"","orderId":"eb4d968586384995948f39ce05200c08","persiodUp":15,"rateDown":1.00,"ordPrdNumber":"20180507155","rateUp":15.00,"limitTime":"20180514141347","online_time":"20180507141347","activitiesRate":0.0000,"left_periods":1,"periods":1,"payment":2,"step_amount":100.00,"id":"0996ad0864a542889b4975f80326a264","productType":2,"invest_rate":15.0000,"persiodDown":15,"prdNumber":"20180507155","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":15,"createTime":"20180507141307","tradeStatus":0,"progress":91.18,"contractMoney":3400.00,"productSeriesType":1,"realyRate":15.0000,"periods_type":3,"pro_name":"新手标"},{"hasInvestAmt":1200.00,"prdId":"d206c9ebb5244039ab71e232ea4a3408","orderNumber":"20180507157","loanType":1,"saleId":"","orderId":"d62a79876091448f9e43bbcbe1eef26e","persiodUp":15,"rateDown":1.00,"ordPrdNumber":"20180507157","rateUp":15.00,"limitTime":"20180514174417","online_time":"20180507174417","activitiesRate":0.0000,"left_periods":1,"periods":1,"payment":2,"step_amount":100.00,"id":"0996ad0864a542889b4975f80326a264","productType":2,"invest_rate":15.0000,"persiodDown":15,"prdNumber":"20180507157","custInfoId":"9d3b2df5ffd345c08ad4180c27eaacc9","investTerm":15,"createTime":"20180507173026","tradeStatus":0,"progress":60.00,"contractMoney":2000.00,"productSeriesType":1,"realyRate":15.0000,"periods_type":3,"pro_name":"新手标"},{"hasInvestAmt":600.00,"prdId":"ea05e2922cf3408aac0af42f299c6aa3","orderNumber":"20180508161","loanType":2,"saleId":"","carName":"奔驰","orderId":"393e445e7684478a9d174e2143e4d17d","persiodUp":20,"rateDown":5.00,"ordPrdNumber":"20180508161","rateUp":20.00,"limitTime":"20180515094427","online_time":"20180508094427","activitiesRate":2.0000,"left_periods":1,"periods":1,"payment":2,"step_amount":100.00,"id":"a77c1252f46747efb0cd7523970bd95a","productType":2,"invest_rate":15.0000,"persiodDown":1,"prdNumber":"20180508161","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":15,"createTime":"20180508093322","tradeStatus":0,"progress":30.00,"contractMoney":2000.00,"productSeriesType":1,"realyRate":15.0000,"periods_type":3,"pro_name":"新手标BBB"}]
      },
      // {
      //   title:'抵押系列',
      //   subTitle:'实物抵押 安全可靠',
      //   products:[{"hasInvestAmt":1300.00,"prdId":"72beefe9f27441a0b8cca8b3abf33eb5","orderNumber":"20180427108","loanType":2,"saleId":"","carName":"11","orderId":"f424207ca21f4f449282e0c2e46e4021","persiodUp":12,"rateDown":7.90,"ordPrdNumber":"20180427108","rateUp":11.60,"limitTime":"20180512142445","online_time":"20180427142445","activitiesRate":0.6000,"left_periods":30,"periods":1,"payment":1,"step_amount":100.00,"id":"0764d1bcff2e4b83bc8f42982e5ceb7f","productType":2,"invest_rate":7.9000,"persiodDown":1,"prdNumber":"20180427108","custInfoId":"1d9c0eb4c8f94bcba592db2d9c41ae32","investTerm":30,"createTime":"20180427142348","tradeStatus":0,"progress":21.67,"contractMoney":6000.00,"productSeriesType":2,"realyRate":7.9000,"periods_type":1,"pro_name":"车抵贷"},{"hasInvestAmt":500.00,"prdId":"72beefe9f27441a0b8cca8b3abf33eb5","orderNumber":"20180503122","loanType":2,"saleId":"","carName":"1212","orderId":"068299f965544e40a2f5d9b02b14e874","persiodUp":12,"rateDown":7.90,"ordPrdNumber":"20180503122","rateUp":11.60,"limitTime":"20180518112311","online_time":"20180503112311","activitiesRate":0.6000,"left_periods":30,"periods":1,"payment":1,"step_amount":100.00,"id":"0764d1bcff2e4b83bc8f42982e5ceb7f","productType":2,"invest_rate":7.9000,"persiodDown":1,"prdNumber":"20180503122","custInfoId":"01fcfb6afe7a4ec8aa788cfc5792a402","investTerm":30,"createTime":"20180503112250","tradeStatus":0,"progress":5.56,"contractMoney":9000.00,"productSeriesType":2,"realyRate":7.9000,"periods_type":1,"pro_name":"车抵贷"},{"hasInvestAmt":4960.00,"prdId":"c46cc7347213439ca24a2756fa0d69ac","orderNumber":"20180507154","loanType":2,"saleId":"","carName":"追风","orderId":"1eea9e3d4a404180890c71ea550dfe20","persiodUp":12,"rateDown":7.90,"ordPrdNumber":"20180507154","rateUp":11.60,"limitTime":"20180522135146","online_time":"20180507135146","activitiesRate":1.0000,"left_periods":360,"periods":12,"payment":1,"step_amount":100.00,"id":"44683b19e8994155994541c3d3158449","productType":2,"invest_rate":10.6000,"persiodDown":1,"prdNumber":"20180507154","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":365,"createTime":"20180507135114","tradeStatus":0,"progress":76.31,"contractMoney":6500.00,"productSeriesType":2,"realyRate":10.6000,"periods_type":1,"pro_name":"车抵贷"},{"hasInvestAmt":0.00,"prdId":"32e12f6e1b6849a992ece1cd7c1771c8","orderNumber":"20180507156","loanType":2,"saleId":"","carName":"追风","orderId":"44272912af1749fe836d8513b02094cf","persiodUp":12,"rateDown":7.90,"ordPrdNumber":"20180507156","rateUp":11.60,"limitTime":"20180522142214","online_time":"20180507142214","activitiesRate":0.6000,"left_periods":60,"periods":2,"payment":1,"step_amount":100.00,"id":"1ad481ce098f4330ae0f0d0876457ca7","productType":2,"invest_rate":8.3000,"persiodDown":1,"prdNumber":"20180507156","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":60,"createTime":"20180507142133","tradeStatus":0,"progress":0.00,"contractMoney":250000.00,"productSeriesType":2,"realyRate":8.3000,"periods_type":1,"pro_name":"车抵贷"}],
      // },
      // {
      //   title:'信用系列',
      //   subTitle:'信用投资 财富升值',
      //   products:[{"hasInvestAmt":100.00,"prdId":"720e3e84dcb7480183d09c28f7648f6d","orderNumber":"20180504134","loanType":3,"saleId":"","orderId":"f9dd46762f6e416e82499402bf9c0c11","persiodUp":12,"rateDown":9.90,"ordPrdNumber":"20180504134","rateUp":11.90,"limitTime":"20180519143331","online_time":"20180504143331","activitiesRate":1.0000,"left_periods":360,"periods":12,"payment":1,"step_amount":100.00,"id":"89c5a0a6384f47239d10ce1d05b38a77","productType":2,"invest_rate":10.9000,"persiodDown":6,"prdNumber":"20180504134","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":365,"createTime":"20180504142947","tradeStatus":0,"progress":8.34,"contractMoney":1200.00,"productSeriesType":3,"realyRate":10.9000,"periods_type":1,"pro_name":"信用标"},{"hasInvestAmt":300.00,"prdId":"720e3e84dcb7480183d09c28f7648f6d","orderNumber":"20180504138","loanType":3,"saleId":"","orderId":"2472cf850e2f4c92969837f7f1aea1a5","persiodUp":12,"rateDown":9.90,"ordPrdNumber":"20180504138","rateUp":11.90,"limitTime":"20180519145341","online_time":"20180504145341","activitiesRate":1.0000,"left_periods":360,"periods":12,"payment":1,"step_amount":100.00,"id":"89c5a0a6384f47239d10ce1d05b38a77","productType":2,"invest_rate":10.9000,"persiodDown":6,"prdNumber":"20180504138","custInfoId":"01fcfb6afe7a4ec8aa788cfc5792a402","investTerm":365,"createTime":"20180504145308","tradeStatus":0,"progress":50.00,"contractMoney":600.00,"productSeriesType":3,"realyRate":10.9000,"periods_type":1,"pro_name":"信用标"},{"hasInvestAmt":200.00,"prdId":"720e3e84dcb7480183d09c28f7648f6d","orderNumber":"20180506145","loanType":3,"saleId":"","orderId":"3fd10ae8c2b04d838f81454775149d0e","persiodUp":12,"rateDown":9.90,"ordPrdNumber":"20180506145","rateUp":11.90,"limitTime":"20180521131002","online_time":"20180506131002","activitiesRate":1.0000,"left_periods":360,"periods":12,"payment":1,"step_amount":100.00,"id":"89c5a0a6384f47239d10ce1d05b38a77","productType":2,"invest_rate":10.9000,"persiodDown":6,"prdNumber":"20180506145","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":365,"createTime":"20180506130743","tradeStatus":0,"progress":10.00,"contractMoney":2000.00,"productSeriesType":3,"realyRate":10.9000,"periods_type":1,"pro_name":"信用标"},{"hasInvestAmt":1300.00,"prdId":"720e3e84dcb7480183d09c28f7648f6d","orderNumber":"20180506146","loanType":3,"saleId":"","orderId":"dbe562ca661449e1a3c2eba7f5c60904","persiodUp":12,"rateDown":9.90,"ordPrdNumber":"20180506146","rateUp":11.90,"limitTime":"20180521140934","online_time":"20180506140934","activitiesRate":1.0000,"left_periods":360,"periods":12,"payment":1,"step_amount":100.00,"id":"89c5a0a6384f47239d10ce1d05b38a77","productType":2,"invest_rate":10.9000,"persiodDown":6,"prdNumber":"20180506146","custInfoId":"8639a5de25f445eeb185523a53f0e653","investTerm":365,"createTime":"20180506140859","tradeStatus":0,"progress":37.14,"contractMoney":3500.00,"productSeriesType":3,"realyRate":10.9000,"periods_type":1,"pro_name":"信用标"}],
      // }
    ],
      animate: false,
      noticeList:[],
      products2: [
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
            // {
            // title: '大额存单销售',
            // money: '5~20万',
            // interest: '0.005',
            // type:5
            // }
        ],
				fill: {
					color: ["#fa7009"]
        },
        tempOrderID:''           
    }
  },
  components: {
    Layout,
    swiper,
    swiperSlide,
    VueCircle
  },
  created(){
    setInterval(this.showMarquee, 2000);
		this.getNotice()
    this.getCarousel()
    this.selectProductSeries()
    // this.$ajax({
    //   url:'/account/refreshAccount'
    // })
    // this.$ajax({
    // url:'/index/Investment',
    // data:{
    //   channelNo: '004',
    //   menuId: '45',
    //   navId: 60,
    //   pageNo: 1,
    //   pageSize: 3}
    // }).then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // });
    // let canvasData=function(list) {
    //   if(!list.length){
    //     return;
    //   }
    //   var ret = [];
    //   for(var i=0;i<list.length;i++){
    //     var item = list[i];
    //     if(item.orderId){
    //       var time = "";
    //       ret.push({canvasId:item.orderId,num:item.progress,word:"投资进度",time:time})
    //     }
    //   }
    //   return ret;
    // }
    // this.$nextTick(()=>{
    //   var arr=[]
    //   console.log(123)
    //   this.series.forEach((item)=>{
    //     console.log(item.products)
    //     item.products?arr=arr.concat(item.products):''
    //   })
    //   var a=true
    //   if(a){
    //     initCircleCanvas(canvasData(arr))
    //   }else{
    //     console.log(1);
    //   }
    // })
  },
  methods: {
    more(type){
      console.log(type)
        this.$router.push({
        path: './investment',
        query:{
          type:type
        }
      })
    },
     projectDetail(title,type){
        if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }
      else {
         this.$router.push({
        path: './projectDetail',
        query:{
          title:title,
          type:type
        }
      })
      }
       
    },
    getCarousel(){
      this.$ajax({url:'/index/carousel?type=0',method:"get"}).then((res)=>{
        console.log(res.list)
        this.swiperList=res.list
      })
    },   
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.noticeList.push(this.noticeList[0]);
        this.noticeList.shift();
        this.animate = false;
      }, 1000);
    },
    //通知
    getNotice(){
      this.$ajax({url:'/account/notice',method:"get"}).then((data)=>{
        console.log(data)
        this.noticeList=data.list
      })
    },
    selectProductSeries(){
      this.$ajax({url:'/index/selectProductSeries',}).then((res)=>{
        this.series=res.list
      })
    },
    async gotoInvest(productId,is_current){
      console.log(productId)
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
@import "../assets/stylus/btn"
.swiperWrapper >>>.swiper-pagination-bullet-active
    display: inline-block;
    margin-right: 15px;
    line-height: 0px;
    padding: 0;
    background: #fff;
    box-shadow: 1px 1px 2px 0px;
    cursor: pointer;
    border-radius: 50%;
    width: 16px;
    height: 16px;
.swiperWrapper >>>.swiper-pagination-bullet
    display: inline-block;
    margin-right: 15px;
    line-height: 0px;
    padding: 0;
    background: #fff;
    box-shadow: 1px 1px 2px 0px;
    cursor: pointer;
    border-radius: 50%;
    width: 16px;
    height: 16px;
.swiperWrapper
    overflow:hidden
    width 100%
    // height:0
    // padding-bottom:26.6666667%
    background :#ccc
    .swiper-item
        width:100%
        .swiper-img
            width:100%
            // height:100%
            vertical-align middle

ul.intro
  padding 27px 40px
  box-sizing border-box
  margin-top 30px
  li
    width 33.333%
    .logo_div
      width 100px
      margin-right 20px
      position relative
      top 6px
      img
        transform: translateY(0px);
        transition: transform 0.2s ease-in;
        animation-play-state: paused
      img:hover
        transform: translateY(-5px);             
    .details_div
      line-height 28px
      font-size 1.6rem
      color #666
  .rightline
    border-right: 1px solid #F5F6F8;
    box-sizing border-box
//
.productionName
  font-size: 1.8rem;
  color: #999;
  line-height: 85px;
  span:first-child
    font-size: 2.4rem;
    color: #ff6131;
    padding-right: 20px;
    position: relative;
  span:first-child:after
    content: "";
    position: absolute;
    top: 3px;
    right: 8px;
    width: 2px;
    height: 27px;
    background: #999;
  a
    font-size: 1.4rem;
.productBox
  .item
    width: 23%;
    float: left;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    margin-right: 4px;
    min-height: 387px;
    padding: 0px 6px;
    margin-right: 16px;
    margin-bottom 30px
    .itemTitle
      font-size: 20px;
      color: #333;
      margin: 16px 0 0;
    .circleCanvas
      width: 200px;
      height: 200px;
      margin: 0 auto;
      padding-top:20px
      box-sizing border-box
      // border 1px solid red;
      .circleCanvasTitle
        font-size 16px
      .progressNum
        font-size:16px;
      .jieqingCls
        color #888888
    .detailsProgress
      color: #333;
      font-size: 1.8rem;
      span:last-child
        color #ff5926
    .detailsSurplus
      color: #999;
      font-size: 1.8rem;
      margin-top: 10px;
    .detailsBtn
      margin: 16px 0;
      button
        font-size: 2.0rem;
        width:219px;
        line-height: 42px;
        padding 0
        a
          color: inherit;
  .item:nth-child(4n)
    margin-right 0
.loanLeft
  float left
  width:260px;
  height:100%;
  background:rgba(255,119,67,1);
  position:relative;
  color:#ffffff;
  font-size:14px;
  padding-bottom 20px
  .title
    font-size:24px;
    margin:43px auto 20px;
  .loanLogo
    img
      width:100px;
      margin-top:42px;
  .loanBtn
    width:168px;
    line-height:32px;
    border:1px solid rgba(255,255,255,1);
    margin:30px auto 0;
    cursor pointer
  .triangle
    height:8px;
    position:absolute;
    right:-30px;
  .triangle1
    bottom:0;
  .triangle2
    top:0;
.loanRight
  float left
  overflow hidden
  // display: table-cell;
  padding:8px 0;
  width:940px;
  height:100%;
  box-sizing:border-box;
  color:#333;
  font-size:14px;
  .loanRightBox
    width:50%;
    height:50%;
    box-sizing border-box
    padding-left:30px;
    float left
    // display inline-block
    .loanRightItemTitle
      font-size:16px;
      padding-top:25px;
    .loanRightItemInfo
      .loanRightItemNum
        margin:26px 0 18px;
        font-size:24px;
        .loanRightItemRate
          font-size:28px;
          color:#FA4E3A;
      p
        button 
          padding:10px 24px;
          margin-right:40px;
          position relative
          top -10px;
        :nth-child(1)
          display:inline-block;
          width:140px;
  .loanRightBox:nth-child(odd)
    border-right:1px solid #DCDCDC;
  .loanRightBox:nth-child(1)
    border-top:none;
  .loanRightBox
    border-top:1px solid #DCDCDC;

.notice{
	height:40px;
	line-height 40px;
	background #ffffff;
	border-radius 4px
	text-align left
	font-size 13px
	overflow: hidden;
	ul{
		float left
		position relative
		top 3px
		width 90%
		li {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			padding-left: 20px;
			white-space nowrap
			text-overflow ellipsis
			overflow hidden
			}		
	}
	img{
		position: relative;
        top: 8px;
		float left
		margin-left 12px
		vertical-align middle
		width 18px
		height 18px
	}
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}
.noticeBg{
  background #ffffff
}
.swiper-img{
	// height: 384px !important;
  // display:inline-block;
  // background-repeat:no-repeat
  // background-size:100% 100%
}
// .swiperWrapper{
//   padding-bottom: 384px !important;
// }
.noData{
  position:relative
  top -3px
  left 10px
}
</style>
