import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import FoodItem from "./FoodItem";
import { Hit } from "./type2";

const FoodListBox = styled.div<{ isLoading: boolean }>`
  width: 1200px;
  height: 100%;
  display: ${(props) => (props.isLoading ? "none" : "block")};

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
  font-size: 4rem;
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
}

const FoodList = ({ items }: IFoodListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isZeroData, setIsZeroData] = useState(false);

  console.log("foodlist : ", items);
  let childLoadCount = 0;
  const childsLength = items === undefined ? 0 : items.length;
  console.log("childsLength", childsLength);

  useLayoutEffect(() => {
    if (items !=undefined && childsLength === 0) {
      setIsLoading(false);
      setIsZeroData(true);
    } else {
      setIsZeroData(false);
      setIsLoading(true);
    }
  }, [items]);

  const increaseChildLoadCount = useCallback(() => {
    childLoadCount += 1;
    if (childLoadCount >= childsLength) {
      setIsLoading(false);
      childLoadCount = 0;
    }
  }, [childLoadCount, childsLength]);

  return (
    <>
      {isLoading && <LoadingBox>Loading...</LoadingBox>}
      <FoodListBox isLoading={isLoading}>
        {isZeroData ? (
          <ZeroDataBox>zero data</ZeroDataBox>
        ) : (
          items?.map((info, idx) => (
            <FoodItem
              foodinfo={info}
              increaseChildLoadCount={increaseChildLoadCount}
              key={idx}
            />
          ))
        )}
      </FoodListBox>
    </>
  );
};

export default FoodList;
