import styled from "styled-components";
import { useShine } from "../context/ShineContext";
import supabase from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

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
  position: sticky;
  top: 0;
`;

const StyledLogo = styled.div`
  img {
    height: 170px;
  }

  cursor: pointer;
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;

  button {
    width: 80%;
    height: 60px;
    border-radius: 20px;

    &:disabled {
      background-color: #ffad16;
      color: black;
      cursor: default;
    }
  }
`;
const Nav = () => {
  const { isLoggedIn } = useShine();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log("pathname", pathname);

  const isCurrentPage = (path) => pathname === path;

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
        <img onClick={() => handlePageMove("/")} src="./src/assets/images/common/shine-us-logo.png" alt="logo" />
      </StyledLogo>
      <StyledButtonBox>
        {!isLoggedIn && (
          <>
            <button onClick={() => handlePageMove("/signin")} disabled={isCurrentPage("/signin")}>
              로그인
            </button>
            <button onClick={() => handlePageMove("/signup")} disabled={isCurrentPage("/signup")}>
              회원가입
            </button>
          </>
        )}
        <button onClick={() => handlePageMove("/")} disabled={isCurrentPage("/")}>
          메인페이지
        </button>
        {isLoggedIn && (
          <>
            <button onClick={() => handlePageMove("/mypage")} disabled={isCurrentPage("/mypage")}>
              마이페이지
            </button>
            <button onClick={() => handlePageMove("/myfeed")} disabled={isCurrentPage("/myfeed")}>
              마이피드
            </button>
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
