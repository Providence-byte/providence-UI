import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface TabsItemProps {
    index?: string;
    title: string;
    disabled?: boolean;
    icon?: IconProp;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;
