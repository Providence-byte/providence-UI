import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
export interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-file-list">
      {fileList.map((file) => {
        return (
          <li className="upload-file-list-item" key={file.uid}>
            <div className="file-item-content">
              <span className={`file-name file-name-${file.status}`}>
                <Icon icon="file-alt" theme="secondary"></Icon>
                <span>{file.name}</span>
              </span>
              <span className="file-status">
                {file.status === "uploading" ? (
                  <Icon icon="spinner" spin theme="primary"></Icon>
                ) : null}
                {file.status === "success" ? (
                  <Icon icon="check-circle" theme="success"></Icon>
                ) : null}
                {file.status === "error" ? (
                  <Icon icon="times-circle" theme="danger"></Icon>
                ) : null}
              </span>
              <span
                className="file-remove"
                onClick={() => {
                  onRemove(file);
                }}
              >
                <Icon icon="times" theme="dark"></Icon>
              </span>
            </div>
            {(file.percent && file.status === "uploading") ? (
              <Progress
                strokeHeight={2}
                showText={false}
                percent={file.percent}
              ></Progress>
            ):null}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
