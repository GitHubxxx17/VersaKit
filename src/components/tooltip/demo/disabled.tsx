import { Button, Tooltip } from "@/index";
import React, { useState } from "react";

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <Button
        style={{ marginRight: "8px" }}
        onClick={() => setDisabled(!disabled)}
      >
        {disabled ? "Enable" : "Disable"}
      </Button>
      <Tooltip title={disabled ? "" : "prompt text"}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  );
};

export default App;
