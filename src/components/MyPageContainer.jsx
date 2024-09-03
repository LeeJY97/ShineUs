import styled from "styled-components";
import MyPageProfile from "./MyPageProfile";
import MyPageMyInfo from "./MyPageMyInfo";

const StyledMyPageContentContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MyPageContainer = () => {
  return (
    <StyledMyPageContentContainer>
      <MyPageProfile />
      <MyPageMyInfo />
    </StyledMyPageContentContainer>
  );
};

export default MyPageContainer;
