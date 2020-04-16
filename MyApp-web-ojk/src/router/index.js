import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login =(resolve) =>{ 
  import('@/components/User/Login').then((module) =>{
    resolve(module)
  })
}
const Register =(resolve) =>{ 
  import('@/components/User/Register').then((module) =>{
    resolve(module)
  })
}
const LoanProtocol =(resolve) =>{ 
  import('@/components/Home/loanProtocol').then((module) =>{
    resolve(module)
  })
}
const ContractPdf =(resolve) =>{ 
  import('@/components/Loan/ContractPdf').then((module) =>{
    resolve(module)
  })    
} //借款合同pdf
const Portal =(resolve) =>{ 
  import('@/components/Portal').then((module) =>{
    resolve(module)
  })
}
const Cooperation =(resolve) =>{ 
  import('@/components/Mine/Cooperation').then((module) =>{
    resolve(module)
  })    
} //合作平台
const Problem =(resolve) =>{ 
  import('@/components/Mine/Problem').then((module) =>{
    resolve(module)
  })    
} //常见问题
const AboutUs =(resolve) =>{ 
  import('@/components/Mine/aboutUs').then((module) =>{
    resolve(module)
  })    
} //关于我们
const Order =(resolve) =>{ 
  import('@/components/Mine/Order').then((module) =>{
    resolve(module)
  })    
} //我的订单
const RepayPage =(resolve) =>{ 
  import('@/components/Repay/RepayPage').then((module) =>{
    resolve(module)
  })    
} //付款
const Extension =(resolve) =>{ 
  import('@/components/Repay/Extension').then((module) =>{
    resolve(module)
  })    
} //展期付款
const RepayResult =(resolve) =>{ 
  import('@/components/Repay/RepayResult').then((module) =>{
    resolve(module)
  })    
} //付款结果
const ResetPwd =(resolve) =>{ 
  import('@/components/User/ResetPwd').then((module) =>{
    resolve(module)
  })    
} //忘记密码
const MsgCenter =(resolve) =>{ 
  import('@/components/Mine/MsgCenter').then((module) =>{
    resolve(module)
  })    
} //消息中心
const SysMsg =(resolve) =>{ 
  import('@/components/Mine/SysMsg').then((module) =>{
    resolve(module)
  })    
} //系统消息
const Suggestion =(resolve) =>{ 
  import('@/components/Mine/Suggestion').then((module) =>{
    resolve(module)
  })    
} //投诉建议
const Setting =(resolve) =>{ 
  import('@/components/Mine/Setting').then((module) =>{
    resolve(module)
  })    
} //设置
const EditPwd =(resolve) =>{ 
  import('@/components/Mine/EditPwd').then((module) =>{
    resolve(module)
  })    
} //修改密码
const Identity =(resolve) =>{ 
  import('@/components/Loan/Identity-webview').then((module) =>{
    resolve(module)
  })    
} //身份认证
const CreditCard =(resolve) =>{ 
  import('@/components/Mine/CreditCard').then((module) =>{
    resolve(module)
  })    
} //绑定银行卡
const ChangeCreditCard =(resolve) =>{ 
  import('@/components/Mine/ChangeCreditCard').then((module) =>{
    resolve(module)
  })    
} //绑定银行卡
const PersonalInfo =(resolve) =>{ 
  import('@/components/Loan/PersonalInfo_webview').then((module) =>{
    resolve(module)
  })    
} //个人信息
const Authentication =(resolve) =>{ 
  import('@/components/Loan/Authentication').then((module) =>{
    resolve(module)
  })    
} //手机运营商授权提交
const CarrierOperator =(resolve) =>{ 
  import('@/components/Loan/CarrierOperator' ).then((module) =>{
    resolve(module)
  })   
}//手机运营商授权
const Court =(resolve) =>{ 
  import('@/components/Loan/Court' ).then((module) =>{
    resolve(module)
  })   
}//手机运营商授权
const FaceIdentity =(resolve) =>{ 
  import('@/components/Loan/FaceIdentity').then((module) =>{
    resolve(module)
  })   
} //人脸识别
const ApplyStatus =(resolve) =>{ 
  import('@/components/Mine/ApplyStatus').then((module) =>{
    resolve(module)
  })    
} //
const Reply =(resolve) =>{ 
  import('@/components/Mine/Reply').then((module) =>{
    resolve(module)
  })    
} //回复
const Protocol =(resolve) =>{ 
  import('@/components/User/Protocol').then((module) =>{
    resolve(module)
  })
}
const ProtocolUser =(resolve) =>{ 
  import('@/components/User/ProtocolUser').then((module) =>{
    resolve(module)
  })
}
const DownLoadPage =(resolve) =>{ 
  import('@/components/User/DownLoadPage').then((module) =>{
    resolve(module)
  })
}
const ProductDetail =(resolve) =>{ 
  import('@/components/Home/productDetail').then((module) =>{
    resolve(module)
  })
}
const RepayHistory =(resolve) =>{ 
  import('@/components/Repay/RepayHistory').then((module) =>{
    resolve(module)
  })
}
const HistoryDetails =(resolve) =>{ 
  import('@/components/Repay/HistoryDetails').then((module) =>{
    resolve(module)
  })
}
const RepayOjk =(resolve) =>{ 
  import('@/components/Repay/RepayOjk').then((module) =>{
    resolve(module)
  })
}
const BankList =(resolve) =>{ 
  import('@/components/Mine/BankList').then((module) =>{
    resolve(module)
  })
}
const CommProblem =(resolve) =>{ 
  import('@/components/Mine/CommProblem').then((module) =>{
    resolve(module)
  })
}
const router =  new Router({
  mode: 'hash',
  routes: [
    {
      path: '/downLoadPage',
      name: 'DownLoadPage',
      component: DownLoadPage
    },
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/portal',
      name: 'Portal',
      component: Portal,
      children:[
        {
          path: '/loanProtocol',
          name: 'LoanProtocol',
          component: LoanProtocol
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resetPwd',
      name: 'ResetPwd',
      component: ResetPwd
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      children:[
        {
          path: '/register/protocol',
          name: 'Protocol',
          component: Protocol
        },
        {
          path: '/register/protocolUser',
          name: 'ProtocolUser',
          component: ProtocolUser
        },
      ]
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contractPdf',
      name: 'ContractPdf',
      component: ContractPdf
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/cooperation',
      name: 'Cooperation',
      component: Cooperation
    },
    {
      path: '/problem',
      name: 'Problem',
      component: Problem
    },
    {
      path: '/commProblem',
      name: 'CommProblem',
      component: CommProblem
    },
    {
      path: '/repayPage',
      name: 'RepayPage',
      component: RepayPage
    },
    {
      path: '/extension',
      name: 'Extension',
      component: Extension
    },
    {
      path: '/repayResult',
      name: 'RepayResult',
      component: RepayResult
    },
    {
      path: '/msgCenter',
      name: 'MsgCenter',
      component: MsgCenter,
      // children: [
      //   {
      //     path: '/msgCenter/sysMsg',
      //     name: 'SysMsg',
      //     component: SysMsg
      //   }
      // ]
    },
    {
      path: '/sysMsg',
      name: 'SysMsg',
      component: SysMsg
    },
    {
      path: '/suggestion',
      name: 'Suggestion',
      component: Suggestion
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/editPwd',
      name: 'EditPwd',
      component: EditPwd
    },
    {
      path: '/identity',//身份认证
      name: 'Identity',
      component: Identity
    },
    {
      path: '/creditCard',
      name: 'CreditCard',
      component: CreditCard
    },
    {
      path: '/changeCreditCard',//绑定银行卡
      name: 'ChangeCreditCard',
      component: ChangeCreditCard,
      children:[
        {
          path: '/changeCreditCard/banklist',
          name: 'BankList',
          component: BankList
        }
      ]
    },
    {
      path: '/personalInfo',//个人信息
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      path: '/authentication',//手机运营商授权提交
      name: 'Authentication',
      component: Authentication,
      children:[
        {
          path: '/carrierOperator',//手机运营商授权
          name: 'CarrierOperator',
          component: CarrierOperator
        }      ]
    },
    {
      path: '/Court',//法院执行人
      name: 'Court',
      component: Court
    },
    {
      path: '/faceIdentity',//人脸识别
      name: 'FaceIdentity',
      component: FaceIdentity
    },
    {
      path: '/applyStatus',//额度申请
      name: 'ApplyStatus',
      component: ApplyStatus
    },
    {
      path: '/reply',//回复建议
      name: 'Reply',
      component: Reply
    },
    {
      path: '/productDetail',//产品详情RepayHistory
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/repayHistory',//历史纪录
      name: 'RepayHistory',
      component: RepayHistory
    },
    {
      path: '/historyDetails',//历史纪录详情
      name: 'HistoryDetails',
      component: HistoryDetails
    },
    {
      path: '/repayOjk',//ojk还款
      name: 'RepayOjk',
      component: RepayOjk,
      children:[
        {
          path: '/repayOjk/problem',
          component: Problem
        }
      ]
    }
  ]
})
export default router;