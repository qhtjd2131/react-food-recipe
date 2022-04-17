import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistData,
  setCurrentPageNumber,
  setNextLink,
} from "../redux-modules/search";
import { RootState } from "../redux-modules/index";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ITEM_LENGTH } from "../pages/Search";
import { Hit } from "./type2";
import { getRecipeFromNextLink } from "../functions/apiCall";

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

interface IPagination {
  setFoodItems: React.Dispatch<React.SetStateAction<[] | Hit[][]>>;
}
const Pagination = ({ setFoodItems }: IPagination) => {
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

  const pageNumArr = [];

  for (let i = 1; i <= pageUnit; i++) {
    if (lineNum + i <= pageCount) {
      pageNumArr.push(lineNum + i);
    }
  }

  const getData = async (nextLink_: string) => {
    const result = await getRecipeFromNextLink(nextLink_);
    onSetNextLink(result.nextLink);

    return result.data;
  };
  const rightClickHandler = () => {
    const nextPageNumber = lineNum + pageUnit + 1;
    onSetCurrentPageNumber(nextPageNumber);
    if (lineNum % 10 === 0) {
      if (!exist[lineNum]?.exist && nextLink.length > 0) {
        onAddExistData(lineNum, true);
        //data 추가로받아와서 set해주기
        getData(nextLink)
          .then((res: Hit[]) => {
            const res_copy = res.slice(); //side effect를 방지(원본을 유지하기위해) 복사본 생성

            setFoodItems((items: Hit[][] | []) => {
              const temp = [];
              while (res_copy.length > 0) {
                const temp_a = res_copy.splice(0, ITEM_LENGTH); //ITEM_LENGTH = 4 , 앞부분 부터 item 4개씩 잘라서 배열화
                temp.push(temp_a);
              }
              return [...items, ...temp];
            });
          })
          .catch((error) => {
            console.log(error.code);
          });
      }
    } //10 은 한번의 apicall이 있을때 받아오는 page 갯수
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

  useEffect(() => {
    //test
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
