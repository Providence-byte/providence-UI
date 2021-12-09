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

export const Icon: FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};

export default Icon;
