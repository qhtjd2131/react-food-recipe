import React from "react";
import styled from "styled-components";
import { GrayText } from "./FoodItem";
import { roundToTwo } from "../functions/othersFunctions";

const KcalBox = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
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
      <GrayText>{"(1인) " + foodCaloriesForServing + " kcal"}</GrayText>
    </KcalBox>
  );
};

export default FoodItemCalories;
