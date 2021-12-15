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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
// import Button from "../Botton/button";
import Dragger from "./dragger";
import UploadList from "./uploadList";
import axios from "axios";
/** 通过点击或者拖拽上传文件
 *
 *  ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 */
export var Upload = function (props) {
    var actions = props.actions, header = props.header, name = props.name, data = props.data, drag = props.drag, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, children = props.children;
    var fileRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var handleUpload = function () {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };
    // updateFileList函数接受两个参数，第一个为要更新的文件，第二项为更新哪些属性，
    // 类型为Partial<UploadFile>，让所有属性变为可选，以进行部分更新
    var updateFileList = function (updataFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updataFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            name: file.name,
            size: file.size,
            status: "ready",
            percent: 0,
            raw: file,
        };
        // 在多选的时候fileList不能及时更新，只会显示最后一个加入的文件
        // 因此我们要用函数形式更新
        setFileList(function (fileList) { return __spreadArray([_file], fileList, true); });
        var formData = new FormData();
        formData.append(name || "file", file);
        // 添加用户自定义数据
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(actions, formData, {
            headers: __assign(__assign({}, header), { "Content-Type": "mutipart/form-data" }),
            // 是否携带cookie
            withCredentials: withCredentials,
            //   axios 自带progress
            onUploadProgress: function (e) {
                //   计算进度
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                // 更新进度及状态
                updateFileList(_file, { percent: percentage, status: "uploading" });
                // console.log(percentage);
                if (percentage < 100) {
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (res) {
            console.log(res);
            updateFileList(_file, { status: "success", response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            console.error(err);
            updateFileList(_file, { status: "error", error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    var uploadFiles = function (files) {
        //   把类数组FileList 转成数组
        var postFile = Array.from(files);
        postFile.forEach(function (file) {
            // 如果beforeUpload函数存在，发送处理后的结果
            if (beforeUpload) {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
            else {
                post(file);
            }
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };
    var handleRemove = function (file) {
        setFileList(fileList.filter(function (item) {
            return item.uid !== file.uid;
        }));
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: "upload" },
        React.createElement("div", { onClick: handleUpload }, drag ? (React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }, children)) : (children)),
        React.createElement("input", { type: "file", ref: fileRef, onChange: handleFileChange, hidden: true, accept: accept, multiple: multiple, "data-testid": 'hidden-input' }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: "file",
};
export default Upload;
