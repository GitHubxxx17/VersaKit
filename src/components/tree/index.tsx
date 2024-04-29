import { isString } from "@/utils";
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
  icon?: React.ReactNode | ((selected: boolean) => React.ReactNode);
  switcherIcon?: React.ReactNode;
  isLeaf?: boolean;
  checkable?: boolean;
  selectable?: boolean;
};

// 哈希树节点类型
export type FlatTreeDataNode = Partial<Omit<TreeDataNode, "children">> & {
  children: string[];
  indent: number;
  checked: boolean;
  checkNum: number;
  parent?: mapKeyType;
  expand: boolean;
  selected: boolean;
  hasChild: boolean;
  loading?: boolean;
};

// 拖拽x轴的数据结构
export type DragXType = {
  /* 缩进 */
  indent: number;
  /* x轴起点 */
  start: number;
  /* 是否是末尾节点 */
  isLast: boolean;
};

// 哈希树键类型
export type mapKeyType = string | symbol;

// 事件类型
export type TreeEventType = {
  event: "select" | "check" | "expand";
  nativeEvent: React.MouseEvent<HTMLDivElement, MouseEvent>;
  node: FlatTreeDataNode;
  selected?: boolean;
  selectedNodes?: TreeDataNode;
  checked?: boolean;
  checkedNodes?: TreeDataNode;
  expand?: boolean;
  expandNodes?: TreeDataNode;
};

// 基础属性
export interface TreeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  children?: React.ReactNode;
  treeData?: TreeDataNode[];
  checkable?: boolean;
  defaultExpandedKeys?: string[];
  defaultSelectedKey?: string;
  defaultCheckedKeys?: string[];
  defaultExpandAll?: boolean;
  onSelect?: (selectedKey: string, info: TreeEventType) => void;
  onCheck?: (checkedKey: string[], info: TreeEventType) => void;
  onExpand?: (checkedKey: string[], info: TreeEventType) => void;
  expandedKeys?: string[];
  checkedKeys?: string[];
  selectedKey?: string;
  autoExpandParent?: boolean;
  blockNode?: boolean;
  showLine?: boolean;
  switcherIcon?: React.ReactNode;
  showIcon?: boolean;
  loadData?: ({
    key,
    children,
  }: {
    key: string;
    children?: TreeDataNode[];
  }) => Promise<void>;
  directory?: boolean;
  draggable?: boolean;
}
// 动画执行时间
export const animateTime = 300;

const getString = (str: any) => {
  return isString(str) ? str : "";
};

const Tree = React.forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const {
    children,
    treeData,
    checkable = false,
    defaultExpandedKeys = [],
    defaultSelectedKey = "",
    defaultCheckedKeys = [],
    defaultExpandAll = false,
    onSelect,
    onCheck,
    onExpand,
    expandedKeys,
    checkedKeys,
    selectedKey,
    autoExpandParent = true,
    blockNode = false,
    showLine = false,
    switcherIcon,
    showIcon = false,
    loadData,
    directory = false,
    draggable = false,
    className,
    ...rest
  } = props;
  // 处理前的树
  const [originTreeData, setOriginTreeData] = useState<
    Map<string, TreeDataNode>
  >(new Map());
  // 处理后的哈希树数据
  const [flatTreeData, setFlatTreeData] = useState<
    Map<mapKeyType, FlatTreeDataNode>
  >(new Map());
  // 根节点键值
  const mapKeyRef = useRef(Symbol("treeKey"));
  // 展开隐藏定时器
  let switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 当前选中的key
  const [currSelectedkey, setCurrselectedKey] =
    useState<mapKeyType>(defaultSelectedKey);
  // 当前勾选的key
  const checkedKeySet = useRef<Set<string>>(new Set());
  // 当前展开的key
  const expandKeySet = useRef<Set<string>>(new Set());
  // 拖拽节点的key
  const [dragKey, setDragKey] = useState<undefined | mapKeyType>();
  // 拖拽节点进入的目标的key
  const [dragTargetKey, setDragTargetKey] = useState<undefined | mapKeyType>();
  // 拖拽x轴位置
  const [dragX, setDragX] = useState<DragXType>({
    start: 0,
    indent: 0,
    isLast: false,
  });

  // 找到前一个节点的key
  const findPreKey = useCallback(
    (parentNode: FlatTreeDataNode, index: number) => {
      let preKey = parentNode?.children.find((_, i) => i == index - 1);
      let preNode = flatTreeData.get(preKey as mapKeyType);
      if (preNode?.expand && preNode.children.length) {
        return findPreKey(preNode, preNode.children.length);
      } else {
        return preKey;
      }
    },
    [flatTreeData]
  );

  // 处理拖拽节点进入的目标的key
  const handleSetDragTargetKey = useCallback(
    (isCurrNode: boolean, key: mapKeyType | undefined, parent?: mapKeyType) => {
      if (isCurrNode) {
        setDragTargetKey(key);
      } else {
        let parentNode = flatTreeData.get(parent!)!;
        let index = parentNode?.children.indexOf(getString(key));

        if (index < -1) {
          return console.error("Tree：找不到相关key");
        }
        if (index > 0) {
          setDragTargetKey(findPreKey(parentNode, index));
        } else {
          setDragTargetKey(parent);
        }
      }
    },
    [flatTreeData]
  );

  // 处理当前拖拽的节点
  const handleDragInit = useCallback((key: mapKeyType, start: number) => {
    setDragKey(key);
    setDragX({ start, indent: 0, isLast: false });
  }, []);

  // 处理子节点的缩进
  const handleChildIndent = useCallback(
    (children: string[], indent: number) => {
      for (let key of children) {
        let node = flatTreeData.get(key);
        node!.indent = indent + 1;
        if (node?.children.length) {
          handleChildIndent(node.children, indent + 1);
        }
      }
    },
    [flatTreeData]
  );

  // 处理拖拽结束事件
  const handleDragDrop = useCallback(() => {
    const dragEl = flatTreeData.get(dragKey!);
    const dragTargetEl = flatTreeData.get(dragTargetKey!);
    const dragParentKey = dragEl?.parent;
    const dragTargetParentKey = dragTargetEl?.parent;
    const dragParent = flatTreeData.get(dragParentKey!);
    const dragTargetParent = flatTreeData.get(dragTargetParentKey!);
    const preIndex = dragParent?.children.findIndex((v) => v == dragKey)!;
    const targetIndex = dragTargetParent?.children.findIndex(
      (v) => v == dragTargetKey
    )!;
    // 删除当前父节点下的拖拽节点的索引
    dragParent?.children.splice(preIndex, 1);

    // 如果目标节点有子节点并且展开时
    if (dragTargetEl?.children.length && dragTargetEl.expand) {
      dragTargetEl?.children.splice(0, 0, getString(dragKey));
    } else if (dragX.indent == -1) {
      // indent等于-1表示要插入到目标节点的内部
      dragTargetEl?.children.push(getString(dragKey));
      dragTargetEl!.expand = true;
      dragTargetEl!.hasChild = true;
    } else if (dragX.indent == 0) {
      // 如果在同一父节点内则进行排序
      if (dragParentKey == dragTargetParentKey) {
        if (preIndex > targetIndex) {
          dragTargetParent?.children.splice(
            targetIndex + 1,
            0,
            getString(dragKey)
          );
        } else {
          dragTargetParent?.children.splice(targetIndex, 0, getString(dragKey));
        }
      } else {
        // 如果在不同父节点中进行切换
        dragTargetParent?.children.splice(
          targetIndex + 1,
          0,
          getString(dragKey)
        );
      }
    } else {
      let parnet = dragTargetParent;
      let preParent = dragTargetParent;
      for (let i = dragX.indent; i > 0; i--) {
        preParent = parnet;
        parnet = flatTreeData.get(parnet?.parent!);
      }
      let preIndex = parnet?.children.findIndex((v) => v == preParent?.key)!;
      parnet?.children.splice(preIndex + 1, 0, getString(dragKey));
      dragEl!.indent = parnet!.indent + 1;
      dragEl!.parent = parnet?.key;
    }
    // 设置拖拽节点之前的父节点是否还有子节点
    dragParent!.hasChild = dragParent?.children.length != 0;

    // 修改拖拽节点的缩进和父节点指向
    if (
      (dragTargetEl?.children.length && dragTargetEl.expand) ||
      dragX.indent == -1
    ) {
      dragEl!.indent = dragTargetEl!.indent + 1;
      dragEl!.parent = dragTargetKey;
    } else if (dragX.indent == 0) {
      dragEl!.indent = dragTargetParent!.indent + 1;
      dragEl!.parent = dragTargetParentKey;
    }
    handleChildIndent(dragEl!.children, dragEl!.indent);
  }, [flatTreeData, dragKey, dragTargetKey, dragX]);

  // 处理x轴的拖拽数据
  const handleDragX = useCallback(
    (end: number, isLast: boolean) => {
      if (!dragTargetKey) return;
      const dragTargetEl = flatTreeData.get(dragTargetKey)!;
      // indent < 0: 成为目标节点的子节点
      // indent == 0: 插在目标节点的前面
      // indent > 0: 插在目标节点的第indent个父节点的最底部
      setDragX((pre) => {
        // 如果目标节点有子节点并且展开，则只能插到目标节点的内部
        if (dragTargetEl.expand && dragTargetEl.children.length) {
          return { ...pre, indent: -1 };
        }
        let indent = ((pre.start - end) / 24) | 0;
        // 如果是末尾的节点则限制缩进不能超过当前父节点的
        if (isLast) {
          indent =
            dragTargetEl.indent - 1 <= indent
              ? dragTargetEl.indent - 1
              : indent;
        } else {
          // 否则不能缩进超过目标节点的范围
          indent = indent > 0 ? 0 : indent;
        }

        // 当缩进小于0时
        if (indent < 0) {
          // 如果拖拽节点和目标节点是同一个则拖拽节点不能成为目标节点子节点
          indent = dragTargetKey == dragKey ? 0 : -1;
        }
        return { ...pre, indent };
      });
    },
    [flatTreeData, dragTargetKey]
  );

  // 控制展开
  const controlExpand = (data: Map<mapKeyType, FlatTreeDataNode>) => {
    if (expandedKeys) expandKeySet.current = new Set(expandedKeys);
    for (let [key, node] of data) {
      node.expand = expandKeySet.current.has(getString(key));
    }
  };

  // 受控展开
  useEffect(() => {
    // 受控组件 由外部控制更改
    if (flatTreeData.size == 0 && !expandedKeys) return;
    controlExpand(flatTreeData);
    setFlatTreeData(new Map(flatTreeData));
  }, [expandedKeys]);

  // 点击展开隐藏节点
  const handleClickSwitcher = useCallback(
    (
      node: FlatTreeDataNode,
      key: mapKeyType,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (switchTimerRef.current) return;
      // 如果不是受控组件则内部更改
      if (!expandedKeys) {
        node.expand = !node.expand;
        setFlatTreeData(new Map(flatTreeData));
      }

      if ((!expandedKeys && node.expand) || (expandedKeys && !node.expand)) {
        expandKeySet.current.add(getString(key));
      } else {
        expandKeySet.current.delete(getString(key));
      }

      // 触发展开事件
      const info: TreeEventType = {
        event: "expand",
        nativeEvent: e,
        node: node,
        expand: node.expand,
        expandNodes: originTreeData.get(getString(key)),
      };
      onExpand && onExpand([...expandKeySet.current], info);

      // 异步加载
      if (loadData) {
        // 当展开子节点且没有子节点时进行加载
        if (node.expand && !node.children.length) node.loading = true;
        loadData({
          key: getString(key),
          children: originTreeData.get(getString(key))?.children,
        });
      }

      switchTimerRef.current = setTimeout(() => {
        switchTimerRef.current = null;
        if (loadData) node.loading = false;
      }, animateTime);
    },
    [flatTreeData]
  );

  // 向上遍历，将父节点进行勾选或取消勾选
  const upward = (key: mapKeyType, checked: boolean) => {
    let tNode = flatTreeData.get(key)!;
    if (tNode.disabled || key == mapKeyRef.current) return;
    let preCheck = tNode.checked;
    tNode.checkNum += checked ? -1 : 1;
    tNode.hasChild = tNode.checkNum !== 0;
    if (tNode.checkNum < tNode.children.length && tNode.checkNum >= 0) {
      tNode.checked = false;
      checkedKeySet.current.delete(getString(key));
    } else if (tNode.checkNum == tNode.children.length) {
      tNode.checked = true;
      checkedKeySet.current.add(getString(key));
    } else {
      console.error(key, { ...tNode }, "子节点勾选个数出现问题");
      return;
    }

    if (tNode?.parent && preCheck != tNode.checked)
      upward(tNode?.parent, preCheck);
  };
  // 向下遍历，将子节点全部勾选或取消勾选
  const downward = (children: string[], checked: boolean) => {
    for (let key of children) {
      let tNode = flatTreeData.get(key)!;
      if (tNode.disabled) continue;
      tNode.checked = !checked;
      tNode.checkNum = !checked ? tNode.children.length : 0;
      tNode.hasChild = tNode.checkNum !== 0;
      if (checked) {
        checkedKeySet.current.delete(getString(key));
      } else {
        checkedKeySet.current.add(getString(key));
      }

      if (tNode.children.length) downward(tNode.children, checked);
    }
  };

  // 受控勾选
  useEffect(() => {
    if (flatTreeData.size == 0 && !checkedKeys) return;
    checkedKeySet.current = new Set(checkedKeys);

    // 将受控值赋给哈希树
    for (let [key, node] of flatTreeData) {
      node.checked = checkedKeySet.current.has(getString(key));
      node.checkNum = 0;
      node.hasChild = false;
    }

    //递归遍历哈希树对节点进行勾选处理
    const deepSearch = (key: mapKeyType, parentChecked: boolean = false) => {
      let node = flatTreeData.get(key)!;
      if (parentChecked) node.checked = true;
      node.children.forEach((childKey) => {
        let child = deepSearch(childKey, node.checked);
        if (child.check) {
          node.checkNum++;
        }
        node.hasChild = node.hasChild || child.hasChild || node.checkNum !== 0;
      });
      if (node.children.length)
        node.checked = node.checkNum === node.children.length;
      return {
        check: node.checked,
        hasChild: node.hasChild,
      };
    };
    if (flatTreeData.size != 0) deepSearch(mapKeyRef.current);

    setFlatTreeData(new Map(flatTreeData));
  }, [checkedKeys]);

  // 点击勾选或取消勾选
  const handleClickCheck = useCallback(
    (
      node: FlatTreeDataNode,
      key: mapKeyType,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (node.disabled || node.disableCheckbox) return;
      let { checked, parent } = node;

      if (!checkedKeys) {
        upward(parent!, checked);
        if (isString(key)) downward([key], checked);
        setFlatTreeData(new Map(flatTreeData));
      } else {
        upward(parent!, checked);
        console.log([...checkedKeySet.current]);
        if (isString(key)) downward([key], checked);
      }

      // 触发勾选事件
      const info: TreeEventType = {
        event: "check",
        nativeEvent: e,
        node: node,
        checked: node.checked,
        checkedNodes: originTreeData.get(getString(key)),
      };
      onCheck && onCheck([...checkedKeySet.current], info);
    },
    [flatTreeData]
  );

  useEffect(() => {
    if (!selectedKey) return;
    const node = flatTreeData.get(selectedKey);
    if (!node) return;
    const preNode = flatTreeData.get(currSelectedkey);
    if (preNode) {
      preNode.selected = !preNode.selected;
    }
    // 如果当前选中节点和点击的节点不相同则选中
    if (currSelectedkey != selectedKey) {
      node.selected = true;
    }
    setFlatTreeData(new Map(flatTreeData));
    setCurrselectedKey(selectedKey);
  }, [selectedKey]);
  // 点击标题进行选中
  const handleSelected = useCallback(
    (
      node: FlatTreeDataNode,
      key: mapKeyType,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (node.disabled) return;
      const preNode = flatTreeData.get(currSelectedkey);

      if (typeof selectedKey === "undefined") {
        if (preNode) {
          preNode.selected = !preNode.selected;
        }
        // 如果当前选中节点和点击的节点不相同则选中
        if (currSelectedkey != key) {
          node.selected = true;
          setCurrselectedKey(key);
        } else {
          setCurrselectedKey("");
        }
        setFlatTreeData(new Map(flatTreeData));
      }

      // 触发选中事件
      const info: TreeEventType = {
        event: "select",
        nativeEvent: e,
        node: node,
        selected: node.selected,
        selectedNodes: originTreeData.get(getString(key)),
      };
      onSelect && onSelect(getString(key), info);
    },
    [flatTreeData]
  );

  /**
   * 对树进行扁平化处理
   * @param {TreeDataNode[]} [treeData=[]] 原树节点数据
   * @param {Map<mapKeyType, FlatTreeDataNode>} [flatList=new Map()]  处理后的哈希树
   * @param {number} [indent=0] 缩进
   * @param {mapKeyType} [parent=mapKeyRef.current] 父节点的键
   * @param {boolean} [parentChecked=false] 父节点是否勾选
   * @return {*}  {{
   *   flatList: Map<mapKeyType, FlatTreeDataNode>; 处理后的哈希树
   *   childKey: string[]; 子节点的键数组
   *   parentExpand: boolean; 父节点是否展开
   *   checkNum: number; 父节点中子节点勾选的数量
   *   hasChild: boolean; 父节点中是否有子节点被勾选
   *   }}
   */
  const handleTreeData = useCallback(
    (
      treeData: TreeDataNode[] = [],
      flatList: Map<mapKeyType, FlatTreeDataNode> = new Map(),
      indent: number = 0,
      parent: mapKeyType = mapKeyRef.current,
      parentChecked: boolean = false
    ): {
      flatList: Map<mapKeyType, FlatTreeDataNode>;
      childKey: string[];
      parentExpand: boolean;
      checkNum: number;
      hasChild: boolean;
    } => {
      const childKey: FlatTreeDataNode["children"] = [];
      let parentExpand = false;
      let expand = false;
      let checked = false;
      let checkNum = 0;
      let hasChild = false;
      for (let item of treeData) {
        // 构建原生节点树
        originTreeData.set(item.key, item);
        // 添加子节点键
        childKey.push(item.key);
        // 是否展开
        if (
          defaultExpandedKeys.includes(item.key) ||
          (expandedKeys && expandedKeys.includes(item.key))
        ) {
          parentExpand = expand = true;
        } else {
          expand = false;
        }
        // 是否勾选 如果父节点被勾选，那所有子节点都会被勾选，除非是父节点被禁用
        checked = defaultCheckedKeys.includes(item.key) || parentChecked;
        if (
          defaultCheckedKeys.includes(item.key) ||
          parentChecked ||
          (checkedKeys && checkedKeys.includes(item.key))
        ) {
          checked = true;
        } else {
          checked = false;
        }
        // 父节点勾选的子节点个数
        if (checked) checkNum++;

        // 递归遍历
        let childTree = handleTreeData(
          item.children,
          flatList,
          indent + 1,
          item.key,
          checked && !item.disabled
        );

        const currItem = {
          ...item,
          children: childTree.childKey,
          indent,
          checked:
            checked ||
            (childTree.childKey.length != 0 &&
              childTree.checkNum == childTree.childKey.length),
          checkNum: childTree.checkNum,
          parent,
          expand: defaultExpandAll || expand || childTree.parentExpand,
          selected: defaultSelectedKey == item.key,
          hasChild: childTree.hasChild,
        };

        flatList.set(item.key, currItem);

        // 如果展开添加到展开集合里面
        if (currItem.expand) {
          expandKeySet.current.add(item.key);
        }

        // 如果勾选添加到勾选集合里面
        if (currItem.checked) checkedKeySet.current.add(item.key);

        // 有子节点被勾选
        hasChild = hasChild || checked || currItem.hasChild;
      }

      if (!autoExpandParent) parentExpand = false;

      return {
        flatList,
        childKey,
        parentExpand,
        checkNum,
        hasChild,
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
      expand: true,
      selected: false,
      hasChild: true,
    });

    setFlatTreeData((prev) => {
      if (prev.size != 0 && (expandedKeys || loadData)) controlExpand(flatList);
      return flatList;
    });
    setOriginTreeData(originTreeData);

    () => {
      switchTimerRef.current && clearTimeout(switchTimerRef.current);
    };
  }, [treeData]);

  // 遍历哈希树构建子节点
  const getTreeNode = useCallback(
    (
      key: mapKeyType,
      isLast: boolean,
      parentIsLast: boolean[],
      isFirst: boolean = false
    ): React.ReactNode => {
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
                handleSelected={handleSelected}
                checkable={checkable}
                blockNode={blockNode}
                showLine={showLine}
                switcherIcon={switcherIcon}
                isLast={isLast}
                parentIsLast={parentIsLast}
                showIcon={showIcon}
                loadData={loadData}
                directory={directory}
                draggable={draggable}
                dragTargetKey={dragTargetKey}
                setDragTargetKey={handleSetDragTargetKey}
                setDragInit={handleDragInit}
                isFirst={isFirst}
                handleDragDrop={handleDragDrop}
                handleDragX={handleDragX}
                dragX={dragX}
              ></TreeNode>
              {node.children.length !== 0 && (
                <Transition
                  trgger={!node.expand}
                  node={node}
                  flatTreeData={flatTreeData}
                >
                  {node.children.map((childKey, index) =>
                    getTreeNode(childKey, node.children.length - 1 == index, [
                      ...parentIsLast,
                      !isLast,
                    ])
                  )}
                </Transition>
              )}
            </>
          )}

          {key == mapKeyRef.current &&
            node.children.map((childKey, index) =>
              getTreeNode(
                childKey,
                node.children.length - 1 == index,
                [],
                index == 0
              )
            )}
        </React.Fragment>
      );
    },
    [flatTreeData, dragTargetKey, dragX, handleDragX]
  );

  return (
    <div className={classNames("versa-tree", className)} ref={ref} {...rest}>
      {getTreeNode(mapKeyRef.current, false, [])}
    </div>
  );
});

export default Tree;
