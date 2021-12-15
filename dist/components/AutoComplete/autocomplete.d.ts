import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutocompleteProps extends Omit<InputProps, "onSelect"> {
    fatchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    costomOption?: (item: DataSourceType) => ReactElement;
    onSelect?: (item: DataSourceType) => void;
}
/** 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Autocomplete } from 'providence'
 * ~~~
 */
export declare const Autocomplete: FC<AutocompleteProps>;
export default Autocomplete;
