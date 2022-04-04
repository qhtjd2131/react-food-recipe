import { is } from "immer/dist/internal";
import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import styled from "styled-components";
import { getRecipe } from "../functions/apiCall";
import { data } from "./data";
import FoodItem from "./FoodItem";
import { FoodInfos, Hit } from "./type2";

const FoodListBox = styled.div`
  width: 1200px;
  height: 100%;
  border: 1px solid black;
`;

const LoadingBox = styled.div`
  font-size: 4rem;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface IFoodListProps {
  items: Hit[] | undefined;
}

const FoodList = ({ items }: IFoodListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [childLoadCount, setChildLoadCount] = useState(0);

  const increaseChildLoadCount = () => {
    setChildLoadCount((count) => count + 1);
    console.log("increase : ", childLoadCount);
  };

  useEffect(() => {
    console.log("childcount :", childLoadCount);
    if (childLoadCount >= 10) {
      setIsLoading(false);
    }
  }, [childLoadCount]);
  const data2 = items;
  //   console.log(data2);

  const image_temp_obj: any = {};
  const imageArr = items?.map((item) => item.recipe.images.SMALL.url);
  imageArr?.forEach((url: string, index: any) => {
    image_temp_obj[index] = (
      <img src={url} alt={index} onLoad={increaseChildLoadCount} />
    );
  });
  // image를 자식에게 뿌려주기 위해 미리 랜더링
  // 이후 로딩 상태 변경 필요
  
  return (
    <FoodListBox>
      {data2?.map((info, idx) => (
        <FoodItem
          foodinfo={info}
          increaseChildLoadCount={increaseChildLoadCount}
          key={idx}
        />
      ))}
    </FoodListBox>
  );
};

export default FoodList;
