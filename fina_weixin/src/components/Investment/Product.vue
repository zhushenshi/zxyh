<template>
	<div class="investment">
        <MyHeader :title="title" bgColor="#FA7009" textColor="FFFFFF" v-if="!isWeixin"></MyHeader>
	    <div class="inverstmentType" ref="inverstmentType">
            <div :class="{typeItems:true,typeItemsActive:seriesActive[0].seriesActive}" @click.stop="choseSeries(0)">理财产品</div>
            <div :class="{typeItems:true,typeItemsActive:seriesActive[1].seriesActive}" @click.stop="choseSeries(1)">贷款申请</div>
            <div :class="{typeItems:true,typeItemsActive:seriesActive[2].seriesActive}" @click.stop="choseSeries(2)">对公预开户</div>
        </div>
        <div class="inverstemntContent wrapper" ref="wrapper" :style="{height:height,top:heightTop}">
            <div class="content" ref="content">
              <div v-if="series === 0">
                  <div class="item" v-for="(item,index) in products1" :key="index">
                      <div class="item_left"><img :src="item.product_series_img_url" alt=""></div>
                      <div class="item_middle">{{item.product_series_name}}</div>
                      <div class="item_right" @click="goInverstment(item.id,item.product_series_name,item.is_current)">去投资</div>
                  </div>
              </div>
              <div v-else-if="series === 1">
                  <div class="loan_item" v-for="(item,index) in products2" :key="index" @click="goToPage(item)">
                      <div class="loan_item_title">{{item.title}}</div>
                      <div class="loan_item_box">
                          <div class="loan_item_left">
                              <p>{{item.money}}</p>
                              <p>可贷金额</p>
                          </div>
                          <div class="loan_item_middle">
                              <p>{{item.interest}}<span>%</span></p>
                              <p>贷款日利率</p>
                          </div>
                          <div class="loan_item_right">
                              <div>立即申请</div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'; // get vue
import BScroll from 'better-scroll'
import {baseURL} from '@/vuex/url'
import icon0 from '@/assets/images/sy_12@3x.png'
import icon1 from '@/assets/images/sy_14@3x.png'
import icon2 from '@/assets/images/sy_11@3x.png'

export default {
  name: 'Product',
  data () {
    return {
        products1:[],
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
            {
            title: '大额存单销售',
            money: '5~20万',
            interest: '0.005',
            type:5
            }
        ],        
        ptype: 1,
        status: '',
        inverstemntItems: [],
        tempOrderID:'',
        series: 0,
        query: 0,
        seriesActive: [{series:0,seriesActive:true},{series:1,seriesActive:false},{series:2,seriesActive:false}],
        queryActive: [{query:0,queryActive:true},{query:1,queryActiveUp:false,queryActiveDown:false},{query:2,queryActiveUp:false,queryActiveDown:false},{query:3,queryActiveUp:false,queryActiveDown:false}],
    	scroll:'',
    	pageList: [],
      searchCondition:{
        curpage:1,  
        pagesize:10
      },
    	bottomText: '查看更多',
    	isHaveMore: false,
      refreshSuccess: false,
      sorttype: 1 ,//1 升序 2降序
      sortby: '', // '' 综合排序  rate 利率排序  periods 期限排序  progress  进度排序 Invest 收益率排序
      title: '产品',
      height:'',
      heightTop:"120px"
    }
  },
  created () {
      this.getProduct()
  },
  methods: {
    goToPage(item){
      if(!sessionStorage.getItem('$token')){
        this.$router.push('/login')
        return
      }
      this.$router.push({name:'LoanApply',params:item})
    },
    getProduct(){
        this.$ajax('post', baseURL+'/index/selectProductSeries', '', (data)=> {
            if(data.status == '200'){
                this.products1=data.list
            }else{
                this.$Toast({message:data.msg});
            }
        })
    },
    jumpInvestment (seriesActive) {
        if(seriesActive==3){
            this.$router.push('/home/current/loanList');
        }else{
            this.$parent.$data.type=seriesActive;
            this.$router.push('/home/investment'+seriesActive);
        }
    },
    goInverstment(id,title,is_current){
        this.$router.push({path:'/home/investment',query:{id,title,is_current}});
    },
  	 _initScroll () {
        this.$nextTick(() => {
        let This=this;
        if(this.$refs.content.offsetHeight<this.$refs.wrapper.offsetHeight){
          this.$refs.content.style.minHeight=this.$refs.wrapper.offsetHeight+1+'px'
        }
        this.scroll=new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: 1,
            pullDownRefresh: {
              threshold: 30,
              stop: 0
            },
            pullUpLoad: {
              threshold: -30
            }
        });
        this.scroll.on('pullingDown', () => {
          This.searchCondition={
            curpage:1,  
            pagesize:10
          };
          This.getRecords();
          this.scroll.finishPullDown();
          this.scroll.refresh();
          This.successTips();
        })
        this.scroll.on('pullingUp', () => {
          if(This.isHaveMore){
              This.bottomText = '加载中...';
              This.bottomText = '查看更多';
              This.getMore();
          }else{
            if(This.pageList.length > 0) {
              This.bottomText='';
            }else{
              This.bottomText='暂无数据';
            }
          }
          this.scroll.finishPullUp();
          this.scroll.refresh();
        })
    })
    },
    choseSeries (type) {
        if(type == 2){
            this.$Toast({message:'尚未开通此功能，敬请期待！'})
            return
        }
        this.series=type;
        this.seriesActive=[{series:0,seriesActive:false},{series:1,seriesActive:false},{series:2,seriesActive:false}];
        this.seriesActive[type].seriesActive=true;
        // this.queryInfo(0);
    },
    async goto(productId,borrowType){
        var that = this;
        that.$store.commit("borrowType",borrowType);
    	that.$store.commit("productId", productId);
    	that.$store.commit("currentRouterPath", that.$route.path);
        if(sessionStorage.getItem('$token')){
            await that.createTempOrder();
            setTimeout(()=>{
            if(this.tempOrderFlag){
                that.$router.push({
                    path: '/programDetailRuning',
                    query: {
                        productId: productId,
                        tempOrderID: this.tempOrderID
                    }
                });	
                }
            },10)
        }else{
            that.$router.push({
                path: '/programDetailRuning',
                query: {
                    productId: productId,
                    tempOrderID: this.tempOrderID
                }
            });	
        }
    },
    async createTempOrder(){
    	var that = this;
    	await this.$ajax('get', baseURL+'/account/temporder?productid='+that.$store.state.productId, '', function(data) {
            that.tempOrderFlag = data.status == '200' ? true : false
            if(data.status == '200'){
                that.tempOrderID = data.tempOrderID;
                that.$store.commit("tempOrderID", that.tempOrderID);
            }else{
                that.$Toast({message:data.msg});
            }
		})
    }
  },
  mounted () {
    this.height=(window.innerHeight-(!this.isWeixin?64:0))-100-64+44+"px"
    this.heightTop=120-(this.isWeixin?64:0)+'px'
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper, {click: true})
    })
  },
   beforeRouteEnter(to, from, next) {
    next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
      console.log(from)
      console.log(from.name)
    })
  },  
}
</script>

<style scoped>
.investment{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #F5F5F5;
    text-align: center;
    font-family: PingFang SC;
}
.inverstmentType{
    /* position: fixed; */
    z-index:1;
    top:64px;
    width: 100%;
}
.wrapper{
    position: absolute;
    top:120px;
    left:0;
    right:0;
    bottom:65px;
    z-index:1000;
    overflow: hidden;
}
.inverstmentType{
    height: 100px;
    background: #FA7009;
    font-size: 0;
}
.inverstmentType .typeItems{
    display: inline-block;
    width: 33%;
    font-size: 16px;
    line-height: 54px;
    font-family: PingFangSC-Medium;
    color: rgba(255,255,255,0.6);
    letter-spacing: 1.23px;
    position: relative;
}
.inverstmentType .typeItemsActive{
    color: #FFFFFF;
}
.inverstmentType .typeItems:after{
    content: '';
    position: absolute;
    left: 36%;
    bottom: 10px;
    width: 28%;
    height: 2px;
    background: transparent;
    border-radius: 1px;
}
.inverstmentType .typeItemsActive:after{
    background: #FFFFFF;
}
.inverstemntContent .content .item{
    line-height: 86px;
    margin:0 15px;
    display: flex;
    background-color: #fff;
    padding:0 15px;
    border-radius: 4px;
    position: relative;
    margin-bottom: 12px;
}
.inverstemntContent .content .item .item_left img{
    width:50px;
    vertical-align: middle;
    border-radius:50%;
    height:50px;
}
.inverstemntContent .content .item .item_middle{
    color: #333333;
    font-size:18px;
    font-family: PingFangSC-Medium;
    margin-left:12px;
}
.inverstemntContent .content .item .item_right{
    background: #FA7009;
    width:70px;
    line-height:30px;
    height:30px;
    border-radius:15px;
    color: #ffffff;
    position: absolute;
    right:15px;
    top:0;
    bottom:0;
    margin:auto;
    font-size:14px;
}
.inverstemntContent .content .loan_item{
    margin:0 15px;
    background-color: #fff;
    padding:0 15px;
    border-radius: 4px;
    position: relative;
    margin-bottom: 12px;
}
.inverstemntContent .content .loan_item_title{
    border-bottom:1px solid #E6E6E6;
    text-align:left;
    line-height:44px;
    color: #333333;
    font-size:15px;
}
.inverstemntContent .content .loan_item_box{
    display:flex;
    justify-content: space-between;
    padding-bottom:19px;
}
.inverstemntContent .content .loan_item_box .loan_item_left{
    text-align: left;
}
.inverstemntContent .content .loan_item_box .loan_item_left :nth-child(1){
    color: #F37723;
    font-size:22px;
    line-height:35px;
    margin-top:10px;    
}
.inverstemntContent .content .loan_item_box .loan_item_left :nth-child(2){
    color: #A8A8A8;
    font-size:12px;
    text-align:center;
}
.inverstemntContent .content .loan_item_box .loan_item_middle{
    width:23.5%;
}
.inverstemntContent .content .loan_item_box .loan_item_middle :nth-child(1){
    color: #333333;
    font-size:22px;
    line-height:35px;
    margin-top:10px;      
}
.inverstemntContent .content .loan_item_box .loan_item_middle :nth-child(1) span{
    font-size:16px;     
}
.inverstemntContent .content .loan_item_box .loan_item_middle :nth-child(2){
    color: #A8A8A8;
    font-size:12px;  
}
.inverstemntContent .content .loan_item_box .loan_item_right{
    position:relative;
}
.inverstemntContent .content .loan_item_box .loan_item_right div{
    width:90px;
    line-height:30px;
    background:rgba(243,119,35,1);
    opacity:1;
    border-radius:15px;
    font-size:14px;
    color: #ffffff;
    margin-top:24px;
}
</style>