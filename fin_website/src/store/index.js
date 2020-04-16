import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({

  storage: window.localStorage

})
Vue.use(Vuex)
const mutations = {
	token(state, newToken) {
		state.token = newToken;
	},
	productId(state, newId) {
		state.productId = newId;
	},
	tempOrderID(state, newTempOrderID){
		state.tempOrderID = newTempOrderID;
  },
	isBindCard(state, val){
		state.isBindCard = val;
  },
  custName(state, nCustName){
		state.custName = nCustName;
  },
}
export default new Vuex.Store({
  state: {
    token:'',
    productId:'',//产品ID
    tempOrderID:'',//临时订单ID
    isBindCard:false,//是否已经绑卡
    custName:'',
  },
  mutations,
  actions: {
  },
  modules: {
  },
  plugins:[vuexLocal.plugin]
})
