import type { TreeDataNode } from "@/index";
import { Tree } from "@/index";
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import React from "react";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    icon: <SmileOutlined />,
    children: [
      {
        title: "leaf",
        key: "0-0-0",
        icon: <MehOutlined />,
      },
      {
        title: "leaf",
        key: "0-0-1",
        icon: (selected) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

const App: React.FC = () => (
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKey={"0-0-0"}
    switcherIcon={<DownOutlined />}
    treeData={treeData}
  />
);

export default App;