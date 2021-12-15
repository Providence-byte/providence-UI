var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, createContext, useRef, } from "react";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
export var SelectContext = createContext({ index: 0 });
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Select } from 'providence'
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, onChange = props.onChange, onVisibleChange = props.onVisibleChange, className = props.className, children = props.children;
    var _a = useState(false), optionOpen = _a[0], setOptionOpen = _a[1];
    var _b = useState(defaultValue), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), multipleValue = _c[0], setMultipleValue = _c[1];
    var componentRef = useRef(null);
    var classes = classNames("select", className, {
        "option-open": optionOpen,
    });
    var renderElement = function () {
        var cnames = classNames("select-dropdown");
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "Option") {
                return React.cloneElement(childElement, {
                    index: i,
                });
            }
            else {
                console.error("Wraning: Menu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: optionOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: cnames }, childrenComponent)));
    };
    var handleVisibleOption = function () {
        setOptionOpen(true);
        if (onVisibleChange) {
            onVisibleChange(true);
        }
    };
    var handleClick = function (index, value) {
        if (!multiple) {
            setInputValue(value);
            setOptionOpen(false);
            if (onChange) {
                onChange(value, []);
            }
        }
        else {
            if (!multipleValue.includes(value)) {
                multipleValue.push(value);
            }
            setMultipleValue(__spreadArray([], multipleValue, true));
            if (onChange) {
                onChange('', __spreadArray([], multipleValue, true));
            }
        }
    };
    var handleCancelSelect = function (item) {
        setMultipleValue(multipleValue.filter(function (value) { return value !== item; }));
    };
    // 我们要通过context传给子组件的属性和方法
    var passedContext = {
        index: 0,
        onSelected: handleClick,
        selectedArr: multipleValue,
    };
    useClickOutside(componentRef, function () {
        setOptionOpen(false);
    });
    return (React.createElement("div", { className: classes, ref: componentRef },
        React.createElement(Input, { placeholder: multipleValue.length > 0 ? "" : placeholder, disabled: disabled, onClick: handleVisibleOption, readOnly: true, value: inputValue, className: "select-input" }),
        multiple ? (React.createElement("ul", { className: "selected-list" }, multipleValue.map(function (item, index) {
            return (React.createElement("li", { className: "selected-item", key: index },
                item,
                React.createElement("span", { className: "cancel-select", onClick: function () { return handleCancelSelect(item); } },
                    React.createElement(Icon, { icon: "times" }))));
        }))) : null,
        React.createElement("span", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        React.createElement(SelectContext.Provider, { value: passedContext }, renderElement())));
};
export default Select;
