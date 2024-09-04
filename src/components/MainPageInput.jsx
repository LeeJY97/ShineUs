import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import MainPageTag from "./MainPageTag";

const MainPageInput = ({ addPostHandler, tags, setTags }) => {
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

    if (!selectedImage) {
      alert("사진을 선택해주세요.");
      return;
    }

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
        tags: tags.join(", "),
        contents: postContent,
        img_url: img_url
      })
      .select("* , userinfo (*)")
      .single();

    if (postError) {
      console.error("Error inserting post:", postError.message);
      return;
    }

    addPostHandler({ ...newPost });

    setPostContent("");
    setPreviewImage(null);
    setSelectedImage(null);
    setTags([]);
    alert("업로드 되었습니다.");
  };

  return (
    <StyledContainer>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <MainPageTag tags={tags} setTags={setTags} />
          <textarea
            name="postContent"
            rows={8}
            cols={50}
            placeholder="내용을 입력해주세요."
            value={postContent}
            maxLength={200}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
          {previewImage && (
            <StyledImageWrapper>
              <StyledImage src={previewImage} alt="이미지 미리보기" />
            </StyledImageWrapper>
          )}
          <StyledButtonsBox>
            <input type="file" onChange={handleImageChange} accept="image/*"></input>
            <button type="submit">자랑하기</button>
          </StyledButtonsBox>
        </label>
      </form>
    </StyledContainer>
  );
};

export default MainPageInput;

const StyledContainer = styled.div`
  /* display: flex;
  justify-content: center; */
  

  label {
    position: relative;
  }

  textarea {
    width: 560px;
    height: 200px;
    font-size: 16px;
    padding: 20px;
    outline: none;
    resize: none;
    border: 1px solid #eeeeee;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    &:focus::placeholder {
      color: transparent;
    }
  }
`;

const StyledButtonsBox = styled.div`
  /* position: absolute;
  bottom: -60px;
  right: 10px;
  height: 40px;
  border-radius: 30px;
  transition: 0.3s; */
  position: absolute;
  width: 300px;
  bottom: 10px; /* 텍스트 영역 하단에 배치 */
  right: 10px; /* 텍스트 영역의 오른쪽 끝으로 정렬 */
  display: flex; /* 요소들을 가로로 배치 */
  justify-content: space-between; /* 요소들 사이에 공간을 균등하게 배치 */
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  height: 40px;
  border-radius: 30px;
  transition: 0.3s;

  input[type="file"] {
    width: 200px;
  }

  input[type="file"]::file-selector-button {
    padding: 10px 20px;
    background: #ffc966;
    border-radius: 30px;
    border: none;
    cursor: pointer;
  }
`;

const StyledImageWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: -0;
`;

const StyledImage = styled.img`
  /* position: absolute;
  right: 0;
  max-width: 250px;
  object-fit: cover;
  border-radius: 5px; */
  max-width: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;
