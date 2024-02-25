import { isNumber, isObject, resizeObserver } from "@/utils";
import classNames from "classnames";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ResponsiveLike, RowContext, RowProps } from "./Row";
import "./index.scss";

// 基础属性
export interface ColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ResponsiveLike {
  children?: React.ReactNode;
  span?: number;
}

// 响应式宽度
const responsiveWidth = (gutter: Exclude<RowProps["gutter"], number>) => {
  const width = window.innerWidth;
  let numgutterH = 0;
  let numgutterV = 0;
  // 水平方向间距
  const gutterH = Array.isArray(gutter)
    ? isNumber(gutter[0])
      ? ((numgutterH = gutter[0]), {})
      : gutter[0]
    : {};
  // 垂直方向间距
  const gutterV = Array.isArray(gutter)
    ? isNumber(gutter[1])
      ? ((numgutterV = gutter[1]), {})
      : gutter[1]
    : gutter ?? {};

  if (width <= 576 && (gutterH.xs || gutterV.xs)) {
    return {
      padding: `${(gutterH.xs ?? 0) / 2}px ${(gutterV.xs ?? 0) / 2}px`,
    };
  } else if (width <= 768 && (gutterH.sm || gutterV.sm)) {
    return {
      padding: `${(gutterH.sm ?? 0) / 2}px ${(gutterV.sm ?? 0) / 2}px`,
    };
  } else if (width <= 992 && (gutterH.md || gutterV.md)) {
    return {
      padding: `${(gutterH.md ?? 0) / 2}px ${(gutterV.md ?? 0) / 2}px`,
    };
  } else if (width <= 1200 && (gutterH.lg || gutterV.lg)) {
    return {
      padding: `${(gutterH.lg ?? 0) / 2}px ${(gutterV.lg ?? 0) / 2}px`,
    };
  } else if (width <= 1600 && (gutterH.xl || gutterV.xl)) {
    return {
      padding: `${(gutterH.xl ?? 0) / 2}px ${(gutterV.xl ?? 0) / 2}px`,
    };
  } else if (gutterH?.xxl || gutterV?.xxl) {
    return {
      padding: `${(gutterH.xxl ?? 0) / 2}px ${(gutterV.xxl ?? 0) / 2}px`,
    };
  }
  // 否则用最大的尺寸
  const maxSizeH =
    gutterH?.xl ||
    gutterH?.lg ||
    gutterH?.md ||
    gutterH?.sm ||
    gutterH?.xs ||
    numgutterH;
  const maxSizeV =
    gutterV?.xl ||
    gutterV?.lg ||
    gutterV?.md ||
    gutterV?.sm ||
    gutterV?.xs ||
    numgutterV;
  return { padding: `${maxSizeH / 2}px ${maxSizeV / 2}px` };
};

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { children, span, className, style, ...rest } = props;

  // 行上下文
  const rowContext = useContext(RowContext);

  // 内部样式
  const [innerStyle, setInnerStyle] = useState<React.CSSProperties>();

  // 处理内部样式
  const handleInnerStyle = useCallback(() => {
    //如果间隔为数字
    if (isNumber(rowContext?.gutter)) {
      setInnerStyle({
        padding: `0 ${rowContext?.gutter / 2}px`,
      });
    } else if (isObject(rowContext?.gutter)) {
      const gutter = rowContext?.gutter;
      const resizeFn = () => {
        setInnerStyle(responsiveWidth(gutter));
      };
      // 监听body进行响应式更新
      resizeObserver.addResize(document.body, resizeFn);

      return resizeFn;
    }
  }, []);

  useEffect(() => {
    const resizeFn = handleInnerStyle();

    () => {
      // 移除监听
      resizeFn && resizeObserver.removeResize(document.body, resizeFn);
    };
  }, []);

  return (
    <div
      className={classNames("versa-col", `versa-col-${span}`, className)}
      ref={ref}
      style={{ ...style, ...innerStyle }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Col;
