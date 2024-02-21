import { Segmented, Tabs, TabsProps } from "@/index";
import React, { useState } from "react";

const App: React.FC = () => {
  const [size, useSize] = useState<TabsProps["size"]>("middle");
  return (
    <>
      <Segmented
        defaultValue="small"
        style={{ marginBottom: 8 }}
        onChange={(value) => useSize(value as TabsProps["size"])}
        options={["small", "middle", "large"]}
      />
      <Tabs
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
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
