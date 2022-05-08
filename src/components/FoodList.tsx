import React from "react";
import styled from "styled-components";
import FoodItem from "./FoodItem";
import LimitedCall from "./LimitedCall";
import Loading from "./Loading";
import { Hit } from "./type2";
import ZeroData from "./ZeroData";

const FoodListBox = styled.div`
  width: 1200px;
  height: 100%;

  min-width : 350px;
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
    width: 100vw;
    
  }
`;

export const LoadingBox = styled.div`
  width: 100%;
  box-sizing : border-box;
  height : calc(var(--vh) * 100 - 100px - 80px - 100px - 40px - 10px); // - header_height - pagination_height - footer_height - search_title_height - bosungbox_margin_bottom
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size_5} {
    height : calc(var(--vh) * 100 - 120px - 80px - 100px - 40px - 10px);
  }
`;

interface IFoodListProps {
  items: Hit[] | undefined;
  isZeroData: boolean;
  isLoading: boolean;
  isLimitedCall: boolean;
}

const FoodList = ({
  items,
  isZeroData,
  isLoading,
  isLimitedCall,
}: IFoodListProps) => {

  if (isLoading) { 
    return (
      <FoodListBox>
        <LoadingBox>
          <Loading />
        </LoadingBox>
      </FoodListBox>
    );
  } else if (isLimitedCall) {
    return (
      <FoodListBox>
        <LoadingBox>
          <LimitedCall />
        </LoadingBox>
      </FoodListBox>
    );
  } else {
    return (
      <FoodListBox>
        {isZeroData ? (
          <LoadingBox>
            <ZeroData />
          </LoadingBox>
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
