import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageNumber } from "../redux-modules/search";
import { RootState } from "../redux-modules/index";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
  console.log("dd");

  const dispatch = useDispatch();
  const currentPageNumber = useSelector(
    (state: RootState) => state.searchReducer.currentPageNumber
  );
  const onSetCurrentPageNumber = (num: number) =>
    dispatch(setCurrentPageNumber(num));
  const lineNum = Math.floor((currentPageNumber - 1) / pageUnit) * pageUnit;
  const isFirstPage = lineNum === 0 ? true : false;
  const pageNumArr = [];
  for (let i = 1; i <= pageUnit; i++) {
    pageNumArr.push(lineNum + i);
  }

  const rightClickHandler = () => {
    const nextPageNumber = lineNum + pageUnit + 1;
    onSetCurrentPageNumber(nextPageNumber);
  };
  const leftClickHandler = () => {
    const nextPageNumber = lineNum - pageUnit + 1;
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
      <IconWrapper onClick={rightClickHandler}>
        <AiOutlineRight />
      </IconWrapper>
    </PaginationBox>
  );
};

export default Pagination;
