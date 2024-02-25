---
category: Components
title: Grid
subtitle: 栅格
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 布局
  order: 2
---

## 介绍

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

通过 row 在水平方向建立一组 column（简写 col）。
你的内容应当放置于 col 内，并且，只有 col 可以作为 row 的直接元素。
栅格系统中的列是指 1 到 24 的值来表示其跨越的范围。例如，三个等宽的列可以使用 <Col span={8} /> 来创建。
如果一个 row 中的 col 总和超过 24，那么多余的 col 会作为一个整体另起一行排列。
我们的栅格化系统基于 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

布局是基于 24 栅格来定义每一个『盒子』的宽度，但不拘泥于栅格。

## 代码演示

从堆叠到水平排列。

使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。
<code src="./demo/base.tsx">基础栅格</code>

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)。
如果要支持响应式，可以写成` { xs: 8, sm: 16, md: 24, lg: 32 }`。
如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距] `[16, { xs: 8, sm: 16, md: 24, lg: 32 }]`。
<code src="./demo/gutter.tsx">区块间隔</code>

列偏移。<br/>
使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。
<code src="./demo/offset.tsx">左右偏移</code>

列排序。<br/>
通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。
<code src="./demo/columnSort.tsx">栅格排序</code>

布局基础。<br/>
子元素根据不同的值 `start`、`center`、`end`、`space-between`、`space-around` 和 `space-evenly`，分别定义其在父节点里面的排版方式
<code src="./demo/justify.tsx">排版</code>

子元素垂直对齐。
<code src="./demo/align.tsx">对齐</code>

通过 `order` 来改变元素的排序。
<code src="./demo/order.tsx">排序</code>

Col 提供 `flex` 属性以支持填充。
<code src="./demo/flex.tsx">Flex 填充</code>

参照 `Bootstrap` 的 响应式设计，预设六个响应尺寸：`xs` `sm` `md` `lg` `xl` `xxl`。
<code src="./demo/responsive.tsx">响应式布局</code>

支持更灵活的响应式下的任意 `flex` 比例，该功能需要浏览器支持 `CSS Variables`。
<code src="./demo/flexResponsive.tsx">Flex 响应式布局</code>

`span` `pull` `push` `offset` `order` 属性可以通过内嵌到 `xs` `sm` `md` `lg` `xl` `xxl` 属性中来使用。<br/>

其中 `xs={6}` 相当于 `xs={{ span: 6 }}`。
<code src="./demo/otherResponsive.tsx">其他属性的响应式</code>

## API

### Row

| 属性    | 类型                                                                                                                                                                                                                                   | 默认值  | 必填  | 说明                                                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------- |
| align   | `top` \| `middle` \| `bottom` \| `stretch` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'top' \| 'middle' \| 'bottom' \| 'stretch'}`                                                                                   | `top`   | false | 垂直对齐方式                                                                                                                           |
| gutter  | number \| object \| array                                                                                                                                                                                                              | 0       | false | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 `[水平间距, 垂直间距]` |
| justify | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'}` | `start` | false | 水平排列方式                                                                                                                           |
| wrap    | boolean                                                                                                                                                                                                                                | true    | false | 是否自动换行                                                                                                                           |

### Col

| 属性   | 类型             | 默认值 | 必填  | 说明                                                           |
| ------ | ---------------- | ------ | ----- | -------------------------------------------------------------- |
| flex   | string \| number | -      | false | flex 布局属性                                                  |
| offset | number           | 0      | false | 栅格左侧的间隔格数，间隔内不可以有栅格                         |
| order  | number           | 0      | false | 栅格顺序                                                       |
| pull   | number           | 0      | false | 栅格向左移动格数                                               |
| push   | number           | 0      | false | 栅格向右移动格数                                               |
| span   | number           | -      | false | 栅格占位格数，为 0 时相当于 `display: none`                    |
| xs     | number \| object | -      | false | `屏幕 < 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象  |
| sm     | number \| object | -      | false | `屏幕 ≥ 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象  |
| md     | number \| object | -      | false | `屏幕 ≥ 768px` 响应式栅格，可为栅格数或一个包含其他属性的对象  |
| lg     | number \| object | -      | false | `屏幕 ≥ 992px` 响应式栅格，可为栅格数或一个包含其他属性的对象  |
| xl     | number \| object | -      | false | `屏幕 ≥ 1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 |
| xxl    | number \| object | -      | false | `屏幕 ≥ 1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 |
