import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: block;
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const MyPageMyInfo = () => {
  // 상태 정의
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [originalName, setOriginalName] = useState("");

  // 컴포넌트가 처음 렌더링될 때 사용자 데이터를 가져옴
  useEffect(() => {
    fetchUserData();
  }, []);

  // 사용자 데이터를 가져옴는 비동기 함수
  const fetchUserData = async () => {
    try {
      // 사용자 정보를 가져옴
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      // 사용자가 로그인되어 있지 않으면 메시지를 출력
      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      // userinfo 테이블에서 사용자 데이터를 가져옴
      const { data, error } = await supabase.from("userinfo").select("*").eq("id", user.id).single();

      if (error) throw error;

      // 닉네임과 이메일, 아바타 URL을 상태에 저장
      setName(data.nickname || "");
      setOriginalName(data.nickname || "");
      setEmail(data.email || "");
      setAvatarUrl(data.img_url || "");
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
    }
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEditClick = () => {
    setOriginalName(name); // 현재 닉네임을 원래 이름 상태에 저장
    setIsEditing(true);
  };

  // 저장 버튼 클릭 시 호출되는 함수
  const handleSaveClick = async () => {
    try {
      // 사용자 정보를 가져옴
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      // 사용자가 로그인되어 있지 않으면 메시지를 출력
      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      // userinfo 테이블에서 닉네임을 업데이트
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

  // 취소 버튼 클릭 시 호출되는 함수
  const handleCancelClick = () => {
    setName(originalName); // 닉네임을 원래 값으로 되돌림
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <StyledInfoContainer>
      <Input
        type="text"
        value={name} // 닉네임 상태를 입력 필드에 바인딩
        disabled={!isEditing} // 편집 모드가 아니면 입력 필드를 비활성화
        onChange={(e) => setName(e.target.value)}
        placeholder="@userName"
      />
      <Input
        type="email"
        value={email} // 이메일 상태를 입력 필드에 바인딩
        disabled={true} // 이메일 필드는 항상 비활성화
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
