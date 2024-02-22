import "./index.scss";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  TabBarGutterStyle,
  editableHeight,
  handleTabBarExtraContent,
  isVertical,
  setLineStyle,
} from "./TabsHelper";

// 标签类型
export type tabItemType = {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
};

// 附加内容类型
export type tabBarExtraContentType = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

// 编辑模式下操作类型
type actionType = "add" | "remove";

// 标签页基础属性
export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: tabItemType[];
  onChange?: (key: string) => void;
  center?: boolean;
  defaultActiveKey?: string;
  indicator?: {
    size?: number | ((origin: number) => number);
    align: "start" | "center" | "end";
  };
  tabBarExtraContent?: React.ReactNode | tabBarExtraContentType;
  size?: SizeType;
  TabPosition?: PositionType;
  type?: "line" | "card" | "editable-card";
  activeKey?: string;
  addIcon?: React.ReactNode;
  hideAdd?: boolean;
  onEdit?: (
    e: React.MouseEvent | React.KeyboardEvent | string,
    action: actionType
  ) => void;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  tabBarGutter?: number;
  onTabScroll?: (direction: PositionType) => void;
  tabBarStyle?: React.CSSProperties;
  destroyInactiveTabPane?: boolean;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (props: TabsProps, ref) => {
    const {
      items = [],
      onChange,
      center,
      defaultActiveKey = items[0]?.key || "",
      indicator,
      tabBarExtraContent,
      size = "middle",
      TabPosition = "top",
      type = "line",
      activeKey = defaultActiveKey,
      addIcon,
      hideAdd,
      onEdit,
      onTabClick,
      tabBarGutter,
      onTabScroll,
      tabBarStyle,
      destroyInactiveTabPane,
      className,
      ...rest
    } = props;

    // 当前选中的tab
    const [currentKey, setCurrentKey] = useState(defaultActiveKey);
    // tab列表
    const TabsRefs = useRef<HTMLDivElement[]>([]);
    // tab下方指示条
    const lineRef = useRef<HTMLDivElement>(null);
    // 导航栏
    const scrollListRef = useRef<HTMLDivElement>(null);
    // 滚动阴影显示
    const [scrollStart, setScrollStart] = useState(false);
    const [scrollEnd, setScrollEnd] = useState(false);
    // 处理后的附加内容
    const tabBarExtra = useMemo(
      () => handleTabBarExtraContent(tabBarExtraContent),
      [tabBarExtraContent]
    );
    //  可编辑卡片
    const newtype = type == "editable-card" ? "card" : type;

    // 受外部控制切换标签
    useEffect(() => {
      const index = items.findIndex((item) => item.key == activeKey);
      handleClickTabs(items[index], index);
    }, [activeKey]);

    //点击tab列表
    const handleClickTabs = (item: tabItemType, index: number) => {
      if (item.disabled) return;
      setCurrentKey(item.key);
      setLineStyle(
        lineRef.current!,
        TabsRefs.current[index],
        indicator,
        TabPosition
      );
      onChange && onChange(item.key);
    };

    // 指示条位置调整
    useEffect(() => {
      const index = items.findIndex((item) => item.key == currentKey);
      setLineStyle(
        lineRef.current!,
        TabsRefs.current[index],
        indicator,
        TabPosition
      );
    }, [indicator?.align, TabPosition]);

    // 处理导航栏溢出滚动阴影
    const handleNavScroll = () => {
      const target = scrollListRef.current!;

      const scrollStart = isVertical(TabPosition)
        ? target.scrollLeft
        : target.scrollTop;
      const dis = isVertical(TabPosition)
        ? target.offsetWidth
        : target.offsetHeight;
      const scrollDis = isVertical(TabPosition)
        ? target.scrollWidth
        : target.scrollHeight;

      if (scrollStart == 0) {
        setScrollStart(false);
      } else {
        setScrollStart(true);
      }

      if (Math.abs(scrollStart + dis - scrollDis) < 0.6) {
        setScrollEnd(false);
      } else {
        setScrollEnd(true);
      }
    };

    useEffect(() => {
      handleNavScroll();
    }, []);

    // 处理自定义编辑事件
    const handleEdit = (
      e: React.MouseEvent | React.KeyboardEvent | string,
      action: actionType
    ) => {
      onEdit && onEdit(e, action);
      setTimeout(() => {
        handleNavScroll();
      });
    };

    return (
      <div
        ref={ref}
        className={classNames(
          "versa-tabs",
          `versa-tabs-${TabPosition}`,
          className
        )}
        key={TabPosition}
        {...rest}
      >
        <div className="versa-tabs-nav" style={tabBarStyle}>
          {tabBarExtra.left && (
            <div className="versa-tabs-nav-extra-left">{tabBarExtra.left}</div>
          )}
          <div
            className={classNames("versa-tabs-nav-scroll", {
              "versa-tabs-scroll-start": scrollStart,
              "versa-tabs-scroll-end": scrollEnd,
            })}
          >
            <div
              className={classNames("versa-tabs-nav-list", {
                "versa-tabs-nav-center": center,
              })}
              ref={scrollListRef}
              onScroll={() => {
                onTabScroll && onTabScroll(TabPosition);
                handleNavScroll();
              }}
            >
              <div className="versa-tabs-nav-list_inner">
                {items.map((item, index) => (
                  <div
                    ref={(el) => {
                      if (el) {
                        TabsRefs.current[index] = el;
                      }
                    }}
                    className={classNames(
                      "versa-tabs-tab",
                      `versa-tabs-tab-${size}`,
                      `versa-tabs-tab-${newtype}`,
                      {
                        "versa-tabs-tab-active": currentKey == item.key,
                        "versa-tabs-tab-disable": item.disabled,
                      }
                    )}
                    onClick={(e) => {
                      onTabClick && onTabClick(item.key, e);
                      handleClickTabs(item, index);
                    }}
                    key={item.key}
                    style={
                      index != 0
                        ? TabBarGutterStyle(TabPosition, tabBarGutter)
                        : {}
                    }
                  >
                    {item.icon && (
                      <span className="versa-tabs-icon">{item.icon}</span>
                    )}
                    {item.label}
                    {((type == "editable-card" &&
                      typeof item.closable === "undefined") ||
                      item.closable) && (
                      <span
                        className="versa-tabs-closable"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item.key, "remove");
                        }}
                      >
                        {item.closeIcon ?? <CloseOutlined />}
                      </span>
                    )}
                  </div>
                ))}
                <div
                  className="versa-tabs-line"
                  style={{ display: newtype == "card" ? "none" : "" }}
                  ref={lineRef}
                ></div>
              </div>
            </div>
          </div>
          {tabBarExtra.right && (
            <div className="versa-tabs-nav-extra-right">
              {tabBarExtra.right}
            </div>
          )}
          {!hideAdd && type == "editable-card" && (
            <div
              className="versa-tabs-nav-editable"
              onClick={(e) => handleEdit(e, "add")}
              style={editableHeight(TabPosition, size)}
            >
              {addIcon ?? <PlusOutlined />}
            </div>
          )}
        </div>
        <div className="versa-tabs-conent">
          {destroyInactiveTabPane && (
            <div
              className={classNames(
                "versa-tabs-tabpane",
                "versa-tabs-tabpane-active"
              )}
            >
              {items.find((item) => currentKey == item.key)?.children}
            </div>
          )}
          {!destroyInactiveTabPane &&
            items.map((item) => (
              <div
                className={classNames("versa-tabs-tabpane", {
                  "versa-tabs-tabpane-active": currentKey == item.key,
                })}
                key={item.key}
              >
                {item.children}
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default Tabs;
