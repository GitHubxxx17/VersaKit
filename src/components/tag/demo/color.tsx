import { Tag } from "@/index";
import React from "react";
import { colors } from "../list";

const App: React.FC = () => {
  const customColor = ["#f50", "#2db7f5", "#87d068", "#108ee9"];
  return (
    <>
      <div>
        <h3>预设颜色</h3>
        {colors.map((color: string) => (
          <Tag color={color} key={color} styles={{ margin: "0 6px 6px 0" }}>
            {color}
          </Tag>
        ))}
      </div>
      <div>
        <h3>自定义颜色</h3>
        {customColor.map((color: string) => (
          <Tag color={color} key={color} styles={{ margin: "0 6px 6px 0" }}>
            {color}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default App;
