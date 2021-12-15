import { FC } from "react";
import { BaseMenuProps } from "./menu";
import { BaseMenuItemProps } from "./menuitem";
import { SubMenuProps } from "./submenu";
export declare type IMenu = FC<BaseMenuProps> & {
    Item: FC<BaseMenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenu;
export default TransMenu;
