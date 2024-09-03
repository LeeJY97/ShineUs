import React from "react";
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
  return <StyledInput type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} />;
};

export default MyPageInput;
