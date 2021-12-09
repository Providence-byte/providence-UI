import { Story, Meta } from "@storybook/react";
import Autocomplete, { AutocompleteProps } from "./autocomplete";

export const Controls: Story<AutocompleteProps> = ({ ...props }) => {
  const arr = ["aaa", "aab", "bcc", "ddd", "add"];
  const handleClick = (keyword: string) => {
    return arr.filter((val) => val.includes(keyword));
  };
  return <Autocomplete fatchSuggestions={handleClick} />;
};
Controls.storyName = "可控样式";

Controls.args = {
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
  title: "component/Autocomplete",
  component: Autocomplete,
} as Meta<AutocompleteProps>;
