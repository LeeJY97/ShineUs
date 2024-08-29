import styled from "styled-components";
import FeedCard from "./FeedCard";
import SHINE_DATA from "../mock";

const FeedList = () => {
  return (
    <StyledContainer>
      {SHINE_DATA.sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map((card) => (
          <FeedCard key={card.id} data={card} />
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
