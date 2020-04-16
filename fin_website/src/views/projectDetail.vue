<template>
  <div class="itemDetail" v-loading="loading">
    <Layout>
      <div slot="main">
        <div class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <span class="fl positionIcon"><i></i>您的当前位置:</span>
            <el-breadcrumb-item>投资理财</el-breadcrumb-item>
            <el-breadcrumb-item>贷款申请</el-breadcrumb-item>
            <el-breadcrumb-item>项目详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content itemInfo clearfix">
          <div class="fl bg-white">
            <div class="title">
              <img src="../../public/img/icon_new.png">
              <span>{{this.$route.query.title}}</span>
            </div>
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="ruleForm" label-width="80px" label-position="right">         
                <el-form-item  prop="amount" class="noLabel">
                     <p><i class="tip"></i>借款金额</p>
                    <el-input v-model="ruleForm.amount" placeholder="请输入借款金额" maxlength="5"></el-input>
                     <span class="unit">元</span>
                </el-form-item>
                   <ul class="uploadUl" v-if="type == 4|| type == 5">
                       <p><i class="tip"></i>企业营业执照上传</p>
                     <li>
                         <el-form-item  class="noLabel" prop="businessLicense">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="action"
                                    :show-file-list="false"
                                      :on-change="(file) => {getFile(file, 'businessLicense')}"
                                      :auto-upload="false"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="ruleForm.businessLicense" :src="ruleForm.businessLicense" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>
                   <div class="IdTip">企业营业执照</div>
                </el-form-item>
                     </li>
                 </ul>            
                 <ul class="uploadUl" v-if="type != 4&&type != 5">
                       <p><i class="tip"></i>身份证上传</p>
                     <li>
                         <el-form-item  class="noLabel" prop="idCardFront">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="action"
                                     :on-change="(file) => {getFile(file, 'idCardFront')}"
                                    :show-file-list="false"   
                                    :auto-upload="false"           
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="ruleForm.idCardFront" :src="ruleForm.idCardFront" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>
                   <div class="IdTip">身份证正面</div>
                </el-form-item>
                     </li>
                       <li>
                         <el-form-item  class="noLabel" prop="idCardBack">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="action"
                                    :show-file-list="false"
                                     :on-change="(file) => {getFile(file, 'idCardBack')}"
                                    :auto-upload="false"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="ruleForm.idCardBack" :src="ruleForm.idCardBack" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            <div class="IdTip">身份证反面</div>
                         </el-form-item>
                     </li>
                 </ul>
                  <p><i class="tip"></i>借款信息</p>
                  <el-form-item  label="借款期限" prop="periods">
                    <el-input v-model="ruleForm.periods" placeholder="请输入借款期限" maxlength="4"></el-input>
                     <span class="unit">月</span>
                </el-form-item>
                 <el-form-item  v-if="type == 4||type == 5"  label="企业名称" prop="companyName">
                    <el-input v-model="ruleForm.businessName" maxlength="20" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                 <el-form-item  label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" maxlength="10" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item  label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm.idCard" maxlength="18" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                 <el-form-item  label="手机号" prop="tel">
                    <el-input v-model="ruleForm.tel" maxlength="11" placeholder="请输入手机号" ></el-input>
                </el-form-item>
                 <el-form-item  label="借款用途" prop="purpose">
                    <el-input v-model="ruleForm.purpose" maxlength="10" placeholder="请输入借款用途"></el-input>
                </el-form-item>
            </el-form>
                <button class="button--primary submitBtn" @click="submitBtn" >确定</button>
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
        action:'',
        type:"",
        loading:false,
        ruleForm:{
            idCardFront:"",
            idCardBack:'',
            businessLicense:''
        },
        rules:{
          amount: [
            { required: true, message: '请输入借款金额', trigger: 'blur' },
            { pattern:/^[1-9][0-9]{0,}$/,message:'请输入合法的借款金额'}
          ],
          periods:[
            { required: true, message: '请输入借款期限', trigger: 'blur' },
            { pattern:/^[1-9][0-9]{0,}$/,message:'请输入合法的借款期限'}

          ],
           name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { pattern:/^[\u4e00-\u9fa5]{2,}$/,message:'请输入正确的姓名'}

          ],
          idCard:[
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'请输入正确的身份证号码'}

          ],
           tel:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '请输入正确的手机号' }
          ],
          purpose:[
            { required: true, message: '请输入借款用途', trigger: 'blur' },
          ],
          idCardFront:[
            { required: true, message: '请输入身份证正面', trigger: 'blur' },
          ],
          idCardBack:[
            { required: true, message: '身份证反面', trigger: 'blur' },
          ],
          businessName:[
            { required: true, message: '请上传企业营业执照', trigger: 'blur' },
          ],
          
        },
        imageUrl:''
    }
  },
  components: {
    Layout
  },
  created(){
    this.type=this.$route.query.type
  },
  methods:{
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    getFile(file,item) {
      this.getBase64(file.raw).then(res => {
        this.base64Upload(res,item)
      });
    },
     base64Upload(base64,item){
       let This=this
          let loading=This.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
          This.$ajax({url:'/oss/base64Upload',data:{base64:base64}}).then((data)=>{
          if(data.status=='200'){
            loading.close()
            if(item ==='idCardBack'){
               This.ruleForm.idCardBack=data.src
            }
            else if(item==='idCardFront'){
                 This.ruleForm.idCardFront=data.src
            }
            else if(item==='businessLicense'){
                 This.ruleForm.businessLicense=data.src
            }
            else {
              

            }
               This.$refs['ruleForm'].validateField(item)
          }
        })
     },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'&& file.type !== 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpg,png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitBtn(){
         this.$refs['ruleForm'].validate((valid) => {
           var params={
              name:this.ruleForm.name,
              type:this.type,
              tel:this.ruleForm.tel,
              idCard:this.ruleForm.idCard,
              amount:this.ruleForm.amount,
              periods:this.ruleForm.periods,
              purpose:this.ruleForm.purpose   
      }
      if(this.type == 1||this.type == 2||this.type == 3){ //个人贷款
        params.idCardFront=this.ruleForm.idCardFront
        params.idCardBack=this.ruleForm.idCardFront
      } else {
        params.businessName=this.ruleForm.businessName;
        params.businessLicense=this.ruleForm.businessLicense;
      }
          if (valid) {
            this.loading=true
            this.$ajax({url:'/custLoanController/apply',data:params}).then((data)=>{
                if(data.status=='200'){
                   this.loading=false
                    this.$message({
                          message: data.response.msg,
                          type: 'success'
                        }); 
                         this.$router.go(-1)        
                  }
                  else {
                     this.loading=false
                     this.$message({
                          message: data.msg,
                          type: 'error'
                        });
                  }
                })
          } else {
            return false;
          }
        });
      }
    }
}
</script>
<style lang="stylus" scoped>
@import "../assets/stylus/btn"
  .breadcrumb
    font-size:14px;
    line-height 45px
    .positionIcon
      margin-right:15px;
      i
        display block
        float left
        width: 20px;
        height: 20px;
        margin-top 13px
        background: url('../../public/img/position.png') no-repeat center;
        background-size cover
        margin-right: 5px;
  .itemInfo
    font-size: 16px;
    box-sizing border-box
    margin-bottom 40px
    .bg-white
        width:100%
      .title
        line-height: 47px;
        padding-left: 15px;
        border-bottom: 1px solid #e2e2e2;
        img
          vertical-align middle
          margin-right 15px
          position relative
          top -3px
.ruleForm{
    margin:50px 50px 0;
    border-bottom:1px solid #E2E2E2;
    padding-bottom:20px;
    .el-form-item{
        position:relative;
        .el-input{
            width:28%;
        }
    }
    p{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        margin:10px 0
    }
}
.noLabel >>> .el-form-item__content{
    margin-left:0 !important; 
}
.tip{
    width:6px;
    height:18px;
    margin-right:5px;
    background:#F45622;
    display:inline-block;
    position: relative;
    top: 3px
}
.unit{
    position:absolute;
    margin-left:5px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 293px;
    height: 180px;
    line-height: 180px;
    text-align: center;
    border:1px solid #E2E2E2;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .IdTip{
      text-align:center;
      font-size:14px;
      color:#333333;
  }
  .uploadUl{
      overflow:hidden;
      li{
          float:left;
          margin-right:30px;
      }
  }
.submitBtn{
    margin:50px;
    width:384px;
    text-align:center;
    cursor pointer
}
/deep/ .el-form-item__label{
    font-size 12px;
}
/deep/ .el-form-item{
margin-bottom 12px;
}
/deep/ .el-form-item__content{
   
/deep/ .el-form-item__error{
display:inline-block;
position:relative;
margin-left:25px;
}
}
</style>