import React from "react";

import { Button } from "@/index";

const App: React.FC = () => {
  return (
    <>
      <div style={{ marginBottom: "8px" }}>
        <Button type="primary">主要按钮</Button>
        &nbsp;
        <Button type="default">默认按钮</Button>
        &nbsp;
        <Button type="dashed">虚线按钮</Button>
        &nbsp;
        <Button type="link">链接按钮</Button>
        &nbsp;
        <Button type="text">文本按钮</Button>
      </div>
      <div>
        <Button type="primary" disabled>
          主要按钮
        </Button>
        &nbsp;
        <Button type="default" disabled>
          默认按钮
        </Button>
        &nbsp;
        <Button type="dashed" disabled>
          虚线按钮
        </Button>
        &nbsp;
        <Button type="link" disabled>
          链接按钮
        </Button>
        &nbsp;
        <Button type="text" disabled>
          文本按钮
        </Button>
      </div>
    </>
  );
};

export default App;
