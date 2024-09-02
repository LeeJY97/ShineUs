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
  const [originalName, setOriginalName] = useState("");

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
      setOriginalName(data.nickname || "");
      setEmail(data.email || "");
      setAvatarUrl(data.img_url || "");
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
    }
  };

  const handleEditClick = () => {
    setOriginalName(name); // 현재 닉네임을 원래 이름 상태에 저장
    setIsEditing(true)
  };

  const handleSaveClick = async () => {
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

      const { data, error } = await supabase
        .from("userinfo")
        .update({ nickname: name }) // 업데이트할 필드와 값을 지정
        .eq("id", user.id); // 해당 사용자의 id와 일치하는 행을 업데이트

      if (error) throw error;

      setIsEditing(false); // 수정 모드를 종료
    } catch (error) {
      console.error("닉네임 저장 중 오류 발생:", error.message);
    }
  };

  const handleCancelClick = () => { 
    setName(originalName);  // 닉네임을 원래 값으로 되돌림
    setIsEditing(false);    // 수정 모드 종료
  }

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
          <button onClick={handleCancelClick}>취소</button>
        </>
      ) : (
        <button onClick={handleEditClick}>수정</button>
      )}
    </StyledMyPageContentContainer>
  );
};

export default MyPageContainer;
