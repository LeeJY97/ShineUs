import styled from "styled-components";
const MainPagePosts = ({ posts }) => {
  return (
    <StyledContainer>
      {posts.map((post) => (
        <StyledPostBox key={post.id}>
          <h2>{post.user}</h2>
          <p>{post.text}</p>
          <div className="img-box">
            <img src={post.img_url} alt="" />
          </div>
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

  img-box {
    width: 200px;
    height: 500px;
  }
  img {
    width: 100%;
    margin-top: 20px;
  }

  &:hover {
    transition: 0.3s;
    transform: scale(1.02);
  }
`;
