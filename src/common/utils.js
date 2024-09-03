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
    alert("이메일 형식을 확인해주세요.");
  } else if (!validatePassword(password)) {
    alert("비밀번호를 확인해주세요.");
  } else if (error.message.includes("already")) {
    alert("중복된 이메일이 있습니다.");
  } else {
    alert("이메일이나 비밀번호가 ");
  }
}

// 유저 정보 가져오기
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}