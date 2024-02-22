import { Button, Segmented, Space } from "@/index";
import React, { useState } from "react";

type SizeType = "small" | "middle" | "large" | number;

const App: React.FC = () => {
  const [size, setSize] = useState<
    SizeType | [SizeType, SizeType] | "customize"
  >("small");
  const [customSize, setCustomSize] = React.useState<number>(0);
  return (
    <>
      <Segmented
        defaultValue="small"
        style={{ marginBottom: 8 }}
        onChange={(value) => setSize(value as SizeType)}
        options={["small", "middle", "large", "customize"]}
      />
      <br />
      <br />
      <Space size={size !== "customize" ? size : customSize}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
};

export default App;
