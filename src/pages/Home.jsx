import { useState, useEffect } from "react";
// import SHINE_DATA from "../mock";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // 포스팅 한  DB (이미지 X)
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

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
