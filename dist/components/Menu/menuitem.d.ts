import React from "react";
export interface BaseMenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const MenuItem: React.FC<BaseMenuItemProps>;
export default MenuItem;
