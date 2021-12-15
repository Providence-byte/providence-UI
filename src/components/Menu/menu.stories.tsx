import { Story, Meta } from "@storybook/react";
import Menu, { BaseMenuProps } from "./menu";
import MenuItem from "./menuitem";
import SubMenu from "./submenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Controls: Story<BaseMenuProps> = ({ ...props }) => (
  <Menu {...props}>
    <MenuItem>link 1</MenuItem>
    <MenuItem>link 2</MenuItem>
    <MenuItem>link 3</MenuItem>
  </Menu>
);
Controls.storyName = "可控样式";

Controls.args = {
  mode: "horizontal",
  defaultIndex: "0",
  className: "",
};

export const menuWithMode: Story<BaseMenuProps> = ({ ...props }) => (
  <div>
    <Menu mode="horizontal" {...props}>
      <MenuItem>link 1</MenuItem>
      <MenuItem>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
    </Menu>
    <br />
    <Menu mode="vertical" {...props}>
      <MenuItem>link 1</MenuItem>
      <MenuItem>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
    </Menu>
  </div>
);
menuWithMode.storyName = "不同模式的菜单";

menuWithMode.args = {
  defaultIndex: "0",
  className: "",
};

export const menuWithSubmenu: Story<BaseMenuProps> = ({ ...props }) => (
  <div>
    <Menu mode="horizontal" {...props}>
      <MenuItem>link 1</MenuItem>
      <MenuItem>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 2</MenuItem>
        <MenuItem>drop 3</MenuItem>
      </SubMenu>
    </Menu>
    <br />
    <Menu mode="vertical" {...props}>
      <MenuItem>link 1</MenuItem>
      <MenuItem>link 2</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 2</MenuItem>
        <MenuItem>drop 3</MenuItem>
      </SubMenu>
    </Menu>
  </div>
);
menuWithSubmenu.storyName = "带有二级菜单";

menuWithSubmenu.args = {
  defaultIndex: "0",
  className: "",
};

export default {
  title: "component/Menu",
  component: Menu,
  argTypes: {
    mode: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
    defaultIndex: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<typeof Menu>;
