import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistData,
  clearExistData,
  setCurrentPageNumber,
  setDataCount,
  setFoodItems,
  setIsLimitedCall,
  setIsLoading,
  setNextLink,
  setSearchText,
} from "../redux-modules/search";
import FoodList from "../components/FoodList";
import Pagination from "../components/Pagination";
import { getRecipe, recipeInterface } from "../functions/apiCall";
import { Hit } from "../components/type2";
import { RootState } from "../redux-modules";
import DefaultPageLayout from "./DefaultPageLayout";

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
  const [queryString, setQueryString] = useState<any>("");
  const navigate = useNavigate();
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
  const isLimitedCall = useSelector(
    (state: RootState) => state.searchReducer.isLimitedCall
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
  const onSetIsLimitedCall = (bool: boolean) =>
    dispatch(setIsLimitedCall(bool));
  const onClearExistData = () => dispatch(clearExistData());
  const onSetCurrentPage = (page: number) =>
    dispatch(setCurrentPageNumber(page));


  useEffect(()=>{
    const qs : any = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
      parameterLimit: 1,
    })?.q;

    if(qs === undefined || qs.length < 1){
      navigate("/");
    }
    setQueryString(qs);
  })

  const getData = async (): Promise<recipeInterface> => {
    return await getRecipe(queryString); // "chicken => queryString"
  };


  useLayoutEffect(()=>{
    if(foodItems?.length === 0){
      setIsZeroData(true);
    } else {
      setIsZeroData(false);
    }
  },[foodItems])
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageNumber]);

  useEffect(() => {
    if (queryString.length > 0 && queryString != searchText) {
      onSetFoodItems([]);
      onSetCurrentPage(1);
      onClearExistData();

      onSetIsLoading(true);
      setIsZeroData(false);
      onSetIsLimitedCall(false);

      getData()
        .then((res: recipeInterface) => {
          onSetDataCount(res.count);
          onSetNextLink(res.nextLink);
          onSetSearchText(queryString);

          const res_copy = res.data.slice(); //side effect를 방지(원본을 유지하기위해) 복사본 생성
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
          onSetIsLoading(false);
          onSetDataCount(0);
          onSetNextLink("");
          onSetFoodItems([]);
          if (error.message === "Network Error") {
            onSetIsLimitedCall(true);
          }

        });
    }
  }, [queryString, searchText]);

  return (
    <DefaultPageLayout>
      <SearchTitle>{"'" + queryString + "' 검색 결과"}</SearchTitle>
      <FoodList
        items={foodItems[item_index]}
        isZeroData={isZeroData}
        isLoading={isLoading}
        isLimitedCall={isLimitedCall}

      />
      <Pagination />
  
    </DefaultPageLayout>
  );
};

export default Search;
