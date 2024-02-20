import { Tabs } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Tabs
    items={new Array(30).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);

export default App;
