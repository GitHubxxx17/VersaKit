import React from "react";

import { Button } from "@/index";

const App: React.FC = () => {
  return (
    <>
      <Button type="primary">主要按钮</Button> &nbsp;
      <Button type="default">默认按钮</Button> &nbsp;
      <Button type="dashed">虚线按钮</Button> &nbsp;
      <Button type="link">链接按钮</Button> &nbsp;
      <Button type="text">文本按钮</Button>
    </>
  );
};

export default App;
