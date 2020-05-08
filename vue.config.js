const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCss = require('optimize-css-assets-webpack-plugin')

const isProduction = !true
const openProxy = !true

module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })
  },
  // webpack 相关配置
  configureWebpack: {
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 80,
      host: '0.0.0.0',
      hot: true,
      compress: true,
      proxy: openProxy ? {
        '/api': {
          // target: 'http://127.0.0.1:8080/',
          target: 'http://192.168.13.9:8080/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      } : null
    },
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
      assetFilter: assetFilename => assetFilename.endsWith('.js')
    },
    plugins: isProduction ? [
      new OptimizeCss({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: { 
          discardComments: {
            removeAll: true
          }
        }
      }),
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/i,
        minRatio: 0,
        threshold: 10240
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, 
        minChunkSize: 100
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new TerserPlugin({
        parallel: 4
      }),
    ] : [ ] // 开发环境不使用插件
  },
  css: {
    extract: isProduction, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/index.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
}