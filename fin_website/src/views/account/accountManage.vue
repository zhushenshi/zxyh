<template>
  <div >
    <div class="accountManage bg-white">
        <div class="safeTitle">
             <span class="tit">安全中心</span>
        </div>
        <div class="listManage">
            <ul>
                <li>
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已认证</s>
							<s class="tit" style="width: 160px">登录密码</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">登录19理财时需输入的密码</s>
                    <span class="rightP1">
                            <router-link class="goPage" to="/account/editPwd">修改</router-link>
                    </span>
                </li>
                <!-- <li>
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已激活</s>
							<s class="tit" style="width: 160px">新浪电子账户</s>
					</span>
                    <s class="fsGray descA">新浪电子账户已激活，可完成19理财在线的充值和提现功能</s>
                    <span class="rightP1">
                        <a  class="goPage">修改</a>
                    </span>
                </li> -->
                <!-- <li>
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已设置</s>
							<s class="tit" style="width: 160px">新浪电子账户交易密码</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">用于19理财的投资和提现</s>
                    <span class="rightP1">
                        <a  class="goPage">修改</a>
                    </span>
                </li>
                <li>
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已认证</s>
							<s class="tit" style="width: 160px">新浪电子账户绑定手机号码</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">新浪电子账户绑定手机号码</s>
                    <span class="rightP1">
                        <a  class="goPage">修改</a>
                    </span>
                </li> -->
                 <li v-if="binkCardStatus==='1'">
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已绑卡</s>
							<s class="tit" style="width: 160px">更换银行卡</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">用于更换银行卡</s>
                    <span class="rightP1">
                        <a  class="goPage" @click="goPage()">立即更换</a>
                    </span>
                </li>
                 <li v-else>
                    <span class="ico-tit">
							<s class="ico ico_rights"></s>
                            <s class="stu">未绑卡</s>
							<s class="tit" style="width: 160px">绑定银行卡</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">用于绑定银行卡</s>
                    <span class="rightP1">
                        <a  class="goPage" @click="goPage()">立即绑定</a>
                    </span>
                </li>
                 <!-- <li>
                    <span class="ico-tit">
							<s class="ico ico_right"></s>
							<s class="stu">已绑定</s>
							<s class="tit" style="width: 160px">绑定手机</s>
					</span>
                    <s class="fsGray descA" style="width: 200px">159****5555</s>
                    <span class="rightP1">
                          <router-link class="goPage" to="/account/changeMobile">修改</router-link>
                    </span>
                </li> -->
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        binkCardStatus:''
    }
  },
  created(){
         let loading=this.$loading({text:'正在加载',background:'rgba(0,0,0,0.5)',spinner:'el-icon-loading'})
     this.$ajax({url:'/account/security',method:'get'}).then((res)=>{
           loading.close()
                this.binkCardStatus=res.binkCardStatus
                console.log(this.binkCardStatus)
	})
  },
  methods: {
      goPage(){
          this.$router.push({ path: '/account/bindCard' })
      },
      //账户安全
        security(){
            this.$ajax({url:'/account/security',method:"get"}).then((data)=>{
                if(data.status=="200"){
                    // this.security=data
                } 
                }
            )
    },
  }
}
</script>
<style lang="stylus" scoped> 
  .accountManage
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;  
    .safeTitle
        margin: 20px 40px;
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
    .listManage
        margin: auto 40px; 
        padding-bottom: 30px;
        li
          border-bottom: 1px dashed #e2e2e2;
          height: 58px;
          line-height: 58px;
          overflow: hidden;
          s
           text-decoration:none
          .ico-tit
              float: left;
              .ico
                    width: 22px;
                    height: 22px;
                    background-image: url(./../../assets/imgs/account_icons.png);
                    margin-right: 5px;
                    position: relative;
                    top: 18px;
                    float: left;
              .ico_right 
                    background-position: -239px -44px;
             .ico_rights
                    background-position: -262px -44px;
              .stu
                    font-size: 14px;
                    color: #353535;
                    margin-right: 25px;
                    float: left;
              .tit
                    color: #353535;
                    font-size: 14px;
                    font-weight: bold;
                    float: left;
           .fsGray
               color: #666;
           .descA
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
               float: left;
           .rightP1
               float: right;
               margin-right 10px;
               overflow: hidden;
               .goPage
                    color: #3d8cdb;
                    font-size: 14px;
                    cursor pointer
</style>