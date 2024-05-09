---
category: Components
title: Slider
subtitle: 滑动输入条
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据录入
  order: 2
---

## 介绍

## 代码演示

基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。
<code src="./demo/base.tsx">基础用法</code>

滑块左右可以设置图标来表达业务含义。
<code src="./demo/icon.tsx">带 icon 的滑块</code>

当 `Slider` 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `mouseup` 或者 `keyup` 时，会触发 `onChangeComplete` 事件，并把当前值作为参数传入。
<code src="./demo/event.tsx">事件</code>

使用 marks 属性标注分段式滑块，使用 value / defaultValue 指定滑块位置。当 included=false 时，表明不同标记间为并列关系。当 step=null 时，Slider 的可选值仅有 marks 标出来的部分。
<code src="./demo/mark.tsx">带标签的滑块</code>

垂直方向的 `Slider`。
<code src="./demo/vertical.tsx">垂直</code>

使用 `tooltip.formatter` 可以格式化 `Tooltip` 的内容，设置 `tooltip.formatter={null}`，则隐藏 `Tooltip`。
<code src="./demo/diyTip.tsx">自定义提示</code>

设置 `reverse` 可以将滑动条置反。
<code src="./demo/reverse.tsx">反向</code>

<code src="./demo/draggable.tsx">拖拽</code>

## API

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
