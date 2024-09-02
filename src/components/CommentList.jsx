import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

const StyledPostBox = styled.div`
  background-color: white;
  padding: 30px;
  margin: 30px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: start;
  border-radius: 5px;
`;

const CommentList = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId);

      if (comments.length) {
        setCommentList(comments);
      } else {
        setCommentList([]);
      }
    };

    fetchComments();
  }, []);

  // commentList.map((comment) => {
  //   console.log("comment", comment);
  // });

  return (
    <>
      {commentList.map((comment) => (
        <StyledPostBox key={comment.id}>{comment.content}</StyledPostBox>
      ))}
    </>
  );
};

export default CommentList;
