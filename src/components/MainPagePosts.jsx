import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WriteCommentForm from "./WriteCommentForm";
import CommentList from "./CommentList";

const MainPagePosts = ({
  posts,
  likesAndComments,
  handleLike,
  handleComments,
  toggleCommentForm,
  isCommentFormVisible
}) => {
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5));

  const [page, setPage] = useState(1); // 현재 페이지 상태

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
      { threshold: 0.2 }
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

  console.log("displayedPosts", displayedPosts);

  return (
    <StyledContainer>
      {displayedPosts.map((post, index) => (
        <StyledPostBox key={post.id} ref={getObserverRef(index, displayedPosts, observerRef)}>
          <StyledTopArea>
            <img src={post.userinfo.img_url || "./images/common/default-profile.jpg"} alt="프로필사진" />
            <StyledTitle>{post.userinfo.nickname}</StyledTitle>
          </StyledTopArea>
          {/* <StyledTitle>{post.userinfo.nickname}</StyledTitle> */}
          {/* <img src={post.userinfo.img_url && "./images/common/default-profile.jpg"} alt="프로필사진" /> */}
          <StyledPostTags>
            {post.tags &&
              typeof post.tags === "string" &&
              post.tags.split(", ").map((tag, index) => (
                <span className="tags" key={index}>
                  #{tag}{" "}
                </span>
              ))}
          </StyledPostTags>

          <StyledContent>{post.contents}</StyledContent>
          <StyledImageBox>{post.img_url && <StyledImage src={post.img_url} />}</StyledImageBox>

          <StyledCommentContainer>
            <StyledLikeBtn onClick={() => handleLike(post.id)}>
              {likesAndComments[post.id]?.is_like ? `♥` : `♡`}
              {likesAndComments[post.id]?.like_count}
            </StyledLikeBtn>

            <StyledCommentButton onClick={() => toggleCommentForm(index)}>댓글 달기</StyledCommentButton>
          </StyledCommentContainer>
          {isCommentFormVisible === index && ( // index -1 로 바꾸기, comment 내용 날리기
            <WriteCommentForm postId={post.id} handleComments={handleComments} index={index} />
          )}
          <CommentList postId={post.id} comments={likesAndComments[post.id]?.comments}></CommentList>
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
  font-family: "Paperlogy-8ExtraBold";
`;

const StyledPostTags = styled.div`
  color: #ffad16;
  margin: 5px 0;
  font-family: "Paperlogy-8ExtraBold";
`;

const StyledCommentContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledLikeBtn = styled.span`
  width: 50px;
  text-align: center;
  padding: 5px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
  background-color: #ff5454;
  border-radius: 20px;
  cursor: pointer;
`;

const StyledTopArea = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
`;

const StyledCommentButton = styled.button``;
