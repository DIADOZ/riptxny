const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    devtool: 'source-map',
    entry: { 
        index: './src/page-index/index.js',
        bio: './src/page-bio/bio.js',
        ep: './src/page-ep/ep.js',
        socials: './src/page-socials/socials.js',
        email: './src/page-email/email.js'
    },
    output: {
        filename: '[name].[hash:20].js',
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
            }
          ]
    },
    plugins: [
        new CleanWebpackPlugin(),
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
            // new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin({})
        ]
    }
}