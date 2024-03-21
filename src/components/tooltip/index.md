---
category: Components
title: tooltip
subtitle: 文字提示
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 3
---

## 介绍

简单的文字提示气泡框。

## 代码演示

<code src="./demo/base.tsx">基础用法</code>
位置有 12 个方向。
<code src="./demo/placement.tsx">位置</code>

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。
<code src="./demo/color.tsx">多彩文字提示</code>

可以控制箭头是否显示
<code src="./demo/arrow.tsx">箭头显示</code>

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。
<code src="./demo/shift.tsx" iframe="250">贴边偏移</code>

通过设置 title="" 可以禁用 Tooltip。
<code src="./demo/disabled.tsx">禁用</code>

通过open可手动控制显示隐藏
<code src="./demo/handle.tsx">手动控制</code>

## API

| 属性  | 类型                         | 默认值 | 必填 | 说明     |
| ----- | ---------------------------- | ------ | ---- | -------- |
| title | ReactNode \| () => ReactNode | -      | true | 提示文字 |

### 共同的 API

以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| ----- | ------ | ------ | ----- | ------ |
| arrow | boolean | true | false | 箭头的显示状态 |
| autoAdjustOverflow | boolean | true | false | 气泡被遮挡时自动调整位置 |
| color | string | - | false | 背景颜色 |
| defaultOpen | boolean | false | false | 默认是否显隐 |
| destroyTooltipOnHide| boolean | false | false | 关闭后是否销毁 Tooltip |
| mouseEnterDelay | number | 0.05 | false | 鼠标移入后延时多少才显示 Tooltip，单位：秒 |
| mouseLeaveDelay | number | 0.05 | false | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 |
| placement | `top`\| `left`\| `right`\| `bottom`\| `topLeft`\|`topRight`\|`bottomLeft`\|`bottomRight`\|`leftTop`\|`leftBottom`\|`rightTop`\|`rightBottom` | `top` | false | 气泡框位置 |
| trigger | `hover` \| `focus` \| `click` \| `contextMenu` | `hover` | false | 触发行为 |
| open | boolean | false | false | 用于手动控制浮层显隐 |
| zIndex | number | - | false | 设置 Tooltip 的 `z-index` |
| onOpenChange | (open: boolean) => void | - | false | 显示隐藏的回调 |
