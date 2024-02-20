import { colors } from "@/components/tag/list";
import { Button, Tooltip } from "@/index";
import React from "react";

const customColors = ["#f50", "#2db7f5", "#87d068", "#108ee9"];

const App: React.FC = () => (
  <>
    <div style={{ marginBottom: "10px" }}>
      {colors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button style={{ margin: "0 8px 5px 0" }}>{color}</Button>
        </Tooltip>
      ))}
    </div>
    <div>
      {customColors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button style={{ margin: "0 8px 5px 0" }}>{color}</Button>
        </Tooltip>
      ))}
    </div>
  </>
);

export default App;
