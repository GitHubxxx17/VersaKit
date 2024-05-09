import type { SliderProps } from "@/index";
import { Slider } from "@/index";
import React from "react";

const formatter: NonNullable<SliderProps["tooltip"]>["formatter"] = (value) =>
  `${value}%`;

const App: React.FC = () => (
  <>
    <Slider tooltip={{ formatter }} />
    <Slider tooltip={{ formatter: null }} />
  </>
);

export default App;
