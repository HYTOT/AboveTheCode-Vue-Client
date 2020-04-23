const webpack = require('webpack');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  // webpack 相关配置
  configureWebpack: {
    mode: "production",
    devServer: {
      port: 80,
      host: '0.0.0.0',
      hot: true,
      compress: true, // 启用gzip 压缩
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    performance: {
      // 入口起点的最大体积 整型（字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整型（字节为单位）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: assetFilename => assetFilename.endsWith('.js')
    },
    plugins: [
      new OptimizeCss({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: { 
          discardComments: {
            removeAll: true
          }
        }
      }),
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: false,
        uglifyOptions: {
          warnings: false
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
      })
    ]
  },
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
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