import React from "react";
import styled from "styled-components";
import { roundToTwo, GrayLabel } from "./FoodItem";

const KcalBox = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 0;
  
`;

interface FICaloriesProps {
  foodTotalCalories: number;
  foodCaloriesForServing: number;
}
const FoodItemCalories = ({
  foodTotalCalories,
  foodCaloriesForServing,
}: FICaloriesProps) => {
  return (
    <KcalBox>
      {roundToTwo(foodTotalCalories) + " kcal"}
      <GrayLabel>{"(1인) " + foodCaloriesForServing + " kcal"}</GrayLabel>
    </KcalBox>
  );
};

export default FoodItemCalories;
