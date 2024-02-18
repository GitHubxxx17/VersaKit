import React from "react";

import { Button } from "@/index";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button type="primary" block>
        主要按钮
      </Button>
      &nbsp;
      <Button type="default" block>
        默认按钮
      </Button>
      &nbsp;
      <Button type="dashed" block>
        虚线按钮
      </Button>
      &nbsp;
      <Button type="link" block>
        链接按钮
      </Button>
      &nbsp;
      <Button type="text" block>
        文本按钮
      </Button>
    </div>
  );
};

export default App;
