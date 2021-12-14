import React, { ChangeEvent, Children, FC, useRef, useState } from "react";
import Button from "../Botton/button";
import Dragger from "./dragger";
import UploadList from "./uploadList";
import axios from "axios";

type UploadStatus = "ready" | "uploading" | "success" | "error";
// 上传文件的信息
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: UploadStatus;
  percent?: number;
  // 源文件
  raw?: File;
  response?: any;
  error?: any;
}

// upload组件的props
export interface UploadProps {
  /** 是否禁用  */
  actions: string;

  /** 自定义请求头  */
  header?: { [key: string]: any };

  /** 自定义文件名  */
  name?: string;

  /** 携带的数据  */
  data?: { [key: string]: any };

  /** 是否携带cookie  */
  withCredentials?: boolean;

  /** 支持上传什么格式的文件 */
  accept?: string;

  /** 是否支持多选 */
  multiple?: boolean;

  /** 是否支持拖拽上传 */
  drag?: boolean;

  /** 默认的上传列表 */
  defaultFileList?: UploadFile[];

  /** 文件上传前用户自定义的回调 */
  beforeUpload?: (file: File) => boolean | Promise<File>;

  /** 文件上传中用户自定义的回调 */
  onProgress?: (percentage: number, file: File) => void;

  /** 文件上传成功后用户自定义的回调 */
  onSuccess?: (data: any, file: File) => void;

  /** 文件上传失败用户自定义的回调 */
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;

  /** 文件删除的回调 */
  onRemove?: (file: UploadFile) => void;
}

/** 通过点击或者拖拽上传文件
 * 
 *  ### 引用方法
 * 
 * ~~~js
 * 
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 */

export const Upload: FC<UploadProps> = (props) => {
  const {
    actions,
    header,
    name,
    data,
    drag,
    withCredentials,
    accept,
    multiple,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    children,
  } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  // updateFileList函数接受两个参数，第一个为要更新的文件，第二项为更新哪些属性，
  // 类型为Partial<UploadFile>，让所有属性变为可选，以进行部分更新
  const updateFileList = (
    updataFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updataFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
      raw: file,
    };
    // 在多选的时候fileList不能及时更新，只会显示最后一个加入的文件
    // 因此我们要用函数形式更新
    setFileList((fileList) => [_file, ...fileList]);
    const formData = new FormData();
    formData.append(name || "file", file);
    // 添加用户自定义数据
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(actions, formData, {
        headers: {
          ...header,
          "Content-Type": "mutipart/form-data",
        },
        // 是否携带cookie
        withCredentials,
        //   axios 自带progress
        onUploadProgress: (e) => {
          //   计算进度
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
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
      .then((res) => {
        console.log(res);
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
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
  const uploadFiles = (files: FileList) => {
    //   把类数组FileList 转成数组
    const postFile = Array.from(files);
    postFile.forEach((file) => {
      // 如果beforeUpload函数存在，发送处理后的结果
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList(
      fileList.filter((item) => {
        return item.uid !== file.uid;
      })
    );
    if (onRemove) {
      onRemove(file);
    }
  };

  return (
    <div className="upload">
      <div onClick={handleUpload}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
      </div>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        hidden
        accept={accept}
        multiple={multiple}
        data-testid = 'hidden-input'
      />
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
