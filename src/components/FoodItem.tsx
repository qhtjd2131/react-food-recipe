import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Hit, Ingredient } from "./type2";
import { IoMdPerson } from "react-icons/io";
import FoodItemNutrients from "./Nutrients_Nutrients";
import FoodItemCalories from "./Nutrients_Calories";
import Overlay from "./Overlay";
import MoreNutrients from "./MoreNutrients";
import { Link } from "react-router-dom";
import { roundToTwo } from "../functions/othersFunctions";

const ItemBox = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  gap: 1rem;
  padding: 1rem;
  margin : 1rem 0;
  align-items: flex-start;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #e5e5e5;
  }
  @media ${({ theme }) => theme.size_10} {
    display: grid;
    overflow: hidden;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "image nutrients"
      "description description";
    align-items: center;
    justify-items: center;
  }
`;

const Image = styled.img<{ isOnLoaded: boolean }>`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: image;

  ${(props) =>
    !props.isOnLoaded &&
    css`
      display: none;
    `}

  @media ${({ theme }) => theme.size_5} {
    width: 160px;
    height: 160px;
  }
`;

const LoadingImage = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: image;
  @media ${({ theme }) => theme.size_5} {
    min-width: 160px;
    min-height: 160px;
  }
`;

const DescriptionBox = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  grid-area: description;
  cursor: pointer;
  border: 1px solid transparent;
  overflow: hidden;
  transition: 0.2 ease-in-out;

  &:hover {
    box-shadow: 0px 0px 3px 2px #ffbd43;
  }

  @media ${({ theme }) => theme.size_10} {
    height: auto;
  }
  @media ${({ theme }) => theme.size_5} {
    display : none;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Name = styled.p`
  font-size: 1.6rem;
`;

const NutrientsBox = styled.div`
  max-width: 320px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid transparent;
  padding: 0.4rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  grid-area: nutrients;
  transition: 0.2 ease-in-out;
    cursor : pointer;

  @media ${({ theme }) => theme.size_10} {
    height: auto;
  }
    
  

  

  &:hover {
    box-shadow: 0px 0px 3px 2px #ffbd43;
  }
`;
const MainNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
  cursor : pointer;
`;

export const BlackText = styled.p`
  font-weight: 600;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GrayText = styled.p`
  color: gray;
  font-weight: 500;
`;

const NeedsBox = styled.div`
  width: 100%;
  display: flex;
  /* white-space : nowrap; */
  padding-top: 0.8rem;
  flex-wrap: wrap;
  overflow: hidden;

`;

const NeedsTag = styled.div`
  border-radius: 12px;
  border: none;
  background-color: inherit;
  color: gray;
  box-sizing: border-box;
  height: 25.6px;
  padding: 0.4rem;
  font-weight: 500;
  
  &::before {
    content: "| ";
  }
`;

const PersonIconBox = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  margin-top : 0.4rem;
`;

const HeadContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CuisineTypeBox = styled.div`
  display: flex;
`;
const CuisineType = styled.p`
  font-weight: 600;
  padding-right: 0.4rem;
`;

export const PersonIcon = ({ personCount = 0 }: { personCount: number }) => {
  const arr_temp = new Array(personCount).fill(0);

  return (
    <PersonIconBox>
      {arr_temp.map((_, idx) => (
        <IoMdPerson key={idx}></IoMdPerson>
      ))}
      <p style={{ marginLeft: "0.3rem" }}> {personCount + "???"}</p>
    </PersonIconBox>
  );
};

interface FoodItemProps {
  foodinfo: Hit;
}
export interface NutrientsInfoInterface {
  [key: string]: { krText: string; value: string; dailyPercent: number };
}
export const getFoodId = (uri: string): string => {
  const split_temp = uri.split("#");
  return split_temp[split_temp.length - 1];
};
export const getIngredients = (ingredients: Ingredient[]) => {
  return ingredients.map(
    (ingred: {
      quantity: number;
      measure: null | string;
      food: string;
      weight: number;
    }) => {
      return {
        food: ingred.food,
        quantity: ingred.quantity,
        measure: ingred.measure,
        weight: ingred.weight,
      };
    }
  );
};
const FoodItem = ({ foodinfo }: FoodItemProps) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isOnLoaded, setIsOnLoaded] = useState(false);

  const foodInfo: Hit = foodinfo;
  const foodName = foodInfo.recipe.label;

  //?????????
  const foodId = getFoodId(foodInfo.recipe.uri);

  //?????????
  const foodImage_s = foodInfo.recipe.images.THUMBNAIL.url;
  const foodImage_m = foodInfo.recipe.images.SMALL.url;
  const foodImage_l = foodInfo.recipe.image;
  //????????????
  const foodTotalCalories = foodInfo.recipe.calories;
  //n??????
  const serving = foodInfo.recipe.yield;
  //1?????? ?????????
  const foodCaloriesForServing = roundToTwo(foodTotalCalories / serving);
  //??? ???????????? + ??????????????? ??????????????? ??????
  const totalNutrients = foodInfo.recipe.totalNutrients;
  const nutrientsInfo: NutrientsInfoInterface = {};
  Object.keys(totalNutrients).forEach((nut) => {
    const label = totalNutrients[nut].label;
    const quantity = roundToTwo(totalNutrients[nut].quantity);
    const unit = totalNutrients[nut].unit;
    const dailyPercent = roundToTwo(foodinfo.recipe.totalDaily[nut]?.quantity);
    let kr_label = "";
    switch (label) {
      case "Carbs":
        kr_label = "????????????";
        break;
      case "Fat":
        kr_label = "??????";
        break;
      case "Trans":
        kr_label = "???????????????";
        break;
      case "Sugars":
        kr_label = "???";
        break;
      case "Protein":
        kr_label = "?????????";
        break;
      case "Cholesterol":
        kr_label = "???????????????";
        break;
      case "Calcium":
        kr_label = "??????";
        break;
      case "Magnesium":
        kr_label = "????????????";
        break;
      case "Potassium":
        kr_label = "??????";
        break;
      case "Iron":
        kr_label = "??????";
        break;
      case "Zinc":
        kr_label = "??????";
        break;
      case "Phosphorus":
        kr_label = "???";
        break;
      case "Saturated":
        kr_label = "????????????";
        break;
      case "Sodium":
        kr_label = "?????????";
        break;
      case "Vitamin A":
        kr_label = "?????????A";
        break;
      case "Vitamin C":
        kr_label = "?????????C";
        break;
      case "Thiamin (B1)":
        kr_label = "?????????B1";
        break;
      case "Riboflavin (B2)":
        kr_label = "?????????B2";
        break;
      case "Niacin (B3)":
        kr_label = "?????????B3";
        break;
      case "Vitamin B6":
        kr_label = "?????????B6";
        break;
      case "Folate equivalent (total)":
        kr_label = "??????(???)";
        break;
      case "Folate (food)":
        kr_label = "????????????";
        break;
      case "Folic acid":
        kr_label = "????????????";
        break;
      case "Vitamin B12":
        kr_label = "?????????B12";
        break;
      case "Vitamin D":
        kr_label = "?????????D";
        break;
      case "Vitamin E":
        kr_label = "?????????E";
        break;
      case "Vitamin K":
        kr_label = "?????????K";
        break;
      case "Sugar alcohol":
        kr_label = "????????????";
        break;
      case "Water":
        kr_label = "???";
        break;
      case "Sugars, added":
        kr_label = "?????????";
        break;
      case "Fiber":
        kr_label = "?????????";
        break;
      case "Carbohydrates (net)":
        kr_label = "?????????";
        break;
      case "Polyunsaturated":
        kr_label = "?????????????????????";
        break;
      case "Monounsaturated":
        kr_label = "?????????????????????";
        break;
      case "ENERC_KCAL":
        kr_label = "?????????";
        break;
      default:
        kr_label = label;
        break;
    }

    nutrientsInfo[label] = {
      krText: kr_label,
      value: quantity + unit,
      dailyPercent: dailyPercent,
    };
  });

  //?????? ?????? ?????? arr
  const cuisineType = foodInfo.recipe.cuisineType;

  //???????????? ????????????
  const needs = getIngredients(foodinfo.recipe.ingredients);
  const recipeInfo = foodinfo.recipe.ingredientLines;

  return (
    <ItemBox>
      <Image
        src={foodImage_m}
        alt={foodName}
        onLoad={() => setIsOnLoaded(true)}
        isOnLoaded={isOnLoaded}
      />
      {!isOnLoaded && <LoadingImage />}

      <DescriptionBox>
        <Link
          to={`/recipe?id=${foodId}`}
          style={{
            height: "100%",
            padding: "0.4rem",
            boxSizing: "content-box",
          }}
          state={{
            recipeInfo: recipeInfo,
            id: foodId,
            name: foodName,
            ingredients: needs,
            image: foodImage_l,
          }}
        >
          <HeadContentsWrapper>
            <NameBox>
              <Name>{foodName}</Name>
            </NameBox>
            <CuisineTypeBox>
              {cuisineType.map((type, key) => {
                return (
                  <CuisineType key={key}>{type.toUpperCase()}</CuisineType>
                );
              })}
            </CuisineTypeBox>
          </HeadContentsWrapper>
          <PersonIcon personCount={serving}></PersonIcon>

          <NeedsBox>
            {needs.map((ingredient, key) => (
              <NeedsTag key={key}>{ingredient.food}</NeedsTag>
            ))}
          </NeedsBox>
        </Link>
      </DescriptionBox>

      <NutrientsBox
        onClick={() => {
          setIsOpenOverlay(true);
        }}
      >
        <FoodItemCalories
          foodTotalCalories={foodTotalCalories}
          foodCaloriesForServing={foodCaloriesForServing}
        />
        <MainNutrients>
          <FoodItemNutrients value={nutrientsInfo.Carbs} />
          <FoodItemNutrients value={nutrientsInfo.Protein} />
          <FoodItemNutrients value={nutrientsInfo.Fat} />
          <FoodItemNutrients value={nutrientsInfo.Sugars} />
        </MainNutrients>
      </NutrientsBox>
      {isOpenOverlay && (
        <Overlay>
          <MoreNutrients
            nutrientsInfo={nutrientsInfo}
            serving={serving}
            setIsOpenOverlay={setIsOpenOverlay}
          />
        </Overlay>
      )}
    </ItemBox>
  );
};

export default FoodItem;
