import React, { useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";
var Option = function (props) {
    var _a;
    var disabled = props.disabled, value = props.value, index = props.index, className = props.className;
    var context = useContext(SelectContext);
    var classes = classNames("option-item", className, {
        "is-disabled": disabled,
        "is-active": (_a = context.selectedArr) === null || _a === void 0 ? void 0 : _a.includes(value),
    });
    var handleClick = function () {
        if (context.onSelected && typeof index === "number" && !disabled) {
            // 当我们在if中加上判断类型的条件，if里的数据会自动转成对应类型
            context.onSelected(index, value);
        }
    };
    return (React.createElement("li", { className: classes, onClick: handleClick }, value));
};
Option.defaultProps = {
    disabled: false,
};
Option.displayName = "Option";
export default Option;
