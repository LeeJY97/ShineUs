import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import MainPageTag from "./MainPageTag";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";
import WriteCommentForm from "./WriteCommentForm";
import CommentList from "./CommentList";

const MainPagePosts = ({ posts }) => {
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5));
  const [detailPosts, setDetailPosts] = useState(posts);

  const [page, setPage] = useState(1); // 현재 페이지 상태
  const { user } = useShine();
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(-1);

  const observerRef = useRef(); // 마지막 dom요소를 추적할 ref

  // loadMorePosts 함수 선언 - 새로운 포스트 로드
  const loadMorePosts = () => {
    const nextPage = page + 1;
    const newPosts = posts.slice(0, nextPage * 5);
    setDisplayedPosts(newPosts);
    setPage(nextPage);
  };

  // useEffect(() => {
  //   setDetailPosts(posts);
  // }, []);

  //displayedPosts 올리면 실행
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect?.();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [displayedPosts, page]);

  // 새 포스트 업로드 되면 렌더링
  useEffect(() => {
    setDisplayedPosts(posts.slice(0, page * 10));
  }, [posts, page]);

  // ref로 마지막 요소 감지 함수
  const getObserverRef = (index, displayedPosts, observerRef) => {
    return index === displayedPosts.length - 1 ? observerRef : null;
  };

  // 좋아요 핸들링 함수
  const handleLike = async (index) => {
    const isLike = detailPosts[index].is_like;
    let likeCount = detailPosts[index].like_count;

    if (isLike) {
      const { error: likesDeleteError } = await supabase
        .from("likes")
        .delete()
        .match({ user_id: user.id, post_id: detailPosts[index].id });

      if (likesDeleteError) {
        console.error(likesDeleteError.message);
      } else {
        likeCount += -1;
      }
    } else {
      const { error: likesInsertError } = await supabase.from("likes").insert({
        user_id: user.id,
        post_id: detailPosts[index].id
      });

      if (likesInsertError) {
        console.error(likesInsertError.message);
      } else {
        likeCount += 1;
      }
    }

    // posts[index].is_like = !isLike;
    // posts[index].like_count = likeCount;

    setDetailPosts((prevPosts = []) => {
      return prevPosts.map((post, i) => (i === index ? { ...post, is_like: !isLike, like_count: likeCount } : post));
    });
  };

  const toggleCommentForm = (index) => {
    setIsCommentFormVisible(index);
  };

  return (
    <StyledContainer>
      {displayedPosts.map((post, index) => (
        <StyledPostBox key={post.id} ref={getObserverRef(index, displayedPosts, observerRef)}>
          <h3>{post.userinfo.nickname}</h3>
          <h3>
            {post.nickname}
            <span onClick={() => handleLike(index)}>
              {detailPosts[index]?.is_like ? `♥` : `♡`}
              {detailPosts[index]?.like_count}
              {post.userinfo.nickname}
            </span>
          </h3>
          <p>{post.contents}</p>
          {post.img_url && <StyledImage src={post.img_url} />}
          <button onClick={() => toggleCommentForm(index)}>댓글 달기</button>
          {isCommentFormVisible === index && <WriteCommentForm postId={post.id} />}
          <CommentList postId={post.id}></CommentList>
        </StyledPostBox>
      ))}
    </StyledContainer>
  );
};

export default MainPagePosts;

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
`;

const StyledPostBox = styled.div`
  background-color: white;
  padding: 30px;
  margin: 30px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 5px;
  cursor: default;

  &:hover {
    transition: 0.3s;
    transform: scale(1.02);
  }
`;
const StyledImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 5px;
`;
