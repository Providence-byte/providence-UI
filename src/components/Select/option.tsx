import React, { FC, useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";
export interface OptionProps {
  disabled?: boolean;
  value: string;
  label?: string;
  index?: number;
  className?: string;
}

const Option: FC<OptionProps> = (props) => {
  const { disabled, value, index, className } = props;
  const context = useContext(SelectContext);
  const classes = classNames("option-item", className, {
    "is-disabled": disabled,
    "is-active": context.selectedArr?.includes(value),
  });
  const handleClick = () => {
    if (context.onSelected && typeof index === "number" && !disabled) {
      // 当我们在if中加上判断类型的条件，if里的数据会自动转成对应类型
      context.onSelected(index, value);
    }
  };
  return (
    <li className={classes} onClick={handleClick}>
      {value}
    </li>
  );
};

Option.defaultProps = {
  disabled: false,
};
Option.displayName = "Option";

export default Option;
