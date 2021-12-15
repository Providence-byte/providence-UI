import { FC } from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type Theme = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    theme?: Theme;
}
/** 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Icon } from 'providence'
 * ~~~
 */
export declare const Icon: FC<IconProps>;
export default Icon;
