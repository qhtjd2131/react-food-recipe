import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import styled from "styled-components";
import { getRecipe } from "../functions/apiCall";
import { data } from "./data";
import FoodItem from "./FoodItem";
import { FoodInfos } from "./type2";

const FoodListBox = styled.div`
  width: 1200px;
  height: 100%;
  border: 1px solid black;
`;

interface IFoodListProps {
  searchText: string;
}

const FoodList = ({ searchText }: IFoodListProps) => {
  const [datatemp, setData] = useState<any>();

  const data2 = data;
  console.log(data2);

  const getData = async () => {
    const result = await getRecipe("chicken");
    console.log("--", result);
    return result;
  };
  useEffect(() => {
    if (searchText.length > 0) {
      getData().then((res) => {
        setData(res);
        console.log("121312:",res);
      });
    }
  }, [searchText]);

  return (
    <FoodListBox>
      {data2.hits.map((info, idx) => (
        <FoodItem foodinfo={info} key={idx} />
      ))}
    </FoodListBox>
  );
};

export default FoodList;
