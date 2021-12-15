import React from "react";
import classNames from "classnames";
/**进度条，传入可变的percent来改变进度
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */
export var Progress = function (props) {
    var _a;
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    var classes = classNames("progess-inner", (_a = {}, _a["progress-".concat(theme)] = theme, _a));
    return (React.createElement("div", { className: "progress-wrapper", style: styles },
        React.createElement("div", { style: { height: "".concat(strokeHeight, "px") }, className: "progress-outer" },
            React.createElement("div", { className: classes, style: { width: "".concat(percent, "%") } }, showText && "".concat(percent, "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
