import { Button, Space } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Space size={[8, "middle"]} wrap>
    {new Array(20).fill(null).map((_, index) => (
      <Button key={index}>Button</Button>
    ))}
  </Space>
);

export default App;
