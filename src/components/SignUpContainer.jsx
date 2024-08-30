import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import generateRandomNickname from "../common/nicknameConstants";
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

const SignUpContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: generateRandomNickname()
        }
      }
    });

    // 회원가입 실패시
    error ? showInputError(error, email, password) : navigate("/");
  };

  return (
    <StyledContainer>
      <StyledTopBox>
        <h2>§ 빈대떡 §</h2>
      </StyledTopBox>
      <StyledMiddleBox>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      </StyledMiddleBox>
      <button onClick={() => signUp(email, password)}>회원가입</button>
    </StyledContainer>
  );
};

export default SignUpContainer;
