import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import MyPageProfile from "./MyPageProfile";

const StyledMyPageContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const MyPageContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      const { data, error } = await supabase.from("userinfo").select("*").eq("id", user.id).single();

      if (error) throw error;

      setName(data.nickname || "");
      setEmail(data.email || "");
      setAvatarUrl(data.img_url || "");
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => setIsEditing(false);

  return (
    <StyledMyPageContentContainer>
      <MyPageProfile />
      <Input
        type="text"
        value={name}
        disabled={!isEditing}
        onChange={(e) => setName(e.target.value)}
        placeholder="@userName"
      />
      <Input
        type="email"
        value={email}
        disabled={true}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user@example.com"
      />
      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>저장</button>
        </>
      ) : (
        <button onClick={handleEditClick}>수정</button>
      )}
    </StyledMyPageContentContainer>
  );
};

export default MyPageContainer;
