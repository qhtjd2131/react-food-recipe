import React from "react";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { BlackLabel } from "./FoodItem";

const NutrientsItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IconWithText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NIcon = styled.div`
  color: ${(props) => props.color && props.color};
`;

export const NetrientsIcon = ({ color = "black" }: { color: string }) => {
  return (
    <NIcon color={color}>
      <GoPrimitiveDot />
    </NIcon>
  );
};

interface FINutrinetsProps {
  nutText: string;
  value: string;
}
const FoodItemNutrients = ({ nutText, value }: FINutrinetsProps) => {
  let color;
  switch (nutText) {
    case "탄수화물":
      color = "red";
      break;
    case "단백질":
      color = "green";
      break;
    case "지방":
      color = "orange";
      break;
    case "당":
      color = "gray";
      break;
    default:
      color = "gray";
      break;
  }
  return (
    <NutrientsItem>
      <IconWithText>
        <NetrientsIcon color={color} />
        <BlackLabel>{nutText}</BlackLabel>
      </IconWithText>
      <BlackLabel>{value}</BlackLabel>
    </NutrientsItem>
  );
};

export default FoodItemNutrients;
