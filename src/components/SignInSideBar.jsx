import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  width: 200px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInSideBar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (email) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("실패");
    } else {
      // handleLogin(data);
      navigate("/");
    }

    console.log("data", data);
  };

  return (
    <StyledContainer>
      이메일: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      비밀번호: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signIn(email, password)}>로그인</button>
    </StyledContainer>
  );
};

export default SignInSideBar;
