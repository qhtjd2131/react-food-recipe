import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const InputBox = styled.div`
  width: 500px;
  min-width: 230px;
  height: 2rem;
  display: flex;

  @media ${({ theme }) => theme.size_8} {
    width: 350px;
  }
  @media ${({ theme }) => theme.size_5} {
    width: 280px;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 100%;
  border: none;
  border-radius: 0px;
  font-size: 18px;
  color: gray;
  border: 1px solid orange;

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
  border: ${(props) =>
    props.on === "true" ? "1px solid orange" : "1px solid #d88d01"};
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
  const navigation = useNavigate();
  const inputRef: any = useRef();

  const searchButtonClickHandler = () => {
    setInputText("");
    inputRef.current.value = "";
  };

  const enterPressHandler = () => {
    searchButtonClickHandler();
    navigation(`/search?q=${inputText}`);
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

  return (
    <InputBox>
      <Input
        ref={inputRef}
        placeholder="Please write english."
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputText.length > 0) {
            enterPressHandler();
          }
        }}
      />
      <ButtonBox>{renderLink()}</ButtonBox>
    </InputBox>
  );
};

export default InputCom;
