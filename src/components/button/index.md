---
category: Components
title: Button
subtitle: 按钮
toc: content
nav:
  title: 组件
  order: 0
group:
  title: 通用
  order: 1
---

## 介绍

按钮是一种命令组件，可发起一个即时操作。

我们提供了五种按钮类型：

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用：

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 代码演示

按钮分为主要按钮、默认按钮、虚线按钮、链接按钮和文本按钮五种。
<code src="./demo/base.tsx">基础用法</code>

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 Button 内使用 `Icon` 组件。
如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。
<code src="./demo/icon.tsx">图标按钮</code>

添加 `loading` 属性即可让按钮处于加载状态，最后三个按钮演示点击后进入加载状态。
<code src="./demo/loading.tsx">加载中状态</code>

按钮有大、中、小三种尺寸。
通过设置`size`为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。
<code src="./demo/size.tsx">按钮尺寸</code>

通过添加`danger`属性可以将按钮设置为危险按钮
<code src="./demo/danger.tsx">危险按钮</code>

通过添加`disabled`属性可以设置按钮失效状态
<code src="./demo/disabled.tsx">禁用按钮</code>

通过添加`ghost`属性将按钮的内容反色，背景变为透明，常用在有色背景上。
<code src="./demo/ghost.tsx">幽灵按钮</code>

通过添加 `block` 属性将使按钮适合其父宽度。
<code src="./demo/block.tsx">block按钮</code>

通过添加 `shape` 属性设置按钮形状。
<code src="./demo/shape.tsx">按钮形状</code>

## API

通用属性参考：
通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性       | 类型                                                   | 默认值    | 必填  | 说明                                                  |
| ---------- | ------------------------------------------------------ | --------- | ----- | ----------------------------------------------------- |
| type       | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` | false | 按钮类型                                              |
| htmlType   | string                                                 | `button`  | false | 设置 button 原生的 type 值                            |
| size       | `small` \| `default` \| `large`                        | `default` | false | 按钮尺寸                                              |
| danger     | boolean                                                | `false`   | false | 设置危险按钮                                          |
| disabled   | boolean                                                | `false`   | false | 设置按钮失效状态                                      |
| ghost      | boolean                                                | `false`   | false | 幽灵属性，使按钮背景透明                              |
| icon       | ReactNode                                              | -         | false | 设置按钮的图标组件                                    |
| loading    | boolean \| { delay: number }                           | `false`   | false | 设置按钮载入状态                                      |
| block      | boolean                                                | `false`   | false | 将按钮宽度调整为其父宽度的选项                        |
| href       | string                                                 | -         | false | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 |
| target     | string                                                 | -         | false | 相当于 a 链接的 target 属性，href 存在时生效          |
| shape      | `default` \| `circle` \| `round`                       | `default` | false | 设置按钮形状                                          |
| classNames | Record<SemanticDOM, string>                            | -         | false | 语义化结构 class                                      |
| styles     | Record<SemanticDOM, CSSProperties>                     | -         | false | 语义化结构 style                                      |
| onClick    | (event: MouseEvent) => void                            | -         | false | 点击按钮时的回调                                      |

支持原生 button 的其他所有属性。
