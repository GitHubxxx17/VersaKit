import classNames from "classnames";
import React, { createContext } from "react";
import "./index.scss";

// 响应式尺寸
type Responsive = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export type ResponsiveLike = {
  [key in Responsive]?: number;
};

export type gutterType = number | ResponsiveLike;

// 行基础属性
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gutter?: gutterType | [gutterType, gutterType];
}

interface RowContextProps {
  gutter?: gutterType | [gutterType, gutterType];
}

// 行上下文
export const RowContext = createContext<RowContextProps | null>(null);

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { children, gutter, className, ...rest } = props;

  return (
    <div className={classNames("versa-row", className)} ref={ref} {...rest}>
      <RowContext.Provider value={{ gutter: gutter }}>
        {children}
      </RowContext.Provider>
    </div>
  );
});

export default Row;
