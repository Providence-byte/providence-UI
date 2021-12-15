import { BaseHTMLAttributes, FC } from "react";
export declare type AlertType = "primary" | "default" | "warning" | "danger";
interface BaseAlertProps {
    alertType?: AlertType;
    title?: string;
    isClose?: boolean;
    content?: string;
    className?: string;
}
export declare type AlertProps = BaseAlertProps & BaseHTMLAttributes<HTMLDivElement>;
/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Alert } from 'providence'
 * ~~~
 */
export declare const Alert: FC<AlertProps>;
export default Alert;
