import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Comm/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Comm/Register.vue'),
  },
   {
    path: '/registerProtocol',
    name: 'registerProtocol',
    component: () => import('../views/Comm/registerProtocol.vue'),
  },
  {
    path: '/findPassword',
    name: 'findPassword',
    component: () => import('../views/Comm/findPassword.vue'),
  },
  {
    path: '/newguide',
    name: 'newguide',
    component: () => import('../views/Newguide.vue'),
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    component: () => import('../views/HelpCenter.vue'),
  },
  {
    path: '/itemDetail',
    name: 'itemDetail',
    component: () => import('../views/ItemDetail.vue'),//项目详情
  },
  {//投资理财
    path: '/investment',
    name: 'investment',
    component: () => import('../views/Investment.vue'),
  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: () => import('../views/projectDetail.vue'),//项目详情
  },
  {//邀请活动页面
      path:'/viewActivity',
      name:'viewActivity',
      component: () => import('../views/viewActivity.vue')
  },
  {//我的账户
    path: '/account',
    name: 'account',
    redirect: '/account/myAccount',
    component: () => import('../views/Account.vue'),
    children:[
      {
        path:'myAccount',
        name:'MyAccount',
        component: () => import('../views/account/MyAccount.vue')
      },
      {
        path:'assessResult',
        name:'assessResult',
        component: () => import('../views/account/assessResult.vue')
      },
      {
        path:'assess',
        name:'assess',
        component: () => import('../views/account/assess.vue')
      },
      {
        path:'myLoan',
        name:'myLoan',
        component: () => import('../views/account/myLoan.vue')
      },
      {
        path:'myInvestment',
        name:'MyInvestment',
        component: () => import('../views/account/MyInvestment.vue')
      },
      {//账户管理
        path:'accountManage',
        name:'accountManage',
        component: () => import('../views/account/accountManage.vue')
      },
      {//修改登录密码
        path:'editPwd',
        name:'editPwd',
        component: () => import('../views/account/editPwd.vue')
      },
      {
        path:'myMessage',
        name:'myMessage',
        component: () => import('../views/account/MyMessage.vue')
      },
      {
        path:'myRedBag',
        name:'myRedBag',
        component: () => import('../views/account/MyRedBag.vue')
      },
      {
        path:'myRewards',
        name:'myRewards',
        component: () => import('../views/account/myRewards.vue')
      },
      {//修改手机号码
        path:'changeMobile',
        name:'changeMobile',
        component: () => import('../views/account/changeMobile.vue')
      },
      {//邀请好友
        path:'inviteFriends',
        name:'inviteFriends',
        component: () => import('../views/account/inviteFriends.vue')
      },
      {//充值提现
        path:'rechargeWithdraw',
        name:'rechargeWithdraw',
        component: () => import('../views/account/rechargeWithdraw.vue')
      },
      {//充值
        path:'toRecharge',
        name:'toRecharge',
        component: () => import('../views/account/toRecharge.vue')
      },
       {//提现
        path:'toWithdraw',
        name:'toWithdraw',
        component: () => import('../views/account/toWithdraw.vue')
      },
        {//电子账户激活
          path:'bindCard',
          name:'bindCard',
          component: () => import('../views/account/bindCard.vue')
        }
    ]
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
        return saveTop;
    } else {
        return {x: 0, y: 0}
    }
}
})

export default router
