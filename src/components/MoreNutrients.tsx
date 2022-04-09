import React, { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsidClick";
import { NutrientsInfoInterface } from "./FoodItem";
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
  width: 1000px;
  min-width : 1000px;
  height: 700px;
  box-sizing: border-box;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;

  overflow-y : scroll;
`;

const HeadLabel = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const AllNutrientsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  gap : 1rem;
  padding: 1rem 0;
`;

const DailyNutrientsBox = styled.div`
`;

interface MoreNutrientsProps {
  nutrientsInfo: NutrientsInfoInterface;
  setIsOverlayOpen: (value: React.SetStateAction<boolean>) => void;
  serving: number;
  ref? : React.MutableRefObject<null>;
}

const MoreNutrients = ({
  nutrientsInfo,
  setIsOverlayOpen,
  serving,
}: MoreNutrientsProps) => {
  console.log(nutrientsInfo);

    const moreNutRef = useRef(null);
    useOutsideClick(moreNutRef, ()=>{
        setIsOverlayOpen(false);
    });


  return (
    <MoreNutrientsBox ref={moreNutRef}>
      {/* 영양소 포함 정보 */}
      <HeadLabel>Nutrients Information</HeadLabel>
      <GrayLine />
      <AllNutrientsBox>
        {Object.keys(nutrientsInfo).map((key: string, index : number) => (
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
