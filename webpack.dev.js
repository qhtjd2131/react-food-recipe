const { merge } = require('webpack-merge');

const common = require("./webpack.common");
// const devConfig = merge(common, {});
// module.exports = devConfig;



module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    port: 8080, //포트
    open: true, //개발 서버 실행 시 브라우저 오픈
    historyApiFallback: true,
    static: "./dist",
  },
});

// module.exports = merge({}, common);

// console.log(merge(common, {}));
