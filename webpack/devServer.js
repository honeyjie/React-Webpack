const express = require('express')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
var serverStatic = require('serve-static')
const app = express()
const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

const webpackConfig = isProduction
  ? require('./webpack.config.prod.js')
  : require('./webpack.config.dev.js')

const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
  },
})

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware(compiler))

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info('Listening at localhost:%s', port)
  }
})
