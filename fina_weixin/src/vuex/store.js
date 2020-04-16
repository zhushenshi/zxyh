import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const mutations = {
	addToken(state, newToken) {
		state.token = newToken;
		sessionStorage.setItem("token",state.token);
	},
	productId(state, newId) {
		state.productId = newId;
	},
	amount(state, newAmount) {
		state.amount = newAmount;
	},
	tempOrderID(state, newTempOrderID){
		state.tempOrderID = newTempOrderID;
	},
	currentRouterPath(state, newCurrentRouterPath){
		state.currentRouterPath = newCurrentRouterPath;
	},
	borrowType(state, newBorrowType){
		state.borrowType = newBorrowType;
	},
	avatar(state, newAvatar){
		state.avatar = newAvatar;
	},
	userName(state, newUserName){
		state.userName = newUserName;
	},
	gesturePwdState(state,newGesturePwdState){
		state.gesturePwdState=newGesturePwdState
	},
	loginName(state,loginName){
		state.loginName=loginName
	},
	loginPwd(state,loginPwd){
		state.loginPwd=loginPwd
	},
	is_current(state,new_is_current){
		state.is_current=new_is_current
	}
}
const store = new Vuex.Store({
  state: {
    showTab: false,
    token:'',
    productId:'',//产品ID
    amount:'',//用户输入的购买金额
    tempOrderID:'',//临时订单ID
    currentRouterPath:'/home/current',//当前路由路径,默认为/home/current
		borrowType:'',
		avatar:'',//头像
		userName:'',
		gesturePwdState:true,//手势密码设置标志
		loginName:'',//登录信息用户名
		loginPwd:'',//登录信息密码
		is_current:'0',//是否是特殊标的  1特殊标的
  },
  mutations
})

export default store
