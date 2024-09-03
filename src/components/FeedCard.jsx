import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import supabase from "../supabaseClient";

const FeedCard = ({ data, onDelete, onEdit, type }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContents, setNewContents] = useState(data.contents);
  const [newImage, setNewImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    if (data) {
      init();
    }
  }, [data]);

  const init = () => {
    if (type === "mine") {
      setNickname(data.userinfo.nickname);
      setNewImage(data.img_url);
      setNewContents(data.contents);
    } else {
      if (data.posts) {
        setNickname(data.posts.userinfo.nickname);
        setNewImage(data.posts.img_url);
        setNewContents(data.posts.contents);
      }
    }
  };

  // 좋아요(토글)
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  //글자 수 제한
  const handleContentChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    if (input.length <= 80) {
      setNewContents(input);
    } else {
      alert(`내용은 80자 이내로 작성해주세요.`);
    }
  };

  // 이미지 선택 처리
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // supabase삭제
  const handleDelete = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", data.id);

    if (error) {
      console.error("Error=>", error);
      alert("삭제 중 오류가 발생.");
    } else {
      onDelete(data.id);
      alert("삭제되었습니다.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // supabase수정
  const handleEditSaveClick = async () => {
    const { error } = await supabase
      .from("posts")
      .update({
        contents: newContents,
        img_url: newImage
      })
      .eq("id", data.id);

    if (error) {
      console.error("Error =>:", error);
      alert("업데이트 중 오류가 발생.");
    } else {
      onEdit(data.id, newContents, newImage);
      setIsEditing(false);
      alert("수정되었습니다.");
    }
  };
  console.log(">>>>>>");
  console.log(data);
  if (!data) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  //좋아요 취소
  const handleRemoveLikeClick = async () => {
    const { error } = await supabase.from("likes").delete().match({ post_id: data.posts.id });

    if (error) {
      console.error("Error =>", error);
      alert("좋아요 제거 중 오류가 발생.");
    } else {
      alert("좋아요가 취소되었습니다.");
      onDelete(data.posts.id);
      toggleHeart();
    }
  };

  return (
    <StyledContainer>
      <div>
        <h6>{nickname}</h6>
        {isEditing ? (
          <textarea value={newContents} onChange={handleContentChange} rows="4" cols="34" maxLength={200} />
        ) : (
          <p>{newContents}</p>
        )}
      </div>

      <ImageContainer>
        {isEditing && (
          <ImageUploadButton>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <OverlayText>사진을 수정하세요</OverlayText>
          </ImageUploadButton>
        )}
        <img src={newImage} alt={data.title} />
      </ImageContainer>

      {type !== "like" ? (
        <div className="buttonStyle">
          {isEditing ? (
            <button onClick={handleEditSaveClick}>저장</button>
          ) : (
            <>
              <button onClick={handleEditClick}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </>
          )}
        </div>
      ) : (
        <div className="buttonStyle">
          <HeartIcon onClick={handleRemoveLikeClick} filled={isLiked ? 1 : 0} />
        </div>
      )}
    </StyledContainer>
  );
};

export default FeedCard;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 0px 20px 0px 20px;
  background-color: white;
  width: 300px;
  height: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h6 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #ffc966;
    text-align: justify;
    margin: 10px 0px 10px 0px;
    width: 300px;
  }

  p {
    text-align: justify;
    line-height: 1.3;
  }

  span {
    cursor: pointer;
  }
  .buttonStyle {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
    width: 100%;

    button {
      background-color: transparent;
      border: 1px solid #ffc966;
      cursor: pointer;

      &:hover {
        background-color: #ffc966;
      }
    }
  }
`;

const HeartIcon = styled(FaHeart).attrs(({ filled }) => ({
  color: filled ? "#ffc966" : "gray"
}))`
  font-size: 20px;
  color: ${({ isLiked }) => (isLiked ? "#ffc966" : "gray")};
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  justify-content: flex-end;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ImageUploadButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(102, 102, 102, 0.5);
  color: white;
  border-radius: 8px;
  cursor: pointer;

  input[type="file"] {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  color: white;
  font-size: 13px;
  opacity: 1;
`;
