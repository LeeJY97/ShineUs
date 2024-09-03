import { useState } from "react";
import styled from "styled-components";

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
      <textarea onChange={handleChangeContent} value={content} placeholder="댓글을 남겨주세요."></textarea>
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

const StyledContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;

  textarea {
    width: 580px;
    height: 50px;
    padding: 10px;
    outline: none;
    resize: none;
    border: 1px solid #eeeeee;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    &:focus::placeholder {
      color: transparent;
    }
  }

  button {
    width: 90px;
    margin-top: 10px;
  }
`;
