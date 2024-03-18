---
category: Components
title: Radio
subtitle: 单选框
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

最简单的用法。
<code src="./demo/base.tsx">基础用法</code>

Radio 不可用。
<code src="./demo/disabled.tsx">不可用</code>

一组互斥的 Radio 配合使用。
<code src="./demo/onlyOne.tsx">单选组合</code>

垂直的 Radio.Group，配合更多输入框选项。
<code src="./demo/vertical.tsx">Radio.Group 垂直</code>

通过配置 `options` 参数来渲染单选框。也可通过 `optionType` 参数来设置 Radio 类型。
<code src="./demo/options.tsx">Radio.Group 组合 - 配置方式</code>

按钮样式的单选组合。
<code src="./demo/button.tsx">按钮样式</code>

可以为 `Radio.Group` 配置 `name` 参数，为组合内的 `input` 元素赋予相同的 `name` 属性，使浏览器把 `Radio.Group` 下的 `Radio` 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。
<code src="./demo/name.tsx">单选组合 - 配合 name 使用</code>

大中小三种组合，可以和表单输入框进行对应配合。
<code src="./demo/size.tsx">大小</code>

实色填底的单选按钮样式。
<code src="./demo/buttonStyle.tsx">填底的按钮样式</code>

## API

### Radio/Radio.Button

<!-- prettier-ignore -->
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| autoFocus | boolean | false | false| 自动获取焦点 |
| checked | boolean | false |false | 指定当前是否选中 |
| defaultChecked | boolean | false | false| 初始是否选中 |
| disabled | boolean | false | false | 禁用 Radio |
| value | any | - | false | 根据 value 进行比较，判断是否选中 |

### Radio.Group

单选框组合，用于包裹一组 `Radio`。

<!-- prettier-ignore -->
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| buttonStyle | `outline` \| `solid` | `outline` | false | RadioButton 的风格样式，目前有描边和填色两种风格 |
| defaultValue | any | - | false | 默认选中的值 |
| disabled | boolean | false | false | 禁选所有子单选器 |
| name | string | - | false | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 |
| options | string\[] \| number\[] \| Array&lt;{ label: ReactNode; value: string; disabled?: boolean; }> | - | false | 以配置形式设置子元素 |
| optionType | `default` \| `button` | `default` | false | 用于设置 Radio `options` 类型 |
| size | `large` \| `middle` \| `small` | - | false | 大小，只对按钮样式生效 |
| value | any | - | false | 用于设置当前选中的值 |
| onChange | function(e:Event) | - | false | 选项变化时的回调函数 |

## 方法

### Radio

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
