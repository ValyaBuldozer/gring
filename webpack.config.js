const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV || 'production';

module.exports = {
	devServer: {
		contentBase: [path.join(__dirname, 'src')],
		port: 9000,
		host: "localhost",
		proxy: {
			'/api': 'http://localhost:5000',
			'/assets': 'http://localhost:5000'
		}
	},
	output: {
		path: path.resolve(__dirname, './build/out/'),
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
		})
	],
	optimization: {
		usedExports: mode == 'production'
	},
	devtool: mode == 'production' ? undefined : 'eval'
};