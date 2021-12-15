import React from "react";
export declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallBack = (selectedIndex: string) => void;
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
export declare const MenuContext: React.Context<IMenuContext>;
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
export declare const Menu: React.FC<BaseMenuProps>;
export default Menu;
