import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const FeedCard = ({ data, onDelete, onEdit }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(data.text);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
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
    onEdit(data.id, newText);
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
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)} rows="4" cols="34" />
        ) : (
          <p>{data.text}</p>
        )}
      </div>

      <img src={data.img_url} alt={data.title} />

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

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
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
