import { Story, Meta} from "@storybook/react";
import { Alert, AlertProps } from "../Alert/alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
// 默认按钮
export const Controls: Story<AlertProps> = ({ ...props }) => (
  <Alert {...props}/>
);
Controls.storyName = "可控样式";

Controls.args = {
  title: "this is a Alert",
  content: "this is contnet",
  isClose: true,
  alertType: "default",
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

// 不同类型的按钮
export const alertWithType: Story<AlertProps> = ({ ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "160px",
      width: "500px",
      justifyContent: "space-between",
    }}
  >
    <Alert alertType="primary" isClose/>
    <Alert alertType="danger" isClose/>
    <Alert alertType="warning" isClose/>
  </div>
);
alertWithType.storyName = "不同类型的警示框";

alertWithType.args = {
  alertType: "primary",
  isClose: true,
  className: "",
  href: "",
};

export default {
  title: "component/Alert",
  component: Alert,
  argTypes: {
    alertType: {
      options: ["primary", "danger", "warning"],
      control: { type: "select" },
    },
    content: {
      control: { type: "text" },
    },
    isClose: {
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
          
          默认按钮：用于没有主次之分的一组行动点。
          
          以及四种状态属性与上面配合使用。

          主按钮：用于主行动点，一个操作区域只能有一个主按钮。
          
          危险：删除/移动/修改权限等危险操作，一般需要二次确认。
          
          禁用：行动点不可用的时候，一般需要文案解释。
          
          链接按钮：一般用于链接，即导航至某位置。`,
      },
    },
  },
} as Meta<typeof Alert>;
