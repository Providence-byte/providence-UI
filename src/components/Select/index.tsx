import {FC} from 'react'
import Select,{SelectProps} from "./select";
import Option,{OptionProps} from "./option";

export type ISelect = FC<SelectProps> & {
    Option:FC<OptionProps>
}

const TransSelect = Select as ISelect

TransSelect.Option = Option;

export default TransSelect