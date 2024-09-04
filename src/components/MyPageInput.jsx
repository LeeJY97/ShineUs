import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const MyPageInput = ({ type, value, onChange, disabled, placeholder }) => {
  return (
    <StyledInput
      type={type} // 입력 필드 타입 (text, email 등)
      value={value} // 입력 필드의 현재 값
      onChange={onChange} // 값이 변경될 때 호출되는 함수
      disabled={disabled} // 입력 필드 비활성화 여부
      placeholder={placeholder} // 입력 필드의 플레이스홀더 텍스트
    />
  );
};

export default MyPageInput;
