import React from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
import Recipe from "./pages/Recipe";
import NotFound404 from "./pages/NotFound404";
import { store } from ".";

const GlobalWrapper = styled.div`
  width: 100%;
  height :100vh;
  margin: 0 auto;
  box-sizing: border-box;

`;

const App = () => {
  console.log(store.getState())

  return (
    <GlobalWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </GlobalWrapper>
  );
};

export default App;
