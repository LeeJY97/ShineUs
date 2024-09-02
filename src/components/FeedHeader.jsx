import styled from "styled-components";

const FeedHeader = () => {
  return (
    <StyledContainer>
      <h4>내가 쓴 글</h4>
      <h5>좋아요</h5>
      <h5>댓글</h5>
    </StyledContainer>
  );
};

export default FeedHeader;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 30px;
  margin-top: 20px;
  cursor: pointer;

  h5,
  h4 {
    &:hover {
      font-weight: bold;
      position: relative;
    }
    &:hover::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 100%;
      height: 4px;
      background-color: #ffc966;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease-in-out;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
