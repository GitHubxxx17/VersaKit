import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Transition from "./Transition";
import TreeNode from "./TreeNode";
import "./index.scss";

// 树节点类型
export type TreeDataNode = {
  title: React.ReactNode;
  key: string;
  children?: TreeDataNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  switch?: boolean;
};

// 哈希树节点类型
export type FlatTreeDataNode = Partial<Omit<TreeDataNode, "children">> & {
  children: string[];
  indent: number;
  checked: boolean;
  checkNum: number;
  parent?: mapKeyType;
};

// 哈希树键类型
export type mapKeyType = string | symbol;

// 基础属性
export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  treeData?: TreeDataNode[];
}
// 动画执行时间
export const animateTime = 300;

const Tree = React.forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const { children, treeData, className, ...rest } = props;
  // 处理后的哈希树数据
  const [flatTreeData, setFlatTreeData] = useState<
    Map<mapKeyType, FlatTreeDataNode>
  >(new Map());
  // 根节点键值
  const mapKeyRef = useRef(Symbol("treeKey"));
  // 展开隐藏定时器
  let switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 点击展开隐藏节点
  const handleClickSwitcher = (node: FlatTreeDataNode, key: mapKeyType) => {
    if (!("switch" in node)) return;
    if (switchTimerRef.current) return;
    node.switch = !node.switch;
    flatTreeData.set(key, node);
    setFlatTreeData(new Map(flatTreeData));
    switchTimerRef.current = setTimeout(() => {
      switchTimerRef.current = null;
    }, animateTime);
  };

  // 点击勾选或取消勾选
  const handleClickCheck = useCallback(
    (node: FlatTreeDataNode, key: mapKeyType) => {
      if (node.disabled || node.disableCheckbox) return;
      let { checked, parent, children } = node;
      // 向上遍历，将父节点进行勾选或取消勾选
      const upward = (key: mapKeyType) => {
        let tNode = flatTreeData.get(key)!;
        tNode.checkNum += checked ? -1 : 1;
        if (tNode.checkNum == 0 && tNode.checked) {
          tNode.checked = false;
          flatTreeData.set(key, tNode);
        } else if (tNode.checkNum > 0 && !tNode.checked) {
          tNode.checked = true;
          flatTreeData.set(key, tNode);
        } else {
          return;
        }
        if (tNode?.parent) upward(tNode?.parent);
      };
      upward(parent!);
      // 向下遍历，将子节点全部勾选或取消勾选
      const downward = (children: string[]) => {
        for (let key of children) {
          let tNode = flatTreeData.get(key)!;
          tNode.checked = !checked;
          tNode.checkNum = !checked ? tNode.children.length : 0;
          flatTreeData.set(key, tNode);
          if (tNode.children.length) downward(tNode.children);
        }
      };
      downward(children);
      node.checked = !checked;
      node.checkNum = !checked ? children.length : 0;
      flatTreeData.set(key, node);
      setFlatTreeData(new Map(flatTreeData));
    },
    [flatTreeData]
  );

  // 对树进行扁平化处理
  const handleTreeData = useCallback(
    (
      treeData: TreeDataNode[] = [],
      flatList: Map<mapKeyType, FlatTreeDataNode> = new Map(),
      indent: number = 0,
      parent: mapKeyType = mapKeyRef.current
    ) => {
      const childKey: FlatTreeDataNode["children"] = [];
      for (let item of treeData) {
        childKey.push(item.key);
        let childTree = handleTreeData(
          item.children,
          flatList,
          indent + 1,
          item.key
        );
        flatList.set(item.key, {
          ...item,
          children: childTree.childKey,
          indent,
          checked: false,
          checkNum: 0,
          parent,
          switch: item.switch ?? true,
        });
      }
      return {
        flatList,
        childKey,
      };
    },
    []
  );

  // 初始化数据
  useEffect(() => {
    const { flatList, childKey } = handleTreeData(treeData);
    flatList.set(mapKeyRef.current, {
      children: childKey,
      indent: -1,
      checked: false,
      checkNum: 0,
    });

    setFlatTreeData(flatList);

    () => {
      switchTimerRef.current && clearTimeout(switchTimerRef.current);
    };
  }, []);

  // 遍历哈希树构建子节点
  const getTreeNode = useCallback(
    (key: mapKeyType): React.ReactNode => {
      if (!flatTreeData.has(key)) return;
      const node = flatTreeData.get(key)!;
      return (
        <React.Fragment key={node.key}>
          {/* 如果是根节点则不需要渲染当前节点，直接渲染子节点 */}
          {key !== mapKeyRef.current && (
            <>
              <TreeNode
                node={node}
                nodeKey={key}
                handleClickSwitcher={handleClickSwitcher}
                handleClickCheck={handleClickCheck}
              ></TreeNode>
              {node.children.length !== 0 && (
                <Transition
                  trgger={!node.switch}
                  node={node}
                  flatTreeData={flatTreeData}
                >
                  {node.children.map((childKey) => getTreeNode(childKey))}
                </Transition>
              )}
            </>
          )}

          {key == mapKeyRef.current &&
            node.children.map((childKey) => getTreeNode(childKey))}
        </React.Fragment>
      );
    },
    [flatTreeData]
  );

  return (
    <div className={classNames("versa-tree", className)} ref={ref} {...rest}>
      {getTreeNode(mapKeyRef.current)}
    </div>
  );
});

export default Tree;
