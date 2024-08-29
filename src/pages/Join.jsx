import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useShine } from "../context/ShineContext";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonBox = styled.div`
  display: flex;
`;

const Join = () => {
  const { handleLogin } = useShine();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (email) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: "example-password"
    });

    if (error) {
      alert("실패");
    } else {
      handleLogin(data);
      navigate("/");
    }
  };

  const signIn = async (email) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: "example-password"
    });

    if (error) {
      alert("실패");
    } else {
      handleLogin(data);
      navigate("/");
    }

    console.log("data", data);
  };

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
