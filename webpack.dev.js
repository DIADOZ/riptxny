const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: { 
    index: './src/page-index/index.js',
    bio: './src/page-bio/bio.js',
    ep: './src/page-ep/ep.js',
    socials: './src/page-socials/socials.js',
    email: './src/page-email/email.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test:  /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/index.html',
      inject: true,
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/page-ep/ep.html',
      inject: true,
      chunks: ['ep'],
      filename: 'ep.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-bio/bio.html',
      inject: true,
      chunks: ['bio'],
      filename: 'bio.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-socials/socials.html',
      inject: true,
      chunks: ['socials'],
      filename: 'socials.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-email/email.html',
      inject: true,
      chunks: ['email'],
      filename: 'email.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/assets',
        to: 'assets'
      }]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]   
};