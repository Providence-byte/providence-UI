import React from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
    var handleFileChange = function (e) {
        // 获取fileList,类数组对象
        var files = e.target.files;
        // FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，
        // 并且可以轻松的将数据通过XMLHttpRequest.send() 方法发送出去
        if (files) {
            var uploadFile = files[0];
            var formData = new FormData();
            formData.append(uploadFile.name, uploadFile);
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "mutipart/form-data",
                },
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "App", style: { margin: "20px" } },
        React.createElement("header", { className: "App-header" },
            React.createElement("input", { type: "file", name: "myFile", onChange: handleFileChange }))));
}
export default App;
