import React, { useCallback } from "react";
import styled from "styled-components";
import logo from "../images/mainlogo.png";
import { Link } from "react-router-dom";
import InputCom from "../components/InputCom";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const HomeBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LogoBox = styled.div`
  width: 460px;
  height: 240px;
  margin-bottom: 2rem;
  @media ${({ theme }) => theme.size_7} {
    width : 300px;
    height : 160px;
  }
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  /* top: 20px;
  right: 30px; */
  bottom : 20px;
  right : 30px;
  margin-top : 100px;
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
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8cf82;
    color: gray;
    padding: 0.2rem 0.8rem;
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
      <InputCom />

      <Link to="/bosung">
        <IconWrapper>
          <AiOutlineQuestionCircle />
        </IconWrapper>
      </Link>
    </HomeBox>
  );
};

export default Home;
