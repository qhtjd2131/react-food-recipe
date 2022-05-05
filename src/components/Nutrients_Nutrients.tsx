import React from "react";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { BlackText } from "./FoodItem";

const NutrientsItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  @media ${({ theme }) => theme.size_5} {
    font-size: 0.8rem;
  }
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
  value: { krText: string; value: string };
}
const FoodItemNutrients = ({ value }: FINutrinetsProps) => {
  let color;
  switch (value.krText) {
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
        <BlackText>{value.krText}</BlackText>
      </IconWithText>
      <BlackText>{value.value}</BlackText>
    </NutrientsItem>
  );
};

export default FoodItemNutrients;
