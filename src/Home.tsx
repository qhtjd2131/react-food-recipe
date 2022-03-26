import React from "react";
import styled from "styled-components";

const HomeBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  display: flex;
  width: 33%;
  min-width: 450px;
  border: 1px solid orange;
`;
const Input = styled.input`
  width: 80%;
  height: 2rem;
  border: none;
  font-size: 24px;
  color : gray;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px orange;
  }
`;
const ButtonBox = styled.div`
  width: 20%;
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

  &:hover{
    background-color : #d88d01;
  }
`;

const Home = () => {
  return (
    <HomeBox>
      <InputBox>
        <Input />
        <ButtonBox>
          <SearchButton
            placeholder="Please write English."
          >
            SEARCH
          </SearchButton>
        </ButtonBox>
      </InputBox>
    </HomeBox>
  );
};

export default Home;
