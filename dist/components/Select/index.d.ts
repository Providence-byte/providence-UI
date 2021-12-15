import { FC } from 'react';
import { SelectProps } from "./select";
import { OptionProps } from "./option";
export declare type ISelect = FC<SelectProps> & {
    Option: FC<OptionProps>;
};
declare const TransSelect: ISelect;
export default TransSelect;
