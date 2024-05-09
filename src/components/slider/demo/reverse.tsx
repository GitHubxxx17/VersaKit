import { Button, Slider } from "@/index";
import React, { useCallback, useState } from "react";

const App: React.FC = () => {
  const [reverse, setReverse] = useState(true);

  const onChange = useCallback(() => {
    setReverse((val) => !val);
  }, []);

  return (
    <>
      <Slider defaultValue={30} reverse={reverse} />
      <Slider range defaultValue={[20, 50]} reverse={reverse} />
      Reversed: <Button onClick={onChange}>{reverse ? "反向" : "正向"}</Button>
    </>
  );
};

export default App;
