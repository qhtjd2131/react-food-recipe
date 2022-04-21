import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistData,
  setDataCount,
  setFoodItems,
  setIsLoading,
  setNextLink,
  setSearchText,
} from "../redux-modules/search";
import FoodList from "../components/FoodList";
import Pagination from "../components/Pagination";
import { getRecipe } from "../functions/apiCall";
import { Hit } from "../components/type2";
import { RootState } from "../redux-modules";
import DefaultPageLayout from "./DefaultPageLayout";
import { store } from "..";

export const ITEM_LENGTH = 4;

const SearchTitle = styled.p`
  width: 100%;
  display: block;
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0;
`;

const Search = () => {
  const [isZeroData, setIsZeroData] = useState(false);
  const foodItems = useSelector(
    (state: RootState) => state.searchReducer.foodItems
  );

  const searchText = useSelector(
    (state: RootState) => state.searchReducer.searchText
  );
  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
  const isLoading = useSelector(
    (state: RootState) => state.searchReducer.isLoading
  );
  const item_index = currentPageNumber - 1;

  const location = useLocation();
  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));
  const onSetDataCount = (count: number) => dispatch(setDataCount(count));
  const onSetNextLink = (nextLink: string) => dispatch(setNextLink(nextLink));
  const onAddExistData = (key: number, value: boolean) =>
    dispatch(addExistData(key, value));

  const onSetFoodItems = (foodItems: Hit[][]) =>
    dispatch(setFoodItems(foodItems));
  const onSetIsLoading = (bool: boolean) => dispatch(setIsLoading(bool));

  const queryString: any = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
    parameterLimit: 1,
  }).q;

  const getData = async (): Promise<Hit[]> => {
    const result = await getRecipe(queryString); // "chicken => queryString"
    console.log("SEARCH : getdata 실행");

    onSetDataCount(result.count);
    onSetNextLink(result.nextLink);

    return result.data;
  };

  useEffect(() => {
    if (queryString.length > 0) {
      onSetSearchText(queryString);
    }

    if (foodItems.length === 0) {
      onSetIsLoading(true);
    }
  }, [queryString]);

  useEffect(() => {
    if (searchText.length > 0 && foodItems.length === 0) {
      setIsZeroData(false);
      getData()
        .then((res: Hit[]) => {
          const res_copy = res.slice(); //side effect를 방지(원본을 유지하기위해) 복사본 생성

          const temp: Hit[][] = [];
          while (res_copy.length > 0) {
            const temp_a: Hit[] = res_copy.splice(0, ITEM_LENGTH); //ITEM_LENGTH = 4 , 앞부분 부터 item 4개씩 잘라서 배열화
            temp.push(temp_a);
          }
          onSetFoodItems(temp);
          onAddExistData(0, true);
          onSetIsLoading(false);
          if (temp.length === 0) setIsZeroData(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchText]);

  // useEffect(()=>{
  //   onSetIsLoading(true);
  // }, [])
  return (
    <DefaultPageLayout>
      <SearchTitle>{"'" + queryString + "' 검색 결과"}</SearchTitle>
      <FoodList
        items={foodItems[item_index]}
        isZeroData={isZeroData}
        isLoading={isLoading}
      />
      <Pagination />
      <button
        onClick={() => {
          console.log(store.getState());
        }}
      >
        button
      </button>
    </DefaultPageLayout>
  );
};

export default Search;
