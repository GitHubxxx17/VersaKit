import React from "react";
import "./Tag.scss";
// 标签基础样式
export interface CheckableTagProps {
  children?: React.ReactNode;
  classNames?: string[];
  styles?: React.CSSProperties;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const CheckableTag = React.forwardRef<HTMLSpanElement, CheckableTagProps>(
  (props, ref) => {
    const {
      children,
      classNames = [],
      styles,
      checked,
      onChange,
      onClick,
      ...restProps
    } = props;
    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      onChange?.(!checked);
      onClick?.(e);
    };

    if (checked) {
      classNames.push("versa-tag-checked");
    }

    return (
      <span
        ref={ref}
        className={["versa-tag", "versa-tag-checkable", ...classNames].join(
          " "
        )}
        style={styles}
        onClick={handleClick}
        {...restProps}
      >
        {children ?? "可选择标签"}
      </span>
    );
  }
);
export default CheckableTag;
