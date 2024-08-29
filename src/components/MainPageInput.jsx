import { useState } from "react";
import styled from "styled-components";

const MainPageInput = ({ addPosthandler }) => {
  const [postContent, setPostContent] = useState("");

  // 업로드
  const handleSubmit = (e) => {
    e.preventDefault();

    // 새로운 포스트 생성(임시)
    const newPost = {
      id: crypto.randomUUID(),
      text: postContent,
      user: "익명"
    };

    addPosthandler(newPost);

    setPostContent("");
    alert("업로드 되었습니다.");
  };

  return (
    <StyledContainer>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <textarea
            name="postContent"
            rows={8}
            cols={50}
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
          <button type="submit">자랑하기</button>
        </label>
      </form>
    </StyledContainer>
  );
};

export default MainPageInput;

const StyledContainer = styled.div`
  margin: 30px 0 20px;
  display: flex;
  justify-content: center;

  form {
    display: flex;
    align-items: end;
    gap: 20px;
  }

  label {
    position: relative;
  }

  textarea {
    width: 600px;
    border: 1px solid #eeeeee;
    outline: none;
    resize: none;
    border-radius: 10px;
  }
  button {
    position: absolute;
    bottom: 15px;
    right: 15px;
    height: 40px;
    border-radius: 30px;
    transition: 0.3s;
  }
`;
