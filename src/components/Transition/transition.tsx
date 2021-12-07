import React from "react";
import { CSSTransition } from "react-transition-group";
// 我们封装的Transition组件的props要继承自CSSTransitionProps
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type Animation =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-in-bottom"
  | "zoom-out-bottom"
  | "zoom-out-top"

interface TransitionProps extends CSSTransitionProps {
  animation?: Animation;
  // 是否在要添加动画的节点外面包一层空元素，防止transition属性重叠导致动画师失效
  wrapper?: boolean;
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { classNames, animation, children, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
