import { Segmented, Tabs } from "@/index";
import React from "react";

type tabPosition = "top" | "bottom" | "left" | "right";

const App: React.FC = () => {
  const [mode, setMode] = React.useState<tabPosition>("top");
  return (
    <>
      <Segmented
        defaultValue="top"
        style={{ marginBottom: 8 }}
        onChange={(value) => setMode(value as tabPosition)}
        options={[
          { label: "Horizontal", value: "top" },
          { label: "Vertical", value: "left" },
        ]}
      />
      <Tabs
        TabPosition={mode}
        style={{ height: 220 }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;
