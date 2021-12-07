import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
export interface BaseMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<BaseMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelected && !disabled && (typeof index === 'string')) {
      context.onSelected(index);
    }
  };
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  disabled: false,
};

// React内置静态属性，帮我们判断类型
MenuItem.displayName = 'MenuItem';


export default MenuItem;
