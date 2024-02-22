import { Button, Space } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Space split={"|"}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Button size="small" type="link" key={index}>
        Link
      </Button>
    ))}
  </Space>
);

export default App;
