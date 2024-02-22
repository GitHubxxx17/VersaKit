import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

// 标签对象类型
type optItemType = {
  label?: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

// 控制器属性
export interface SegmentedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: (number | string | optItemType)[];
  block?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  value?: string | number;
  size?: SizeType;
  defaultValue?: string | number;
}

// 设置滑块样式
const setSlideStyle = (slide: HTMLDivElement, label: HTMLLabelElement) => {
  slide.style.left = `${label.offsetLeft}px`;
  slide.style.width = `${label.offsetWidth}px`;
};

// 将options全部处理成optItemType
const handleOptItem = (
  options: (number | string | optItemType)[]
): optItemType[] => {
  return options.map((item) => {
    if (typeof item === "string" || typeof item === "number") {
      return {
        label: item,
        value: item,
      } as optItemType;
    }
    return item;
  });
};

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (props, ref) => {
    const {
      options = [],
      block,
      disabled,
      onChange,
      value,
      size = "middle",
      defaultValue,
      className,
      ...rest
    } = props;
    // 当前选中的label
    const [currentIndex, setCurrIndex] = useState(0);
    // 滑块ref
    const slideRef = useRef<HTMLDivElement>(null);
    // 标签ref
    const labelsRef = useRef<HTMLLabelElement[]>([]);
    /// 判断滑块是否在移动
    const [slideIsMove, setSlideIsMove] = useState(false);
    // 定时器
    let timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // 处理后的option
    let [option, setOption] = useState<optItemType[]>([]);

    // 处理点击选中事件
    const handleClick = (index: number) => {
      setSlideIsMove(true);
      onChange && onChange(option[index].value);
      labelsRef.current[currentIndex].classList.remove(
        "versa-segmented-item-selected"
      );
      setCurrIndex(index);
      const slide = slideRef.current!;
      slide.style.display = "block";
      setSlideStyle(slide, labelsRef.current[index]);
    };

    useEffect(() => {
      timerRef.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSlideIsMove(false);
        slideRef.current!.style.display = "none";
      }, 300);
      () => {
        timerRef.current && clearTimeout(timerRef.current);
      };
    }, [currentIndex]);

    useEffect(() => {
      setOption(handleOptItem(options));
    }, [options]);

    useEffect(() => {
      option.some((item, index) => {
        if (item.value == value) {
          setCurrIndex(index);
          return;
        }
      });
    }, [value]);

    useEffect(() => {
      if (defaultValue) {
        const index = handleOptItem(options).findIndex(
          (item) => item.value == defaultValue
        );
        setCurrIndex(index);
      }
    }, []);

    return (
      <div
        className={classNames(
          "versa-segmented",
          { "versa-segmented-block": block },
          className
        )}
        ref={ref}
        {...rest}
      >
        <div
          className={classNames("versa-segmented-group", {
            "versa-segmented-group-move": slideIsMove,
          })}
        >
          {option.map((item, index) => (
            <label
              ref={(el) => {
                if (el) {
                  labelsRef.current[index] = el;
                }
              }}
              className={classNames(
                "versa-segmented-item",
                `versa-segmented-item-${size}`,
                item.className,
                {
                  "versa-segmented-item-selected":
                    !slideIsMove && currentIndex == index,
                  "versa-segmented-item-disabled": disabled || item.disabled,
                }
              )}
              onClick={() => {
                if (disabled || item.disabled || index == currentIndex) return;
                handleClick(index);
              }}
              key={index}
            >
              {item.icon && (
                <span className="versa-segmented-item-icon">{item.icon}</span>
              )}
              {item.label && (
                <div className="versa-segmented-item-inner">{item.label}</div>
              )}
            </label>
          ))}
          <div ref={slideRef} className="versa-segmented-slide"></div>
        </div>
      </div>
    );
  }
);

export default Segmented;
