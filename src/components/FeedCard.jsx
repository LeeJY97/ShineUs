import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const FeedCard = ({ data, onDelete, onEdit }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContents, setNewContents] = useState(data.contents);
  const [newImage, setNewImage] = useState(data.img_url);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  //글자 수 제한
  const handleContentChange = (e) => {
    const input = e.target.value;
    if (input.length <= 80) {
      setNewContents(input);
    } else {
      alert(`내용은 80자 이내로 작성해주세요.`);
    }
  };

  // 이미지 선택 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // 삭제
  const handleDelete = () => {
    onDelete(data.id);
    alert("삭제되었습니다.");
  };

  // 수정
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    onEdit(data.id, newContents, newImage);
    setIsEditing(false);
  };

  return (
    <StyledContainer>
      <div>
        <h6>
          #{data.category}
          <HeartIcon onClick={toggleHeart} filled={isFilled ? 1 : 0} />
        </h6>

        {isEditing ? (
          <textarea value={newContents} onChange={handleContentChange} rows="4" cols="34" maxLength={200} />
        ) : (
          <p>{data.contents}</p>
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

      <div className="buttonStyle">
        {isEditing ? (
          <button onClick={handleSaveClick}>저장</button>
        ) : (
          <>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
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
  padding: 30px;
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
    margin: 20px 0px 20px 0px;
    width: 100%;
  }

  p {
    text-align: justify;
    line-height: 1.3;
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
  color: ${({ isFilled }) => (isFilled ? "#ffc966" : "gray")};
  cursor: pointer;
  transition: color 0.3s ease;
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
