import {FC} from 'react'
import Tabs,{TabsProps} from './tabs';
import TabsItem,{TabsItemProps} from './tabsitem';

export type ITabs = FC<TabsProps> & {
    Item:FC<TabsItemProps>
}

const TransTabs = Tabs as ITabs

TransTabs.Item = TabsItem;

export default TransTabs