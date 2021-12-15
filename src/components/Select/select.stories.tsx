import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions"
import { Select, SelectProps } from "./select";
import Option from "./option";

export const Controls: Story<SelectProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Select {...props}>
      <Option value="111" />
      <Option value="222" disabled/>
      <Option value="333" />
    </Select>
  </div>
);
Controls.storyName = "可控样式";

Controls.args = {
  placeholder: "请选择",
  multiple: false,
  disabled: false,
  className: "",
  onChange:action("select")
};

export const selectWithMultiple: Story<SelectProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Select {...props}>
      <Option value="111" />
      <Option value="222" disabled/>
      <Option value="333" />
    </Select>
  </div>
);
selectWithMultiple.storyName = "支持多选";

selectWithMultiple.args = {
  placeholder: "请选择",
  multiple: true,
  disabled: false,
  className: "",
  onChange:action("select")
};

export default {
  title: "component/Select",
  component: Select,
  argTypes: {
    name: {
      control: { type: "text" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<SelectProps>;
