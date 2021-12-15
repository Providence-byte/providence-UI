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
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Transition from "../Transition/transition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
/** 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Autocomplete } from 'providence'
 * ~~~
 */
export var Autocomplete = function (props) {
    var fatchSuggestions = props.fatchSuggestions, onSelect = props.onSelect, costomOption = props.costomOption, value = props.value, restProps = __rest(props, ["fatchSuggestions", "onSelect", "costomOption", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(-1), highLightIndex = _c[0], setHighLightIndex = _c[1];
    var _d = useState(true), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var debounceValue = useDebounce(inputValue);
    // 用useRef保存值，能保证整个生命周期中不变，而useState会触发组件渲染
    // 1.当作一个不会触发渲染的state使用
    var triggerSearch = useRef(false);
    // 2.将 ref 对象以 <div ref={myRef} /> 形式传入组件，则无论该节点如何改变，
    // React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setShowDropdown(false);
        // setLoading(false)
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            // ?
            // setSuggestions([])
            var res = fatchSuggestions(debounceValue);
            // 当我们做完判断时，TS会自动帮我们区分类型
            if (res instanceof Promise) {
                setLoading(true);
                res &&
                    res.then(function (data) {
                        setLoading(false);
                        setSuggestions(data);
                        if (data.length > 0) {
                            setShowDropdown(true);
                        }
                    });
            }
            else {
                setSuggestions(res);
                setShowDropdown(true);
                if (res.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        // 每次更新完input框中的值后，都要重置highlightIndex
        setHighLightIndex(-1);
    }, [debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var highLight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.code) {
            // 回车键
            case "Enter":
                // 在加载时按enter,suggestions还没有，会报错
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex]);
                }
                break;
            // 向上箭头
            case "ArrowUp":
                console.log(11);
                highLight(highLightIndex - 1);
                break;
            // 向下箭头
            case "ArrowDown":
                highLight(highLightIndex + 1);
                break;
            // ESC
            case "Escape":
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleSelect = function (data) {
        // 此时data已为obj类型，取出其中的value再赋值
        setInputValue(data.value);
        setShowDropdown(false);
        // 触发用户回调
        if (onSelect) {
            onSelect(data);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return costomOption ? costomOption(item) : item.value;
    };
    var generateDropDown = function () {
        var cnames = classNames("dropdown-list", {
            'list-border': suggestions.length > 0 || loading
        });
        return (React.createElement(Transition, { in: showDropdown || loading, timeout: 300, animation: "zoom-in-top", onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: cnames },
                loading ? (React.createElement("div", { className: "loading" },
                    React.createElement(Icon, { icon: "spinner", spin: true, size: "2x" }))) : null,
                suggestions.map(function (item, index) {
                    var classes = classNames("dropdown-item", {
                        "item-highlight": index === highLightIndex,
                    });
                    return (React.createElement("li", { key: index, className: classes, onClick: function () {
                            handleSelect(item);
                        } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropDown()));
};
export default Autocomplete;
