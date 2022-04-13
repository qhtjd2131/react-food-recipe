import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { roundToTwo } from "../functions/othersFunctions";
import DefaultPageLayout from "./DefaultPageLayout";

//styled-components//

const HeadLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;
const NameLabel = styled.p``;
const FoodImage = styled.img`
  width: 600px;
  height: 600px;
  border: 1px solid black;
`;
const IngredientsBox = styled.div``;

const IngredientsItem = styled.div`
  padding: 0.4rem 0;
`;

// const IngredientsName = styled.p``;
// const IngredientsWeight = styled.p``;
// const IngredientsQuantity = styled.p``;

const RecipeLabel = styled.p`
  padding: 0.4rem 0;
`;

////////////////////
interface StateInterface {
  recipeInfo: string[];
  image: string;
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

  const renderIngredients = () => {
    return (
      <IngredientsBox>
        {state.ingredients.map((ingredient: ingredientProps, index: number) => {
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
                " " +
                measuer +
                " " +
                "(" +
                roundToTwo(ingredient.weight) +
                "g)";
          return <IngredientsItem key={index}>{str}</IngredientsItem>;
        })}
      </IngredientsBox>
    );
  };

  const renderRecipe = () => {
    return state.recipeInfo.map((recipe_str: string, index: number) => (
      <RecipeLabel key={index}>{recipe_str}</RecipeLabel>
    ));
  };
  return (
    <DefaultPageLayout>
      <HeadLabel>Food Infos</HeadLabel>
      <NameLabel>{state.name}</NameLabel>
      <FoodImage src={state.image} alt="" />

      <HeadLabel>Ingredients</HeadLabel>
      {renderIngredients()}

      <HeadLabel>Recipe</HeadLabel>
      {renderRecipe()}
    </DefaultPageLayout>
  );
};

export default Recipe;
