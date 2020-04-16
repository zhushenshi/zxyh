<template>
  <div class="securityView">
    <mt-cell  title="标题文字" @click.native="chagePage('/home/accountTab/security/modifyPassword')">
      <span>{{status.loginPassword==false?'未设置':'已设置'}}</span>&nbsp;&nbsp;<span class="icon-more"></span>
      <div slot="title">
        <span>修改登录密码</span>
      </div>
    </mt-cell>
    <mt-cell title="标题文字" @click.native="chagePage('/home/accountTab/security/modifyPhone')">
      <span>{{status.phoneSet==false?'未绑定':'已绑定'}}</span>&nbsp;&nbsp;<span class="icon-more"></span>
      <div slot="title">
        <span>修改绑定手机</span>
      </div>
    </mt-cell>
    <mt-cell title="标题文字" @click.native="chagePage('/home/accountTab/security/activeSina',status.paymentAccount)">
      <span>{{status.paymentAccount==false?'未激活':'已激活'}}</span>&nbsp;&nbsp;<span class="icon-more"></span>
      <div slot="title">
        <span>新浪支付账户激活</span>
        <img  v-if="!status.paymentAccount" src="../../../assets/images/Shape2@3x.png" width="14" height="14">
      </div>
    </mt-cell>
    <mt-cell title="标题文字"  @click.native="openfn" v-if="status.paymentPasswordSet" >
      <span>{{status.paymentPasswordSet==false?'未设置':'已设置'}}</span>&nbsp;&nbsp;<span class="icon-more"></span>
      <div slot="title">
        <span>新浪支付账户交易密码</span>
        <img  v-if="!status.paymentPasswordSet" src="../../../assets/images/Shape2@3x.png" width="14" height="14">
      </div>
    </mt-cell>
    <router-view class="pageView" ></router-view>
    <home-tab></home-tab>
  </div>
</template>

<script>
 import {baseURL} from '../../../vuex/url.js'
 import HomeTab from '@/components/home/HomeTab.vue'
  export default {
    name: 'security',
    data() {
      return {
        status:{loginPassword:false,phoneSet:false,paymentAccount:false,paymentPasswordSet:false},
        openurl:''
      }
    },
    methods:{
      chagePage (url,status) {
        if(url=='/home/accountTab/security/activeSina' &&status){
                this.$Toast({
            message: '当前版本不支持，请升级至最新版本',
            position: 'bottom'
          })
          return
        }
        this.$router.push(url)
      },
      getstatus(){
       
          this.$ajax(
							'get',
							baseURL+'/account/security',
							'',
							function(data){
                this.status.loginPassword=data.setPass==1?true:false
                this.status.phoneSet=data.setphone==1?true:false
                this.status.paymentAccount=data.activeSinaPay==1?true:false
                this.status.paymentPasswordSet=data.setSinaPass==1?true:false;
                if(data.setSinaPass==1){
                    this.getpwdurl();
                }
								console.log(data)
							}.bind(this)

				)

      },
      getpwdurl(){
          this.$ajax(
							'post',
							baseURL+'/account/setsinapass',
							'',
							function(data){
                this.openurl=data.redirection;
							}.bind(this)

				)


      },
      openfn(){
         if(!this.status.paymentAccount){       
            this.$Toast({
            message: '请先激活账户',
            position: 'bottom'
          })
          return
        }
        window.open(this.openurl)
      }

    },
    created(){
      this.getstatus();
    },
    components: {
      HomeTab
    }
  }
</script>

<style>
  .securityView{background:#FFFFFF;}
  .securityView .mint-cell{background-image:none;width:100%;margin:0 auto;height:50px;padding:0 10px;border-bottom: 1px solid #ececec;}
  a:hover {
    color: #333333;
  }
  .securityView .mint-cell-wrapper{background-image:none;padding:0;font-size: 14px;color: #333333;letter-spacing: 1px;}
  .mint-cell-wrapper div{margin-top:5px;}
  .mint-cell-value{color:#B0B0B0}
  .mint-cell-title div{padding:10px;}
</style>
