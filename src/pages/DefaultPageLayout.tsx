import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PageBox = styled.section`
  display: table;
  margin: 0 auto;
  background-color: white;
  box-sizing: border-box;
`;
const ResultBox = styled.div`
  margin-top: 100px;
  @media ${({ theme }) => theme.size_5} {
    margin-top: 120px;
  }
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
