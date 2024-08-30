import { useState, useEffect } from "react";
import SHINE_DATA from "../mock";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";

const Home = () => {
  const [posts, setPosts] = useState(() => {
    const selectPost = async () => {
      const { data, error } = await supabase.from("posts").select("*");

      console.log("data", data);
    };
  });
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
