import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Tabs, { TabsProps } from "./tabs";
import TabsItem from "./tabsitem";

export const Controls: Story<TabsProps> = ({ ...props }) => (
  <Tabs {...props} onSelect={action("select")}>
    <TabsItem title="tab1">tab1 content</TabsItem>
    <TabsItem title="tab2" disabled>tab2 content</TabsItem>
    <TabsItem title="tab3">tab3 content</TabsItem>
  </Tabs>
);
Controls.storyName = "可控样式";

Controls.args = {
  type: "line",
  className: "",
  contentClass: "",
};

export default {
  title: "component/Tabs",
  component: Tabs,
  argTypes: {
    type: {
      options: ["card",'line'],
      control: { type: "select" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
在 providence 中我们提供了两种类型的Tab。
            
           `,
      },
    },
  },
} as Meta<typeof Tabs>;
