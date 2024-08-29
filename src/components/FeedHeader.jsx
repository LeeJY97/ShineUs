import React from "react";
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
`;
