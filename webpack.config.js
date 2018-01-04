const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const DEFAULT_PORT = 3000;

module.exports = function (env = { production: false }) {
	const isProduction = env.production === true;
	console.info('Environment: ', env);

	const styleLoaders = [
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							parser: 'postcss-scss',
							plugins: [
								require('autoprefixer')(),
								isProduction ? require('cssnano')() : () => {}
							]
						}
					},
					'sass-loader'
				]
			})
		}
	];

	const scriptLoaders = [
		{
			test: /\.(js)$/,
			loader: 'babel-loader',
			options: {
				presets: ['env']
			}
		}
	];

	const config = {
		entry: {
			'bundle.css': path.resolve(__dirname, './test/styles/main.scss'),
			'bundle.js': path.resolve(__dirname, './test/scripts/main.js')
		},
		devtool: 'source-map',
		module: {
			loaders: [...styleLoaders, ...scriptLoaders]
		},
		plugins: [
			isProduction ? new UglifyJSPlugin() : () => {},
			new ExtractTextPlugin('bundle.css'),
			new CleanWebpackPlugin(path.resolve(__dirname, './test/dist')),
			new BrowserSyncPlugin({
				port: process.env.PORT || DEFAULT_PORT
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
			})
		],
		output: {
			filename: '[name]',
			path: path.resolve(__dirname, './test/dist')
		}
	};

	return config;
};
