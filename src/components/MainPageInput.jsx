import { useState } from "react";

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
    <>
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
        </label>
        <button type="submit">자랑하기</button>
      </form>
    </>
  );
};

export default MainPageInput;
