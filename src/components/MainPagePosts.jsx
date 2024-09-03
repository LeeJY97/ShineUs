import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WriteCommentForm from "./WriteCommentForm";
import CommentList from "./CommentList";

const MainPagePosts = ({ posts, likesAndComments, handleLike, handleComments }) => {
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5));

  const [page, setPage] = useState(1); // 현재 페이지 상태
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

          <StyledContent>{post.contents}</StyledContent>
          <StyledImageBox>{post.img_url && <StyledImage src={post.img_url} />}</StyledImageBox>

          <StyledCommentContainer>
            <StyledLikeBtn className="likeBtn" onClick={() => handleLike(index)}>
              {likesAndComments[post.id]?.is_like ? `♥` : `♡`}
              {likesAndComments[post.id]?.like_count}
            </StyledLikeBtn>

            <StyledCommentButton onClick={() => toggleCommentForm(index)}>댓글 달기</StyledCommentButton>
            {isCommentFormVisible === index && ( // index -1 로 바꾸기, comment 내용 날리기
              <WriteCommentForm postId={post.id} handleComments={handleComments} index={index} />
            )}
            <CommentList postId={post.id} comments={likesAndComments[post.id]?.comments}></CommentList>
          </StyledCommentContainer>
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

const StyledContent = styled.p`
  margin: 20px 0;
  font-weight: 18px;
`;

const StyledImageBox = styled.div`
  width: 500px;
  height: 500px;
  margin: 40px auto;
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled.img`
  /* width: 90%; */
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: center;
  border-radius: 5px;
`;

const StyledTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const StyledPostTags = styled.div`
  color: #ffad16;
  margin: 5px 0;
`;

const StyledCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLikeBtn = styled.span`
  /* position: absolute;
  top: 80px;
  right: 30px; */
  font-size: 20px;
`;

const StyledCommentButton = styled.button`
  /* position: absolute;
  top: 30px;
  right: 20px; */
`;
