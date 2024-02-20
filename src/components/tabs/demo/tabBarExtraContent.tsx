import { Button, Tabs, TabsProps } from "@/index";
import React from "react";

const operations = <Button>Extra Action</Button>;

const OperationsSlot: TabsProps["tabBarExtraContent"] = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

const App: React.FC = () => (
  <>
    <Tabs
      tabBarExtraContent={operations}
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Tab ${id}`,
          key: id,
          children: `Content of Tab Pane ${id}`,
        };
      })}
    />
    <br />
    <br />
    <br />
    <Tabs
      tabBarExtraContent={OperationsSlot}
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

export default App;
