import { FC } from 'react';
import { TabsProps } from './tabs';
import { TabsItemProps } from './tabsitem';
export declare type ITabs = FC<TabsProps> & {
    Item: FC<TabsItemProps>;
};
declare const TransTabs: ITabs;
export default TransTabs;
