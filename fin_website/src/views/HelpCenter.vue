<template>
  <div class="helpCenter">
    <Layout>
      <div slot="main">
        <div class="wrapper">
          <div><img src="../../public/img/helpCenterBanner.jpg" alt=""></div>
          <div class="content text-center">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
              <span class="fl positionIcon"><i></i>您的当前位置：</span>
              <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="helpInfo">
             <ul>
               <li>
                 <p class="helpLine">
                   <span class="l_icon l_icon1"></span>
                   <span class="tip">我要投资</span>
                   </p>
                   <p class="helpCnt">
                     <a>登录注册</a>
                     <a>投资操作步骤</a>
                   </p>
               </li>
               <li>
                  <p class="helpLine">
                   <span class="l_icon l_icon2"></span>
                   <span class="tip">我的账户</span>
                 </p>
                  <p class="helpCnt">
                     <a>红包加息券</a>
                     <a>充值提现</a>
                   </p>
               </li>            
               <li>
                  <p class="helpLine">
                   <span class="l_icon l_icon3"></span>
                   <span class="tip">常见问题</span>
                 </p>
                  <p class="helpCnt">
                     <a>解绑银行卡</a>
                     <a>修改新浪账户支付密码</a>
                     <a>收费标准</a>
                     <a>查看电子合同</a>
                     <a>登录密码找回</a>
                   </p>
                 </li>
             </ul>
            </div>
             <div class="search">
               <el-input placeholder="请输入搜索关键字" v-model="search" @input="changeInput" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
              </el-input>
              <div class="searchDiv">
                <span>热门搜索标签：</span>
                <ul>
                  <li class="first" @click="searchName('充值')">充值</li>
                  <li @click="searchName('提现')">提现</li>
                  <li @click="searchName('费用')">费用</li>
                  <li @click="searchName('投资')">投资</li>
                </ul>
              </div>
               <!-- 搜索前的 -->
                <div>
                 <ul>
                    <li v-for="(item,index) in searchData" :key='index'>
                    <span v-html="item.contact_name"></span>
                  </li>
                 </ul>
                </div>
                  <div v-if="searchData.length == 0 && search !=''">
                   抱歉，没有搜索到您想要的结果
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
export default {
  data(){
    return {
       search: "",
      // 原本展示数据
      list: [
          {contact_name:"充值"},
          {contact_name:"提现56555"},
          {contact_name:"费用"}
      ],
      // 搜索后的展示数据
      searchData: [],
    }
  },
  components: {
    Layout,
  },
   created() {
    // 获取的接口数据
  },
  methods: {
    Search() {
      // search 是 v-model="search" 的 search
      this.searchData=[]
      var search = this.search;
      if (search) {
        this.searchData = this.list.filter(function(product) {
          // 每一项数据
          return Object.keys(product).some(function(key) {
            // 每一项数据的参数名
            return (
              String(product[key])
                // toLowerCase() 方法用于把字符串转换为小写。
                .toLowerCase()
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                .indexOf(search) > -1
            );
          });
        });
      }
       this.changeColor(this.searchData)
    },
    searchName(name){
      this.search=name
      this.Search()
    },
    changeInput(){
        this.searchData = []
    },
    //搜索内容高亮显示
    changeColor (resultsList) {
      resultsList.map((item, index) => {
        if (this.search && this.search.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.search, 'g')
          // 高亮替换v-html值
          let replaceString ='<span class="search-text" style="color:red">' + this.search + '</span>'
          resultsList[index].contact_name = item.contact_name.replace(
            replaceReg,
            replaceString
          )
        }
      })
      this.searchData = []
      this.searchData = resultsList
    }
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding-bottom 50px
 .breadcrumb
    font-size:16px;
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
.helpInfo
    text-align center
    background #ffffff
    padding: 33px 25px 70px 25px
    border: 1px solid #e2e2e2;
    margin-bottom:10px;
    ul
      overflow: hidden;
      display flex
      li
        flex 1
        width: 275px;
        height: 158px;
        background: #f8f8f8;
        padding: 15px;
        color: #4a4a4b
        margin 0 20px;
        text-align left
        p
          font-size 16px
          padding-bottom: 8px;
          .tip
            position relative
            top -22px
        .helpLine
          border-bottom: 1px dashed #cccccc;
        .l_icon
          width: 57px;
          height: 57px;
          display inline-block;
          margin-right: 14px;
        .l_icon1
          background: url(../assets/iconB_01.png) no-repeat;
        .l_icon2
          background: url(../assets/iconB_02.png) no-repeat;
        .l_icon3
          background: url(../assets/iconB_01.png) no-repeat;
        .helpCnt
          padding-top: 30px;
          white-space: nowrap;
          font-size: 15px;
          overflow: hidden;
          a 
            width 27%
            float left
            font-size 14px
            margin-right 20px
.search
    text-align center
    background #ffffff
    padding: 33px 25px 70px 25px
    border: 1px solid #e2e2e2;
    margin-bottom:10px;
    color: #4f4f4f;
  .el-input-group
    width 45%
  .searchDiv
    margin 20px 0
    font-size 14px
    width 82%
    ul
      display inline-flex
      overflow hidden
      li
        cursor pointer
        float left
        border-left: 1px solid #999
        width 52px
      .first
        border-left: 0px;
.search-text{
  color red
}
</style>
