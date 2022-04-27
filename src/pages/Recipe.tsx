import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { LoadingBox } from "../components/FoodList";
import { roundToTwo } from "../functions/othersFunctions";
import DefaultPageLayout from "./DefaultPageLayout";
import QueryString from "qs";
import { getRecipeFromId } from "../functions/apiCall";
import { getIngredients } from "../components/FoodItem";
import { store } from "..";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { setIsLimitedCall } from "../redux-modules/search";

//styled-components//

const RecipeBox = styled.div`
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;\
display :inline-block;
box-sizing : border-box;
padding : 1.4rem 4.4rem;
padding-top : 0;
margin-top : 1rem;
width : 800px;
@media ${({ theme }) => theme.size_9} {
    width: 700px;
  }
  
@media ${({ theme }) => theme.size_8} {
    width: 600px;
  }
  @media ${({ theme }) => theme.size_7} {
    width: 500px;
  }
  @media ${({ theme }) => theme.size_6} {
    width: 400px;
    padding : 1rem 1rem;
  }
  

`;
const HeadLabel = styled.p`
  padding-top: 2.4rem;
  padding-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;
const NameLabel = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  color: gray;
  padding: 1rem 0;
`;
const FoodImage = styled.img<{ isOnLoadedImage: boolean }>`
  width: 300px;
  height: 300px;
  display: none;

  ${(props) =>
    props.isOnLoadedImage &&
    css`
      display: block;
    `}

  @media ${({ theme }) => theme.size_6} {
    width: 240px;
    height: 240px;
  }
`;

const LoadingImage = styled.img<{ isOnLoadedImage: boolean }>`
  width: 300px;
  height: 300px;
  min-width: 300px;
  min-height: 300px;
  background-color: #e5e5e5;
  display: block;

  ${(props) =>
    props.isOnLoadedImage &&
    css`
      display: none;
    `}
`;

const IngredientsBox = styled.div``;

const IngredientsItem = styled.div`
  padding: 0.4rem 0;
`;

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
  const [isOnLoadedImage, setIsOnLoadedImage] = useState(false);
  const location = useLocation();
  const state = location.state as StateInterface;
  const [isLoading, setIsLoading] = useState(() => {
    return state === null ? true : false;
  });

  const dispatch = useDispatch();
  const onSetIsLimitedCall = (bool: boolean) =>
    dispatch(setIsLimitedCall(bool));

  const [data, setData] = useState<StateInterface>(() => {
    if (state != null) {
      return {
        recipeInfo: state.recipeInfo,
        image: state.image,
        name: state.name,
        id: state.id,
        ingredients: state.ingredients,
      };
    } else {
      return {
        recipeInfo: [],
        image: "",
        name: "",
        id: "",
        ingredients: [
          {
            food: "",
            quantity: 0,
            measure: "",
            weight: 0,
          },
        ],
      };
    }
  });

  const getData = async (id: string) => {
    await getRecipeFromId(id)
      .then((res) => {
        setData({
          recipeInfo: res.recipe.ingredientLines,
          image: res.recipe.image,
          name: res.recipe.label,
          id: id,
          ingredients: getIngredients(res.recipe.ingredients),
        });
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          onSetIsLimitedCall(true);
        }
      });
  };
  useEffect(() => {
    if (state === null || state.recipeInfo === undefined) {
      //api call
      const queryString: any = QueryString.parse(location.search, {
        ignoreQueryPrefix: true,
        parameterLimit: 1,
      }).id;
      getData(queryString);
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data.id.length > 4) {
      setIsLoading(false);
    }
  }, [data]);

  const renderIngredients = () => {
    return (
      <IngredientsBox>
        {data.ingredients.map((ingredient: ingredientProps, index: number) => {
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
    return data.recipeInfo.map((recipe_str: string, index: number) => (
      <RecipeLabel key={index}>{recipe_str}</RecipeLabel>
    ));
  };

  return isLoading ? (
    <DefaultPageLayout>
      <LoadingBox>
        <Loading />
      </LoadingBox>
    </DefaultPageLayout>
  ) : (
    <DefaultPageLayout>
      {/* <button
        onClick={() => {
          console.log(store.getState());
        }}
      >
        button
      </button> */}
      <RecipeBox>
        <HeadLabel>Food Infos</HeadLabel>
        <NameLabel>{data.name}</NameLabel>
        <FoodImage
          src={data.image}
          alt=""
          isOnLoadedImage={isOnLoadedImage}
          onLoad={() => {
            setIsOnLoadedImage(true);
          }}
        />
        <LoadingImage isOnLoadedImage={isOnLoadedImage} />
        <HeadLabel>Ingredients</HeadLabel>
        {renderIngredients()}

        <HeadLabel>Recipe</HeadLabel>
        {renderRecipe()}
      </RecipeBox>
    </DefaultPageLayout>
  );
};

export default Recipe;
