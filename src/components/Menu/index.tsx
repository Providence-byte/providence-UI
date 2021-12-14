import {FC} from "react";
import Menu,{BaseMenuProps} from "./menu";
import MenuItem,{BaseMenuItemProps} from "./menuitem";
import SubMenu,{SubMenuProps} from "./submenu";

// 使用交叉类型让MenuItem和SubMenu成为Menu的属性
export type IMenu = FC<BaseMenuProps> & {
    Item:FC<BaseMenuItemProps>,
    SubMenu:FC<SubMenuProps>
}

const TransMenu = Menu as IMenu;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu