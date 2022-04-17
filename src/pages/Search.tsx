import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import {
  clearExistData,
  clearSearchText,
  setCurrentPageNumber,
  setDataCount,
  setNextLink,
  setSearchText,
} from "../redux-modules/search";
import FoodList from "../components/FoodList";
import Pagination from "../components/Pagination";
import { getRecipe } from "../functions/apiCall";
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
  const [foodItems, setFoodItems] = useState<Hit[][] | []>([]);


  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
 
  const existData = useSelector(
    (state: RootState) => state.searchReducer.existData
  );
  const item_index = (currentPageNumber - 1);

  const location = useLocation();
  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));
  const onSetDataCount = (count: number) => dispatch(setDataCount(count));
  const onSetNextLink = (nextLink: string) => dispatch(setNextLink(nextLink));

  const onSetCurrentPage = (page : number) => dispatch(setCurrentPageNumber(page));
  const onClearExistData = () => dispatch(clearExistData());

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

  const clearReducer = (queryString : string) => {
    onSetCurrentPage(1);
    onSetSearchText(queryString)
    onClearExistData();
    onSetDataCount(0);
    onSetNextLink("");
    setFoodItems([]);
  }

  useEffect(() => {
    if (queryString.length > 0) {
      clearReducer(queryString);
      getData().then((res: Hit[]) => {
        const res_copy = res.slice(); //side effect를 방지(원본을 유지하기위해) 복사본 생성

        setFoodItems((items: Hit[][] | []) => {
          const temp = [];
          while (res_copy.length > 0) {
            const temp_a = res_copy.splice(0, ITEM_LENGTH); //ITEM_LENGTH = 4 , 앞부분 부터 item 4개씩 잘라서 배열화
            temp.push(temp_a);
          }
          return temp;
        });
      }).catch( (error) => {
        console.log(error)
      });
    }
  }, [queryString]);



  useEffect(() => {
    //test
    console.log("Search : ", foodItems);
  });

  return (
    <DefaultPageLayout>
      <SearchTitle>{"'" + queryString + "' 검색 결과"}</SearchTitle>
      <FoodList items={foodItems[item_index]} />
      <Pagination setFoodItems={setFoodItems} />
    </DefaultPageLayout>
  );
};

export default Search;
