import React from "react";
import styled from "styled-components";
import Router from "./shared/Router";
import GlobalStyled from "./shared/GlobalStyled";
import { ShineProvider } from "./context/ShineContext";

// 전체 (nav) div
const StyledLoginBar = styled.div`
  border: 2px solid black;
  display: inline-block;
`;

// '빛나리' 문구
const StyledLoginTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-align: center;
  font-weight: bold;
  padding: 15px 0px 25px 15px;
`;

// 🌟 이모지
const StyledLoginTitleStarImozi = styled.span`
  font-size: 23px;
  padding-right: 10px;
`;

// 로그인 버튼, 메인 페이지 버튼
// 감싸는 div
const StyledLoginAndMainPageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// 로그인 버튼
const StyledLoginButton = styled.button`
  width: 180px;
  height: 53px;
  cursor: pointer;
`;

function App() {
  return (
    <>
      <StyledLoginBar>
        {/* 제목 */}
        <StyledLoginTitle>
          빛나리<StyledLoginTitleStarImozi>🌟</StyledLoginTitleStarImozi>
        </StyledLoginTitle>
        {/* 로그인 버튼*/}
        <StyledLoginAndMainPageDiv>
          <StyledLoginButton>로그인</StyledLoginButton>
          {/* 메인페이지 버튼 */}
          <StyledLoginButton>메인페이지</StyledLoginButton>
        </StyledLoginAndMainPageDiv>
      </StyledLoginBar>

      <GlobalStyled />
      <ShineProvider>
        <Router />
      </ShineProvider>
    </>
  );
}
export default App;
