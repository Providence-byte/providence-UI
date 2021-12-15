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
import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Alert } from 'providence'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var _b = useState(true), close = _b[0], setClose = _b[1];
    var alertType = props.alertType, title = props.title, isClose = props.isClose, content = props.content, className = props.className, restProps = __rest(props, ["alertType", "title", "isClose", "content", "className"]);
    var classes = classNames("alert", className, (_a = {},
        _a["alert-".concat(alertType)] = alertType,
        _a));
    var handleClose = function () {
        setClose(false);
    };
    return (React.createElement(Transition, { in: close, timeout: 300, animation: "zoom-out-top" }, content ? (React.createElement("div", __assign({ className: classes }, restProps),
        React.createElement("div", { className: "alert-title" },
            React.createElement("div", null, title),
            isClose ? (React.createElement("span", { onClick: handleClose, "data-testid": "test close" },
                React.createElement(Icon, { icon: "times", size: "2x" }))) : null),
        React.createElement("h5", null, content))) : (React.createElement("div", __assign({ className: classes }, restProps),
        React.createElement("div", { className: "alert-title" },
            React.createElement("div", null, title),
            isClose ? (React.createElement("span", { onClick: handleClose, "data-testid": "test close" },
                React.createElement(Icon, { icon: "times" }))) : null)))));
};
Alert.defaultProps = {
    alertType: 'default',
    isClose: false,
    title: "this is a alert",
};
export default Alert;
