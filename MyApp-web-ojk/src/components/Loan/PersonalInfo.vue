
<template>
  <div class="container">
      <MyHeader ref="header">额度申请</MyHeader>
      <Process :index="1"></Process>
    <div class="scroll-list-wrap" :style="{height:height}">
      <cube-scroll ref="scroll" >
        <div class="box">
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">婚况</div>
            <div class="text"><input type="text" v-model="formSelectText.marriedText" placeholder="选择婚况" readonly @click="showPicker1()"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">学历</div>
            <div class="text"><input type="text" v-model="formSelectText.educationText" placeholder="选择学历" readonly @click="showPicker2()"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">个人邮箱</div>
            <div class="text"><input type="text" v-model="form.personalEmail" placeholder="输入常用邮箱" maxlength="30"></div>
          </div>
          <div class="groupTitle">
            职业信息
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">公司名称</div>
            <div class="text"><input type="text" v-model="form.companyName" placeholder="输入公司名称" maxlength="39"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">联系电话</div>
            <div class="text"><input type="text" v-model="form.companyTel" placeholder="输入联系电话 (021-23111111)" maxlength="18"></div>
          </div>
          <div class="groupTitle">
            联系人1
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">直系亲属</div>
            <div class="text"><input type="text" v-model="form.linkmanName1" placeholder="输入直系亲属姓名" maxlength="10" @click="callHander(1,form.linkmanName1||form.linkmanTel1)"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">联系方式</div>
            <!-- <div class="text"><input type="number" maxlength="11" v-model="form.linkmanTel1" :readonly="!(form.linkmanName1||form.linkmanTel1)" placeholder="进入通讯录选择" @click="callHander(1,form.linkmanName1||form.linkmanTel1)"><i class="iconfont icon-dianhuaben" @click="callHander(1,false)"></i></div> -->
            <div class="text"><input type="number" maxlength="11" v-model="form.linkmanTel1" readonly placeholder="进入通讯录选择" @click="callHander(1,false)"><i class="iconfont icon-dianhuaben" @click="callHander(1,false)"></i></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">关系</div>
            <div class="text" @click="showPicker3()"><input type="text" v-model="formSelectText.relationShip1Text" readonly placeholder="请选择"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="groupTitle">
            联系人2
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">其他联系人</div>
            <div class="text"><input type="text" v-model="form.linkmanName2" placeholder="输入联系人真实姓名"  maxlength="10" @click="callHander(2,form.linkmanName2||form.linkmanTel2)"></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">联系方式</div>
            <div class="text"><input type="number" maxlength="11" v-model="form.linkmanTel2" readonly placeholder="进入通讯录选择" @click="callHander(2,false)"><i class="iconfont icon-dianhuaben" @click="callHander(2,false)"></i></div>
          </div>
          <div class="form" style="border-bottom: 1px dashed rgb(241, 241, 241);">
            <div class="lable">关系</div>
            <div class="text" @click="showPicker4()"><input type="text" v-model="formSelectText.relationShip2Text" readonly placeholder="请选择"><i class="iconfont icon-previewright"></i></div>
          </div>
          <div class="wrapper"><div class="base-btn" @click="savePersonalInfo()">下一步</div></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Process from './Process/Process.vue'
const nameReg = /^[\u4E00-\u9FA5]+$/;
const telReg = /^1[3456789]\d{9}$/
const fixTelReg = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
const column1 = [{ text: '未婚', value: 0}, { text: '已婚', value: 1 }]//婚否
var column2 = [{ text: '高中', value: 0}, { text: '大专', value: 1 },{ text: '本科', value: 2 },{ text: '硕士', value: 3 },{ text: '博士', value: 4 },{ text: '博士后', value: 5 }]//学历
var column3 = [{ text: '其他(家庭联系人)', value: 0}, { text: '父母', value: 1 },{ text: '子女', value: 2 },{ text: '亲兄弟姐妹', value: 3 },{ text: '亲属', value: 4 },{ text: '朋友', value: 5 },{ text: '同事', value: 6 },{ text: '同学', value: 7 }]//关系
var column4 = [{ text: '其他(家庭联系人)', value: 0}, { text: '父母', value: 1 },{ text: '子女', value: 2 },{ text: '亲兄弟姐妹', value: 3 },{ text: '亲属', value: 4 },{ text: '朋友', value: 5 },{ text: '同事', value: 6 },{ text: '同学', value: 7 }]//关系
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
        phoneBookList:[]
      },
      formSelectText:{
        marriedText:'',//婚否
        educationText: '',//学历
        relationShip1Text: '', //与联系关系1
        relationShip2Text: '', //与联系关系2
      },
      innerHeight:'',
      type:1
    }
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
    showPicker3() {
      if (!this.picker3) {
        this.picker3 = this.$createPicker({
          title:'请选择关系',
          data: [column3],
          onSelect: this.selectHandle3,
          onCancel: this.cancelHandle
        })
      }
      this.picker3.show()
    },
    showPicker4() {
      if (!this.picker4) {
        this.picker4 = this.$createPicker({
          title:'请选择关系',
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
      let _this=this
      _this.type=type
      //纯webview方法调用
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
          try{
              if(window.webkit.messageHandlers){
                  window.webkit.messageHandlers.getContact.postMessage(['0']);
              }else{}
          }catch(e){
              console.warn(e)
          }
      }else if(/android/.test(ua)){
          object.getContact()
      }
      return
      //纯webview方法调用
      //cordova调用
      var options = new ContactFindOptions();
      options.filter = "";
      options.multiple = true;
      var fields = ["displayName", "name", "phoneNumbers"];
      navigator.contacts.find(fields, (contacts)=>{
        if (!_this.$IsIphone) {//安卓
          try{
            var resultStr = contacts;
            resultStr = resultStr.split('$');
            var name = resultStr[0],phone = resultStr[1].replace(/-|\+86|\s/g,''),list = resultStr[2];
            list=eval('('+list+')');
            var phoneBookList=[]//全部联系人列表
            for(var i = 0;i<list.length;i++){
                var linkObj = {
                    name:list[i].name?(list[i].name).replace(/[^\u4E00-\u9FA50-9a-zA-Z]/g,''):"",
                    phones:list[i].number?(list[i].number).replace(/-|\+86|\s/g,''):""
                };
                phoneBookList.push(linkObj);
            }
            _this.form.phoneBookList=JSON.stringify(phoneBookList)
            if(!nameReg.test(name)){
                _this.$Toast({message: '联系人姓名只能是中文',position:'bottom'});
                return
            }
            if(!telReg.test(phone)){
                _this.$Toast({message: '联系方式格式不正确，请选择正确的手机号',position:'bottom'});
                return
            }
            if(type == 1){
              _this.form.linkmanName1=name
              _this.form.linkmanTel1=phone
            }else if(type == 2){
              _this.form.linkmanName2=name
              _this.form.linkmanTel2=phone
            }
          }catch(e){
            alert(e)
          }
        }else{
          var result = contacts;
          var name = result[0];
          var phone = result[1];
          var list = result[2];
          list = eval('('+list+')');
          var phoneBookList=[]//全部联系人列  表
          phone = phone.replace(/-|\+86|\s/g,'');
          for(var i = 0;i<list.length;i++){
              var linkObj = {
                  name:list[i].name?(list[i].name).replace(/[^\u4E00-\u9FA50-9a-zA-Z]/g,''):"",
                  phones:list[i].number?(list[i].number).replace(/-|\+86|\s/g,''):""
              };
              phoneBookList.push(linkObj);
          }
          _this.form.phoneBookList=JSON.stringify(phoneBookList)
          if(!nameReg.test(name)){
              _this.$Toast({message: '联系人姓名只能是中文',position:'bottom'});
              return
          }
          if(!telReg.test(phone)&&!fixTelReg.test(phone)){
              _this.$Toast({message: '联系方式格式不正确，请选择正确的手机号',position:'bottom'});
              return
          }
          if(type == 1){
            _this.form.linkmanName1=name
            _this.form.linkmanTel1=phone
          }else if(type == 2){
            _this.form.linkmanName2=name
            _this.form.linkmanTel2=phone
          }
        }
      }, _this.onError, options);
      //cordova调用
    },
    contactCallbackFun(msg){//纯webview方法回调
      var reg = /^[\u4E00-\u9FA5]+$/;
      var phoneBookList = [];
      if(typeof(msg)=="string"){
          try{
              msg=eval('('+msg+')');
          }catch(e){
              console.warn(e)
          }
      }
      if(msg.retCode!="SUCCESS"){
          this.$Toast({message:'获取通讯录失败!',position:'bottom'});
          return
      }
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
                this.$Toast({message:'联系人姓名只能是中文!',position:'bottom'});
                return
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
                this.$Toast({message:'联系人姓名只能是中文!',position:'bottom'});
                return
            }
        }
        if(this.type == 1){
          this.form.linkmanName1=name
          this.form.linkmanTel1=phone
        }else if(this.type == 2){
          this.form.linkmanName2=name
          this.form.linkmanTel2=phone
        }
        this.form.phoneBookList=JSON.stringify(phoneBookList)
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
    },
    selectHandle4(selectedVal, selectedIndex, selectedText) {//与联系人关系2
      this.form.relationShip2=selectedVal[0]
      this.formSelectText.relationShip2Text=selectedText[0]
    },
    getMegIDCardQualitySuccess (msg) {
        if(typeof(msg)=="string"){
            msg=eval('('+msg+')');
        }
        var data=msg.data;
        // alert(data)
        if(typeof(data)=="string"){
            data=eval('('+data+')');
        }
    },
    getMegIDCardQualityError (msg) {
        alert(msg);
    },
    checkInfo(){
      let form = this.form
      if(!this.formSelectText.marriedText){
        this.$Toast({message:'请选择婚姻状况',position:'bottom'})
        return false;
      }
      if(!this.formSelectText.educationText){
        this.$Toast({message:'请选择学历',position:'bottom'})
        return false;
      }
      if(!form.personalEmail){
        this.$Toast({message:'请填写个人邮箱',position:'bottom'})
        return false;
      }else if(!emailReg.test(form.personalEmail)){
        this.$Toast({message: '电子邮箱格式不正确', position:'bottom'})
        return false
      }
      if(!form.companyName) {
        this.$Toast({message: '请填写公司名称', position:'bottom'})
        return false
      }
      if(!form.companyTel) {
        this.$Toast({message: '请填写公司联系电话', position:'bottom'})
        return false
      }else if(!telReg.test(form.companyTel) && !fixTelReg.test(form.companyTel)){
        this.$Toast({message: '单位电话格式不正确，请填写正确的手机号或带区号的固定电话', position:'bottom'})
        return false
      }
      if(!this.form.linkmanTel1){
        this.$Toast({message:'请选择直系亲属联系方式',position:'bottom'})
        return false;
      }
      if(!this.form.linkmanName1){
        this.$Toast({message:'请填写直系亲属姓名',position:'bottom'})
        return false;
      }else if(!nameReg.test(this.form.linkmanName1)){
        this.$Toast({message:'直系亲属姓名只能是中文'})
        return false;
      }
      if(!this.formSelectText.relationShip1Text){
        this.$Toast({message:'请选择直系亲属关系',position:'bottom'})
        return false;
      }
      if(!this.form.linkmanTel2){
        this.$Toast({message:'请选择联系方式',position:'bottom'})
        return false;
      }else if(!nameReg.test(this.form.linkmanName2)){
        this.$Toast({message:'联系人姓名只能是中文'})
      }
      if(this.form.linkmanTel2==this.form.linkmanTel1){
        this.$Toast({message:'联系人联系方式重复',position:'bottom'})
        return false;
      }
      if(!this.formSelectText.relationShip2Text){
        this.$Toast({message:'请选择联系人关系',position:'bottom'})
        return false;
      }
      if(!telReg.test(this.form.linkmanTel1) && !fixTelReg.test(this.form.linkmanTel1)){
        this.$Toast({message:'联系人1联系方式格式不正确！',position:'bottom'})
        return false;
      }
      if(!telReg.test(this.form.linkmanTel2) && !fixTelReg.test(this.form.linkmanTel2)){
        this.$Toast({message:'联系人2联系方式格式不正确！',position:'bottom'})
        return false;
      }
      return true
    },
    //保存个人信息
    savePersonalInfo(){
      let This=this;
      if(!This.checkInfo()){
        return
      }
      This.$ajax('post','/customer/savePersonalInfo',This.form,function(data){
        This.$router.push('/authentication')
      })
    },
    getDict(){//字典项
      this.$ajax('post','/dict/getDictDetailByItemCodes?itemCodes=education,mainLinkMan,otherLinkMan','',function(data){
        column2=data.retData[0]
        column3=data.retData[1]
        column4=data.retData[2]
      })
    },
    getPersonalInfo(){
      let This=this
      This.$ajax('post','/customer/getPersonalInfo?custId='+This.$store.state.custId,'',function(data){
        let customer=data.retData.customer
        let custLinkmanList = data.retData.custLinkmanList.length==0?[{},{}]:data.retData.custLinkmanList
        This.form.married=customer.married//婚否
        This.form.education=customer.education//学历
        This.form.personalEmail=customer.personalEmail//个人邮箱
        This.form.companyName=customer.companyName //公司名
        This.form.companyTel=customer.companyTel //公司电话
        custLinkmanList.forEach(element => {
          if(element.mainSign == '0'){
            This.form.linkmanName1=element.linkmanName//联系人姓名1
            This.form.linkmanTel1=element.linkmanTel//联系人电话1
            This.form.relationShip1=element.relationShip//与联系关系1
          }else if(element.mainSign == '1'){
            This.form.linkmanName2=element.linkmanName// 联系人姓名2
            This.form.linkmanTel2=element.linkmanTel//联系人电话2
            This.form.relationShip2=element.relationShip//与联系关系2
          }
        });
        This.formSelectText.marriedText=customer.married==0?'未婚':customer.married==1?'已婚':''//婚否
        This.formSelectText.educationText=customer.educationhh//学历
        This.formSelectText.relationShip1Text=custLinkmanList[0].relationShiphh//与联系关系1
        This.formSelectText.relationShip2Text=custLinkmanList[1].relationShiphh//与联系关系2
      })
    },
    cancelHandle() {
      // this.$createToast({
      //   type: 'correct',
      //   txt: 'Picker canceled',
      //   time: 1000
      // }).show()
    }
  },
  created(){
    this.getDict()
    this.getPersonalInfo()
  },
  mounted (){
    // this.height=(window.innerHeight-this.$Header)/37.5+'rem'
    this.height=(window.innerHeight-this.$Header-100)+'px'
    this.innerHeight=window.innerHeight
    window['contactCallback'] = (msg) => {
        this.contactCallbackFun(msg)
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
        padding-left 22px
      .text
        flex 7
        position relative
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
  .wrapper
     margin 50px 20px 0
     height 180px
</style>