import * as React from "react";

/**
 * 判断是否为对象类型
 * @param {*} obj
 * @return {*}  {boolean}
 */
export const isObject = (obj: any): boolean => {
  return obj && typeof obj === "object";
};

/**
 * 判断是否为数字类型
 * @param {*} number
 * @return {*}  {boolean}
 */
export const isNumber = (number: any): boolean => {
  return number && !Number.isNaN(number) && typeof number === "number";
};

/**
 * 判断是否为布尔类型
 * @param {*} boolean
 * @return {*}  {boolean}
 */
export const isBoolean = (boolean: any): boolean => {
  return boolean && typeof boolean === "boolean";
};

export const { isValidElement } = React;

/**
 * 判断是否为Fragment
 * @export
 * @param {*} child
 * @return {*}  {boolean}
 */
export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === React.Fragment;
}

/**
 * 判断是否为ReactNode
 * @export
 * @param {*} value
 * @return {*}  {value is React.ReactNode}
 */
export function isValidReactNode(value: any): value is React.ReactNode {
  // 检查是否为null或undefined
  if (value == null) {
    return true;
  }

  // 检查是否为string或number
  if (typeof value === "string" || typeof value === "number") {
    return true;
  }

  // 检查是否为ReactElement（包括JSX元素）
  if (React.isValidElement(value)) {
    return true;
  }

  // 检查是否为ReactFragment
  if (Array.isArray(value) && value.every((item) => isValidReactNode(item))) {
    return true;
  }

  // 检查是否为ReactPortal
  if (
    value != null &&
    typeof value.key === "string" &&
    value.type === "object"
  ) {
    return true;
  }

  // 检查是否为boolean
  if (typeof value === "boolean") {
    return true;
  }

  // 其他情况，默认为false
  return false;
}
