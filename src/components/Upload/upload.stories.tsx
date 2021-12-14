import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import Upload, { UploadProps, UploadFile } from "./upload";
import Button from "../Botton/button";
import Icon from "../Icon/icon";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];

const checkUploadSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too much");
    return false;
  } else {
    return true;
  }
};
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};

export const Default: Story<UploadProps> = ({ ...props }) => (
  <div style={{ width: "300px" }}>
    <Upload
      {...props}
      name="fileName"
      header={{ "X-Powered-By": "provience" }}
      beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      accept=".docx"
    >
      <Button btnType="primary">点击上传</Button>
    </Upload>
  </div>
);

Default.storyName = "默认样式";
Default.args = {
  actions: "https://jsonplaceholder.typicode.com/posts",
  onProgress: action("onProgress"),
  onSuccess: action("onSuccess"),
  onError: action("onError"),
  onChange: action("changed"),
};

export const uploadWithMultiple: Story<UploadProps> = ({ ...props }) => (
  <div style={{ width: "300px" }}>
    <Upload
      {...props}
      name="fileName"
      header={{ "X-Powered-By": "provience" }}
      beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      accept=".docx"
      multiple={true}
    >
      <Button btnType="primary">多文件上传</Button>
    </Upload>
  </div>
);

uploadWithMultiple.storyName = "支持多文件上传";
uploadWithMultiple.args = {
  actions: "https://jsonplaceholder.typicode.com/posts",
  onProgress: action("onProgress"),
  onSuccess: action("onSuccess"),
  onError: action("onError"),
  onChange: action("changed"),
};

export const uploadWithDrag: Story<UploadProps> = ({ ...props }) => (
  <div style={{ width: "300px" }}>
    <Upload
      {...props}
      name="fileName"
      header={{ "X-Powered-By": "provience" }}
      beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      accept=".docx"
      drag={true}
    >
      <Icon icon="upload" size="3x" theme="secondary"></Icon>
      <br />
      <p>将文件拖到此处上传</p>
    </Upload>
  </div>
);

uploadWithDrag.storyName = "支持拖拽式上传";
uploadWithDrag.args = {
  actions: "https://jsonplaceholder.typicode.com/posts",
  onProgress: action("onProgress"),
  onSuccess: action("onSuccess"),
  onError: action("onError"),
  onChange: action("changed"),
};

export default {
  title: "component/Upload",
  component: Upload,
  argType: {
    actions: {
      control: { type: "text" },
    },
  },
} as Meta<UploadProps>;
