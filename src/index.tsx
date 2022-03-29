import 'core-js/stable';
import 'regenerator-runtime/runtime';

import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9"
import "react-app-polyfill/stable";

import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";

ReactDom.render(
    <App />,
 
//   <App />,
  document.getElementById("root")
);
