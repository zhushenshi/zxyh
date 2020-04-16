<template>
  <div class="index-list">
    <div slot="content">
      <div class="view-wrapper" :style="{top:top}">
        <div class="index-list-wrapper">
          <cube-index-list :data="cityData" :title="title" @select="selectItem" @title-click="clickTitle"></cube-index-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cityData from '../../common/js/index-list.json'
  export default {
    data() {
      return {
        cityData: [],
        title: '',
        top: 0
      }
    },
    methods: {
      selectItem(item) {
        let from=this.$route.params.from
        setTimeout(()=>{
          this.$router.push({
            name:'ChangeCreditCard',params:{
              bankName:item.name,
              bankCode:item.value,
              from: from
            }})
        },300)
      },
      clickTitle(title) {
        console.log(title)
      },
      data_letter_sort(data, field){
        let letter_reg = /^[A-Z]$/;
        let list = new Array();
        let letter;
        for (let i = 0; i < data.length; i++) {
            // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
            // list['#'] = new Array();
            // 首字母 转 大写英文
            letter = (data[i][field]).substr(0, 1).toUpperCase();
            // 是否 大写 英文 字母
            if (!letter_reg.test(letter)) {
              letter = '#';
            }
            // 创建 字母 分组
            if (!(letter in list)) {
              list[letter] = new Array();
            }
            // 字母 分组 添加 数据
            list[letter].push(data[i]);
        }
        // 转换 格式 进行 排序；
        let resault = new Array();
        for (let key in list) {
          resault.push({
            letter: key,
            list: list[key]
          });
        }
        resault.sort(function (x, y) {
          return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
        });
        // # 号分组 放最后
        let last_arr = resault[0];
        resault.splice(0, 1);
        resault.push(last_arr);
    
        // 转换 数据 格式
        let json_sort = {}
        for (let i = 0; i < resault.length; i++) {
          json_sort[resault[i].letter] = resault[i].list;
        }
        return json_sort;
      }
    },
    mounted(){
      this.top=(this.$Header)/37.5+'rem'
      let data=this.data_letter_sort(this.$parent.$data.banks,'text')
      let resaultList=[]
      for(let key in data){
        let list=[]
        for(let i=0;i<data[key].length;i++){
          list.push({
            "name": data[key][i].text,
            "value": data[key][i].value
          })
        }
        let obj={
          name: key,
          items: list
        }
        resaultList.push(obj)
      }
      this.cityData=resaultList
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.index-list{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  z-index 10
}
.view-wrapper
  position: fixed
  top: 0
  left: 0
  bottom: 0
  width: 100%
  z-index 10;
  background #F7F7F7
  .index-list-wrapper
    height: 100%
    width: 100%
    margin: 0 auto
    overflow: hidden
    text-align left 
</style>
