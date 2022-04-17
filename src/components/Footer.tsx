import React from "react";
import styled from "styled-components";
import Badge from "../images/Edamam_Badge_Transparent.svg";

const FooterBox = styled.div`
  height: 100px;
  border-top: 1px solid transparent;
  background-color: #fff1d6;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeBox = styled.div`
    width : 200px;
`;
const Footer = () => {
  return (
    <FooterBox>
      <BadgeBox>
        <Badge />
      </BadgeBox>
    </FooterBox>
  );
};

export default Footer;
