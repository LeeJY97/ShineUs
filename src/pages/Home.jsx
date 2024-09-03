import { useState, useEffect } from "react";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  // 포스팅 한 DB (좋아요 누른 사람, 좋아요 개수 포함)
  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      // 1. posts및 likes 테이블 조회
      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*, userinfo (*), likes (*), comments (*)")
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Error postsError:", postsError.message);
        return [];
      }

      // 2. 로그인 한 user가 좋아요 누른 posts 정보
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

      // 3. 게시글에 좋아요 여부(로그인 유저 기준), 전체 좋아요 수 표시
      const postsWithLikes = posts.map((post) => ({
        ...post,
        is_like: likedPostIds.includes(post.id),
        like_count: post.likes.length
      }));

      console.log("postsWithLikes", postsWithLikes);

      setPosts(postsWithLikes);
    };

    fetchPosts();
  }, []);

  const addPostHandler = (data) => {
    setPosts([data, ...posts]);
  };
  return (
    <div>
      <MainPageInput addPostHandler={addPostHandler} tags={tags} setTags={setTags} />
      {posts.length && <MainPagePosts posts={posts} />}
    </div>
  );
};

export default Home;
