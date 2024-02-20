import type { TabsProps } from "@/index";
import { Tabs } from "@/index";
import React from "react";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
    disabled: true,
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const App: React.FC = () => <Tabs items={items} />;

export default App;
