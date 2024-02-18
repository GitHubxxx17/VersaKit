import { PoweroffOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { Button } from "..";

const App: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const style: React.CSSProperties = {
    margin: "0 8px 5px 0",
  };

  return (
    <>
      <Button type="primary" style={style} loading>
        Loading
      </Button>
      <Button type="primary" style={style} size="small" loading>
        Loading
      </Button>
      <Button
        type="primary"
        style={style}
        icon={<PoweroffOutlined />}
        loading
      />
      <Button
        type="primary"
        style={style}
        loading={loadings[0]}
        onClick={() => enterLoading(0)}
      >
        Click me!
      </Button>
      <Button
        type="primary"
        style={style}
        icon={<PoweroffOutlined />}
        loading={loadings[1]}
        onClick={() => enterLoading(1)}
      >
        Click me!
      </Button>
      <Button
        type="primary"
        style={style}
        icon={<PoweroffOutlined />}
        loading={loadings[2]}
        onClick={() => enterLoading(2)}
      />
    </>
  );
};

export default App;
