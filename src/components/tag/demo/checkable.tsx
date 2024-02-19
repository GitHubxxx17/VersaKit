import { Tag } from "@/index";
import React, { useState } from "react";

const { CheckableTag } = Tag;

const tagsData = ["Movies", "Books", "Music", "Sports"];

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Books"]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      {tagsData.map((tag) => (
        <CheckableTag
          styles={{ marginRight: "6px" }}
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};

export default App;
