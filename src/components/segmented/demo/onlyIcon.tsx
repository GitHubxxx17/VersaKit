import { Segmented } from "@/index";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import React from "react";

const Demo: React.FC = () => (
  <Segmented
    options={[
      { value: "List", icon: <BarsOutlined /> },
      { value: "Kanban", icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
