import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const FeedCard = ({ data }) => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <StyledContainer>
      <div>
        <h6>
          #{data.category}
          <HeartIcon onClick={toggleHeart} isFilled={isFilled} />
        </h6>

        <img src={data.img_url} alt={data.title} />
        <h2>{data.title} </h2>
        <p>{data.text}</p>
      </div>
      <div className="buttonStyle">
        <button>수정</button>
        <button>삭제</button>
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
    margin-bottom: 10px;
    border-radius: 8px;
  }

  h2 {
    margin-bottom: 10px;
  }

  p {
    text-align: justify;
    line-height: 1.3;
  }

  .buttonStyle {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 20px;
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

const HeartIcon = styled(FaHeart)`
  font-size: 20px;
  color: ${({ isFilled }) => (isFilled ? "#ffc966" : "gray")};
  cursor: pointer;
  transition: color 0.3s ease;
`;
