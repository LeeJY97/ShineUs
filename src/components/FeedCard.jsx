import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import supabase from "../supabaseClient";

const FeedCard = ({ data, onDelete, onEdit, type }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTags, setNewTags] = useState("");
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
      setNewTags(data.tags);
      setNewImage(data.img_url);
      setNewContents(data.contents);
    } else {
      if (data.posts) {
        setNickname(data.posts.userinfo.nickname);
        setNewTags(data.posts.tags);
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
    if (input.length <= 200) {
      setNewContents(input);
    } else {
      alert(`내용은 200자 이내로 작성해주세요.`);
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

  //태그 수정
  const handleTagChange = (e) => {
    setNewTags(e.target.value);
  };

  // supabase수정
  const handleEditSaveClick = async () => {
    const { error } = await supabase
      .from("posts")
      .update({
        contents: newContents,
        tags: newTags,
        img_url: newImage
      })
      .eq("id", data.id);

    if (error) {
      console.error("Error =>:", error);
      alert("업데이트 중 오류가 발생.");
    } else {
      onEdit(data.id, newContents, newImage, newTags);
      console.log("🚀 ~ handleEditSaveClick ~ newTags:", newTags);
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
        <h3>{nickname}</h3>
        <h6>
          {isEditing ? (
            <input type="text" value={newTags} onChange={handleTagChange} />
          ) : (
            newTags &&
            typeof newTags === "string" &&
            newTags.split(", ").map((tag, index) => <span key={index}>#{tag} </span>)
          )}
        </h6>
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
  position: relative;
  background-color: white;
  padding: 20px 20px;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: default;

  width: 100%;
  max-width: 300px;

  h3 {
    font-size: 20px;
    font-weight: bold;
  }

  h6 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: #ffc966;
    text-align: justify;
    margin: 10px 0px 10px 0px;
    width: 300px;
  }

  h6 input {
    color: #ffc966;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #ffc966;
  }

  p {
    margin: 20px 0;
    font-weight: 18px;
    text-align: justify;
  }

  .buttonStyle {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    width: 100%;

    position: absolute;
    bottom: 20px;
    right: 20px;

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
  padding-bottom: 70px;

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
