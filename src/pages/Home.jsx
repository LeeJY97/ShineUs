import { useState, useEffect } from "react";
// import SHINE_DATA from "../mock";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import { useShine } from "../context/ShineContext";
import Nav from "../components/Nav";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useShine();

  console.log("isLoggedIn", isLoggedIn);

  // 포스팅 한  DB (이미지 X)
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
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

  const testLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      <Nav></Nav>
      <Link to="/signin">로그인 </Link>
      <Link to="/signup">회원가입 </Link>
      <Link to="/mypage">마이페이지 </Link>
      <Link to="/myfeed">마이피드 </Link>
      <button onClick={testLogout}>로그아웃 </button>
      <MainPageInput addPosthandler={addPosthandler} />
      <MainPagePosts posts={posts} />
    </>
  );
};

export default Home;
