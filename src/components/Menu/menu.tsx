import React, { createContext, useState } from "react";
import classNames from "classnames";
import { BaseMenuItemProps } from "./menuitem";
export type MenuMode = "horizontal" | "vertical";
type SelectCallBack = (selectedIndex: string) => void;

export interface BaseMenuProps {
  defaultIndex?: string;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  defaultOpenSubMenu?: String[];
}

interface IMenuContext {
  index: string;
  onSelected?: SelectCallBack;
  mode?: string;
  defaultOpenSubMenu?: String[];
}
// 创建一个Context对象，用interface约束，必须给默认值
export const MenuContext = createContext<IMenuContext>({ index: "0" });
/** 
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Menu } from 'providence'
 * import { MenuItem } from 'providence'
 * import { SubMenu } from 'providence'
 * ~~~
 * 
 * */  
export const Menu: React.FC<BaseMenuProps> = (props) => {
  const { defaultIndex, mode, className, style, onSelect, children,defaultOpenSubMenu } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setCurrentIndex(index);
    // 如果用户回调存在，则在此处调用
    if (onSelect) {
      onSelect(index);
    }
  };
  // 我们要通过context传给子组件的属性和方法
  const passedContext: IMenuContext = {
    index: currentIndex ? currentIndex : "0",
    onSelected: handleClick,
    mode,
    defaultOpenSubMenu
  };

  // 定义一个函数，用React.Children.map遍历其子组件，再判断类型，
  // 若不是 'MenuItem',则报错
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // child.type上没有child的display等属性，要将其类型断言为React函数组件的实例
      // 他需要传一个props的泛型
      const childElement = child as React.FunctionComponentElement<
        BaseMenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 以 element 元素为样板克隆并返回新的 React 元素。第二个参数中应包含新的 props，
        // 给MenuItem自带index
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          "Wraning: Menu has a child which is not a MenuItem or SubMenu component"
        );
      }
    });
  };

  return (
    <ul style={style} className={classes} data-testid="test menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenu: [],
};

export default Menu;
