import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrRefresh } from "react-icons/gr";
const LimitedCallBox = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  font-size: 1.8rem;
`;

const SubText = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const RefreshButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  font-size: 4rem;
  padding: 1.4rem;

  border-radius: 50%;
  margin-top: 1rem;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const LimitedCall = () => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate(0);
  };
  return (
    <LimitedCallBox>
      <MainText>
        <p>Network Error</p>
      </MainText>
      <br />
      <SubText>
        <p>데이터를 받아오는 데 실패했습니다.</p>
        <p>API CALL 호출 제한되었습니다.</p>
        <p>잠시 후 새로고침 해주세요</p>
      </SubText>
      <RefreshButton>
        <IconWrapper>
          <GrRefresh onClick={buttonClickHandler} />
        </IconWrapper>
      </RefreshButton>
    </LimitedCallBox>
  );
};

export default LimitedCall;
