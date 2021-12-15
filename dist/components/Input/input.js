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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import Icon from "../Icon/icon";
import classNames from "classnames";
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Icon } from 'providence'
 * ~~~
 *
 *  */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "className"]);
    var classes = classNames("input-wrapper", className, (_a = {},
        _a["input-".concat(size)] = size,
        _a["is-disabled"] = disabled,
        // 为什么需要在wrapper上加这几个类？为的是处理左右边框问题
        _a["input-group"] = prepend || append,
        _a["input-prepend"] = !!prepend,
        _a["input-append"] = !!append,
        // 处理有图标组件时placeholder的padding问题
        _a["input-icon"] = icon,
        _a));
    var fixControlledValue = function (value) {
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
    return (React.createElement("div", { className: classes },
        prepend && React.createElement("div", { className: "input-group-prepend" }, prepend),
        icon && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, size: "lg", title: "title-".concat(icon) }))),
        React.createElement("input", __assign({ type: "text", className: "input", disabled: disabled }, restProps)),
        append && React.createElement("div", { className: "input-group-append" }, append)));
};
Input.defaultProps = {
    disabled: false,
};
export default Input;
