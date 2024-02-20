import { Button, Tooltip } from "@/index";
import React from "react";

const App: React.FC = () => (
  <>
    <Tooltip title="prompt text">
      <Button>鼠标移入</Button>
    </Tooltip>
    &nbsp;
    <Tooltip title="prompt text" trigger="click">
      <Button>鼠标点击</Button>
    </Tooltip>
    &nbsp;
    <Tooltip title="prompt text" trigger="click" defaultOpen>
      <Button>默认打开</Button>
    </Tooltip>
  </>
);

export default App;
