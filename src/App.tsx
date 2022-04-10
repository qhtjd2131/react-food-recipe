import React from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";

const GlobalWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const App = () => {
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
