<template>
  <div >
    <div class="accoutmoney bg-white"  v-loading="loading">
      <div class="item">
        <p class="mb15">总出借本金（元）</p>
        <p class="money">{{account.totalloanprincipal ? account.totalloanprincipal : '0.00'}}元</p>
        <p class="itemText mt30">已收本金：{{account.receivedPrincipal ? account.receivedPrincipal: '0.00'}}元</p>
        <p class="itemText mt15">待收本金：{{account.uncollectedPrincipal ? account.uncollectedPrincipal: '0.00'}}元</p>
      </div>
      <div class="item">
        <p class="mb15">已收利息（元）</p>
        <p class="money">{{account.interestReceived ? account.interestReceived: '0.00'}}</p>
        <p class="mb15 mt30">待收利息（元）</p>
        <p class="money">{{account.interestReceivable ? account.interestReceivable: '0.00'}}</p>  
      </div>
      <div class="item">
        <p class="mb15">可用余额</p>
        <p class="infoColor restmoney">{{account.balance ? account.balance: '0.00'}}元</p>
        <p class="btnBox">
            <button class="button--principal" @click="getAccount(1)">
              刷新账号数据
            </button>          
        </p>
      </div>
    </div>
    <div class="myInverter bg-white">
      <div class="title">
        <span class="tit">我的投资</span>
      </div>
      <div id="main" style="width:350px;height:280px;margin-left:25px;" class="fl"></div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>投资产品</th>
            <th>在投本金</th>
            <th>预计投资收益</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <th><img src="../../../public/img/demo1.png"></th>
            <th>{{item.product_series_name}}</th>
            <th>{{item.princiapl}}元</th>
            <th>{{item.interest}}元</th>
          </tr>
          <!-- <tr>
            <th><img src="../../../public/img/demo2.png"></th>
            <th>抵质押类</th>
            <th>2400.00元</th>
            <th>18.13元</th>
          </tr>
          <tr>
            <th><img src="../../../public/img/demo3.png"></th>
            <th>信用类</th>
            <th>200.00元</th>
            <th>10.89元</th>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!-- <div class="bg-white mt15 tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="()=>{}" :stretch="true">
        <el-tab-pane label="投资对比" name="first">
        </el-tab-pane>
        <el-tab-pane label="收益对比" name="second">
        </el-tab-pane>
      </el-tabs>
      <div class="tabContent">
        <div class="text-center">
          查询时间：
          <el-date-picker
            v-model="value1"
            type="datetime"
            size="mini"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          -
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon='el-icon-date'
            placeholder="" style="width:175px;">
          </el-date-picker>
          <button class="button--principal">
            查询
          </button>
        </div> 
        <div class="mt15 tabChilds" id="interestBar">
            545         
        </div>       
      </div> -->
    </div>    
  </div>
</template>
<script>
var echarts = require('echarts')
import {baseURL,baseURLVerifyImg} from '../../utils/url.js'
export default {
  data(){
    return {
       account:[],
       loading:false,
       list:[],
       seriesData:[],
       legendData:[],
    }
  },
  created(){
    this.getInterest()
 
   this.getAccount()
  },
  methods:{
     getAccount(type){   
         let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       this.$ajax({url:'/account/detail',method:"get"}).then((data)=>{
         loading.close()
         if(data.status=="200"){
             this.account=data
         } 
        }
      )

    },
    getInterest(){
         let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
       this.$ajax({baseURL:'/wx/pc',url:'/account/getInterest',method:"get"}).then((data)=>{
         if(data.status=="200"){
           loading.close()
            this.list=data.data
            var map = {};           
            for (var i = 0; i < this.list.length; i++) {
                  map = {};
                  map.name = this.list[i].product_series_name;
                  map.value =this.list[i].princiapl;
                  this.seriesData[i] = map;
                  this.legendData[i] = map.name;
            }
            this.$nextTick(()=>{
                this.getList()
            })
         } 
        }
      )
    },
    getList(){
       var myChart = echarts.init(document.getElementById('main'),'light');
      myChart.setOption({
          noDataLoadingOption: {
                  text: '暂无数据',
                  effect: 'bubble',
                  effectOption: {
                      effect: {
                          n: 0
                      }
                  }
          },
              tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                 series: [
                   {
                     name:'我的投资',
                     type:'pie',
                     radius:['50%','70%'],
                     avoidLabelOverlap: false,
                      label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
            },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.seriesData
                   }
                 ]
      })
    },
    getChart(id,key,direcValue){
			//获取放资产饼图的div
			var myChart = echarts.init(document.getElementById(id));
			//柱状图对象
				var barOption = {
          tooltip : {
            trigger: 'axis'   // 触发类型，默认数据触发 'item'，可选为：'axis'
          },
          legend: {
            x : 'center',			//水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y : 'bottom',			//垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            selectedMode : false,	//选择模式，默认开启图例开关（是否可以通过点击图列展示内容）
              data:['投资项目']
          },
          color:['#FF0000','#FF7F00'],
          //calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : key
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : this.seriesData
        };
				
				myChart.setOption(barOption);
			}
  }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/btn"
  .accoutmoney
    padding: 20px 0;
    overflow: hidden;
    border: 1px solid #e2e2e2;  
    font-size: 14px;
    color #666666  
    line-height 25px
    .item
      float: left;
      width: 33.2%;
      height: 182px;
      border-left: #e2e2e2 dashed 1px;
      text-align: left;
      padding: 10px 0 0;
      text-align: center;
    :first-child 
      border-left: none;
    .money
      color: #f57403;
      font-size: 22px;
    .itemText
      font-size 12px
    .restmoney
      font-size 22px
      margin-top 35px
    .btnBox
      button
        width:45%;
        font-size:15px;
        padding:10px 0;
        margin-top:35px;
  .myInverter
    // width: 100%;
    min-height: 420px;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #333333;  
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
    table
      color #989898
      text-align left
      // margin auto
      margin-top 95px
      font-size 14px
      thead
        color #000000 
      tr
        :first-child 
          width 20px
          img
            width 11px
        th
          width 120px
          padding-bottom 10px

  .tabs
    font-size: 14px;
    box-sizing border-box
    /deep/ .el-tabs__item.is-active
      color #ff6461!important
      background: #ffffff;
    /deep/ .el-tabs__item
      font-size 16px
      line-height: 50px;
      height  50px
    /deep/.el-tabs__item:hover {
        color: #ff6461;
    }
    /deep/.el-tabs__item {
        background: #f5f6f8;
    }    
    /deep/.el-tabs__header{
      margin 0
    }
    .tabContent
      padding 30px 25px
      color #666666
      border: 1px solid #DCDFE6;
      border-top none
      // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      button
        font-size 12px
        line-height 20px
        padding 0 10px
        margin-left 15px
        border-radius 3px
      a
        font-size 12px
        line-height 20px
        margin-left 15px 
        cursor: pointer;          
      .tabChilds
        width: 800px;
        height: 400px;  
        margin: auto;
</style>