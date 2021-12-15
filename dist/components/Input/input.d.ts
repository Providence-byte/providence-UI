import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export declare type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    /** 是否禁用  */
    disabled?: boolean;
    /** Input大小  */
    size?: InputSize;
    /** 表单上的图标  */
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    /** 受控组件，自定义onChange事件*/
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Icon } from 'providence'
 * ~~~
 *
 *  */
export declare const Input: FC<InputProps>;
export default Input;
