import { Segmented } from "@/index";
import React from "react";

const Demo: React.FC = () => (
  <Segmented
    options={[123, 456, "longtext-longtext-longtext-longtext"]}
    block
  />
);

export default Demo;
