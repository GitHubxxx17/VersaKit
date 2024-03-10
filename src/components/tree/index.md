---
category: Components
title: Tree
subtitle: 树形控件
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 2
---

## 介绍

## 代码演示

最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。
<code src="./demo/base.tsx">基础用法</code>

受控操作示例
<code src="./demo/control.tsx">受控操作示例</code>

可搜索的树。
<code src="./demo/search.tsx">可搜索</code>

点击展开节点，动态加载数据。
<code src="./demo/async.tsx">异步数据加载</code>

可以针对不同的节点定制图标。
<code src="./demo/icon.tsx">自定义图标</code>

节点之间带连接线的树，常用于文件目录结构展示。使用 `showLine` 开启，可以用 `switcherIcon` 修改默认图标。
<code src="./demo/line.tsx">连接线</code>

内置的目录树
<code src="./demo/directory.tsx">目录</code>

自定义展开/折叠图标。
<code src="./demo/expandIcon.tsx">自定义展开/折叠图标</code>

占据整行
<code src="./demo/block.tsx">占据整行</code>

## API

| 属性                | 类型                                                                                                                         | 默认值 | 必填  | 说明                                                                                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowDrop           | ({ dropNode, dropPosition }) => boolean                                                                                      | false  | false | 是否允许拖拽时放置在该节点                                                                                                                                                                                                                             |
| autoExpandParent    | boolean                                                                                                                      | false  | false | 是否自动展开父节点                                                                                                                                                                                                                                     |
| blockNode           | boolean                                                                                                                      | false  | false | 是否节点占据一行                                                                                                                                                                                                                                       |
| checkable           | boolean                                                                                                                      | false  | false | 节点前添加 Checkbox 复选框                                                                                                                                                                                                                             |
| checkedKeys         | string\[]                                                                                                                    | \[]    | false | （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 `checkable` 和 `checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 |
| defaultCheckedKeys  | string\[]                                                                                                                    | \[]    | false | 默认选中复选框的树节点                                                                                                                                                                                                                                 |
| defaultExpandAll    | boolean                                                                                                                      | false  | false | 默认展开所有树节点                                                                                                                                                                                                                                     |
| defaultExpandedKeys | string\[]                                                                                                                    | \[]    | false | 默认展开指定的树节点                                                                                                                                                                                                                                   |
| defaultExpandParent | boolean                                                                                                                      | true   | false | 默认展开父节点                                                                                                                                                                                                                                         |
| defaultSelectedKey  | string                                                                                                                       | ''     | false | 默认选中的树节点                                                                                                                                                                                                                                       |
| disabled            | boolean                                                                                                                      | false  | false | 将树禁用                                                                                                                                                                                                                                               |
| draggable           | boolean \| ((node: DataNode) => boolean) \| { icon?: React.ReactNode \| false, nodeDraggable?: (node: DataNode) => boolean } | false  | false | 设置节点可拖拽，可以通过 `icon: false` 关闭拖拽提示图标                                                                                                                                                                                                |
| expandedKeys        | string\[]                                                                                                                    | \[]    | false | （受控）展开指定的树节点                                                                                                                                                                                                                               |
| filterTreeNode      | function(node)                                                                                                               | -      | false | 按需筛选树节点（高亮）                                                                                                                                                                                                                                 |
| height              | number                                                                                                                       | -      | false | 设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动                                                                                                                                                                                                   |
| icon                | ReactNode \| (props) => ReactNode                                                                                            | -      | false | 自定义树节点图标。                                                                                                                                                                                                                                     |
| loadData            | function(node)                                                                                                               | -      | false | 异步加载数据                                                                                                                                                                                                                                           |
| multiple            | boolean                                                                                                                      | false  | false | 支持点选多个节点（节点本身）                                                                                                                                                                                                                           |
| selectable          | boolean                                                                                                                      | true   | false | 是否可选中                                                                                                                                                                                                                                             |
| selectedKey         | string                                                                                                                       | -      | false | （受控）设置选中的树节点，多选需设置 `multiple` 为 true                                                                                                                                                                                                |
| showIcon            | boolean                                                                                                                      | false  | false | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式                                                                                                                                                                |
| showLine            | boolean \| { showLeafIcon: ReactNode \| ((props: AntTreeNodeProps) => ReactNode) }                                           | false  | false | 是否展示连接线                                                                                                                                                                                                                                         |
| switcherIcon        | ReactNode \| ((props: AntTreeNodeProps) => ReactNode)                                                                        | -      | false | 自定义树节点的展开/折叠图标                                                                                                                                                                                                                            |
| treeData            | array&lt;{key, title, children, \[disabled, selectable]}>                                                                    | -      | false | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）                                                                                                                                                                       |
| virtual             | boolean                                                                                                                      | true   | false | 设置 false 时关闭虚拟滚动                                                                                                                                                                                                                              |
| onCheck             | function(checkedKeys, e:{checked: boolean, checkedNodes, node, event, halfCheckedKeys})                                      | -      | false | 点击复选框触发                                                                                                                                                                                                                                         |
| onDragEnd           | function({event, node})                                                                                                      | -      | false | dragend 触发时调用                                                                                                                                                                                                                                     |
| onDragEnter         | function({event, node, expandedKeys})                                                                                        | -      | false | dragenter 触发时调用                                                                                                                                                                                                                                   |
| onDragLeave         | function({event, node})                                                                                                      | -      | false | dragleave 触发时调用                                                                                                                                                                                                                                   |
| onDragOver          | function({event, node})                                                                                                      | -      | false | dragover 触发时调用                                                                                                                                                                                                                                    |
| onDragStart         | function({event, node})                                                                                                      | -      | false | 开始拖拽时调用                                                                                                                                                                                                                                         |
| onDrop              | function({event, node, dragNode, dragNodesKeys})                                                                             | -      | false | drop 触发时调用                                                                                                                                                                                                                                        |
| onExpand            | function(expandedKeys, {expanded: boolean, node})                                                                            | -      | false | 展开/收起节点时触发                                                                                                                                                                                                                                    |
| onLoad              | function(loadedKeys, {event, node})                                                                                          | -      | false | 节点加载完毕时触发                                                                                                                                                                                                                                     |
| onRightClick        | function({event, node})                                                                                                      | -      | false | 响应右键点击                                                                                                                                                                                                                                           |
| onSelect            | function(selectedKeys, e:{selected: boolean, selectedNodes, node, event})                                                    | -      | false | 点击树节点触发                                                                                                                                                                                                                                         |
| directory           | boolean                                                                                                                      | false  | false | 目录                                                                                                                                                                                                                                                   |

### TreeNode props

| 属性            | 类型                              | 默认值                 | 必填  | 说明                                                                                                                                  |
| --------------- | --------------------------------- | ---------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| checkable       | boolean                           | -                      | false | 当树为 checkable 时，设置独立节点是否展示 Checkbox                                                                                    |
| disableCheckbox | boolean                           | false                  | false | 禁掉 checkbox                                                                                                                         |
| disabled        | boolean                           | false                  | false | 禁掉响应                                                                                                                              |
| icon            | ReactNode \| (props) => ReactNode | -                      | false | 自定义图标。可接收组件，props 为当前节点 props                                                                                        |
| isLeaf          | boolean                           | -                      | false | 设置为叶子节点 (设置了 `loadData` 时有效)。为 `false` 时会强制将其作为父节点                                                          |
| key             | string                            | (内部计算出的节点位置) | true  | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ |
| selectable      | boolean                           | true                   | false | 设置节点是否可被选中                                                                                                                  |
| title           | ReactNode                         | `---`                  | true  | 标题                                                                                                                                  |
