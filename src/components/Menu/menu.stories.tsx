import { Story, Meta } from "@storybook/react";
import Menu, { BaseMenuProps } from "./menu";
import MenuItem, { BaseMenuItemProps } from "./menuitem";
import SubMenu, { SubMenuProps } from "./submenu";
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
Controls.parameters = {
  docs: {
    description: {
      story: `
        在 providence 中我们提供了三种Alert。
  `,
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: `
              在 providence 中我们提供了三种大小按钮。
              `,
      },
    },
  },
} as Meta<typeof Menu>;
