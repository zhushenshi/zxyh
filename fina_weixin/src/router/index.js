import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Current from '@/components/Current/Current'//首页
import InfoDisclosure from '@/components/Current/InfoDisclosure/InfoDisclosure'//信息披露
import Insurance from '@/components/Current/Insurance/Insurance'//安全保障
import Investment from '@/components/Investment/Investment.vue'//投资
import Product from '@/components/Investment/Product.vue'//投资
import More from '@/components/More/MoreTab'//更多
import AccountTab from '@/components/Account/AccountTab'//账户
import Feedback from '@/components/More/Feedback/Feedback'//意见反馈
import AboutUs from '@/components/More/AboutUs/AboutUs'//关于我们
import HelpCenter from '@/components/More/HelpCenter/HelpCenter'//帮助中心
import OnInvestment from '@/components/More/HelpCenter/OnInvestment/OnInvestment'//关于投资
import MyAccount from '@/components/More/HelpCenter/MyAccount/MyAccount'//我的账户
import ComProblem from '@/components/More/HelpCenter/ComProblem/ComProblem'//常见问题
import Login from '@/components/login/login'//登录
import Register from '@/components/register/register'//注册
import RegisterProtocol from '@/components/register/registerProtocol'//注册协议
import FindPass from '@/components/FindPass/FindPass'//找回密码

import Settings from '@/components/Account/Settings/Settings'//设置
import Message from '@/components/Account/Message/Message'//消息
import Assess from '@/components/Account/Settings/Assess'//风险评估
import AssessResult from '@/components/Account/Settings/AssessResult'//风险评估结果

import MyRedBag from '@/components/Account/MyRedBag/MyRedBag'//红包
import MyRewards from '@/components/Account/MyRewards/MyRewards'//奖励
import CouponRules from '@/components/Account/CouponRules/CouponRules'//加息券使用规则

import Transaction from '@/components/Account/Transaction/Transaction'//交易记录
import InvestmentRecord from '@/components/Investment/InvestmentRecord'//投资记录
import RepaymentPlan from '@/components/Investment/InvestmentRecordRepayment/RepaymentPlan'//投资记录下的还款计划
import AgreementVoucher from '@/components/Investment/InvestmentRecordRepayment/AgreementVoucher/AgreementVoucher'//投资记录下的还款计划下的协议等

import AccountDetail from '@/components/Account/AccountDetail/AccountDetail'//账户详情
import Recharge from '@/components/Account/Recharge/Recharge'//充值
import RechargeReturn from '@/components/Account/Recharge/RechargeReturn'//充值成功
import Withdraw from '@/components/Account/Withdraw/Withdraw'//提现
import WithdrawReturn from '@/components/Account/Withdraw/WithdrawReturn'//提现成功
import Sina from '@/components/Account/Sina/Sina'//新浪三方

import HoldBanks from '@/components/Account/HoldBanks/HoldBanks'//支持银行卡

import Security from '@/components/Account/Security/Security'//账户安全
import ModifyPassword from '@/components/Account/Security/ModifyPassword'//修改登录密码
import ModifyPhone from '@/components/Account/Security/ModifyPhone'//修改登录密码
import activeSina from '@/components/Account/Security/activeSina'//修改登录密码

import InvitesCourtesy from '@/components/Account/Invitation/InvitesCourtesy'//邀请有礼
import InvitationRecord from '@/components/Account/Invitation/InvitationRecord'//邀请记录
import Card from '@/components/Account/Invitation/Card'//我的名片

import Activity from '@/components/Current/Activity/Activity'//活动详情

import programDetailRuning from '@/components/Investment/programDetailRuning.vue'//投资详情
import ContractPdf from '@/components/Investment/ContractPdf.vue'//投资详情
import useRedPacket from '@/components/Investment/useRedPacket.vue'//红包
import MyLoans from '@/components/Account/MyLoans/MyLoans'//我的借款
import RepayPlan from '@/components/Account/RepayPlan/RepayPlan'//还款计划
import WantPay from '@/components/Account/WantPay/WantPay'//我要还款

import shareReg from '@/components/share/shareReg'//分享页面


import ticket from '@/components/Investment/ticket.vue'//加息券

import LoanList from '@/components/Current/Loan/LoanList.vue'//贷款申请列表
import LoanApply from '@/components/Current/Loan/LoanApply.vue'//贷款申请信息填写
import BankCard from '@/components/Account/BankCard/BankCard.vue'//绑定银行卡
import BindBankCard from '@/components/Account/BankCard/BindBankCard.vue'//绑定银行卡
import RealName from '@/components/Account/RealName/RealName.vue'//实名认证
import MyLoan from '@/components/Account/MyLoan/MyLoan.vue'//我的贷款
Vue.use(Router)
//history

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/home/current',
      children: [
        {
          path: '/home/current',
          // alias: '/',
          name: 'Current',
          component: Current,
          meta: {title: '首页'},
          children: [
            
          ]
        },
        {
          path: '/home/accountTab',
          name: 'AccountTab',
          component: AccountTab,
          meta: { title: '账户'},
          children: [
          ]
        },
        {
          path: '/home/more',
          name: 'More',
          component: More,
          meta: {title: '更多'}
        },
        {
          path: '/home/product',
          name: 'Product',
          component: Product,
          meta: {
            title: '产品'
          }
        },
      ]
    },
    {
      path: '/home/investment',
      name: 'Investment',
      component: Investment,
      meta: {
        title: '投资'
      }
    },
    {
      path: '/home/more/feedback',
      name: 'Feedback',
      meta: {title: '意见反馈'},
      component: Feedback
    },
    {
      path: '/home/more/aboutUs',
      name: 'AboutUs',
      meta: {title: '关于我们'},
      component: AboutUs
    },
    {
      path: '/home/more/helpCenter',
      name: 'HelpCenter',
      meta: {title: '帮助中心'},
      component: HelpCenter,
      children: [
        {
          path: '/home/more/onInvestment',
          name: 'OnInvestment',
          meta: {title: '关于投资'},
          component: OnInvestment
        },
        {
          path: '/home/more/myAccount',
          name: 'MyAccount',
          meta: {title: '我的账户'},
          component: MyAccount
        },
        {
          path: '/home/more/comProblem',
          name: 'ComProblem',
          meta: {title: '常见问题'},
          component: ComProblem
        }
      ]
    },
    {
      path: '/home/current/activity',
      name: 'Activity',
      meta: {title: '活动详情'},
      component: Activity
    },
    {
      path: '/home/current/infoDisclosure',
      name: 'InfoDisclosure',
      meta: {title: '信息披露'},
      component: InfoDisclosure
    },
    {
      path: '/home/current/insurance',
      name: 'Insurance',
      meta: {title: '安全保障'},
      component: Insurance,
    },
    {
      path: '/home/accountTab/settings',
      name: 'Settings',
      meta: {title: '设置'},
      component: Settings
    },
    {
      path: '/home/accountTab/settings/assess',
      name: 'Assess',
      meta: {title: '风险评估'},
      component: Assess
    },
    {
      path: '/home/accountTab/settings/assessResult',
      name: 'AssessResult',
      meta: {title: '风险评估结果'},
      component: AssessResult
    },
    {
      path: '/home/accountTab/message',
      name: 'Message',
      component: Message,
      meta: { title: '消息中心'}
    },
    {
      path: '/home/accountTab/myRedBag',
      name: 'MyRedBag',
      component: MyRedBag,
      meta: { title: '优惠券包'},
      children: [
        {
          path: '/home/accountTab/myRedBag/couponRules',
          name: 'CouponRules',
          component: CouponRules,
          meta: { title: '红包规则'}
        }
      ]
    },
    {
      path: '/home/accountTab/myRewards',
      name: 'MyRewards',
      component: MyRewards,
      meta: { title: '我的奖励'}
    },
    {
      path: '/home/accountTab/transaction',
      name: 'Transaction',
      meta: {title: '交易记录'},
      component: Transaction
    },
    {
      path: '/home/accountTab/investmentRecord:series',
      name: 'InvestmentRecord',
      meta: {title: '投资记录'},
      component: InvestmentRecord
    },
    {
      path: '/home/accountTab/investmentRecord/repaymentPlan',
      name: 'RepaymentPlan',
      meta: {title: '还款计划'},
      component: RepaymentPlan
    },
    {
      path: '/home/accountTab/investmentRecord/repaymentPlan/agreementVoucher',
      name: 'AgreementVoucher',
      meta: {title: '协议'},
      component: AgreementVoucher
    },
    {
      path: '/home/accountTab/security',
      name: 'Security',
      meta: {title: '账户安全'},
      component: Security
    },
    {
      path: '/home/accountTab/security/modifyPassword',
      name: 'ModifyPassword',
      meta: {title: '修改密码'},
      component: ModifyPassword
    },
    {
      path: '/home/accountTab/security/modifyPhone',
      name: 'ModifyPhone',
      meta: {title: '修改手机号'},
      component: ModifyPhone
    },
    {
      path: '/home/accountTab/security/activeSina',
      name: 'activeSina',
      meta: {title: '绑定银行卡'},
      component: activeSina
    },
    // {
    //   path: '/home/accountTab/security/modifyPassword',
    //   name: 'ModifyPassword',
    //   component: ModifyPassword
    // }
    {
      path: '/home/accountTab/invitesCourtesy',
      name: 'InvitesCourtesy',
      meta: {title: '邀请有礼'},
      component: InvitesCourtesy
    },
    {
      path: '/home/accountTab/card',
      name: 'Card',
      meta: {title: '邀请有礼'},
      component: Card
    },
    {
      path: '/home/accountTab/invitesCourtesy/invitationRecord',
      name: 'InvitationRecord',
      meta: {title: '邀请记录'},
      component: InvitationRecord
    },
    {
      path: '/home/accountTab/recharge',
      name: 'Recharge',
      meta: {title: '充值'},
      component: Recharge,
      children:[
        {
          path: '/home/accountTab/recharge/holdBanks',
          name: 'HoldBanks',
          meta: {title: '支持银行'},
          component: HoldBanks
        },
      ]
    },
    {
      path: '/home/accountTab/recharge/sina',
      name: 'RechargeSina',
      meta: {title: '新浪充值'},
      component: Sina
    },
    {
      path: '/home/accountTab/withdraw',
      name: 'Withdraw',
      meta: {title: '提现'},
      component: Withdraw
    },
    {
      path: '/home/accountTab/withdraw/holdBanks',
      name: 'WithdrawHoldBanks',
      meta: {title: '支持银行'},
      component: HoldBanks
    },
    {
      path: '/home/accountTab/withdraw/sina',
      name: 'WithdrawSina',
      meta: {title: '新浪提现'},
      component: Sina
    },
    {
      path: '/home/accountTab/accountDetail',
      name: 'AccountDetail',
      meta: {title: '账户详情'},
      component: AccountDetail
    },
    {
      path: '/home/accountTab/accountDetail/withdraw',
      name: 'AccountDetailWithdraw',
      meta: {title: '提现'},
      component: Withdraw
    },
    {
      path: '/home/accountTab/accountDetail/withdraw/sina',
      name: 'DetailWithdrawSina',
      meta: {title: '新浪提现'},
      component: Sina
    },
    {
      path: '/home/accountTab/accountDetail/recharge',
      name: 'AccountDetailRecharge',
      meta: {title: '充值'},
      component: Recharge
    },
    {
      path: '/home/accountTab/accountDetail/recharge/sina',
      name: 'DetailRchargeSina',
      meta: {title: '新浪充值'},
      component: Sina
    },
    {
      path: '/home/accountTab/accountDetail/recharge/holdBanks',
      name: 'DetailRechargeHoldBanks',
      meta: {title: '支持银行'},
      component: HoldBanks
    },
    {
      path: '/home/accountTab/myLoans',
      name: 'MyLoans',
      meta: {title: '我的借款'},
      component: MyLoans
    },
    {
      path: '/home/accountTab/myLoans/repayPlan',
      name: 'RepayPlan',
      meta: {title: '还款计划'},
      component: RepayPlan
    },
    {
      path: '/home/accountTab/myLoans/repayPlan/wantPay',
      name: 'WantPay',
      meta: {title: '我要还款'},
      component: WantPay
    },
    {
      path: '/home/accountTab/myLoans/repayPlan/sina',
      name: 'RepayPlanSina',
      meta: {title: '新浪还款'},
      component: Sina
    },





    {
    	path: '/login',
      name: 'Login',
      meta: {title: '登录'},
      component:Login
    },
    {
    	path: '/register',
      name: 'Register',
      meta: {title: '注册'},
      component:Register,
      children: [
        {
          path: '/register/registerProtocol',
          name: 'RegisterProtocol',
          meta: {title: '注册协议'},
          component: RegisterProtocol
        }
      ]
    },
    {
    	path: '/findPass',
      name: 'FindPass',
      meta: {title: '忘记密码'},
      component:FindPass
    }, 
    {
    	path: '/programDetailRuning',
      name: 'programDetailRuning',
      meta: {title: '项目详情'},
      component:programDetailRuning
    },
    {
    	path: '/contractPdf',
      name: 'ContractPdf',
      meta: {title: '说明书'},
      component:ContractPdf
    },
    {
//  	path: '/useRedPacket/:amountInRed',
    	path: '/useRedPacket',
      name: 'useRedPacket',
      meta: {title: '红包'},
      component:useRedPacket
    },
    {
      path:'/sharereg',
      name:'sharereg',
      meta: {title: '分享'},
      component:shareReg
    },
    {
    	path: '/ticket',
      name: 'ticket',
      meta: {title: '加息券'},
      component:ticket
    },
    {
      path: '/home/current/loanList',
      name: 'LoanList',
      meta: {title: '贷款申请'},
      component: LoanList
    },
    {
      path: '/home/current/loanApply',
      name: 'LoanApply',
      meta: {title: '信用贷申请'},
      component: LoanApply
    },
    {
      path: '/home/accountTab/bankCard',
      name: 'BankCard',
      meta: {title: '银行卡'},
      component: BankCard
    },
    {
      path: '/home/accountTab/bindBankCard',
      name: 'BindBankCard',
      meta: {title: '绑定银行卡'},
      component: BindBankCard
    },
    {
      path: '/home/accountTab/realName',
      name: 'RealName',
      meta: {title: '实名认证'},
      component: RealName
    },
    {
      path: '/home/accountTab/myLoan',
      name: 'MyLoan',
      meta: {title: '我的贷款'},
      component: MyLoan
    },
  ]
})

