import { useState } from "react";
import SHINE_DATA from "../mock";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";

const Home = () => {
  const [posts, setPosts] = useState(SHINE_DATA);
  const addPosthandler = (data) => {
    setPosts([data, ...posts]);
  };
  return (
    <>
      <MainPageInput addPosthandler={addPosthandler} />
      <MainPagePosts posts={posts} />
    </>
  );
};

export default Home;
