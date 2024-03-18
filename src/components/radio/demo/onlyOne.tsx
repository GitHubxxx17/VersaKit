import { Radio, RadioChangeEventType } from "@/index";
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (event: RadioChangeEventType) => {
    console.log("radio checked", event);
    setValue(event.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
};

export default App;
