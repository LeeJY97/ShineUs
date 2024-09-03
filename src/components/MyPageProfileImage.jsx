import React from "react";
import styled from "styled-components";

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

const MyPageProfileImage = ({ imgUrl, defaultImageUrl }) => {
  return (
    <StyledProfileImage>
      {imgUrl ? (
        <img src={imgUrl} alt="Avatar" width={150} height={150} /> // imgUrl로 프로필 이미지 표시
      ) : (
        // imgUrl이 없는 경우
        <NoImageContainer>
          {/* <img src={defaultImageUrl} alt="No image" width={150} height={150} /> */}
          <img src="./images/common/default-profile.jpg" alt="No image" width={150} height={150} />
        </NoImageContainer>
      )}
    </StyledProfileImage>
  );
};

export default MyPageProfileImage;
