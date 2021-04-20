const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = merge(base,{
	mode:'production',
	devtool:'source-map',
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename:'[name].css'
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.js$|\.html$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		  })
	]
})