import React from "react";
import styled from "styled-components";

const FeedCard = ({ data }) => {
  return (
    <StyledContainer>
      <div>
        <h6>{data.category}</h6>
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
  padding: 20px;
  background-color: white;
  width: 300px;
  height: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h6 {
    color: #ffc966;
    margin-bottom: 20px;
    text-align: justify;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  h2 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    text-align: justify;
    line-height: 1.3;
  }

  .buttonStyle {
    display: flex;
    justify-content: flex-end;
    gap: 20px;

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
