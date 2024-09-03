import { useState, useEffect } from "react";
import MainPageInput from "../components/MainPageInput";
import MainPagePosts from "../components/MainPagePosts";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";
import styled from "styled-components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useShine();
  const [likesAndComments, setLikesAndComments] = useState();
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(-1);

  // 좋아요 핸들링 함수
  const handleLike = async (postId) => {
    const isLike = likesAndComments[postId].is_like ?? false;
    let likeCount = likesAndComments[postId].like_count ?? 0;

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
    // 1. 기존 데이터 가져오기
    const existingPost = likesAndComments[postId] || {}; // 없는 경우 기본값으로 빈 객체를 사용

    // 2. 업데이트된 포스트 객체 생성
    const updatedPost = {
      ...existingPost,
      is_like: !isLike, // 새로운 is_like 값 설정
      like_count: likeCount // 새로운 like_count 값 설정
    };

    // 3. 최종 객체 생성
    const updatedLikesAndComments = {
      ...likesAndComments,
      [postId]: updatedPost
    };
    setLikesAndComments(updatedLikesAndComments);
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

    // 불변성 유지 어쩌구 때문에 이렇게 짜야되는거 너무 짜쳐요 진짜 미치겟스빈다
    const existingPost = likesAndComments[postId];

    // 2. comments 배열 생성
    const updatedComments = existingPost
      ? [...(existingPost.comments ?? []), newComments[0]] // 기존 데이터가 있으면 기존 comments에 새 댓글 추가
      : [newComments[0]]; // 기존 데이터가 없으면 새 배열 생성

    // 3. 업데이트된 포스트 객체 생성
    const updatedPost = {
      ...existingPost, // existingPost가 undefined일 때도 문제가 없도록 처리
      comments: updatedComments
    };

    // 4. 최종 객체 생성
    const updatedLikesAndComments = {
      ...likesAndComments,
      [postId]: updatedPost
    };

    setLikesAndComments(updatedLikesAndComments);
    toggleCommentForm(-1);
  };

  const toggleCommentForm = (index) => {
    setIsCommentFormVisible(index);
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

      setLikesAndComments(likesAndComments);
    };

    fetchPosts();
  }, []);

  const addPostHandler = (data) => {
    setPosts([data, ...posts]);

    setLikesAndComments({ ...likesAndComments, [data.id]: { is_like: false, like_count: 0, comments: [] } });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div>
      <MainPageInput
        addPostHandler={addPostHandler}
        tags={tags}
        setTags={setTags}
        setLikesAndComments={setLikesAndComments}
      />
      {posts.length && (
        <MainPagePosts
          posts={posts}
          likesAndComments={likesAndComments}
          handleLike={handleLike}
          handleComments={handleComments}
          toggleCommentForm={toggleCommentForm}
          isCommentFormVisible={isCommentFormVisible}
        />
      )}
      <StyledMoveTopButton onClick={scrollToTop}>Top</StyledMoveTopButton>
    </div>
  );
};

export default Home;

const StyledMoveTopButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
`;
