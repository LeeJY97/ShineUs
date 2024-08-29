import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonBox = styled.div`
  display: flex;
`;

const password = "example-password";

const signUp = async (email) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("실패");
  }
};

const signIn = async (email) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("실패");
  }

  console.log("data", data);
};

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StyledContainer>
      <h1>회원가입/로그인</h1>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <StyledButtonBox>
        <button onClick={() => signIn(email, password)}>로그인</button>
        <button onClick={() => signUp(email, password)}>회원가입</button>
      </StyledButtonBox>
    </StyledContainer>
  );
};

export default Join;
