import styled from "styled-components";
import React, { useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageNumber } from "../redux-modules/search";
import { RootState } from "../redux-modules/index";

const PaginationBox = styled.div`
  display: flex;
  padding: 1rem 2rem;
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
  const RANGE = 10;
  const dispatch = useDispatch();
  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
  const onSetCurrentPageNumber = (num: number) =>
    dispatch(setCurrentPageNumber(num));
  const lineNum = Math.floor((currentPageNumber - 1) / 10) * 10;
  const isFirstPage = lineNum === 0 ? true : false;
  const pageNumArr = [];
  for (let i = 1; i <= RANGE; i++) {
    pageNumArr.push(lineNum + i);
  }

  const rightClickHandler = () => {
    const nextPageNumber = lineNum + 11;
    onSetCurrentPageNumber(nextPageNumber);
  };
  const leftClickHandler = () => {
    const nextPageNumber = lineNum - 10 + 1;
    onSetCurrentPageNumber(nextPageNumber);
  };
  const numberClickHandler = (index: number) => {
    onSetCurrentPageNumber(index);
  };

  const checkSelected = (pageNum: number) => {
    return currentPageNumber === pageNum ? true : false;
  };

  useEffect(() => {
    console.log(currentPageNumber);
  });
  return (
    <PaginationBox>
      {!isFirstPage ? (
        <IconWrapper onClick={leftClickHandler}>
          <AiOutlineLeft />
        </IconWrapper>
      ) : (
        <SpaceBlock />
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
      <IconWrapper onClick={rightClickHandler}>
        <AiOutlineRight />
      </IconWrapper>
    </PaginationBox>
  );
};

export default Pagination;
