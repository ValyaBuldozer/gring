const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const mode = process.env.NODE_ENV || 'production';

module.exports = {
	devServer: {
		writeToDisk: true,
		historyApiFallback: true,
		contentBase: [path.join(__dirname, 'src')],
		port: 9000,
		host: "0.0.0.0",
		proxy: {
			'/api': 'http://localhost:5000',
			'/assets': 'http://localhost:5000'
		}
	},
	output: {
		path: path.resolve(__dirname, './build/out/'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	entry: path.resolve("./src/index.tsx"),
	mode: mode,
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'resources/'
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: "GRing",
			template: "src/index.html"
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			runtimeCaching: [{
				urlPattern: new RegExp('/api'),
				handler: 'StaleWhileRevalidate'
			}, {
				urlPattern: new RegExp('/assets'),
				handler: 'CacheFirst'
			}],
			navigateFallback: '/index.html'
		})
	],
	optimization: {
		usedExports: mode == 'production'
	},
	devtool: mode == 'production' ? undefined : 'eval'
};