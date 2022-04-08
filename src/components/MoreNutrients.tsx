import React from "react";
import styled from "styled-components";
import { NutrientsInfoInterface } from "./FoodItem";
import FoodItemNutrients from "./FoodItem_Nutrients";

const GrayLine = styled.div`
  height: 1px;
  border: none;
  background-color: #dfdfdf;
  width: 100%;
  margin: 1rem 0;
`;

const MoreNutrientsBox = styled.div`
  width: 1000px;
  height: 700px;
  box-sizing: border-box;
  padding: 1rem;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #e5e5e5;

  display: flex;
  flex-direction: column;
  /* flex-grow : 1; */
`;

const HeadLabel = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

const AllNutrientsBox = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap : 1rem;
  padding : 1rem 0;
`;

const DailyNutrientsBox = styled.div`
  flex-grow: 1;
`;

interface MoreNutrientsProps {
  nutrientsInfo:NutrientsInfoInterface;
  setIsOverlayOpen: (value: React.SetStateAction<boolean>) => void;
  serving: number;
}

const MoreNutrients = ({
  nutrientsInfo,
  setIsOverlayOpen,
  serving,
}: MoreNutrientsProps) => {
  console.log(nutrientsInfo);
  return (
    <MoreNutrientsBox>
      <HeadLabel>Nutrients Information</HeadLabel>
      <GrayLine />
      <AllNutrientsBox>
          { Object.keys(nutrientsInfo).map((key : string )=>(
              <FoodItemNutrients value={nutrientsInfo[key]} />
          ))}
    
      </AllNutrientsBox>
      <HeadLabel>Daily Nutrients</HeadLabel>
      <GrayLine />

      <DailyNutrientsBox></DailyNutrientsBox>
    </MoreNutrientsBox>
  );
};

export default MoreNutrients;
