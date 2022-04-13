import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { roundToTwo } from "../functions/othersFunctions";
import DefaultPageLayout from "./defaultPageLayout";

//styled-components//

const HeadLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

const IngredientsBox = styled.div``;

const IngredientsItem = styled.div``;

// const IngredientsName = styled.p``;
// const IngredientsWeight = styled.p``;
// const IngredientsQuantity = styled.p``;

////////////////////
interface StateInterface {
  recipeInfo: string;
  image : string;
  name: string;
  id: string;
  ingredients: ingredientProps[];
}
interface ingredientProps {
  food: string;
  quantity: number;
  measure: string | null;
  weight: number;
}
const Recipe = () => {
  const location = useLocation();
  const state = location.state as StateInterface;
  console.log(state);

  useEffect(() => {
    if (state === null || state.recipeInfo === undefined) {
      //api call
      console.log("state null");
    }
  }, []);

  console.log(location);
  return (
    <DefaultPageLayout>
      <HeadLabel>{state.name}</HeadLabel>

      <HeadLabel>Ingredients</HeadLabel>
      <IngredientsBox>
        {state.ingredients.map((ingredient: ingredientProps, index : number) => {
          const measuer =
            ingredient.measure === "<unit>" || !ingredient.measure
              ? "pieces"
              : ingredient.measure;
          const str =
            ingredient.quantity === 0
              ? ingredient.food +
                " " +
                "(" +
                roundToTwo(ingredient.weight) +
                "g)"
              : ingredient.food +
                " " +
                ingredient.quantity +
                measuer +
                "(" +
                roundToTwo(ingredient.weight) +
                "g)";
          return <IngredientsItem key={index}>{str}</IngredientsItem>;
        })}
      </IngredientsBox>
    </DefaultPageLayout>
  );
};

export default Recipe;
