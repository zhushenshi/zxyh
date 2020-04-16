var company_code='';
var base_url='/api'
var http_url='' //协议地址
var ctx_url='/app';
switch (process.env.NODE_ENV) {
  case "development"://开发环境
    // base_url = '/api/zhangheng_yinni_app';
     base_url = '/api/app';
    // base_url = '/api/app_application';
    // base_url = '/api';
    http_url = 'http://101.132.193.65:9527/file/'
    ctx_url = ''
    company_code='HFCS201905200001';
    break;
  case "testing":
    base_url = '/api/cashloan-api';
    http_url = 'http://101.132.193.65:9527/file/'
    ctx_url = localStorage['_ctx']
    company_code='HFCS201905200001';
    break;
  case "production"://生产环境
    //生产环境
    base_url = localStorage['_ctx'];
    // base_url = "http://36.33.216.230:8888/APP-v4"// 映射外网时写死打包地址
    ctx_url = localStorage['_ctx']
    company_code='HFCS201905200001'
    break;
}
export const baseURL = base_url
export const httpUrl = http_url
export const companyCode = company_code
export const ctx = ctx_url
