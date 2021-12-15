import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";
import Icon from "../Icon/icon";
var TabsItem = function (props) {
    var context = useContext(TabsContext);
    var index = props.index, title = props.title, disabled = props.disabled, className = props.className, style = props.style, children = props.children, icon = props.icon;
    console.log(children);
    var classes = classNames("tabs-item", className, {
        "is-active": context.index === index,
        "is-disabled": disabled,
    });
    var handleClick = function () {
        if (context.onSelected && !disabled && typeof index === "string") {
            context.onSelected(index, children);
        }
    };
    return (React.createElement("li", { className: classes, onClick: handleClick, style: style, "data-testid": 'tabs item' }, icon ? (React.createElement(React.Fragment, null,
        React.createElement(Icon, { icon: "ban" }),
        React.createElement("span", null, title))) : (title)));
};
TabsItem.defaultProps = {
    disabled: false,
};
TabsItem.displayName = "TabsItem";
export default TabsItem;
