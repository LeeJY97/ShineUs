import { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 600px;
  background-color: beige;
  input {
    width: 40%;
  }
  button {
    width: 20%;
  }
`;

const SignUpContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async (email) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert("실패");
    } else {
      // handleLogin(data);
      console.log("data", data);
      navigate("/");
    }
  };

  // 글 작성 예시 코드
  // const createPost = async () => {
  //   const { data } = await supabase
  //     .from("posts")
  //     .insert({
  //       contents: "내용"
  //     })
  //     .select("*");

  //   console.log("data", data);
  // };

  // 회원정보 가져오기 예시 코드
  // useEffect(() => {
  //   const testUser = async () => {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();

  //     console.log("user", user);
  //   };
  // }, []);

  return (
    <StyledContainer>
      이메일: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      비밀번호: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signUp(email, password)}>회원가입</button>
    </StyledContainer>
  );
};

export default SignUpContainer;
