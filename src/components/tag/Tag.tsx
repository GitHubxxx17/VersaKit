import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { isBoolean } from "../../utils";
import CheckableTag from "./CheckableTag";
import "./Tag.scss";
import { colors, status } from "./list";
// 标签基础样式
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  color?: string;
  classNames?: string[];
  styles?: React.CSSProperties;
  bordered?: boolean;
  closeIcon?: boolean | React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
}

export interface TagType
  extends React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLElement>
  > {
  CheckableTag: typeof CheckableTag;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  props,
  ref
) => {
  const {
    children,
    color,
    classNames = [],
    styles,
    bordered = true,
    closeIcon,
    onClose,
    icon,
    ...rest
  } = props;

  let patchStyle = styles;

  if (color && [...colors, ...status].includes(color)) {
    if (color != "default") classNames.push(`versa-tag-${color}`);
  } else if (color) {
    patchStyle = {
      ...patchStyle,
      backgroundColor: color,
      borderColor: color,
      color: "#fff",
    };
  }

  if (!bordered) classNames.push(`versa-tag-none-bordered`);

  const [close, setClose] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    //如果设置阻止默认事件
    if (e.defaultPrevented) {
      return;
    }
    setClose(true);
  };

  return (
    !close && (
      <span
        ref={ref}
        className={["versa-tag", ...classNames].join(" ")}
        style={patchStyle}
        {...rest}
      >
        {icon && <span className="versa-tag-icon">{icon}</span>}
        {children}
        {closeIcon && (
          <span className="versa-tag-closeIcon" onClick={handleClick}>
            {isBoolean(closeIcon) ? <CloseOutlined /> : closeIcon}
          </span>
        )}
      </span>
    )
  );
};
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(InternalTag) as TagType;
// 可选择标签
Tag.CheckableTag = CheckableTag;

export default Tag;
