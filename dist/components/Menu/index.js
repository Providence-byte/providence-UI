import Menu from "./menu";
import MenuItem from "./menuitem";
import SubMenu from "./submenu";
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
