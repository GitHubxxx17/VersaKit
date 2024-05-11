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

滑动型输入器，展示当前值和可选范围。

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

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

可以设置 `draggableTrack` 为 `true`，使得范围刻度整体可拖拽。
<code src="./demo/draggable.tsx">范围可拖拽</code>

## API

<!-- prettier-ignore -->
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| defaultValue | number \| \[number, number] | 0 \| \[0, 0] | false | 设置初始取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] |
| disabled | boolean | false | false | 值为 true 时，滑块为禁用状态 |
| included | boolean | true | false | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 |
| marks | object | { number: ReactNode } or { number: { style: CSSProperties, label: ReactNode } } | false | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 \[min, max] 内，每个标签可以单独设置样式 |
| max | number | 100 | false | 最大值 |
| min | number | 0 | false | 最小值 |
| range | boolean | false | false | 双滑块模式 |
| draggableTrack | boolean | false | false | 当range为true时才能生效 |
| reverse | boolean | false | false | 反向坐标轴 |
| step | number \| null | 1 | false | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 |
| tooltip  | [tooltip](#tooltip) | - | false | 设置 Tooltip 相关属性 |
| value | number \| \[number, number] | - | false | 设置当前取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] |
| vertical | boolean | false | false | 值为 true 时，Slider 为垂直方向 |
| onChangeComplete | (value) => void | - | false | 与 `mouseup` 和 `keyup` 触发时机一致，把当前值作为参数传入 |
| onChange | (value) => void | - | false | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 |

### tooltip

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| open | boolean | - | false | 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 |
| placement | string | - | false | 设置 Tooltip 展示位置。参考 [Tooltip](/components/tooltip)|
| formatter | value => ReactNode \| null | IDENTITY | false | Slider 会把当前值传给 `formatter`，并在 Tooltip 中显示 `formatter` 的返回值，若为 null，则隐藏 Tooltip |
