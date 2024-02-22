import classNames from "classnames";
import React from "react";
// 标签基础样式
export interface CheckableTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const CheckableTag = React.forwardRef<HTMLSpanElement, CheckableTagProps>(
  (props, ref) => {
    const { children, styles, checked, onChange, onClick, className, ...rest } =
      props;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      onChange?.(!checked);
      onClick?.(e);
    };

    return (
      <span
        ref={ref}
        className={classNames(
          "versa-tag",
          "versa-tag-checkable",
          {
            "versa-tag-checked": checked,
          },
          className
        )}
        style={styles}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </span>
    );
  }
);
export default CheckableTag;
