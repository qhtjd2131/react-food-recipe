import React from "react";
import styled from "styled-components";

const MIButtonBox = styled.div`
  width : 100%;
  display : flex;
  justify-content : center;
  border-radius: 20px;
  padding: 0.4rem;
  border: none;
  
`;
const MIButton = styled.button`
  border: none;
  border-radius: inherit;
  width: 180px;
  height: 36px;
  background-color: orange;
  font-size: 1.4rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color : #d88d01;
  }
`;

interface MIButtonPropsInterface {
  onClick: () => void;
}
const MoreInfoButton = (props: MIButtonPropsInterface) => {
  return (
    <MIButtonBox>
      <MIButton onClick={props.onClick}>More Info</MIButton>
    </MIButtonBox>
  );
};

export default MoreInfoButton;
