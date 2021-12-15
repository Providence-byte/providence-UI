var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
// import { CSSTransition } from "react-transition-group";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
var SubMenu = function (props) {
    var className = props.className, index = props.index, title = props.title, children = props.children;
    var context = useContext(MenuContext);
    var opendSubMenu = context.defaultOpenSubMenu;
    // index表示subMenu在Menu中是第几项
    var isOpen = index && context.mode === "vertical" ? opendSubMenu.includes(index) : false;
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames("submenu-item menu-item", className, {
        "is-active": context.index === index,
        vertical: context.mode === "vertical",
        "menu-open": menuOpen,
    });
    var renderElement = function () {
        var classes = classNames("submenu", {
            "menu-open": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Wraning: Menu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: classes }, childrenComponent)));
    };
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 100);
    };
    // 根据不同的mode显示不同的鼠标事件，横向为hover触发，纵向为click触发
    var clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    return (
    // 使用对象展开的形式给元素添加不同的鼠标事件
    React.createElement("li", __assign({ key: index, className: classes, title: title }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderElement()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
