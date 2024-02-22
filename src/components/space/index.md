---
category: Components
title: Space
subtitle: 间隔
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 布局
  order: 2
---

## 介绍

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

### 与 Flex 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 代码演示

相邻组件水平间距。
<code src="./demo/base.tsx">基础用法</code>

相邻组件垂直间距。
<code src="./demo/vertical.tsx">垂直间距</code>

使用 `size` 设置元素之间的间距，预设了 `small`、`middle`、`large` 三种尺寸，也可以自定义间距，若不设置 `size`，则默认为 `small`。
<code src="./demo/size.tsx">间距大小</code>

设置对齐模式。
<code src="./demo/align.tsx">对齐</code>

自动换行。
<code src="./demo/wrap.tsx">自动换行</code>

相邻组件分隔符。
<code src="./demo/split.tsx">分隔符</code>

Button 组件紧凑排列的示例。
<code src="./demo/compactButton.tsx">Button 紧凑布局</code>

垂直方向的紧凑布局，目前仅支持 Button 组合。
<code src="./demo/compactVertical.tsx">垂直方向的紧凑布局</code>

## API

| 属性      | 类型                                     | 默认值       | 必填  | 说明                                   |
| --------- | ---------------------------------------- | ------------ | ----- | -------------------------------------- |
| align     | `start` \| `end` \|`center` \|`baseline` | -            | false | 对齐方式                               |
| direction | `vertical` \| `horizontal`               | `horizontal` | false | 间距方向                               |
| size      | [Size](#size) \| [Size\[\]](#size)       | `small`      | false | 间距大小                               |
| split     | ReactNode                                | -            | false | 设置拆分                               |
| wrap      | boolean                                  | false        | false | 是否自动换行，仅在 `horizontal` 时有效 |

### Size

`'small' | 'middle' | 'large' | number`

### Space.Compact

需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact。支持的组件有：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- InputNumber
- Select
- TimePicker
- TreeSelect

| 属性      | 类型                           | 默认值       | 必填  | 说明                         |
| --------- | ------------------------------ | ------------ | ----- | ---------------------------- |
| block     | boolean                        | false        |       | 将宽度调整为父元素宽度的选项 |
| direction | `vertical` \| `horizontal`     | `horizontal` | false | 指定排列方向                 |
| size      | `large` \| `middle` \| `small` | `middle`     | false | 子组件大小                   |
