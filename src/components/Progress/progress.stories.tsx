import { Story, Meta } from "@storybook/react";
import { Progress, ProgressProps } from "./progress";

export const Controls: Story<ProgressProps> = ({ ...props }) => (
  <div style={{ width: "500px" }}>
    <Progress {...props}></Progress>
  </div>
);

Controls.storyName = "可控样式";
Controls.args = {
  percent: 50,
  strokeHeight: 30,
  showText: true,
  theme: "primary",
};

export default {
  title: "component/Progress",
  component: Progress,
  ArgsType: {
    percent: {
      options: { min: 0, max: 100 },
      control: { type: "range" },
    },
    theme: {
      options: ["primary", "danger", "warning"],
      control: { type: "select" },
    },
    showText: {
      control: { type: "boolean" },
    },
    strokeHeight: {
      control: { type: "number" },
    },
  },
} as Meta<ProgressProps>;
