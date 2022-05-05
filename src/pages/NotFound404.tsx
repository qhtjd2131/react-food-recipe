import React from "react";

import styled from "styled-components";
import DefaultPageLayout from "./DefaultPageLayout";

const NotFoundBox = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const NotFound404 = () => {
  return (
    <DefaultPageLayout>
      <NotFoundBox>page not found</NotFoundBox>
    </DefaultPageLayout>
  );
};

export default NotFound404;
