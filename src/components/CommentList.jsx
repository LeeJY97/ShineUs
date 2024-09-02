import styled from "styled-components";
const StyledPostBox = styled.div`
  background-color: white;
  padding: 30px;
  margin: 30px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 5px;
`;

const CommentList = ({ postId, comments = [] }) => {
  return (
    <>
      {comments.map((comment) => (
        <StyledPostBox key={comment.id}>{comment.content}</StyledPostBox>
      ))}
    </>
  );
};

export default CommentList;
