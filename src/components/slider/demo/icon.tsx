import { Slider, Space } from "@/index";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface IconSliderProps {
  max: number;
  min: number;
}

const IconSlider: React.FC<IconSliderProps> = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0);

  const mid = Number(((max - min) / 2).toFixed(5));
  const preColor = value >= mid ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.45)";
  const nextColor =
    value >= mid ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.25)";

  return (
    <Space size={"middle"}>
      <FrownOutlined style={{ color: preColor }} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined style={{ color: nextColor }} />
    </Space>
  );
};

const App: React.FC = () => <IconSlider min={0} max={20} />;

export default App;
