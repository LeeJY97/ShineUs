import { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

const MainPageTag = ({ tags, setTags }) => {
  const [tag, setTag] = useState(""); // 개별 태그

  const removeTag = (index) => {
    const cloneTags = [...tags];
    cloneTags.splice(index, 1);
    setTags(cloneTags);
  };

  const addTag = (e) => {
    setTag(e.target.value);
  };

  const onClickTagHandler = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickTagHandler();
    }
  };

  return (
    <StyledContainer>
      <StyledTagInput
        onChange={(e) => addTag(e)}
        onKeyPress={(e) => handleKeyPress(e)}
        value={tag}
        placeholder="태그 입력 후 '엔터' 를 눌러주세요."
      />
      {tags.map((tag, index) => (
        <div key={index}>
          <StyledTag>
            #{tag}
            <span
              onClick={() => {
                removeTag(index);
              }}
            >
              <TiDelete size="22" color="#ffc966" />
            </span>
          </StyledTag>
        </div>
      ))}
    </StyledContainer>
  );
};

export default MainPageTag;

const StyledContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledTagInput = styled.input`
  width: 250px;
  height: 25px;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ffc966;

  &:focus::placeholder {
    color: transparent;
  }
`;

const StyledTag = styled.span`
  display: flex;
  align-items: center;
  outline: 1px solid #ffc966;
  padding: 5px 10px;
  border-radius: 100px;
  margin-right: 20px;
  color: #333;
`;
