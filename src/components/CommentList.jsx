import styled from "styled-components";

const CommentList = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment) => (
        <StyledPostBox key={comment.id}>{comment.content}</StyledPostBox>
      ))}
    </>
  );
};

export default CommentList;

const StyledPostBox = styled.div`
  margin: 20px 0;
  padding-bottom: 5px;
  word-break: break-all;
  text-align: start;
`;
