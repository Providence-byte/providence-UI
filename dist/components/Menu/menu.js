import React, { createContext, useState } from "react";
import classNames from "classnames";
// 创建一个Context对象，用interface约束，必须给默认值
export var MenuContext = createContext({ index: "0" });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Menu } from 'providence'
 * import { MenuItem } from 'providence'
 * import { SubMenu } from 'providence'
 * ~~~
 *
 * */
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, mode = props.mode, className = props.className, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenu = props.defaultOpenSubMenu;
    var _a = useState(defaultIndex), currentIndex = _a[0], setCurrentIndex = _a[1];
    var classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setCurrentIndex(index);
        // 如果用户回调存在，则在此处调用
        if (onSelect) {
            onSelect(index);
        }
    };
    // 我们要通过context传给子组件的属性和方法
    var passedContext = {
        index: currentIndex ? currentIndex : "0",
        onSelected: handleClick,
        mode: mode,
        defaultOpenSubMenu: defaultOpenSubMenu
    };
    // 定义一个函数，用React.Children.map遍历其子组件，再判断类型，
    // 若不是 'MenuItem',则报错
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // child.type上没有child的display等属性，要将其类型断言为React函数组件的实例
            // 他需要传一个props的泛型
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                // 以 element 元素为样板克隆并返回新的 React 元素。第二个参数中应包含新的 props，
                // 给MenuItem自带index
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Wraning: Menu has a child which is not a MenuItem or SubMenu component");
            }
        });
    };
    return (React.createElement("ul", { style: style, className: classes, "data-testid": "test menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenu: [],
};
export default Menu;
