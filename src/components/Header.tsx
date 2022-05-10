import React from "react";
import styled from "styled-components";
import LogoSVG from "../images/mainlogo.svg";
import { Link } from "react-router-dom";
import InputCom from "./InputCom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import styleVariables from "../global_style/variables";

const HeaderBox = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width : 300px;
  height: ${styleVariables.HEADER_HEIGHT};
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 2px -2px orange;
  background-color: white;
  /* border-bottom: 4mm ridge rgba(211, 220, 50, .6); */
  z-index: 990;
  @media ${({ theme }) => theme.size_5} {
    height: ${styleVariables.HEADER_HEIGHT_TWO_LINES};
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
  width: 100px;
  height: 50px;
  
  /* @media ${({ theme }) => theme.size_5} {
    height: 50px;
  } */
`;


const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  color: orange;
  font-size: 3rem;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    color: #ffd27d;
  }
  &:hover::before {
    content: "who am i";
    font-size: 1rem;
    white-space: nowrap;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8cf82;
    color: gray;
    padding: 0.2rem 0.8rem;
  }
  @media ${({ theme }) => theme.size_6} {
    display: none;
  }
`;
const Header = () => {
  return (
    <HeaderBox>
      <ContentWrapper>
        <Link to="/">
          <MiniLogoBox>
            <LogoSVG />
          </MiniLogoBox>
        </Link>
        <InputCom />

        <Link to="/bosung">
          <IconWrapper>
            <AiOutlineQuestionCircle />
          </IconWrapper>
        </Link>
      </ContentWrapper>
    </HeaderBox>
  );
};

export default Header;
