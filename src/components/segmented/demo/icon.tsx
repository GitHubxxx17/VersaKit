import { Segmented } from "@/index";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import React from "react";

const Demo: React.FC = () => (
  <Segmented
    options={[
      { label: "List", value: "List", icon: <BarsOutlined /> },
      { label: "Kanban", value: "Kanban", icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
