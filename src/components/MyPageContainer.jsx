import styled from "styled-components";
import MyPageProfile from "./MyPageProfile";
import MyPageMyInfo from "./MyPageMyInfo";
import MyPagePasswordReset from "./MyPagePasswordReset";

const StyledMyPageContentContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MyPageContainer = () => {
  return (
    <StyledMyPageContentContainer>
      <MyPageProfile />
      <MyPageMyInfo />
      <MyPagePasswordReset />
    </StyledMyPageContentContainer>
  );
};

export default MyPageContainer;
