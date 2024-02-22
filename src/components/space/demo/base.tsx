import { Button, Space } from "@/index";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

const App: React.FC = () => (
  <Space>
    Space
    <Button type="primary">Button</Button>
    <Button icon={<UploadOutlined />}>Upload</Button>
    <Button>Confirm</Button>
  </Space>
);

export default App;
