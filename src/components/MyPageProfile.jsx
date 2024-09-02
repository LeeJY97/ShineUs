import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

const ProfileContainer = styled.div`
  margin-bottom: 20px;
`;

const NoImageContainer = styled.div`
  width: 150px;
  height: 150px;
  background-color: #eee;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPageProfile = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // 사용자 정보를 가져오는 부분 수정됨
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase.from("userinfo").select("img_url").eq("id", user.id).single();

          if (error) {
            console.error("프로필을 가져오는 중 오류 발생:", error);
          } else {
            console.log("Fetched image URL:", data.img_url); // 디버깅 로그
            setImgUrl(data.img_url || ""); // 이미지 URL 상태 업데이트
          }
        } else if (userError) {
          console.error("사용자를 가져오는 중 오류 발생:", userError);
        }
      } catch (error) {
        console.error("프로필 이미지를 가져오는 중 예외 발생:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      // 현재 사용자 가져오기
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("사용자가 로그인되지 않았습니다.");
        setUploading(false);
        return;
      }

      // Supabase 스토리지에 이미지 업로드
      const fileName = `${user.id}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${fileName}`, selectedFile, { upsert: true });

      if (uploadError) {
        console.error("이미지 업로드 중 오류 발생:", uploadError);
        setUploading(false);
        return;
      }

      // 업로드된 이미지의 공개 URL 가져오기
      const {
        data: { publicUrl },
        error: urlError
      } = supabase.storage.from("avatars").getPublicUrl(`avatars/${fileName}`);
      if (urlError) {
        console.error("공개 URL 가져오는 중 오류 발생:", urlError);
      } else {
        setImgUrl(publicUrl);
        alert("프로필 이미지 변경 완료");
      }
    } catch (error) {
      console.error("이미지 업로드 중 예외 발생:", error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      {imgUrl ? (
        <img src={imgUrl} alt="Avatar" width={150} height={150} />
      ) : (
        <NoImageContainer>
          <img
            src="https://pjctzvrxutdmmxvfjczt.supabase.co/storage/v1/object/public/avatars/avatars/59d0c974-47d1-41df-8ce2-6e1ad43166b1.jpg"
            alt="No image"
            width={150}
            height={150}
          />
        </NoImageContainer>
      )}
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        <button onClick={uploadAvatar} disabled={uploading || !selectedFile}>
          {uploading ? "업로드중..." : "이미지 업로드"}
        </button>
      </div>
    </ProfileContainer>
  );
};

export default MyPageProfile;
