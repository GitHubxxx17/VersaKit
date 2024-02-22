import "./Button.scss";

import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { isNumber, isObject } from "../../utils/index";
import { useCompactItemContext } from "../space/Compact";

type loadingType = {
  loading: boolean;
  delay: number;
};

// 按钮基础属性
interface BaseButtonProps {
  type?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  children?: React.ReactNode;
  size?: SizeType;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  shape?: "default" | "circle" | "round";
  icon?: React.ReactNode;
  loading?: boolean | { delay?: number };
}

// 原生按钮属性
type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
  "type"
>;

// 按钮属性
export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  href?: string;
  target?: string;
  htmlType?: "submit" | "button" | "reset";
}

// 处理加载数据
const handleLoadingProps = (
  loading: BaseButtonProps["loading"]
): loadingType => {
  // 是否为对象
  if (loading && isObject(loading)) {
    let delay = (loading as loadingType)?.delay;
    delay = isNumber(delay) ? delay : 0;
    return {
      loading: delay! <= 0,
      delay,
    };
  }
  return {
    loading: !!loading,
    delay: 0,
  };
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = "default",
      disabled,
      children,
      className,
      size = "default",
      onClick,
      danger,
      ghost,
      block,
      href,
      target,
      htmlType,
      shape = "default",
      icon,
      loading,
      ...rest
    } = props;
    //内部加载
    const [innerLoading, setInnerLoading] = useState(false);
    const loadingProps = handleLoadingProps(loading);

    //延迟加载
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      if (loadingProps.delay > 0) {
        setTimeout(() => {
          timer = null;
          setInnerLoading(false);
        }, loadingProps.delay);
      } else {
        setInnerLoading(loadingProps.loading);
      }
      return () => {
        timer && clearTimeout(timer);
      };
    }, [loadingProps]);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      //加载过程取消点击事件
      if (innerLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const { compactDirection, compactItemClassnames, compactSize } =
      useCompactItemContext("versa-btn");

    const innerClassNames = classNames({
      "versa-btn--danger": danger,
      "versa-btn--ghost": ghost,
      "versa-btn--block": block,
      [`versa-btn--${shape}`]: shape !== "default",
      [`versa-btn--${size}`]: size !== "default",
      "versa-btn-only": !children,
      "versa-btn-loading": innerLoading,
    });

    if (href) {
      return (
        <a
          className={classNames(
            "versa-btn",
            `versa-btn--${type}`,
            className,
            compactItemClassnames,
            innerClassNames,
            {
              "versa-btn--disabled": disabled,
            }
          )}
          href={href}
          target={target}
          onClick={handleClick}
          {...rest}
        >
          {!loading && icon && <span className={"versa-btn-icon"}>{icon}</span>}
          {loading && (
            <span className={"versa-btn-icon"}>
              <LoadingOutlined />
            </span>
          )}
          <span>{children}</span>
        </a>
      );
    }

    return (
      <button
        className={classNames(
          "versa-btn",
          `versa-btn--${type}`,
          className,
          compactItemClassnames,
          innerClassNames
        )}
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        type={htmlType}
        {...rest}
      >
        {!loading && icon && <span className="versa-btn-icon">{icon}</span>}
        {loading && (
          <span className="versa-btn-icon">
            <LoadingOutlined />
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

export default Button;
