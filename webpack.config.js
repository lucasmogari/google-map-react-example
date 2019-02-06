const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: ['./script']
	},
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'build')
	},
	resolve: {
		modules: [
			'script',
			'node_modules'
		]
	},
	module: {
		rules: [
	    {
	  		test: /\.js$/,
	  		exclude: /node_modules/,
	  		use: [
	  			{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
	  			}
	  		],
	  	},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style'
					},
					{
						loader: 'css'
					}
				],
			}
  	]
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
	]
};
