import { useState, useEffect } from "react";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";
import Nav from "../components/Nav";
import { useShine } from "../context/ShineContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useShine();
  const [likesAndComments, setLikesAndComments] = useState();

  // 좋아요 핸들링 함수
  const handleLike = async (postId) => {
    const isLike = likesAndComments[postId].is_like;
    let likeCount = likesAndComments[postId].like_count;

    if (isLike) {
      const { error: likesDeleteError } = await supabase
        .from("likes")
        .delete()
        .match({ user_id: user.id, post_id: postId });

      if (likesDeleteError) {
        console.error(likesDeleteError.message);
      } else {
        likeCount += -1;
      }
    } else {
      const { error: likesInsertError } = await supabase.from("likes").insert({
        user_id: user.id,
        post_id: postId
      });

      if (likesInsertError) {
        console.error(likesInsertError.message);
      } else {
        likeCount += 1;
      }
    }

    const newTest = {
      ...likesAndComments,
      [postId]: { ...likesAndComments[postId], is_like: !isLike, like_count: likeCount }
    };
    setLikesAndComments(newTest);
  };

  // 댓글 작성 함수
  const handleComments = async ({ postId, content }) => {
    const { data: newComments, error: commentsError } = await supabase
      .from("comments")
      .insert({
        user_id: user.id,
        post_id: postId,
        content
      })
      .select("*");

    if (commentsError) {
      console.error("Error commentsError => ", commentsError.message);
    }

    const obj = {
      ...likesAndComments,
      [postId]: { ...likesAndComments[postId], comments: [...likesAndComments[postId].comments, newComments[0]] }
    };

    console.log("obj", obj);

    setLikesAndComments(obj);
  };

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

      setPosts(postsWithLikes);

      const likesAndComments = {};

      postsWithLikes.forEach((post) => {
        likesAndComments[post.id] = {
          is_like: post.is_like,
          like_count: post.like_count,
          comments: post.comments
        };
      });

      return setLikesAndComments(likesAndComments);
    };

    fetchPosts();
  }, []);

  const addPostHandler = (data) => {
    setPosts([data, ...posts]);
  };
  return (
    <>
      <MainPageInput addPostHandler={addPostHandler} tags={tags} setTags={setTags} />
      {posts.length && (
        <MainPagePosts
          posts={posts}
          likesAndComments={likesAndComments}
          handleLike={handleLike}
          handleComments={handleComments}
        />
      )}
    </>
  );
};

export default Home;
