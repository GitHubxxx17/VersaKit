import classNames from "classnames";
import React, { createContext } from "react";
import "./index.scss";

// 响应式尺寸
type Responsive = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export type ResponsiveLike<T> = {
  [key in Responsive]?: T;
};
// 间隔类型
export type gutterType = number | ResponsiveLike<number>;

// 排列
type justifyType =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between"
  | "space-evenly";

// 垂直对齐
type alignType = "top" | "middle" | "bottom" | "stretch";

// 行基础属性
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gutter?: gutterType | [gutterType, gutterType];
  justify?:
    | justifyType
    | {
        [key in Responsive]: justifyType;
      };
  align?:
    | alignType
    | {
        [key in Responsive]: alignType;
      };
  wrap?: boolean;
}

interface RowContextProps {
  gutter?: gutterType | [gutterType, gutterType];
}

// 行上下文
export const RowContext = createContext<RowContextProps | null>(null);

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    children,
    gutter,
    justify = "start",
    align = "top",
    wrap = true,
    className,
    ...rest
  } = props;

  return (
    <div
      className={classNames(
        "versa-row",
        `versa-row-${justify}`,
        `versa-row-${align}`,
        {
          "versa-row-wrap": wrap,
        },
        className
      )}
      ref={ref}
      {...rest}
    >
      <RowContext.Provider value={{ gutter: gutter }}>
        {children}
      </RowContext.Provider>
    </div>
  );
});

export default Row;
