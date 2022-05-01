import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import DefaultPageLayout from "./DefaultPageLayout";

const BosungBox = styled.div`
  width: 800px;
  display: inline-block;
  line-height: 2rem;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  margin-top: 1rem;
  font-size: 1.2rem;
  padding: 1.4rem 4.4rem;
  @media ${({ theme }) => theme.size_9} {
    width: 700px;
  }
  @media ${({ theme }) => theme.size_8} {
    width: 600px;
  }
  @media ${({ theme }) => theme.size_7} {
    width: 500px;
  }
  @media ${({ theme }) => theme.size_6} {
    width: 400px;
    padding: 1rem 1rem;
  }
  @media ${({ theme }) => theme.size_5} {
    width: 300px;
    padding: 1rem 1rem;
  }
`;

const TextLabel = styled.label`
  font-weight: 600;
`;
const ValueText = styled.p``;
const TechStackBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Tech = styled.div`
  margin: 0.6rem 1rem;
  box-sizing: content-box;
  padding: 0.4rem 0.6rem;
  white-space: nowrap;
  background-color: #e5e5e5;
  color: black;
  transition: 0.2s;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const HyperLink = styled.a`
  color: blue;
  cursor: pointer;
`;

const Bosung = () => {
  const tech = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "TypeScript",
    "Redux",
    "webpack",
    "babel",
    "GSAP (Animation Library)",
  ];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DefaultPageLayout>
      <BosungBox>
        <TextLabel>이름 (Name)</TextLabel>
        <ValueText>최보성 (Choi Bosung)</ValueText>
        <br />
        <TextLabel>출생년도(Year of Born)</TextLabel>
        <ValueText>1996</ValueText>
        <br />
        <TextLabel>이메일 (Email)</TextLabel>
        <ValueText>qhtjd2131@gmail.com</ValueText>
        <br />
        <TextLabel>연락처 (Phone Number)</TextLabel>
        <ValueText>010-3506-9552</ValueText>
        <br />
        <TextLabel>GitHub</TextLabel>
        <ValueText>
          <HyperLink
            href="https://github.com/qhtjd2131"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bosung's GitHub
          </HyperLink>
        </ValueText>
        <br />
        <TextLabel>블로그 (Blog)</TextLabel>
        <ValueText>
          <HyperLink
            href="https://gatsbybosungblogmain.gatsbyjs.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bosung's BLOG
          </HyperLink>
        </ValueText>
        <br />
        <TextLabel>기술스택 (Tech Stack)</TextLabel>
        <TechStackBox>
          {tech.map((t) => (
            <Tech>{t}</Tech>
          ))}
        </TechStackBox>
      </BosungBox>
    </DefaultPageLayout>
  );
};

export default Bosung;


