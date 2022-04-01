//cross browsing issue
import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie11";  
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux-modules";

const store = configureStore({ reducer: rootReducer });
console.log(store.getState());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  //   <App />,
  document.getElementById("root")
);
