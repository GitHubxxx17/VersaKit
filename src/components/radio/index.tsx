import React from "react";
import Group, { RadioGroupProps } from "./Group";
import "./index.scss";
import InternalRadio from "./radio";
import RadioButton from "./radioButton";

// 基础属性
export interface RadioProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  children?: React.ReactNode;
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  focus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export interface RadioType
  extends React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof Group;
  Button: typeof RadioButton;
}

// 单选框事件类型
export type RadioChangeEventType = {
  target: {
    checked: boolean;
    className: string;
    disabled: boolean;
    name?: string;
    onChange: RadioGroupProps["onChange"];
    type: string;
    value: any;
  };
  nativeEvent: React.MouseEvent<Element, MouseEvent>;
  preventDefault: () => void;
  stopPropagation: () => void;
};

const Radio = React.forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  return <InternalRadio ref={ref} {...props}></InternalRadio>;
}) as RadioType;

Radio.Group = Group;
Radio.Button = RadioButton;

export default Radio;
