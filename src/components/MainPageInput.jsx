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
      {/* {previewImage && <StyledImage src={previewImage} alt="이미지 미리보기" />} */}
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <MainPageTag tags={tags} setTags={setTags} />
          <div className="contentsWrap">
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
              <div>
                <StyledImage src={previewImage} alt="이미지 미리보기" />
              </div>
            )}
          </div>
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
  margin-top: 40px;
  display: flex;
  justify-content: center;

  label {
    position: relative;
  }

  .contentsWrap {
    position: relative;

    textarea {
      width: 600px;
      height: 200px;
      font-size: 16px;
      padding: 20px;
      outline: none;
      resize: none;
      border: 1px solid #eeeeee;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      padding-right: 120px;
      box-sizing: border-box;
      font-size: 12px;
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
      }

      &:focus::placeholder {
        color: transparent;
      }
    }

    div {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 1;
      width: 75px;
      height: 75px;
      border-radius: 12px;
      /* border: 1px solid rgba(0, 0, 0, 0.15); */
      /* box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.15); */
      padding: 10px;
      transition: all 0.4s ease;
      transform-origin: center center;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        /* width: 80px;
        height: 80px; */
        transform: scale(1.05);
      }

      img {
        width: 100%;
        /* height: 65px; */
        box-sizing: border-box;
        position: absolute;
        right: 0;
        /* object-fit: cover; */
        border-radius: 5px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 1);
      }
    }
  }
`;

const StyledButtonsBox = styled.div`
  position: absolute;
  bottom: -60px;
  right: 10px;
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
    font-family: "Paperlogy-8ExtraBold";

    &:hover {
      background-color: #ffb84d;
    }
  }
`;

const StyledImage = styled.img`
  /* border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.15); */

  &:hover {
  }
`;
