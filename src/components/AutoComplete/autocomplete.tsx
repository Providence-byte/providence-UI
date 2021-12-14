import React, {
  ChangeEvent,
  FC,
  useState,
  useEffect,
  ReactElement,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Transition from "../Transition/transition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

interface DataSourceObject {
  value: string;
}
// 用户给的类型不确定，用 泛型 加 string 交叉类型来表示
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutocompleteProps extends Omit<InputProps, "onSelect"> {
  // 同时也要支持异步
  fatchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  // item会自动转换为DataSourceObject类型，传DateSourceType<complexObj>类型会报错？？？🤔
  costomOption?: (item: DataSourceType) => ReactElement;
  onSelect?: (item: DataSourceType) => void;
}

/** 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Autocomplete } from 'providence'
 * ~~~
 */
export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const {
    fatchSuggestions,
    onSelect,
    costomOption,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [highLightIndex, setHighLightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue);
  // 用useRef保存值，能保证整个生命周期中不变，而useState会触发组件渲染
  // 1.当作一个不会触发渲染的state使用
  const triggerSearch = useRef(false);
  // 2.将 ref 对象以 <div ref={myRef} /> 形式传入组件，则无论该节点如何改变，
  // React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setShowDropdown(false);
    // setLoading(false)
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      // ?
      // setSuggestions([])
      const res = fatchSuggestions(debounceValue);
      // 当我们做完判断时，TS会自动帮我们区分类型
      if (res instanceof Promise) {
        setLoading(true);
        res &&
          res.then((data) => {
            setLoading(false);
            setSuggestions(data);
            if (data.length > 0) {
              setShowDropdown(true);
            }
          });
      } else {
        setSuggestions(res);
        setShowDropdown(true);
        if (res.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    // 每次更新完input框中的值后，都要重置highlightIndex
    setHighLightIndex(-1);
  }, [debounceValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const highLight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      // 回车键
      case "Enter":
        // 在加载时按enter,suggestions还没有，会报错
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex]);
        }
        break;
      // 向上箭头
      case "ArrowUp":
        console.log(11);
        highLight(highLightIndex - 1);
        break;
      // 向下箭头
      case "ArrowDown":
        highLight(highLightIndex + 1);
        break;
      // ESC
      case "Escape":
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (data: DataSourceType) => {
    // 此时data已为obj类型，取出其中的value再赋值
    setInputValue(data.value);
    setShowDropdown(false);
    // 触发用户回调
    if (onSelect) {
      onSelect(data);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return costomOption ? costomOption(item) : item.value;
  };

  const generateDropDown = () => {
    const cnames = classNames("dropdown-list",{
      'list-border':suggestions.length>0 || loading
    })
    return (
      <Transition
        in={showDropdown || loading}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className={cnames}>
          {loading ? (
            <div className="loading">
              <Icon icon="spinner" spin size="2x"></Icon>
            </div>
          ) : null}
          {suggestions.map((item, index) => {
            const classes = classNames("dropdown-item", {
              "item-highlight": index === highLightIndex,
            });
            return (
              <li
                key={index}
                className={classes}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropDown()}
    </div>
  );
};

export default Autocomplete;
