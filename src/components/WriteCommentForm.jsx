import React, { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteCommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { user } = useShine();

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .insert({
        user_id: user.id,
        post_id: postId,
        comment
      })
      .select("*");

    if (commentsError) {
      console.error("Error commentsError => ", commentsError.message);
    }

    console.log("comments", comments);
  };

  return (
    <StyledContainer>
      <h1>댓글달기</h1>
      <textarea onChange={handleChangeComment} value={comment}></textarea>
      <button
        onClick={() => {
          addComment();
        }}
      >
        업로드
      </button>
    </StyledContainer>
  );
};

export default WriteCommentForm;
