import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  margin-bottom: 20px;
`;

const MyPageProfile = ({ avatarUrl, uploading, selectedFile, handleFileChange, uploadAvatar }) => {
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
