import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
  height: 100px;
  border-top: 1px solid transparent;
  background-color : #fff1d6;

  /* position: absolute;
  left : 0;
  bottom: 0; */
  width : 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return <FooterBox>this is footer</FooterBox>;
};

export default Footer;
