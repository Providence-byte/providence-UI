import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   // axios get请求第二个参数为config，post请求第二个参数为data，第三个参数为config
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/todos/1", {
  //       headers: {
  //         "X-Requested-With": "XMLHttpResquest",
  //       },
  //       responseType:'json'
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取fileList,类数组对象
    const files = e.target.files;
    // FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，
    // 并且可以轻松的将数据通过XMLHttpRequest.send() 方法发送出去
    if (files) {
      const uploadFile = files[0];
      const formData = new FormData();
      formData.append(uploadFile.name, uploadFile);
      axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      }).then(res=>{
        console.log(res);
        
      })
    }
  };
  return (
    <div className="App" style={{ margin: "20px" }}>
      <header className="App-header">
        <input type="file" name="myFile" onChange={handleFileChange} />
      </header>
    </div>
  );
}
export default App;
