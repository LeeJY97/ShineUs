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

const StyledProfileImage = styled.div`
  margin: 20px 0;
  img {
    border-radius: 20px;
    object-fit: cover;
  }
`;
const MyPageProfile = () => {
  // 상태 정의
  const [imgUrl, setImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 컴포넌트가 처음 렌더링될 때, 또는 상태가 업데이트될 때 실행되는 useEffect
  useEffect(() => {
    // 프로필 이미지를 가져오는 비동기 함수 정의
    const fetchProfileImage = async () => {
      try {
        // 현재 로그인된 사용자 정보를 가져옴
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (user) {
          // 사용자의 img_url을 데이터베이스에서 가져옴
          const { data, error } = await supabase.from("userinfo").select("img_url").eq("id", user.id).single();

          if (error) {
            console.error("프로필을 가져오는 중 오류 발생:", error);
          } else {
            console.log("Fetched image URL:", data.img_url); // 디버깅 로그
            setImgUrl(data.img_url || ""); // 가져온 img_url을 상태로 설정
          }
        } else if (userError) {
          console.error("사용자를 가져오는 중 오류 발생:", userError);
        }
      } catch (error) {
        console.error("프로필 이미지를 가져오는 중 예외 발생:", error);
      }
    };

    fetchProfileImage(); // 프로필 이미지 가져오기 함수 실행
  }, []); // 빈 배열을 두 번째 인수로 전달하여 이 useEffect가 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  // 파일 입력 필드의 변경을 처리하는 함수
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // 사용자가 선택한 파일을 상태로 설정
  };

  // 아바타 이미지를 업로드하는 비동기 함수 정의
  const uploadAvatar = async () => {
    if (!selectedFile) return; // 선택된 파일이 없으면 함수 종료

    setUploading(true); // 업로드 중 상태로 설정

    try {
      // 현재 사용자 가져오기
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("사용자가 로그인되지 않았습니다.");
        setUploading(false); // 업로드 중 상태를 false로 설정
        return;
      }

      // Supabase 스토리지에 이미지 업로드
      const fileName = `${user.id}-${selectedFile.name}`; // 파일명을 사용자 ID와 파일 이름으로 설정
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${fileName}`, selectedFile, { upsert: true }); // 이미지 업로드 (같은 파일명 있을 시 덮어쓰기)

      if (uploadError) {
        console.error("이미지 업로드 중 오류 발생:", uploadError);
        setUploading(false); // 업로드 중 상태를 false로 설정
        return;
      }

      // 업로드된 파일의 공개 URL을 가져옴
      const {
        data: { publicUrl },
        error: urlError
      } = supabase.storage.from("avatars").getPublicUrl(`avatars/${fileName}`);
      if (urlError) {
        console.error("공개 URL 가져오는 중 오류 발생:", urlError);
      } else {
        // console.log("Data, ", data);
        // console.log("Public URL:", publicURL); // 디버깅 로그
        const { error: updateError } = await supabase.from("userinfo").update({ img_url: publicUrl }).eq("id", user.id);

        if (updateError) {
          console.error("프로필 이미지 URL 업데이트 중 오류 발생", updateError);
        } else {
          setImgUrl(publicUrl); // imgUrl 상태 업데이트
          alert("프로필 이미지 변경 완료"); // 업로드 완료 알림
        }
      }
    } catch (error) {
      console.error("이미지 업로드 중 예외 발생:", error);
    } finally {
      setUploading(false); // 업로드 중 상태를 false로 설정
      setSelectedFile(null); // 선택된 파일 상태 초기화
    }
  };

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      <StyledProfileImage>
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
      </StyledProfileImage>

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
