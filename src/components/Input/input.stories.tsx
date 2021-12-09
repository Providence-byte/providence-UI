import { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import Input, { InputProps } from "./input";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Controls: Story<InputProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Input {...props}  onChange={action('changed')} />
  </div>
);
Controls.storyName = "可控样式";
Controls.args = {
  placeholder: "一个漂亮的input输入框",
  size: "lg",
  disabled: false,
  /** 自定义样式类  */
  className: "",
  append: ".com",
  prepend: "http://",
};
export const InputWithSize: Story<InputProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Input size="lg" {...props} />
    <br />
    <br />
    <Input size="sm" {...props} />
  </div>
);
InputWithSize.storyName = "不同大小的Input";
InputWithSize.args = {
  placeholder: "一个漂亮的input输入框",
  disabled: false,
  /** 自定义样式类  */
  className: "",
};
export const InputWithIcon: Story<InputProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Input icon="user" {...props} />
    <Input icon="lock" {...props} />
  </div>
);
InputWithIcon.storyName = "带图标的Input";
InputWithIcon.args = {
  placeholder: "一个带图标的input输入框",
  disabled: false,
  size: "lg",
  /** 自定义样式类  */
  className: "",
};
export const InputWithAppend: Story<InputProps> = ({ ...props }) => (
  <div style={{ width: "450px" }}>
    <Input prepend="http://" {...props} />
    <br />
    <br />
    <Input append=".com" {...props} />
  </div>
);
InputWithAppend.storyName = "带前后缀的Input";
InputWithAppend.args = {
  placeholder: "一个漂亮的input输入框",
  disabled: false,
  size: "lg",
  /** 自定义样式类  */
  className: "",
};

export const Controlled: Story<InputProps> = ({ ...props }) => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "450px" }}>
      <Input
        value={value}
        onChange={(e)=>{setValue(e.target.value)}}
        {...props}
      />
    </div>
  );
};
Controlled.storyName = "受控组件";
Controlled.args = {
  placeholder: "受控组件",
  disabled: false,
};

export default {
  title: "component/Input",
  component: Input,
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: { type: "inline-radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    prepend: {
      control: { type: "text" },
    },
    append: {
      control: { type: "text" },
    },
  },
} as Meta<typeof Input>
