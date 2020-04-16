export const mixin = {
  data() {
    return {
    }
  },
  methods: {
    goPage:function(path='',query='',params=''){
      this.$router.push({path,query,params})
    }
  },
  created() {
  },
  computed: {
    isLogin () {
      return this.$store.state.token?true:false
    }
  }  
}