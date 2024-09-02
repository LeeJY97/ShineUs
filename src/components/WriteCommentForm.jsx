import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteCommentForm = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useShine();

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

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const addComment = async () => {
    const { data: newComments, error: commentsError } = await supabase
      .from("comments")
      .insert({
        user_id: user.id,
        post_id: postId,
        content
      })
      .select("*");

    if (commentsError) {
      console.error("Error commentsError => ", commentsError.message);
    }

    console.log("newComments", newComments);

    setCommentList([...commentList, newComments[0]]);
    console.log("setCommentList !!!!! ");
  };
  //   setCommentList((prevComments) => {
  //     console.log("prevComments", prevComments);
  //     console.log("newComments", newComments);
  //     const updatedComments = [...prevComments, newComments[0]];
  //     console.log("updatedComments", updatedComments);

  //     return updatedComments;
  //   });
  // };

  useEffect(() => {
    console.log("commentList update => !!!!!");
  }, [commentList]);

  return (
    <StyledContainer>
      <h1>댓글달기</h1>
      <textarea onChange={handleChangeContent} value={content}></textarea>
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
