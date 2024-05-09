import { Slider } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Slider range draggableTrack defaultValue={[20, 50]} />
);

export default App;
