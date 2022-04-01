import React from "react";
import styled from "styled-components";
import { Hit } from "./type2";
import { GoPrimitiveDot } from "react-icons/go";

const ItemBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1rem 0;
  gap: 1rem;
`;

const Image = styled.img``;

const DescriptionBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid black;
`;
const Name = styled.p`
  font-size: 1.6rem;
`;
const Text = styled.p``;
const NutrientsBox = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  box-sizing : border-box;
  padding : 0 1rem;
`;
const MainNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap : 0.4rem;
`;
const SubNutrients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const KcalBox = styled.label``;

const NutrientsItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IconWithText = styled.div`
    display :flex;
    justify-content:center;
    align-items: center;
`;
const NIcon = styled.div`
    color : ${(props) => props.color && props.color};
`;
const NutrientsLabel = styled.label``;

const NetrientsIcon = ({ color = "black" } : {color:string} ) => {
    
  return (
    <NIcon color={color}>
      <GoPrimitiveDot />
    </NIcon>
  );
};
const FoodItem = ({ foodinfo }: any) => {
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
  const country = foodInfo.recipe.cuisineType;


  //재료정보 가공하기
  const needs = null;

  

  function roundToTwo(num: number) {
    return +(Math.round(Number(num + "e+2")) + "e-2");
  }
  return (
    <ItemBox>
      <Image src={foodImage_m} alt={foodName} />
      <DescriptionBox>
        <Name>{foodName}</Name>
        <Text>{serving + "인분"}</Text>
      </DescriptionBox>
      <NutrientsBox>
        <MainNutrients>
          <KcalBox>{"총 " + roundToTwo(foodTotalCalories) + " kcal"}</KcalBox>
          <NutrientsLabel>
            {"(1인) " + foodCaloriesForServing + " kcal"}
          </NutrientsLabel>

          <NutrientsItem>
            <IconWithText>
              <NetrientsIcon color="red" />
              <NutrientsLabel>탄수화물</NutrientsLabel>
            </IconWithText>
            <NutrientsLabel>
              <NutrientsLabel>{nutrientsInfo.Carbs}</NutrientsLabel>
            </NutrientsLabel>
          </NutrientsItem>

          <NutrientsItem>
          <IconWithText>
              <NetrientsIcon color="green"/>
              <NutrientsLabel>단백질</NutrientsLabel>
            </IconWithText>
            <NutrientsLabel>
              <NutrientsLabel>
                {nutrientsInfo.Protein}
              </NutrientsLabel>
            </NutrientsLabel>
          </NutrientsItem>

          <NutrientsItem>
          <IconWithText>
              <NetrientsIcon color="orange" />
              <NutrientsLabel>지방</NutrientsLabel>
            </IconWithText>
            <NutrientsLabel>
              <NutrientsLabel>{nutrientsInfo.Fat}</NutrientsLabel>
            </NutrientsLabel>
          </NutrientsItem>
        </MainNutrients>

        <SubNutrients></SubNutrients>
      </NutrientsBox>
    </ItemBox>
  );
};

export default FoodItem;
