import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import MyPageProfileImage from "./MyPageProfileImage";

const ProfileContainer = styled.div`
  margin-bottom: 20px;
`;

const MyPageProfile = () => {
  // 상태 훅 정의 초기화: 이미지 URL, 파일 선택, 업로드
  const [imgUrl, setImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 프로필 이미지를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // Supabase를 사용해 현재 로그인된 사용자의 정보를 가져옴
        const {
          data: { user }, // user 객체에서 데이터를 추출
          error: userError // 발생한 오류를 userError에 저장
        } = await supabase.auth.getUser(); // 현재 로그인된 사용자의 정보를 가져오는 Supabase 메서드
        if (user) {
          // 사용자가 존재할 경우
          // userinfo 테이블에서 해당 사용자의 프로필 이미지 URL을 가져옴
          const { data, error } = await supabase.from("userinfo").select("img_url").eq("id", user.id).single();

          if (error) {
            // 데이터베이스 쿼리 중 오류가 발생한 경우
            console.error("프로필을 가져오는 중 오류 발생:", error); // 오류 메시지 출력
          } else {
            setImgUrl(data.img_url || ""); // imgUrl 상태를 가져온 URL로 설정하거나, 없으면 빈 문자열로 설정
          }
        } else if (userError) {
          // 사용자 정보 가져오는 중 오류가 발생한 경우
          console.error("사용자를 가져오는 중 오류 발생:", userError); // 오류 메시지 출력
        }
      } catch (error) {
        // 예외가 발생한 경우
        console.error("프로필 이미지를 가져오는 중 예외 발생:", error); // 예외 메시지 출력
      }
    };

    fetchProfileImage();
  }, []); // 빈 배열을 의존성으로 설정해 컴포넌트가 처음 마운트될 때만 실행되도록 설정

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // 선택된 파일을 selectedFile 상태에 설정
  };

  // 프로필 이미지를 업로드하는 함수
  const uploadAvatar = async () => {
    if (!selectedFile) return; // 선택된 파일이 없으면 함수 종료

    setUploading(true); // 업로드 상태를 true로 설정해 업로드 중임을 표시

    try {
      // Supabase를 사용해 현재 로그인된 사용자의 정보를 가져옴
      const {
        data: { user }, // user 객체에서 데이터를 추출
        error: userError // 발생한 오류를 userError에 저장
      } = await supabase.auth.getUser(); // 현재 로그인된 사용자의 정보를 가져오는 Supabase 메서드
      if (!user) {
        // 사용자가 로그인되지 않은 경우
        console.error("사용자가 로그인되지 않았습니다."); // 오류 메시지 출력
        setUploading(false); // 업로드 상태를 false로 설정
        return; // 함수 종료
      }

      // Supabase 스토리지에 이미지를 업로드
      const fileName = `${user.id}-${selectedFile.name}`; // 파일 이름을 사용자 ID와 파일 이름으로 설정
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${fileName}`, selectedFile, { upsert: true }); // 'avatars' 버킷에 파일을 업로드, 같은 이름의 파일이 있으면 덮어씌움

      if (uploadError) {
        // 업로드 중 오류가 발생한 경우
        console.error("이미지 업로드 중 오류 발생:", uploadError); // 오류 메시지 출력
        setUploading(false); // 업로드 상태를 false로 설정
        return;
      }

      // 업로드된 이미지의 공개 URL을 가져옴
      const {
        data: { publicUrl }, // 가져온 공개 URL을 publicUrl에 저장
        error: urlError // 발생한 오류를 urlError에 저장
      } = supabase.storage.from("avatars").getPublicUrl(`avatars/${fileName}`); // 업로드된 파일의 공개 URL을 가져옴
      if (urlError) {
        // 공개 URL 가져오는 중 오류가 발생한 경우
        console.error("공개 URL 가져오는 중 오류 발생:", urlError); // 오류 메시지 출력
      } else {
        // userinfo 테이블에서 해당 사용자의 프로필 이미지 URL을 업데이트
        const { error: updateError } = await supabase.from("userinfo").update({ img_url: publicUrl }).eq("id", user.id);

        if (updateError) {
          console.error("프로필 이미지 URL 업데이트 중 오류 발생", updateError);
        } else {
          setImgUrl(publicUrl); // imgUrl 상태를 새로 가져온 공개 URL로 설정
          alert("프로필 이미지 변경 완료"); // 성공 메시지 표시
        }
      }
    } catch (error) {
      // 예외가 발생한 경우
      console.error("이미지 업로드 중 예외 발생:", error); // 예외 메시지 출력
    } finally {
      setUploading(false); // 업로드 상태를 false로 설정해 업로드 완료 표시
      setSelectedFile(null); // 선택된 파일 상태를 초기화
    }
  };

  return (
    <ProfileContainer>
      <h2>My Profile</h2>
      <MyPageProfileImage imgUrl={imgUrl} defaultImageUrl="./images/common/default-profile.jpg" />
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
