import { Story, Meta } from "@storybook/react";
import Autocomplete, {
  AutocompleteProps,
  DataSourceType,
} from "./autocomplete";

interface complexObj {
  value: string;
  num: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
export const Controls: Story<AutocompleteProps> = ({ ...props }) => {
  
  const arr = ['a','abb','abc','ddd'];
  const handleClick = (keyword: string) => {
    return arr.filter((item) => item.includes(keyword)).map(name=>({value:name}));
  };
  // 即使它是交叉类型，并且有泛型，我们也不能在作为函数参数时直接加上泛型，因为在定义函数的时候
  // 往往不知道这个泛型会是什么，简单说就是函数定义时参数的类型和函数调用时参数的类型必须完全一样
  // 要加泛型的话在函数里面加断言🕳😏


  return (
    <div style={{ width: "450px" }}>
      <Autocomplete
        {...props}
        fatchSuggestions={handleClick}
      />
    </div>
  );
};
Controls.storyName = "默认样式";

Controls.args = {
  className: "",
  placeholder: "这是一个auto-complete组件",
};

export const costomRender: Story<AutocompleteProps> = ({ ...props }) => {
  const arr = [
    { value: "aaa", num: 1 },
    { value: "bbb", num: 2 },
    { value: "acc", num: 3 },
    { value: "bcc", num: 4 },
    { value: "ddd", num: 5 },
  ];
  const handleClick = (keyword: string) => {
    return arr.filter((item) => item.value.includes(keyword));
  };
  // 即使它是交叉类型，并且有泛型，我们也不能在作为函数参数时直接加上泛型，因为在定义函数的时候
  // 往往不知道这个泛型会是什么，简单说就是函数定义时参数的类型和函数调用时参数的类型必须完全一样
  // 要加泛型的话在函数里面加断言🕳😏
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<complexObj>;
    return (
      <div>
        <h5>{itemWithGithub.value}</h5>
        <span>{itemWithGithub.num}</span>
      </div>
    );
  };

  return (
    <div style={{ width: "450px" }}>
      <Autocomplete
        {...props}
        fatchSuggestions={handleClick}
        costomOption={renderOption}
      />
    </div>
  );
};
costomRender.storyName = "自定义显示格式";

costomRender.args = {
  className: "",
  placeholder: "这是一个auto-complete组件",
};
export const anyncAutocomplete: Story<AutocompleteProps> = ({ ...props }) => {


  const handleClick = (keyword: string) => {
    return (
      fetch(`https://api.github.com/search/users?q=${keyword}`)
        // 返回response对象，调用json方法转成json
        .then((res) => res.json())
        .then(({ items }) => {
          return items
            .slice(0, 5)
            .map((item: any) => ({ value: item.login, ...item }));
        })
    );
  };
  // 即使它是交叉类型，并且有泛型，我们也不能在作为函数参数时直接加上泛型，因为在定义函数的时候
  // 往往不知道这个泛型会是什么，简单说就是函数定义时参数的类型和函数调用时参数的类型必须完全一样
  // 要加泛型的话在函数里面加断言🕳😏
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <div>
        <h5>{itemWithGithub.value}</h5>
        <span>{itemWithGithub.url}</span>
      </div>
    );
  };

  return (
    <div style={{ width: "450px" }}>
      <Autocomplete
        {...props}
        fatchSuggestions={handleClick}
        costomOption={renderOption}
      />
    </div>
  );
};
anyncAutocomplete.storyName = "异步autocomponent组件";

anyncAutocomplete.args = {
  className: "",
  placeholder: "这是一个auto-complete组件",
};

export default {
  title: "component/Autocomplete",
  component: Autocomplete,
} as Meta<AutocompleteProps>;
