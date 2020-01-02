
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 默认dist
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      const plugins = [];
      plugins.push(
          new UglifyJsPlugin({
              uglifyOptions: {
                  compress: {
                      warnings: false,
                      drop_console: true,
                      drop_debugger: true,
                      pure_funcs: ['console.log']//移除console
                  }
              },
          })
      );
    }

  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  devServer: {
    proxy: {
    }, // 设置代理
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  
}
