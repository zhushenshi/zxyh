import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
const mutations = {
  token(state, newToken) {
		state.token = newToken
  },
  tabPage(state, newTabPage) {
		state.tabPage = newTabPage
  },
  tel(state, newTel) {
		state.tel = newTel
  },
  custId(state, newToken) {
    state.custId = newToken
  },
  amount(state, newAmount) {
    state.amount = newAmount
  },
  userId(state, newVal) {
    state.userId = newVal
  },
  userAccount(state, newVal) {
    state.userAccount = newVal
  },
  userIdentity(state, newVal) {
    state.userIdentity = newVal
  },
  userBankSstatus(state, newVal) {
    state.userBankSstatus = newVal
  },
  userCash(state, newVal) {
    state.userCash = newVal
  },
  periods_id(state, newVal){
    state.periods_id = newVal
  },
  product_id(state, newVal){
    state.product_id = newVal
  },
  loan_no(state, newVal){
    state.loan_no = newVal
  },
  repayCodeFlag(state, newVal){
    state.repayCodeFlag = newVal
  },
  cusTrailPhoneState(state, newVal){
    state.cusTrailPhoneState = newVal
  },
  productType(state, newVal){
    state.productType = newVal
  },
  loanId(state, newVal){
    state.loanId = newVal
  },
  repayIds(state, newVal){
    state.repayIds = newVal
  },
  repayType(state, newVal){
    state.repayType = newVal
  }
}
const store = new Vuex.Store({
  state: {
    token:'',  //TOKEN
    tabPage:'首页',
    tel:'',
    custId:'',
    amount:'',
    userId: '',
    userAccount: '',
    userIdentity: '',
    userBankSstatus: '',
    userCash: '',
    product_id: '',
    periods_id: '',
    loan_no: '',
    repayCodeFlag:false,//是否 生成还款码页面返回的
    cusTrailPhoneState: '',
    productType: 0,
    loanId: '',
    repayIds: '',
    repayType:''
  },
  mutations,
  plugins: debug ? [createLogger(), createPersistedState({
    key: "vuex",
    storage: window.sessionStorage
  })] : [createPersistedState({
    key: "vuex",
    storage: window.sessionStorage
  })]
})

export default store
