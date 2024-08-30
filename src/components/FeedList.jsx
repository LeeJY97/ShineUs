import styled from "styled-components";
import FeedCard from "./FeedCard";
import SHINE_DATA from "../mock";
import { useState } from "react";

const FeedList = () => {
  const [feedData, setFeedData] = useState(SHINE_DATA.sort(() => Math.random() - 0.5).slice(0, 10));

  // 삭제
  const handleDelete = (id) => {
    setFeedData(feedData.filter((item) => item.id !== id));
  };

  // 수정
  const handleEdit = (id, newContents) => {
    setFeedData(feedData.map((item) => (item.id === id ? { ...item, contents: newContents } : item)));
  };

  return (
    <StyledContainer>
      {feedData.map((card) => (
        <FeedCard key={card.id} data={card} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </StyledContainer>
  );
};

export default FeedList;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 100%;
  padding: 20px;
`;
