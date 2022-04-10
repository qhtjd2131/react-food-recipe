import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsidClick";
import { NutrientsInfoInterface } from "./FoodItem";
import { GrClose } from "react-icons/gr";
import FoodItemNutrients from "./FoodItem_Nutrients";
import Graph from "./Graph";

const GrayLine = styled.div`
  height: 1px;
  border: none;
  background-color: #dfdfdf;
  width: 100%;
  margin: 1rem 0;
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
  padding: 1rem 0;
`;

const DailyNutrientsBox = styled.div``;

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

interface MoreNutrientsProps {
  nutrientsInfo: NutrientsInfoInterface;
  setIsOpenOverlay: (boolean: boolean) => void;
  serving: number;
}

const MoreNutrients = ({
  nutrientsInfo,
  setIsOpenOverlay,
  serving,
}: MoreNutrientsProps) => {

  const moreNutRef = useRef(null);
  const onSetIsOverlayState = (bool: boolean) => setIsOpenOverlay(bool);

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
      <HeadLabel>Nutrients Information</HeadLabel>
      <GrayLine />
      <AllNutrientsBox>
        {Object.keys(nutrientsInfo).map((key: string, index: number) => (
          <FoodItemNutrients value={nutrientsInfo[key]} key={index} />
        ))}
      </AllNutrientsBox>

      {/* 일 섭취 영양소 정보 */}
      <HeadLabel>Daily Nutrients</HeadLabel>
      <GrayLine />

      <DailyNutrientsBox>
        <Graph nutrientsInfo={nutrientsInfo} serving={serving} />
      </DailyNutrientsBox>
    </MoreNutrientsBox>
  );
};

export default MoreNutrients;
