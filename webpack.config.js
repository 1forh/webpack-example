// dependencies
const path = require('path');
const webpack = require('webpack');

// configure rules for scripts
const scripts = {
	test: /\.(js)$/,
	loader: 'babel-loader',
	options: {
		presets: ['env']
	}
};

// configure webpack
const config = {
	entry: {
		main: [
			'./test/scripts/main.js'
		]
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './test'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './test/dist/scripts')
	},
	module: {
		rules: [scripts]
	}
};

// export the config object
module.exports = config;
