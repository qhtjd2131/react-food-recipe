import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import FoodItem from "./FoodItem";
import LimitedCall from "./LimitedCall";
import Loading from "./Loading";
import { Hit } from "./type2";

const FoodListBox = styled.div`
  width: 1200px;
  height: 100%;

  @media ${({ theme }) => theme.size_13} {
    width: 980px;
  }
  @media ${({ theme }) => theme.size_10} {
    width: 650px;
  }
  @media ${({ theme }) => theme.size_7} {
    width: 480px;
  }
  @media ${({ theme }) => theme.size_5} {
    width: 400px;
  }
`;

export const LoadingBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ZeroDataBox = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface IFoodListProps {
  items: Hit[] | undefined;
  isZeroData: boolean;
  isLoading: boolean;
  isLimitedCall : boolean,
}

const FoodList = ({ items, isZeroData, isLoading, isLimitedCall }: IFoodListProps) => {
  if (isLoading) {
    // isLoading
    return (
      <FoodListBox>
        <LoadingBox>
          <Loading />
        </LoadingBox>
      </FoodListBox>
    );
  }else if(isLimitedCall){
    return (
        <FoodListBox>
            <LoadingBox>
                <LimitedCall />
            </LoadingBox>
        </FoodListBox>
    )
  } else {
    return (
      <FoodListBox>
        {isZeroData ? (
          <ZeroDataBox>zero data</ZeroDataBox>
        ) : (
          items?.map((info) => (
            <FoodItem foodinfo={info} key={info._links.self.href} />
          ))
        )}
      </FoodListBox>
    );
  }
};

export default FoodList;
