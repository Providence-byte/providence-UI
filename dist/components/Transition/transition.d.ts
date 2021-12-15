import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
export declare type Animation = "zoom-in-top" | "zoom-in-left" | "zoom-in-right" | "zoom-in-bottom" | "zoom-out-bottom" | "zoom-out-top";
interface TransitionProps extends CSSTransitionProps {
    animation?: Animation;
    wrapper?: boolean;
}
declare const Transition: React.FC<TransitionProps>;
export default Transition;
