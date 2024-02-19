import { Tag } from "@/index";
import React from "react";
import { colors, status } from "../list";

const App: React.FC = () => {
  return (
    <div>
      {[...colors, ...status].map((color: string) => (
        <Tag
          color={color}
          styles={{ margin: "0 6px 6px 0" }}
          bordered={false}
          key={color}
        >
          {color}
        </Tag>
      ))}
    </div>
  );
};

export default App;
