import Vue from "vue";
import Router from '../router/index'
import axios from "axios";
import qs from 'qs';
import store from '../store'
import { MessageBox } from "element-ui";
// import env from '@/config/env';

// const MOCKURL = ''; // mock数据地址

/**
 * 自定义Axios实例
 */
const AJAX = axios.create({
  baseURL: "",
  timeout: 30000,
  // withCredentials: env.credential
  withCredentials: true
});

// 添加请求拦截器
AJAX.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log(process.env)
    console.log(process.env.NODE_ENV)
    console.log(config)
    if (process.env.NODE_ENV === "development") {
      config.url = `http://${location.host}` + config.url; // 自定义反向代理
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
var token
if(sessionStorage.getItem('$token')){
   token = sessionStorage.getItem('$token');
   console.log(token)
}else{
  token =''
}
// 添加响应拦截器
AJAX.interceptors.response.use(
  function(response) {
    console.log(response)
    // 对响应数据做点什么
    if (response.data.status === '401'&&response.data.msg=="TOKEN校验失败，请重新登录！"&&store.state.token){
      sessionStorage.setItem('$token', '');
      store.commit("token", '');
      MessageBox.alert('您的登录已过期，是否重新登录？', '温馨提示', {
        confirmButtonText: '确定'
      }).then(()=>{
        //跳转到登录页
        Router.push('/login')
      }).catch((cancel)=>{
        console.log(cancel)
      });
    }else{
      return response.data;  
    }
  },
  function(error) {
    // 对响应错误做点什么，比如400、401、402等等
    if (error && error.response) {
        //302 登录
      if (error.response.status === 500) {
        MessageBox.alert("500服务器错误", "", {
          type: "error"
        });
      } else if (error.response.status === 504) {
        MessageBox.alert("连接服务器超时", "", {
          type: "error"
        });
      } else if (error.response.status === 408) {
        MessageBox.alert("408请求超时", "", {
          type: "error"
        });
      } else if (error.response.status === 404) {
        MessageBox.alert("404错误", "", {
          type: "error"
        });
      }
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);
export default Vue.prototype.$ajax = function({
  method = "post",
  url,
  params = null,
  data = null,
  baseURL = '/wx/m'
}) {
  return AJAX({
    url:baseURL+url,
    method,
    params,
    data:qs.stringify(data),
    headers:Object.assign({
      // 'Content-Type': 'application/x-www-form-urlencoded'
      token:sessionStorage.getItem('$token')
    })
  });
};
// 定义对外Get、Post、File请求
// export default {
//     get(url, param = {}, headers = {}) {
//         return AJAX.get(url, {
//             params: param,
//             headers,
//         })
//     },
//     post(url, param = null, headers = {}) {
//         return AJAX.post(url, param, {
//             headers,
//         })
//     },
//     put(url, param = null, headers = {}) {
//         return AJAX.put(url, param, {
//             headers,
//         })
//     },
//     file(url, param = null, headers = {}) {
//         return AJAX.post(url, param, {
//             headers: Object.assign({
//                 'Content-Type': 'multipart/form-data'
//             }, headers)
//         })
//     },
//     delete(url, param = null, headers = {}) {
//         return AJAX.delete(url, {
//             param,
//             headers: Object.assign({
//                 'Content-Type': 'multipart/form-data'
//             }, headers)
//         })
//     }
// }
