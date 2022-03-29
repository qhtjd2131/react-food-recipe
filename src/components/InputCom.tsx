import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
const SearchButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: orange;
  color: white;

  &:hover {
    background-color: #d88d01;
  }
`;
const InputCom = () => {
  return (
    <InputBox>
      <Input placeholder="Please write English." />
      <ButtonBox>
        <Link to="/search">
          <SearchButton>SEARCH</SearchButton>
        </Link>
      </ButtonBox>
    </InputBox>
  );
};

export default InputCom;
