var webpack = require("webpack");
var config = require("./webpack.config")
var compiler = webpack(config)
compiler.run(function (error, stas) {
  // console.log(error, stas)
})