// const path = require('path')

// module.exports = {
//     publicPath: './', // 基本路径
//     outputDir: 'dist', // 输出文件目录
//     lintOnSave: false, // eslint-loader 是否在保存的时候检查
//     // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//     // webpack配置
//     chainWebpack: (config) => {
//     },
//     configureWebpack: (config) => {
//         if (process.env.NODE_ENV === 'production') {
//             // 为生产环境修改配置...
//             config.mode = 'production'
//         } else {
//             // 为开发环境修改配置...
//             config.mode = 'development'
//         }
//         Object.assign(config, {
//             // 开发生产共同配置
//             resolve: {
//                 alias: {
//                     '@': path.resolve(__dirname, './src'),
//                     '@c': path.resolve(__dirname, './src/components'),
//                     '@p': path.resolve(__dirname, './src/pages')
//                 } // 别名配置
//             }
//         })
//     },
//     productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
//     // css相关配置
//     css: {
//         extract: true, // 是否使用css分离插件 ExtractTextPlugin
//         sourceMap: false, // 开启 CSS source maps?
//         loaderOptions: {
//             css: {}, // 这里的选项会传递给 css-loader
//             postcss: {} // 这里的选项会传递给 postcss-loader
//         }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
//         modules: false // 启用 CSS modules for all css / pre-processor files.
//     },
//     parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
//     pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
//     // webpack-dev-server 相关配置
//     devServer: {
//         open: process.platform === 'darwin',
//         host: '0.0.0.0', // 允许外部ip访问
//         port: 8022, // 端口
//         https: false, // 启用https
//         overlay: {
//             warnings: true,
//             errors: true
//         }, // 错误、警告在页面弹出
//         proxy: {
//             '/api': {
//                 target: 'http://www.baidu.com/api',
//                 changeOrigin: true, // 允许websockets跨域
//                 // ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         } // 代理转发配置，用于调试环境
//     },
//     // 第三方插件配置
//     pluginOptions: {}
// }



// vue.config.js
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './', // 基本路径
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 开启生产环境SourceMap，设为false打包时不生成.map文件
    productionSourceMap: false,

    // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
    lintOnSave: false,

    devServer: {
        open: false,        // 是否自动打开浏览器页面
        host: '0.0.0.0',    // 指定使用一个 host，默认是 localhost
        port: 8080,         // 端口地址
        https: false,       // 使用https提供服务
        // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        // proxy: 'http://36.33.216.230:10010'
        // proxy: 'http://192.168.102.24:8088'//朱星举
        // proxy: 'http://192.168.102.140:8080'//
        proxy: 'http://192.168.102.119:8666'//
        // proxy: 'http://192.168.102.140:8080'//张云飞
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .set('components', resolve('./src/components'))
    },

    configureWebpack: config => {
        // 生产环境打包分析体积
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
            }
        }
    },
};
