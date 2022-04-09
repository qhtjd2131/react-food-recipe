import React from "react";
import styled from "styled-components";

const OverlayBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
interface OverlayProps {
  children?: React.ReactNode;
}

const Overlay = ({ children }: OverlayProps) => {
  return <OverlayBox>{children}</OverlayBox>;
};

export default Overlay;
