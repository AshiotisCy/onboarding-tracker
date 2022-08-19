import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../config/styledElements";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${colors.ivory};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  color: ${colors.burgundy};
  font-size: 100px;
  margin: 0;
`;

const Subtitle = styled.h3`
  color: ${colors.burgundy};
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  a {
    width: 100%;
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid ${colors.lighterbluegray};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.bluegray};
    :hover {
      scale: 1.05;
      border: 2px solid ${colors.lighterbluegray};
      font-weight: 600;
      color: ${colors.lighterbluegray};
    }
  }
`;

const Error404 = () => {
  return (
    <Wrapper>
      <Inner>
        <Title>Error 404</Title>
        <Subtitle>Something went wrong</Subtitle>
        <ButtonWrapper>
          <Link to="users">Homepage</Link>
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
};

export default Error404;
