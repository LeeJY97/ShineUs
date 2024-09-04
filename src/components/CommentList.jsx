import styled from "styled-components";

const CommentList = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <StyledPostBox key={comment.id} isLast={index === comments.length - 1}>
          {comment.content}
        </StyledPostBox>
      ))}
    </>
  );
};

export default CommentList;

const StyledPostBox = styled.div`
  padding: 10px;
  border-bottom: ${({ isLast }) => (isLast ? "none" : "1px solid #ddd")};
`;
