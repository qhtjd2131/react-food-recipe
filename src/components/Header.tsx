import React from "react";
import styled from "styled-components";
import logo from "../mainlogo.png";
import { Link } from "react-router-dom";
import InputCom from "./InputCom";

const HeaderBox = styled.section`
  position: fixed;
  top : 0;
  left : 0;
  width: 100%;
  height: 100px;
  display : flex;
  justify-content : center;
  /* align-items:center; */
  box-shadow : 0 0 4px orange;
  background-color : white;
`;

const ContentWrapper = styled.div`
  max-width: 2000px;
  
  display: flex;
  justify-content: space-between;
  align-items : center;
`;
const MiniLogoBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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