import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelected && !disabled && (typeof index === 'string')) {
            context.onSelected(index);
        }
    };
    return (React.createElement("li", { style: style, className: classes, onClick: handleClick }, children));
};
MenuItem.defaultProps = {
    disabled: false,
};
// React内置静态属性，帮我们判断类型
MenuItem.displayName = 'MenuItem';
export default MenuItem;
