import { CSSProperties, FC } from "react";
import { Theme } from "../Icon/icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: CSSProperties;
    theme?: Theme;
}
/**进度条，传入可变的percent来改变进度
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */
export declare const Progress: FC<ProgressProps>;
export default Progress;
