import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistData,
  addFoodItems,
  setCurrentPageNumber,
  setIsLimitedCall,
  setIsLoading,
  setNextLink,
} from "../redux-modules/search";
import { RootState } from "../redux-modules/index";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ITEM_LENGTH } from "../pages/Search";
import { Hit } from "./type2";
import { getRecipeFromNextLink, recipeInterface } from "../functions/apiCall";

const PAGE_BY_API_CALL = 10; //API CALL 한번에 보여줄 수 있는 페이지 (40개 , 1페이지당 4개, 총 10페이지)

const PaginationBox = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#e5e5e5" : "white")};
  &:hover {
    background-color: #e5e5e5;
  }
`;

const SpaceBlock = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

interface IPagination {}
const Pagination = () => {
  const { height, width } = useWindowDimensions();
  const [pageUnit, setPageUnit] = useState(10);
  useEffect(() => {
    if (width <= 700) {
      setPageUnit(5);
    } else {
      setPageUnit(10);
    }
  }, [width]);

  const dispatch = useDispatch();
  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
  const dataCount = useSelector(
    (state: RootState) => state.searchReducer.dataCount
  );
  const exist = useSelector(
    (state: RootState) => state.searchReducer.existData
  );
  const nextLink = useSelector(
    (state: RootState) => state.searchReducer.nextLink
  );

  const pageCount = Math.floor(dataCount / ITEM_LENGTH) + 1; //ITEM_LENGTH : 한 페이지당 데이터 갯수
  const lineCount = Math.floor(pageCount / pageUnit) + 1;
  const lineNum = Math.floor((currentPageNumber - 1) / pageUnit) * pageUnit;
  const isFirstPage = lineNum === 0 ? true : false;
  const isLastPage = lineNum + pageUnit === lineCount * pageUnit ? true : false;

  const onAddExistData = (key: number, value: boolean) =>
    dispatch(addExistData(key, value));

  const onSetCurrentPageNumber = (num: number) =>
    dispatch(setCurrentPageNumber(num));
  const onSetNextLink = (nextLink: string) => dispatch(setNextLink(nextLink));

  const onAddFoodItems = (foodItems: Hit[][]) =>
    dispatch(addFoodItems(foodItems));

  const onSetIsLoading = (bool: boolean) => dispatch(setIsLoading(bool));
  const onSetIsLimitedCall = (bool: boolean) =>
    dispatch(setIsLimitedCall(bool));
  const pageNumArr: number[] = [];

  for (let i = 1; i <= pageUnit; i++) {
    if (lineNum + i <= pageCount) {
      pageNumArr.push(lineNum + i);
    }
  }

  const getData = async (nextLink_: string) => {
    await getRecipeFromNextLink(nextLink_)
      .then((res: recipeInterface) => {
        const res_copy: Hit[] = res.data.slice();
        const temp: Hit[][] = [];
        while (res_copy.length > 0) {
          const temp_a = res_copy.splice(0, ITEM_LENGTH); //ITEM_LENGTH = 4 , 앞부분 부터 item 4개씩 잘라서 배열화
          temp.push(temp_a);
        }
        onAddFoodItems(temp);
        onSetNextLink(res.nextLink);
        onAddExistData(lineNum + PAGE_BY_API_CALL, true);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          onSetIsLimitedCall(true);
        }
      })
      .finally(() => {
        onSetIsLoading(false);
      });
  };

  const rightClickHandler = () => {
    const nextPageNumber = lineNum + pageUnit + 1;
    const nextLineNum = lineNum + pageUnit;
    onSetCurrentPageNumber(nextPageNumber);
    if (nextLineNum % PAGE_BY_API_CALL === 0) {
      if (!exist[lineNum + PAGE_BY_API_CALL]?.exist && nextLink.length > 0) {
        onSetIsLoading(true);
        getData(nextLink);
      }
    }
  };
  const leftClickHandler = () => {
    const nextPageNumber = lineNum - pageUnit + 1;
    onSetCurrentPageNumber(nextPageNumber);
    if (lineNum % 10 === 0) onAddExistData(lineNum, true);
  };
  const numberClickHandler = (index: number) => {
    onSetCurrentPageNumber(index);
  };

  const checkSelected = (pageNum: number) => {
    return currentPageNumber === pageNum ? true : false;
  };

  return (
    <PaginationBox>
      {!isFirstPage && (
        <IconWrapper onClick={leftClickHandler}>
          <AiOutlineLeft />
        </IconWrapper>
      )}
      {pageNumArr.map((pageNum, index) => (
        <IconWrapper
          key={index}
          onClick={() => {
            numberClickHandler(lineNum + index + 1);
          }}
          isSelected={checkSelected(lineNum + index + 1)}
        >
          {pageNum}
        </IconWrapper>
      ))}
      {!isLastPage && (
        <IconWrapper onClick={rightClickHandler}>
          <AiOutlineRight />
        </IconWrapper>
      )}
    </PaginationBox>
  );
};

export default Pagination;
