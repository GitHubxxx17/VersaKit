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

// 设置tooltip位置
export const getPos = (
  place: TooltipPlacement,
  trigger: HTMLDivElement,
  tooltip: HTMLDivElement,
  arrow: HTMLDivElement
) => {
  const {
    top: tgTop,
    left: tgLeft,
    width: tgWidth,
    height: tgHeight,
  } = trigger.getBoundingClientRect();

  const tlWidth = tooltip.offsetWidth;
  const tlHeight = tooltip.offsetHeight;
  const arWidth = arrow?.offsetWidth;
  const arHeight = arrow?.offsetHeight;

  const scrollTop = document.documentElement.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft;

  let tlTop = tgTop + scrollTop,
    tlLeft = tgLeft + scrollLeft,
    arTop = 0,
    arLeft = 0;

  let hasArrowPos = arrow ? 10 : 5;

  if (["top", "topLeft", "topRight"].includes(place)) {
    tlTop -= tlHeight + hasArrowPos;
    arTop = tlHeight - arHeight / 2 - 1;
  }

  if (["left", "leftTop", "leftBottom"].includes(place)) {
    tlLeft -= tlWidth + hasArrowPos;
    arLeft = tlWidth - arWidth / 2 - 1;
  }

  if (["right", "rightTop", "rightBottom"].includes(place)) {
    tlLeft += tgWidth + hasArrowPos;
    arLeft = -arWidth / 2 + 1;
  }

  if (["bottom", "bottomLeft", "bottomRight"].includes(place)) {
    tlTop += tgHeight + hasArrowPos;
    arTop = -arHeight / 2 + 1;
  }

  if (place === "top" || place === "bottom") {
    tlLeft += (tgWidth - tlWidth) / 2;

    arLeft = (tlWidth - arWidth) / 2;
  } else if (place === "topLeft" || place === "bottomLeft") {
    arLeft = arWidth + 6;
  } else if (place === "topRight" || place === "bottomRight") {
    tlLeft += tgWidth - tlWidth;
    arLeft = tlWidth - 2 * arWidth - 6;
  } else if (place === "left" || place === "right") {
    tlTop += (tgHeight - tlHeight) / 2;
    arTop = (tlHeight - arHeight) / 2;
  } else if (place === "leftTop" || place === "rightTop") {
    arTop = 12;
  } else if (place === "leftBottom" || place === "rightBottom") {
    tlTop += tgHeight - tlHeight;
    arTop = tlHeight - arHeight - 12;
  }

  tooltip.style.transformOrigin = transfromOriginList[place];

  tooltip.style.top = `${tlTop}px`;
  tooltip.style.left = `${tlLeft}px`;
  if (arrow) {
    arrow.style.top = `${arTop}px`;
    arrow.style.left = `${arLeft}px`;
  }
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
