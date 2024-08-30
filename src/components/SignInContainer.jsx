import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { showInputError } from "../common/utils";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 600px;
  height: 400px;
  gap: 30px;
  background-color: #ffffff;
`;

const StyledTopBox = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 26px;
  }
`;

const StyledMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  input {
    width: 250px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid grey;
  }
`;

const SignInContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    error ? showInputError(error, email, password) : navigate("/");
  };

  // 글 작성 예시 코드
  const createPost = async () => {
    const { data } = await supabase
      .from("posts")
      .insert({
        contents: "아무 내용이나 입력해보세요"
      })
      .select("*");

    console.log("data", data);
  };

  // 글 조회
  const selectPost = async () => {
    const { data, error } = await supabase.from("posts").select().eq("id", 8);

    console.log("data", data);
  };

  // 글 삭제 예시 코드 (post id만 넣어주면 user id랑 알아서 비교해서 삭제됨 (db 설정 (related)))
  const deletePost = async () => {
    const { data, error } = await supabase.from("posts").delete().eq("id", 4);

    console.log("data", data);
    console.log("error", error);
  };

  return (
    <StyledContainer>
      <StyledTopBox>
        <h2>§ 빈날이 §</h2>
      </StyledTopBox>
      <StyledMiddleBox>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      </StyledMiddleBox>
      <button onClick={() => signIn(email, password)}>로그인</button>
      <button onClick={createPost}>작성</button>
      <button onClick={selectPost}>조회</button>
      <button onClick={deletePost}>삭제</button>
    </StyledContainer>
  );
};

export default SignInContainer;
