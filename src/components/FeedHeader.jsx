import styled from "styled-components";

const FeedHeader = ({ nickname, changeType, activeType }) => {
  return (
    <StyledHeaderContainer>
      <StyledH5 isActive={activeType === "mine"} onClick={() => changeType("mine")}>
        {nickname} 님의 글
      </StyledH5>
      <StyledH5 isActive={activeType === "like"} onClick={() => changeType("like")}>
        좋아요
      </StyledH5>
    </StyledHeaderContainer>
  );
};

export default FeedHeader;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100vh;
  gap: 10px;
`;

const StyledH5 = styled.h5`
  margin-left: 20px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 4px;
    background-color: ${({ isActive }) => (isActive ? "#ffc966" : "transparent")};
    transform: ${({ isActive }) => (isActive ? "scaleX(1)" : "scaleX(0)")};
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    font-weight: bold;
  }

  &:hover::after {
    transform: scaleX(1);
    background-color: #ffc966;
  }
`;
