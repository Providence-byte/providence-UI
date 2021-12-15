import React from "react";
export declare type TabsType = "line" | "card";
declare type SelectCallBack = (index: string) => void;
declare type SelectedCallBack = (index: string, content: React.ReactNode) => void;
export interface TabsProps {
    defaultIndex?: string;
    onSelect?: SelectCallBack;
    type?: TabsType;
    className?: string;
    style?: React.CSSProperties;
    contentClass?: string;
}
export interface ITabsContext {
    index: string;
    content?: React.ReactNode;
    onSelected?: SelectedCallBack;
}
export declare const TabsContext: React.Context<ITabsContext>;
/**选择不同的Tab项以展示不同的内容
 *
 * ### 引用方法
 *
 * ~~~js
 *
 * import { Tabs,TabsItem  } from 'providence'
 * ~~~
 * */
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
