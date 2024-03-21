import { Button, Space, Tooltip } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Space>
    <Tooltip title="prompt text">
      <Button>鼠标移入</Button>
    </Tooltip>
    <Tooltip title="prompt text" trigger="click">
      <Button>鼠标点击</Button>
    </Tooltip>
    <Tooltip title="prompt text" trigger="click" defaultOpen>
      <Button>默认打开</Button>
    </Tooltip>
  </Space>
);

export default App;
