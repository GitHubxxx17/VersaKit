import { CaretDownOutlined, CheckOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";
import { FlatTreeDataNode, mapKeyType } from ".";
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
      className,
      ...rest
    } = props;

    return (
      <div
        className={classNames("versa-tree-treeNode", className, {
          "versa-tree-treeNode-disabled": node.disabled,
        })}
        key={node.key}
        ref={ref}
        {...rest}
      >
        {node.indent !== 0 && (
          <div className="versa-tree-indent">
            {Array.from({
              length: node.indent,
            }).map((_, index) => {
              return <span key={index}></span>;
            })}
          </div>
        )}
        <div
          className={classNames("versa-tree-switcher", {
            "versa-tree-switcher-noop": node.children.length == 0,
          })}
          onClick={(e) => {
            if (node.children.length == 0) return;
            handleClickSwitcher(node, nodeKey, e);
          }}
        >
          {node.children.length !== 0 && (
            <CaretDownOutlined
              className={classNames("versa-tree-switcher-inner", {
                "versa-tree-switcher-inner-rotate": !node.expand,
              })}
            />
          )}
        </div>
        {checkable && (
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
        <div
          className={classNames("versa-tree-title", {
            "versa-tree-title-selected": !node.disabled && node.selected,
          })}
          onClick={(e) => handleSelected(node, nodeKey, e)}
        >
          {node.title}
        </div>
      </div>
    );
  }
);

export default React.memo(TreeNode);
