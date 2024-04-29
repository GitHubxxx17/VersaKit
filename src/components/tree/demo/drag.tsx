import type { TreeDataNode } from "@/index";
import { Tree } from "@/index";
import React from "react";

const treeData: TreeDataNode[] = [
  {
    title: "parent",
    key: "0",
    children: [
      {
        title: "child 0",
        key: "0-0",
      },
      {
        title: "child 1",
        key: "0-1",
        children: [
          {
            title: "child 1-0",
            key: "0-1-0",
          },
          {
            title: "child 1-1",
            key: "0-1-1",
          },
          {
            title: "child 1-2",
            key: "0-1-2",
          },
        ],
      },
      {
        title: "child 2",
        key: "0-2",
      },
      {
        title: "child 3",
        key: "0-3",
      },
      {
        title: "child 4",
        key: "0-4",
      },
      {
        title: "child 5",
        key: "0-5",
      },
    ],
  },
];

const App: React.FC = () => (
  <Tree draggable defaultExpandAll treeData={treeData} blockNode />
);

export default App;
