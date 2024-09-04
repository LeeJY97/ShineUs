import styled from "styled-components";
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import FeedHeader from "./FeedHeader";

const FeedList = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [nickname, setNickname] = useState("");
  const [checkType, setCheckType] = useState("mine");

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const fetchUserData = async () => {
      // fetchUserData
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error=>:", userError);
        return;
      }

      const { data: userInfoData } = await supabase.from("userinfo").select("nickname").eq("id", userData.user.id);
      setNickname(userInfoData[0].nickname);

      if (checkType == "mine") {
        // 로그인한 사용자의 포스트와 닉네임 가져오기
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*, userinfo(nickname)")
          .eq("user_id", userData.user.id);

        if (postsError) {
          console.error("Error=>:", postsError);
        }
        setMyPosts(postsData);
      } else {
        const { data: postsData, error: postsError } = await supabase
          .from("likes")
          .select("post_id, posts(id, img_url, contents, created_at, tags, userinfo(nickname))")
          .eq("user_id", userData.user.id);
        if (postsError) {
          console.error("Error=>:", postsError);
        }
        setMyPosts(postsData);
      }
    };
    fetchUserData();
  }, [checkType]);

  // 삭제
  const handleDelete = (id) => {
    setMyPosts(myPosts.filter((item) => item.id !== id));
  };

  // 수정
  const handleEdit = (id, newContents, newImage, newTags) => {
    setMyPosts(myPosts.map((item) => (item.id === id ? { ...item, tags: newTags, contents: newContents } : item)));
  };

  const changeType = (type) => {
    setCheckType(type);
  };

  return (
    <div>
      <FeedHeader nickname={nickname} changeType={changeType} activeType={checkType} />
      <StyledContainer>
        {myPosts.map((card) => (
          <FeedCard key={card.id} data={card} onDelete={handleDelete} onEdit={handleEdit} type={checkType} />
        ))}
      </StyledContainer>
    </div>
  );
};

export default FeedList;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 100%;
  padding: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
