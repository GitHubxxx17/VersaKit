import { Button, Tooltip } from "@/index";
import React from "react";

const text = <span>prompt text</span>;

const buttonWidth = 80;

const App: React.FC = () => (
  <div className="demo" style={{ overflow: "scroll" }}>
    <div style={{ marginInlineStart: buttonWidth, whiteSpace: "nowrap" }}>
      <Tooltip placement="topLeft" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>TL</Button>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>Top</Button>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>TR</Button>
      </Tooltip>
    </div>
    <div style={{ width: buttonWidth, float: "inline-start" }}>
      <Tooltip placement="leftTop" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>LT</Button>
      </Tooltip>
      <Tooltip placement="left" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>
          Left
        </Button>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>LB</Button>
      </Tooltip>
    </div>
    <div
      style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}
    >
      <Tooltip placement="rightTop" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>RT</Button>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>
          Right
        </Button>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>RB</Button>
      </Tooltip>
    </div>
    <div
      style={{
        marginInlineStart: buttonWidth,
        clear: "both",
        whiteSpace: "nowrap",
      }}
    >
      <Tooltip placement="bottomLeft" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>
          Bottom
        </Button>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <Button style={{ minWidth: "80px", margin: "0 8px 8px 0" }}>BR</Button>
      </Tooltip>
    </div>
  </div>
);

export default App;
