import type { TabsProps } from "@/index";
import { Tabs } from "@/index";
import React from "react";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
];

const App: React.FC = () => {
  return (
    <>
      <div>start:</div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: "start" }}
        style={{ marginBottom: "20px" }}
      />
      <div>center:</div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: "center" }}
        style={{ marginBottom: "20px" }}
      />
      <div>end:</div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: "end" }}
      />
    </>
  );
};

export default App;
