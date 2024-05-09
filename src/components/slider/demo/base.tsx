import { Button, Slider } from "@/index";
import React, { useCallback, useState } from "react";

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  const onChange = useCallback(() => {
    setDisabled((pre) => !pre);
  }, []);

  return (
    <>
      <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      {/* Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> */}
      Disabled: <Button onClick={onChange}>{disabled ? "打开" : "禁用"}</Button>
    </>
  );
};

export default App;
