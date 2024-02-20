import { Button, Tag } from "@/index";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const App: React.FC = () => {
  const [tags, setTags] = useState(["Unremovable", "Tag 2", "Tag 3"]);
  let [index, setIndex] = useState(0);
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const handleClick = () => {
    setTags([...tags, `new Tag ${index}`]);
    setIndex(index + 1);
  };
  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          closable={index !== 0}
          key={tag}
          onClose={() => handleClose(tag)}
          style={{ margin: "10px 10px 0 0" }}
        >
          {tag}
        </Tag>
      ))}
      <Button
        style={{ margin: "10px 10px 0 0" }}
        onClick={handleClick}
        icon={<PlusOutlined />}
        type="primary"
      >
        添加标签
      </Button>
    </>
  );
};

export default App;
