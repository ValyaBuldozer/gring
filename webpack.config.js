const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

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
		new WebpackPwaManifest({
			name: 'Golden Ring Guide',
			description: '',
			short_name: 'GRing',
			start_url: '.',
			display: 'standalone',
			icons: [{
				src: path.resolve(__dirname, './resources/app-icon.png'),
				sizes: [96, 128, 192, 256, 384, 512]
			}],
			prefer_related_applications: false
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
			}, {
				urlPattern: new RegExp('bundle.js'),
				handler: 'StaleWhileRevalidate'
			}, {
				urlPattern: new RegExp('index.html'),
				handler: 'StaleWhileRevalidate'
			}],
			navigateFallback: '/index.html'
		})
	],
	optimization: {
		usedExports: mode == 'production'
	},
	devtool: mode == 'production' ? undefined : 'eval'
};