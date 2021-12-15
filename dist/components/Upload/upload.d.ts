import { FC } from "react";
declare type UploadStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid: string;
    name: string;
    size: number;
    status?: UploadStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 是否禁用  */
    actions: string;
    /** 自定义请求头  */
    header?: {
        [key: string]: any;
    };
    /** 自定义文件名  */
    name?: string;
    /** 携带的数据  */
    data?: {
        [key: string]: any;
    };
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
export declare const Upload: FC<UploadProps>;
export default Upload;
