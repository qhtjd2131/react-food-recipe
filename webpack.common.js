const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/.env`,
});
// dotenv.config();
const { SourceMapDevToolPlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_KEY": JSON.stringify(
        process.env.REACT_APP_API_KEY
      ),
      "process.env.REACT_APP_APP_ID": JSON.stringify(
        process.env.REACT_APP_APP_ID
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!(axios|react-router-dom))/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!(axios|react-router-dom))/,
        resolve: {
          fullySpecified: false,
        },
        use: [
          "source-map-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [path.join(__dirname, "node_modules")],
  },
};
