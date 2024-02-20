import { Button, Tooltip } from "@/index";
import React from "react";

const App: React.FC = () => (
  <>
    <Tooltip title="有箭头">
      <Button>Tooltip</Button>
    </Tooltip>
    &nbsp;
    <Tooltip title="无箭头" arrow={false}>
      <Button>Tooltip</Button>
    </Tooltip>
  </>
);

export default App;
