const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.config.js')

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: true,
    stats: 'minimal',
    hot: true
  }
})
