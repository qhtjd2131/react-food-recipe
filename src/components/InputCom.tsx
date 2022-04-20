import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux-modules";
import {
  setSearchText,
  clearSearchText,
  clearExistData,
  setDataCount,
  setCurrentPageNumber,
  setNextLink,
  setFoodItems,
} from "../redux-modules/search";
import { Hit } from "./type2";

const InputBox = styled.div`
  display: flex;
  width: 33%;
  height: 2rem;
  min-width: 450px;
  border: 1px solid orange;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media ${({ theme }) => theme.size_7} {
    min-width: 300px;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 100%;
  border: none;
  font-size: 18px;
  color: gray;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px orange;
  }
`;
const ButtonBox = styled.div`
  width: 20%;
  height: 100%;
`;
const SearchButton = styled.button<{ on: string }>`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.on === "true" ? "orange" : "#d88d01")};
  color: white;

  &:hover {
    background-color: #d88d01;
  }
`;
const InputCom = () => {
  const [inputText, setInputText] = useState("");
  // input으로 받은 state 처리 필요
  const searchText: string = useSelector(
    (state: RootState) => state.searchReducer.searchText
  );

  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));
  const onSetDataCount = (count: number) => dispatch(setDataCount(count));
  const onSetCurrentPage = (page: number) =>
    dispatch(setCurrentPageNumber(page));
  const onSetNextLink = (nextLink: string) => dispatch(setNextLink(nextLink));
  const onClearSearchText = () => dispatch(clearSearchText());
  const onClearExistData = () => dispatch(clearExistData());
  const onSetFoodItems = (foodItems: Hit[][] | []) =>
    dispatch(setFoodItems(foodItems));

  const clearReducer = () => {
    onSetCurrentPage(1);
    onClearExistData();
    onSetDataCount(0);
    onSetNextLink("");
    onSetFoodItems([]);
  };
  const searchButtonClickHandler = () => {
    clearReducer();
    onSetSearchText(inputText);
  };

  const renderLink = useCallback(() => {
    if (inputText.replace(/\s/gi, "").length > 0) {
      return (
        <Link to={`/search?q=${inputText}`}>
          <SearchButton on="true" onClick={searchButtonClickHandler}>
            SEARCH
          </SearchButton>
        </Link>
      );
    } else {
      return <SearchButton on="false">SEARCH</SearchButton>;
    }
  }, [inputText]);

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);
  return (
    <InputBox>
      <Input
        placeholder="Please write english."
        onChange={(e) => {
          // onSetSearchText(e.target.value);
          setInputText(e.target.value);
        }}
      />
      <ButtonBox>{renderLink()}</ButtonBox>
    </InputBox>
  );
};

export default InputCom;
