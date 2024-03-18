import React from "react";
import { RadioProps } from ".";
import "./index.scss";
import Radio from "./radio";

// 基础属性
export interface RadioButtonProps extends RadioProps {}

const RadioButton = React.forwardRef<HTMLLabelElement, RadioButtonProps>(
  (props, ref) => {
    return <Radio ref={ref} {...props} button></Radio>;
  }
);

export default RadioButton;
