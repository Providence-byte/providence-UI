import { Story, Meta } from "@storybook/react";
import Icon, { IconProps } from "./icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Controls: Story<IconProps> = ({ ...props }) => (
  <Icon {...props} icon="coffee"></Icon>
);
Controls.storyName = "可控样式";

Controls.args = {
  size: "lg",
  theme: "secondary",
  className: "",
};
export const IconWithSize: Story<IconProps> = ({ ...props }) => (
  <div
    style={{ display: "flex", width: "500px", justifyContent: "space-around",alignItems:"flex-end" }}
  >
    <Icon {...props} icon="spinner" spin size="sm" theme='dark'></Icon>
    <Icon {...props} icon="atom" size="lg" theme='primary'></Icon>
    <Icon {...props} icon="balance-scale" size="2x" theme='info'></Icon>
    <Icon {...props} icon="download" size="3x" theme='secondary'></Icon>
    <Icon {...props} icon="heart" size="4x" theme='danger'></Icon>
  </div>
);
IconWithSize.storyName = "不同大小的Icon";

IconWithSize.args = {
  size: "lg",
  theme: "danger",
  className: "",
};

export const IconWithTheme: Story<IconProps> = ({ ...props }) => (
  <div
    style={{ display: "flex", width: "500px", justifyContent: "space-around",alignItems:"flex-end" }}
  >
    <Icon {...props} icon='sync-alt' spin  theme='success'></Icon>
    <Icon {...props} icon="shopping-cart"  theme='primary'></Icon>
    <Icon {...props} icon="inbox"  theme='info'></Icon>
    <Icon {...props} icon="grin-tongue-wink"  theme='secondary'></Icon>
    <Icon {...props} icon="fire-alt"  theme='danger'></Icon>
  </div>
);
IconWithTheme.storyName = "不同主题色的Icon";

IconWithTheme.args = {
  size: "3x",
  theme: "danger",
  className: "",
};

export default {
  title: "component/Icon",
  component: Icon,
  argTypes: {
    size: {
      options: ["xs", "sm", "lg", "1x", "2x", "3x", "4x", "5x"],
      control: { type: "select" },
    },
    theme: {
      options: [
        "primary",
        "danger",
        "secondary",
        "success",
        "info",
        "warning",
        "light",
        "dark",
      ],
      control: { type: "select" },
    },
    className: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
在 providence 中我们提供了多种大小，主题的Icon。
            
           `,
      },
    },
  },
} as Meta<typeof Icon>;
