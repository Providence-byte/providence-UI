import React from "react";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "upload-file-list" }, fileList.map(function (file) {
        return (React.createElement("li", { className: "upload-file-list-item", key: file.uid },
            React.createElement("div", { className: "file-item-content" },
                React.createElement("span", { className: "file-name file-name-".concat(file.status) },
                    React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                    React.createElement("span", null, file.name)),
                React.createElement("span", { className: "file-status" },
                    file.status === "uploading" ? (React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" })) : null,
                    file.status === "success" ? (React.createElement(Icon, { icon: "check-circle", theme: "success" })) : null,
                    file.status === "error" ? (React.createElement(Icon, { icon: "times-circle", theme: "danger" })) : null),
                React.createElement("span", { className: "file-remove", onClick: function () {
                        onRemove(file);
                    } },
                    React.createElement(Icon, { icon: "times", theme: "dark" }))),
            (file.percent && file.status === "uploading") ? (React.createElement(Progress, { strokeHeight: 2, showText: false, percent: file.percent })) : null));
    })));
};
export default UploadList;
