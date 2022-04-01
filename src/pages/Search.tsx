import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import QueryString, { ParsedQs } from "qs";
import { store } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux-modules/search";
import FoodList from "../components/FoodList";

const SearchBox = styled.section`
  width: 100%;
  height: 100%;
  background-color : white;
  padding : 2rem 4rem;
  box-sizing : border-box;

  min-width : 750px;
`;
const SearchTitle = styled.p`
  font-size: 1.4rem;
`;

const ResultBox = styled.div`
  margin-top: 100px;
  display : flex;
  flex-direction : column;
  justify-content : center;

`;
const Search = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));

  const queryString: any = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
    parameterLimit: 1,
  }).q;

  useEffect(() => {
    if (typeof queryString === "string") {
      onSetSearchText(queryString);
    }
  }, []);

  return (
    <SearchBox>
      <Header />
      <ResultBox>
        <SearchTitle>{'\''+queryString+'\' 검색 결과'}</SearchTitle>
        <FoodList searchText={queryString}/>
      </ResultBox>
    </SearchBox>
  );
};

export default Search;
