import { isBoolean, isValidReactNode } from "@/utils";
import {
  CaretDownOutlined,
  CheckOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  LoadingOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import React, { useCallback } from "react";
import { FlatTreeDataNode, TreeDataNode, mapKeyType } from ".";
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
      className,
      ...rest
    } = props;

    const showLineIcon = useCallback((expand: boolean) => {
      return expand ? <MinusSquareOutlined /> : <PlusSquareOutlined />;
    }, []);

    return (
      <div
        className={classNames("versa-tree-treeNode", className, {
          "versa-tree-treeNode-disabled": node.disabled,
          "versa-tree-directory": directory,
          "versa-tree-directory-selected": directory && node.selected,
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
            {((showIcon && node.icon) || (directory && !node.isLeaf)) && (
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
              "versa-tree-title-selected": !node.disabled && node.selected,
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
            {node.title}
          </div>
        )}
      </div>
    );
  }
);

export default React.memo(TreeNode);
