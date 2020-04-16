<template>
  <div >
    <div class="accountManage bg-white">
        <h2>投资者网贷风险评测结果告知涵：</h2>
        <div class="resultTitle">
            <p>尊敬的客户:</p>
            <p>根据您填写的风险能力评估，本公司对您的风险承受能力进行了评估，评估结果如下:</p>
            </div>
            <div class="box">
            <div class="assessResult">
                <div>
                    <span class="score">{{score}}分</span>
                    <p>投资测试得分</p>
                </div>
                <div>
                    <span>
                        {{getStatus(score)}}
                    </span>
                    <p>投资测试评级</p>
                </div>
                <div>
                    <span>房贷</span>
                    <p>推荐投资的产品</p>
                </div>
            </div>
            <p class="recommand">您的投资测试为{{getStatus(score)}}，推荐房贷项目</p>
            <div class="buttonBox">
                <button class="button--principal" @click="goIntoPage('/account/assess')">重新测评</button>
                <button class="button--principal" @click="goIntoPage('/investment')">立即投资</button>
            </div>
            </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        score:""
    }
  },
  created(){
   this.getScore()
    //  this.$ajax({url:'/account/isriskassess',method:"get"}).then((data)=>{
    //           if(data.results==0){
    //               this.$router.push({ path: '/account/assess' })  
    //           }
              
    //     })
  },
  methods: {
      //账户安全
        getScore(){
            this.$ajax({url:'/account/riskassessresults',method:"get"}).then((data)=>{
                if(data.status=="200"){
                    this.score=data.score;
                } 
                }
            )
    },
     goIntoPage (url) {
        this.$router.push(url)
      },
      getStatus(score){
          if(score>=86 && score<=100){
              return '进取型'
          }
          else if(score>70 && score<=85){
              return '平衡型'
          }
          else if(score>=60 && score<=70){
              return '稳健型'
          }
          else if(score<=60){
              return '谨慎型'
          }
      }
  }
}
</script>
<style lang="stylus" scoped> 
@import "../../assets/stylus/btn"
  .accountManage
    width: 100%;
    min-height: 600px;
    float: right;
    border: 1px solid #e2e2e2;
    background: #fff;
    line-height: 25px;
    color: #666666;
    padding 30px
    h2  
        font-size 20px
        color: #404040;
        text-align: center;
        font-weight: normal 
.resultTitle{width:92%;margin:20px auto 40px;}
.resultTitle p{color:#666666}
  .box{width:88%;margin:0 auto;}
  .box .assessResult{display:flex;justify-content:space-around;text-align:center;}
  .box .recommand{text-align:center;margin:50px 0}
  .box .buttonBox{text-align:center;margin:18px 0 40px 0;display:flex;justify-content:space-between;text-align:center;font-size: 16px;letter-spacing: 1.66px;}
  .box .buttonBox :first-child{
      border:1px solid #ff6461;
      width:40%;
      height:44px;
      border-radius:5px;
      background-color: #fff;
      color: #ff6461;}
  .box .buttonBox :last-child{
      width:40%;
      height:44px;
      border-radius:5px;
      background-color: #ff6461;
      color: #fff;}
  .box .assessResult div span{
      display inline-block
      background: linear-gradient(to bottom,#ff8684,#ffab6d);
      width:150px;
      line-height:98px;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0.75px;
      border-radius: 10px 10px 0 0;
      }
.box .assessResult div p{
    padding 20px 0
    font-size 16px

}
.box .assessResult div {
  border-radius:10px;
  box-shadow: 0 4px 7px rgba(68,68,68,0.21);   
}
  .box .assessResult div .score{font-size:30px;}
</style>