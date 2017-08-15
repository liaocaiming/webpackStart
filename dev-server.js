var webpack = require("webpack");
var config = require("./webpack.config")
var compiler = webpack(config)
var opn = require("opn");
var express = require("express");
var devMiddleware = require("webpack-dev-middleware")(compiler);
var app = express();
var history = require('connect-history-api-fallback');
var hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => { }
})
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(history())
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + "localhost" + '\n')
  // when env is testing, don't need open it
  opn("http://localhost:8080")
  _resolve()
})
app.listen(8080)