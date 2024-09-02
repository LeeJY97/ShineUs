// import FeedHeader from "../components/FeedHeader";
import FeedList from "../components/FeedList";
import styled from "styled-components";

const MyFeed = () => {
  return (
    <StyledContainer>
      <FeedList />
    </StyledContainer>
  );
};

export default MyFeed;

const StyledContainer = styled.div`
  background-color: #fff3dc;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
