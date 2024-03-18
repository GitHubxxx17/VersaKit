import { isExist } from "@/utils";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { RadioProps } from ".";
import { radioGroupContext } from "./Group";
import "./index.scss";

interface InternalRadioProps extends RadioProps {
  button?: boolean;
}

const Radio = React.forwardRef<HTMLLabelElement, InternalRadioProps>(
  (props, ref) => {
    const {
      children,
      disabled = false,
      checked,
      defaultChecked = false,
      autoFocus = false,
      value,
      name,
      onChange,
      button = false,
      blur,
      focus,
      className,
      ...rest
    } = props;
    // 勾选
    const [innerChecked, setInnerChecked] = useState(defaultChecked);

    const [isButtonType, setIsButtonType] = useState(false);

    // 单选框组上下文
    const groupContext = useContext(radioGroupContext);
    // 处理勾选改变事件
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };
    // 处理点击勾选事件
    const handleOnCheck = (e: React.MouseEvent<Element, MouseEvent>) => {
      if (isExist(groupContext?.value)) {
        if (innerChecked) return;
        const changeObj = {
          target: {
            checked: true,
            className: className || "",
            disabled: disabled,
            name: name,
            onChange: groupContext?.onChange,
            type: "radio",
            value: value,
          },
          nativeEvent: e,
          preventDefault: e.preventDefault,
          stopPropagation: e.stopPropagation,
        };
        groupContext?.onChange?.(changeObj);
      } else if (isExist(groupContext?.defaultValue)) {
        groupContext?.setChangeValue?.(value);
      } else {
        setInnerChecked(true);
      }
    };
    // 处理单选框组 受控组件 value
    useEffect(() => {
      if (isExist(groupContext?.value)) {
        setInnerChecked(groupContext?.value == value);
      }
    }, [groupContext?.value]);

    // 处理单选框组 默认 defaultValue
    useEffect(() => {
      if (isExist(groupContext?.defaultValue)) {
        setInnerChecked(groupContext?.defaultValue == value);
      }
    }, [groupContext?.defaultValue]);

    useEffect(() => {
      if (isExist(checked)) setInnerChecked(checked);
    }, [checked]);

    // 设置单选框是否为按钮样式
    useEffect(() => {
      setIsButtonType(button || groupContext?.optionType == "button");
    }, [groupContext?.optionType, button]);

    return (
      <label
        className={classNames(
          {
            "versa-radio-disabled": disabled || groupContext?.disabled,
            "versa-radio-button": isButtonType,
            "versa-radio": !isButtonType,
            "versa-radio-button-start": isButtonType && groupContext?.isStart,
            "versa-radio-button-end": isButtonType && groupContext?.isEnd,
            "versa-radio-button-checked": isButtonType && innerChecked,
            "versa-radio-button-solid":
              isButtonType && groupContext?.buttonStyle == "solid",
            [`versa-radio-button-${groupContext?.size}`]:
              isButtonType &&
              groupContext?.size &&
              groupContext?.size != "middle",
          },
          className
        )}
        ref={ref}
        {...rest}
      >
        <span
          className={classNames({
            "versa-radio-input": !isButtonType,
            "versa-radio-button-input": isButtonType,
          })}
        >
          <input
            type="radio"
            className={classNames({
              "versa-radio-input-inner": !isButtonType,
              "versa-radio-button-input-inner": isButtonType,
            })}
            disabled={disabled || groupContext?.disabled}
            value={value}
            checked={innerChecked}
            onChange={handleOnChange}
            onClick={handleOnCheck}
            name={name || groupContext?.name}
            autoFocus={autoFocus}
            onBlur={blur}
            onFocus={focus}
          />
        </span>
        <span
          className={classNames({
            "versa-radio-title": !isButtonType,
            "versa-radio-button-title": isButtonType,
          })}
        >
          {children}
        </span>
      </label>
    );
  }
);

export default Radio;
