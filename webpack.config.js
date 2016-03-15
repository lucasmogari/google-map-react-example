var path = require('path');

module.exports = {
	entry: {
		main: ['./script']
	},
	output: {
		path: path.join(__dirname, 'public/build'),
		filename: '[name].js'
	},
	resolve: {
		modulesDirectories: [
			'script',
			'node_modules'
		]
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0'],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: ['style', 'css']
		}]
	}
};
