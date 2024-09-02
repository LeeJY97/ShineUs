import styled from "styled-components";
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const FeedList = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const fetchUserData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error=>:", userError);
        return;
      }
      setUser(userData.user);

      // 로그인한 사용자의 포스트와 닉네임 가져오기
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*, userinfo(nickname)")
        .eq("user_id", userData.user.id);

      if (postsError) {
        console.error("Error=>:", postsError);
      } else {
        console.log(postsData);
        setMyPosts(postsData);
        if (postsData.length > 0) {
          setNickname(postsData[0].userinfo.nickname);
        }
      }
    };

    fetchUserData();
  }, []);

  // 삭제
  const handleDelete = (id) => {
    setMyPosts(myPosts.filter((item) => item.id !== id));
  };

  // 수정
  const handleEdit = (id, newContents) => {
    setMyPosts(myPosts.map((item) => (item.id === id ? { ...item, contents: newContents } : item)));
  };

  return (
    <div>
      <StyledHeaderContainer>
        <h5>{nickname} 님의 글</h5>
        <h5>좋아요</h5>
      </StyledHeaderContainer>
      <StyledContainer>
        {myPosts.map((card) => (
          <FeedCard key={card.id} data={card} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </StyledContainer>
    </div>
  );
};

export default FeedList;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 100%;
  padding: 20px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100vh;
  gap: 10px;

  cursor: pointer;

  h5 {
    margin-left: 20px;
    &:hover {
      font-weight: bold;
      position: relative;
    }
    &:hover::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 100%;
      height: 4px;
      background-color: #ffc966;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease-in-out;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
