import React from "react";
import styled, { keyframes } from "styled-components";

const rotateLoading = keyframes`
  0% {
    transform: rotate(0deg);
  };
  100% {
    transform: rotate(360deg);
  };
`;

const loadingTextOpacity = keyframes`
  0% {
    opacity: 0;
  };
  20% {
    opacity: 0;
  };
  50% {
    opacity: 1;
  };
  100% {
    opacity: 0;
  };

`;

const LoadingBox = styled.div`
  margin: 40px auto;
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;
  z-index : 1;
`;

const Loader = styled.div`
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent orange transparent orange;
  transform-origin: 50% 50%;
  animation: ${rotateLoading} 1.5s linear 0s infinite normal;
`;
const LoadingText = styled.p`
  animation: ${loadingTextOpacity} 2s linear 0s infinite normal;
  font-family: "Helvetica Neue, " Helvetica ", " "arial";
  font-size: 10px;
  color: orange;
  font-weight: bold;
  margin-top: 45px;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 100px;
`;
const Loading = () => {
  return (
    <LoadingBox>
      <Loader></Loader>
      <LoadingText>loading..</LoadingText>
    </LoadingBox>
  );
};

export default Loading;
