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
