const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebapckPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

isProduction = process.env.NODE_ENV === 'production'
const context = path.resolve(__dirname, '../src')

module.exports = {
  context,
  entry: {
    // split your code into vendor and app
    app: ['./index', 'webpack-hot-middleware/client'],
    //分块打包插件会用到,将这些模块提取公共部分打包
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'webpack-hot-middleware/client'
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', //the commons chunk name,
      // The chunk name of the commons chunk. An existing chunk can be selected by passing a name of an existing chunk.
      // If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name.
      // If omitted and `options.async` or `options.children` is set all chunks are used,
      // otherwise `options.filename` is used as chunk name.and If the `options.filename` omitted the original filename is not modified
      // children: true, multiple child chunks of an entry chunk, to prevent duplication, but initial load time
      //minChunks: 3, 3 children must share the module before it's moved
      async: true, //create an async chunk, the common chunk downloaded in paralled when the addtional chunk is downloaded
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('../dist'),
    publicPath: '/',
    sourceMapFilename: '[name].map',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      //便于引用模块时使用替代名称
      app: context,
      actions: 'app/actions',
      components: 'app/components',
      pages: 'app/pages',
      helpers: 'app/helpers',
      selectors: 'app/selectors',
      styles: 'app/styles',
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ],
  },
}
