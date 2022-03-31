import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const SearchBox = styled.section`
    width:100%;
    height:100%;
    
`;

const ResultBox = styled.div`
    margin-top : 100px;
`;
const Search = () => {
  const params = useParams();
  const location = useLocation();
  
  useEffect(()=>{
      console.log(params);
      console.log(location)
  },[])

  return (
    <SearchBox>
      <Header />
      <ResultBox>
          {location.search}
      </ResultBox>
    </SearchBox>
  );
};

export default Search;
