import styled from "styled-components";
import { useShine } from "../context/ShineContext";
import supabase from "../supabaseClient";

// 전체 (nav) div
// const StyledContainer = styled.div`
//   border: 2px solid black;
//   display: inline-block;
//   position: fixed;
//   left: 0;
//   width: 300px;
// `;

// const StyledLogo = styled.div`
//   /* width: 200px;
//   height: 200px; */
// `;

// const StyledButtonBox = styled.div`
//   display: flex;
//   width: 60%;
//   flex-direction: column;
//   margin: 0 auto;
//   /* background-color: black; */
//   gap: 20px;
//   align-items: center;
// `;

// const StyledButton = styled.button`
//   width: 180px;
//   height: 53px;
//   cursor: pointer;
// `;

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
  return (
    <StyledContainer>
      <StyledLogo>
        <img src="./src/assets/images/shine-us-logo.png" alt="logo" />
      </StyledLogo>
      <StyledButtonBox>
        {!isLoggedIn && (
          <>
            <button>로그인</button>
            <button>회원가입</button>
          </>
        )}
        <button>메인페이지</button>
        {isLoggedIn && (
          <>
            <button>마이페이지</button>
            <button>마이피드</button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
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
