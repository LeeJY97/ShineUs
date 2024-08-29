import styled from "styled-components";
const MainPagePosts = ({ posts }) => {
  return (
    <StyledContainer>
      {posts.map((post) => (
        <StyledPostBox key={post.id}>
          <h2>{post.user}</h2>
          <p>{post.text}</p>
        </StyledPostBox>
      ))}
    </StyledContainer>
  );
};

export default MainPagePosts;

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
`;

const StyledPostBox = styled.div`
  background-color: white;
  padding: 30px;
  margin: 30px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 5px;
  cursor: default;

  &:hover {
    transition: 0.3s;
    transform: scale(1.02);
  }
`;
