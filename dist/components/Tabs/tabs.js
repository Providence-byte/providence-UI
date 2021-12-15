import React, { createContext, cloneElement, useState } from "react";
import classNames from "classnames";
export var TabsContext = createContext({ index: "0" });
/**选择不同的Tab项以展示不同的内容
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, onSelect = props.onSelect, type = props.type, className = props.className, style = props.style, children = props.children, contentClass = props.contentClass;
    var _a = useState(defaultIndex), currentIndex = _a[0], setCurrentIndex = _a[1];
    // 这段代码是 迫不得已之举 请谨慎使用
    var defaultContent = React.Children.map(children, function (child, index) {
        var childElement = child;
        return childElement;
    });
    var defaultChildren = defaultContent ? defaultContent[0].props.children : null;
    var _b = useState(defaultChildren), currentContent = _b[0], setCurrentContent = _b[1];
    var classes = classNames("tabs", className, {
        "tabs-card": type === "card",
    });
    var contentClasses = classNames("tabs-content", contentClass);
    var TabIndex = currentIndex;
    var handleClick = function (index, content) {
        setCurrentIndex(index);
        setCurrentContent(content);
        if (onSelect) {
            onSelect(index);
        }
    };
    // 传给子组件的context值
    var passedContext = {
        index: TabIndex,
        onSelected: handleClick,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "TabsItem") {
                return cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error("Wraning: Tabs has a child which is not a TabsItem component");
            }
        });
    };
    return (React.createElement(TabsContext.Provider, { value: passedContext },
        React.createElement("div", { className: "tabs-wrapper", style: style },
            React.createElement("ul", { className: classes, "data-testid": 'Tabs test' }, renderChildren()),
            React.createElement("div", { className: contentClasses }, currentContent))));
};
Tabs.defaultProps = {
    defaultIndex: "0",
    type: "line",
};
export default Tabs;
