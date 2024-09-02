import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteCommentForm = ({ postId, index, handleComments }) => {
  const [content, setContent] = useState("");

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  // setCommentList([...commentList, newComments[0]]);
  //   setCommentList((prevComments) => {
  //     console.log("prevComments", prevComments);
  //     console.log("newComments", newComments);
  //     const updatedComments = [...prevComments, newComments[0]];
  //     console.log("updatedComments", updatedComments);

  //     return updatedComments;
  //   });
  // };

  return (
    <StyledContainer>
      <h1>댓글달기</h1>
      <textarea onChange={handleChangeContent} value={content}></textarea>
      <button
        onClick={() => {
          handleComments({ postId, index, content });
        }}
      >
        업로드
      </button>
    </StyledContainer>
  );
};

export default WriteCommentForm;
