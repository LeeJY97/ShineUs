import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

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

  // 업로드
  const handleSubmit = async (e) => {
    e.preventDefault();

    let img_url = null;

    // 이미지가 선택 시 Supabase Storage에 업로드
    if (selectedImage) {
      const fileName = `post_img_${Date.now()}.png`;
      const { data, error } = await supabase.storage.from("post_img").upload(fileName, selectedImage);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      img_url = `https://pjctzvrxutdmmxvfjczt.supabase.co/storage/v1/object/public/${data.fullPath}`;
    }

    // 게시글 데이터 생성 및 Supabase에 저장
    const { data: newPost, error: postError } = await supabase
      .from("posts")
      .insert({
        contents: postContent,
        img_url: img_url
      })
      .select("*")
      .single();

    if (postError) {
      console.error("Error inserting post:", postError.message);
      return;
    }

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
