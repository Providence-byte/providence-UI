import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
export interface TabsItemProps {
  index?: string;
  title: string;
  disabled?: boolean;
  icon?: IconProp;
  className?: string;
  style?: React.CSSProperties;
  children?:React.ReactNode
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  const context = useContext(TabsContext);
  const { index, title, disabled, className, style, children, icon } = props;
  const classes = classNames("tabs-item", className, {
    "is-active": context.index === index,
    "is-disabled": disabled,
  });
  const handleClick = () => {
    if (context.onSelected && !disabled && typeof index === "string") {
      context.onSelected(index, children);
    }
  };
  return (
    <li className={classes} onClick={handleClick} style={style} data-testid='tabs item'>
      {icon ? (
        <>
          <Icon icon="ban"></Icon>
          <span>{title}</span>
        </>
      ) : (
        title
      )}
    </li>
  );
};

TabsItem.defaultProps = {
  disabled: false,
};

TabsItem.displayName = "TabsItem";

export default TabsItem;
