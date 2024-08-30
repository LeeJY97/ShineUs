import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false); // 이미지 업로드 중인지 여부를 저장
  const [selectedFile, setSelectedFile] = useState(null); // 사용자가 선택한 파일 저장

  // 컴포넌트가 처음 렌더링될 때, downloadImage 함수가 호출되도록 설정
  useEffect(() => {
    fetchUserData();
    downloadImage();
  }, []); // 빈 배열[]을 의존성으로 전달하여 컴포넌트의 초기 렌더링 때만 호출

  // 사용자 정보를 Supabase에서 가져옴
  const fetchUserData = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      // userinfo 테이블에서 사용자 정보를 가져옴
      const { data, error } = await supabase
        .from("userinfo")
        .select("nickname, email, img_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("사용자 정보를 가져오는 중 오류 발생: ", error.message);
        return;
      }

      // 상태 업데이트
      setName(data.nickname || "");
      setEmail(data.email || "");
      setAvatarUrl(data.img_url || "");
    } catch (error) {
      console.log("사용자 정보를 가져오는 중 오류 발생: ", error.message);
    }
  };

  // Supabase에서 사용자의 프로필 이미지를 다운로드
  const downloadImage = async () => {
    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser(); // 현재 로그인된 사용자 정보 가져옴

      if (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
        return;
      }

      const { data, error: downloadError } = await supabase.storage.from("avatars").download(user.id); // Supabase에서 사용자 ID에 해당하는 이미지를 다운로드

      if (downloadError) {
        console.log("이미지를 다운로드하는 중 오류 발생:", downloadError.message);
      } else {
        const url = URL.createObjectURL(data); // 데이터를 URL로 변환하여 avatarUrl 상태를 업데이트
        setAvatarUrl(url);
      }
    } catch (error) {
      console.error("이미지를 다운로드하는 중 오류 발생:", error.message);
    }
  };

  // 선택한 파일을 setSelectedFile
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadAvatar = async () => {
    // 파일이 선택되지 않았으면 경고
    if (!selectedFile) {
      alert("업로드할 이미지를 선택해주세요.");
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
        error
      } = await supabase.auth.getUser(); // 현재 로그인된 사용자 정보를 가져옴
      if (error) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      const fileExt = selectedFile.name.split(".").pop(); // 확장자명 반환 ex) profile.jpg를 ["profile", "jpg"]로 나누어 배열을 생성한뒤 pop으로 마지막 요소 반환 => jpg 반환
      const fileName = `${user.id}.${fileExt}`; // 파일 새 이름 생성
      const filePath = `avatars/${fileName}`; // 파일이 저장될 Storage 경로를 설정 (파일이 저장될 경로: "avatars/사용자ID.확장자" 형태 예: "avatars/59d0c974-47d1-41df-8ce2-6e1ad43166b1.jpg")

      // 이미지 Supabase Storage에 업로드
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // 업로드한 이미지의 URL을 Supabase에서 가져오기
      const { publicURL, error: urlError } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (urlError) {
        throw urlError;
      }

      // 해당 URL을 userinfo 테이블의 img_url 업데이트
      const { error: updateError } = await supabase.from("userinfo").update({ img_url: publicURL }).eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // 상태 업데이트
      setAvatarUrl(publicURL);
    } catch (error) {
      alert("이미지 업로드 오류 발생:", error.message);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  // 사용자가 프로필 정보를 수정할 수 있게 함
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정한 프로필 정보를 저장할 수 있게 함
  const handleSaveClick = () => {
    setIsEditing(false);
    // 저장 로직 추가 해야함
  };

  return (
    <>
      <div>{/* nav 보여지는 영역: Home, 마이페이지, 로그아웃 */}</div>

      <StyledMyPageContentContainer>
        <h2>My Profile</h2>

        {/* 프로필 이미지가 보여지는 영역 */}
        {avatarUrl ? <img src={avatarUrl} alt="Avatar" width={150} height={150} /> : <div>No image</div>}
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          <button onClick={uploadAvatar} disabled={uploading || !selectedFile}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {/* 닉네임과 이메일이 보여지는 영역 */}
        <Input
          type="text"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
          placeholder="@userName" // 기본적으로 닉네임 보여지게 하지만 변경은 가능
        />
        <Input
          type="email"
          value={email}
          disabled={true} // 이메일 주소는 수정 불가
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />

        {/* 비밀번호 변경할 때 원래 비밀번호 입력, 바꿀 비밀번호와 비밀번호 확인이 필요한데... 이름만 바꿀 */}
        {isEditing ? (
          <>
            {/* <Input
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
            /> */}
            <button onClick={handleSaveClick}>저장</button>
          </>
        ) : (
          <button onClick={handleEditClick}>수정</button>
        )}
      </StyledMyPageContentContainer>
    </>
  );
};

export default MyPageContainer;
