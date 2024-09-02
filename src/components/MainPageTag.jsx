import { useState } from "react";

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

      <input onChange={(e) => addTag(e)} onKeyPress={(e) => handleKeyPress(e)} value={tag} />
    </>
  );
};

export default MainPageTag;
