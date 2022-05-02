const {merge} = require("webpack-merge");
const path = require("path");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  mode: "production",
  devtool : "soure-map",
  
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
