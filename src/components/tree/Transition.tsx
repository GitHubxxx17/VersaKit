import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { FlatTreeDataNode, animateTime, mapKeyType } from ".";
import "./index.scss";

// 基础属性
export interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  trgger: boolean;
  node?: FlatTreeDataNode;
  flatTreeData?: Map<mapKeyType, FlatTreeDataNode>;
}

const Transition = (props: TransitionProps) => {
  const { children, node, flatTreeData, trgger, className, ...rest } = props;
  // 动画标签ref
  const transitionRef = useRef<HTMLDivElement>(null);
  // 动画标签显示隐藏
  const [hide, setHide] = useState(trgger);
  // 正常展开的节点的显示隐藏
  const [show, setShow] = useState(!trgger);
  // 内部触发
  const [innerTrgger, setInnerTrgger] = useState(trgger);

  useEffect(() => {
    // 如果内部触发和外部触发相同说明并没有点击展开或隐藏
    if (innerTrgger == trgger) {
      setHide(false);
      return;
    }
    setInnerTrgger(trgger);

    // 如果触发说明进行隐藏动画，否则进行展开动画
    if (trgger) {
      setShow(false);
      setHide(true);
      setTimeout(() => {
        const height = transitionRef.current?.offsetHeight;
        transitionRef.current!.animate(
          [
            { opacity: 1, height: `${height}px` },
            { opacity: 0, height: "0px" },
          ],
          animateTime
        ).onfinish = () => {
          transitionRef.current!.style.display = "none";
          setHide(false);
        };
      });
    } else {
      setHide(true);
      setTimeout(() => {
        const height = transitionRef.current?.offsetHeight;
        transitionRef.current!.animate(
          [
            { opacity: 0, height: "0px" },
            { opacity: 1, height: `${height}px` },
          ],
          animateTime
        ).onfinish = () => {
          setHide(false);
          setShow(true);
        };
      });
    }
  }, [trgger]);

  return (
    <>
      {hide && (
        <div
          className={classNames("versa-tree-switch")}
          ref={transitionRef}
          {...rest}
        >
          {children}
        </div>
      )}
      {show && <>{children}</>}
    </>
  );
};

export default Transition;
