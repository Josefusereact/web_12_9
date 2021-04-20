const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name]-[chunkhash].bundle.js',
		publicPath:''
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{loader:'babel-loader'}
			},
			{
				test:/\.css$/,
				use:[
					// 在提取css时不需要使用style-loader
					// {loader:'style-loader'},
					MiniCssExtractPlugin.loader,
					{loader:'css-loader'},
					{loader:'postcss-loader'}
				]
			},
			{
				test:/\.scss$/,
				use:[
					// {loader:'style-loader'},
					MiniCssExtractPlugin.loader,
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			filename:'index.html',
			chunks:['index']
		}),
		new MiniCssExtractPlugin({
			filename:'[name].css'
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.js$|\.html$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	resolve:{
		extensions:['.js','.jsx','.vue','.less','.sass'],
		alias:{
			'@':path.resolve(__dirname,'src')
		}
	}
}