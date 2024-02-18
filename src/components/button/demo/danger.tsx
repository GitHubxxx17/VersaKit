import React from "react";

import { Button } from "@/index";

const App: React.FC = () => {
  return (
    <>
      <Button type="primary" danger>
        主要按钮
      </Button>
      &nbsp;
      <Button type="default" danger>
        默认按钮
      </Button>
      &nbsp;
      <Button type="dashed" danger>
        虚线按钮
      </Button>
      &nbsp;
      <Button type="link" danger>
        链接按钮
      </Button>
      &nbsp;
      <Button type="text" danger>
        文本按钮
      </Button>
    </>
  );
};

export default App;
