<template>
  <div>
    <Layout>
      <div slot="main" class="main">
        <div class="topPic"></div>
        <div class="block_inv">
          <p class="blockHd"></p>
        </div>
        <div class="blockBd">
          <div class="mainPart_s1">
            <p class="w1"></p>
            <div class="qrcodes">
              <img src="./../assets/code.png" v-if="!downloadData.url"/>
              <vue-qr v-else :text="downloadData.url" :logoScale="0.2"  :dotScale="1"  :size="400" :callback="callBack"></vue-qr>
            </div>
            <p class="w2"></p>
            <div class="shareWords mb15">现在注册19理财即可获得2018元投资红包，邀请奖励、投资佣金累计无上限，年化收益最高可达11.9%，赶快行动起来吧！ www.19licai.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <font color="orange">(请勿复制此段文字；请点击右下角"复制链接"按钮)</font>
            </div>
            <div class="copyBtn">
                  <button class="button--primary btn" style="width:167px;"  @click="dialogVisible = true">复制链接</button>
            </div>
            <div class="shareWrap">
              <ul>
                <li>
                    <span class="titAA0">分享好友：</span>
                </li>
                <li  @click="qqHref">                 
                      <p class="qq"></p>
                      <p class="shareName">QQ</p>
                </li>
                <li @click="qqRoom">
                     <p class="qqroom"></p>
                     <p class="shareName">QQ空间</p>
                </li>
              </ul>
						</div>
          </div>
              <p class="blockBot"></p>
        </div>
        <div class="shareRules">
          <img src="./../assets/demo.png"/>
        </div>
        <div class="sharebottom">
        </div>
        <el-dialog title="复制链接成功" :visible.sync="dialogVisible" width="64%">
          <span><i class="dialogTip">连接url为</i>：{{url}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="button--primary" @click="copy" style="width:100px">确 定</el-button>
          </span>
       </el-dialog>
      </div>
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
import vueQr from 'vue-qr'
let title="注册送豪礼，邀请奖励、投资佣金无上限！" //分享的标题
let pics="http://m.19licai.com/favicon.jpg" //你的分享图片地址
let rLink="" //你的分享地址
let desc= "现在注册19理财即可获得2018元投资红包，邀请奖励、投资佣金累计无上限，年化收益最高可达11.9%，赶快行动起来吧！ www.19licai.com" //你的分享描述
export default {
  data(){
    return {
      couid:'',
      name: 'viewActivity',
       dialogVisible: false,
       url:"http://www.baidu.com",
       downloadData: {
                url: '"http://www.baidu.com',
         },
         imgBase64:""

    }
  },
  created(){
    this.getData()
  },
  methods:{
    callBack(dataURL){
			this.imgBase64=dataURL
		},	
    getData(){
         this.$ajax({url:'/account/getmyid',method:'get'}).then((data)=>{
            if(data.status == '200'){
              this.couid=data.uid
              rLink="http://www.baidu.com?name="+data.name+'&couid='+data.uid 
                  this.downloadData.url=location.origin+location.pathname+'http://192.168.102.119:8666/wx/dist/#/sharereg?name='+data.name+'&couid='+data.uid   
            }
        })
    },
     openWindow(shareUrl,titleName,descName,picName,urlName){
       console.log(picName)
            var left = window.screen.width / 2 - 420
            window.open(shareUrl+'?'+descName+'='+encodeURIComponent(desc)+'&'+urlName+'='+encodeURIComponent(rLink)+'&'+'&'+picName+'='+
            encodeURIComponent(pics)+'&'+titleName+'='+encodeURIComponent(title),'','scrollbars=no,width=800,height=600,toolbar=no,resizable=no, location=no,left='+ left +',status=no,top=200' );
      },
      //分享qq
    qqHref(){
     let qqUrl="http://connect.qq.com/widget/shareqq/index.html"
     this.openWindow(qqUrl,"title","summary","pics","url")
    },
    //分享qq空间
    qqRoom(){
      let QzoneUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
       this.openWindow(QzoneUrl,"title","summary","pics","url")
      },
      //复制
     copy(){
      var input = document.createElement("input");     // 直接构建input
          input.value =this.url+'&'+this.couid;   // 设置内容
          document.body.appendChild(input);        // 添加临时实例
          input.select();      // 选择实例内容
          document.execCommand("Copy");     // 执行复制
          document.body.removeChild(input);  // 删除临时实例
         this.$message({
          message: '复制成功',
          type: 'success'
        });
          this.dialogVisible=false
      },
  },
  components: {
    Layout,
    vueQr
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/stylus/btn"
.main
    background: #fbefb5;
    font-size: 14px;
    color: #343434;
    .topPic
        height: 452px;
        background: url(./../assets/page.png) center no-repeat;
    .blockHd
        height 80px
        background: url(./../assets/block_hd_xx1.jpg) center no-repeat;
    .blockBd
        padding-top: 30px;
        overflow: hidden;
        background: url(./../assets/block_bg_xx0.jpg) center repeat-y;
        .mainPart_s1
          width: 795px;
          margin: auto;
          overflow: hidden;
          .w1
              width: 100%;
              height: 50px;
              background: url(./../assets/w1.png) no-repeat 0 0;
              background-size: 100% 100%; 
          .qrcodes
              margin-top 40px
              text-align center
          .w2
              width: 100%;
              height: 50px;
              background: url(./../assets/w2.png) no-repeat 0 0;
              background-size: 100% 100%;  
              margin-top 20px
          .shareWords
              display: block;
              margin: auto;
              width: 723px;
              height: 56px;
              padding: 20px 36px;
              font-size: 15px;
              background: url(../assets/t_area_bg.jpg) no-repeat;
              resize: none;
              border: none;
              overflow: hidden;
              color: #595959;
              line-height: 26px; 
              margin-top 20px;             
          .copyBtn
              text-align right 
              margin-top 15px
              .btn
                  width: 167px;
                  color: #fff;
                  text-align: center;
          .shareWrap
              margin-top 20px
              .titAA0
                  height: 60px;
                  line-height: 60px;
                  width: 98px;
              ul
                overflow hidden
                li
                  float left
                  margin-right:30px
                  cursor pointer
                  .qq
                    width: 60px;
                    height: 60px;
                    background-image: url(../assets/share_icon.png);
                  .qqroom
                    width: 60px;
                    height: 60px;
                    background-position: -211px 0;
                    background-image: url(../assets/share_icon.png);
                  p
                    text-align center
                  .shareName
                    margin-top 20px           
       .blockBot
               height 27px;
               background: url(./../assets/block_bottom_xx0.jpg) center  no-repeat;
.shareRules
  text-align center
  img 
    width: 896px;
.sharebottom
    background: url(./../assets/p_foot_xxxb.jpg)  no-repeat bottom;
    height: 192px;
>>>.el-dialog__body,>>>.el-dialog__footer
    text-align center
.dialogTip
    font-weight bold
</style>