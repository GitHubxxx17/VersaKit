---
category: Components
title: Tag
subtitle: 标签
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 2
---

## 介绍

进行标记和分类的小标签。

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

基本标签的用法，可以通过设置 `closeIcon` 变为可关闭标签并自定义关闭按钮，设置为 `true` 时将使用默认关闭按钮。可关闭标签具有 `onClose` 事件。
<code src="./demo/base.tsx">基础用法</code>

我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。
<code src="./demo/color.tsx">多彩标签</code>

预设五种状态颜色，可以通过设置 color 为 `success`、 `info`、`error`、`default`、`warning` 来代表不同的状态。
<code src="./demo/status.tsx">预设标签</code>

当需要在 `Tag` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 Tag 内使用 `Icon` 组件。
如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。
<code src="./demo/icon.tsx">图标标签</code>

设置`bordered`的值为`false`来隐藏边框
<code src="./demo/bordered.tsx">无边框模式</code>

可通过 `CheckableTag` 实现类似 `Checkbox` 的效果，点击切换选中效果。
<code src="./demo/checkable.tsx">可选择标签</code>

## API

| 属性      | 类型                 | 默认值  | 必填  | 说明                                                       |
| --------- | -------------------- | ------- | ----- | ---------------------------------------------------------- |
| color     | string               | -       | false | 标签色                                                     |
| bordered  | boolean              | `true`  | false | 是否有边框                                                 |
| onClose   | (e) => void          | -       | false | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为） |
| icon      | ReactNode            | -       | false | 设置图标                                                   |
| closeIcon | boolean \| ReactNode | `false` | false | 自定义关闭按钮。设置为 null 或 false 时隐藏关闭按钮）      |

### Tag.CheckableTag

| 属性     | 类型              | 默认值  | 必填  | 说明                 |
| -------- | ----------------- | ------- | ----- | -------------------- |
| checked  | boolean           | `false` | false | 设置标签的选中状态   |
| onChange | (checked) => void | -       | false | 点击标签时触发的回调 |
