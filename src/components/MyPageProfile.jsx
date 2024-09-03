import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import MyPageProfileImage from "./MyPageProfileImage";

const ProfileContainer = styled.div`
  margin-bottom: 20px;
`;

const MyPageProfile = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase.from("userinfo").select("img_url").eq("id", user.id).single();

          if (error) {
            console.error("프로필을 가져오는 중 오류 발생:", error);
          } else {
            setImgUrl(data.img_url || "");
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
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("사용자가 로그인되지 않았습니다.");
        setUploading(false);
        return;
      }

      const fileName = `${user.id}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${fileName}`, selectedFile, { upsert: true });

      if (uploadError) {
        console.error("이미지 업로드 중 오류 발생:", uploadError);
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
        error: urlError
      } = supabase.storage.from("avatars").getPublicUrl(`avatars/${fileName}`);
      if (urlError) {
        console.error("공개 URL 가져오는 중 오류 발생:", urlError);
      } else {
        const { error: updateError } = await supabase.from("userinfo").update({ img_url: publicUrl }).eq("id", user.id);

        if (updateError) {
          console.error("프로필 이미지 URL 업데이트 중 오류 발생", updateError);
        } else {
          setImgUrl(publicUrl);
          alert("프로필 이미지 변경 완료");
        }
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
      <MyPageProfileImage
        imgUrl={imgUrl}
        defaultImageUrl="https://pjctzvrxutdmmxvfjczt.supabase.co/storage/v1/object/public/avatars/avatars/59d0c974-47d1-41df-8ce2-6e1ad43166b1.jpg"
      />
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
