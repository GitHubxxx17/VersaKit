import { isNumber, isValidReactNode } from "@/utils";
import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Tooltip from "../tooltip";
import { TooltipPlacement } from "../tooltip/TooltipHelper";
import "./index.scss";

// 标签类型
type markType = {
  [key: number]:
    | React.ReactNode
    | { style?: React.CSSProperties; label: React.ReactNode };
};

// tooltip类型
type toolTipType = {
  open?: boolean;
  placement?: TooltipPlacement;
  formatter?: ((value: string) => React.ReactNode) | null;
};

// 基础属性
export interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
  > {
  children?: React.ReactNode;
  defaultValue?: number | [number, number];
  disabled?: boolean;
  range?: boolean;
  draggableTrack?: boolean;
  max?: number;
  min?: number;
  step?: number | null;
  value?: number | [number, number];
  onChange?: (value: any) => void;
  onChangeComplete?: (value: any) => void;
  marks?: markType;
  included?: boolean;
  vertical?: boolean;
  tooltip?: toolTipType;
  reverse?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    children,
    defaultValue,
    disabled = false,
    range = false,
    max = 100,
    min = 0,
    step = 1,
    onChange,
    onChangeComplete,
    included = true,
    marks,
    value,
    vertical = false,
    tooltip,
    reverse = false,
    draggableTrack = false,
    className,
    ...rest
  } = props;
  // 进度条的值 min ~ max
  const [innerValue, setinnerValue] = useState<[number, number]>([min, min]);
  // 圆点聚焦
  const [handleFocus, setHandleFocus] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  // tooltip的显示
  const [tooltipOpen, setTooltipOpen] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  // 隐藏tooltip
  const [hide, setHide] = useState<boolean>(false);
  // 圆点正在拖拽
  const [handleDraging, setHandleDraging] = useState<boolean>(false);
  // 进度条ref
  const progressStepRef = useRef<HTMLDivElement>(null);
  // 进度条进度ref
  const progressTrackRef = useRef<HTMLDivElement>(null);
  // 进度条进度初始值和两端的绝对值
  const progressTrackValues = useRef<[number, number]>([0, 0]);
  // 标签数组
  const markList = useMemo(() => {
    if (!marks) return [];
    let keys = Object.keys(marks).map((v) => Number(v));
    return keys.sort((a, b) => a - b);
  }, [marks]);

  // tooltip格式
  const formatter = useCallback(
    (val: number) => {
      if (tooltip?.formatter) {
        return tooltip?.formatter(String(val));
      }
      return val;
    },
    [tooltip?.formatter]
  );

  // tooltip位置
  const placement = useMemo(() => {
    if (tooltip?.placement) {
      return tooltip?.placement;
    }
    return vertical ? "right" : "top";
  }, [tooltip?.placement, vertical]);

  // 获取值在标签数组中的范围
  const getMarkRange = useCallback(
    (val: number) => {
      if (!markList.length) return 0;
      // let t1 = 10;
      // let len = markList.length - 1;
      // let left = 0,
      //   right = len;
      // while (left < right) {
      //   t1--;
      //   let mid = (left + right) >> 1;
      //   if (markList[mid] <= val) {
      //     left = mid;
      //   } else {
      //     right = mid - 1;
      //   }
      //   if (left == right - 1) break;
      //   if (t1 == 0) {
      //     console.error("sxh");
      //     break;
      //   }
      // }
      // console.log(left, right, markList[left], markList[right]);
      if (markList[0] > val) return val;
      if (markList[markList.length - 1] < val)
        return markList[markList.length - 1];
      for (let i = 0; i < markList.length; i++) {
        if (markList[i] >= val) {
          let absVal1 = Math.abs(markList[i] - val);
          let absVal2 = Math.abs(markList[i - 1] - val);
          return absVal1 > absVal2 ? markList[i - 1] : markList[i];
        }
      }
      return 0;
    },
    [markList]
  );

  // 受控更改
  useEffect(() => {
    if (value) valueToRange(value);
  }, [value]);

  // 差值范围
  const limit = useMemo(() => {
    if (min > max) throw "slider: max不能大于min";
    return max - min;
  }, [max, min]);

  // 计算进度的宽度
  const trackWidth = useMemo(() => {
    return (Math.abs(innerValue[1] - innerValue[0]) / limit) * 100;
  }, [innerValue, limit]);

  // 计算进度的left
  const trackLeft = useMemo(() => {
    let valueMin = Math.min(...innerValue);
    // 取value最小值与最低限度的差值
    valueMin = valueMin - min;
    if (reverse)
      valueMin = max - valueMin - Math.abs(innerValue[1] - innerValue[0]);
    return (valueMin / limit) * 100;
  }, [innerValue, limit, reverse]);

  // 合成进度的style
  const trackStyle = useMemo((): React.CSSProperties => {
    if (vertical) {
      return {
        top: `${100 - trackWidth - trackLeft}%`,
        height: `${trackWidth}%`,
      };
    } else {
      return {
        left: `${trackLeft}%`,
        width: `${trackWidth}%`,
      };
    }
  }, [trackWidth, trackLeft, vertical]);

  // 计算两个圆点的位置
  const handlePosition = useMemo((): React.CSSProperties[] => {
    if (vertical) {
      let topArr = [
        {
          top: `${100 - trackLeft}%`,
        },
        {
          top: `${100 - trackWidth - trackLeft}%`,
        },
      ];
      if (reverse) topArr.reverse();
      if (innerValue[0] < innerValue[1]) {
        return topArr.slice(0);
      } else {
        return topArr.slice(0).reverse();
      }
    } else {
      let leftArr = [
        {
          left: `${trackLeft}%`,
        },
        {
          left: `${trackLeft + trackWidth}%`,
        },
      ];
      if (reverse) leftArr.reverse();
      if (innerValue[0] < innerValue[1]) {
        return leftArr.slice(0);
      } else {
        return leftArr.slice(0).reverse();
      }
    }
  }, [trackLeft, trackWidth, vertical, reverse]);

  // 计算标签的位置
  const markPosition = useCallback(
    (key: string): React.CSSProperties => {
      let numKey = Number(key);
      if (vertical) {
        if (!reverse) {
          return { top: `${max - numKey}%` };
        } else {
          return { top: `${key}%` };
        }
      } else {
        if (reverse) {
          return { left: `${max - numKey}%` };
        } else {
          return { left: `${key}%` };
        }
      }
    },
    [vertical, reverse, max]
  );

  // 处理范围
  const handleRange = useCallback(
    (val: number) => {
      if (val < min) return min;
      if (val > max) return max;
      return val;
    },
    [min, max]
  );

  // 设置进度条的值的范围
  const valueToRange = useCallback((val: number | [number, number]) => {
    let newVal = [min, min] as [number, number];
    if (isNumber(val)) {
      newVal = [min, handleRange(val)];
      onChange?.(newVal[1]);
    } else {
      newVal = [handleRange(val[0]), handleRange(val[1])];
      onChange?.(newVal);
    }
    setinnerValue(newVal);
  }, []);

  // 处理设置进度条进度
  const handleSetValue = useCallback(
    (
      clientX: number,
      isDrag: [boolean, boolean] = [false, false],
      firstToDrag: boolean = false
    ) => {
      if (!progressStepRef.current) return;
      const { offsetWidth, offsetHeight } = progressStepRef.current;
      const { x, y } = progressStepRef.current.getBoundingClientRect();
      let val = vertical
        ? ((clientX - y) * limit) / offsetHeight
        : ((clientX - x) * limit) / offsetWidth;

      if (isNumber(step)) {
        // 检查step是否大于0
        if (step < 0) throw "slider: step 必须大于0";
        // 设置步长
        let halfStep = val % step;
        if (halfStep < step / 2) {
          val -= halfStep;
        } else {
          val += step - halfStep;
        }
      }

      // 加上最低限度的值
      val += min;

      // 如果是垂直布局就反过来
      if ((vertical && !reverse) || (!vertical && reverse)) {
        val = max - val;
      }

      if (!isNumber(step)) {
        val = getMarkRange(val);
      }

      // 如果是范围取值
      if (range) {
        if (isDrag[0] && isDrag[1]) {
          // 如果在拖拽整条进度条
          console.log(val, progressTrackValues.current);
          // 首次移动时,记录当前位置
          if (firstToDrag) {
            progressTrackValues.current = [
              val - innerValue[0],
              innerValue[1] - val,
            ];
          } else {
            const start = val - progressTrackValues.current[0];
            const end = val + progressTrackValues.current[1];
            if (start >= min && end <= max) valueToRange([start, end]);
          }
        } else if (isDrag[0] || isDrag[1]) {
          // 如果是在拖拽其中一个圆点时
          if (isDrag[0]) {
            valueToRange([val, innerValue[1]]);
            setHandleFocus([true, false]);
          } else {
            valueToRange([innerValue[0], val]);
            setHandleFocus([false, true]);
          }
        } else {
          let absVal1 = Math.abs(innerValue[0] - val);
          let absVal2 = Math.abs(innerValue[1] - val);

          if (absVal1 > absVal2) {
            valueToRange([innerValue[0], val]);
            setHandleFocus([false, true]);
          } else {
            valueToRange([val, innerValue[1]]);
            setHandleFocus([true, false]);
          }
        }
      } else {
        valueToRange(val);
        setHandleFocus([false, true]);
      }
    },
    [
      range,
      innerValue,
      progressStepRef.current,
      vertical,
      reverse,
      draggableTrack,
      min,
      max,
    ]
  );

  // 点击进度条设置进度
  const setValueByProgress = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if (vertical) {
        handleSetValue(e.clientY);
      } else {
        handleSetValue(e.clientX);
      }
      e.stopPropagation();
    },
    [disabled, handleSetValue, vertical]
  );

  // 点击拖动进度条
  const progressToDrag = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.stopPropagation();
      e.preventDefault();
      let move = false;

      const mousemove = (e: MouseEvent) => {
        if (vertical) {
          handleSetValue(e.clientY, [true, true], !move);
        } else {
          handleSetValue(e.clientX, [true, true], !move);
        }
        if (!move) move = true;
      };

      // 移除事件
      const mouseup = () => {
        // 如果没有移动触发点击事件
        if (!move) {
          setValueByProgress(e);
        }
        if (range) {
          onChangeComplete?.(innerValue);
        } else {
          onChangeComplete?.(innerValue[1]);
        }
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };
      if (draggableTrack) {
        window.addEventListener("mousemove", mousemove);
      }
      window.addEventListener("mouseup", mouseup);
    },
    [disabled, handleSetValue, innerValue, range, vertical, setValueByProgress]
  );

  // 鼠标移入圆点控制显隐
  const hoverHandle = useCallback(
    (isRight: boolean) => {
      return {
        onMouseEnter: () => {
          if (!hide) {
            setTooltipOpen([!isRight, isRight]);
          }
        },
        onMouseLeave: () => {
          setTooltipOpen([false, false]);
        },
      };
    },
    [hide]
  );

  // 点击圆点进行拖动
  const handleToDrag = useCallback(
    (e: React.MouseEvent, isRight: boolean = true) => {
      if (disabled) return;
      e.stopPropagation();
      e.preventDefault();

      const mousemove = (e: MouseEvent) => {
        setHandleDraging(true);
        if (vertical) {
          handleSetValue(e.clientY, [!isRight, isRight]);
        } else {
          handleSetValue(e.clientX, [!isRight, isRight]);
        }
        if (!hide) {
          setTooltipOpen([!isRight, isRight]);
        }
      };

      // 移除事件
      const mouseup = () => {
        if (range) {
          onChangeComplete?.(innerValue);
        } else {
          onChangeComplete?.(innerValue[1]);
        }
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        setTimeout(() => {
          setHandleDraging(false);
          setTooltipOpen([false, false]);
        }, 0);
      };
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    },
    [disabled, handleSetValue, innerValue, range, vertical, hide]
  );

  // 设置圆点失焦
  const setHandleBlur = useCallback(() => {
    if (!handleDraging) setHandleFocus([false, false]);
  }, [handleDraging]);

  // 初始化
  useLayoutEffect(() => {
    if (range) {
      valueToRange(Array.isArray(defaultValue) ? defaultValue : [min, min]);
    } else {
      valueToRange(isNumber(defaultValue) ? defaultValue : min);
    }
  }, [defaultValue, range]);

  useEffect(() => {
    window.addEventListener("click", setHandleBlur);
    return () => {
      window.removeEventListener("click", setHandleBlur);
    };
  }, [handleDraging]);

  // 控制tooltip
  useEffect(() => {
    if (tooltip?.open === false || tooltip?.formatter === null) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [tooltip]);

  return (
    <div
      className={classNames(
        "versa-slider",
        {
          "versa-slider-disabled": disabled,
          "versa-slider-with-marks": marks,
          "versa-slider-vertical": vertical,
        },
        className
      )}
      ref={ref}
      {...rest}
    >
      {/* 进度条 */}
      <div
        ref={progressStepRef}
        className={classNames("versa-slider-step")}
        onClick={setValueByProgress}
      >
        {marks &&
          Object.entries(marks).map(([key, _]) => {
            return (
              <div
                style={markPosition(key)}
                className={classNames("versa-slider-dot", {
                  "versa-slider-dot-active":
                    Number(key) <= innerValue[1] &&
                    Number(key) >= innerValue[0] &&
                    included,
                })}
                key={key}
              ></div>
            );
          })}
      </div>
      {/* 进度条进度 */}
      {included && (
        <div
          ref={progressTrackRef}
          className={classNames("versa-slider-track")}
          style={trackStyle}
          onMouseDown={progressToDrag}
        ></div>
      )}
      {/* 圆点1 */}
      {range && (
        <Tooltip
          title={formatter(innerValue[0])}
          open={tooltipOpen[0]}
          placement={placement}
        >
          <div
            className={classNames("versa-slider-handle", {
              "versa-slider-handle-focus": handleFocus[0],
            })}
            style={handlePosition[0]}
            onMouseDown={(e) => handleToDrag(e, false)}
            {...hoverHandle(false)}
          ></div>
        </Tooltip>
      )}
      {/* 圆点2 */}
      <Tooltip
        title={formatter(innerValue[1])}
        open={tooltipOpen[1]}
        placement={placement}
      >
        <div
          className={classNames("versa-slider-handle", {
            "versa-slider-handle-focus": handleFocus[1],
          })}
          style={handlePosition[1]}
          onMouseDown={handleToDrag}
          {...hoverHandle(true)}
        ></div>
      </Tooltip>
      {/* 标签 */}
      <div className={classNames("versa-slider-mark")}>
        {marks &&
          Object.entries(marks).map(([key, value]) => {
            let markStyle = { ...markPosition(key) } as React.CSSProperties;
            if (!isValidReactNode(value) && value.style) {
              markStyle = value.style;
            }

            markStyle = { ...markStyle, ...markPosition(key) };

            return (
              <div
                className={classNames("versa-slider-mark-text", {
                  "versa-slider-mark-active":
                    Number(key) <= innerValue[1] &&
                    Number(key) >= innerValue[0] &&
                    included,
                })}
                style={markStyle}
                key={key}
              >
                {isValidReactNode(value) ? value : value.label}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Slider;
