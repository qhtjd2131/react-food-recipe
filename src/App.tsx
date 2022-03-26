import React from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";

const GlobalWrapper = styled.div`
    width : 100%;
    height : 100%;
    margin : 0 auto;
    /* border : 1px solid black; */
    box-sizing : border-box;

    padding : 2rem 2rem;
`;

const App = () => {
  return <GlobalWrapper>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Search" element={<Search />} />
    </Routes>
  </GlobalWrapper>;
};

export default App;