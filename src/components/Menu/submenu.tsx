import React, { FunctionComponentElement, useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { BaseMenuItemProps } from "./menuitem";
// import { CSSTransition } from "react-transition-group";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
export interface SubMenuProps {
  className?: string;
  index?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { className, index, title, children } = props;
  const context = useContext(MenuContext);
  const opendSubMenu = context.defaultOpenSubMenu as Array<string>;
  // index表示subMenu在Menu中是第几项
  const isOpen =
    index && context.mode === "vertical" ? opendSubMenu.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpen);
  const classes = classNames("submenu-item menu-item", className, {
    "is-active": context.index === index,
    vertical: context.mode === "vertical",
    "menu-open": menuOpen,
  });

  const renderElement = () => {
    const classes = classNames("submenu", {
      "menu-open": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<BaseMenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Wraning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation='zoom-in-top'>
        <ul className={classes}>{childrenComponent}</ul>
      </Transition>
    );
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 100);
  };
  // 根据不同的mode显示不同的鼠标事件，横向为hover触发，纵向为click触发
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  return (
    // 使用对象展开的形式给元素添加不同的鼠标事件
    <li key={index} className={classes} title={title} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon={"angle-down"} className="arrow-icon"></Icon>
      </div>
      {renderElement()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
