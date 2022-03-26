import React from "react";
import styled from "styled-components";
import Home from "./Home";

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
    <Home />
  </GlobalWrapper>;
};

export default App;