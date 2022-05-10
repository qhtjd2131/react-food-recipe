
# EDAMAM 사의 Recipe Search Api 를 활용한 음식정보검색 사이트

EDAMAM : https://www.edamam.com/ <br>

My FOODINFO Site : https://main.d85jjakedwwkt.amplifyapp.com/ <br>

## preview (Chrome)

**Home**
<image src="https://user-images.githubusercontent.com/34260967/167134760-fdc0c50f-00d8-412e-a633-03341b2a5e61.png" width="720px" height="480px">

**Bosung(introduce me page)**
<image src="https://user-images.githubusercontent.com/34260967/167135509-aeff5665-27f9-4a1f-a021-00c6d81a6206.png" width="720px" height="480px">


**Search**
<image src="https://user-images.githubusercontent.com/34260967/167295482-0c98a2b4-d6e8-4756-a9b4-67c48c78a74c.png" width="720px" height="480px">

**Recipe**
<image src="https://user-images.githubusercontent.com/34260967/167295426-d9470e3c-134e-4209-8d3e-51f2ea24f6a9.png" width="720px" height="480px">

**Nutrients**
<image src="https://user-images.githubusercontent.com/34260967/167295507-de31ee2b-683d-45da-88ca-65333e75ab32.png" width="720px" height="480px">

## 기술스택

- [HTML](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/Getting_started)
- [CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
- [ReactJS(without CRA)](https://reactjs.org/) 
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack(v5)](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Styled-Components](https://styled-components.com/)
- [Redux](https://redux.js.org/)
- [AWS Amplify](https://aws.amazon.com/ko/amplify/)

## 시작하기
```
npm install
npm run dev
```

## Cross Browsing

*IE는 지원하지 않는다. (polyfill 설정은 되어 있음.)

- Chrome
- Safari
- FireFox
- Opera
- Edge
<br>

**browserslist config**
```json
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
```

**browserslist 출력**
 ``` 
    and_chr 101
    and_ff 99
    and_uc 12.12
    android 4.4.3-4.4.4
    chrome 99
    chrome 98
    chrome 97
    chrome 96
    chrome 93
    edge 99
    edge 98
    firefox 98
    firefox 97
    ie 11
    ios_saf 15.4
    ios_saf 15.2-15.3
    ios_saf 15.0-15.1
    ios_saf 14.5-14.8
    ios_saf 14.0-14.4
    ios_saf 13.4-13.7
    ios_saf 12.2-12.5
    opera 83
    safari 15.2-15.3
    safari 15.1
    safari 14.1
    safari 14
    safari 13.1
    samsung 16.0
 ```


<br><br>

## 반응형 (모바일 포함)

아래 두 가지를 사용하여 반응형을 구현하였다.
- media query
    - 반응형으로 디자인만 변경되어야 하는 경우에 사용
- window resize event
    - 반응형으로 기능이 달라지는 경우에 사용


**window resize event** 의 경우 resize 이벤트가 발생할 때 마다 화면이 리랜더링 되기 때문에, lodash 라이브러리의 debounced 기능을 이용 하였다. 연속된 이벤트를 하나의 이벤트로 묶어서 처리하는 방법이다. 이번 프로젝트를 하면서 처음 알게되었고, 실용적이라고 생각하여 블로그에 포스트로 기재하였다.
[bosung's blog : Debounced 와 Throttled](https://gatsbybosungblogmain.gatsbyjs.io/DebouncedAndThrottled/)


**mobile chrome**

<image src="https://user-images.githubusercontent.com/34260967/167683683-920099a1-95c6-454a-9635-8c0820106c63.png" width="400px" height="850px">
<br>
<image src="https://user-images.githubusercontent.com/34260967/167683660-66a4164d-2166-485f-9410-a3419bf0f4ad.png" width="400px" height="850px">

<br>
<br>

**mobile safari**
<image src="https://user-images.githubusercontent.com/34260967/167683735-71b4509f-9932-4b64-aab6-095008e95812.png" width="400px" height="850px">
<br>
<image src="https://user-images.githubusercontent.com/34260967/167683722-4013ebc4-508e-4cf9-8d0a-767076612528.png" width="400px" height="850px">


<br>
<br>

## webpack

webpack config 는 아래와 같이 세가지 파일로 분리되어 있다.

- webpack.common.js
- webpack.dev.js
- webpack.prod.js


**webpack.common.js**
```javascript
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/.env`,
});
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

```

**webpack.dev.js**
```javascript
const { merge } = require('webpack-merge');
const common = require("./webpack.common");

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
```

**webpack.prod.js**
```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

```

이 프로젝트의 웹팩설정에서는 번들파일의 최적화를 진행하지 않고 있다. 따라서, 번들 크기 관련 warning 이 발생하지만, performance 속성을 이용하여 warning을 무시하고 있다. (근본적인 문제 해결 필요)



