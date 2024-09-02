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
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserData();
    downloadImage();
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

      const { data, error } = await supabase
        .from("userinfo")
        .select("nickname, email, img_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setName(data.nickname || "");
      setEmail(data.email || "");
      setAvatarUrl(data.img_url || "");
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
    }
  };

  const downloadImage = async () => {
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

      const filePath = `avatars/${user.id}.jpg`; // 파일 경로 설정
      const { data, error: downloadError } = await supabase.storage.from("avatars").download(filePath);

      if (downloadError) {
        console.error("이미지를 다운로드하는 중 오류 발생:", downloadError.message);
        return;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("이미지를 다운로드하는 중 오류 발생:", error.message);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!selectedFile) {
      alert("업로드할 이미지를 선택해주세요.");
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) {
        console.error("로그인 되어 있지 않습니다.");
        return;
      }

      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { publicURL, error: urlError } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (urlError) throw urlError;

      const { error: updateError } = await supabase.from("userinfo").update({ img_url: publicURL }).eq("id", user.id);
      if (updateError) throw updateError;

      setAvatarUrl(publicURL);
    } catch (error) {
      alert("이미지 업로드 오류 발생:", error.message);
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
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
