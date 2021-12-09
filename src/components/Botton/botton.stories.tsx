import { Story, Meta} from "@storybook/react";
import { Button, ButtonProps } from "../Botton/button";
import { action } from "@storybook/addon-actions";

// 默认按钮
export const Controls: Story<ButtonProps> = ({ ...props }) => (
  <Button {...props} onClick={action("default clicked")}>
    Controls Button
  </Button>
);
Controls.storyName = "可控样式";

Controls.args = {
  btnType: "default",
  size: "lg",
  disabled: false,
  className: "",
  href: "",
};
// 不同类型的按钮
export const buttonWithType: Story<ButtonProps> = ({ ...props }) => (
  <div
    style={{ display: "flex", width: "500px", justifyContent: "space-between" }}
  >
    <Button btnType="primary" onClick={action("primary clicked")}>
      Primary Button
    </Button>
    <Button btnType="danger" onClick={action("danger clicked")}>
      Danger Button
    </Button>
    <Button btnType="link" href="http://www.baidu.com">
      link Button
    </Button>
  </div>
);
buttonWithType.storyName = "不同类型的按钮";

buttonWithType.args = {
  btnType: "primary",
  disabled: false,
  className: "",
  href: "",
};
                                    

export const buttonWithSize: Story<ButtonProps> = ({ ...props }) => (
  <div>
    <Button
      size="lg"
      onClick={action("primary clicked")}
      style={{ marginRight: "20px" }}
    >
      Large Button
    </Button>
    <Button size="sm" onClick={action("danger clicked")}>
      Small Button
    </Button>
  </div>
);
buttonWithSize.storyName = "不同大小的按钮";

buttonWithType.args = {
  btnType: "default",
  size: "lg",
  disabled: false,
  className: "",
  href: "",
};
export default {
  title: "component/Button",
  component: Button,
  argTypes: {
    btnType: {
      options: ["primary", "danger", "default","link"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "lg"],
      control: { type: "inline-radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
    },
    href: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
        description: {
          story: `
          在 providence 中我们提供了三种大小按钮。
          
         `
        },
      },
  },
} as Meta<typeof Button>;
