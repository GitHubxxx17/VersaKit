import classNames from "classnames";
import React from "react";
import { SpaceCompactItemContext } from "./Compact";
import "./index.scss";

export interface ItemProps {
  children: React.ReactNode;
  split?: React.ReactNode;
  compact?: boolean;
  direction?: DirectionType;
}

const Item = (props: ItemProps) => {
  const { children, split, compact, direction } = props;
  let patchChildren: React.ReactNode[] = [];

  const compactItemContext = React.useContext(SpaceCompactItemContext);

  // 有分隔符则添加分隔符隔开每个子节点
  if (Array.isArray(children)) {
    if (split) {
      for (let i = 0; i < children.length; i++) {
        patchChildren.push(children[i]);
        if (i < children.length - 1) patchChildren.push(split);
      }
    } else {
      patchChildren = children;
      if (compact) {
      }
    }
  }

  return (
    <>
      {Array.isArray(children) ? (
        !compact ? (
          patchChildren.map((item, index) => (
            <div key={index} className={classNames("varsa-space-item")}>
              {item}
            </div>
          ))
        ) : (
          patchChildren.map((item, index) => (
            <SpaceCompactItemContext.Provider
              key={index}
              value={{
                isFirstItem:
                  index === 0 &&
                  (!compactItemContext || compactItemContext?.isFirstItem),
                isLastItem:
                  index === patchChildren.length - 1 &&
                  (!compactItemContext || compactItemContext?.isLastItem),
                compactDirection: direction,
              }}
            >
              {item}
            </SpaceCompactItemContext.Provider>
          ))
        )
      ) : !compact ? (
        <div className={classNames("varsa-space-item")}>{children}</div>
      ) : (
        children
      )}
    </>
  );
};

export default Item;
