import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import MyPageInput from "./MyPageInput";

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyPageMyInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
    }
  };

  const handleEditClick = () => {
    setOriginalName(name);
    setIsEditing(true);
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

      const { error } = await supabase.from("userinfo").update({ nickname: name }).eq("id", user.id);

      if (error) throw error;

      setIsEditing(false);
    } catch (error) {
      console.error("닉네임 저장 중 오류 발생:", error.message);
    }
  };

  const handleCancelClick = () => {
    setName(originalName);
    setIsEditing(false);
  };

  return (
    <StyledInfoContainer>
      <MyPageInput
        type="text"
        value={name}
        disabled={!isEditing}
        onChange={(e) => setName(e.target.value)}
        placeholder="@userName"
      />
      <MyPageInput
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
    </StyledInfoContainer>
  );
};

export default MyPageMyInfo;
