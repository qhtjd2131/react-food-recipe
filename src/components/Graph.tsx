import React from "react";
import styled from "styled-components";

const GraphContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
`;

const GraphLabel = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const GraphBox = styled.ul`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const GraphItem = styled.li`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.p`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PercentageLine = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackLine = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  border-radius: 15px;
`;
const FrontLine = styled.div`
  width: 50%;
  height: 100%;
  border-radius: inherit;
  background-color: #ffd07a;
`;

const GuideLine = styled.div`
  flex-grow: 1;
  height: 6px;
  background-color: #dfdfdf;
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
`;

const GuidePercent0 = styled.div`
  position: absolute;
  left: 0%;
  top: 50%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #ffd07a;
  transform: translate(-25px, -50%);
  color: white;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  /* transform : translateY(-50%); */
`;

const Blank = styled.div`
  width: 100%;
  height: 2rem;
`;

const GuidePercent100 = styled(GuidePercent0)`
  left: 20%;
`;
const GuidePercent200 = styled(GuidePercent0)`
  left: 40%;
`;
const GuidePercent300 = styled(GuidePercent0)`
  left: 60%;
`;
const GuidePercent400 = styled(GuidePercent0)`
  left: 80%;
`;
const GuidePercent500 = styled(GuidePercent0)`
  left: 100%;
`;
// 그래프 HEAD 라벨 컴포넌트
const GraphName = () => {
  return <GraphLabel>graph label</GraphLabel>;
};

// 그래프 퍼센트 그래픽 컴포넌트
const GraphLine = () => {
  return (
    <PercentageLine>
      <BackLine>
        <FrontLine />
      </BackLine>
    </PercentageLine>
  );
};

const Graph = () => {
  return (
    <GraphContentsWrapper>
      <GraphName />
      <GraphBox>
        <GraphItem>
          <ItemText>text</ItemText>
          <GuideLine>
            <GuidePercent0>0</GuidePercent0>
            <GuidePercent100>100%</GuidePercent100>
            <GuidePercent200>200%</GuidePercent200>
            <GuidePercent300>300%</GuidePercent300>
            <GuidePercent400>400%</GuidePercent400>
            <GuidePercent500>500%</GuidePercent500>
          </GuideLine>
        </GraphItem>
        <Blank />
        <GraphItem>
          <ItemText>text1</ItemText>
          <GraphLine />
        </GraphItem>
        <GraphItem>
          <ItemText>text2</ItemText>
          <GraphLine />
        </GraphItem>
      </GraphBox>
    </GraphContentsWrapper>
  );
};

export default Graph;
