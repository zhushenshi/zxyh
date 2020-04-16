<template>
  <div class="main">
    <MyHeader :title="'风险评估'" v-if="!isWeixin"></MyHeader>
    <div class="scroll-wrapper borderTop" ref="scrollWrapper">
      <div class="content">
        <div v-for="(item,index) in testData" :key="index" class="contentItems">
          <p class="title">{{index+1+"."+item.content}}</p>
          <div class="option" v-for="(val, key, i) in options[index]" :key="i" @click="select(index,i)">
            <div class="optionBox">
              <!--{{key+val.name+i}}-->
              <div :class="{optionImgRight:i==answer[index]}"></div>
              <p :class="{sleectedColor:i==answer[index]}">{{key+"."+val.name}}</p>
            </div>
            <!--<input type="checkbox" name="a" v-model="item.answer[i]" @click="handleClick(index)">-->
          </div>
        </div>
        <button  @click="checkResult" :disabled="!buttonUseable" :class="{disabled:!buttonUseable}">查看评估结果</button>
        <div class="height64" v-if="!isWeixin"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {baseURL} from '@/vuex/url'
  export default {
    name: 'Assess',
    created () {
      let assess=this;
      this.$ajax('get',baseURL + '/account/queryEvaluations/','', function (data) {
        //测评题目以及题目选项对应分值
//        console.log(data.list);
        assess.testData=data.list;
        let newOptions=[];
        for(let i=0;i<data.list.length;i++){
          let string=data.list[i].options.replace(/'/g,'"').replace(/\s+/g,'');
          newOptions.push(JSON.parse(string));
        }
        assess.options=newOptions;
        assess.answer.length=newOptions.length;
      })
    },
    mounted () {
      this.$nextTick(() => {
        new BScroll(this.$refs.scrollWrapper, {click: true})
      });
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

    data() {
      return {
        imgUrl:"../../../assets/images/settings/Group@2x.png" ,
        aSelected:false,
        testData:'',
        options:'',
        answer:[],
        buttonUseable:false
      }
    },
    methods:{
      select(index,i){
//        index:第几题
//        i:选项
        this.$set(this.answer,index,i);
      },
      handleClick(index){
//        console.log(index);
        for(var i=0;i<this.test[index].answer.length;i++){
          this.test[index].answer[i]=false;
        }
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
//          console.log(this.options[i]);
          res+=this.options[i][key].value;
        }
//        console.log(res);
        let that=this;
        this.$ajax('get',baseURL +'/account/riskassess/?score='+res,'',function (data) {
//         console.log(data);
          that.$router.push('/home/accountTab/settings/assessResult');
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{position: fixed;top:0;left: 0;right: 0;bottom:0;}
  .scroll-wrapper{height: 100%;overflow:hidden;}
  .contentItems{padding: 20px}
  P.title{
    font-size: 14px;
    color: #313131;
    letter-spacing: 0.43px;
    line-height: 22px;
    font-weight:500;
  }
  .option{position:relative;margin:10px 0;}
  .option .optionBox{display:flex;}
  .option .optionBox div{width:27px;margin-left:-5px;margin-top:5px;
    background-image: url('../../../assets/images/settings/Group@2x.png');background-size:16px 16px;background-repeat:no-repeat;}
  .option .optionBox .optionImgRight{background-image: url('../../../assets/images/settings/Shape@2x.png')}
  .option .optionBox p{font-size: 14px;color: #3A3A3A;letter-spacing: 0.43px;line-height: 22px;flex:1;}
  .option .optionBox p.sleectedColor{color:#FA7009;}
  div{text-align:left;}
  /*.option input{display:block;position:absolute;width:100%;height:100%;top:0;opacity:0;}*/
  button{width:100%;height:50px;background:#FA7009;font-size:18px;color:#fff;}
  button.disabled{background-color:#ccc;}
  .height64{height:64px;}
</style>
