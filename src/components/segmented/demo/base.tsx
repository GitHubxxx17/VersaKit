import { Segmented } from "@/index";
import React from "react";

const Demo: React.FC = () => (
  <Segmented
    options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
    onChange={(value) => {
      console.log(value); // string
    }}
  />
);

export default Demo;
