import { isBoolean, isValidReactNode } from "@/utils";
import {
  CaretDownOutlined,
  CheckOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  HolderOutlined,
  LoadingOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { DragXType, FlatTreeDataNode, TreeDataNode, mapKeyType } from ".";
import "./index.scss";

// 基础属性
export interface TreeNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  node: FlatTreeDataNode;
  nodeKey: mapKeyType;
  handleClickSwitcher: (
    node: FlatTreeDataNode,
    nodeKey: mapKeyType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleClickCheck: (
    node: FlatTreeDataNode,
    nodeKey: mapKeyType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleSelected: (
    node: FlatTreeDataNode,
    nodeKey: mapKeyType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  checkable: boolean;
  blockNode: boolean;
  showLine: boolean;
  switcherIcon: React.ReactNode;
  isLast: boolean;
  parentIsLast: boolean[];
  showIcon: boolean;
  loadData?: ({
    key,
    children,
  }: {
    key: string;
    children?: TreeDataNode[];
  }) => Promise<void>;
  directory?: boolean;
  draggable?: boolean;
  dragTargetKey: undefined | mapKeyType;
  setDragTargetKey: (
    isCurrNode: boolean,
    key: undefined | mapKeyType,
    parent?: mapKeyType
  ) => void;
  isFirst: boolean;
  setDragInit: (key: mapKeyType, start: number) => void;
  handleDragDrop: () => void;
  handleDragX: (end: number, isLast: boolean) => void;
  dragX: DragXType;
}

const TreeNode = React.forwardRef<HTMLDivElement, TreeNodeProps>(
  (props, ref) => {
    const {
      node,
      nodeKey,
      handleClickSwitcher,
      handleClickCheck,
      handleSelected,
      checkable,
      blockNode,
      showLine,
      switcherIcon,
      isLast,
      parentIsLast,
      showIcon,
      loadData,
      directory,
      draggable,
      className,
      dragTargetKey,
      setDragTargetKey,
      isFirst,
      setDragInit,
      handleDragDrop,
      handleDragX,
      dragX,
      ...rest
    } = props;

    // 拖拽相关数据
    const [dragState, setDragState] = useState({
      dragging: false, //正在拖拽
      dragOver: false, //被拖拽节点进入当前节点区域
      dragTop: false, //被拖拽节点进入第一个节点上方区域
    });

    // 是否离开当前节点
    const [leaveFlag, setLeaveFlag] = useState(false);

    // 当前节点拖拽开始
    const dragstart = useCallback((e: React.DragEvent) => {
      setDragInit(nodeKey, e.clientX);
      node.expand = false;
      setDragState((pre) => {
        return {
          ...pre,
          dragTop: false,
          dragging: true,
        };
      });
    }, []);

    // 当前节点拖拽结束
    const dragEnd = useCallback(() => {
      setDragState((pre) => {
        return {
          ...pre,
          dragTop: false,
          dragging: false,
        };
      });
      setDragTargetKey(true, undefined);
    }, [setDragTargetKey]);

    // 被拖拽节点进入当前节点区域
    const dragOver = useCallback(
      (e: React.DragEvent) => {
        const target = e.currentTarget as HTMLDivElement;
        const { offsetHeight, offsetTop } = target;
        let isLastInner = isLast;
        // 拖拽节点进入当前节点的下半部分
        if (e.pageY - offsetTop > (offsetHeight - 4) >> 1) {
          setDragTargetKey(true, nodeKey, node.parent!);
        } else {
          // 拖拽节点进入当前节点的上半部分
          setDragTargetKey(false, nodeKey, node.parent!);
          isLastInner = false;
        }
        handleDragX(e.clientX, isLastInner);
        e.preventDefault();
      },
      [setDragTargetKey, dragTargetKey]
    );

    // 当拖拽节点离开或者进入的目标节点改变后进行切换
    useLayoutEffect(() => {
      if (typeof dragTargetKey == "symbol" && isFirst) {
        setDragState((pre) => {
          return { ...pre, dragTop: true, dragOver: false };
        });
      } else {
        setDragState((pre) => {
          return {
            ...pre,
            dragTop: false,
            dragOver: dragTargetKey == nodeKey,
          };
        });
      }
    }, [dragTargetKey, leaveFlag]);

    // 被拖拽节点离开当前节点区域
    const dragLeave = useCallback(() => {
      setDragState((pre) => {
        return {
          ...pre,
          dragTop: false,
          dragOver: false,
        };
      });
      setLeaveFlag((pre) => !pre);
    }, []);

    // 拖拽结束事件
    const dragDrop = useCallback(() => {
      handleDragDrop();
    }, [handleDragDrop]);

    // 展示连接线图标
    const showLineIcon = useCallback((expand: boolean) => {
      return expand ? <MinusSquareOutlined /> : <PlusSquareOutlined />;
    }, []);

    return (
      <div
        className={classNames("versa-tree-treeNode", className, {
          "versa-tree-treeNode-disabled": node.disabled,
          "versa-tree-directory": directory,
          "versa-tree-directory-selected": directory && node.selected,
          "versa-tree-dragging": dragState.dragging,
          "versa-tree-dragOver": dragState.dragOver,
        })}
        key={node.key}
        ref={ref}
        onClick={(e) => {
          if ((isBoolean(node.checkable) && !node.checkable) || !directory)
            return;
          handleSelected(node, nodeKey, e);
          if (
            node.children.length == 0 &&
            !(!node.isLeaf && (loadData || directory))
          )
            return;
          handleClickSwitcher(node, nodeKey, e);
        }}
        draggable={draggable}
        onDragStart={dragstart}
        onDragEnd={dragEnd}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={dragDrop}
        {...rest}
      >
        {node.indent !== 0 && (
          <div className="versa-tree-indent">
            {Array.from({
              length: node.indent,
            }).map((_, index) => {
              return (
                <span
                  key={index}
                  className={classNames("versa-tree-indent-item", {
                    "versa-tree-indent-line": parentIsLast[index] && showLine,
                  })}
                ></span>
              );
            })}
          </div>
        )}

        {draggable && (
          <div className="versa-tree-draggable">
            <span className="versa-tree-draggable-icon">
              <HolderOutlined />
            </span>
          </div>
        )}

        {node.children.length == 0 &&
        !(!node.isLeaf && (loadData || directory)) ? (
          <div className="versa-tree-indent">
            {node.isLeaf ? (
              <span className="versa-tree-indent-icon">
                <FileOutlined />
              </span>
            ) : (
              <span
                className={classNames("versa-tree-indent-item", {
                  "versa-tree-indent-endLine": showLine,
                  "versa-tree-indent-endLine-last": isLast && showLine,
                })}
              ></span>
            )}
          </div>
        ) : (
          <div
            className={classNames("versa-tree-switcher", {
              "versa-tree-switcher-noop": directory,
            })}
            onClick={(e) => {
              if (directory) return;
              handleClickSwitcher(node, nodeKey, e);
            }}
          >
            <span
              className={classNames("versa-tree-switcher-inner", {
                "versa-tree-switcher-inner-custom":
                  node.switcherIcon || (showLine && !switcherIcon),
                "versa-tree-switcher-inner-rotate":
                  !node.switcherIcon &&
                  !(showLine && !switcherIcon) &&
                  !node.expand,
                "versa-tree-switcher-loading": node.loading,
              })}
            >
              {node.loading && <LoadingOutlined />}
              {!node.loading &&
                (node.switcherIcon ??
                  switcherIcon ??
                  (showLine ? (
                    showLineIcon(node.expand)
                  ) : (
                    <CaretDownOutlined />
                  )))}
            </span>
          </div>
        )}

        {(checkable || node.checkable) && (
          <div
            className={classNames("versa-tree-checkbox", {
              "versa-tree-checkbox-disabled":
                node.disabled || node.disableCheckbox,
            })}
            onClick={(e) => handleClickCheck(node, nodeKey, e)}
          >
            <div
              className={classNames("versa-tree-checkbox_inner", {
                "versa-tree-checkbox-checked": node.checked,
                "versa-tree-checkbox-checked-nofull":
                  !node.checked && node.hasChild,
              })}
            >
              {node.checked && <CheckOutlined />}
            </div>
          </div>
        )}

        {directory ? (
          <div className={classNames("versa-tree-directory-title")}>
            {((showIcon && node.icon) || !node.isLeaf) && (
              <span className="versa-tree-icon">
                {node.icon &&
                  (isValidReactNode(node.icon)
                    ? node.icon
                    : node.icon(node.selected))}
                {!node.icon &&
                  (node.expand ? <FolderOpenOutlined /> : <FolderOutlined />)}
              </span>
            )}

            {node.title}
          </div>
        ) : (
          <div
            className={classNames("versa-tree-title", {
              "versa-tree-title-selected":
                (!node.disabled && node.selected) || dragState.dragging,
              "versa-tree-title-block": blockNode,
            })}
            onClick={(e) => {
              if (isBoolean(node.checkable) && !node.checkable) return;
              handleSelected(node, nodeKey, e);
            }}
          >
            {showIcon && node.icon && (
              <span className="versa-tree-icon">
                {isValidReactNode(node.icon)
                  ? node.icon
                  : node.icon(node.selected)}
              </span>
            )}
            {dragState.dragTop && (
              <span className="versa-tree-drop-indicator versa-tree-drop-indicator-top"></span>
            )}
            <span>{node.title}</span>
            {dragState.dragOver && (
              <span
                className="versa-tree-drop-indicator"
                style={{
                  width: `calc(100% - ${dragX.indent ? dragX.indent * -24 : 4}px)`,
                  left: `${dragX.indent ? dragX.indent * -24 : 4}px`,
                }}
              ></span>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default React.memo(TreeNode);
