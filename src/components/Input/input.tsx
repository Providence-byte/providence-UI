import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
import classNames from "classnames";

export type InputSize = "lg" | "sm";

// Omit可以忽略相同的内置属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** 是否禁用  */
  disabled?: boolean;
  size?: InputSize;
  /** 表单上的图标  */
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  /** 受控组件，自定义onChange事件*/
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *  */

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    ...restProps
  } = props;
  const classes = classNames("input-wrapper", className, {
    [`input-${size}`]: size,
    "is-disabled": disabled,
    // 为什么需要在wrapper上加这几个类？为的是处理左右边框问题
    "input-group": prepend || append,
    "input-prepend": !!prepend,
    "input-append": !!append,
    // 处理有图标组件时placeholder的padding问题
    "input-icon": icon,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  // 当组件为受控组件时，同时添加value 和 defaultValue 会报错
  // 因此当value属性存在时,删除默认的defaultValue
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} size="lg" title={`title-${icon}`} />
        </div>
      )}
      <input type="text" className="input" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
