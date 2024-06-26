import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { isExist, isFragment, isValidElement } from "../../utils";
import { colors } from "../tag/list";
import {
  TooltipPlacement,
  animateTime,
  appearAnimation,
  disappearAnimation,
  getPos,
  handlePlacement,
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
    open,
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
  const [visible, setVisible] = useState(false);
  // 类名数组
  let innerClassNames: string[] = [];
  // 触发组件ref
  const triggerRef = useRef<HTMLDivElement>();
  // 文字提示ref
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 文字提示箭头ref
  const arrowRef = useRef<HTMLDivElement>(null);
  // 触发器
  const Trigger = useRef<React.FunctionComponentElement<any>>();
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
  // 监听触发器在页面的位置变化
  let observer = useRef<IntersectionObserver | null>(null);
  // 内部偏移位置
  const innerPlacement = useRef(placement);

  //清除定时器
  const clearAllTimer = useCallback(() => {
    enterTimerRef.current && clearTimeout(enterTimerRef.current);
    leaveTimerRef.current && clearTimeout(leaveTimerRef.current);
  }, [enterTimerRef.current, leaveTimerRef.current]);

  // 清除监听
  const cleanRefresh = useCallback(() => {
    observer.current && observer.current.disconnect();
  }, [observer.current]);

  const handleTooltipVisible = useCallback(() => {
    if (!tooltipRef.current) return;
    const tooltip = tooltipRef.current;
    // 首次加载组件
    if (first) return;
    //取消上一次的动画
    if (animate.current) {
      animate.current.cancel();
    }
    //如果有回调函数就执行
    onOpenChange?.(visible);
    if (visible) {
      //淡入
      tooltip.style.display = "block";
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
  }, [visible, tooltipRef.current, first, destroyTooltipOnHide]);

  // 触发显示和隐藏
  useEffect(() => {
    handleTooltipVisible();
  }, [visible]);

  //设置颜色
  useEffect(() => {
    if (color) {
      if (colors.includes(color)) {
        innerClassNames.push(`versa-tooltip-${color}`);
      } else {
        bgColor = color;
      }
    }
  }, [color]);

  if (children) {
    // 如果传入的children是纯文本将其放入span中
    const child = handleChild(children);

    // 处理显示
    const handleVisible = useCallback(() => {
      if (isExist(open)) return;
      clearAllTimer();
      enterTimerRef.current = setTimeout(() => {
        setVisible(!visible);
        triggerRef.current?.classList.add("versa-tooltip-active");
        if (visible && trigger == "click") {
          triggerRef.current?.classList.remove("versa-tooltip-active");
        }
        if (first) setFirst(false);
      }, mouseEnterDelay * 1000);
    }, [clearAllTimer, first, mouseEnterDelay, visible, open, trigger]);

    // 处理隐藏
    const handleHidden = useCallback(() => {
      if (isExist(open)) return;
      clearAllTimer();
      leaveTimerRef.current = setTimeout(() => {
        triggerRef.current?.classList.remove("versa-tooltip-active");
        setVisible(false);
      }, mouseLeaveDelay * 1000);
    }, [clearAllTimer, open, mouseLeaveDelay]);

    // 将child改造成触发器
    const createTrigger = useCallback(() => {
      if ((child as any).ref) {
        Trigger.current = React.cloneElement(child, {
          ...triggerHandler(trigger, handleVisible, handleHidden),
        });
        triggerRef.current = (child as any).ref.current;
      } else {
        Trigger.current = React.cloneElement(child, {
          ...triggerHandler(trigger, handleVisible, handleHidden),
          ref: triggerRef,
        });
      }
    }, [child, handleVisible, handleHidden]);

    createTrigger();

    // 手动设置显示隐藏
    useEffect(() => {
      if (open && first) {
        setFirst(false);
      }
      if (!isExist(open)) return;
      setVisible(open);
    }, [open]);

    useEffect(() => {
      // 默认显示
      if (defaultOpen) handleVisible();

      //销毁定时器
      return () => {
        clearAllTimer();
      };
    }, []);

    useEffect(() => {
      // 触发显示时开始监听，否则清除监听
      if (visible) {
        innerPlacement.current = placement;
        refresh();
      } else {
        cleanRefresh();
      }

      return () => {
        cleanRefresh();
      };
    }, [visible]);

    // 更新tooltip位置
    const refresh = useCallback(() => {
      // 清理监听
      cleanRefresh();

      if (!triggerRef.current) return;

      // 获取元素的位置和尺寸信息
      const { left, top, width, height } =
        triggerRef.current.getBoundingClientRect();

      // 这里更新弹窗的位置
      if (tooltipRef.current) {
        let place = handlePlacement(
          innerPlacement.current,
          tooltipRef.current,
          { height, width }
        );
        if (place) innerPlacement.current = place;

        getPos(
          innerPlacement.current,
          triggerRef.current,
          tooltipRef.current,
          arrowRef.current
        );
      }

      // 如果元素的宽度或高度不存在，则直接返回
      if (!width || !height) {
        return;
      }

      // 计算元素相对于视口四个方向的偏移量
      const insetTop = Math.floor(top);
      const insetRight = Math.floor(window.innerWidth - (left + width));
      const insetBottom = Math.floor(window.innerHeight - (top + height));
      const insetLeft = Math.floor(left);

      // 定义 IntersectionObserver 的选项
      //window.top == window.self 判断是否在iframe中 false说明页面被嵌套在iframe中
      const options: IntersectionObserverInit = {
        root: window.top == window.self ? null : document.body,
        rootMargin: `${-insetTop}px ${-insetRight}px ${-insetBottom}px ${-insetLeft}px`,
        threshold: 1,
      };

      // 处理 IntersectionObserver 的观察结果
      function handleObserve(entries: IntersectionObserverEntry[]) {
        // 元素和视口交叉的比例
        const ratio = entries[0].intersectionRatio;
        // 当交叉比例为1时，元素在页面上位置没有发生变化
        if (ratio !== 1) refresh();
      }

      // 创建 IntersectionObserver 对象并开始观察元素
      observer.current = new IntersectionObserver(handleObserve, options);
      // 监听元素
      observer.current.observe(triggerRef.current);
    }, [
      cleanRefresh,
      innerPlacement.current,
      triggerRef.current,
      tooltipRef.current,
      arrowRef.current,
    ]);

    // 如果title为空则禁用
    if (title === "") {
      triggerRef.current = undefined;
      return child;
    }

    return (
      <>
        {!first &&
          ReactDOM.createPortal(
            <div>
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
              </div>
            </div>,
            document.body
          )}
        {Trigger.current}
      </>
    );
  }
}

export default Tooltip;
