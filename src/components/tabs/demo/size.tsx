import { Tabs, TabsProps } from "@/index";
import React from "react";

const sizes: TabsProps["size"][] = ["small", "middle", "large"];

const App: React.FC = () =>
  sizes.map((size) => (
    <Tabs
      key={size}
      size={size}
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Tab ${id}`,
          key: id,
          children: `Content of Tab Pane ${id}`,
        };
      })}
      style={{ marginBottom: "20px" }}
    />
  ));

export default App;
