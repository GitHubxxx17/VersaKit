import React from "react";

import { Button } from "@/index";

const App: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(190, 200, 200)",
        padding: "16px",
      }}
    >
      <Button type="primary" ghost>
        主要按钮
      </Button>
      &nbsp;
      <Button type="default" ghost>
        默认按钮
      </Button>
      &nbsp;
      <Button type="dashed" ghost>
        虚线按钮
      </Button>
      &nbsp;
      <Button type="link" ghost>
        链接按钮
      </Button>
      &nbsp;
      <Button type="text" ghost>
        文本按钮
      </Button>
    </div>
  );
};

export default App;
