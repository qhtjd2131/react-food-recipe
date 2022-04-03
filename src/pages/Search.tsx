import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import QueryString from "qs";
import { store } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux-modules/search";
import FoodList from "../components/FoodList";
import Pagination from "../components/Pagination";

const SearchBox = styled.section`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(to bottom, white, orange); */

  padding: 2rem 4rem;
  box-sizing: border-box;
  min-width: 750px;
  justify-content: center;
  align-items: center;
`;
const SearchTitle = styled.p`
  font-size: 1.4rem;
`;

const ResultBox = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        <SearchTitle>{"'" + queryString + "' 검색 결과"}</SearchTitle>
        <FoodList searchText={queryString} />
      </ResultBox>
      <Pagination />
    </SearchBox>
  );
};

export default Search;
