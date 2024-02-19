import { Tag } from "@/index";
import React from "react";
import { status } from "../list";

const App: React.FC = () => {
  return (
    <div>
      {status.map((color: string) => (
        <Tag color={color} key={color} styles={{ margin: "0 6px 6px 0" }}>
          {color}
        </Tag>
      ))}
    </div>
  );
};

export default App;
