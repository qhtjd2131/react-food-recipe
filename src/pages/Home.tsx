import React from "react";
import styled from "styled-components";
import LogoSvg from "../images/mainlogo.svg";
import { Link } from "react-router-dom";
import InputCom from "../components/InputCom";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const HomeBox = styled.section`
  width: 100%;
  /* height: 100vh; */
  height : calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LogoBox = styled.div`
  width: 460px;
  height: 240px;
  @media ${({ theme }) => theme.size_7} {
    width : 300px;
    height : 160px;
  }
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
          <LogoSvg />
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
