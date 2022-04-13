import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux-modules/search";
import FoodList from "../components/FoodList";
import Pagination from "../components/Pagination";
import { getRecipe } from "../functions/apiCall";
import { Hit } from "../components/type2";
import { RootState } from "../redux-modules";
import { data } from "../components/data";
import DefaultPageLayout from "./defaultPageLayout";

const ITEM_LENGTH = 4;

const SearchTitle = styled.p`
  width: 100%;
  display: block;
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0;
`;

const Search = () => {
  const [foodItems, setFoodItems] = useState<Hit[][] | undefined>();

  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
  const item_index = (currentPageNumber - 1) % 10;

  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const onSetSearchText = (str: string) => dispatch(setSearchText(str));

  const queryString: any = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
    parameterLimit: 1,
  }).q;

  const getData = async (): Promise<Hit[]> => {
    // const result = await getRecipe("chicken"); // "chicken => queryString"
    const result = data;
    console.log("getdata 실행");
    return new Promise((resolve) => {
      resolve(result);
    });
    // return result;
  };

  useEffect(() => {
    if (queryString.length > 0) {
      getData().then((res: Hit[]) => {
        const res_copy = res.slice(); //side effect를 방지(원본을 유지하기위해) 복사본 생성

        setFoodItems(() => {
          const temp = [];
          while (res_copy.length > 0) {
            const temp_a = res_copy.splice(0, ITEM_LENGTH); //ITEM_LENGTH = 4 , 앞부분 부터 item 4개씩 잘라서 배열화
            temp.push(temp_a);
          }
          return temp;
        });
      });
    }
  }, [queryString]);

  useEffect(() => {
    if (typeof queryString === "string") {
      onSetSearchText(queryString);
    }
  }, []);

  return (
   
    <DefaultPageLayout>
      <SearchTitle>{"'" + queryString + "' 검색 결과"}</SearchTitle>
      <FoodList items={foodItems ? foodItems[item_index] : undefined} />
      <Pagination />
    </DefaultPageLayout>
  );
};

export default Search;
