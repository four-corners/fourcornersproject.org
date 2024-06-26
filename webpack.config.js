const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const distPath = path.join(__dirname, 'four-corners-wp-theme');

module.exports = (env, argv) => ({
	entry: {
		app: './src/index.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `[name]${argv.mode === 'development' ? '' : '.min'}.js`
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
								browsers: ['defaults']
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
		minimize: false,
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			common: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'initial'
	// 			}
	// 		}
	// 	}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		...(argv.mode === 'production' ? [
			new CopyPlugin([
				{
					from: '*.php',
					to: distPath,
				},
				{
					from: 'assets/*',
					to: distPath,
				},
				{
					from: 'dist/*',
					to: distPath,
				},
				{
					from: './style.css',
					to: distPath,
				},
			])
		] : []),
	]
});