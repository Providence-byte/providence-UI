import React,{FC} from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type Theme =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
}

/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Icon } from 'providence'
 * ~~~
 */

export const Icon: FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};

export default Icon;
