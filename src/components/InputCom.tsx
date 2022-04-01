import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux-modules";
import { setSearchText, clearSearchText } from "../redux-modules/search";

const InputBox = styled.div`
  display: flex;
  width: 33%;
  height: 2rem;
  min-width: 450px;
  border: 1px solid orange;
  justify-content: center;
  align-items: center;
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
  // input으로 받은 state 처리 필요
  const searchText: string = useSelector(
    (state: RootState) => state.searchReducer.searchText
  );

  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));
  const onClearSearchText = () => dispatch(clearSearchText());

  const linkRender = () => {
    if (searchText.replace(/\s/gi, "").length > 0) {
      return (
        <Link to={`/search?q=${searchText}`}>
          <SearchButton
            on="true"
            onClick={() => {
              console.log("검색어 :", searchText);
            }}
          >
            SEARCH
          </SearchButton>
        </Link>
      );
    } else {
      return <SearchButton on="false">SEARCH</SearchButton>;
    }
  };
  return (
    <InputBox>
      <Input
        placeholder="Please write english."
        onChange={(e) => {
          onSetSearchText(e.target.value);
        }}
      />
      <ButtonBox>{linkRender()}</ButtonBox>
    </InputBox>
  );
};

export default InputCom;
