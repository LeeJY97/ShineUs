import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

const ProfileContainer = styled.div`
  margin-bottom: 20px;
`;

const MyPageProfile = ({ avatarUrl, setAvatarUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (avatarUrl) {
      downloadImage();
    }
  }, [avatarUrl]);

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

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      {avatarUrl ? <img src={avatarUrl} alt="Avatar" width={150} height={150} /> : <div>No image</div>}
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        <button onClick={uploadAvatar} disabled={uploading || !selectedFile}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </ProfileContainer>
  );
};

export default MyPageProfile;
