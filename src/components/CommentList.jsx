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

// const CommentList = ({ comments = [] }) => {
//   return (
//     <>
//       {comments.map((comment) => (
//         <StyledPostBox key={comment.id}>{comment.content}</StyledPostBox>
//       ))}
//     </>
//   );
// };

// const StyledPostBox = styled.div`
//   margin: 20px 0;
//   padding-bottom: 5px;
//   word-break: break-all;
//   text-align: start;
// `;
