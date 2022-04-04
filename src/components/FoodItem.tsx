import React from "react";
import styled from "styled-components";
import { Hit } from "./type2";
import { GoPrimitiveDot } from "react-icons/go";
import MoreInfoButton from "./MoreInfoButton";
import { IoMdPerson } from "react-icons/io";

const ItemBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1rem 0;
  gap: 1rem;
  padding: 1rem;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const DescriptionBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.4rem;
  border: 1px solid black;
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
  width: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1rem;

  justify-content: center;
  align-items: center;
`;
const MainNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;
const SubNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const KcalBox = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
`;

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
const BlackLabel = styled.label`
  font-weight: 600;
`;

const GrayLabel = styled.label`
  color: gray;
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
  /* height : 10px; */
  border-radius: 12px;
  border: none;
  background-color: white;
  /* border-bottom : 1px solid black; */
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

export const NetrientsIcon = ({ color = "black" }: { color: string }) => {
  return (
    <NIcon color={color}>
      <GoPrimitiveDot />
    </NIcon>
  );
};

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
  foodinfo : Hit;
  increaseChildLoadCount : () => void;
  key : number;
}
const FoodItem = ({ foodinfo, increaseChildLoadCount, key }: FoodItemProps) => {
  const foodInfo: Hit = foodinfo;
  const foodName = foodInfo.recipe.label;
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
  //총 영양정보
  const totalNutrients = foodInfo.recipe.totalNutrients;
  const nutrientsInfo: { [key: string]: string } = {};
  Object.keys(totalNutrients).forEach((nut) => {
    const label = totalNutrients[nut].label;
    const quantity = roundToTwo(totalNutrients[nut].quantity);
    const unit = totalNutrients[nut].unit;
    nutrientsInfo[label] = quantity + unit;
  });
  //Carbs: 탄수화물
  //Fat : 지방
  //Trans : 트랜스지방
  //Sugars : 당
  //Protein : 단백질
  //Cholesterol : 콜레스트롤
  //Calcium : 칼슘
  //Magnesium : 마그네슘
  //Potassium : 칼륨
  //Iron : 철분
  //Zinc : 아연
  //Phosphorus : 인

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

  function roundToTwo(num: number) {
    return +(Math.round(Number(num + "e+2")) + "e-2");
  }
  return (
    <ItemBox>
      <Image src={foodImage_m} alt={foodName} onLoad={increaseChildLoadCount} />
      <DescriptionBox>
        <HeadContentsWrapper>
          <NameBox>
            <Name>{foodName}</Name>
            <PersonIcon personCount={serving}></PersonIcon>
          </NameBox>
          <CuisineTypeBox>
            {cuisineType.map((type, key) => {
              return <CuisineType key={key}>{type.toUpperCase()}</CuisineType>;
            })}
          </CuisineTypeBox>
        </HeadContentsWrapper>
        <NeedsBox>
          {needs.map((ingredient, key) => (
            <NeedsTag key={key}>{ingredient.food}</NeedsTag>
          ))}
        </NeedsBox>
      </DescriptionBox>
      <NutrientsBox>
        <MainNutrients>
          <KcalBox>{roundToTwo(foodTotalCalories) + " kcal"}</KcalBox>
          <GrayLabel>{"(1인) " + foodCaloriesForServing + " kcal"}</GrayLabel>

          <NutrientsItem>
            <IconWithText>
              <NetrientsIcon color="red" />
              <BlackLabel>탄수화물</BlackLabel>
            </IconWithText>
            <BlackLabel>{nutrientsInfo.Carbs}</BlackLabel>
          </NutrientsItem>

          <NutrientsItem>
            <IconWithText>
              <NetrientsIcon color="green" />
              <BlackLabel>단백질</BlackLabel>
            </IconWithText>
            <BlackLabel>{nutrientsInfo.Protein}</BlackLabel>
          </NutrientsItem>

          <NutrientsItem>
            <IconWithText>
              <NetrientsIcon color="orange" />
              <BlackLabel>지방</BlackLabel>
            </IconWithText>
            <BlackLabel>{nutrientsInfo.Fat}</BlackLabel>
          </NutrientsItem>

          <NutrientsItem>
            <IconWithText>
              <NetrientsIcon color="gray" />
              <BlackLabel>당</BlackLabel>
            </IconWithText>
            <BlackLabel>{nutrientsInfo.Sugars}</BlackLabel>
          </NutrientsItem>
        </MainNutrients>
        <MoreInfoButton onClick={() => {}} />
        <SubNutrients></SubNutrients>
      </NutrientsBox>
    </ItemBox>
  );
};

export default FoodItem;
