const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: { 
      index: './src/page-index/index.js',
      bio: './src/page-bio/bio.js',
      ep: './src/page-ep/ep.js',
      socials: './src/page-socials/socials.js',
      email: './src/page-email/email.js'
  },
  output: {
      filename: '[name].[hash].js',
      path: buildPath
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
            test:  /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ]
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true, // webpack@1.x
                  disable: true, // webpack@2.x and newer
                },
              },
            ],
          }
        ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          template: './src/page-index/index.html',
          inject: true,
          hash: true,
          filename: 'index.html',
          chunks: ['index'],
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            description: 'Official website of RIP TXNY. EP out now on all streaming services.',
            'twitter:card': 'summary',
            'twitter:site': '@riptxny',
            'twitter:creator': '@diadozofficial',
            'og:title': 'RIPTXNY',
            'og:url': 'riptxny.com',
            'og:image': './src/assets/photos/optimized/rip-txny-cover-1-500.jpg',
            'og:description': 'Official website of RIP TXNY. EP out now on all streaming services.',
          },
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new HtmlWebpackPlugin({
          template: './src/page-ep/ep.html',
          inject: true,
          chunks: ['ep'],
          hash: true,
          filename: 'ep.html',
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            description: 'Official website of RIP TXNY. EP out now on all streaming services.',
            'twitter:card': 'summary',
            'twitter:site': '@riptxny',
            'twitter:creator': '@diadozofficial',
            'og:title': 'RIPTXNY',
            'og:url': 'riptxny.com/ep.html',
            'og:image': './src/assets/photos/optimized/rip-txny-cover-1-500.jpg',
            'og:description': 'Official website of RIP TXNY. EP out now on all streaming services.',
          },
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new HtmlWebpackPlugin({
          template: './src/page-bio/bio.html',
          inject: true,
          chunks: ['bio'],
          hash: true,
          filename: 'bio.html',
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            description: 'Official website of RIP TXNY. EP out now on all streaming services.',
            'twitter:card': 'summary',
            'twitter:site': '@riptxny',
            'twitter:creator': '@diadozofficial',
            'og:title': 'RIPTXNY',
            'og:url': 'riptxny.com/bio.html',
            'og:image': './src/assets/photos/optimized/rip-txny-cover-1-500.jpg',
            'og:description': 'Official website of RIP TXNY. EP out now on all streaming services.',
          },
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new HtmlWebpackPlugin({
          template: './src/page-socials/socials.html',
          inject: true,
          chunks: ['socials'],
          hash: true,
          filename: 'socials.html',
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            description: 'Official website of RIP TXNY. EP out now on all streaming services.',
            'twitter:card': 'summary',
            'twitter:site': '@riptxny',
            'twitter:creator': '@diadozofficial',
            'og:title': 'RIPTXNY',
            'og:url': 'riptxny.com/socials.html',
            'og:image': './src/assets/photos/optimized/rip-txny-cover-1-500.jpg',
            'og:description': 'Official website of RIP TXNY. EP out now on all streaming services.',
          },
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new HtmlWebpackPlugin({
          template: './src/page-email/email.html',
          inject: true,
          chunks: ['email'],
          hash: true,
          filename: 'email.html',
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            description: 'Official website of RIP TXNY. EP out now on all streaming services.',
            'twitter:card': 'summary',
            'twitter:site': '@riptxny',
            'twitter:creator': '@diadozofficial',
            'og:title': 'RIPTXNY',
            'og:url': 'riptxny.com/email.html',
            'og:image': './src/assets/photos/optimized/rip-txny-cover-1-500.jpg',
            'og:description': 'Official website of RIP TXNY. EP out now on all streaming services.',
          },
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css'
        }),
        new CopyWebpackPlugin([{
          from:'./src/assets',
          to:'assets'
        }]),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
  ],
  optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        // new UglifyJsPlugin({}),
        new OptimizeCssAssetsPlugin({})
      ]
  }
}