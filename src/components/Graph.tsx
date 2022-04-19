import React from "react";
import styled from "styled-components";
import { NutrientsInfoInterface } from "./FoodItem";
import { roundToTwo } from "../functions/othersFunctions";


const GRAPH_LABEL_TEXT = "1인분 섭취 / 일 섭취 권장량";

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
  margin-bottom: 3rem;
`;

const GraphBox = styled.ul`
  width: 100%;
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

  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05, 1.2);
  }
`;
const GuidItem = styled.li`
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
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  font-weight: 600;
  font-size: 1rem;
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
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FrontLine = styled.div<{ percentage: number; color: string }>`
  width: ${(props) => props.percentage && props.percentage + "%"};
  height: 100%;
  border-radius: inherit;
  background-color: ${(props) =>
    props.color === "#ff7c7c" ? "#ff7c7c" : "#ffd07a"};
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
`;

const Blank = styled.div`
  display: block;
  width: 100%;
  min-height: 3rem;
`;

const PercentageText = styled.p<{ color: string }>`
  margin: 0 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${(props) => props.color && props.color};
`;

const GuidePercent100 = styled(GuidePercent0)`
  left: 33.33%;
`;
const GuidePercent200 = styled(GuidePercent0)`
  left: 66.66%;
`;
const GuidePercent300 = styled(GuidePercent0)`
  left: 100%;
`;
const GuidePercent400 = styled(GuidePercent0)`
  left: 80%;
`;
const GuidePercent500 = styled(GuidePercent0)`
  left: 100%;
`;

//** 컴 포 넌 트 **//

// 그래프 HEAD 라벨 컴포넌트
const GraphName = () => {
  return <GraphLabel>{GRAPH_LABEL_TEXT}</GraphLabel>;
};

// 그래프 퍼센트 그래픽 컴포넌트
interface GraphLineProps {
  percentage: number;
  serving: number;
}
const GraphLine = ({ percentage, serving }: GraphLineProps) => {
  const percentageForServing = roundToTwo(percentage / serving);
  const percentageWidth = roundToTwo(percentageForServing / 3);
  const color = percentageForServing > 100 ? "#ff7c7c" : "gray";
  return (
    <PercentageLine>
      <BackLine>
        <FrontLine percentage={percentageWidth} color={color} />
        <PercentageText color={color}>
          {percentageForServing + "%"}
        </PercentageText>
      </BackLine>
    </PercentageLine>
  );
};

// 가장 윗줄 가이드 아이템 컴포넌트
const GuideItem = () => {
  return (
    <GuidItem>
      <ItemText>text</ItemText>
      <GuideLine>
        <GuidePercent0>0</GuidePercent0>
        <GuidePercent100>100%</GuidePercent100>
        <GuidePercent200>200%</GuidePercent200>
        <GuidePercent300>300%</GuidePercent300>
        {/* <GuidePercent400>400%</GuidePercent400>
        <GuidePercent500>500%</GuidePercent500> */}
      </GuideLine>
    </GuidItem>
  );
};

// 그래프 아이템 컴포넌트
interface GraphItemsProps {
  nutrientsInfo: NutrientsInfoInterface;
  serving: number;
}
const GraphItems = ({ nutrientsInfo, serving }: GraphItemsProps) => {
  return (
    <>
      {Object.keys(nutrientsInfo)
        .filter((key) => nutrientsInfo[key].dailyPercent >= 0)
        .map((key: string, idx) => (
          <GraphItem key={idx}>
            <ItemText>{nutrientsInfo[key].krText}</ItemText>
            <GraphLine
              percentage={nutrientsInfo[key].dailyPercent}
              serving={serving}
            />
          </GraphItem>
        ))}
    </>
  );
};

//TO DO LIST
// 1. 일일권장량 퍼센테이지 props 로 데이터 전달 후 컴포넌트 완성   OK
//  => nutrientsInfo, serving 등 props는 각 컴포넌트마다 독립적으로 존재한다. 이를 redux를 사용하여 해결 할 수 있나?
//  ans : redux의 강력한 기능은 전역 state관리에서 발생한다.  하지않아도 된다.
//        굳이 해결을 하려면 모든 데이터를 redux state에 올려서 사용할 수 있다.


// 2. overlay 컴포넌트 등장 시 scroll hidden으로 스크롤 방지 OK
// 3. overlay 바깥부분을 클릭하면 닫히게 구현  OK
// 4. MoreNutrients 컴포넌트에 닫기 버튼 추가  OK
// 5. GraphBox 작은 컴포넌트로 분리 OK

// 
// 6. 반응형 구현
// 7. 조리방법 페이지 구현 (구상 필요)
// 8. 

// 영양정보 close 버튼 오류 
// 뒤로가기 시 데이터가 잇음에도 apicall 하는 현상 


interface GraphProps {
  nutrientsInfo: NutrientsInfoInterface;
  serving: number;
}
const Graph = ({ nutrientsInfo, serving }: GraphProps) => {
  return (
    <GraphContentsWrapper>
      <GraphName />
      <GraphBox>
        <GuideItem />
        <Blank />
        <GraphItems nutrientsInfo={nutrientsInfo} serving={serving} />
      </GraphBox>
    </GraphContentsWrapper>
  );
};

export default Graph;
