import React, { FC } from "react";
export interface SelectProps {
    defaultValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    className?: string;
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}
declare type SelectCallBack = (selectIndex: number, value: string) => void;
interface ISelectContext {
    index: number;
    onSelected?: SelectCallBack;
    selectedArr?: string[];
}
export declare const SelectContext: React.Context<ISelectContext>;
/**
 * 下拉选择器。 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Select } from 'providence'
 * ~~~
 */
export declare const Select: FC<SelectProps>;
export default Select;
