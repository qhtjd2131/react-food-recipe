import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addExistData, setCurrentPageNumber } from "../redux-modules/search";
import { RootState } from "../redux-modules/index";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ITEM_LENGTH } from "../pages/Search";

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

  const pageCount = Math.floor(dataCount / ITEM_LENGTH) + 1; //ITEM_LENGTH : 한 페이지당 데이터 갯수
  const lineCount = Math.floor(pageCount / pageUnit) + 1;
  const lineNum = Math.floor((currentPageNumber - 1) / pageUnit) * pageUnit;
  const isFirstPage = lineNum === 0 ? true : false;
  const isLastPage = lineNum + pageUnit === lineCount * pageUnit ? true : false;

  const onAddExistData = (key: number, value: boolean) =>
    dispatch(addExistData(key, value));

  const onSetCurrentPageNumber = (num: number) =>
    dispatch(setCurrentPageNumber(num));

  const pageNumArr = [];

  for (let i = 1; i <= pageUnit; i++) {
    if (lineNum + i <= pageCount) {
      pageNumArr.push(lineNum + i);
    }
  }

  const rightClickHandler = () => {
    const nextPageNumber = lineNum + pageUnit + 1;
    onSetCurrentPageNumber(nextPageNumber);
    if (lineNum % 20 === 0) onAddExistData(lineNum, true); //20 은 한번의 apicall이 있을때 받아오는 data 갯수
  };
  const leftClickHandler = () => {
    const nextPageNumber = lineNum - pageUnit + 1;
    onSetCurrentPageNumber(nextPageNumber);
    if (lineNum % 20 === 0) onAddExistData(lineNum, true);
  };
  const numberClickHandler = (index: number) => {
    onSetCurrentPageNumber(index);
  };

  const checkSelected = (pageNum: number) => {
    return currentPageNumber === pageNum ? true : false;
  };

  useEffect(() => {
    //test
    console.log("thisisexist", exist);
  });

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
