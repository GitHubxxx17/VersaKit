import type { TabsProps } from "@/index";
import { Segmented, Tabs } from "@/index";
import React from "react";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
  { key: "2", label: "Tab 2", children: "Content of Tab Pane 2" },
  { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
];

type tabPosition = "top" | "bottom" | "left" | "right";

const App: React.FC = () => {
  const [TabPositionValue, setTabPositionValue] =
    React.useState<tabPosition>("top");
  return (
    <>
      <Segmented
        defaultValue="top"
        style={{ marginBottom: 8 }}
        onChange={(value) => setTabPositionValue(value as tabPosition)}
        options={["top", "bottom", "left", "right"]}
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        TabPosition={TabPositionValue}
      />
    </>
  );
};

export default App;
