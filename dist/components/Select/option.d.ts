import { FC } from "react";
export interface OptionProps {
    disabled?: boolean;
    value: string;
    label?: string;
    index?: number;
    className?: string;
}
declare const Option: FC<OptionProps>;
export default Option;
