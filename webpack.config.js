var path = require('path')
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
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
    filename: '[name][chunkhash].js'
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
        test: /\.(jpg | png | svg)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: 'index.html'})
  ]

}
module.exports = config