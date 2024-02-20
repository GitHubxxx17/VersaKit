import { Button, Tooltip } from "@/index";
import React, { useState } from "react";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button style={{ marginRight: "8px" }} onClick={() => setOpen(!open)}>
        点我
      </Button>
      <Tooltip title={"prompt text"} open={open}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  );
};

export default App;
