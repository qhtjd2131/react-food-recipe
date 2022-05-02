const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    port: 8080, //포트
    open: true, //개발 서버 실행 시 브라우저 오픈
    historyApiFallback: true,
    devMiddleware: {
      publicPath: "/dist",
    },
    static: { directory: path.resolve(__dirname) },
  },
});
