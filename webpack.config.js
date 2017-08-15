var path = require('path')
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  // entry: './js/test.ts',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'test.js'
  // }
  entry: {
    // test: './js/test.ts',
    app: './js/app.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name][hash].js'
    // chunkFilename: "[id].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            // options: {
            //   modules: true
            // }
          }
        ],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader", "eslint-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/i,
        use: [{
          loader: "url-loader",
          query: {
            limit: 200,
            name: "image/[name]-[hash].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: 'index.html'}),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  // devServer: { 
  //   contentBase: "./dist",
  //   hot: true
  // }
}
module.exports = config