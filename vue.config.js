const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const Timestamp = new Date().getTime()

require('events').EventEmitter.prototype._maxListeners = 20

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: [
    '//at.alicdn.com/t/font_1859634_436c2ykrk6h.js',
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin({
        // 修改打包后css文件名
        filename: `css/[name].${Timestamp}.css`,
        chunkFilename: `css/[name].${Timestamp}.css`
      }),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`,
      publicPath: '/'
    },
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    } else {
      config.plugin('html').tap(args => {
        args[0].cdn = {
          externals: {
            // vue: 'Vue',
            // 'vue-router': 'VueRouter',
            // vuex: 'Vuex',
            // axios: 'axios'
          },
          css: [],
          js: [ '//at.alicdn.com/t/font_1859634_436c2ykrk6h.js' ]
        }
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': '#1890FF',
          'primary-3': '#8BAAEE',
          'link-color': '#1990FF',
          'border-radius-base': '2px',
          'btn-default-color': '@primary-3',
          'error-color': '#FF4064',
          'tabs-card-active-color': '@primary-color',
          'shadow-color-1': 'rgba(9,41,77,.12)',
          'shadow-3': '0 0 1.5rem @shadow-color-1',
          'modal-body-padding': '15px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 9009
    port: 9009
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/light_api': {
    //     target: 'http://192.168.10.26:16125/', // 标准版
    //     // target: 'http://localhost:8801/', // 本地接口
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //   '^/light_api': '/sinfoweb-jhmhehe' // 注意名字
    //     // }
    //   },
    //   // TODO:临时测试省份级联接口
    //   '/ws': {
    //     target: 'https://apis.map.qq.com/',
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['./src/config/style.config.less']
    }
  }
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
