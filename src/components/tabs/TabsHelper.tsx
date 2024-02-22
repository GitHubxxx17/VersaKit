import { isValidReactNode } from "@/utils";
import { TabsProps, tabBarExtraContentType } from ".";

// 设置指示条的样式
export const setLineStyle = (
  line: HTMLDivElement,
  tab: HTMLDivElement,
  indicator: TabsProps["indicator"],
  tabPosition: TabsProps["TabPosition"]
) => {
  if (isVertical(tabPosition)) {
    let width = indicator?.size
      ? typeof indicator?.size === "number"
        ? indicator?.size
        : indicator?.size(tab.offsetWidth)
      : tab.offsetWidth;

    if (indicator?.align == "center") {
      line.style.left = `${tab.offsetLeft + (tab.offsetWidth - width) / 2}px`;
    } else if (indicator?.align == "end") {
      line.style.left = `${tab.offsetLeft + tab.offsetWidth - width}px`;
    } else {
      line.style.left = `${tab.offsetLeft}px`;
    }
    if (tabPosition == "top") {
      line.style.top = "";
    } else {
      line.style.bottom = "";
    }

    line.style.height = "2px";
    line.style.width = `${width}px`;
  } else {
    let height = indicator?.size
      ? typeof indicator?.size === "number"
        ? indicator?.size
        : indicator?.size(tab.offsetHeight)
      : tab.offsetHeight;

    if (indicator?.align == "center") {
      line.style.top = `${tab.offsetTop + (tab.offsetHeight - height) / 2}px`;
    } else if (indicator?.align == "end") {
      line.style.top = `${tab.offsetTop + tab.offsetHeight - height}px`;
    } else {
      line.style.top = `${tab.offsetTop}px`;
    }
    if (tabPosition == "left") {
      line.style.left = "";
    } else {
      line.style.right = "";
    }
    line.style.width = "2px";
    line.style.height = `${height}px`;
  }
};

// 处理附加内容
export const handleTabBarExtraContent = (
  tabBarExtraContent: TabsProps["tabBarExtraContent"]
): tabBarExtraContentType => {
  if (isValidReactNode(tabBarExtraContent)) {
    return {
      right: tabBarExtraContent,
    };
  } else {
    return tabBarExtraContent;
  }
};

// 处理坐标方向
export const isVertical = (tabPosition: TabsProps["TabPosition"]) => {
  if (tabPosition == "top" || tabPosition == "bottom") return true;
  return false;
};

// 调整标签间隙
export const TabBarGutterStyle = (
  tabPosition: TabsProps["TabPosition"],
  tabBarGutter: number | undefined
): React.CSSProperties => {
  if (!tabBarGutter) return {};
  if (isVertical(tabPosition)) {
    return {
      marginLeft: tabBarGutter,
    };
  } else {
    return {
      marginTop: tabBarGutter,
    };
  }
};

// 调整编辑区域高度
export const editableHeight = (
  tabPosition: TabsProps["TabPosition"],
  size: TabsProps["size"]
): React.CSSProperties => {
  if (size == "small") {
    if (isVertical(tabPosition)) {
      return {
        padding: "10px 0",
      };
    } else {
      return {
        height: "34px",
      };
    }
  }

  return {};
};
