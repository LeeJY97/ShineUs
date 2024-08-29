import React, { useState } from "react";
import styled from "styled-components";

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

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const users = [
    {
      id: 0,
      name: "김르탄",
      email: "testEmail1@example.com",
      avatar: "../assets/images/avatar1.jpg",
      password: ""
    },
    {
      id: 1,
      name: "홍길동",
      email: "testEmail2@example.com",
      avatar: "../assets/images/avatar2.jpg",
      password: ""
    }
  ];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // 저장 로직 추가 해야함
  };

  return (
    <>
      <div className="profile-card">{/* 프로필이 보여지는 영역 */}</div>
      <div>{/* nav 보여지는 영역: Home, 마이페이지, 로그아웃 */}</div>
      <StyledMyPageContentContainer>
        <h1>Logo</h1>
        <Input
          type="text"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임" // 기본적으로 닉네임 보여지게 하지만 변경은 가능
        />
        <Input
          type="email"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일" // 변경하면 안됨
        />

        {/* 비밀번호 변경할 때 원래 비밀번호 입력, 바꿀 비밀번호와 비밀번호 확인이 필요한데... 이름만 바꿀 */}
        {isEditing ? (
          <>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
            />
            <button onClick={handleSaveClick}>저장</button>
          </>
        ) : (
          <button onClick={handleEditClick}>수정</button>
        )}
      </StyledMyPageContentContainer>
    </>
  );
};

export default MyPage;
