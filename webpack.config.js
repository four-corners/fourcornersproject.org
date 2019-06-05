const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => ({
	entry: {
		app: './src/index.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]'+(argv.mode==='development'?'':'.min')+'.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: {
								safe: true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions']
							},
							plugins: () => [
								autoprefixer
							]
						},
					},
					{
						loader: 'sass-loader',
					}
				]
			},
			{
				test: /\.coffee$/,
				use: [ 'coffee-loader' ]
			},
			{
				test: /\.svg/,
				use: {
					loader: 'svg-url-loader',
					options: {}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'initial'
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
});