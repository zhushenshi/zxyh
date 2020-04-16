<template>
  <div >
    <div class="accountManage bg-white">
       <div v-for="(item,index) in testData" :key="index" class="contentItems">
          <p class="title">{{index+1+"."+item.content}}</p>
          <div class="option" v-for="(val, key, i) in options[index]" :key="i" @click="select(index,i)">
            <div class="optionBox">
              <div :class="{optionImgRight:i==answer[index]}"></div>
              <p :class="{sleectedColor:i==answer[index]}">{{key+"."+val.name}}</p>
            </div>
          </div>
        </div>
       <div class="btns">
          <button  @click="checkResult" :disabled="!buttonUseable" :class="{disabled:!buttonUseable}">开始评估</button>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        imgUrl:"../../../assets/images/settings/Group@2x.png" ,
        aSelected:false,
        testData:'',
        options:'',
        answer:[],
        buttonUseable:false
    }
  },
  created(){
    this.getData()
      // this.$ajax({url:'/account/isriskassess',method:"get"}).then((data)=>{
      //         if(data.results===1){
      //             this.$router.push({ path: '/account/assessResult' })  
      //         }
              
      //   })
  },
   beforeRouteEnter(to, from, next) {
   next(vm=>{        //  这里的vm指的就是vue实例，可以用来当做this使用 
   console.log(from)
    if(from.fullPath==="/account/assessResult"){
       vm.$router.push({ path: '/account/assess' })  
    }
    else{
       vm.$ajax({url:'/account/isriskassess',method:"get"}).then((data)=>{
              if(data.results===1){
                  vm.$router.push({ path: '/account/assessResult' })  
              }
              
        })
    }
    })
  },
 updated (){
        let res=true;
        for(let i=0;i<this.answer.length;i++){
        let val=false;
        if(this.answer[i]==null){
          val=false
        }else{val=true};
        res=res&&val;
        }
        this.buttonUseable=res;
    },
  methods: {
      //账户安全
        getData(){
           let assess=this;
            this.$ajax({url:'/account/queryEvaluations',method:"get"}).then((data)=>{
                if(data.status=="200"){
                     assess.testData=data.list;
                    let newOptions=[];
                    for(let i=0;i<data.list.length;i++){
                      let string=data.list[i].options.replace(/'/g,'"').replace(/\s+/g,'');
                      newOptions.push(JSON.parse(string));
                    }
                    assess.options=newOptions;
                    assess.answer.length=newOptions.length;
                } 
                }
            )
    },
    checkResult(){
        //计算分数
//        console.log(this.options);
        var res=0,key=null;
        for(let i=0;i<this.answer.length;i++){
          switch (this.answer[i]){
            case 0 :key="A";break;
            case 1 :key="B";break;
            case 2 :key="C";break;
            case 3 :key="D";break;
            case 4 :key="E";break;
            case 5 :key="F";break;
            default:key="G";
          }
          res+=this.options[i][key].value;
        }
//        console.log(res);
        let that=this;
            this.$ajax({url:'/account/riskassess',method:"get",params:{score:res}}).then((data)=>{
                  that.$router.push('/account/assessResult');
        });
      },
      select(index,i){
//        index:第几题
//        i:选项
        this.$set(this.answer,index,i);
      },
      handleClick(index){
        for(var i=0;i<this.test[index].answer.length;i++){
          this.test[index].answer[i]=false;
        }
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
.option{position:relative;margin:10px 0;cursor pointer}
  .option .optionBox{display:flex;}
  .option .optionBox div{width:27px;margin-left:-5px;margin-top:5px;
    background-image: url('../../assets/unDemo.png');background-size:16px 16px;background-repeat:no-repeat;}
  .option .optionBox .optionImgRight{background-image: url('../../assets/check.png')}
  .option .optionBox p{font-size: 14px;color: #3A3A3A;letter-spacing: 0.43px;line-height: 22px;flex:1;}
  .option .optionBox p.sleectedColor{color:#FA7009;}
  div{text-align:left;}
  button{
    border none
    width:242px;height:50px;background:#FA7009;font-size:18px;color:#fff;}
  button.disabled{background-color:#ccc;}
   .contentItems{padding: 20px}
  P.title{
    font-size: 14px;
    color: #313131;
    letter-spacing: 0.43px;
    line-height: 22px;
    font-weight:500;
  }
.btns{
  text-align center
  margin: 20px auto;
}
</style>