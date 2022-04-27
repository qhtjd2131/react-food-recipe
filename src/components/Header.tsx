import React from "react";
import styled from "styled-components";
import logo from "../images/mainlogo.png";
import { Link } from "react-router-dom";
import InputCom from "./InputCom";

const HeaderBox = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 4px orange;
  background-color: white;
  z-index : 999;
  @media ${({ theme }) => theme.size_5} {
    height: 160px;
    min-width : 400px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 2000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.size_5} {
    flex-direction: column;
    justify-content: center;
  }
`;
const MiniLogoBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size_5} {
    height: 80px;
  }
`;

const MiniLogo = styled.img`
  width: 100px;
`;

const Header = () => {
  return (
    <HeaderBox>
      <ContentWrapper>
        <MiniLogoBox>
          <Link to="/">
            <MiniLogo src={logo} />
          </Link>
        </MiniLogoBox>
        <InputCom />
      </ContentWrapper>
    </HeaderBox>
  );
};

export default Header;
