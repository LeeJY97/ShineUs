import styled from "styled-components";
import SignInSideBar from "../components/SignInSideBar";
import SignUpContainer from "../components/SignUpContainer";

const StyledContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100vw;
  height: 100vh;
  align-items: center;
  gap: 30px;
`;

const Join = () => {
  return (
    <StyledContainer>
      <SignInSideBar />
      <SignUpContainer />
    </StyledContainer>
  );
};

export default Join;
