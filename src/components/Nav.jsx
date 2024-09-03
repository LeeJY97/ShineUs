import styled from "styled-components";
import { useShine } from "../context/ShineContext";
import supabase from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledContainer = styled.nav`
  width: 250px;
  height: 700px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  box-sizing: border-box;

  &.mainNav {
    top: 50%;
    transform: translateY(-50%);
  }
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
  gap: 30px;

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

const StyledBottomBox = styled.div`
  position: absolute;
  bottom: 10px;
  span {
    font-size: 12px;
    color: #a3a3a3;
  }
`;
const Nav = () => {
  const { isLoggedIn } = useShine();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCurrentPage = (path) => pathname === path;
  const [nickname, setNickname] = useState("");

  const handlePageMove = (path) => {
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

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error=>:", userError);
        return;
      }

      const { data: userInfoData } = await supabase.from("userinfo").select("nickname").eq("id", userData.user.id);
      setNickname(userInfoData[0].nickname);
    };

    fetchUserData();
  });

  return (
    <StyledContainer className={pathname === "/" ? "mainNav" : null}>
      <StyledLogo>
        <img onClick={() => handlePageMove("/")} src="/public/images/common/shine-us-logo.png" alt="logo" />
      </StyledLogo>
      {isLoggedIn && <span>{nickname}</span>}
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
      <StyledBottomBox>
        <span>© 2024 React777 . All rights reserved.</span>
      </StyledBottomBox>
    </StyledContainer>
  );
};

export default Nav;
