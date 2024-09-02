import { useState, useEffect } from "react";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import { useShine } from "../context/ShineContext";
import Nav from "../components/Nav";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]); // 전체 태그 배열
  const { isLoggedIn } = useShine();

  console.log("isLoggedIn", isLoggedIn);

  // 포스팅 한  DB (이미지 X)
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, userinfo (*)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const addPosthandler = (data) => {
    console.log("data", data);
    setPosts([data, ...posts]);
  };

  return (
    <>
      <MainPageInput addPosthandler={addPosthandler} tags={tags} setTags={setTags} />
      <MainPagePosts posts={posts} />
    </>
  );
};

export default Home;
