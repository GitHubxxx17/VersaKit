import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

type optItemType = {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export interface SegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: (number | string | optItemType)[];
  block?: boolean;
  disabled?: boolean;
}

// 设置滑块样式
const setSlideStyle = (slide: HTMLDivElement, label: HTMLLabelElement) => {
  slide.style.left = `${label.offsetLeft}px`;
  slide.style.width = `${label.offsetWidth}px`;
};

const isNotOptItemType = (item: number | string | optItemType) => {
  return typeof item != "number" || typeof item != "string";
};

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (props, ref) => {
    const { options = [], block, disabled, className, ...rest } = props;
    // 当前选中的label
    const [currentIndex, setCurrIndex] = useState(0);
    // 滑块ref
    const slideRef = useRef<HTMLDivElement>(null);
    // 标签ref
    const labelsRef = useRef<HTMLLabelElement[]>([]);
    const [slideIsMove, setSlideIsMove] = useState(false);
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 处理点击选中事件
    const handleClick = (index: number) => {
      if (index == currentIndex) return;
      setSlideIsMove(true);
      labelsRef.current[currentIndex].classList.remove(
        "versa-segmented-item-selected"
      );
      setCurrIndex(index);
      const slide = slideRef.current!;
      slide.style.display = "block";
      setSlideStyle(slide, labelsRef.current[index]);
    };

    useEffect(() => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        setSlideIsMove(false);
        slideRef.current!.style.display = "none";
      }, 300);
    }, [currentIndex]);

    return (
      <div
        className={[
          "versa-segmented",
          block ? "versa-segmented-block" : "",
          className,
        ].join(" ")}
        ref={ref}
        {...rest}
      >
        <div
          className={[
            "versa-segmented-group",
            slideIsMove ? "versa-segmented-group-move" : "",
          ].join(" ")}
        >
          {options.map((item, index) => (
            <label
              ref={(el) => {
                if (el) {
                  labelsRef.current[index] = el;
                }
              }}
              className={[
                "versa-segmented-item",
                !slideIsMove && currentIndex == index
                  ? "versa-segmented-item-selected"
                  : "",
                disabled && "versa-segmented-item-disabled",
              ].join(" ")}
              htmlFor=""
              onClick={() => {
                if (disabled) return;
                handleClick(index);
              }}
              key={index}
            >
              <div className="versa-segmented-item-inner">
                {typeof item === "string" || typeof item === "number"
                  ? item
                  : item.label}
              </div>
            </label>
          ))}
          <div ref={slideRef} className="versa-segmented-slide"></div>
        </div>
      </div>
    );
  }
);

export default Segmented;
