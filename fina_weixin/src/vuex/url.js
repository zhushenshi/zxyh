var cfg = {
    dev: '/api/wx/m', //测试服--代理
    pro: '/wx/m',
    dev_baseurlVerifyImg: '/api/wx', // 测试服
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
