import { Button, Space, SpaceProps } from "@/index";
import React from "react";

const spaceContainer: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
};

const spaceContainerItem: React.CSSProperties = {
  overflow: "visible",
  border: "1px solid rgb(64, 169, 255)",
  margin: "8px 4px",
  padding: "4px",
};

const spaceBlock: React.CSSProperties = {
  padding: "20px 10px",
  backgroundColor: "rgba(150, 150, 150, 0.2)",
  display: "inline-block",
};

const App: React.FC = () => {
  const align: SpaceProps["align"][] = ["center", "start", "end", "baseline"];

  return (
    <div style={spaceContainer}>
      {align.map((item) => (
        <div key={item} style={spaceContainerItem}>
          <Space align={item}>
            {item}
            <Button type="primary">Primary</Button>
            <span style={spaceBlock}>Block</span>
          </Space>
        </div>
      ))}
    </div>
  );
};

export default App;
