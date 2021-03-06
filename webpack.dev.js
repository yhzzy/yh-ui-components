const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const common = require('./webpack.common.js');

const { HOST } = process.env;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
    },
    host: HOST || 'localhost',
    port: PORT || 3333,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'),
            },
          },
        ],
        enforce: 'pre',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'yh-ui组件库',
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        message: [`你的应用程序在这里运行：http://${this.host}:${this.port}`],
      },
      onErrors(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
        });
      },
      clearConsole: true,
    }),
  ],
});
