import React, {
  FC,
  FunctionComponentElement,
  useState,
  createContext,
  useRef,
} from "react";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import classNames from "classnames";
import { OptionProps } from "./option";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectProps {
  defaultValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  name?: string;
  className?: string;
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  onVisibleChange?: (visible: boolean) => void;
}

type SelectCallBack = (selectIndex: number, value: string) => void;
interface ISelectContext {
  index: number;
  onSelected?: SelectCallBack;
  selectedArr?: string[];
}
export const SelectContext = createContext<ISelectContext>({ index: 0 });

/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * 
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Select } from 'providence'
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    disabled,
    multiple,
    onChange,
    onVisibleChange,
    className,
    children,
  } = props;
  const [optionOpen, setOptionOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const componentRef = useRef(null);
  const classes = classNames("select", className, {
    "option-open": optionOpen,
  });
  const renderElement = () => {
    const cnames = classNames("select-dropdown");
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        return React.cloneElement(childElement, {
          index: i,
        });
      } else {
        console.error(
          "Wraning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={optionOpen} timeout={300} animation="zoom-in-top">
        <ul className={cnames}>{childrenComponent}</ul>
      </Transition>
    );
  };
  const handleVisibleOption = () => {
    setOptionOpen(true);
    if (onVisibleChange) {
      onVisibleChange(true);
    }
  };

  const handleClick = (index: number, value: string) => {
    if (!multiple) {
      setInputValue(value);
      setOptionOpen(false);
      if (onChange) {
        onChange(value, []);
      }
    } else {
      if(!multipleValue.includes(value)){
        multipleValue.push(value);
      }
      setMultipleValue([...multipleValue]);
      if (onChange) {
        onChange('', [...multipleValue]);
      }
    }
  };
  const handleCancelSelect = (item: string) => {
    setMultipleValue(multipleValue.filter((value) => value !== item));
  };
  // 我们要通过context传给子组件的属性和方法
  const passedContext: ISelectContext = {
    index: 0,
    onSelected: handleClick,
    selectedArr: multipleValue,
  };
  useClickOutside(componentRef, () => {
    setOptionOpen(false);
  });
  return (
    <div className={classes} ref={componentRef}>
      <Input
        placeholder={multipleValue.length > 0 ? "" : placeholder}
        disabled={disabled}
        onClick={handleVisibleOption}
        readOnly
        value={inputValue}
        className="select-input"
      />
      {multiple ? (
        <ul className="selected-list">
          {multipleValue.map((item,index) => {
            return (
              <li className="selected-item" key={index}>
                {item}
                <span
                  className="cancel-select"
                  onClick={() => handleCancelSelect(item)}
                >
                  <Icon icon="times" />
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
      <span className="icon-wrapper">
        <Icon icon={"angle-down"} className="arrow-icon"></Icon>
      </span>
      <SelectContext.Provider value={passedContext}>
        {renderElement()}
      </SelectContext.Provider>
    </div>
  );
};

export default Select;
