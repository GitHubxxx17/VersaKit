import "./Button.scss";

import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { isNumber, isObject } from "../../utils/index";

type loadingType = {
  loading: boolean;
  delay: number;
};

// 按钮基础属性
interface BaseButtonProps {
  type?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  size?: "small" | "default" | "large";
  classNames?: string[];
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
  (props: ButtonProps, ref) => {
    const {
      type = "default",
      disabled,
      children,
      className,
      styles,
      size = "default",
      onClick,
      danger,
      ghost,
      block,
      classNames = [],
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

    const innerClassNames = [
      danger ? "versa-btn--danger" : "",
      ghost ? "versa-btn--ghost" : "",
      block ? "versa-btn--block" : "",
      shape !== "default" ? `versa-btn--${shape}` : "",
      size !== "default" ? `versa-btn--${size}` : "",
      !children ? "versa-btn-only" : "",
      innerLoading ? "versa-btn-loading" : "",
    ].filter((className) => className !== "");

    if (href) {
      if (disabled) {
        classNames.push("versa-btn--disabled");
      }
      return (
        <a
          className={[
            "versa-btn",
            `versa-btn--${type}`,
            className,
            ...classNames,
            ...innerClassNames,
          ].join(" ")}
          style={styles}
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
        className={[
          "versa-btn",
          `versa-btn--${type}`,
          className,
          ...classNames,
          ...innerClassNames,
        ].join(" ")}
        style={styles}
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        type={htmlType}
        {...rest}
      >
        {!loading && icon && <span className={"versa-btn-icon"}>{icon}</span>}
        {loading && (
          <span className={"versa-btn-icon"}>
            <LoadingOutlined />
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

export default Button;
