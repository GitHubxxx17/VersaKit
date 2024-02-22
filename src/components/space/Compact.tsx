import classNames from "classnames";
import React from "react";
import Item from "./Item";
import "./index.scss";

// 紧凑布局属性
export interface CompactProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  block?: boolean;
  direction?: DirectionType;
  size?: SizeType;
}

// 紧凑布局上下文配置属性
export interface SpaceCompactItemContextType {
  compactSize?: SizeType;
  compactDirection?: DirectionType;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

// 紧凑布局上下文
export const SpaceCompactItemContext =
  React.createContext<SpaceCompactItemContextType | null>(null);

// 紧凑布局上下文方法
export const useCompactItemContext = (prefixCls: string) => {
  const compactItemContext = React.useContext(SpaceCompactItemContext);

  const compactItemClassnames = React.useMemo<string>(() => {
    if (!compactItemContext) {
      return "";
    }
    const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
    const separator = compactDirection === "vertical" ? "-vertical-" : "-";

    return classNames(
      `${prefixCls}-compact`,
      `${prefixCls}-compact-${compactDirection}`,
      {
        [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
        [`${prefixCls}-compact${separator}last-item`]: isLastItem,
        [`${prefixCls}-compact${separator}item`]: !isFirstItem && !isLastItem,
      }
    );
  }, [prefixCls, compactItemContext]);

  return {
    compactSize: compactItemContext?.compactSize,
    compactDirection: compactItemContext?.compactDirection,
    compactItemClassnames,
  };
};

const Compact = React.forwardRef<HTMLDivElement, CompactProps>(
  (props: CompactProps, ref) => {
    const {
      children,
      block,
      direction = "horizontal",
      className,
      ...rest
    } = props;
    return (
      <div
        className={classNames(
          "versa-space-compact",
          {
            "versa-space-compact-block": block,
            "versa-space-vertical": direction == "vertical",
          },
          className
        )}
        ref={ref}
        {...rest}
      >
        <Item children={children} compact direction={direction}></Item>
      </div>
    );
  }
);

export default Compact;
