import React, {
  useCallback,
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
`;

const LoadingBox = styled.div`
  font-size: 4rem;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface IFoodListProps {
  items: Hit[] | undefined;
}

const FoodList = ({ items }: IFoodListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  let childLoadCount = 0;
  const childsLength = items === undefined ? 0 : items.length;
  useLayoutEffect(() => {
    setIsLoading(true);
  }, [items]);

  const increaseChildLoadCount = useCallback(() => {
    childLoadCount += 1;
    if (childLoadCount === childsLength) {
      setIsLoading(false);
      childLoadCount = 0;
    }
  }, [childLoadCount, childsLength]);

  const data2 = items;

  return (
    <>
      {isLoading && <LoadingBox>Loading...</LoadingBox>}
      <FoodListBox isLoading={isLoading}>
        {data2?.map((info, idx) => (
          <FoodItem
            foodinfo={info}
            increaseChildLoadCount={increaseChildLoadCount}
            key={idx}
          />
        ))}
      </FoodListBox>
    </>
  );
};

export default FoodList;
