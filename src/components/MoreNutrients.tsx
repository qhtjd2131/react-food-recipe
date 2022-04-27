import React, { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsidClick";
import { NutrientsInfoInterface } from "./FoodItem";
import { GrClose } from "react-icons/gr";
import FoodItemNutrients from "./Nutrients_Nutrients";
import Graph from "./Graph";

const GrayLine = styled.div`
  min-height: 1px;
  border: none;
  background-color: #dfdfdf;
  width: 100%;
  margin: 1rem 0;
  box-sizing: content-box;
`;

const MoreNutrientsBox = styled.div`
  position: relative;
  width: 1000px;
  min-width: 1000px;
  height: 700px;
  box-sizing: border-box;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  @media ${({ theme }) => theme.size_11} {
    width: 700px;
    min-width: 700px;
  }
  @media ${({ theme }) => theme.size_8} {
    width: 500px;
    min-width: 500px;
  }
  @media ${({ theme }) => theme.size_6} {
    width: 340px;
    min-width: 340px;
  }
`;

const HeadLabel = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const AllNutrientsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  gap: 1rem;
  padding: 1.5rem 0;
  @media ${({ theme }) => theme.size_11} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.size_8} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.size_6} {
    grid-template-columns: 1fr;
  }
`;

const HeadLabel2 = styled(HeadLabel)`
  display: block;
  margin-top: 2.5rem;
  @media ${({ theme }) => theme.size_6} {
    display: none;
  }
`;
const DailyNutrientsBox = styled.div`
  display: block;
  @media ${({ theme }) => theme.size_6} {
    display: none;
  }
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 1rem;
  margin: 1rem;
  border: none;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
    transform: scale(1.4);
  }
`;

// 컴 포 넌 트 //

const NutrientsInfoHeadLabel = () => {
  return (
    <>
      <HeadLabel>Nutrients Information</HeadLabel>
      <GrayLine />
    </>
  );
};

const DailyNutrientsHeadLabel = () => {
  return (
    <>
      <HeadLabel2>Daily Nutrients</HeadLabel2>
      <GrayLine />
    </>
  );
};

const renderAllNutrientsInfo = (nutrientsInfo: NutrientsInfoInterface) => {
  return (
    <>
      <NutrientsInfoHeadLabel />
      <AllNutrientsBox>
        {Object.keys(nutrientsInfo).map((key: string, index: number) => (
          <FoodItemNutrients value={nutrientsInfo[key]} key={index} />
        ))}
      </AllNutrientsBox>
    </>
  );
};

const renderDailyNutrientsInfo = (
  nutrientsInfo: NutrientsInfoInterface,
  serving: number
) => {
  return (
    <>
      <DailyNutrientsHeadLabel />
      <DailyNutrientsBox>
        <Graph nutrientsInfo={nutrientsInfo} serving={serving} />
      </DailyNutrientsBox>
    </>
  );
};

interface MoreNutrientsProps {
  nutrientsInfo: NutrientsInfoInterface;
  setIsOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  serving: number;
}

const MoreNutrients = ({
  nutrientsInfo,
  setIsOpenOverlay,
  serving,
}: MoreNutrientsProps) => {
  const moreNutRef = useRef(null);
  const onSetIsOverlayState = (bool: boolean) => {
    setIsOpenOverlay(bool);
  };

  useOutsideClick(moreNutRef, () => {
    onSetIsOverlayState(false);
  });

  return (
    <MoreNutrientsBox ref={moreNutRef}>
      <CloseButtonWrapper
        onClick={() => {
          onSetIsOverlayState(false);
        }}
      >
        <GrClose />
      </CloseButtonWrapper>
      {/* 영양소 포함 정보 */}
      {renderAllNutrientsInfo(nutrientsInfo)}

      {/* 일 섭취 영양소 정보 */}
      {renderDailyNutrientsInfo(nutrientsInfo, serving)}
    </MoreNutrientsBox>
  );
};

export default MoreNutrients;
