import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { isBoolean } from "../../utils";
import CheckableTag from "./CheckableTag";
import "./index.scss";
import { colors, status } from "./list";
// 标签基础样式
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  color?: string;
  bordered?: boolean;
  closeIcon?: boolean | React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  closable?: boolean;
}

export interface TagType
  extends React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLElement>
  > {
  CheckableTag: typeof CheckableTag;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    children,
    color,
    bordered = true,
    closeIcon,
    onClose,
    icon,
    closable,
    className,
    style,
    ...rest
  } = props;

  // 合并样式
  let patchStyle = style;
  // 内部合并类数组
  const innerClassNames: string[] = [];
  // 设置关闭
  const [close, setClose] = useState(false);

  // 颜色
  if (color && [...colors, ...status].includes(color)) {
    if (color != "default") innerClassNames.push(`versa-tag-${color}`);
  } else if (color) {
    patchStyle = {
      ...patchStyle,
      backgroundColor: color,
      borderColor: color,
      color: "#fff",
    };
  }

  /**
   * 处理关闭事件
   * @param {React.MouseEvent<HTMLElement>} e 鼠标事件
   * @return {*}
   */
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    //如果设置阻止默认事件
    if (e.defaultPrevented) {
      return;
    }
    setClose(true);
  }, []);

  return (
    !close && (
      <span
        ref={ref}
        className={classNames(
          "versa-tag",
          !bordered ? "versa-tag-none-bordered" : "",
          ...innerClassNames,
          className
        )}
        style={patchStyle}
        {...rest}
      >
        {icon && <span className="versa-tag-icon">{icon}</span>}
        {children}
        {(closable || closeIcon) && (
          <span className="versa-tag-closeIcon" onClick={handleClick}>
            {isBoolean(closeIcon) ||
            (typeof closeIcon == "undefined" && closable) ? (
              <CloseOutlined />
            ) : (
              closeIcon
            )}
          </span>
        )}
      </span>
    )
  );
}) as TagType;
// 可选择标签
Tag.CheckableTag = CheckableTag;

export default Tag;
