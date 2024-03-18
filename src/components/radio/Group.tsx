import { isNumber, isString } from "@/utils";
import classNames from "classnames";
import React, { useMemo, useState } from "react";
import Radio, { RadioChangeEventType } from ".";
import "./index.scss";

type optionType = {
  label?: React.ReactNode;
  value?: any;
  disabled?: boolean;
};

// 基础属性
export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: React.ReactNode;
  onChange?: (event: RadioChangeEventType) => void;
  value?: any;
  options?: (string | number | optionType)[];
  disabled?: boolean;
  defaultValue?: any;
  optionType?: "default" | "button";
  buttonStyle?: "solid" | "outline";
  name?: string;
  size?: SizeType;
}

// 单选框组合上下文类型
export interface RadioGroupContextType {
  value?: any;
  onChange?: (event: RadioChangeEventType) => void;
  isStart?: boolean;
  isEnd?: boolean;
  defaultValue?: any;
  setChangeValue?: React.Dispatch<any>;
  optionType?: "default" | "button";
  buttonStyle?: "solid" | "outline";
  disabled?: boolean;
  name?: string;
  size?: SizeType;
}

// 单选框组合上下文
export const radioGroupContext =
  React.createContext<RadioGroupContextType | null>(null);

const Group = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const {
      children,
      onChange,
      value,
      options,
      disabled,
      defaultValue,
      optionType,
      buttonStyle,
      name,
      size,
      className,
      ...rest
    } = props;

    const [changeValue, setChangeValue] = useState(defaultValue);

    const getChild = useMemo(() => {
      if (options) {
        return options.map((item, index) => {
          if (isString(item) || isNumber(item)) {
            return (
              <Radio value={item} key={index}>
                {item}
              </Radio>
            );
          } else {
            return (
              <Radio value={item.value} key={index} disabled={item.disabled}>
                {item.label}
              </Radio>
            );
          }
        });
      } else {
        return Array.isArray(children) ? children : [children];
      }
    }, [options]);

    return (
      <div
        className={classNames("versa-radio-group", className)}
        ref={ref}
        {...rest}
      >
        {getChild.map((item, index) => (
          <radioGroupContext.Provider
            value={{
              value: value,
              onChange: onChange,
              isStart: index == 0,
              isEnd: index == getChild.length - 1,
              defaultValue: changeValue,
              setChangeValue: setChangeValue,
              optionType: optionType,
              buttonStyle: buttonStyle,
              disabled: disabled,
              name: name,
              size: size,
            }}
            key={index}
          >
            {item}
          </radioGroupContext.Provider>
        ))}
      </div>
    );
  }
);

export default Group;
