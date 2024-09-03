import supabase from "../supabaseClient";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?!.*\s).{7,}$/;

// 이메일 검증 함수
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// 비밀번호 검증 함수
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const showInputError = (error, email, password) => {

  if (!validateEmail(email)) {
    alert("이메일 형식을 확인하쇼");
  } else if (!validatePassword(password)) {
    alert("비밀번호 제대로 입력하슈");
  } else if (error.message.includes("already")) {
    alert("이메일이 이미 있슈");
  } else {
    alert("이메일이나 비번 틀렷슈");
  }
}

// 유저 정보 가져오기
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}