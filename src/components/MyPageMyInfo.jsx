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
  const [name, setName] = useState(""); // 닉네임 상태 초기화
  const [email, setEmail] = useState(""); // 이메일 상태 초기화
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 초기화
  const [originalName, setOriginalName] = useState(""); // 원래 닉네임 상태 초기화

  useEffect(() => {
    fetchUserData(); // 컴포넌트가 마운트될 때 사용자 데이터 가져오기
  }, []);

  // 사용자 데이터를 가져오는 비동기 함수 정의
  const fetchUserData = async () => {
    try {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser(); // 현재 로그인한 사용자 정보 가져오기
      if (authError) throw authError; // 인증 오류가 있으면 예외 발생

      if (!user) {
        console.error("로그인 되어 있지 않습니다."); // 사용자 정보가 없으면 오류 로그 출력
        return;
      }

      const { data, error } = await supabase
        .from("userinfo") //  userinfo 테이블 선택
        .select("*") // 데이터 전체 선택
        .eq("id", user.id) // userinfo 테이블에서 현재 로그인한 사용자의 ID와 일치하는 행을 선택
        .single(); // 선택된 결과에서 단일 행을 반환

      if (error) throw error;

      setName(data.nickname || ""); // 닉네임 상태 업데이트
      setOriginalName(data.nickname || ""); // 원래 닉네임 상태 업데이트
      setEmail(data.email || ""); // 이메일 상태 업데이트
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message); // 오류 로그 출력
    }
  };

  const handleEditClick = () => {
    setOriginalName(name); // 현재 닉네임을 원래 이름으로 저장
    setIsEditing(true); // 수정 모드로 전환
  };

  const handleSaveClick = async () => {
    try {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser(); // 현재 로그인한 사용자 정보 가져오기
      if (authError) throw authError; // 인증 오류가 있으면 예외 발생

      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      const { error } = await supabase.from("userinfo").update({ nickname: name }).eq("id", user.id); // userinfo 테이블의 닉네임 업데이트

      if (error) throw error; // 오류 발생 시 예외 발생

      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("닉네임 저장 중 오류 발생:", error.message);
    }
  };

  const handleCancelClick = () => {
    setName(originalName); // 닉네임을 원래 값으로 되돌림
    setIsEditing(false); // 수정 모드 종료
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
