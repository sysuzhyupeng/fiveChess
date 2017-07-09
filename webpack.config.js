//webpack-dev-server主要是启动了一个使用express的Http服务器。
//webpack与webpack-dev-server的版本必须兼容，否则npm start会报错
//为了让Webpack可以处理样式，我们需要安装css和style加载器。
/*
 	加载器语法
 	module: {
		loaders: [{
			test: RegEx,
			loader: 'style-loader!css-loader'
		}, ]
	}  
*/
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var PATHS = {
	app: path.join(__dirname, 'app/index'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry: {
		app: PATHS.app,
	},
	output: {
		path: PATHS.dist,
		filename: '[name].js',
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}]
	}
};
devServer: {
	inline: true
}