
<template>
  <div class="container">
      <MyHeader ref="header">Kontak Darurat</MyHeader>
      <Process :index="1"></Process>
    <div class="scroll-list-wrap" :style="{height:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="form hidden" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">婚况</div>
            <div class="text"><input type="text" v-model="formSelectText.marriedText" placeholder="选择婚况" readonly @click="showPicker1()"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="form hidden" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">学历</div>
            <div class="text"><input type="text" v-model="formSelectText.educationText" placeholder="选择学历" readonly @click="showPicker2()"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="form hidden" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">个人邮箱</div>
            <div class="text"><input type="text" v-model="form.personalEmail" placeholder="输入常用邮箱" maxlength="30"></div>
          </div>
          <div class="groupTitle hidden">
            职业信息
          </div>
          <div class="form hidden" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">公司名称</div>
            <div class="text"><input type="text" v-model="form.companyName" placeholder="输入公司名称" maxlength="39"></div>
          </div>
          <div class="form hidden" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">联系电话</div>
            <div class="text"><input type="text" v-model="form.companyTel" placeholder="输入联系电话 (021-23111111)" maxlength="18"></div>
          </div>
          
          <div class="zList" v-for="(item,index) in form.zLinkList">
            <div class="groupTitle">
              {{$t('lang.contactsView.contacts')}}{{index+1}}
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div :class="{lable:true,'lineFeed':$i18n.locale=='in-ID'?true:false}">{{$t('lang.contactsView.relatives')}}</div>
              <div class="text"><input type="text" v-model="item.linealRel" :placeholder="$t('lang.contactsView.relativesName')" maxlength="30"></div>
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div class="lable">{{$t('lang.contactsView.contactWay')}}</div>
              <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" v-model="item.PersonDirectRelativesPhone" maxlength="20" :placeholder="$t('lang.contactsView.selection')"></div>
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div class="lable">{{$t('lang.contactsView.relationship')}}</div>
              <div class="text" @click="showPicker3(index)"><input type="text" v-model="item.relationship" readonly :placeholder="$t('lang.comm.choose')"><i class="iconfont icon-previewright"></i></div>
            </div>
          </div>
          <div class="qList" v-for="(item,index) in form.qLinkList">
            <div class="groupTitle">
              {{$t('lang.contactsView.contacts')}}{{index+1}}
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div class="lable">{{$t('lang.contactsView.other')}}</div>
              <div class="text"><input type="text" v-model="item.otherRel" :placeholder="$t('lang.contactsView.otherName')"  maxlength="30"></div>
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div class="lable">{{$t('lang.contactsView.contactWay')}}</div>
              <div class="text"><input type="tel" oninput="value=value.replace(/[^0-9]/g,'')" maxlength="20" v-model="item.otherRelativesPhone" :placeholder="$t('lang.contactsView.selection')"></div>
            </div>
            <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
              <div class="lable">{{$t('lang.contactsView.relationship')}}</div>
              <div class="text" @click="showPicker4(index)"><input type="text" v-model="item.otherRelationship" readonly :placeholder="$t('lang.comm.choose')"><i class="iconfont icon-previewright"></i></div>
            </div>
          </div>
          <div class="wrapper"><div class="base-btn" @click="savePersonalInfo()">{{$t('lang.comm.next')}}</div></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Process from './Process/Process.vue'
const nameReg = /^[\u4E00-\u9FA5]+$/;
const nameRegEn=/^[0-9a-zA-Z]+$/;
const telReg = /^1[3456789]\d{9}$/;
const fixTelReg = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
const column1 = [{ text: '未婚', value: 0}, { text: '已婚', value: 1 }]//婚否
let column2 = [{ text: '高中', value: 0}, { text: '大专', value: 1 },{ text: '本科', value: 2 },{ text: '硕士', value: 3 },{ text: '博士', value: 4 },{ text: '博士后', value: 5 }]//学历
let column3 = [{ text: '其他(家庭联系人)', value: 0}, { text: '父母', value: 1 },{ text: '子女', value: 2 },{ text: '亲兄弟姐妹', value: 3 },{ text: '亲属', value: 4 },{ text: '朋友', value: 5 },{ text: '同事', value: 6 },{ text: '同学', value: 7 }]//关系
let column4 = [{ text: '其他(家庭联系人)', value: 0}, { text: '父母', value: 1 },{ text: '子女', value: 2 },{ text: '亲兄弟姐妹', value: 3 },{ text: '亲属', value: 4 },{ text: '朋友', value: 5 },{ text: '同事', value: 6 },{ text: '同学', value: 7 }]//关系
export default {
  name: 'PersonalInfo',
  data () {
    return {
      height:0,
      form:{
        married: '',//婚否 0未婚，1已婚
        education: '',//学历
        personalEmail: '',//个人邮箱
        companyName: '', //公司名
        companyTel: '', //公司电话
        linkmanName1: '', //联系人姓名1
        linkmanTel1: '',  //联系人电话1
        relationShip1: '', //与联系关系1
        linkmanName2: '',// 联系人姓名2
        linkmanTel2: '', //联系人电话2
        relationShip2: '', //与联系关系2
        phoneBookList:[],
        phoneMsgList: [],
        zLinkList:[{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        },{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        },{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        }],//直系
        qLinkList:[{
          otherRel: '',
          otherRelativesPhone: '',
          otherRelationship: '',
          relationOtherValue: ''
        },{
          otherRel: '',
          otherRelativesPhone: '',
          otherRelationship: '',
          relationOtherValue: ''
        }]//其他
      },
      formSelectText:{
        marriedText:'',//婚否
        educationText: '',//学历
        relationShip1Text: '', //与联系关系1
        relationShip2Text: '', //与联系关系2
      },
      innerHeight:'',
      contactIndex: '0',
      smsParam: {
        smsDays: "",
        sysDate: ""
      },
      picker3Index: 0,
      picker4Index: 0
    }
  },
  created(){
    this.getPersonalInfo()
  },
  mounted (){
    this.height=(window.innerHeight-this.$Header-100)+'px'
    this.innerHeight=window.innerHeight
    window['contactCallback'] = (msg) => {
      this.contactCallbackFun(msg)
    }
    /**
     * 获取短信结果回调
     * **/
    window['smsInfoCallback'] = function (msg) {
      this.smsInfoCallbackFun(msg)
    };
  },
  methods:{
    showPicker1() {
      if (!this.picker1) {
        this.picker1 = this.$createPicker({
          title:'请选择婚否',
          data: [column1],
          onSelect: this.selectHandle1,
          onCancel: this.cancelHandle
        })
      }
      this.picker1.show()
    },
    showPicker2() {
      if (!this.picker2) {
        this.picker2 = this.$createPicker({
          title:'请选择学历',
          data: [column2],
          onSelect: this.selectHandle2,
          onCancel: this.cancelHandle
        })
      }
      this.picker2.show()
    },
    showPicker3(index) {
      let _this=this;
      this.picker3Index=index;
      if (!this.picker3) {
        this.picker3 = this.$createPicker({
          title:'',
          cancelTxt: _this.$t('lang.comm.cancel'),
          confirmTxt: _this.$t('lang.comm.confirm'),
          data: [column3],
          onSelect: this.selectHandle3,
          onCancel: this.cancelHandle
        })
      }
      this.picker3.show()
    },
    showPicker4(index) {
      let _this=this
      this.picker4Index=index;
      if (!this.picker4) {
        this.picker4 = this.$createPicker({
          title:'',
          cancelTxt: _this.$t('lang.comm.cancel'),
          confirmTxt: _this.$t('lang.comm.confirm'),
          data: [column4],
          onSelect: this.selectHandle4,
          onCancel: this.cancelHandle
        })
      }
      this.picker4.show()
    },
    //调原生接口
    callHander(type,flag){
      if(flag){
        return
      }
      this.contactIndex=type;
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
          try{
            if(window.webkit.messageHandlers){
              window.webkit.messageHandlers.getContact.postMessage([type]);
            }else{}
          }catch(e){
            console.warn(e)
          }
      }else if(/android/.test(ua)){
        object.getContact()
      }
    },
    contactCallbackFun(msg){
      var reg = /^[\u4E00-\u9FA5]+$/;
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      let _this=this;
      var phoneBookList = [];
      if(typeof(msg)=="string"){
        try{
          msg=eval('('+msg+')');
        }catch(e){
          console.warn(e)
        }
      }
      if(msg.retCode!="SUCCESS"){
        this.$createDialog({
          type: 'alert',
          content: lang.comm.contactsError,
          confirmBtn:{
            text: lang.comm.confirm
          },
          onConfirm: () => {}
        }).show()
        return
      }
      let index=_this.contactIndex;
      var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            var result = msg.retData;
            var name = result[0];
            var phone = result[1];
            var list = result[2];
            phone = phone.replace(/-|\+86|\s/g,'');
            for(var i = 0;i<list.length;i++){
              var linkObj = {
                  name:list[i].name?(list[i].name).replace(/[^\u4E00-\u9FA50-9a-zA-Z]/g,''):"",
                  phones:list[i].number?list[i].number.replace(/-|\+86|\s/g,''):""
              };
              phoneBookList.push(linkObj);
            }
            if(!reg.test(name)){
              _this.$Toast({message:lang.regMsg.nameReg,position:'bottom'});
              return
            }
            if(index == '0'){
              _this.form.linkmanName1=name
              _this.form.linkmanTel1=phone
            }else if(index == '1'){
              _this.form.linkmanName2=name
              _this.form.linkmanTel2=phone
            }
        }else if(/android/.test(ua)){
            var result = msg.retData;
            var name = result.name,phone = result.number.replace(/-|\+86|\s/g,''),list = result.contactBeans;
            for(var i = 0;i<list.length;i++){
              var linkObj = {
                name:list[i].name?(list[i].name).replace(/[^\u4E00-\u9FA50-9a-zA-Z]/g,''):"",
                phones:list[i].number?list[i].number.replace(/-|\+86|\s/g,''):""
              };
              phoneBookList.push(linkObj);
            }
            if(!reg.test(name)){
              _this.$Toast({message:lang.regMsg.nameReg,position:'bottom'});
              return
            }
            if(index == '0'){
              _this.form.linkmanName1=name
              _this.form.linkmanTel1=phone
            }else if(index == '1'){
              _this.form.linkmanName2=name
              _this.form.linkmanTel2=phone
            }
        }
        this.form.phoneBookList=phoneBookList
    },
    onError(){
      this.$Toast({message: '打开通讯录失败,请检查权限!',position:'bottom'});
    },
    selectHandle1(selectedVal, selectedIndex, selectedText) {//选择婚况
      this.form.married=selectedVal[0]
      this.formSelectText.marriedText=selectedText[0]
    },
    selectHandle2(selectedVal, selectedIndex, selectedText) {//学历
      this.form.education=selectedVal[0]
      this.formSelectText.educationText=selectedText[0]
    },
    selectHandle3(selectedVal, selectedIndex, selectedText) {//与联系人关系1
      this.form.relationShip1=selectedVal[0]
      this.formSelectText.relationShip1Text=selectedText[0]
      this.form.zLinkList[this.picker3Index].relationship=selectedText[0]
      this.form.zLinkList[this.picker3Index].relationValue=selectedVal[0]
    },
    selectHandle4(selectedVal, selectedIndex, selectedText) {//与联系人关系2
      this.form.qLinkList[this.picker4Index].otherRelationship=selectedText[0]
      this.form.qLinkList[this.picker4Index].relationOtherValue=selectedVal[0]
      this.form.relationShip2=selectedVal[0]
      this.formSelectText.relationShip2Text=selectedText[0]
    },
    checkInfo(){
      let form = this.form
      let locale = this.$i18n._vm.locale
      let lang=this.$i18n._vm.messages[locale].lang
      // if(!this.formSelectText.marriedText){
      //   this.$Toast({message:'请选择婚姻状况',position:'bottom'})
      //   return false;
      // }
      // if(!this.formSelectText.educationText){
      //   this.$Toast({message:'请选择学历',position:'bottom'})
      //   return false;
      // }
      // if(!form.personalEmail){
      //   this.$Toast({message:'请填写个人邮箱',position:'bottom'})
      //   return false;
      // }else if(!emailReg.test(form.personalEmail)){
      //   this.$Toast({message: '电子邮箱格式不正确', position:'bottom'})
      //   return false
      // }
      // if(!form.companyName) {
      //   this.$Toast({message: '请填写公司名称', position:'bottom'})
      //   return false
      // }
      // if(!form.companyTel) {
      //   this.$Toast({message: '请填写公司联系电话', position:'bottom'})
      //   return false
      // }else if(!telReg.test(form.companyTel) && !fixTelReg.test(form.companyTel)){
      //   this.$Toast({message: '单位电话格式不正确，请填写正确的手机号或带区号的固定电话', position:'bottom'})
      //   return false
      // }

      // if(locale=='zh-CN'){
      //   if(!this.form.linkmanName1){
      //     this.$Toast({message:lang.regMsg.nameOne,position:'bottom'})
      //     return false;
      //   }else if(!nameReg.test(this.form.linkmanName1)){
      //     this.$Toast({message:lang.regMsg.nameOneReg})
      //     return false;
      //   }
      // }else{
      //   if(!this.form.linkmanName1){
      //     this.$Toast({message:lang.regMsg.nameOne,position:'bottom'})
      //     return false;
      //   }else if(!nameRegEn.test(this.form.linkmanName1)){
      //     this.$Toast({message:lang.regMsg.nameOneReg})
      //     return false;
      //   }
      // }
      // if(!telReg.test(this.form.linkmanTel1) && !fixTelReg.test(this.form.linkmanTel1)){
      //   this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
      //   return false;
      // }
      // if(!this.formSelectText.relationShip1Text){
      //   this.$Toast({message:lang.regMsg.relRelOne,position:'bottom'})
      //   return false;
      // }

      // if(locale=='zh-CN'){
      //   if(!this.form.linkmanName2){
      //     this.$Toast({message:lang.regMsg.nameTwo,position:'bottom'})
      //     return false;
      //   }else if(!nameReg.test(this.form.linkmanName2)){
      //     this.$Toast({message:lang.regMsg.nameTwoReg})
      //   }
      // }else{
      //   if(!this.form.linkmanName2){
      //     this.$Toast({message:lang.regMsg.nameTwo,position:'bottom'})
      //     return false;
      //   }else if(!nameRegEn.test(this.form.linkmanName2)){
      //     this.$Toast({message:lang.regMsg.nameTwoReg})
      //   }
      // }
      
    
      // if(!telReg.test(this.form.linkmanTel2) && !fixTelReg.test(this.form.linkmanTel2)){
      //   this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
      //   return false;
      // }
      // if(!this.formSelectText.relationShip2Text){
      //   this.$Toast({message:lang.regMsg.relRelTwo,position:'bottom'})
      //   return false;
      // }
      // if(this.form.linkmanTel2==this.form.linkmanTel1){
      //   this.$Toast({message:lang.regMsg.repeat,position:'bottom'})
      //   return false;
      // }
      let zLinkList=form.zLinkList;
      let qLinkList=form.qLinkList;
      for(let i=0;i<zLinkList.length;i++){
        if(!zLinkList[i].linealRel){
          this.$Toast({message:lang.regMsg.nameOne,position:'bottom'})
          return false
        }else if(!zLinkList[i].PersonDirectRelativesPhone){
          this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
          return false
        }else if(!zLinkList[i].relationship){
          this.$Toast({message:lang.regMsg.relRelOne,position:'bottom'})
          return false
        }
      }
      for(let i=0;i<qLinkList.length;i++){
        if(!qLinkList[i].otherRel){
          this.$Toast({message:lang.regMsg.nameTwo,position:'bottom'})
          return false
        }else if(!qLinkList[i].otherRelativesPhone){
          this.$Toast({message:lang.regMsg.telReg,position:'bottom'})
          return false
        }else if(!qLinkList[i].otherRelationship){
          this.$Toast({message:lang.regMsg.relRelTwo,position:'bottom'})
          return false
        }
      }

      return true
    },
    //保存个人信息
    savePersonalInfo(){
      let This=this;
      if(!This.checkInfo()){
        return
      }
      let form=this.form;
      let formSelectText=this.formSelectText;
      var jsonData = {
        marryStatus:'未婚',
        marryValue:'0',
        education:'本科',
        educateValue:'5',
        companyName:'中国上海的公司',
        userEmail:'1595893619@qq.com',
        userAddress:'上海',
        linkNumber:'18211111111',
        companyAddress:'福建省/福州市/台江区',
        addressId:'350000/350100/350103',
        detailAddr:'曙光路申发大厦',
        linealRel:form.linkmanName1,//联系人1姓名
        PersonDirectRelativesPhone:form.linkmanTel1,//联系人1手机号
        relationship:formSelectText.relationShip1Text,//联系人1关系文字
        relationValue:form.relationShip1,//联系人1关系值
        otherRel:form.linkmanName2,//联系人2姓名
        otherRelativesPhone:form.linkmanTel2,//联系人2手机号
        otherRelationship:formSelectText.relationShip2Text,//联系人2关系文字
        relationOtherValue:form.relationShip2,//联系人2关系值
        linkDirectId:'',
        linkOtherId:'',
        zLinkList:form.zLinkList,
        qLinkList:form.qLinkList,
        // receiveAddress:formData.receveAddress,
        // addreId:formData.receAddressId,
        // detail:formData.detailReceAddr,
        person_info_complete:'100',
        orderId:'',
        phoneBookList: form.phoneBookList, //所有电话号码
        phoneMsgList: form.phoneMsgList// 规定日期内的短信
      };
      This.$ajax('post','/basicinfo/addMiaofuBasicInfo',{data:JSON.stringify(jsonData)},function(data){
        This.getOpenAccountCard()
      })
    },
    /**判断是否绑卡**/
    getOpenAccountCard(){
      this.$ajax('post','/payTreasure/getOpenAccountCard','',function(msg){
        let data = msg.retData;
        if(data.is_openAccount=='0'){// 未开户
          this.$router.push({name:'ChangeCreditCard',params:{from:'face'}})
        }else{
          this.addLoanNoContract();
        }
      }.bind(this))
    },
    /**无合同增加借据**/
    addLoanNoContract(){
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      this.$ajax('post','/loanAgreement/addLoanNoContract','',function(msg){
        this.$router.push({
          name:'ApplyStatus',
          params:{HeaderTitle:lang.process.title,msgMain:lang.process.success,msg:'',btnTxt:lang.process.backHome,path:'/portal'}
        })
      }.bind(this))
    },
    getPersonalInfo(){
      let This=this
      This.$ajax('post','/basicinfo/getMiaofuBasicInfo','',function(data){
        let linkManList=data.retData.linkManList;
        let otherLinkManList=data.retData.otherLinkManList;
        let olist=data.retData.olist;
        column3=linkManList;
        column4=otherLinkManList;
        This.smsParam=data.retData.smsParam;
        This.form.zLinkList=data.retData.zLinkList.length>0?data.retData.zLinkList:[{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        },{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        },{
          linealRel: '',
          relationship: '',
          relationValue: '',
          PersonDirectRelativesPhone: ''
        }];
        This.form.qLinkList=data.retData.qLinkList.length>0?data.retData.qLinkList:[{
          otherRel: '',
          otherRelativesPhone: '',
          otherRelationship: '',
          relationOtherValue: ''
        },{
          otherRel: '',
          otherRelativesPhone: '',
          otherRelationship: '',
          relationOtherValue: ''
        }];
        // This.getPhoneShortMessage();
        // olist.forEach((element,index) => {
        //   if(index==0){
        //     This.form.linkmanName1=element.link_name
        //     This.form.linkmanTel1=element.contact
        //     This.formSelectText.relationShip1Text=element.relationship_name
        //     This.form.relationShip1=element.relationship
        //   }else{
        //     This.form.linkmanName2=element.link_name
        //     This.form.linkmanTel2=element.contact
        //     This.formSelectText.relationShip2Text=element.relationship_name
        //     This.form.relationShip2=element.relationship
        //   }
        // });
      })
    },
    cancelHandle() {
    },
    smsInfoCallbackFun(msg){
      let _this=this;
      let locale = this.$i18n._vm.locale
      let lang= this.$i18n._vm.messages[locale].lang
      if(typeof(msg)=="string"){
        try{
          msg=eval('('+msg+')');
        }catch(e){
          console.warn(e)
        }
      }
      var data=msg.retData;
      if(msg.retCode=="SUCCESS"){
        this.form.phoneMsgList=data?data:[];
      }else{
        if(msg.retMsg=="没有相关短信息"){return}
        this.$createDialog({
          type: 'alert',
          content: msg.retMsg,
          confirmBtn:{
            text: lang.comm.confirm
          },
          onConfirm: () => {
            _this.getPhoneShortMessage()
          }
        }).show()
      }
    },
    getPhoneShortMessage(){
      var ua = navigator.userAgent.toLowerCase();
      var days=this.smsParam.days;
      var currentDate=this.smsParam.currentDate;
      try{
        if (/iphone|ipad|ipod/.test(ua)) {
        }else if(/android/.test(ua)){
          object.getSmsInfo(days,currentDate)
        }
      }catch(e){
        console.warn(e)
      }
    }
  },
  beforeDestroy(){
    window.innerHeight=this.innerHeight
  },
  components:{
    Process
  }
}
</script>

<style lang="stylus" scoped>
.container
  background-color #F6F6F6
  position absolute
  bottom 0
  top 0
  left 0
  right 0
.scroll-list-wrap
  background #FFF
  position relative
  bottom 0
  left 0
  right 0
  .box
    font-size 14px
    .form
      font-size 14px
      display flex
      line-height 44px
      border-bottom: 1px dashed rgb(241, 241, 241);
      text-align left
      .lable
        flex 3
        padding-left 15px
      .lineFeed{
        line-height: 20px;
        margin-top: 4px;
        flex 3
        padding-left 15px
      }
      .text
        flex 7
        position relative
        padding-right 15px
        input
          height 100%
          width 100%
          pointer-events: auto; 
          -webkit-user-select:auto
      i
        position absolute
        right 10px
        font-size 25px
    .groupTitle
      background: #F6F6F6;
      color: #b9b9b9;
      line-height 37px
      text-align left
      padding 0 15px
    .hidden{
      display none
    }
  .wrapper
     margin 50px 20px 0
     height 180px
</style>