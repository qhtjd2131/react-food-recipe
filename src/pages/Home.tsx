import React, { useCallback } from "react";
import styled from "styled-components";
import logo from "../mainlogo.png";
import { Link } from "react-router-dom";

const HomeBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoBox = styled.div`
  width: 460px;
  height: 240px;
  margin-bottom: 2rem;
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const InputBox = styled.div`
  display: flex;
  width: 33%;
  min-width: 450px;
  border: 1px solid orange;
  margin-bottom: 18rem;
`;
const Input = styled.input`
  width: 80%;
  height: 2rem;
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

const Home = () => {
  return (
    <HomeBox>
      <LogoBox>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </LogoBox>
      <InputBox>
        <Input placeholder="Please write English." />
        <ButtonBox>
          <Link to="/search">
            <SearchButton>SEARCH</SearchButton>
          </Link>
        </ButtonBox>
      </InputBox>
    </HomeBox>
  );
};

export default Home;
