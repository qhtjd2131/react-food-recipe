import React, { useState } from "react";
import styled from "styled-components";
import { Hit } from "./type2";
import MoreInfoButton from "./MoreInfoButton";
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

const Image = styled.img`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: image;
  @media ${({ theme }) => theme.size_5} {
    width: 160px;
    height: 160px;
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

  &:hover {
    border: 1px solid gray;
  }

  @media ${({ theme }) => theme.size_10} {
    height : auto;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.4rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  grid-area: nutrients;
`;
const MainNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

export const BlackLabel = styled.label`
  font-weight: 600;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GrayLabel = styled.label`
  color: gray;
  font-size: 1rem;
  font-weight: 500;
`;

const NeedsBox = styled.div`
  width: 100%;
  display: flex;
  /* white-space : nowrap; */
  padding-top: 0.8rem;
  flex-wrap: wrap;
  gap: 0.2rem;
`;

const NeedsTag = styled.div`
  border-radius: 12px;
  border: none;
  background-color: inherit;
  color: gray;
  box-sizing: border-box;
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
`;



export const PersonIcon = ({ personCount = 0 }: { personCount: number }) => {
  const arr_temp = new Array(personCount).fill(0);

  return (
    <PersonIconBox>
      {arr_temp.map((_, idx) => (
        <IoMdPerson key={idx}></IoMdPerson>
      ))}
      <p style={{ marginLeft: "0.3rem" }}> {personCount + "인"}</p>
    </PersonIconBox>
  );
};

interface FoodItemProps {
  foodinfo: Hit;
  increaseChildLoadCount: () => void;
}
export interface NutrientsInfoInterface {
  [key: string]: { krText: string; value: string; dailyPercent: number };
}
const getFoodId = (uri: string): string => {
  const split_temp = uri.split("#");
  return split_temp[split_temp.length - 1];
};
const FoodItem = ({ foodinfo, increaseChildLoadCount }: FoodItemProps) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const foodInfo: Hit = foodinfo;
  const foodName = foodInfo.recipe.label;

  //아이디
  const foodId = getFoodId(foodInfo.recipe.uri);

  //이미지
  const foodImage_s = foodInfo.recipe.images.THUMBNAIL.url;
  const foodImage_m = foodInfo.recipe.images.SMALL.url;
  const foodImage_l = foodInfo.recipe.images.REGULAR.url;
  //총칼로리
  const foodTotalCalories = foodInfo.recipe.calories;
  //n인분
  const serving = foodInfo.recipe.yield;
  //1인당 칼로리
  const foodCaloriesForServing = roundToTwo(foodTotalCalories / serving);
  //총 영양정보 + 하루권장량 퍼센테이지 정보
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
        kr_label = "탄수화물";
        break;
      case "Fat":
        kr_label = "지방";
        break;
      case "Trans":
        kr_label = "트랜스지방";
        break;
      case "Sugars":
        kr_label = "당";
        break;
      case "Protein":
        kr_label = "단백질";
        break;
      case "Cholesterol":
        kr_label = "콜레스테롤";
        break;
      case "Calcium":
        kr_label = "칼슘";
        break;
      case "Magnesium":
        kr_label = "마그네슘";
        break;
      case "Potassium":
        kr_label = "칼륨";
        break;
      case "Iron":
        kr_label = "철분";
        break;
      case "Zinc":
        kr_label = "아연";
        break;
      case "Phosphorus":
        kr_label = "인";
        break;
      case "Saturated":
        kr_label = "포화지방";
        break;
      case "Sodium":
        kr_label = "나트륨";
        break;
      case "Vitamin A":
        kr_label = "비타민A";
        break;
      case "Vitamin C":
        kr_label = "비타민C";
        break;
      case "Thiamin (B1)":
        kr_label = "비타민B1";
        break;
      case "Riboflavin (B2)":
        kr_label = "비타민B2";
        break;
      case "Niacin (B3)":
        kr_label = "비타민B3";
        break;
      case "Vitamin B6":
        kr_label = "비타민B6";
        break;
      case "Folate equivalent (total)":
        kr_label = "엽산(총)";
        break;
      case "Folate (food)":
        kr_label = "천연엽산";
        break;
      case "Folic acid":
        kr_label = "합성엽산";
        break;
      case "Vitamin B12":
        kr_label = "비타민B12";
        break;
      case "Vitamin D":
        kr_label = "비타민D";
        break;
      case "Vitamin E":
        kr_label = "비타민E";
        break;
      case "Vitamin K":
        kr_label = "비타민K";
        break;
      case "Sugar alcohol":
        kr_label = "당알코올";
        break;
      case "Water":
        kr_label = "물";
        break;
      case "Sugars, added":
        kr_label = "첨가당";
        break;
      case "Fiber":
        kr_label = "섬유질";
        break;
      case "Carbohydrates (net)":
        kr_label = "순탄수";
        break;
      case "Polyunsaturated":
        kr_label = "고도불포화지방";
        break;
      case "Monounsaturated":
        kr_label = "단일불포화지방";
        break;
      case "ENERC_KCAL":
        kr_label = "칼로리";
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

  //관련 국가 정보 arr
  const cuisineType = foodInfo.recipe.cuisineType;

  //재료정보 가공하기
  const needs = foodInfo.recipe.ingredients.map((ingred) => {
    return {
      food: ingred.food,
      quantity: ingred.quantity,
      measure: ingred.measure,
      weight: ingred.weight,
    };
  });

  const recipeInfo = foodinfo.recipe.ingredientLines;

  return (
    <ItemBox>
      <Image src={foodImage_m} alt={foodName} onLoad={increaseChildLoadCount} />

      <DescriptionBox>
        <Link
          to={`/recipe?id=${foodId}`}
          style={{
            height: "100%",
            padding: "0.4rem",
            boxSizing: "content-box",
          }}
          state={{ recipeInfo: recipeInfo, id: foodId, name:foodName , ingredients : needs, image : foodImage_l}}
        >
          <HeadContentsWrapper>
            <NameBox>
              <Name>{foodName}</Name>
              <PersonIcon personCount={serving}></PersonIcon>
            </NameBox>
            <CuisineTypeBox>
              {cuisineType.map((type, key) => {
                return (
                  <CuisineType key={key}>{type.toUpperCase()}</CuisineType>
                );
              })}
            </CuisineTypeBox>
          </HeadContentsWrapper>
          <NeedsBox>
            {needs.map((ingredient, key) => (
              <NeedsTag key={key}>{ingredient.food}</NeedsTag>
            ))}
          </NeedsBox>
        </Link>
      </DescriptionBox>

      <NutrientsBox>
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
        <MoreInfoButton
          onClick={() => {
            setIsOpenOverlay(true);
          }}
        />
        {isOpenOverlay && (
          <Overlay>
            <MoreNutrients
              nutrientsInfo={nutrientsInfo}
              serving={serving}
              setIsOpenOverlay={setIsOpenOverlay}
            />
          </Overlay>
        )}
      </NutrientsBox>
    </ItemBox>
  );
};

export default FoodItem;
