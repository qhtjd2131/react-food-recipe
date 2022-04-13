import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
  height: 100px;
  border-top: 1px solid gray;

  position: absolute;
  left : 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return <FooterBox>this is footer</FooterBox>;
};

export default Footer;
