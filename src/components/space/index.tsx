import classNames from "classnames";
import React, { useMemo, useState } from "react";
import Compact from "./Compact";
import Item from "./Item";
import "./index.scss";

// 大小类型
type sizeTypes = SizeType | number;

// 大小转换成像素
enum sizeToNumber {
  "small" = "8px",
  "middle" = "16px",
  "large" = "24px",
}

// 间距基础属性
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  direction?: DirectionType;
  align?: "start" | "end" | "center" | "baseline";
  size?: sizeTypes | [sizeTypes, sizeTypes];
  split?: React.ReactNode;
  wrap?: boolean;
}

export interface SpaceType
  extends React.ForwardRefExoticComponent<
    SpaceProps & React.RefAttributes<HTMLElement>
  > {
  Compact: typeof Compact;
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>((props, ref) => {
  const {
    children,
    direction = "horizontal",
    size = "small",
    align = "center",
    wrap,
    split,
    className,
    style,
    ...rest
  } = props;

  // 合并样式
  const [patchStyle, setPatchStyle] = useState<React.CSSProperties>();

  // 处理大小
  const innerSize = useMemo(() => {
    // 如果size是数组
    if (Array.isArray(size)) {
      setPatchStyle({
        columnGap: typeof size[0] == "number" ? size[0] : sizeToNumber[size[0]],
        rowGap: typeof size[1] == "number" ? size[1] : sizeToNumber[size[1]],
      });
    } else {
      return size;
    }
  }, [size]);

  return (
    <div
      className={classNames(
        "versa-space",
        `versa-space-${direction}`,
        innerSize ? `versa-space-${innerSize}` : "",
        `versa-space-${align}`,
        wrap ? "versa-space-wrap" : "",
        className
      )}
      ref={ref}
      style={{ ...style, ...patchStyle }}
      {...rest}
    >
      <Item children={children} split={split}></Item>
    </div>
  );
}) as SpaceType;

Space.Compact = Compact;

export default Space;
