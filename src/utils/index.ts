import * as React from "react";

export const isObject = (obj: any): boolean => {
  return obj && typeof obj === "object";
};

export const isNumber = (number: any): boolean => {
  return number && !Number.isNaN(number) && typeof number === "number";
};

export const isBoolean = (flag: any): boolean => {
  return flag && typeof flag === "boolean";
};

export const { isValidElement } = React;

export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === React.Fragment;
}

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
