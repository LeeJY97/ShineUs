import styled from "styled-components";
import { useShine } from "../context/ShineContext";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.nav`
  width: 250px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLogo = styled.div`
  img {
    height: 170px;
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    width: 200px;
    height: 60px;
    border-radius: 20px;
  }
`;
const Nav = () => {
  const { isLoggedIn } = useShine();
  const navigate = useNavigate();

  const handlePageMove = (path) => {
    console.log("path", path);
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 에러 :", error);
    }
  };
  return (
    <StyledContainer>
      <StyledLogo>
        <img src="./src/assets/images/common/shine-us-logo.png" alt="logo" />
      </StyledLogo>
      <StyledButtonBox>
        {!isLoggedIn && (
          <>
            <button onClick={() => handlePageMove("/signin")}>로그인</button>
            <button onClick={() => handlePageMove("/signup")}>회원가입</button>
          </>
        )}
        <button onClick={() => handlePageMove("/")}>메인페이지</button>
        {isLoggedIn && (
          <>
            <button onClick={() => handlePageMove("/mypage")}>마이페이지</button>
            <button onClick={() => handlePageMove("/myfeed")}>마이피드</button>
            <button
              onClick={() => {
                handleSignOut();
              }}
            >
              로그아웃
            </button>
          </>
        )}
      </StyledButtonBox>
    </StyledContainer>
  );
};

export default Nav;
