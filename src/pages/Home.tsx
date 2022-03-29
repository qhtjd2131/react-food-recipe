import React, { useCallback } from "react";
import styled from "styled-components";
import logo from "../mainlogo.png";
import { Link } from "react-router-dom";
import InputCom from "../components/InputCom";

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



const Home = () => {
  return (
    <HomeBox>
      <LogoBox>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </LogoBox>
      <InputCom />
    </HomeBox>
  );
};

export default Home;
