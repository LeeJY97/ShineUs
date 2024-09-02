import { useState } from "react";
import styled from "styled-components";

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
    // console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      onClickTagHandler();
    }
  };

  return (
    <>
      {tags.map((tag, index) => (
        <div key={index}>
          <span>#{tag}</span>
          <span
            onClick={() => {
              removeTag(index);
            }}
          >
            ❌
          </span>
        </div>
      ))}

      <StyledTagInput onChange={(e) => addTag(e)} onKeyPress={(e) => handleKeyPress(e)} value={tag} />
    </>
  );
};

export default MainPageTag;

const StyledTagInput = styled.input`
  width: 200px;
  height: 25px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 5px 10px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ffb84d;
`;
