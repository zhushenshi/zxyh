<template>
	<div class="investment">
        <MyHeader :title="title" v-if="!isWeixin"></MyHeader>
	    <!-- <div class="inverstmentType" ref="inverstmentType">
            <div :class="{typeItems:true,typeItemsActive:seriesActive[0].seriesActive}" @click.stop="choseSeries(0)">新手专享</div>
            <div :class="{typeItems:true,typeItemsActive:seriesActive[1].seriesActive}" @click.stop="choseSeries(1)">抵押系列</div>
            <div :class="{typeItems:true,typeItemsActive:seriesActive[2].seriesActive}" @click.stop="choseSeries(2)">信贷系列</div>
        </div> -->
        <!-- <div class="inverstmentQuery">
            <div :class="{queryItems:true,queryActive:queryActive[0].queryActive}" @click.stop="queryInfo(0)">
                <span class="zonghe">综合排序</span>
            </div>
            <div :class="{queryItems:true,queryActiveUp:queryActive[1].queryActiveUp,queryActiveDown:queryActive[1].queryActiveDown}" @click="queryInfo(1)">
                <span>按利率</span>
            </div>
            <div :class="{queryItems:true,queryActiveUp:queryActive[2].queryActiveUp,queryActiveDown:queryActive[2].queryActiveDown}" @click="queryInfo(2)">
                <span>按期限</span>
            </div>
            <div :class="{queryItems:true,queryActiveUp:queryActive[3].queryActiveUp,queryActiveDown:queryActive[3].queryActiveDown}" @click="queryInfo(3)">
                <span>按进度</span>
            </div>            
        </div> -->
        <div class="inverstemntContent wrapper" ref="wrapper" :style="{top:(!isWeixin?'78px':'14px')}">
            <div class="content" ref="content">
              <div>
                <div class="top-tip">
                    <span class="refresh-hook">{{topText}}</span>
                </div>

                <!-- <div class="inverstemntItems" v-for="(item,index) in pageList" :key="index"  @click="goto(item.productid,item.crmName.substring(0,3))">
                    <div class="contentTitle">

                        <label  class="left">
                            <span class="icon"><img :src="iconSrc"/></span>
                            <span>{{item.crmName}}</span>
                            <span :class="{state:true,stated:item.status!=0}">{{getStatus(item.status)}}</span>
                        </label>
                        <label :class="{right:true,canTouZi:item.status==0}">
                            <span>可投金额:<span class="money">{{item.remainingAmount | moneyToFixed(2)}}</span>元</span>
                        </label>
                    </div>

                    <div class="contentBody">
                        <div class="content">
                            <span :class="{cont:true,contActive:item.status==0}">{{item.realyRate}}</span><br><span>预期年化</span>
                        </div>
                        <div class="content">
                            <span :class="{cont:true,contActive:item.status==0}">{{item.periods}}{{item.periodsUnit}}</span><br><span>项目期限</span>
                        </div>
                        <div class="content">
                            <span :class="{cont:true,contActive:item.status==0}">{{item.participants}}</span><br><span>投标人数</span>
                        </div>
                    </div>
                </div> -->

                <div class="Homefoot">
                    <div class="item" v-for="(item,index) in pageList" :key="index">
                        <div class="itemTop">
                            <p class="name" :class="{'canTouZi':item.status !=0}">{{item.crmName}}</p>
                            <p class="status" :class="{'stated':item.status !=0}"><span>{{getStatus(item.status)}}</span></p>
                            <p class="amount" v-if="is_current==0" :class="{'canTouZi':item.status !=0}">可投金额：{{item.remainingAmount | moneyToFixed(2)}}</p>
                        </div>
                        <div class="Investment">
                            <div>
                                <p class="investmentNum" :class="{'canTouZi':item.status !=0}"  ><span class="expe">{{item.realyRate}}</span></p>
                                <p class="InvestmentTitle">预期年化</p>
                            </div>
                            <div>
                            <p   v-if="is_current==0" :class="{'canTouZi':item.status !=0}"><span class="expe">{{item.periods}}</span>{{item.periodsUnit}}</p>
                            <p v-else>长期</p>
                            <p class="InvestmentTitle">项目期限</p>
                            </div>
                            <div>
                                <p><span class="expe" :class="{'canTouZi':item.status !=0}">{{item.participants}}</span></p>
                                <p class="InvestmentTitle">投标人次</p>
                            </div>
                        </div>
                        <div @click="item.status ==0?goto(item.productid,item.crmName.substring(0,3)):''" class="InvestmentBtn" :class="{'canTouZi':item.status !=0,'statedBorder':item.status !=0}">立即投资</div>
                    </div>                    
                </div>

                <div class="bottom-tip">
                    <span class="loading-hook" @click.stop="getRecords">{{bottomText}}</span>
                </div>
                <div class="noMsg" v-show="!pageList.length&&show">
                    <img src="./img/no-order.png"/>
                    <p>暂无数据，看看别的地方吧！</p>
                </div>                
                <!-- <div class="bot">
                  <div class="goals-wrapper">
                    <h3>19理财</h3>
                    <p>专业<span class="dot"></span>诚信<span class="dot"></span>透明</p>
                  </div>
                </div> -->
              </div>
            </div>
        </div>
        <div class="alertTips" v-show="refreshSuccess">刷新成功</div>
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
  name: 'Investment',
  data () {
    return {
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
    	topText: '下拉刷新',
    	bottomText: '查看更多',
    	isHaveMore: false,
      refreshSuccess: false,
      sorttype: 1 ,//1 升序 2降序
      sortby: '', // '' 综合排序  rate 利率排序  periods 期限排序  progress  进度排序 Invest 收益率排序
      title: '',
      titleList:['舔舔宝','长益宝','利多多'],
      show:false,
      is_current:""
    }
  },
  created () {
    // if(this.$route.query && this.$route.query.type) {
    //     this.$parent.$data.type = parseInt(this.$route.query.type) - 1;
    // }
    this.$route.meta.title=this.$route.query.title
    console.log(this.$route.query)
    this.title=this.$route.query.title
    // this.seriesActive=[{series:0,seriesActive:false},{series:1,seriesActive:false},{series:2,seriesActive:false}];
    // this.seriesActive[this.$route.params.series].seriesActive=true;
    this.series=this.$route.query.id;
    this.is_current=this.$route.query.is_current;
    this.$parent.$data.selected='/home/investment0';
    this.getRecords (this.$route.params.series);
    
    sessionStorage.setItem('$amount',"");//给投资详情的金额置空
  },
  mounted(){
      
  },
  methods: {
    getStatus (type) {
        switch(type)
            {
            case 0:
            return this.status='出售中'//募集中
            break;
            case 1:
            return this.status='回款中'
            break;
            case 2:
            return this.status='流标'
            break;
            case 3:
            return this.status='已满标'
            break;
            case 4:
            return this.status='已结清'//交易成功
            break;
            case 5:
            return this.status='订单异常'
            break;
            case 6:
            return this.status='死亡'
            break;
            case 7:
            return this.status='已满标'//满标放款中
            break;
            case 8:
            return this.status='合规检查'
            break;
            case 9:
            return this.status='合规检查不通过'
            break;
            case 10:
            return this.status='放款成功'
            break;
            case 11:
            return this.status='提前还款'
            break;
            case 12:
            return this.status='上架复审'
            break;
            }
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
        this.scroll.on('scroll', function (position) {
            if(position.y > 30) {
                This.topText = '释放立即刷新'
            }else{
                This.topText = '下拉刷新'
            }
        });
        this.scroll.on('pullingDown', () => {
          This.searchCondition={
            curpage:1,  
            pagesize:10
          };
          This.topText = '下拉刷新';
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
        this.series=type;
        this.seriesActive=[{series:0,seriesActive:false},{series:1,seriesActive:false},{series:2,seriesActive:false}];
        this.seriesActive[type].seriesActive=true;
        this.queryInfo(0);
    },
    queryInfo (type) {
        this.query=type;
        if(type==0){
            this.queryActive=[{query:0,queryActive:true},{query:1,queryActiveUp:false,queryActiveDown:false},{query:2,queryActiveUp:false,queryActiveDown:false},{query:3,queryActiveUp:false,queryActiveDown:false}];
            this.sorttype = 1
        }else{
            this.queryActive[type].queryActiveUp=!this.queryActive[type].queryActiveUp;
            if(this.queryActive[type].queryActiveUp){
                this.queryActive[type].queryActiveDown=false;
                this.sorttype = 1
            }else{
                this.queryActive[type].queryActiveDown=true;
                this.sorttype = 2
            }
            if(type==1){
                this.queryActive=[{query:0,queryActive:false},{query:1,queryActiveUp:this.queryActive[type].queryActiveUp,queryActiveDown:this.queryActive[type].queryActiveDown},{query:2,queryActiveUp:false,queryActiveDown:false},{query:3,queryActiveUp:false,queryActiveDown:false}];
            }
            if(type==2){
                this.queryActive=[{query:0,queryActive:false},{query:1,queryActiveUp:false,queryActiveDown:false},{query:2,queryActiveUp:this.queryActive[type].queryActiveUp,queryActiveDown:this.queryActive[type].queryActiveDown},{query:3,queryActiveUp:false,queryActiveDown:false}];
            }
            if(type==3){
                this.queryActive=[{query:0,queryActive:false},{query:1,queryActiveUp:false,queryActiveDown:false},{query:2,queryActiveUp:false,queryActiveDown:false},{query:3,queryActiveUp:this.queryActive[type].queryActiveUp,queryActiveDown:this.queryActive[type].queryActiveDown}];
            }
        }
        if(type==0){
            this.sortby=''
        }
        if(type==1){
            this.sortby='rate'
        }
        if(type==2){
            this.sortby='periods'
        }
        if(type==3){
            this.sortby='progress'
        }
        this.searchCondition={
          curpage:1,  
          pagesize:10
        };
        this.getRecords (type);
    },
    getRecords (type) {
        let records=this;
        let ptype=this.series;
        this.ptype=ptype;
        this.$ajax('get',baseURL +'/product/list?ptype='+ptype+'&pagesize='
        +this.searchCondition.pagesize+
        '&'+'curpage='+this.searchCondition.curpage+'&'+'sortby='+this.sortby+'&'+'sorttype='+this.sorttype,'',function(data){
            records.$nextTick(function () {
                records.pageList=data.list;
                records.show=true
                if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
                    records.isHaveMore=true;
                    records.bottomText='查看更多';
                }else{
                    records.isHaveMore=false;
                    if(records.pageList.length > 0) {
                      records.bottomText='';
                    }else{
                      records.bottomText='';
                    }
                }
                if(records.scroll) {
                  records.scroll.destroy();
                }
                this._initScroll();
            })
        })
    },
    getMore () {
        if(this.isHaveMore){
            this.searchCondition.curpage = parseInt(this.searchCondition.curpage) + 1;
            this.getMoreRecords();
        }
    },
    getMoreRecords () {
        let records=this;
        let ptype=Number(this.series)+1;
        this.$ajax('get',baseURL +'/product/list?ptype='+ptype+'&pagesize='
        +this.searchCondition.pagesize+
        '&'+'curpage='+this.searchCondition.curpage+'&'+'sortby='+this.sortby+'&'+'sorttype='+this.sorttype,'',function(data){
            records.$nextTick(function () {
                for(var i=0;i<data.list.length;i++){
                    records.pageList.push(data.list[i]);
                }
                if((data.totalpage*data.pagesize)-(data.curpage*data.pagesize)>0){
                    records.isHaveMore=true;
                    records.bottomText='查看更多';
                }else{
                    records.isHaveMore=false;
                    if(records.pageList.length > 0) {
                      records.bottomText='';
                    }else{
                      records.bottomText='暂无数据';
                    }
                }
            })
        })
    },
      successTips () {
        let This=this;
        this.refreshSuccess=true;
        setTimeout(function () {
            This.refreshSuccess=false;
        }, 2000);
    },

    async goto(productId,borrowType){
        var that = this;
        that.$store.commit("borrowType",borrowType);
    	that.$store.commit("productId", productId);
    	that.$store.commit("currentRouterPath", that.$route.path);
    	that.$store.commit("is_current", that.is_current);
        if(sessionStorage.getItem('$token')){
            await that.createTempOrder();
            setTimeout(()=>{
            if(this.tempOrderFlag){
                that.$router.push({
                    path: '/programDetailRuning',
                    query: {
                        productId: productId,
                        tempOrderID: this.tempOrderID,
                        is_current:this.is_current
                    }
                });	
                }
            },10)
        }else{
            that.$router.push({
                path: '/programDetailRuning',
                query: {
                    productId: productId,
                    tempOrderID: this.tempOrderID,
                    is_current:this.is_current
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
  computed: {
    iconSrc() {
      if (this.series == 0) {
        return icon0
      }else if (this.series == 1) {
        return icon1
      }else if (this.series == 2) {
        return icon2
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {click: true})
    })
  }
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
}
.inverstmentType{
    position: fixed;
    z-index:1;
    top:0;
    width: 100%;
}
.wrapper{
    position: fixed;
    top:78px;
    left:0;
    right:0;
    bottom:0;
    overflow: hidden;
}
.inverstmentType{
    height: 54px;
    background: #ffffff;
    font-size: 0;
}
.inverstmentType .typeItems{
    display: inline-block;
    width: 33%;
    font-size: 16px;
    line-height: 54px;
    font-family: PingFangSC-Medium;
    color: #888888;
    letter-spacing: 1.23px;
    position: relative;   
}
.inverstmentType .typeItemsActive{
    color: #FA7009;
}
.inverstmentType .typeItems:after{
    content: '';
    position: absolute;
    left: 20%;
    bottom: 6px;
    width: 60%;
    height: 4px;
    background: transparent;
    border-radius: 2px;
}
.inverstmentType .typeItemsActive:after{
    background: #FA7009;
}
.inverstmentQuery{
    height: 44px;
    line-height: 44px;
    background: #ffffff;
    z-index: 1;
    top:0;
    width: 100%;
    position: relative;
}
.inverstmentQuery:before{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #DFDFDF;
    font-size: 0;
}
.inverstmentQuery .queryItems{
    display: inline-block;
    width: 24%;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #888888;
    letter-spacing: 1.08px;
    position: relative;
}
.inverstmentQuery .queryItems:after{
    content: "";
    position: absolute;
    top:15px;
    right:0;
    width: 1px;
    height: 14px;
    background: #E9E9E9
}
.inverstmentQuery .queryItems:last-child:after{
    display: none;
}
.inverstmentQuery .queryItems span{
    position: relative;
    left:-6px;
}
.inverstmentQuery .queryItems span.zonghe{
  left:0;
}
.inverstemntContent .bottom-tip{
  background: #F5F5F5;
}
.inverstmentQuery .queryItems span::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top:4px solid transparent;
    border-bottom:4px solid #D6D6D6;
    border-left:4px solid transparent;
    border-right:4px solid transparent;
    right:-12px;
    top:-1px;
}
.inverstmentQuery .queryItems span::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top:4px solid #D6D6D6;
    border-bottom:4px solid transparent;
    border-left:4px solid transparent;
    border-right:4px solid transparent;
    right:-12px;
    bottom:-1px;
}
.inverstmentQuery .queryActiveUp span::before{
    border-bottom:4px solid #FA7009;
}
.inverstmentQuery .queryActiveDown span::after{
    border-top:4px solid #FA7009;
}
.inverstmentQuery .queryActiveUp,.inverstmentQuery .queryActiveDown{
    color: #FA7009;
}
.inverstmentQuery .queryItems:first-child span::after,.inverstmentQuery .queryItems:first-child span::before{display: none}
.inverstmentQuery .queryActive{
    color: #FF7800;
}
.inverstemntContent .inverstemntItems{
    background: #fff;
    padding: 10px;
    margin-top: 10px;
}
.inverstemntContent .inverstemntItems .contentTitle{
    height: 40px;
    line-height: 40px;
    border-bottom:1px dashed #E4E4E4;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.92px;
}
.inverstemntContent .inverstemntItems .contentTitle img{
    position: relative;
    top: -3px;
    width: 15px;
}
.right{
    float: right;
    font-family: PingFangSC-Medium;
    font-size: 11px;
    color: #BBBBBB;
    letter-spacing: 0.85px;
}
.canTouZi{
    color:#888888;
}
.canTouZi .money{
    font-size: 13px;
    color: #FF953E;
}
.left{
    float: left;
    position: relative;
}
.inverstemntContent .inverstemntItems .contentTitle .state{
    font-size: 10px;
    padding: 0 4px;
    border-radius: 10px;
    background: #FF953E;
    color:#ffffff;
    position: absolute;
    top:12px;
    height: 16px;
    line-height:17px;
    right: -50px;

}
.inverstemntContent .inverstemntItems .contentTitle .stated{
    background: #bbbbbb;
}
.inverstemntContent .inverstemntItems  .contentBody{
    display: -webkit-box; 
    display: -moz-box;  
    display: -ms-flexbox;  
    display: -webkit-flex;  
    display: flex; 
    /* font-size: 0;
    width: 100%;
    text-align: center; */
}
.inverstemntContent .inverstemntItems  .contentBody .content{
    -webkit-box-flex: 1;
    -moz-box-flex: 1; 
    -webkit-flex: 1;  
    -ms-flex: 1;  
    flex: 1;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #888888;
    letter-spacing: 0.86px;
    margin: 20px 0 10px;
}
.inverstemntContent .inverstemntItems  .contentBody .content .cont{
    display:inline-block;
    margin-bottom: 10px;
    font-size: 16px;
    color: #888888;
    letter-spacing: 1.38px;
}
.inverstemntContent .inverstemntItems  .contentBody .content .contActive{
    color:#FF953E
}
.bottom-tip{
  /* height: 80px; */
}
.bot{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.bot .goals-wrapper{
  text-align: center;
  color:#ccc;
}
.bot .goals-wrapper h3{
  font-size: 16px;
  letter-spacing: 1.23px;
}
.bot .goals-wrapper p{
  margin: 5px 0;
  font-size: 11px;
}
.bot .goals-wrapper .dot{
  display: inline-block;
  margin: 0 5px;
  vertical-align: middle;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #ccc;
}            
</style>
<style lang="stylus" scoped>
.headTop{
  background #F37723
  color #ffffff
  height 60px
  line-height 60px
  font-size: 18px;
  position relative;
  font-family PingFang SC
}
.Homefoot{
	margin  0 15px
	text-align left
	.item{
		background: #ffffff !important
		padding 15px
		margin-bottom 15px
	}
	.itemTop{
	   overflow hidden
	   border-bottom 1px solid #E6E6E6 
	   font-size 15px
	   padding-bottom 10px
	   p{
           float left
		   color #333333
	   }
	   .name{
            overflow: hidden;
            text-overflow: ellipsis;
            width 35%
            white-space nowrap
            font-size 12px
            font-weight bold
        }
	   .status{
		   color #ffffff
		   border-radius 10px
		   background #F37723
		   margin-left 13px
		   padding 2px 7px
		   font-size 12px
	   }
	   .amount{
		   font-size 12px
		   float right
		   color #333333
		   font-family:PingFang SC
		   font-weight:400;
           font-size 12px
	   }
	}
	.Investment{
		display flex
		margin 15px 0
		div{
			flex 1
			text-align center
			.expe{
				font-size 20px
			}
			.investmentNum{
			   color #F37723
			}
			.InvestmentTitle{
				color #A8A8A8
				font-size 10px
				margin-top 10px
			}
		}
	}
	.InvestmentBtn{
			border 1px solid #F37723
			color #F37723
			padding 10px
			text-align center
			font-size 16px
			border-radius 4px
		}
    .canTouZi{
        color:#A8A8A8!important
    }
    .stated{
        background: #bbbbbb!important;
    }
    .statedBorder{
        border: 1px solid #bbbbbb!important;        
    }
}
</style>
<style>