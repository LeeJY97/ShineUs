import { useState, useEffect } from "react";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // 포스팅 한  DB (이미지 X)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data, error } = await supabase
  //       .from("posts")
  //       .select("*, userinfo (*), likes (*)")
  //       .order("created_at", { ascending: false });
  //     if (error) {
  //       console.error("Error fetching posts:", error.message);
  //     } else {
  //       setPosts(data);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*, userinfo (*), likes (*)")
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Error postsError:", postsError.message);
        return [];
      }

      const { data: userLikes, error: userLikesError } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", user?.id);

      let likedPostIds;
      if (userLikesError) {
        console.error("userLikesError", userLikesError.message);
        likedPostIds = [];
      } else {
        likedPostIds = userLikes.map((like) => like.post_id);
      }

      // 3. 게시글에 좋아요 여부 추가하기
      const postsWithLikes = posts.map((post) => ({
        ...post,
        is_like: likedPostIds.includes(post.id)
      }));

      setPosts(postsWithLikes);
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
