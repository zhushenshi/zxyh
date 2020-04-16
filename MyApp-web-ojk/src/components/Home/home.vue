<template>
  <div class="container">
    <div ref="dom" class="myHeader iosHeader" :class="{'background':cls}">
      <span class="headerTitle" :class="{'color':cls}">{{$t('lang.portalView.title')}}</span>
    </div>
    <div class="scroll-list-wrap" :style="{top:height}">
      <cube-scroll ref="scroll" @scroll="scroll" @pulling-down="onPullingDown" :options="options"  :scroll-events="['scroll']">
        <div class="scrollHeight">
          <div class="top-tips">TKB90={{TKB90}}%</div>
          <cube-slide ref="bannerSlide" :data="items" :options="options">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="toOpenUrl(item.activity_url)">
              <img :src="item.activity_img_url">
            </cube-slide-item>
          </cube-slide>
          <!-- 产品选择 -->
          <div v-if="modular.productShow" class="product-container-new">
            <div class="new-title" v-if="ojkProduct.singleProductIshow||ojkProduct.multiMap.isShow">{{$t('lang.ojk.productTitle')}}:</div>
            <div v-if="ojkProduct.singleProductIshow&&singleShow" :class="{'new-products':true,'new-products-active':ojkType=='0'?true:false}" @click="showProductSelect(0,ojkProduct.singleMap[0].productMap.id)">
              <div class="new-products-body">
                <div class="new-product-title">{{$t('lang.ojk.single')}}</div>
                <div class="new-product-title-tips">Pinjaman untuk keperluan personal Anda.</div>
                <div class="new-info">
                  <div class="new-info-left">
                    <div class="">{{$t('lang.ojk.periods')}}</div>
                    <!-- <div class="">30{{getDiyType(ojkProduct.singleMap[0].productDetails[0].diy_type)}}</div> -->
                    <div class=""><span v-for="(item,index) in singleMapFeDay">{{item.fqDay}}{{getDiyType(item.diy_type)}}{{index==singleMapFeDay.length-1?'':' /'}} </span></div>
                  </div>
                  <div class="new-info-right">
                    <div class="">{{$t('lang.ojk.money')}} Hingga</div>
                    <div class="">Rp:{{ojkProduct.singleMap[0].productMap.maxQuota | money}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="ojkProduct.multiMap.isShow&&multiShow" :class="{'new-products':true,'new-products-active':ojkType=='1'?true:false}" @click="showProductSelect(1,ojkProduct.multiMap.productMap.id)">
              <div class="new-products-body">
                <div class="new-product-title">{{$t('lang.ojk.multi')}}</div>
                <div class="new-product-title-tips">Pinjaman untuk membantu usaha Anda dengan berbagai pilihan periode cicilan hingga 12 bulan</div>
                <div class="new-info">
                  <div class="new-info-left">
                    <div class="">{{$t('lang.ojk.periods')}}</div>
                    <div class="">
                      <span v-for="(item,index) in ojkProduct.multiMap.productDetails">{{item.periods}}{{getDiyType(item.diy_type)}}{{index==ojkProduct.multiMap.productDetails.length-1?'':' /'}} </span>
                    </div>
                  </div>
                  <div class="new-info-right">
                    <div class="">{{$t('lang.ojk.money')}}</div>
                    <div class="">Rp:{{ojkProduct.multiMap.productMap.pro_quota | money}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!ojkProduct.multiMap.isShow&&!ojkProduct.singleProductIshow&&ojkProduct.productFlag" class="my-noProduct"></div>
          </div>
          <div v-show="ojkProductShow" class="product-container">
            <div class="product-title">Gambaran produk: <span>{{ojkType=='0'?$t('lang.ojk.single'):$t('lang.ojk.multi')}}</span></div>
            <div class="product-title">{{ojkType=='0'?$t('lang.portalView.money'):$t('lang.portalView.stage')}}</div>
            <ul class="product-list" v-if="ojkType==0">
              <li @click="selectStage(index)" :class="{active:item.productMap.active}" v-for="(item,index) in ojkProduct.singleMap" :key="index"><span>Rp{{item.productMap.pro_quota | money}}</span></li>
            </ul>
            <ul class="product-list" v-if="ojkType==1">
              <li @click="selectStage(index)" :class="{active:item.active}" v-for="(item,index) in ojkProduct.multiMap.productDetails" :key="index"><span>{{item.periods}}{{getDiyType(item.diy_type)}}</span></li>
            </ul>
            <div class="product-info-detalis">
              <div class="product-info-detalis-all">Total biaya per {{getRateDiyType}}: {{dailyRate}}%</div>
              <div class="product-info-detalis-item">
                <!-- <div class="item-item">{{$t('lang.ojk.ptfwf')}}:{{platformFee}}%</div>  -->
                <div class="item-item">{{$t('lang.ojk.lx')}}:{{interest}}%</div>
                <div class="item-item">{{$t('lang.ojk.glf')}}:{{parseFloat(platformFee)+parseFloat(managementExpense)}}%</div>
              </div>
            </div>
            <div class="product-button" @click="saveSelectProductInfo()"><div class="base-btn">{{$t('lang.portalView.getMoney')}}</div></div>
          </div>
          <!-- 审核中.. -->
          <div v-if="modular.examineShow" class="my-examine"></div>
          <!-- 审核中我的额度.. -->
          <div v-if="modular.examineShow" class="my-examine-container">
            <div class="my-loan">
              <div class="my-loan-money"><span>Rp</span><span>{{cusTrailPhone.qutoa | money}}</span></div>
            </div>
          </div>
          <!-- 我的借款 -->
          <div v-if="modular.loanShow" class="my-loan-container" @click="toRepayPage()">
            <div class="my-loan">
              <div class="my-loan-title">{{$t('lang.portalView.myLoan')}}</div>
              <div class="my-loan-money"><span>Rp</span><span>{{unPayLoanList[0].pro_quota | money}}</span></div>
              <div class="my-loan-time">
                <span>Menunggu pembayaran/pelunasan</span>
                <div class="wbd">Total yang tersisa: Rp {{customer.unpayMoney | money}}</div>
                <div class="wbd">Tanggal pembayaran: {{customer.time?customer.time:'--'}}</div>
                <!-- <span>{{$t('lang.portalView.loanDay')}}: </span><span>{{unPayLoanList[0].pay_time}}</span> -->
              </div>
            </div>
          </div>
          <!-- 我的额度 -->
          <div v-if="modular.quotaShow" class="my-quota-container">
            <div class="my-quota">
              <div class="my-quoto-title">{{$t('lang.portalView.myQuota')}}</div>
              <div class="my-quoto-money"><span>Rp</span><span>{{cusTrailPhone.qutoa | money}}</span></div>
              <span class="my-quoto-button" @click="showWithdrawal()">{{$t('lang.portalView.cash')}}</span>
            </div>
          </div>
          <!-- 审核拒绝 -->
          <div v-if="modular.refuseShow" class="my-refuse"></div>
          <!-- 更多渠道 -->
          <div v-if="modular.channelShow" class="more-channel">
            <div class="channel">{{$t('lang.portalView.channels')}}</div>
            <div class="channel-list">
              <ul>
                <li @click="toOpenUrl(item.link)" v-for="(item,index) in channelList" :key="index"><img :src="item.path" alt=""></li>
              </ul>
            </div>
          </div>
          <!-- 底部信息 -->
          <!-- <div class="bg"></div>
          <div class="advantage1" style="border-bottom:1px solid #A9A9A9;">
            <div :class="{text:true,'textLine':$i18n.locale=='in-ID'?true:false}">{{$t('lang.comm.productTips')}}</div>
          </div> -->
          <!-- <ul class="advantage2">
            <li><img src="./img/tb_01.png" alt=""></li>
            <li><img src="./img/tb_02.png" alt=""></li>
            <li><img src="./img/tb_03.png" alt=""></li>
          </ul> -->
          <div class="height">&nbsp;</div>
          <!-- 测试专用跳转页面 -->
          <!-- <div class="product-container">
            <div class="product-button" @click="testJump()"><div class="base-btn">测试</div></div>
          </div> -->
        </div>
      </cube-scroll>
    </div>
    <router-view style="z-index:100;"></router-view>
  </div>
</template>

<script>
let timerMsg=null
import Withdrawal from '../Common/Withdrawal.vue';
import Agreement from '../Common/Agreement.vue';
import Vue from 'vue'
import {createAPI} from 'cube-ui'
createAPI(Vue, Withdrawal, ['click'], true)
createAPI(Vue, Agreement, ['click'], true)
export default {
  name: 'Home',
  data () {
    return {
      items: [
        {
          url: '',
          activity_img_url: require('./img/banner_default.png')
        }
      ],
      height:0,
      cls:true,
      options:{
        observeDOM: true,
        click: true,
        probeType: 1,
        scrollbar: false,
        pullDownRefresh: {
          threshold: 40,
          stopTime: 1000,
          txt: "",
        },
        pullUpLoad: false,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        },
      },
      optionsHome: {
        listenScroll: true,
        probeType: 3,
        stopPropagation:false,
        click:true
      },
      productList:[],
      stageList:[],
      customer: {},
      cusTrailPhone: {},
      historyLoan: {},
      unPayLoanList: [{
        first_loan: "0",
        id: "",
        pay_time: "--",
        periods: "",
        pro_quota: "0.00",
        service_fee: "",
        status: "5"
      }],
      channelList:[],
      modular:{
        productShow:false,
        loanShow:false,
        quotaShow:false,
        examineShow:false,
        refuseShow:false,
        channelShow:false
      },
      selectProductInfo:{
        productId: '',
        periodsId: ''
      },
      ojkProduct:{
        multiMap: {
          productDetails: [{
            periods: '1',
            diy_type: '1'
          }],
          productMap: {
            pro_quota: '0.00'
          },
          isShow:false//是否显示多期产品
        },
        singleMap: [{
          productDetails: [{
            periods: '1',
            diy_type: '1'
          }],
          productMap: {
            pro_quota: '0.00',
            maxQuota:'0.00'
          }
        },{
          productDetails: [{
            periods: '1',
            diy_type: '1'
          }],
          productMap: {
            pro_quota: '0.00'
          }
        },{
          productDetails: [{
            periods: '1',
            diy_type: '1'
          }],
          productMap: {
            pro_quota: '0.00'
          }
        },{
          productDetails: [{
            periods: '1',
            diy_type: '1'
          }],
          productMap: {
            pro_quota: '0.00'
          }
        }],
        singleProductIshow:false,
        productFlag:false
      },
      agree: false,
      ojkType: '',
      ojkProductShow: false,
      selectStageIndex: 0,
      ojkClass:[{
        className: 'new-products product-multi',
        active: 'new-products product-single'
      },{
        className: 'new-products product-multi',
        active: 'new-products product-single'
      }],
      singleProId:['b773a090-b1c1-4a35-b355-53cc5a477ae3','512ef075-8d2d-4d2e-aa1e-8bbf65ea0faa','2e202330-3c6d-4c21-9c32-739d972bcdb1','4fb0294f-45b7-4a9f-982f-1f48af20ba98'],
      multiProId:['48688baf-de0e-4851-8ba3-fa861abe6918'],
      TKB90:'0.00',
      singleMapFeDay:[]
    }
  },
  created(){
    // let sessionShow=sessionStorage.getItem("agreement");
    // if(!sessionShow){
    //   this.showAgreement('1')
    // }
    this.getNewProducts(true)
    this.$ajax('get','/otherCofig/getSysParam?code=TKB90','',(res)=>{
      this.TKB90=res.retData
    })
  },
  mounted(){
    this.height=(this.$Header)/37.5+'rem'
  },
  computed: {
    dailyRate () {
      let index =this.ojkType
      if(index==0){//单期
        return (parseFloat(this.ojkProduct.singleMap[0].productDetails[0].interest_rate)+
        parseFloat(this.ojkProduct.singleMap[0].productDetails[0].service_fee)+
        parseFloat(this.ojkProduct.singleMap[0].productDetails[0].staging_services_rate)).toFixed(2)
      }else{
        return (parseFloat(this.ojkProduct.multiMap.productDetails[this.selectStageIndex].service_fee)+
        parseFloat(this.ojkProduct.multiMap.productDetails[this.selectStageIndex].interest_rate)+
        parseFloat(this.ojkProduct.multiMap.productDetails[this.selectStageIndex].staging_services_rate)).toFixed(2)
      }
    },
    platformFee(){
      let index =this.ojkType
      if(index==0){//单期
        return this.ojkProduct.singleMap[0].productDetails[0].service_fee
      }else{
        return this.ojkProduct.multiMap.productDetails[this.selectStageIndex].service_fee
      }
    },
    interest(){
      let index =this.ojkType
      if(index==0){//单期
        return this.ojkProduct.singleMap[0].productDetails[0].interest_rate
      }else{
        return this.ojkProduct.multiMap.productDetails[this.selectStageIndex].interest_rate
      }
    },
    managementExpense(){
      let index =this.ojkType
      if(index==0){//单期
        return this.ojkProduct.singleMap[0].productDetails[0].staging_services_rate
      }else{
        return this.ojkProduct.multiMap.productDetails[this.selectStageIndex].staging_services_rate
      }
    },
    getRateDiyType(){
      let index =this.ojkType
      if(index==0){//单期
        return this.getDiyType(this.ojkProduct.singleMap[0].productDetails[0].diy_type)
      }else{
        return this.getDiyType(this.ojkProduct.multiMap.productDetails[this.selectStageIndex].diy_type)
      }
    },
    //显示单期还是多期// state === 5 && id 已提交订单
    singleShow(){
      if (this.historyLoan && (this.historyLoan.status == '1' || this.historyLoan.status == '2')) {
          if (parseInt(this.historyLoan.periods) > 1) {
            return false; 
          }else{
            return !(this.customer.status == '5' && (this.singleProId.indexOf(this.cusTrailPhone.product_id) == -1))
          }
      }else{
        return !(this.customer.status == '5' && (this.singleProId.indexOf(this.cusTrailPhone.product_id) == -1))
      }      
    },
    multiShow(){
      if (this.historyLoan && (this.historyLoan.status == '1' || this.historyLoan.status == '2')) {
          if (parseInt(this.historyLoan.periods) == 1) {
            return false;
          }else{
            return !(this.customer.status == '5' && (this.multiProId.indexOf(this.cusTrailPhone.product_id) == -1))            
          }
      }else{
        return !(this.customer.status == '5' && (this.multiProId.indexOf(this.cusTrailPhone.product_id) == -1))
      }        
    },    
  },
  methods:{
    toRepayPage(){
      this.$parent.$data.selectedLabel='Pembayaran'
    },
    showProductSelect(index,id){
      if (this.historyLoan && (this.historyLoan.status == '1' || this.historyLoan.status == '2')) {
          if (parseInt(this.historyLoan.periods) > 1 && index == 0) {
            return;
          }
          if (parseInt(this.historyLoan.periods) == 1 && index == 1) {
            return;
          }
      }
      this.ojkType=index
      this.ojkProductShow=true
      this.selectProductInfo.productId=id;
      this.selectStage(0)
      this.$refs.scroll.scrollTo(0,-360,500)
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },300)
    },
    onPullingDown(){
      this.getNewProducts(true)
    },
    getTime(){
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      this.nowTime = new Date().toLocaleString();
      this.options.pullDownRefresh.txt=lang.msgView.newTime
		},
    testJump(){
      // this.$router.push({name:'ChangeCreditCard',params:{from:'home'}})
      this.$router.push('/identity')
      this.$store.commit("productType", '1');//0 个人 单期 1 多期 企业
      // this.saveSelectProductInfo()
      // this.showWithdrawal()
    },
    goPage(path) {
      this.$router.push(path)
    },
    scroll(pos) {
      let posY = Math.abs(pos.y)
      this.posY=posY
      let topHeight = this.$refs.bannerSlide.$el.offsetHeight
      if (posY >= topHeight) {
        this.cls = false
      } else {
        this.cls = false
      }
    },
    getNewProducts(loading){
      this.$ajax('post','/product/getProductBrandInfo','',(res)=>{
        let data=res.retData;
        if(data){
          this.items=data.list&&data.list.length>0?data.list:[{
            url: '',
            activity_img_url: require('./img/banner_default.png')
          }];
          this.customer=data.customer;//0未提交;1借款申请;2自动化审批通过;3自动化审批拒绝;4自动化审批异常转人工;5人工审批通过;6人工审批拒绝;
          this.cusTrailPhone=data.cusTrailPhone;
          let state=data.cusTrailPhone.state;
          let status=data.customer.status;//2:身份认证 3：个人信息 4：运营商授权 5：人脸识别 6：绑卡'
          let unPayLoanList=data.unPayLoanList;
          this.resetModular();
          this.productList=data.productList;
          this.stageList=data.productList.length?data.productList[0].periodsInfo:'';
          if(state=='0'){
            if(status!='6'){//按步申请
              this.getNewOjkProduct(true)
              this.modular.productShow=true// 这里的是首借 产品显示 点击申请 按照status跳步
              this.selectProductInfo.productId=this.productList[0]?this.productList[0].id:'';
              this.selectProductInfo.periodsId=this.stageList[0]?this.stageList[0].periodsId:'';
              if (data.hisLoanList && data.hisLoanList.length > 0) {
                this.historyLoan = data.hisLoanList[0];
              } else {
                this.historyLoan = {}
              }
            }else if(status=='6'){//提现
              this.modular.quotaShow=true
              this.selectProductInfo.productId=this.cusTrailPhone.product_id;
              this.selectProductInfo.periodsId=this.cusTrailPhone.periods_id;
            }
          }else if(state=='1'||state=='2'||state=='4'||state=='7'){//审核中
            this.modular.examineShow=true
          }else if(state=='5'){
            if(unPayLoanList.length>0){
              this.modular.loanShow=true
              this.unPayLoanList=unPayLoanList
            }else{
              this.getNewOjkProduct(true)
              this.modular.productShow=true// 这里的是复借 产品显示 点击申请 弹出还款计划弹框 产品默认展示第一个产品第一期 不从cusTrailPhone取值
              this.selectProductInfo.productId=this.productList[0].id;
              this.selectProductInfo.periodsId=this.stageList[0].periodsId;
              if (data.hisLoanList && data.hisLoanList.length > 0) {
                this.historyLoan = data.hisLoanList[0];
              } else {
               this.historyLoan = {}
             }
            }
          }else if(state=='6'||state=='3'){
            this.modular.refuseShow=true
            // this.modular.channelShow=true
            // this.getMoreChannel()
          }
          data.productList.forEach((element,index) => {
            element.active=index==0?true:false;
            element.periodsInfo.forEach((item,i)=>{
              item.active=i==0?true:false;
            })
          });
          this.$nextTick(function(){
            this.getTime()
            this.$refs.scroll.forceUpdate()
          }.bind(this))
        }
      },"",loading)
    },
    getDiyType(type){
      //diyType分期方式(1,天,2周,3月)
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      switch(type) {
        case '1':
          return lang.comm.day
          break;
        case '2':
          return lang.comm.week
          break;
        case '3':
          return lang.comm.month
          break;
        default:
          return ''
      }
    },
    resetModular(){
      this.modular={
        productShow:false,
        loanShow:false,
        quotaShow:false,
        examineShow:false,
        refuseShow:false,
        channelShow:false
      }
      this.selectProductInfo.productId='';
      this.selectProductInfo.periodsId='';
    },
    selectProduct(index){
      this.productList.forEach((item,i)=>{
        item.active=false
      });
      this.productList[index].active=true;
      this.selectProductInfo.productId=this.productList[index].id;
      this.stageList=this.productList[index].periodsInfo;
      this.selectStage(0)
    },
    selectStage(index){
      this.selectStageIndex=index
      if(this.ojkType==0){
        this.ojkProduct.singleMap.forEach((item,i)=>{
          item.productMap.active=false
        });
        this.ojkProduct.singleMap[index].productMap.active=true;
        // this.$set(this.ojkProduct.singleMap, index, this.ojkProduct.singleMap[index].productDetails[index]);
        this.selectProductInfo.periodsId=this.ojkProduct.singleMap[index].productDetails[0].id;
        this.selectProductInfo.productId=this.ojkProduct.singleMap[index].productMap.id;
      }else{
        this.ojkProduct.multiMap.productDetails.forEach((item,i)=>{
          item.active=false
        });
        this.ojkProduct.multiMap.productDetails[index].active=true;
        this.selectProductInfo.periodsId=this.ojkProduct.multiMap.productDetails[index].id;
      }
    },
    saveSelectProductInfo(){
      let state=this.cusTrailPhone.state;
      this.$store.commit("cusTrailPhoneState", state);
      this.$store.commit("productType", this.ojkType);//0 个人 单期 1 多期 企业
      this.$store.commit("product_id", this.selectProductInfo.productId);
      this.$store.commit("periods_id", this.selectProductInfo.periodsId);
      this.$router.push('/productDetail')
      // this.$ajax('post','/product/saveSelectProductInfo',this.selectProductInfo,(res)=>{
      //   let state=this.cusTrailPhone.state;
      //   if(state=='0'){
      //     // this.jumpStepView()
      //   }else if(state=='5'){// 調用預覽計劃
      //     // this.showWithdrawal()
      //   }
      // })
    },
    jumpStepView(){
      let status=this.customer.status;
      switch (status) {
      case '1':
        this.$router.push('/identity')
        break;
      case '2':
        this.$router.push('/personalInfo')
        break;
      case '3':
        this.$router.push('/authentication')
        break;
      case '4':
        this.$router.push('/faceIdentity')
        break;
      case '5':
        // if(bindingCardStatus == 'true'){
        //     layer.open({content: '正在绑卡，请稍后重试！', skin: 'msg', time: 3 });
        //     return
        // }
        this.$router.push({name:'ChangeCreditCard',params:{from:'home'}})
        break;
      default :
        this.$router.push('/identity')
        break;
      }
    },
    /** 显示弹框 **/
    showWithdrawal: function () {
      let selectProductInfo=this.selectProductInfo;
      const instance=this.$createWithdrawal({
        $props: {
          loading: true,
          productId: selectProductInfo.productId,
          periodsId: selectProductInfo.periodsId
        },
        $events:{
          closePopup: this.closePopup
        }
      }).show()
    },
    closePopup(){
      const instance=this.$createWithdrawal({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closePopup
        }
      }).hide();
      instance.remove()
      this.getNewProducts()
    },
    /**格式化日期
     * */
    formatTime(time, format) {
      if(!time){
        return '--';
      }
      if(format == 'nyr') {
        time = time.substr(0,4)+'年'+time.substr(4,2)+'月'+time.substr(6,2)+'日';
      } else if (format == 'nyrsfm') {
        time = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2)+ ' ' + time.substr(8,2) +':'+ time.substr(10,2) + ':' + time.substr(12,2);
      }else if (format=='--'){
        time = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2);
      }
      return time;
    },
    getMoreChannel(){
      this.$ajax('post','/platform/getMoreChannel',{},(res)=>{
        let data=res.retData;
        if(data){
          this.channelList=data.list
        }
      })
    },
    toOpenUrl:function (url) {
      if(!url){return}
      var url=url.replace('{userid}', localStorage['userNumber']);
      var ua = navigator.userAgent.toLowerCase();
      var options=[url,''];
      try{
        if (/iphone|ipad|ipod/.test(ua)) {
          if(window.webkit.messageHandlers){
            window.webkit.messageHandlers.jumpWebView.postMessage(options);
          }else{}
        }else if(/android/.test(ua)){
          object.jumpWebView(url,'')
        }
      }catch(e){
        console.log(e)
      }
    },
    getNewOjkProduct(loading){
      let _this=this
      this.$ajax('post','/product/getProductByIds',{
        singleProId:_this.singleProId.join(','),
        multiProId:_this.multiProId.join(',')
      },(res)=>{
        let data=res.retData;
        if(data){
          if(data.multiMap&&data.multiMap.productDetails){
            data.multiMap.productDetails.forEach((element,index) => {
              element.active=index==0?true:false;
            });
            data.multiMap.productDetails.sort(function (a,b) {
              return a.periods - b.periods
            });            
          }
          data.singleMap.forEach((element,index) => {
            element.productMap.active=index==0?true:false;
          });
          if(data.multiMap){
            data.multiMap.isShow=true
            _this.ojkProduct.multiMap=data.multiMap
          }else{
            _this.ojkProduct.isShow=false
          }
          if(data.singleMap&&data.singleMap.length){
            data.singleMap.forEach((ele,index,arr)=>{
              // if(fqDay)
              var bool=_this.singleMapFeDay.some((el,i)=>{
                return el.fqDay==ele.productDetails[0].fqDay
              })
              if(!bool){
                _this.singleMapFeDay.push({fqDay:parseInt(ele.productDetails[0].fqDay),diy_type:ele.productDetails[0].diy_type})
              }
              if(index===0){
                arr[0].productMap.maxQuota=ele.productMap.pro_quota
              }else{
                arr[0].productMap.maxQuota=(parseFloat(ele.productMap.pro_quota)>parseFloat(arr[0].productMap.maxQuota))?ele.productMap.pro_quota:arr[0].productMap.maxQuota
              }
            })
            // _this.singleMapFeDay.forEach((element,i)=>{

            //   _this.singleMapFeDay.forEach((elem)=>{

            //   })
            // })
            _this.singleMapFeDay.sort((a,b)=>{
              // a.diy_type   ==1?a.fqDay-b.fqDay
              var bool=false
              if(a.diy_type==b.diy_type){
                bool=a.fqDay-b.fqDay
              }else{
                bool = a.diy_type-b.diy_type
              }
              return bool
            })
            _this.ojkProduct.singleMap=data.singleMap
            _this.ojkProduct.singleProductIshow=true
          }else{
            _this.ojkProduct.singleProductIshow=false
          }
        }
        _this.ojkProduct.productFlag=true
      },"",loading)
    },
    showAgreement(type){
      const instance=this.$createAgreement({
        $props: {
          loading: true,
          type: type
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).show()
    },
    closeAgreementPopup(e){
      const instance=this.$createAgreement({
        $props: {
          loading: false
        },
        $events:{
          closePopup: this.closeAgreementPopup
        }
      }).hide();
      instance.remove();
      sessionStorage.setItem("agreement",true)
      let className=e.target.className
      if(className=='base-btn refuse'){
        this.agree=false
      }else{
        this.agree=true
      }
    }
  },
  destroyed(){
    if(timerMsg){clearInterval(timerMsg);timerMsg=null}
  },
  watch:{
    selectedProductId(newValue,oldValue,){
      this.periodsList=this.products[newValue].periodsList
      this.selectedPeriodsId=this.products[newValue].periodsList[0].id
    }
  },
  components:{
  }
}
</script>
<style lang="stylus">
.bannerSlide{
  width 100%
}
.bannerSlide img{
  width:100%!important
}
</style>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.myHeader
  height 68px
  line-height 50px
  text-align center
  width 100%
  background $color-header
  .headerTitle
    display inline-block
    height 68px
    line-height 50px
    color #FFF
    font-size 16px
    color $color-header-text
.iosHeader
  height 68px
  line-height 95px
.background
  background-color $color-header
.color
  color #000!important
.scroll-list-wrap
  position absolute
  left 0
  right 0
  bottom 50px
  background-color $color-home-background
.scrollHeight
  .top-tips{
    font-weight bold
    font-size 16px
    color #000
    text-align left
    padding 15px
  }
  .cube-slide
    height auto
.cube-slide-item > img {
  display: block;
  width: 100%;
  width: 100vw;
  height 56.8vw;
}
.product-container{
  padding 0 15px 0 15px;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  .product-title{
    text-align left
    margin-top 20px
  }
  .product-list{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position relative
    padding-bottom 20px
    &:after{
      content '';
      position absolute
      left 0
      right 0
      bottom 0
      height 1px
      background #dddddd
    }
    li{
      display inline-block;
      color: $color-home;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      line-height: 0.8rem;
      width: 33%;
      margin 20px 0 0 0;
      padding 0 10px;
      span{
        display inline-block;
        width 100%;
        border: 1pt solid $color-home;
        border-radius: 4px;
      }
    }
    li.active{
      span{
        background $color-home
        color $color-button-font
      }
    }
  }
  .product-button{
    margin 20px 10px
  }
}
.my-loan-container{
  min-height: 150px;
  margin-top: 6px;
  background: url(./img/get_bg1.png) no-repeat center center;
  background-size cover;
  border-top: 1px solid transparent;
  text-align: left;
  .my-loan{
    padding 20px 30px;
    .my-loan-title{
      font-size: 15px;
      color: rgba(255, 255, 255, .7);
    }
    .my-loan-money{
      font-weight: bold;
      font-size: 20px;
      text-align: left;
      padding: 15px 0 5px 0;
      color: #fff;
      span:last-child{
        font-size 30px;
      }
    }
    .my-loan-time{
      font-size: 14px;
      color: rgba(255, 255, 255, .7);
    }
  }
}
.my-quota-container{
  min-height: 180px;
  margin-top: 10px;
  background: url(./img/getMoney.png) center center / cover no-repeat;
  border-top: 1px solid transparent;
  .my-quota{
    text-align: center;
    color: #fff;
    padding-top: 25px;
    .my-quoto-title{
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
    }
    .my-quoto-money{
      font-size: 36px;
      margin: 22px 0 23px 0;
      span:first-child{
        font-size: 20px;
      }
    }
    .my-quoto-button{
      margin 0 auto;
      color: $color-home;
      background: #fff;
      border-radius: 40px;
      font-size: 15px;
      padding: 10px;
      box-shadow: 0 4px 4px $color-home;
      letter-spacing: 2px;
    }
  }
}
.my-examine{
  height: 80px;
  background: url(./img/auditing_bg.png) center center / cover no-repeat rgb(255, 255, 255);
}
.my-examine-container{
  width 100%
  height 170px
  background: url(./img/credit1.jpg) center center / cover no-repeat;
  border-top: 1px solid transparent;
  .my-loan-money{
    padding-top 50px
    font-size 24px
    color #333
    font-weight bold
  }
}
.my-refuse{
  width: 100%;
  height: 200px;
  background: url(./img/refuse.png) center center / cover no-repeat;
  background-size: 100% 100%;
}
.my-noProduct{
  width: 100%;
  height: 200px;
  background: url(./img/no_product.png) center center / cover no-repeat;
  background-size: 100% 100%;
}
.more-channel{
  text-align left;
  padding: 15px 15px 15px 25px;
  font-size: 14px;
  .channel{
    position relative
    font-size: 16px;
    font-weight: 600;
    &:before{
      content: "";
      position: absolute;
      top: 2px;
      left: -15px;
      width: 6px;
      height: 80%;
      background: #4A68FC;
      border-radius: 10px;
    }
  }
  .channel-list{
    margin 10px 0;
    img{
      width 100%
    }
  }
}
.bg
  background-color #F1EFF5
  height 10px
.advantage1
  margin 10px 15px 0
  border-bottom 1pt solid #A9A9A9
  height 15px
  line-height 30px
  color #777777
  .text
    width 140px
    margin auto
    background-color $color-home-background
  .textLine
    line-height: 16px;
.advantage2
  display flex
  margin-top 25px
  li
    flex 1
    width 30%
    img
      width 45%
.height
  height 50px
  background $color-home-background
.product-container-new{
  .new-title{
    text-align left
    padding 10px 15px 0
    font-size 14px
    font-weight 500
  }
  .new-products{
    background #F0ECEB
    margin 10px 15px 15px
    border-radius 4px
    .new-products-body{
      min-height 110px
      border-radius 4px
      background url(./img/lent_no.png) no-repeat center center;
      background-size cover
      .new-product-title{
        text-align left
        padding 10px 15px 0
        font-size 20px
        font-weight bold
        color #fff
      }
      .new-product-title-tips{
        text-align left
        padding 0 15px 0
        font-size 3
        font-weight 400
        color #fff
      }
      .new-info{
        display flex
        padding 10px 15px
        font-size 14px
        color #fff
        text-align left
        .new-info-left{
          flex 1
          div:last-child{
            font-size 18px
            padding-top 5px
          }
        }
        .new-info-right{
          flex 1
          div:last-child{
            font-size 18px
            padding-top 5px
          }
        }
      }
    }
    .new-products-footer{
      font-size 14px
      color #999
      text-align left
      padding 10px 15px
    }
  }
  .new-products-active{
    .new-products-body{
      background url(./img/lent_ok.png) no-repeat center center;
      background-size cover
    }
  }
}
.product-info-detalis{
  font-size 14px
  text-align left
  padding 10px 15px
  .product-info-detalis-all{
    font-size 16px
    font-weight bold
    margin-bottom 15px
  }
  .product-info-detalis-item{
    .item-item{
      margin-top 10px
      font-size 14px
      color #999
      padding-left 10px
    }
  }
}
</style>
