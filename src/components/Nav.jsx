import styled from "styled-components";
import { useShine } from "../context/ShineContext";

// 전체 (nav) div
const StyledContainer = styled.div`
  border: 2px solid black;
  display: inline-block;
  position: fixed;
  left: 0;
  width: 300px;

  h1 {
    font-size: 3rem;
    text-align: center;
    text-align: center;
    font-weight: bold;
    padding: 15px 0px 25px 15px;

    span {
      font-size: 23px;
      padding-right: 10px;
    }
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  margin: 0 auto;
  /* background-color: black; */
  gap: 20px;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 180px;
  height: 53px;
  cursor: pointer;
`;
const Nav = () => {
  const { isLoggedIn } = useShine();

  const handlePageMove = (path) => {};
  return (
    <StyledContainer>
      <h1>
        빛나리<span>🌟</span>
      </h1>
      <StyledButtonBox>
        {!isLoggedIn && (
          <>
            <StyledButton onClick={() => handlePageMove("/signin")}>로그인</StyledButton>
            <StyledButton onClick={() => handlePageMove("/signup")}>회원가입</StyledButton>
          </>
        )}
        <StyledButton onClick={() => handlePageMove("/")}>메인페이지</StyledButton>
        {isLoggedIn && (
          <>
            <StyledButton onClick={() => handlePageMove("/mypage")}>마이페이지</StyledButton>
            <StyledButton onClick={() => handlePageMove("/myfeed")}>마이피드</StyledButton>
          </>
        )}
      </StyledButtonBox>
    </StyledContainer>
  );
};

export default Nav;
