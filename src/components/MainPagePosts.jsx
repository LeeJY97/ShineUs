import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
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

    console.log("likeCount", likeCount);

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

    setDetailPosts((prevPosts = []) => {
      return prevPosts.map((post, i) => (i === index ? { ...post, is_like: !isLike, like_count: likeCount } : post));
    });
  };

  // 댓글 작성 함수
  const handleComments = async ({ postId, index, content }) => {
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

    console.log("newComments", newComments);
    console.log("detailPosts", detailPosts);

    setDetailPosts((prevPosts) => {
      const newPosts = prevPosts.map((prev, i) => {
        if (i === index) {
          return { ...prev, comments: [...prev.comments, ...newComments] };
        }
        return prev;
      });
      return newPosts;
    });
  };

  const toggleCommentForm = (index) => {
    setIsCommentFormVisible(index);
  };

  return (
    <StyledContainer>
      {displayedPosts.map((post, index) => (
        <StyledPostBox key={post.id} ref={getObserverRef(index, displayedPosts, observerRef)}>
          <StyledTitle className="user-id">{post.userinfo.nickname}</StyledTitle>
          <StyledPostTags className="post-tags">
            {post.tags &&
              typeof post.tags === "string" &&
              post.tags.split(", ").map((tag, index) => <span key={index}>#{tag} </span>)}
          </StyledPostTags>
          <StyledLikeBtn className="likeBtn" onClick={() => handleLike(index)}>
            {detailPosts[index]?.is_like ? `♥` : `♡`}
            {detailPosts[index]?.like_count}
          </StyledLikeBtn>
          <StyledContent>{post.contents}</StyledContent>
          {post.img_url && <StyledImage src={post.img_url} />}

          <button onClick={() => toggleCommentForm(index)}>댓글 달기</button>
          {isCommentFormVisible === index && ( // index -1 로 바꾸기, comment 내용 날리기
            <WriteCommentForm postId={post.id} handleComments={handleComments} index={index} />
          )}
          <CommentList postId={post.id} comments={detailPosts[index].comments}></CommentList>
        </StyledPostBox>
      ))}
    </StyledContainer>
  );
};

export default MainPagePosts;

const StyledContainer = styled.div`
  max-width: 650px;
  margin: 80px auto;
`;

const StyledPostBox = styled.div`
  position: relative;
  background-color: white;
  padding: 30px 20px;
  margin: 30px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: default;

  &:hover {
    transition: 0.3s;
    transform: scale(1.02);
  }
`;
const StyledImage = styled.img`
  max-width: 500px;
  max-height: 400px;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 5px;
`;

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const StyledPostTags = styled.div`
  color: #ffad16;
  margin: 5px 0;
`;

const StyledLikeBtn = styled.span`
  position: absolute;
  top: 60px;
  right: 30px;
  font-size: 20px;
`;

const StyledContent = styled.p`
  margin: 20px 0;
  font-weight: 18px;
`;
