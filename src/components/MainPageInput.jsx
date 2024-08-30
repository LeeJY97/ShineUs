import { useState } from "react";
import styled from "styled-components";

const MainPageInput = ({ addPosthandler }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 이미지 선택 함수
  const handleImageChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      setSelectedImage(imgFile);
      setPreviewImage(URL.createObjectURL(imgFile));
    }
  };
  //********* Supabase Storage에 이미지를 업로드하고 URL을 받아온 후 생성

  // 업로드
  const handleSubmit = (e) => {
    e.preventDefault();

    // 이미지 FormData
    const formData = new FormData();
    formData.append("text", postContent);
    formData.append("user", "익명");
    formData.append("image", selectedImage);

    // 새로운 포스트 생성(임시)
    const newPost = {
      id: crypto.randomUUID(),
      text: postContent,
      user: "익명",
      img_url: previewImage
    };

    addPosthandler(newPost);

    setPostContent("");
    setPreviewImage(null);
    setSelectedImage(null);

    alert("업로드 되었습니다.");
  };

  return (
    <StyledContainer>
      {previewImage && (
        <div>
          <StyledImage src={previewImage} alt="이미지 미리보기" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      )}
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
          <input type="file" onChange={handleImageChange} accept="image/*"></input>
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

  input[type="file"] {
    position: absolute;
    bottom: 40px;
    right: 40px;
  }

  textarea {
    width: 600px;
    height: 200px;
    border: 1px solid #eeeeee;
    padding: 20px;
    outline: none;
    resize: none;
    border-radius: 10px;
  }

  button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    height: 40px;
    border-radius: 30px;
    transition: 0.3s;
  }
`;

const StyledImage = styled.img`
  max-width: 500px;
  object-fit: cover;
  /* margin-top: 15px;
  border-radius: 5px; */
`;
