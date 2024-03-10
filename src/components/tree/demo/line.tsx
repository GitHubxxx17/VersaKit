import type { TreeDataNode } from "@/index";
import { Tree } from "@/index";
import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import React from "react";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    switcherIcon: <FormOutlined />,
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-0-0", icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: "0-0-0-1",
            icon: <CarryOutOutlined />,
          },
          { title: "leaf", key: "0-0-0-2", icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-1-0", icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-2-0", icon: <CarryOutOutlined /> },
          {
            title: "leaf",
            key: "0-0-2-1",
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: "parent 2",
    key: "0-1",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "parent 2-0",
        key: "0-1-0",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-1-0-0", icon: <CarryOutOutlined /> },
          { title: "leaf", key: "0-1-0-1", icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect = (selectedKey: string, info: any) => {
    console.log("selected", selectedKey, info);
  };

  return (
    <div>
      <Tree
        showLine={true}
        showIcon
        defaultExpandedKeys={["0-0-0"]}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default App;
