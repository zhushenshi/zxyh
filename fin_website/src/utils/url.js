var cfg = {
    dev: '/wx/m', //测试服--代理
//  dev: '/api/fin-web/m', // 吴京
//	dev: '/api/m',  //高志东
    pro: '/api/wx/m',
    dev_baseurlVerifyImg: '/wx', // 测试服
//  dev_baseurlVerifyImg: 'http://36.33.216.230:1000/wx', //吴京
//  dev_baseurlVerifyImg: 'http://192.168.102.39:8088',//高志东
    pro_baseurlVerifyImg: '/wx',
};

var base_url = '';
var baseurlVerifyImg = '';
switch (process.env.NODE_ENV) {
    case "development":
        base_url = cfg.dev;
        baseurlVerifyImg = cfg.dev_baseurlVerifyImg
        break;
    case "testing":
        base_url = cfg.dev;
        baseurlVerifyImg = cfg.dev_baseurlVerifyImg
        break;
    case "production":
        base_url = cfg.pro;
        baseurlVerifyImg = cfg.pro_baseurlVerifyImg
        break;
}

export const baseURL = base_url
export const baseURLVerifyImg = baseurlVerifyImg
