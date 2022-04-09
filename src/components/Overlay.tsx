import React from "react";
import styled from "styled-components";

const OverlayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;
/* display : ${(props => props.isOpen ? "block" : "none")}; */
interface OverlayProps {
  setIsOverlayOpen: (value: React.SetStateAction<boolean>) => void;
  children?: React.ReactNode;
  ref? : any;
}

const Overlay = ({ children, setIsOverlayOpen }: OverlayProps) => {
  const onSetIsOverlayOpen = () => {
    // setIsOverlayOpen(false);
  };
  return <OverlayBox onClick={onSetIsOverlayOpen}>{children}</OverlayBox>;
};

export default Overlay;
