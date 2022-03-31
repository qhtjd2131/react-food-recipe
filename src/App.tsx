import React, { useState } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
import { configureStore } from '@reduxjs/toolkit'


const initialState = {value : "initValue"}
const myReducer = (state = initialState, action : any) => {
  if(action.type === 'setQuery'){
    return {
      ...state,
      value : action.value
    }
  }
  return state;
}

const store = configureStore({ reducer: myReducer })
console.log(store.getState())
store.dispatch({type:'setQuery',value : "test"})
console.log(store.getState())


const GlobalWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* border : 1px solid black; */
  box-sizing: border-box;
  padding: 2rem 2rem;
`;

const App = () => {
  const [q, setQ] = useState("");
  return (
    <GlobalWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </GlobalWrapper>
  );
};

export default App;
