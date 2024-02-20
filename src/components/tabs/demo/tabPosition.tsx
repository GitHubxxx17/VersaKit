import { Tabs, TabsProps } from "@/index";
import React from "react";

const TabPosition: TabsProps["TabPosition"][] = [
  "top",
  "bottom",
  "left",
  "right",
];

const App: React.FC = () =>
  TabPosition.map((pos) => (
    <div style={{ height: "100px", marginBottom: "20px" }} key={pos}>
      <Tabs
        TabPosition={pos}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
        style={{ marginBottom: "25px" }}
      />
    </div>
  ));

export default App;
