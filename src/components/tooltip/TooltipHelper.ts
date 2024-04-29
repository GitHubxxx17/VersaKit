// css动画方向
export const transfromOriginList = {
  top: "bottom center",
  left: "right center",
  right: "left center",
  bottom: "top center",
  topLeft: "bottom left",
  topRight: "bottom right",
  bottomLeft: "top left",
  bottomRight: "top right",
  leftTop: "right top",
  leftBottom: "right bottom",
  rightTop: "left top",
  rightBottom: "left bottom",
};

// 方向类型
export type TooltipPlacement = keyof typeof transfromOriginList;

// 动画执行时间
export const animateTime = 100;

// 淡入动画效果
export const appearAnimation = [
  { opacity: 0, transform: "scale(0.7)" },
  { opacity: 1, transform: "scale(1)" },
];
// 淡出动画效果
export const disappearAnimation = [
  { opacity: 1, transform: "scale(1)" },
  { opacity: 0, transform: "scale(0.7)" },
];

export /**
 * 返回滚动条宽高
 * @return {*}
 */
const scrollBarWidthOrHeight = () => {
  return {
    scrollBarWidth: window.innerWidth - document.body.clientWidth,
    scrollBarHeight: window.innerHeight - document.documentElement.clientHeight,
  };
};

export /**
 * 设置tooltip位置
 * @param {TooltipPlacement} placement 方向
 * @param {HTMLDivElement} trigger 触发器dom节点
 * @param {HTMLDivElement} tooltip 提示dom节点
 * @param {(HTMLDivElement | null)} arrow 箭头dom节点
 */
const getPos = (
  placement: TooltipPlacement,
  trigger: HTMLDivElement,
  tooltip: HTMLDivElement,
  arrow: HTMLDivElement | null
) => {
  const {
    top: tgTop,
    left: tgLeft,
    width: tgWidth,
    height: tgHeight,
  } = trigger.getBoundingClientRect();

  const { offsetLeft: tgOffsetLeft, offsetTop: tgOffsetTop } = trigger;

  const { scrollBarWidth, scrollBarHeight } = scrollBarWidthOrHeight();

  const tlWidth = tooltip.offsetWidth;
  const tlHeight = tooltip.offsetHeight;
  const arWidth = arrow?.offsetWidth ?? 0;
  const arHeight = arrow?.offsetHeight ?? 0;

  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;

  let tlTop = tgTop + scrollTop,
    tlLeft = tgLeft + scrollLeft,
    arTop = 0,
    arLeft = 0;

  let hasArrowPos = arrow ? 10 : 5;

  if (["top", "topLeft", "topRight"].includes(placement)) {
    tlTop -= tlHeight + hasArrowPos;
    arTop = tlHeight - arHeight / 2 - 1;
  }

  if (["left", "leftTop", "leftBottom"].includes(placement)) {
    tlLeft -= tlWidth + hasArrowPos;
    arLeft = tlWidth - arWidth / 2 - 1;
  }

  if (["right", "rightTop", "rightBottom"].includes(placement)) {
    tlLeft += tgWidth + hasArrowPos;
    arLeft = -arWidth / 2 + 1;
  }

  if (["bottom", "bottomLeft", "bottomRight"].includes(placement)) {
    tlTop += tgHeight + hasArrowPos;
    arTop = -arHeight / 2 + 1;
  }

  if (placement === "top" || placement === "bottom") {
    if (tgLeft < (tlWidth - tgWidth) / 2) {
      // 向左贴边偏移
      arLeft = (tgWidth - arWidth) / 2 - (scrollLeft - tgOffsetLeft);
      arLeft = arLeft < 10 ? 10 : arLeft;
      tlLeft = scrollLeft;
      if (scrollLeft - (tgOffsetLeft + tgWidth - 30) > 0) {
        tlLeft = tgOffsetLeft + tgWidth - 30;
      }
    } else if (
      window.innerWidth - (tlWidth - tgWidth) / 2 - scrollBarWidth <=
      tgWidth + tgLeft
    ) {
      // 向右贴边偏移
      arLeft =
        tgLeft -
        (window.innerWidth - (tlWidth - tgWidth) / 2 - tgWidth) +
        (tlWidth - arWidth) / 2 +
        scrollBarWidth;
      arLeft = arLeft > tlWidth - 20 ? tlWidth - 20 : arLeft;
      tlLeft = window.innerWidth - tlWidth + scrollLeft - scrollBarWidth;
      if (tgLeft > window.innerWidth - 30 - scrollBarWidth) {
        tlLeft = tgOffsetLeft - tlWidth + 30;
      }
    } else {
      tlLeft += (tgWidth - tlWidth) / 2;
      arLeft = (tlWidth - arWidth) / 2;
    }
  } else if (placement === "topLeft" || placement === "bottomLeft") {
    if (tgLeft < 0) {
      // 向左贴边偏移
      tlLeft = scrollLeft;
      if (scrollLeft - (tgOffsetLeft + tgWidth - 30) > 0) {
        tlLeft = tgOffsetLeft + tgWidth - 30;
      }
      arLeft = arWidth + 6;
    } else if (
      window.innerWidth - (tlWidth - tgWidth) - scrollBarWidth <=
      tgWidth + tgLeft
    ) {
      // 向右贴边偏移
      tlLeft = window.innerWidth - tlWidth + scrollLeft - scrollBarWidth;
      if (tgLeft > window.innerWidth - 30 - scrollBarWidth) {
        tlLeft = tgOffsetLeft - tlWidth + 30;
      }
      arLeft =
        tgLeft -
        (window.innerWidth - (tlWidth - tgWidth) - tgWidth) +
        scrollBarWidth +
        arWidth +
        6;
      arLeft = arLeft > tlWidth - 20 ? tlWidth - 20 : arLeft;
    } else {
      arLeft = arWidth + 6;
    }
  } else if (placement === "topRight" || placement === "bottomRight") {
    tlLeft += tgWidth - tlWidth;
    arLeft = tlWidth - 2 * arWidth - 6;
    if (tgLeft < tlWidth - tgWidth) {
      // 向左贴边偏移
      arLeft = tgWidth - arWidth - 12 - (scrollLeft - tgOffsetLeft);
      arLeft = arLeft < 10 ? 10 : arLeft;
      tlLeft = scrollLeft;
      if (scrollLeft - (tgOffsetLeft + tgWidth - 30) > 0) {
        tlLeft = tgOffsetLeft + tgWidth - 30;
      }
    } else if (window.innerWidth - scrollBarWidth <= tgWidth + tgLeft) {
      // 向右贴边偏移
      tlLeft = window.innerWidth - tlWidth + scrollLeft - scrollBarWidth;
      if (tgLeft > window.innerWidth - 30 - scrollBarWidth) {
        tlLeft = tgOffsetLeft - tlWidth + 30;
      }
    }
  } else if (placement === "left" || placement === "right") {
    if (tgTop < (tlHeight - tgHeight) / 2) {
      // 向上贴边偏移
      arTop = (tgHeight - arWidth) / 2 - (scrollTop - tgOffsetTop);
      arTop = arTop < 10 ? 10 : arTop;
      tlTop = scrollTop;
      if (scrollTop - (tgOffsetTop + tgHeight - 30) > 0) {
        tlTop = tgOffsetTop + tgHeight - 30;
      }
    } else if (
      window.innerHeight - (tlHeight - tgHeight) / 2 - scrollBarHeight <=
      tgHeight + tgTop
    ) {
      // 向下贴边偏移
      arTop =
        tgTop -
        (window.innerHeight - (tlHeight - tgHeight) / 2 - tgHeight) +
        (tlHeight - arWidth) / 2 +
        scrollBarHeight;
      arTop = arTop > tlHeight - 20 ? tlHeight - 20 : arTop;
      tlTop = window.innerHeight - tlHeight + scrollTop - scrollBarHeight;
      if (tgTop > window.innerHeight - 30 - scrollBarHeight) {
        tlTop = tgOffsetTop - tlHeight + 30;
      }
    } else {
      tlTop += (tgHeight - tlHeight) / 2;
      arTop = (tlHeight - arWidth) / 2;
    }
  } else if (placement === "leftTop" || placement === "rightTop") {
    arTop = 12;
    if (tgTop < 0) {
      // 向左贴边偏移
      tlTop = scrollTop;
      if (tgHeight - (-tgTop + 30) < 0) {
        tlTop = tgOffsetTop + tgHeight - 30;
      }
    } else if (
      window.innerHeight - (tlHeight - tgHeight) - scrollBarHeight <=
      tgHeight + tgTop
    ) {
      // 向下贴边偏移
      tlTop = window.innerHeight - tlHeight + scrollTop - scrollBarHeight;
      if (tgTop > window.innerHeight - 30 - scrollBarHeight) {
        tlTop = tgOffsetTop - tlHeight + 30;
      }
      arTop =
        tgTop -
        (window.innerHeight - (tlHeight - tgHeight) - tgHeight) +
        scrollBarHeight +
        arWidth +
        6;
      arTop = arTop > tlHeight - 20 ? tlHeight - 20 : arTop;
    }
  } else if (placement === "leftBottom" || placement === "rightBottom") {
    tlTop += tgHeight - tlHeight;
    arTop = tlHeight - arHeight - 12;
    if (tgTop < tlHeight - tgHeight) {
      // 向上贴边偏移
      arTop = tgHeight - arWidth - 12 - (scrollTop - tgOffsetTop);
      arTop = arTop < 10 ? 10 : arTop;
      tlTop = scrollTop;
      if (scrollTop - (tgOffsetTop + tgHeight - 30) > 0) {
        tlTop = tgOffsetTop + tgHeight - 30;
      }
    } else if (window.innerHeight - scrollBarHeight <= tgHeight + tgTop) {
      // 向下贴边偏移
      tlTop = window.innerHeight - tlHeight + scrollTop - scrollBarHeight;
      if (tgTop > window.innerHeight - 30 - scrollBarHeight) {
        tlTop = tgOffsetTop - tlHeight + 30;
      }
    }
  }

  tooltip.style.transformOrigin = transfromOriginList[placement];

  tooltip.style.top = `${tlTop}px`;
  tooltip.style.left = `${tlLeft}px`;
  if (arrow) {
    arrow.style.top = `${arTop}px`;
    arrow.style.left = `${arLeft}px`;
  }
};

export const handlePlacement = (
  placement: TooltipPlacement,
  tooltip: HTMLDivElement,
  { height, width }: { height: number; width: number }
): TooltipPlacement | null => {
  const {
    y: tlTops,
    x: tlLefts,
    bottom: tlBottoms,
    right: tlRights,
    width: tlWidth,
    height: tlHeight,
  } = tooltip.getBoundingClientRect();

  const { scrollBarWidth, scrollBarHeight } = scrollBarWidthOrHeight();

  // 当前方向空间不足且反方向有足够空间时，将弹窗位置更新为反方向
  if (
    tlTops <= 0 &&
    placement.startsWith("top") &&
    window.innerHeight > tlHeight * 2 + height + 20
  ) {
    return placement.replace("top", "bottom") as TooltipPlacement;
  } else if (
    tlBottoms >= window.innerHeight - scrollBarHeight &&
    placement.startsWith("bottom") &&
    window.innerHeight > tlHeight * 2 + height + 20
  ) {
    return placement.replace("bottom", "top") as TooltipPlacement;
  } else if (
    tlLefts <= 0 &&
    placement.startsWith("left") &&
    window.innerWidth > tlWidth * 2 + width + 20
  ) {
    return placement.replace("left", "right") as TooltipPlacement;
  } else if (
    tlRights >= window.innerWidth - scrollBarWidth &&
    placement.startsWith("right") &&
    window.innerWidth > tlWidth * 2 + width + 20
  ) {
    return placement.replace("right", "left") as TooltipPlacement;
  }

  return null;
};

// 触发类型
export type trigger = `hover` | `focus` | `click` | `contextMenu`;

// 处理触发事件
export const triggerHandler = (
  trigger: trigger,
  visiable: Function,
  hidden: Function
) => {
  switch (trigger) {
    case "hover":
      return {
        onPointerEnter: visiable,
        onPointerLeave: hidden,
      };
    case "focus":
      return {
        onFocus: visiable,
        onBlur: hidden,
      };
    case "click":
      return {
        onClick: visiable,
      };
    case "contextMenu":
      return {
        onPointerEnter: visiable,
        onPointerLeave: hidden,
      };
  }
};
