import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { isFragment, isValidElement } from "../../utils";
import { colors } from "../tag/list";
import {
  TooltipPlacement,
  animateTime,
  appearAnimation,
  disappearAnimation,
  getPos,
  trigger,
  triggerHandler,
} from "./TooltipHelper";
import "./index.scss";

// 按钮基础属性
export interface TooltipProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  placement?: TooltipPlacement;
  color?: string;
  arrow?: boolean;
  defaultOpen?: boolean;
  destroyTooltipOnHide?: boolean;
  trigger?: trigger;
  open?: boolean;
  zIndex?: number;
  onOpenChange?: (open: boolean) => void;
}
//处理传入的子组件
const handleChild = (children: React.ReactNode) => {
  return isValidElement(children) && !isFragment(children) ? (
    children
  ) : (
    <span>{children}</span>
  );
};

function Tooltip(props: TooltipProps) {
  const {
    title,
    children,
    mouseEnterDelay = 0.05,
    mouseLeaveDelay = 0.05,
    placement = "top",
    color,
    arrow = true,
    defaultOpen = false,
    trigger = "hover",
    open = false,
    destroyTooltipOnHide = false,
    zIndex = 100,
    onOpenChange,
    className,
    style,
    ...rest
  } = props;
  // 合并样式
  let patchStyle = { ...style, zIndex };
  // 显示隐藏
  const [visible, setVisible] = useState(open);
  // 类名数组
  let innerClassNames: string[] = [];
  // 触发组件ref
  const triggerRef = useRef<HTMLDivElement>();
  // 文字提示ref
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 文字提示箭头ref
  const arrowRef = useRef<HTMLDivElement>(null);
  // 文字提示动画实例
  const animate = useRef<Animation>();
  // 首次鼠标移入
  const [first, setFirst] = useState(true);
  // 背景颜色
  let bgColor = "";
  // 移入延迟定时器
  let enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 移出延迟定时器
  let leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //清除定时器
  const clearAllTimer = () => {
    enterTimerRef.current && clearTimeout(enterTimerRef.current);
    leaveTimerRef.current && clearTimeout(leaveTimerRef.current);
  };

  // 触发显示和隐藏
  useEffect(() => {
    const tooltip = tooltipRef.current as HTMLDivElement;
    if (first) return;
    //取消上一次的动画
    if (animate.current) {
      animate.current.cancel();
    }
    //如果有回调函数
    onOpenChange && onOpenChange(visible);
    if (visible) {
      //淡入
      tooltip.style.display = "block";
      const trigger = triggerRef.current as HTMLDivElement;
      const arrow = arrowRef.current as HTMLDivElement;
      getPos(placement, trigger, tooltip, arrow);
      animate.current = tooltip.animate(appearAnimation, animateTime);
    } else {
      //淡出
      animate.current = tooltip.animate(disappearAnimation, animateTime);
      animate.current.onfinish = () => {
        tooltip.style.display = "none";
        // 隐藏销毁
        if (destroyTooltipOnHide) {
          setFirst(true);
        }
      };
    }
  }, [visible]);

  //设置颜色
  if (color) {
    if (colors.includes(color)) {
      innerClassNames.push(`versa-tooltip-${color}`);
    } else {
      bgColor = color;
    }
  }

  if (children) {
    // 如果传入的children是纯文本将其放入span中
    const child = handleChild(children);

    // 处理显示
    const handleVisible = () => {
      clearAllTimer();
      enterTimerRef.current = setTimeout(() => {
        setVisible(!visible);
        triggerRef.current?.classList.add("versa-tooltip-active");
        if (visible && trigger == "click") {
          triggerRef.current?.classList.remove("versa-tooltip-active");
        }
        if (first) setFirst(false);
      }, mouseEnterDelay * 1000);
    };

    // 处理隐藏
    const handleHidden = () => {
      clearAllTimer();
      leaveTimerRef.current = setTimeout(() => {
        triggerRef.current?.classList.remove("versa-tooltip-active");
        setVisible(false);
      }, mouseLeaveDelay * 1000);
    };

    // 将child改造成触发器
    const Trigger = React.cloneElement(child, {
      ...triggerHandler(trigger, handleVisible, handleHidden),
      ref: triggerRef,
    });

    // 手动设置显示隐藏
    useEffect(() => {
      if (open && first) handleVisible();
      setVisible(open);
    }, [open]);

    useEffect(() => {
      // 默认显示
      if (defaultOpen) handleVisible();

      //销毁定时器
      () => {
        clearAllTimer();
      };
    }, []);

    // 如果title为空则禁用
    if (!title) {
      triggerRef.current = undefined;
      return child;
    }

    return (
      <>
        {!first &&
          ReactDOM.createPortal(
            <div
              ref={tooltipRef}
              className={classNames(
                "versa-tooltip",
                ...innerClassNames,
                className
              )}
              style={patchStyle}
              {...rest}
            >
              {arrow && (
                <div
                  ref={arrowRef}
                  className="versa-tooltip-arrow"
                  style={{ backgroundColor: bgColor }}
                ></div>
              )}
              <div
                className="versa-tooltip-content"
                style={{ backgroundColor: bgColor }}
              >
                {title}
              </div>
            </div>,
            document.body
          )}
        {Trigger}
      </>
    );
  }
}

export default Tooltip;
