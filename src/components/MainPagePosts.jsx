const MainPagePosts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.user}</h2>
          <p>{post.text}</p>
        </div>
      ))}
      ;
    </>
  );
};

export default MainPagePosts;
