import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styleVariables from "../global_style/variables";

const PageBox = styled.section`
  display: table;
  margin: 0 auto;
  background-color: white;
  box-sizing: border-box;
`;
const ResultBox = styled.div`
  margin-top: ${styleVariables.HEADER_HEIGHT};
  @media ${({ theme }) => theme.size_5} {
    margin-top: ${styleVariables.HEADER_HEIGHT_TWO_LINES};
  }
  padding : ${styleVariables.RESULT_PADDING_TOP} 0;
  
`;

interface DefaultPageProps {
  children?: React.ReactNode;
}

const DefaultPageLayout = ({ children }: DefaultPageProps) => {
  return (
    <div>
      <PageBox>
        <Header />
        <ResultBox>{children}</ResultBox>
      </PageBox>
      <Footer />
    </div>
  );
};

export default DefaultPageLayout;
