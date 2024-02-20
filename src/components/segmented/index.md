---
category: Components
title: Segmented
subtitle: 分段控制器
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 2
---

## 介绍

用于展示多个选项并允许用户选择其中单个选项；
当切换选中选项时，关联区域的内容会发生变化。

## 代码演示

最简单的用法。
<code src="./demo/base.tsx">基础用法</code>

`block` 属性使其适合父元素宽度。
<code src="./demo/block.tsx">Block 分段选择器</code>

Segmented 不可用。
<code src="./demo/disabled.tsx">不可用</code>

## API

| 属性         | 类型                                                                                                                      | 默认值   | 必填  | 说明                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- | ----- | ---------------------------- |
| block        | boolean                                                                                                                   | false    | false | 将宽度调整为父元素宽度的选项 |
| defaultValue | string \| number                                                                                                          |          | false | 默认选中的值                 |
| disabled     | boolean                                                                                                                   | false    | false | 是否禁用                     |
| onChange     | function(value: string \| number)                                                                                         |          | false | 选项变化时的回调函数         |
| options      | string\[] \| number\[] \| Array<{ label: ReactNode value: string icon? ReactNode disabled?: boolean className?: string }> | []       | false | 数据化配置选项内容           |
| size         | `large` \| `middle` \| `small`                                                                                            | `middle` | false | 控件尺寸                     |
| value        | string \| number                                                                                                          |          | false | 当前选中的值                 |
