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
import classNames from "classnames";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Icon } from 'providence'
 * ~~~
 */
export var Icon = function (props) {
    var _a;
    var theme = props.theme, className = props.className, restProps = __rest(props, ["theme", "className"]);
    var classes = classNames("icon", className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return React.createElement(FontAwesomeIcon, __assign({ className: classes }, restProps));
};
export default Icon;
