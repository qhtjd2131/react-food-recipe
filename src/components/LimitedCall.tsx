import React from "react";
import styled from "styled-components";

const LimitedCallBox = styled.div`
  font-size: 2rem;
`;
const LimitedCall = () => {
  return (
    <LimitedCallBox>
      <p>Network Error</p>
      <br />
      <p>데이터를 받아오는 데 실패했습니다.</p>
      <p>API CALL 호출 제한되었습니다.</p>
      <p>잠시 후 새로고침 해주세요</p>
    </LimitedCallBox>
  );
};

export default LimitedCall;

