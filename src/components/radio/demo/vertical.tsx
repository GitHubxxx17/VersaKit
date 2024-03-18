import { Radio, RadioChangeEventType, Space } from "@/index";
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEventType) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical" align="start">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
        <Radio value={4}>
          More...
          {value === 4 ? (
            <input style={{ width: 100, marginLeft: 10 }} />
          ) : null}
        </Radio>
      </Space>
    </Radio.Group>
  );
};

export default App;
