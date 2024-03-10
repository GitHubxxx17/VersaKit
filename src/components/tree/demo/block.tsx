import type { TreeDataNode } from "@/index";
import { Tree } from "@/index";
import React from "react";

const treeData: TreeDataNode[] = [
  {
    title: "parent",
    key: "0",
    children: [
      {
        title: "child 1",
        key: "0-0",
        disabled: true,
      },
      {
        title: "child 2",
        key: "0-1",
        disableCheckbox: true,
      },
    ],
  },
];

const App: React.FC = () => (
  <Tree
    checkable
    defaultSelectedKey={"0-1"}
    defaultExpandAll
    treeData={treeData}
    blockNode
  />
);

export default App;
